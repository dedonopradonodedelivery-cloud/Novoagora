// src/components/PaymentResultScreen.tsx
import React from "react";

type CashbackFlowMode = "pay_with_cashback" | "earn_cashback";

interface PaymentResultScreenProps {
  status: "success" | "error";
  message: string;
  amount: number;
  transactionId?: string;
  mode: CashbackFlowMode;
  onClose: () => void;
  isSubmitting?: boolean;
}

export const PaymentResultScreen: React.FC<PaymentResultScreenProps> = ({
  status,
  message,
  amount,
  transactionId,
  mode,
  onClose,
}) => {
  const isSuccess = status === "success";

  return (
    <div className="flex flex-col min-h-[70vh] p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isSuccess ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <span className="text-2xl">{isSuccess ? "✅" : "⚠️"}</span>
        </div>

        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          {isSuccess ? "Transação concluída" : "Falha na transação"}
        </h1>

        <p className="text-sm text-gray-700 mb-3">{message}</p>

        <p className="text-sm text-gray-600 mb-1">
          Modo: {mode === "pay_with_cashback" ? "Pagamento com cashback" : "Ganho de cashback"}
        </p>

        <p className="text-lg font-semibold text-gray-900 mb-1">
          Valor: R$ {amount.toFixed(2)}
        </p>

        {transactionId && (
          <p className="text-xs text-gray-400">
            ID da transação: <span className="font-mono">{transactionId}</span>
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-full mt-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600"
      >
        Fechar
      </button>
    </div>
  );
};
