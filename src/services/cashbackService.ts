import { supabase } from "../lib/supabaseClient";

export type CashbackTransactionStatus = "approved" | "pending" | "rejected" | "canceled";

export type CreateCashbackTransactionInput = {
  userId: string;
  merchantId: string;
  purchaseAmount: number;
  cashbackUsed: number;
  cashbackPercent: number;
  status?: CashbackTransactionStatus;
  sourceChannel?: string;
  qrCodeValue?: string | null;
  pinValue?: string | null;
};

export type CashbackTransactionRecord = {
  id: string;
  user_id: string;
  merchant_id: string;
  purchase_amount: number;
  cashback_used: number;
  cashback_earned: number;
  cashback_percent: number;
  status: string;
  source_channel: string;
  qr_code_value: string | null;
  pin_value: string | null;
  created_at: string;
};

export type UserWalletRecord = {
  id: string;
  user_id: string;
  current_balance: number;
  total_earned: number;
  total_redeemed: number;
  created_at: string;
  updated_at: string;
};

export async function createCashbackTransaction(
  input: CreateCashbackTransactionInput
): Promise<{ transaction: CashbackTransactionRecord | null; error: Error | null }> {
  if (!supabase) {
    return {
      transaction: null,
      error: new Error("Supabase client not initialized"),
    };
  }

  const {
    userId,
    merchantId,
    purchaseAmount,
    cashbackUsed,
    cashbackPercent,
    status: inputStatus,
    sourceChannel: inputSourceChannel,
    qrCodeValue,
    pinValue,
  } = input;

  const status = inputStatus ?? "approved";
  const sourceChannel = inputSourceChannel ?? "app";

  const amountPaid = Math.max(purchaseAmount - cashbackUsed, 0);
  const rawEarned = amountPaid * (cashbackPercent / 100);
  const cashback_earned = Number(rawEarned.toFixed(2));

  const { data, error } = await supabase
    .from("cashback_transactions")
    .insert({
      user_id: userId,
      merchant_id: merchantId,
      purchase_amount: purchaseAmount,
      cashback_used: cashbackUsed,
      cashback_earned,
      cashback_percent: cashbackPercent,
      status,
      source_channel: sourceChannel,
      qr_code_value: qrCodeValue ?? null,
      pin_value: pinValue ?? null,
    })
    .select("*")
    .single();

  if (error) {
    return { transaction: null, error: new Error(error.message) };
  }

  return {
    transaction: data as CashbackTransactionRecord,
    error: null,
  };
}

export async function getUserWallet(
  userId: string
): Promise<{ wallet: UserWalletRecord | null; error: Error | null }> {
  if (!supabase) {
    return {
      wallet: null,
      error: new Error("Supabase client not initialized"),
    };
  }

  const { data, error } = await supabase
    .from("users_wallets")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    return { wallet: null, error: new Error(error.message) };
  }

  return { wallet: data as UserWalletRecord | null, error: null };
}
