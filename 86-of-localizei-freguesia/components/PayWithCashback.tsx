
import React from 'react';
import { ChevronLeft, Store, Wallet, CornerRightDown, ArrowRight, Loader2 } from 'lucide-react';

interface PayWithCashbackProps {
  merchantName: string;
  merchantCashbackPercent?: number;
  userBalance: number;
  purchaseValue: string;
  balanceUse: string;
  isLoading?: boolean;
  onBack: () => void;
  onChangePurchaseValue: (value: string) => void;
  onChangeBalanceUse: (value: string) => void;
  onConfirmPayment: () => void;
}

export const PayWithCashback: React.FC<PayWithCashbackProps> = ({
  merchantName,
  userBalance,
  purchaseValue,
  balanceUse,
  isLoading = false,
  onBack,
  onChangePurchaseValue,
  onChangeBalanceUse,
  onConfirmPayment
}) => {
  
  // Helper to parse localized currency string to number
  const parseCurrency = (val: string) => parseFloat(val.replace(/\./g, '').replace(',', '.') || '0');

  const numericTotal = parseCurrency(purchaseValue);
  const numericCashbackUsed = parseCurrency(balanceUse);
  const payNow = Math.max(0, numericTotal - numericCashbackUsed);

  // Logic for "Use Max" button
  const handleUseMax = () => {
    if (numericTotal <= 0) return;
    const maxPossible = Math.min(userBalance, numericTotal);
    // Format back to string with comma
    onChangeBalanceUse(maxPossible.toFixed(2).replace('.', ','));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans flex flex-col animate-in slide-in-from-right duration-300">
      
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
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    <Store className="w-3 h-3" />
                    {merchantName}
                </div>
            </div>
        </div>
      </div>

      <div className="flex-1 p-5 pb-10 overflow-y-auto">
        
        {/* Input 1: Total Purchase Value */}
        <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                1. Qual o valor total da compra?
            </label>
            <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg group-focus-within:text-[#1E5BFF] transition-colors">R$</span>
                <input 
                    type="text"
                    inputMode="decimal"
                    value={purchaseValue}
                    onChange={(e) => onChangePurchaseValue(e.target.value)}
                    placeholder="0,00"
                    className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl py-4 pl-12 pr-4 text-2xl font-bold text-gray-900 dark:text-white focus:border-[#1E5BFF] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-gray-300"
                    autoFocus
                />
            </div>
        </div>

        {/* Input 2: Balance Usage */}
        <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                    2. Quanto vai usar do saldo?
                </label>
                <div className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
                    <Wallet className="w-3 h-3 text-[#1E5BFF]" />
                    Saldo: R$ {userBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
            </div>
            
            <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 font-bold text-lg">R$</span>
                <input 
                    type="text"
                    inputMode="decimal"
                    value={balanceUse}
                    onChange={(e) => onChangeBalanceUse(e.target.value)}
                    placeholder="0,00"
                    disabled={numericTotal <= 0}
                    className="w-full bg-green-50 dark:bg-green-900/10 border-2 border-green-200 dark:border-green-800 rounded-2xl py-4 pl-12 pr-24 text-2xl font-bold text-green-700 dark:text-green-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all placeholder-green-300/50 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                
                {/* Max Button inside input */}
                <button 
                    onClick={handleUseMax}
                    disabled={numericTotal <= 0 || userBalance <= 0}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-green-700 dark:text-green-300 bg-white dark:bg-gray-800 border border-green-200 dark:border-green-700 px-3 py-1.5 rounded-lg shadow-sm active:scale-95 hover:bg-green-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50"
                >
                    USAR MÁX
                </button>
            </div>
            
            {/* Contextual warning if limited */}
            {numericTotal > 0 && numericTotal < userBalance && (
                <p className="text-[10px] text-gray-400 mt-1.5 ml-1 flex items-center gap-1">
                    <CornerRightDown className="w-3 h-3" />
                    Limitado ao valor da compra
                </p>
            )}
        </div>

        {/* Transaction Summary Block */}
        <div className="space-y-3 mb-8">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Resumo da Transação</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Valor da Compra</span>
                    <span>R$ {numericTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                {numericCashbackUsed > 0 && (
                    <div className="flex justify-between items-center mb-2 text-sm text-green-600 dark:text-green-400 font-bold">
                        <span>Desconto (Cashback)</span>
                        <span>- R$ {numericCashbackUsed.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                )}
                <div className="border-t border-gray-100 dark:border-gray-700 my-3"></div>
                <div className="flex justify-between items-center">
                    <div>
                        <span className="block text-sm text-gray-500 dark:text-gray-400">Você paga ao lojista</span>
                        <span className="block text-3xl font-black text-[#1E5BFF]">
                            R$ {payNow.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* Main Action Button */}
        <button 
            onClick={onConfirmPayment}
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
                    Confirmar Pagamento
                    <ArrowRight className="w-5 h-5" />
                </>
            )}
        </button>

      </div>
    </div>
  );
};
