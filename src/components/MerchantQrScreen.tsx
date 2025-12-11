// src/components/MerchantQrScreen.tsx
import React from "react";
import QRCode from "react-qr-code";
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

  // Valor que vai dentro do QR:
  // por enquanto, um link fake /cashback/loja/:merchantId usando o uid do usuário.
  const merchantId = user?.uid ?? "merchant_demo";
  const qrValue = `${window.location.origin}/cashback/loja/${merchantId}`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* HEADER */}
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

      {/* CONTEÚDO */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-10">
        {/* QR CODE DESTACADO */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-white rounded-3xl shadow-lg border border-gray-200">
            <QRCode
              value={qrValue}
              size={220}
              style={{ height: "220px", width: "220px" }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-3">Mostre este QR para o cliente</p>
        </div>

        {/* INFO DO LOJISTA */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-xs text-gray-500">Lojista</p>
          <p className="text-base font-semibold text-gray-900 text-center">
            {displayName}
          </p>
        </div>

        {/* TEXTO EXPLICATIVO */}
        <p className="text-xs text-gray-500 text-center max-w-xs leading-relaxed">
          Em produção, este QR é gerado a partir do seu <strong>merchantId</strong>{" "}
          (<code>{merchantId}</code>) e vinculado ao seu cadastro na plataforma
          Localizei Freguesia. Ao escanear, o cliente será direcionado para:
        </p>

        <p className="text-[10px] text-gray-400 text-center break-all mt-2 max-w-xs">
          {qrValue}
        </p>
      </main>
    </div>
  );
};

export default MerchantQrScreen;
export { MerchantQrScreen };
