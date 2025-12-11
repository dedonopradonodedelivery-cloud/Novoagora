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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          Voltar
        </button>
        <h1 className="text-base font-semibold">QR Code do Lojista</h1>
        <div className="text-xs text-gray-400">
          {user ? "Conta logada" : "Não autenticado"}
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-600 mb-1">Lojista</p>
          <p className="text-lg font-semibold text-gray-900">{displayName}</p>
        </div>

        <div className="w-64 h-64 bg-white rounded-3xl shadow-lg border border-gray-200 flex items-center justify-center mb-6">
          <span className="text-gray-400 text-sm text-center px-4">
            Aqui será exibido o QR Code único do lojista para o cliente escanear
            e ganhar/usar cashback.
          </span>
        </div>

        <p className="text-xs text-gray-500 text-center max-w-xs">
          Em produção, este QR seria gerado a partir do seu <strong>merchantId</strong> e
          vinculado ao seu cadastro na plataforma Localizei Freguesia.
        </p>
      </main>
    </div>
  );
};

export default MerchantQrScreen;
export { MerchantQrScreen };
