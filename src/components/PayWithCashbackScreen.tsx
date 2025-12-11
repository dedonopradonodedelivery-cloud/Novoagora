import React, { useState } from 'react';
import { ChevronLeft, Store, Wallet, ArrowRight, Clock } from 'lucide-react';

export default function PayWithCashbackScreen() {
  const [purchaseValue, setPurchaseValue] = useState<string>("");
  const [walletBalance, setWalletBalance] = useState<number>(10.00); // Mock balance
  const [cashbackToUse, setCashbackToUse] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"form" | "waiting">("form");

  // --- Helpers ---

  const parseCurrency = (value: string): number => {
    if (!value) return 0;
    const numericString = value.replace(/\D/g, "");
    return Number(numericString) / 100;
  };

  const formatCurrencyBr = (value: number): string => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // --- Handlers ---

  const handlePurchaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numberValue = Number(rawValue) / 100;
    setPurchaseValue(formatCurrencyBr(numberValue));

    // If purchase value drops below currently used cashback, cap cashback
    const currentCashback = parseCurrency(cashbackToUse);
    if (currentCashback > numberValue) {
      setCashbackToUse(formatCurrencyBr(numberValue));
    }
  };

  const handleCashbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numberValue = Number(rawValue) / 100;
    const purchaseNum = parseCurrency(purchaseValue);

    // Limit rules:
    // 1. Cannot exceed wallet balance
    // 2. Cannot exceed purchase value
    let allowedValue = numberValue;

    if (allowedValue > walletBalance) {
      allowedValue = walletBalance;
    }
    if (allowedValue > purchaseNum) {
      allowedValue = purchaseNum;
    }

    setCashbackToUse(formatCurrencyBr(allowedValue));
  };

  const handleUseMax = () => {
    const purchaseNum = parseCurrency(purchaseValue);
    if (purchaseNum <= 0) return;

    const maxPossible = Math.min(walletBalance, purchaseNum);
    setCashbackToUse(formatCurrencyBr(maxPossible));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate backend call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("waiting");
    }, 1500);
  };

  // --- Computed Values ---

  const numericPurchase = parseCurrency(purchaseValue);
  const numericCashbackToUse = parseCurrency(cashbackToUse);
  const amountToPay = Math.max(numericPurchase - numericCashbackToUse, 0);

  const isValid = 
    numericPurchase > 0 && 
    numericCashbackToUse >= 0 && 
    numericCashbackToUse <= walletBalance && 
    numericCashbackToUse <= numericPurchase && 
    !isSubmitting;

  // --- Renders ---

  if (step === "waiting") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 rounded-full border-4 border-yellow-200 animate-ping opacity-75"></div>
          <Clock className="w-10 h-10 text-yellow-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Aguardando Lojista</h2>
        <p className="text-gray-500 text-sm text-center max-w-xs mb-8">
          O lojista recebeu uma notificação e precisa autorizar a transação.
        </p>

        <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
            <Store className="w-5 h-5 text-gray-400" />
            <span className="font-bold text-gray-900">Loja Parceira</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total da Compra</span>
              <span className="font-medium text-gray-900">R$ {formatCurrencyBr(numericPurchase)}</span>
            </div>
            
            {numericCashbackToUse > 0 && (
              <div className="flex justify-between text-sm text-green-600 font-bold">
                <span>Saldo Utilizado</span>
                <span>- R$ {formatCurrencyBr(numericCashbackToUse)}</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-2 border-t border-gray-50 mt-2">
              <span className="text-sm font-bold text-gray-700">A Pagar</span>
              <span className="text-xl font-black text-blue-600">R$ {formatCurrencyBr(amountToPay)}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setStep("form")}
          className="mt-8 text-sm font-bold text-gray-400 hover:text-gray-600"
        >
          Cancelar (simulação)
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-10">
        <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Pagar com Cashback</h1>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
            <Store className="w-3 h-3" />
            <span>Loja Parceira</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 max-w-md mx-auto w-full overflow-y-auto pb-24">
        
        {/* Section 1: Purchase Value */}
        <div className="mb-8">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wide">
            1. Qual o valor total da compra?
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-bold group-focus-within:text-blue-600 transition-colors">
              R$
            </span>
            <input 
              type="tel"
              value={purchaseValue}
              onChange={handlePurchaseChange}
              placeholder="0,00"
              className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-2xl font-bold text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all placeholder-gray-300"
            />
          </div>
        </div>

        {/* Section 2: Cashback Usage */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              2. Quanto vai usar do saldo?
            </label>
            <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-lg">
              <Wallet className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-bold text-gray-600">
                Saldo: R$ {formatCurrencyBr(walletBalance)}
              </span>
            </div>
          </div>

          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 text-lg font-bold">
              R$
            </span>
            <input 
              type="tel"
              value={cashbackToUse}
              onChange={handleCashbackChange}
              placeholder="0,00"
              disabled={numericPurchase <= 0}
              className="w-full bg-green-50 border border-green-200 rounded-xl py-4 pl-12 pr-24 text-2xl font-bold text-green-700 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 outline-none transition-all placeholder-green-700/30 disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <button 
              onClick={handleUseMax}
              disabled={numericPurchase <= 0}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-green-700 bg-white border border-green-200 px-3 py-1.5 rounded-full hover:bg-green-50 active:scale-95 transition-all disabled:opacity-50"
            >
              USAR MÁX
            </button>
          </div>
        </div>

        {/* Section 3: Summary */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
            Resumo da Transação
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Valor da Compra</span>
              <span className="font-bold text-gray-900">R$ {formatCurrencyBr(numericPurchase)}</span>
            </div>
            
            {numericCashbackToUse > 0 && (
              <div className="flex justify-between items-center text-sm text-green-600">
                <span className="font-bold">Desconto (Cashback)</span>
                <span className="font-bold">- R$ {formatCurrencyBr(numericCashbackToUse)}</span>
              </div>
            )}

            <div className="border-t border-gray-100 my-2 pt-2 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-600">Você paga ao lojista</span>
              <span className="text-2xl font-black text-blue-600">
                R$ {formatCurrencyBr(amountToPay)}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Button */}
      <div className="p-5 bg-white border-t border-gray-100 sticky bottom-0 z-20">
        <button 
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed disabled:text-gray-500"
        >
          {isSubmitting ? 'Processando...' : 'Confirmar Pagamento'}
          {!isSubmitting && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
