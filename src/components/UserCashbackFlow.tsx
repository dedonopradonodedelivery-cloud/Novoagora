// src/components/UserCashbackFlow.tsx
import React from "react";

interface UserCashbackFlowProps {
  onBack: () => void;
}

/**
 * Placeholder temporário para não quebrar o build.
 * O fluxo real está em CashbackFlow.
 */
export const UserCashbackFlow: React.FC<UserCashbackFlowProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-[70vh] p-6">
      <button
        type="button"
        onClick={onBack}
        className="text-sm text-gray-600 hover:text-gray-900 mb-4"
      >
        ← Voltar
      </button>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Fluxo antigo de Cashback desativado
        </h1>
        <p className="text-sm text-gray-600 max-w-md">
          Este componente foi mantido apenas como placeholder. 
          O fluxo de cashback ativo está sendo feito pelo componente{" "}
          <code>CashbackFlow</code>.
        </p>
      </div>
    </div>
  );
};
