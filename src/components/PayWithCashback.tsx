import React from "react";
import { ChevronLeft, Wallet } from "lucide-react";

interface PayWithCashbackProps {
  merchantName: string;
  merchantCashbackPercent: number;
  userBalance: number;
  purchaseValue: string;
  balanceUse: string;
  onBack: () => void;
  onChangePurchaseValue: (val: string) => void;
  onChangeBalanceUse: (val: string) => void;
  onConfirmPayment: () => void;
  isLoading?: boolean;
}

export const PayWithCashback: React.FC<PayWithCashbackProps> = ({
  merchantName,
  merchantCashbackPercent,
  userBalance,
  purchaseValue,
  balanceUse,
  onBack,
  onChangePurchaseValue,
  onChangeBalanceUse,
  onConfirmPayment,
  isLoading,
}) => {
  const disabled = !purchaseValue || purchaseValue === "0,00" || isLoading;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 pb-8">
        {/* Header */}
        <header className="px-4 pt-6 pb-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 shadow flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Pagar com Cashback</span>
            <span className="text-sm font-semibold flex items-center gap-1">
              <Wallet className="w-4 h-4 text-blue-500" />
              {merchantName}
            </span>
          </div>
        </header>

        <main className="px-4 space-y-6">
          {/* Valor da compra */}
          <section>
            <p className="text-sm font-medium mb-2">
              1. Qual o valor total da compra?
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-4 shadow-sm border border-blue-100 dark:border-gray-700">
              <span className="text-xs text-blue-500 font-semibold">R$</span>
              <input
                inputMode="decimal"
                value={purchaseValue}
                onChange={(e) => onChangePurchaseValue(e.target.value)}
                placeholder="0,00"
                className="w-full bg-transparent outline-none text-2xl font-bold tracking-wide text-gray-900 dark:text-white placeholder:text-gray-300 mt-1"
              />
            </div>
          </section>

          {/* Quanto vai usar do saldo */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">2. Quanto vai usar do saldo?</p>
              <span className="text-xs text-gray-500">
                Saldo:{" "}
                <strong>
                  R$ {userBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </strong>
              </span>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl px-4 py-4 shadow-sm border border-emerald-100 dark:border-emerald-800 flex items-center gap-3">
              <div className="flex-1">
                <span className="text-xs text-emerald-600 font-semibold">R$</span>
                <input
                  inputMode="decimal"
                  value={balanceUse}
                  onChange={(e) => onChangeBalanceUse(e.target.value)}
                  placeholder="0,00"
                  className="w-full bg-transparent outline-none text-xl font-semibold tracking-wide text-emerald-700 dark:text-emerald-200 placeholder:text-emerald-200/70 mt-1"
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  onChangeBalanceUse(
                    userBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
                  )
                }
                className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm active:scale-95 transition-transform"
              >
                Usar máx
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* Footer resumo + botão */}
      <div className="mt-auto w-full border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md">
        <div className="max-w-md mx-auto px-4 py-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Cashback da loja</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {merchantCashbackPercent}% em cima do valor da compra
            </span>
          </div>
          <button
            disabled={disabled}
            onClick={onConfirmPayment}
            className={`w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              disabled
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white shadow-lg shadow-blue-500/30 active:scale-[0.97]"
            }`}
          >
            {isLoading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Confirmar Pagamento
          </button>
        </div>
      </div>
    </div>
  );
};
