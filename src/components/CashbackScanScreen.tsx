// src/components/CashbackScanScreen.tsx
import React from "react";

export type CashbackScanScreenProps = {
  onBack: () => void;
  onScanSuccess: (data: { merchantId: string; storeId: string }) => void;
};

const CashbackScanScreen: React.FC<CashbackScanScreenProps> = ({
  onBack,
  onScanSuccess,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onBack}
          className="text-sm text-gray-300 hover:text-white transition-colors"
        >
          Voltar
        </button>
        <span className="text-xs text-gray-400">Leitura de QR</span>
      </div>

      {/* Área principal do “scanner” (placeholder) */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-60 h-60 border-2 border-dashed border-gray-500 rounded-3xl flex items-center justify-center mb-6">
          <span className="text-gray-400 text-sm text-center">
            Aqui entra o componente de câmera / scanner de QR Code
          </span>
        </div>

        <p className="text-sm text-gray-300 text-center mb-4">
          Aponte a câmera para o QR Code do estabelecimento parceiro
          para iniciar o pagamento com cashback.
        </p>

        {/* Botão de simulação para dev */}
        <button
          onClick={() => onScanSuccess({ merchantId: "mock-merchant", storeId: "mock-store" })}
          className="mt-4 px-4 py-2 rounded-full bg-white text-black text-sm font-medium"
        >
          Simular QR válido
        </button>
      </div>
    </div>
  );
};

export default CashbackScanScreen;

// Export nomeado para funcionar com:
// import { CashbackScanScreen } from "./CashbackScanScreen";
export { CashbackScanScreen };
