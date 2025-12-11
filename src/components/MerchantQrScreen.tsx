// src/components/MerchantQrScreen.tsx
import React from "react";
import type { User } from "firebase/auth";

export type MerchantQrScreenProps = {
  onBack: () => void;
  user: User | null;
};

const MerchantQrScreen: React.FC<MerchantQrScreenProps> = ({ onBack, user }) => {
  const displayName =
    user?.displayName ||
    user?.email ||
    "Lojista parceiro";

  const merchantId = user?.uid ?? "merchant_demo";
  const qrValue = `${window.location.origin}/cashback/loja/${merchantId}`;

  // QR code gerado sem dependências (Google Charts API)
  const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(
    qrValue
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          Voltar
        </button>
        <h1 className="text-base font-semibold">QR Code do Lojista</h1>
        <span className="text-xs text-gray-400">
          {user ? "Conta logada" : "Não autenticado"}
        </span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start px-6 py-10">
        
        {/* QR CODE REAL (SEM DEPENDÊNCIA) */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={qrUrl}
            alt="QR Code do Lojista"
            className="w-64 h-64 rounded-2xl shadow-lg border border-gray-200 bg-white"
          />
          <p className="text-sm text-gray-600 mt-3">
            Mostre este QR para o cliente
          </p>
        </div>

        <div className="flex flex-col items-center mb-6">
          <p className="text-xs text-gray-500">Lojista</p>
          <p className="text-base font-semibold text-gray-900">{displayName}</p>
        </div>

        <p className="text-xs text-gray-500 text-center max-w-xs leading-relaxed">
          QR gerado automaticamente a partir do seu <strong>merchantId</strong>:
        </p>

        <p className="text-[11px] text-gray-400 text-center break-all mt-2 max-w-xs">
          {qrValue}
        </p>
      </main>
    </div>
  );
};

export default MerchantQrScreen;
export { MerchantQrScreen };
