
import React, { useState } from "react";

type PayWithCashbackScreenProps = {
  storeName: string;
  cashbackPercent: number; // percentual máximo de cashback disponível, ex: 5 (%)
  walletBalance?: number;  // saldo de cashback do usuário em reais (padrão 10)
  onPaymentSimulated: (args: { purchaseAmount: number; cashbackUsed: number }) => void;
  onBack?: () => void;
};

export default function PayWithCashbackScreen({
  storeName,
  cashbackPercent,
  walletBalance = 10,
  onPaymentSimulated,
  onBack,
}: PayWithCashbackScreenProps): JSX.Element {
  const [purchaseValue, setPurchaseValue] = useState<string>("");
  const [cashbackToUse, setCashbackToUse] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"form" | "waiting">("form");

  function parseCurrency(value: string): number {
    const onlyDigits = value.replace(/\D/g, "");
    if (!onlyDigits) return 0;
    const int = parseInt(onlyDigits, 10);
    return int / 100;
  }

  function formatCurrencyBr(value: number): string {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const numericPurchase = parseCurrency(purchaseValue);
  const numericCashbackToUse = parseCurrency(cashbackToUse);
  const cappedCashback = Math.min(numericCashbackToUse, walletBalance, numericPurchase);
  const toPay = Math.max(numericPurchase - cappedCashback, 0);

  const handlePurchaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    const onlyDigits = raw.replace(/\D/g, "");
    if (!onlyDigits) {
      setPurchaseValue("");
      return;
    }
    const int = parseInt(onlyDigits, 10);
    const asNumber = int / 100;
    setPurchaseValue(
      asNumber.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    );
  };

  const handleCashbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    const onlyDigits = raw.replace(/\D/g, "");
    if (!onlyDigits) {
      setCashbackToUse("");
      return;
    }
    const int = parseInt(onlyDigits, 10);
    let asNumber = int / 100;
    asNumber = Math.min(asNumber, walletBalance, numericPurchase);
    setCashbackToUse(
      asNumber.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    );
  };

  const handleUseMax = () => {
    const maxUsable = Math.min(walletBalance, numericPurchase);
    setCashbackToUse(
      maxUsable.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    );
  };

  const handleSubmit = () => {
    if (numericPurchase <= 0 || cappedCashback < 0 || cappedCashback > walletBalance || cappedCashback > numericPurchase) {
      return;
    }

    setIsSubmitting(true);
    setStep("waiting");

    setTimeout(() => {
      setIsSubmitting(false);
      onPaymentSimulated({
        purchaseAmount: numericPurchase,
        cashbackUsed: cappedCashback,
      });
    }, 1500);
  };

  if (step === "waiting") {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <div className="max-w-md mx-auto px-4 py-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-2xl mb-4">
            ⏳
          </div>
          <h1 className="text-xl font-semibold mb-2">Aguardando Lojista</h1>
          <p className="text-sm text-gray-500 mb-6">
            O lojista recebeu uma notificação e precisa autorizar a transação.
          </p>
          <div className="w-full bg-white rounded-xl shadow-sm p-4 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Loja</span>
              <span className="font-medium">{storeName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Valor da Compra</span>
              <span className="font-medium">
                {formatCurrencyBr(numericPurchase)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Saldo Utilizado</span>
              <span className="font-medium text-green-600">
                - {formatCurrencyBr(cappedCashback)}
              </span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
              <span className="text-gray-700 font-semibold">A Pagar</span>
              <span className="font-semibold text-blue-600">
                {formatCurrencyBr(toPay)}
              </span>
            </div>
          </div>
          {onBack && (
            <button
              type="button"
              className="mt-6 text-xs text-gray-500 underline"
              onClick={() => {
                setStep("form");
                setIsSubmitting(false);
              }}
            >
              Cancelar e editar valores
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-md mx-auto px-4 py-6 flex flex-col min-h-screen">
        <header className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => {
              if (onBack) {
                onBack();
              } else {
                window.history.back();
              }
            }}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            ←
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Pagar com Cashback</h1>
            <p className="text-xs text-gray-500">
              🏬 {storeName} • Cashback {cashbackPercent.toFixed(0)}%
            </p>
          </div>
        </header>

        <div className="space-y-6 flex-1">
          <section className="space-y-2">
            <p className="text-[11px] font-semibold tracking-wide text-gray-500">
              1. QUAL O VALOR TOTAL DA COMPRA?
            </p>
            <input
              type="tel"
              inputMode="numeric"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="R$ 0,00"
              value={purchaseValue}
              onChange={handlePurchaseChange}
            />
          </section>

          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold tracking-wide text-gray-500">
                2. Quanto vai usar do saldo?
              </p>
              <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-[11px] font-medium text-green-700">
                Saldo: {formatCurrencyBr(walletBalance)}
              </span>
            </div>
            <div className="rounded-2xl bg-green-50/80 border border-green-100 p-3 flex items-center gap-2">
              <input
                type="tel"
                inputMode="numeric"
                className="flex-1 bg-transparent text-base font-medium focus:outline-none"
                placeholder="R$ 0,00"
                value={cashbackToUse}
                onChange={handleCashbackChange}
              />
              <button
                type="button"
                onClick={handleUseMax}
                className="text-[11px] font-semibold px-3 py-1 rounded-full border border-green-500 text-green-700 hover:bg-green-100"
              >
                USAR MÁX
              </button>
            </div>
          </section>

          <section className="space-y-2">
            <p className="text-[11px] font-semibold tracking-wide text-gray-500">
              RESUMO DA TRANSAÇÃO
            </p>
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Valor da Compra</span>
                <span className="font-medium">
                  {formatCurrencyBr(numericPurchase)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Desconto (Cashback)</span>
                <span className="font-medium text-green-600">
                  - {formatCurrencyBr(cappedCashback)}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                <span className="text-gray-700 font-semibold">
                  Você paga ao lojista
                </span>
                <span className="font-semibold text-blue-600">
                  {formatCurrencyBr(toPay)}
                </span>
              </div>
            </div>
          </section>
        </div>

        <button
          type="button"
          className="mt-6 mb-2 w-full py-3 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          disabled={
            numericPurchase <= 0 ||
            cappedCashback < 0 ||
            cappedCashback > walletBalance ||
            cappedCashback > numericPurchase ||
            isSubmitting
          }
          onClick={handleSubmit}
        >
          {isSubmitting ? "Processando..." : "Confirmar Pagamento →"}
        </button>
      </div>
    </div>
  );
}
