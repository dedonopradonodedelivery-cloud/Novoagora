
import { supabase } from '../lib/supabase';
import { DbMerchantSession, DbCashbackTransaction, DbWalletMovement } from './types';

// ==========================================
// 1. MERCHANT SERVICES
// ==========================================

/**
 * Creates a new session (QR or PIN) for the merchant.
 * Typically called when the merchant opens the "Generate QR" screen.
 */
export const createMerchantSession = async (
  merchantId: string, 
  type: 'qr' | 'pin'
): Promise<{ sessionId: string; code?: string; expiresAt: string } | null> => {
  if (!supabase) return null;

  // Logic: 60 seconds expiry
  const expiresAt = new Date(Date.now() + 60 * 1000).toISOString();
  
  // Logic: 6-digit PIN if type is PIN
  let pinCode = null;
  if (type === 'pin') {
    pinCode = Math.floor(100000 + Math.random() * 900000).toString();
  }

  const { data, error } = await supabase
    .from('merchant_sessions')
    .insert({
      merchant_id: merchantId,
      session_type: type,
      pin_code: pinCode,
      expires_at: expiresAt,
      is_used: false
    })
    .select('id, pin_code, expires_at')
    .single();

  if (error) {
    console.error('Error creating session:', error);
    throw new Error(error.message);
  }

  return {
    sessionId: data.id,
    code: data.pin_code,
    expiresAt: data.expires_at
  };
};

/**
 * Lists pending transactions for the Merchant Dashboard.
 */
export const getPendingTransactions = async (merchantId: string) => {
  if (!supabase) return [];

  // Joins would be ideal here to get User Name, but for simplicity assuming single table query
  // or that client handles the join/name fetch.
  const { data, error } = await supabase
    .from('cashback_transactions')
    .select(`
      *,
      users ( name )
    `)
    .eq('merchant_id', merchantId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Merchant approves a transaction.
 * Trigger logic in DB handles the balance update.
 */
export const approveTransaction = async (merchantId: string, transactionId: string) => {
  if (!supabase) return;

  // 1. Validate ownership
  const { data: tx, error: fetchError } = await supabase
    .from('cashback_transactions')
    .select('merchant_id, status')
    .eq('id', transactionId)
    .single();

  if (fetchError || !tx) throw new Error("Transação não encontrada");
  if (tx.merchant_id !== merchantId) throw new Error("Sem permissão para aprovar esta transação");
  if (tx.status !== 'pending') throw new Error("Transação não está pendente");

  // 2. Update status (DB Trigger handles the rest)
  const { data, error } = await supabase
    .from('cashback_transactions')
    .update({ status: 'approved' })
    .eq('id', transactionId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

// ==========================================
// 2. USER / TRANSACTION SERVICES
// ==========================================

/**
 * Common logic to validate session and create transaction.
 */
const processTransactionCreation = async (
  userId: string,
  session: DbMerchantSession,
  purchaseValue: number,
  amountFromBalance: number
) => {
  if (!supabase) throw new Error("Database not connected");

  // 1. Validate Session
  if (session.is_used) throw new Error("Este código já foi utilizado.");
  if (new Date(session.expires_at) < new Date()) throw new Error("Este código expirou.");

  // 2. Create Transaction (Status: Pending)
  // Note: amount_to_pay and cashback_value are calculated by DB Trigger
  const { data: tx, error: txError } = await supabase
    .from('cashback_transactions')
    .insert({
      user_id: userId,
      merchant_id: session.merchant_id,
      session_id: session.id,
      purchase_value: purchaseValue,
      amount_from_balance: amountFromBalance,
      status: 'pending'
    })
    .select()
    .single();

  if (txError) throw new Error(txError.message);

  // 3. Mark Session as Used
  await supabase
    .from('merchant_sessions')
    .update({ is_used: true })
    .eq('id', session.id);

  return tx;
};

/**
 * User initiates transaction via QR Code scan.
 */
export const createTransactionFromQR = async (
  userId: string,
  sessionId: string,
  purchaseValue: number,
  amountFromBalance: number
) => {
  if (!supabase) return null;

  // Fetch Session
  const { data: session, error } = await supabase
    .from('merchant_sessions')
    .select('*')
    .eq('id', sessionId)
    .single();

  if (error || !session) throw new Error("Sessão inválida ou não encontrada.");

  return processTransactionCreation(userId, session, purchaseValue, amountFromBalance);
};

/**
 * User initiates transaction via PIN Code.
 */
export const createTransactionFromPIN = async (
  userId: string,
  pinCode: string,
  purchaseValue: number,
  amountFromBalance: number
) => {
  if (!supabase) return null;

  // Fetch Session by PIN (Must be unused and active)
  // We filter in JS or DB. DB index helps here.
  const { data: sessions, error } = await supabase
    .from('merchant_sessions')
    .select('*')
    .eq('pin_code', pinCode)
    .eq('is_used', false)
    .gt('expires_at', new Date().toISOString()) // Only future expiry
    .limit(1);

  if (error || !sessions || sessions.length === 0) {
    throw new Error("PIN inválido ou expirado.");
  }

  const session = sessions[0];
  return processTransactionCreation(userId, session, purchaseValue, amountFromBalance);
};

/**
 * Get User Wallet Info
 */
export const getUserWallet = async (userId: string) => {
  if (!supabase) return { balance: 0, history: [] };

  // 1. Get Balance
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('wallet_balance')
    .eq('id', userId)
    .single();

  if (userError) throw new Error(userError.message);

  // 2. Get History
  const { data: history, error: histError } = await supabase
    .from('wallet_movements')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20);

  if (histError) throw new Error(histError.message);

  return {
    balance: user.wallet_balance,
    history: history as DbWalletMovement[]
  };
};
