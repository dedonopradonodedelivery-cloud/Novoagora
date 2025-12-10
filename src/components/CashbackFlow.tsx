// src/components/CashbackFlow.tsx
import React, { useState } from "react";

type CashbackFlowMode = "pay_with_cashback" | "earn_cashback";

interface CashbackFlowProps {
  userId: string;
  mode: CashbackFlowMode;
  onClose?: () => void;
}

/**
 * Fluxo SIMPLIFICADO de cashback:
 * - Passo 1: usuário informa valor
 * - Passo 2: "processando"
 * - Passo 3: resultado de sucesso (mock)
 *
 * IMPORTANTE: neste momento é só UI mockada, não chama Supabase nem services.
 */
export const CashbackFlow: React.FC<CashbackFlowProps> = ({
  userId,
  mode,
  onClose,
}) => {
  const [step, setStep] = useState<"amount" | "processing" | "result">("amount");
  const [amountInput, setAmountInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const isPayMode = mode === "pay_with_cashback";

  const handleSubmit = () => {
    setError(null);

    const raw = amountInput.replace(",", ".").trim();
    const value = Number(raw);

    if (!raw || Number.isNaN(value) || value <= 0) {
      setError("Informe um valor válido.");
      return;
    }

    // Aqui, futuramente, vamos chamar o serviço real de cashback.
    setStep("processing");

    setTimeout(() => {
      setResultMessage(
        isPayMode
          ? `Pagamento de R$ ${value.toFixed(
              2
            )} com cashback simulado para o usuário ${userId}.`
          : `Registro de compra de R$ ${value.toFixed(
              2
            )} para gerar cashback (simulado) para o usuário ${userId}.`
      );
      setStep("result");
    }, 1200);
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  if (step === "processing") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <div className="w-14 h-14 rounded-full border-4 border-orange-400 border-t-transparent animate-spin mb-4" />
        <p className="text-lg font-semibold text-gray-900 mb-1">
          Processando operação...
        </p>
        <p className="text-sm text-gray-500">
          Este fluxo está em modo demonstração. Nenhum débito real será feito.
        </p>
      </div>
    );
  }

  if (step === "result") {
    return (
      <div className="flex flex-col min-h-[70vh] p-6">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Operação concluída (mock)
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            {resultMessage ??
              "Fluxo de cashback finalizado em modo de demonstração."}
          </p>
          <p className="text-xs text-gray-400">
            Em breve este fluxo será conectado ao serviço real de cashback.
          </p>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="w-full mt-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600"
        >
          Voltar
        </button>
      </div>
    );
  }

  // step === "amount"
  return (
    <div className="flex flex-col min-h-[70vh] p-6">
      <div className="mb-6">
        <button
          type="button"
          onClick={handleClose}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          ← Voltar
        </button>
      </div>

      <div className="flex-1">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          {isPayMode ? "Pagar com Cashback" : "Registrar compra para Cashback"}
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Este fluxo está em modo demonstração. Use para testar o layout no
          ambiente publicado.
        </p>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Valor da operação
        </label>
        <div className="flex items-center rounded-2xl border border-gray-200 px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 mb-2">
          <span className="text-gray-500 mr-1">R$</span>
          <input
            type="text"
            inputMode="decimal"
            className="flex-1 bg-transparent outline-none text-lg"
            placeholder="0,00"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
          />
        </div>
        {error && <p className="text-xs text-red-600 mb-2">{error}</p>}

        <p className="text-xs text-gray-500 mt-2">
          Nenhum valor será realmente debitado ou creditado enquanto o fluxo
          estiver em modo mock.
        </p>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full mt-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600"
      >
        {isPayMode ? "Confirmar pagamento" : "Registrar compra"}
      </button>
    </div>
  );
};
