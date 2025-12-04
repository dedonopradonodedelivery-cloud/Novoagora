import React, { useMemo, useState } from "react";
import { Store, Clock, XCircle, Lock, Smartphone, Send } from "lucide-react";
import { PayWithCashback } from "./PayWithCashback";
import { TransactionSuccessModal } from "./TransactionSuccessModal";

type Step = "input" | "sending_push" | "waiting" | "approved" | "rejected";

interface CashbackPaymentScreenProps {
  merchantId: string;
  merchantName: string;
  cashbackPercent: number;
  userBalance: number;
  onBack: () => void;
  onComplete: () => void;
}

const parseCurrencyToNumber = (val: string): number => {
  if (!val) return 0;
  const normalized = val.replace(/\./g, "").replace(",", ".");
  const n = Number(normalized);
  return Number.isNaN(n) ? 0 : n;
};

export const CashbackPaymentScreen: React.FC<CashbackPaymentScreenProps> = ({
  merchantId,
  merchantName,
  cashbackPercent,
  userBalance,
  onBack,
  onComplete,
}) => {
  const [step, setStep] = useState<Step>("input");
  const [totalAmount, setTotalAmount] = useState("");
  const [cashbackToUse, setCashbackToUse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const numericTotal = useMemo(() => parseCurrencyToNumber(totalAmount), [totalAmount]);
  const numericCashbackUsed = useMemo(
    () => parseCurrencyToNumber(cashbackToUse),
    [cashbackToUse],
  );

  const payNow = Math.max(0, numericTotal - numericCashbackUsed);
  const cashbackToEarnDisplay = (numericTotal * cashbackPercent) / 100;

  const handlePurchaseChange = (val: string) => {
    if (!/^\d*[,]?\d{0,2}$/.test(val)) return;
    setTotalAmount(val);

    const newTotal = parseCurrencyToNumber(val);
    const used = parseCurrencyToNumber(cashbackToUse);

    if (used > newTotal) {
      const maxAllowed = Math.min(newTotal, userBalance);
      if (maxAllowed <= 0) {
        setCashbackToUse("");
      } else {
        setCashbackToUse(
          maxAllowed.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
        );
      }
    }
  };

  const handleBalanceUseChange = (val: string) => {
    if (!/^\d*[,]?\d{0,2}$/.test(val)) return;

    const n = parseCurrencyToNumber(val);
    const total = parseCurrencyToNumber(totalAmount);

    if (n > userBalance || n > total) return;
    setCashbackToUse(val);
  };

  const handleConfirmPayment = () => {
    if (numericTotal <= 0) return;
    if (numericCashbackUsed > numericTotal) return;

    setIsLoading(true);
    setStep("sending_push");

    // Simulação do fluxo com lojista
    setTimeout(() => {
      setStep("waiting");
      setIsLoading(false);

      setTimeout(() => {
        setStep("approved");
      }, 2000);
    }, 1000);
  };

  const handleSuccessClose = () => {
    onComplete();
  };

  // Rejected simple screen
  if (step === "rejected") {
    return (
      <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-6 text-white">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Pagamento recusado</h2>
        <p className="text-red-100 text-center mb-8 max-w-xs">
          O lojista não confirmou a transação. O saldo não foi descontado.
        </p>
        <button
          onClick={() => setStep("input")}
          className="bg-white text-red-600 font-bold py-3 px-8 rounded-2xl"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (step === "sending_push" || step === "waiting" || step === "approved") {
    return (
      <>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
          {/* Estado visual da conexão */}
          {step === "sending_push" && (
            <div className="mb-8 relative">
              <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center animate-pulse">
                <Smartphone className="w-16 h-16 text-blue-500" />
              </div>
              <div className="absolute top-0 right-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white">
                  <Send className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          )}

          {(step === "waiting" || step === "approved") && (
            <div className="w-32 h-32 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mb-8 relative shadow-lg">
              <div className="absolute inset-0 rounded-full border-4 border-yellow-100 dark:border-yellow-800/50" />
              <Clock className="w-12 h-12 text-yellow-500" />
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            {step === "sending_push" ? "Enviando pedido..." : "Aguardando lojista"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-xs">
            O lojista recebeu uma notificação e precisa autorizar a transação.
          </p>

          {/* Resumo */}
          <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm mb-8">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100 dark:border-gray-700 border-dashed">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Estabelecimento
              </span>
              <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-blue-600" />
                {merchantName}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total da compra
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                R$ {numericTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>
            {numericCashbackUsed > 0 && (
              <div className="flex justify-between items-center mb-2 text-red-500">
                <span className="text-sm font-medium">Saldo utilizado</span>
                <span className="font-bold">
                  - R$ {numericCashbackUsed.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
            )}
            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl flex justify-between items-center mt-4">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                A pagar
              </span>
              <span className="text-xl font-black text-blue-600">
                R$ {payNow.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {step === "waiting" && (
            <button
              onClick={() => setStep("approved")}
              className="w-full max-w-sm bg-yellow-50 dark:bg-yellow-900/10 text-yellow-700 dark:text-yellow-400 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border border-yellow-200 dark:border-yellow-800"
            >
              <Lock className="w-3 h-3" />
              Simular aprovação (demo)
            </button>
          )}
        </div>

        <TransactionSuccessModal
          isOpen={step === "approved"}
          amountPaid={payNow}
          cashbackEarned={cashbackToEarnDisplay}
          onClose={handleSuccessClose}
        />
      </>
    );
  }

  return (
    <PayWithCashback
      merchantName={merchantName}
      merchantCashbackPercent={cashbackPercent}
      userBalance={userBalance}
      purchaseValue={totalAmount}
      balanceUse={cashbackToUse}
      onBack={onBack}
      onChangePurchaseValue={handlePurchaseChange}
      onChangeBalanceUse={handleBalanceUseChange}
      onConfirmPayment={handleConfirmPayment}
      isLoading={isLoading}
    />
  );
};
