// src/components/CashbackFlow.tsx
import React, { useState, useCallback } from "react";
import { CashbackScanScreen } from "./CashbackScanScreen";
import { PayWithCashbackScreen } from "./PayWithCashbackScreen";
import { PaymentResultScreen } from "./PaymentResultScreen";
import { createCashbackTransaction } from "../services/cashbackService";

type FlowStep = "scan" | "pay" | "waiting" | "result";

type CashbackFlowMode = "pay_with_cashback" | "earn_cashback";

interface CashbackFlowProps {
  userId: string;
  /**
   * Modo de uso do fluxo:
   * - "pay_with_cashback": usuário paga com o saldo da carteira
   * - "earn_cashback": usuário ganha cashback numa compra normal
   */
  mode: CashbackFlowMode;
  /**
   * Chamado quando o fluxo termina (usuário volta para a tela anterior, etc.)
   */
  onClose?: () => void;
}

export const CashbackFlow: React.FC<CashbackFlowProps> = ({
  userId,
  mode,
  onClose,
}) => {
  const [step, setStep] = useState<FlowStep>("scan");

  const [merchantId, setMerchantId] = useState<string | null>(null);
  const [merchantName, setMerchantName] = useState<string | null>(null);

  const [amount, setAmount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [resultStatus, setResultStatus] = useState<"success" | "error" | null>(
    null
  );
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  // Quando o QR/PIN é validado pela tela de scan
  const handleScanSuccess = useCallback(
    (data: { merchantId: string; merchantName?: string }) => {
      setMerchantId(data.merchantId);
      setMerchantName(data.merchantName ?? null);
      setStep("pay");
    },
    []
  );

  const handleScanCancel = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  // Quando o usuário preenche o valor na tela de pagamento
  const handleConfirmPayment = useCallback(
    async (value: number) => {
      if (!merchantId) return;

      setAmount(value);
      setStep("waiting");
      setIsSubmitting(true);

      try {
        const { transaction, statusMessage } = await createCashbackTransaction({
          userId,
          merchantId,
          amount: value,
          mode,
        });

        setTransactionId(transaction.id);
        setResultStatus("success");
        setResultMessage(statusMessage ?? "Transação concluída com sucesso!");
      } catch (error: any) {
        console.error("Erro ao criar transação de cashback:", error);
        setResultStatus("error");
        setResultMessage(
          error?.message ??
            "Não foi possível processar a transação. Tente novamente."
        );
      } finally {
        setIsSubmitting(false);
        setStep("result");
      }
    },
    [merchantId, mode, userId]
  );

  const handlePaymentBack = useCallback(() => {
    // Volta para o scan para ler outro QR/PIN
    setMerchantId(null);
    setMerchantName(null);
    setAmount(0);
    setStep("scan");
  }, []);

  const handleResultClose = useCallback(() => {
    // Se quiser, pode voltar ao início ou fechar o fluxo
    if (onClose) {
      onClose();
      return;
    }

    // Default: volta para tela de scan para nova operação
    setMerchantId(null);
    setMerchantName(null);
    setAmount(0);
    setTransactionId(null);
    setResultStatus(null);
    setResultMessage(null);
    setStep("scan");
  }, [onClose]);

  // RENDER

  if (step === "scan") {
    return (
      <CashbackScanScreen
        mode={mode}
        onScanSuccess={handleScanSuccess}
        onCancel={handleScanCancel}
      />
    );
  }

  if (step === "pay") {
    return (
      <PayWithCashbackScreen
        mode={mode}
        userId={userId}
        merchantId={merchantId!}
        merchantName={merchantName ?? undefined}
        onConfirm={handleConfirmPayment}
        onBack={handlePaymentBack}
      />
    );
  }

  if (step === "waiting") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <div className="mb-4">
          <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-lg font-semibold mb-2">
          Processando transação de cashback...
        </p>
        <p className="text-sm text-gray-500">
          Não feche esta tela até a confirmação.
        </p>
      </div>
    );
  }

  // step === "result"
  return (
    <PaymentResultScreen
      status={resultStatus ?? "error"}
      message={resultMessage ?? "Não foi possível concluir a transação."}
      amount={amount}
      transactionId={transactionId ?? undefined}
      mode={mode}
      onClose={handleResultClose}
    />
  );
};
