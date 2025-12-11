// src/components/MerchantQrScreen.tsx
import React from "react";

export type MerchantQrScreenProps = {
  // No futuro você pode adicionar props aqui, ex:
  // merchantName?: string;
};

const MerchantQrScreen: React.FC<MerchantQrScreenProps> = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 px-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        QR Code do Lojista
      </h1>
      <p className="text-sm text-gray-600 text-center max-w-xs mb-6">
        Aqui você poderá mostrar o QR Code do estabelecimento para o cliente
        escanear e receber ou usar cashback.
      </p>

      <div className="w-60 h-60 bg-gray-200 rounded-3xl flex items-center justify-center">
        <span className="text-gray-500 text-sm text-center">
          Placeholder do QR Code
        </span>
      </div>
    </div>
  );
};

export default MerchantQrScreen;

// Export nomeado para funcionar com:
// import { MerchantQrScreen } from "./components/MerchantQrScreen";
export { MerchantQrScreen };
