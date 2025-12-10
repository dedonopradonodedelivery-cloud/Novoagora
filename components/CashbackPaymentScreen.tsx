
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Wallet, Store, ArrowRight, Loader2, CheckCircle2, XCircle, CornerRightDown, Lock, BellRing, Smartphone, Send, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { User } from 'firebase/auth';
import { PayWithCashback } from './PayWithCashback';

interface CashbackPaymentScreenProps {
  user: User | null;
  merchantId: string;
  storeId: string;
  onBack: () => void;
  onComplete: (transactionData: any) => void;
}

// Mock Store info fetcher
const fetchStoreInfo = async (storeId: string) => {
  return {
    name: 'Loja Parceira',
    address: 'Freguesia',
    cashbackPercent: 5
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
  const [step, setStep] = useState<'input' | 'sending_push' | 'waiting' | 'approved' | 'rejected'>('input');
  const [storeInfo, setStoreInfo] = useState<any>(null);
  
  // Inputs (using text to handle comma/dot safely)
  const [totalAmount, setTotalAmount] = useState('');
  const [cashbackToUse, setCashbackToUse] = useState('');
  
  const [userBalance, setUserBalance] = useState(0); 
  const [isLoading, setIsLoading] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  // Load Initial Data
  useEffect(() => {
    const load = async () => {
      const info = await fetchStoreInfo(storeId);
      setStoreInfo(info);
      // Mock balance
      setUserBalance(10.00); 
    };
    load();
  }, [storeId]);

  // Calculations
  const parseCurrency = (val: string) => parseFloat(val.replace(/\./g, '').replace(',', '.') || '0');
  
  const numericTotal = parseCurrency(totalAmount);
  const numericCashbackUsed = parseCurrency(cashbackToUse);
  
  const payNow = Math.max(0, numericTotal - numericCashbackUsed);
  const cashbackToEarn = (payNow * (storeInfo?.cashbackPercent || 5)) / 100;

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
            triggerSuccessFlow();
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

  const triggerSuccessFlow = () => {
    setStep('approved');
    setTimeout(() => {
        onComplete({
            amount: payNow,
            store: storeInfo?.name || 'Loja',
            earned: cashbackToEarn,
            date: new Date().toISOString()
        });
    }, 2000);
  };

  // Adapters for the new PayWithCashback component
  const onPurchaseValueChange = (val: string) => {
    // Allow only numbers and one comma
    if (!/^\d*[,]?\d{0,2}$/.test(val)) return;
    
    setTotalAmount(val);
    
    // Auto-adjust cashback if total drops below used amount
    const currentTotal = parseFloat(val.replace(',', '.') || '0');
    const currentUsed = parseFloat(cashbackToUse.replace(',', '.') || '0');
    if (currentTotal < currentUsed) {
        setCashbackToUse(val);
    }
  };

  const onBalanceUseChange = (val: string) => {
    if (!/^\d*[,]?\d{0,2}$/.test(val)) return;

    const numericVal = parseFloat(val.replace(',', '.') || '0');
    
    // Logic limits
    if (numericVal > userBalance) return; // Cannot exceed balance
    if (numericVal > numericTotal) return; // Cannot exceed total

    setCashbackToUse(val);
  };

  const handleSubmit = async () => {
    if (!user) {
        alert("Faça login para continuar.");
        return;
    }
    if (numericTotal <= 0) {
        alert("Digite o valor da compra.");
        return;
    }

    setIsLoading(true);

    try {
      if (supabase) {
          const transactionPayload = {
            merchant_id: merchantId,
            store_id: storeId,
            customer_id: user.uid,
            total_amount_cents: Math.round(numericTotal * 100),
            cashback_used_cents: Math.round(numericCashbackUsed * 100),
            cashback_to_earn_cents: Math.round(cashbackToEarn * 100),
            amount_to_pay_now_cents: Math.round(payNow * 100),
            status: 'pending',
          };

          const { data, error } = await supabase
            .from('cashback_transactions')
            .insert(transactionPayload)
            .select()
            .single();

          if (error) throw error;

          if (data) {
              setTransactionId(data.id);
          }
      } 
      
      // Simulate "Sending Notification" delay then go to Waiting
      setStep('sending_push');
      setTimeout(() => {
          setStep('waiting');
          setIsLoading(false);
      }, 2000);

    } catch (err: any) {
      console.error(err);
      alert(`Erro: ${err.message}`);
      setIsLoading(false);
    }
  };

  // --- REJECTED SCREEN ---
  if (step === 'rejected') {
    return (
      <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-6 animate-in zoom-in duration-300 text-white">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-xl">
            <XCircle className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">Pagamento Recusado</h2>
        <p className="text-red-100 text-center mb-10 max-w-xs font-medium">
            O lojista não confirmou a transação. O saldo não foi descontado.
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

  // --- SENDING PUSH / WAITING / APPROVED SCREEN ---
  if (step === 'sending_push' || step === 'waiting' || step === 'approved') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
        
        {/* ICON STATES */}
        {step === 'sending_push' && (
             <div className="mb-8 relative">
                <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center animate-pulse">
                    <Smartphone className="w-16 h-16 text-blue-500" />
                </div>
                <div className="absolute top-0 right-0 animate-ping">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white">
                        <Send className="w-4 h-4 text-white" />
                    </div>
                </div>
             </div>
        )}

        {step === 'waiting' && (
            <div className="w-32 h-32 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mb-8 relative shadow-lg shadow-yellow-100 dark:shadow-none">
                <div className="absolute inset-0 rounded-full border-4 border-yellow-100 dark:border-yellow-800/50 animate-[spin_3s_linear_infinite]"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-yellow-500 border-l-transparent border-r-transparent border-b-transparent animate-spin"></div>
                <Clock className="w-12 h-12 text-yellow-500 animate-pulse" />
            </div>
        )}

        {step === 'approved' && (
             <div className="w-32 h-32 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-8 relative animate-bounce-short shadow-lg shadow-green-200 dark:shadow-none">
                <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400" />
             </div>
        )}

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            {step === 'sending_push' ? 'Enviando Pedido...' : 
             step === 'waiting' ? 'Aguardando Lojista' : 
             'Pagamento Confirmado!'}
        </h2>
        
        {/* SUBTITLE */}
        <p className="text-gray-500 dark:text-gray-400 text-center mb-10 max-w-[280px] leading-relaxed text-sm font-medium">
            {step === 'sending_push' ? 'Conectando com o caixa...' : 
             step === 'waiting' ? 'O lojista recebeu uma notificação e precisa autorizar a transação.' : 
             'Tudo certo! Seu cashback foi creditado.'}
        </p>

        {/* Transaction Summary Card */}
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm mb-8 relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100 dark:border-gray-700 border-dashed">
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Estabelecimento</span>
                <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-[#1E5BFF]" />
                    {storeInfo?.name || 'Loja Parceira'}
                </span>
            </div>

            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Total da Compra</span>
                <span className="font-bold text-gray-900 dark:text-white">R$ {numericTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            
            {numericCashbackUsed > 0 && (
                <div className="flex justify-between items-center mb-2 text-green-600 dark:text-green-400">
                    <span className="text-sm font-medium">Saldo Utilizado</span>
                    <span className="font-bold">- R$ {numericCashbackUsed.toFixed(2).replace('.', ',')}</span>
                </div>
            )}
            
            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl flex justify-between items-center mt-4">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">A Pagar</span>
                <span className="text-xl font-black text-[#1E5BFF]">R$ {payNow.toFixed(2).replace('.', ',')}</span>
            </div>
        </div>
        
        {/* DEV ONLY: Simulate Approval Button */}
        {step === 'waiting' && (
            <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-forwards opacity-0" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
                <button 
                    onClick={triggerSuccessFlow}
                    className="w-full bg-yellow-50 dark:bg-yellow-900/10 text-yellow-700 dark:text-yellow-400 py-3 rounded-2xl font-bold text-sm hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors flex items-center justify-center gap-2 border border-yellow-200 dark:border-yellow-800"
                >
                    <Lock className="w-3 h-3" />
                    Simular Aprovação (Demo)
                </button>
                <p className="text-[10px] text-gray-400 text-center mt-2">
                    (Use este botão para testar sem o app do lojista)
                </p>
            </div>
        )}
      </div>
    );
  }

  // --- INPUT SCREEN (USING NEW COMPONENT) ---
  return (
    <PayWithCashback 
        merchantName={storeInfo?.name || 'Loja Parceira'}
        merchantCashbackPercent={storeInfo?.cashbackPercent}
        userBalance={userBalance}
        purchaseValue={totalAmount}
        balanceUse={cashbackToUse}
        onBack={onBack}
        onChangePurchaseValue={onPurchaseValueChange}
        onChangeBalanceUse={onBalanceUseChange}
        onConfirmPayment={handleSubmit}
        isLoading={isLoading}
    />
  );
};
