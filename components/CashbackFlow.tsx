import React, { useState } from "react";
import { CashbackScanScreen } from "./CashbackScanScreen";
import PayWithCashbackScreen from "./PayWithCashbackScreen";
import PaymentResultScreen from "./PaymentResultScreen";
import { createCashbackTransaction } from "@/src/services/cashbackService";

type FlowStep = "scan" | "pay" | "waiting" | "result";
type ResultStatus = "approved" | "rejected";

type CashbackFlowProps = {
  initialStoreName?: string;
  initialCashbackPercent?: number;
  // No futuro podemos substituir isso por auth real
  mockUserId?: string;
  mockMerchantId?: string;
};

export default function CashbackFlow({
  initialStoreName = "Loja Parceira",
  initialCashbackPercent = 5,
  mockUserId = "00000000-0000-0000-0000-000000000001",
  mockMerchantId = "00000000-0000-0000-0000-000000000002",
}: CashbackFlowProps): JSX.Element {
  const [step, setStep] = useState<FlowStep>("scan");
  const [storeName] = useState<string>(initialStoreName);
  const [cashbackPercent] = useState<number>(initialCashbackPercent);

  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);
  const [cashbackUsed, setCashbackUsed] = useState<number>(0);
  const [resultStatus, setResultStatus] = useState<ResultStatus>("approved");
  const [lastError, setLastError] = useState<string | null>(null);

  const [lastSession, setLastSession] = useState<{
    merchantId: string;
    storeId: string;
  } | null>(null);

  if (step === "scan") {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-md mx-auto">
          <CashbackScanScreen
            onScanSuccess={({ merchantId, storeId }) => {
              setLastSession({ merchantId, storeId });
              setStep("pay");
            }}
            onBack={() => {
              // Em um app real, isso poderia voltar para a Home
              // Aqui apenas mantemos na própria tela.
            }}
          />
        </div>
      </div>
    );
  }

  if (step === "pay") {
    return (
      <PayWithCashbackScreen
        storeName={storeName}
        cashbackPercent={cashbackPercent}
        onPaymentSimulated={async ({ purchaseAmount, cashbackUsed }) => {
          setLastError(null);
          setPurchaseAmount(purchaseAmount);
          setCashbackUsed(cashbackUsed);
          setStep("waiting");

          try {
            const { transaction, error } = await createCashbackTransaction({
              userId: mockUserId,
              merchantId: lastSession?.merchantId ?? mockMerchantId,
              purchaseAmount,
              cashbackUsed,
              cashbackPercent,
              status: "approved",
              sourceChannel: "qrcode",
              qrCodeValue: lastSession?.storeId ?? null,
              pinValue: null,
            });

            if (error || !transaction) {
              setResultStatus("rejected");
              setLastError(error?.message || "Erro ao registrar transação.");
            } else {
              setResultStatus("approved");
            }
          } catch (err: any) {
            setResultStatus("rejected");
            setLastError(err?.message || "Erro inesperado ao processar pagamento.");
          } finally {
            setStep("result");
          }
        }}
        onBack={() => {
          setStep("scan");
        }}
      />
    );
  }

  if (step === "waiting") {
    const toPay = Math.max(purchaseAmount - cashbackUsed, 0);

    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <div className="max-w-md mx-auto px-4 py-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-2xl mb-4">
            ⏳
          </div>
          <h1 className="text-xl font-semibold mb-2">Aguardando Lojista</h1>
          <p className="text-sm text-gray-500 mb-6">
            Estamos registrando sua transação e atualizando seu cashback.
          </p>
          <div className="w-full bg-white rounded-xl shadow-sm p-4 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Loja</span>
              <span className="font-medium">{storeName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Valor da Compra</span>
              <span className="font-medium">
                {purchaseAmount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Saldo Utilizado</span>
              <span className="font-medium text-green-600">
                -{" "}
                {cashbackUsed.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
              <span className="text-gray-700 font-semibold">A Pagar</span>
              <span className="font-semibold text-blue-600">
                {toPay.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </div>
          {lastError && (
            <p className="mt-4 text-xs text-red-500 max-w-sm">
              {lastError}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (step === "result") {
    return (
      <PaymentResultScreen
        status={resultStatus}
        storeName={storeName}
        purchaseAmount={purchaseAmount}
        cashbackUsed={cashbackUsed}
        onBackToHome={() => {
          setStep("scan");
          setPurchaseAmount(0);
          setCashbackUsed(0);
          setLastSession(null);
          setLastError(null);
          setResultStatus("approved");
        }}
        onViewDetails={() => {
          window.alert(
            lastError
              ? `Erro na transação: ${lastError}`
              : "Detalhes da transação (simulação)"
          );
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto">
        <CashbackScanScreen
          onScanSuccess={({ merchantId, storeId }) => {
            setLastSession({ merchantId, storeId });
            setStep("pay");
          }}
          onBack={() => {}}
        />
      </div>
    </div>
  );
}
