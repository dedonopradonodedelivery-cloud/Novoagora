
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Wallet, Store, ArrowRight, Loader2, CheckCircle2, Clock, XCircle, Home } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { User } from 'firebase/auth';

interface CashbackPaymentScreenProps {
  user: User | null;
  merchantId: string;
  storeId: string;
  onBack: () => void;
  onComplete: () => void;
}

// Mock Store info fetcher (fallback if supabase data is minimal)
const fetchStoreInfo = async (storeId: string) => {
  // Em prod, buscaria do Supabase: .from('businesses').select('*').eq('id', storeId)
  return {
    name: 'Loja Parceira',
    address: 'Freguesia',
    cashbackPercent: 5 // Default visual if DB fails
  };
};

export const CashbackPaymentScreen: React.FC<CashbackPaymentScreenProps> = ({ 
  user, 
  merchantId, 
  storeId, 
  onBack, 
  onComplete 
}) => {
  // States
  const [step, setStep] = useState<'input' | 'waiting' | 'approved' | 'rejected'>('input');
  const [storeInfo, setStoreInfo] = useState<any>(null);
  const [totalAmount, setTotalAmount] = useState('');
  const [useCashback, setUseCashback] = useState(false);
  const [cashbackToUse, setCashbackToUse] = useState('');
  const [userBalance, setUserBalance] = useState(0); 
  const [isLoading, setIsLoading] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  // Load Initial Data
  useEffect(() => {
    const load = async () => {
      // 1. Store Info
      const info = await fetchStoreInfo(storeId);
      setStoreInfo(info);

      // 2. User Balance
      if (user && supabase) {
        // Garantir carteira via RPC
        await supabase.rpc('ensure_cashback_wallet', { p_user_id: user.uid });
        
        // Buscar saldo
        const { data } = await supabase
            .from('cashback_wallets')
            .select('balance_cents')
            .eq('user_id', user.uid)
            .single();
        
        if (data) {
            setUserBalance(data.balance_cents / 100);
        }
      }
    };
    load();
  }, [storeId, user]);

  // Realtime Listener for Transaction Status
  useEffect(() => {
    if (!transactionId || !supabase) return;

    const channel = supabase
      .channel(`tx_${transactionId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'cashback_transactions',
          filter: `id=eq.${transactionId}`,
        },
        (payload) => {
          const newStatus = payload.new.status;
          if (newStatus === 'approved') {
            setStep('approved');
            fetchNewBalance(); // Atualiza saldo visualmente
          } else if (newStatus === 'rejected') {
            setStep('rejected');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [transactionId]);

  const fetchNewBalance = async () => {
    if (!user) return;
    const { data } = await supabase
        .from('cashback_wallets')
        .select('balance_cents')
        .eq('user_id', user.uid)
        .single();
    if (data) {
        setUserBalance(data.balance_cents / 100);
    }
  }

  // Calculations
  const numericTotal = parseFloat(totalAmount.replace(',', '.') || '0');
  const numericCashbackUsed = useCashback ? parseFloat(cashbackToUse.replace(',', '.') || '0') : 0;
  
  const payNow = Math.max(0, numericTotal - numericCashbackUsed);
  const cashbackToEarn = (payNow * (storeInfo?.cashbackPercent || 5)) / 100; // Default 5% if info missing

  // Handlers
  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Permite digitação livre de moeda (com vírgula ou ponto)
    setTotalAmount(val);
    
    // Se o novo total for menor que o cashback em uso, ajusta o cashback
    const newTotal = parseFloat(val.replace(',', '.') || '0');
    if (newTotal < numericCashbackUsed) {
        setCashbackToUse(val);
    }
  };

  const handleCashbackUsageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawVal = e.target.value;
    let val = parseFloat(rawVal.replace(',', '.') || '0');
    
    // Validation: Cannot exceed balance
    if (val > userBalance) val = userBalance;
    // Validation: Cannot exceed total purchase
    if (val > numericTotal) val = numericTotal;

    setCashbackToUse(val.toString().replace('.', ','));
  };

  const handleSubmit = async () => {
    if (!user || !supabase) return;
    if (numericTotal <= 0) {
        alert("Digite o valor da compra.");
        return;
    }

    setIsLoading(true);

    try {
      const transactionPayload = {
        merchant_id: merchantId,
        store_id: storeId,
        customer_id: user.uid,
        total_amount_cents: Math.round(numericTotal * 100),
        cashback_used_cents: Math.round(numericCashbackUsed * 100),
        cashback_to_earn_cents: Math.round(cashbackToEarn * 100),
        amount_to_pay_now_cents: Math.round(payNow * 100),
        status: 'pending',
        // created_at: generated automatically
      };

      const { data, error } = await supabase
        .from('cashback_transactions')
        .insert(transactionPayload)
        .select()
        .single();

      if (error) throw error;

      if (data) {
          setTransactionId(data.id);
          setStep('waiting');
      }

    } catch (err: any) {
      console.error(err);
      alert(`Erro: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // --- APPROVED SCREEN ---
  if (step === 'approved') {
    return (
      <div className="min-h-screen bg-green-600 flex flex-col items-center justify-center p-6 animate-in zoom-in duration-300 text-white">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-xl animate-bounce-short">
            <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-black mb-2 text-center">Pagamento Confirmado!</h2>
        <p className="text-green-100 text-center mb-10 max-w-xs font-medium">
            Você economizou e a transação foi registrada com sucesso.
        </p>

        <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl text-gray-900">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
                <span className="text-gray-500 text-sm">Loja</span>
                <span className="font-bold">{storeInfo?.name}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">Valor Pago</span>
                <span className="font-bold text-lg">R$ {payNow.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-center bg-green-50 p-3 rounded-xl mt-2">
                <span className="text-green-700 font-bold text-sm flex items-center gap-1">
                    <Wallet className="w-4 h-4" /> Novo Saldo
                </span>
                <span className="font-black text-green-600 text-lg">R$ {userBalance.toFixed(2).replace('.', ',')}</span>
            </div>
        </div>

        <button 
            onClick={onBack}
            className="mt-10 bg-white text-green-600 font-bold py-4 px-10 rounded-2xl shadow-lg active:scale-95 transition-transform flex items-center gap-2"
        >
            <Home className="w-5 h-5" />
            Voltar ao Início
        </button>
      </div>
    );
  }

  // --- REJECTED SCREEN ---
  if (step === 'rejected') {
    return (
      <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-6 animate-in zoom-in duration-300 text-white">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-xl">
            <XCircle className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">Pagamento Recusado</h2>
        <p className="text-red-100 text-center mb-10 max-w-xs font-medium">
            O lojista não confirmou a transação ou houve um problema. O saldo não foi descontado.
        </p>
        <button 
            onClick={() => setStep('input')}
            className="bg-white text-red-600 font-bold py-4 px-10 rounded-2xl shadow-lg active:scale-95 transition-transform"
        >
            Tentar Novamente
        </button>
      </div>
    );
  }

  // --- WAIT SCREEN ---
  if (step === 'waiting') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
        <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-8 relative">
            <Clock className="w-12 h-12 text-yellow-600 dark:text-yellow-400 animate-pulse" />
            <div className="absolute inset-0 rounded-full border-4 border-yellow-200 dark:border-yellow-800 animate-[spin_3s_linear_infinite] border-t-transparent"></div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Aguardando Lojista
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-xs">
            Mostre esta tela para o lojista confirmar o pagamento de <strong>R$ {payNow.toFixed(2).replace('.', ',')}</strong>.
        </p>

        <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm mb-8">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Total da Compra</span>
                <span className="font-bold text-gray-900 dark:text-white">R$ {numericTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            {numericCashbackUsed > 0 && (
                <div className="flex justify-between items-center mb-2 text-red-500">
                    <span className="text-sm">Cashback Usado</span>
                    <span className="font-bold">- R$ {numericCashbackUsed.toFixed(2).replace('.', ',')}</span>
                </div>
            )}
            <div className="border-t border-gray-100 dark:border-gray-700 my-2 pt-2 flex justify-between items-center">
                <span className="text-base font-bold text-gray-900 dark:text-white">A Pagar</span>
                <span className="text-xl font-black text-[#1E5BFF]">R$ {payNow.toFixed(2).replace('.', ',')}</span>
            </div>
        </div>
        
        <p className="text-xs text-gray-400 animate-pulse">Não feche esta tela...</p>
      </div>
    );
  }

  // --- INPUT SCREEN ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300 flex flex-col">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-5 pt-6 shadow-sm border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20">
        <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
            </button>
            <div>
                <h1 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
                    Pagar com Cashback
                </h1>
                {storeInfo && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Store className="w-3 h-3" />
                        {storeInfo.name}
                    </div>
                )}
            </div>
        </div>
      </div>

      <div className="flex-1 p-5 pb-32 overflow-y-auto">
        
        {/* Step 1: Total Value */}
        <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Qual o valor total da compra?
            </label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">R$</span>
                <input 
                    type="number"
                    value={totalAmount}
                    onChange={handleTotalChange}
                    placeholder="0,00"
                    className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl py-4 pl-12 pr-4 text-2xl font-bold text-gray-900 dark:text-white focus:border-[#1E5BFF] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-gray-300"
                    autoFocus
                />
            </div>
        </div>

        {/* Step 2: Use Cashback */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-[#1E5BFF]">
                    <Wallet className="w-5 h-5" />
                    <span className="font-bold text-sm">Seu Saldo: R$ {userBalance.toFixed(2).replace('.', ',')}</span>
                </div>
                
                {/* Toggle Switch */}
                <button 
                    onClick={() => {
                        setUseCashback(!useCashback);
                        if (!useCashback) {
                            // Auto-fill max possible
                            const maxPossible = Math.min(userBalance, numericTotal || 0);
                            setCashbackToUse(maxPossible.toFixed(2).replace('.', ','));
                        } else {
                            setCashbackToUse('');
                        }
                    }}
                    className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${useCashback ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${useCashback ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Deseja usar seu saldo para descontar nesta compra?
            </p>

            {useCashback && (
                <div className="animate-in slide-in-from-top-2 fade-in">
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">
                        Quanto usar?
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 font-bold text-sm">- R$</span>
                        <input 
                            type="number"
                            value={cashbackToUse}
                            onChange={handleCashbackUsageChange}
                            className="w-full bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl py-3 pl-12 pr-4 text-lg font-bold text-green-700 dark:text-green-400 focus:outline-none"
                        />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1 text-right">Máximo: R$ {Math.min(userBalance, numericTotal).toFixed(2).replace('.', ',')}</p>
                </div>
            )}
        </div>

        {/* Step 3: Summary */}
        <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Resumo</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Compra</span>
                    <span>R$ {numericTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                {numericCashbackUsed > 0 && (
                    <div className="flex justify-between items-center mb-2 text-sm text-green-600 dark:text-green-400 font-medium">
                        <span>Desconto (Cashback)</span>
                        <span>- R$ {numericCashbackUsed.toFixed(2).replace('.', ',')}</span>
                    </div>
                )}
                <div className="border-t border-gray-100 dark:border-gray-700 my-3"></div>
                <div className="flex justify-between items-center">
                    <div>
                        <span className="block text-sm text-gray-500 dark:text-gray-400">Você paga agora</span>
                        <span className="block text-2xl font-black text-gray-900 dark:text-white">
                            R$ {payNow.toFixed(2).replace('.', ',')}
                        </span>
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-20">
        <button 
            onClick={handleSubmit}
            disabled={numericTotal <= 0 || isLoading}
            className="w-full bg-[#1E5BFF] hover:bg-[#1749CC] disabled:bg-gray-300 disabled:dark:bg-gray-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processando...
                </>
            ) : (
                <>
                    Confirmar Solicitação
                    <ArrowRight className="w-5 h-5" />
                </>
            )}
        </button>
      </div>

    </div>
  );
};
