import React from "react";

interface CashbackScanScreenProps {
  onBack: () => void;
  onScanSuccess: (data: { merchantId: string; storeId: string }) => void;
}

const CashbackScanScreen: React.FC<CashbackScanScreenProps> = ({ onBack, onScanSuccess }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      <header className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          Escanear QR Code de Cashback
        </h1>
      </header>

      <main className="flex-1 px-4 py-6 flex flex-col items-center justify-center gap-4">
        <p className="text-center text-sm text-white/80 max-w-md">
          Esta tela será usada para ler o QR Code das compras realizadas
          nos estabelecimentos parceiros e creditar automaticamente o
          cashback na carteira do usuário dentro do ecossistema Localizei Freguesia.
        </p>

        <div className="w-full max-w-xs aspect-square rounded-2xl border border-dashed border-white/20 flex items-center justify-center text-xs text-white/60">
          Área reservada para o leitor de QR Code (implementação futura).
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-6 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30"
        >
          Voltar
        </button>

        <button
            type="button"
            onClick={() => onScanSuccess({ merchantId: 'mock_merchant', storeId: 'mock_store' })}
            className="text-xs text-gray-500 underline mt-4"
        >
            Simular Sucesso (Dev)
        </button>
      </main>
    </div>
  );
};

export default CashbackScanScreen;