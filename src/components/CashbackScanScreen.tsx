import React, { useState } from 'react';
import { ChevronLeft, QrCode, Camera, AlertCircle } from 'lucide-react';

interface CashbackScanScreenProps {
  onBack: () => void;
  onScanSuccess: (data: { merchantId: string; storeId: string }) => void;
}

export const CashbackScanScreen: React.FC<CashbackScanScreenProps> = ({ onBack, onScanSuccess }) => {
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  // Simulação da leitura do QR Code (em um app real usaria uma lib de câmera)
  const simulateScan = () => {
    try {
      // Mock do payload que viria do QR Code
      const mockPayload = JSON.stringify({
        type: "localizei_cashback_qr",
        merchantId: "merchant_123_uuid", // ID do lojista
        storeId: "store_123_freguesia", // ID da loja
        env: "prod"
      });

      const data = JSON.parse(mockPayload);

      if (data.type !== 'localizei_cashback_qr') {
        throw new Error("QR Code inválido para cashback.");
      }

      setIsScanning(false);
      onScanSuccess({ merchantId: data.merchantId, storeId: data.storeId });

    } catch (err: any) {
      setError(err.message || "Erro ao ler QR Code");
      setIsScanning(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      
      {/* Header Transparente */}
      <div className="absolute top-0 left-0 right-0 p-5 pt-8 z-20 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-white font-bold text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
          Escanear QR do Lojista
        </span>
        <div className="w-10"></div>
      </div>

      {/* Camera Viewfinder Mock */}
      <div className="flex-1 relative flex flex-col items-center justify-center">
        {/* Background Camera Image Simulation */}
        <div className="absolute inset-0 opacity-50 bg-gray-900">
            {/* Aqui iria o componente <Camera /> real */}
        </div>

        {/* Scan Frame */}
        <div className="relative z-10 w-64 h-64 border-2 border-white/50 rounded-3xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 border-2 border-[#1E5BFF] rounded-3xl animate-pulse"></div>
            <div className="w-60 h-0.5 bg-red-500 shadow-[0_0_15px_rgba(255,0,0,0.5)] animate-[scan_2s_infinite]"></div>
        </div>

        <p className="relative z-10 text-white/80 mt-8 text-sm font-medium text-center px-10">
          Aponte a câmera para o QR Code exibido no celular do lojista ou no balcão.
        </p>

        {error && (
          <div className="absolute bottom-32 bg-red-500/90 text-white px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-bold animate-in fade-in slide-in-from-bottom-4">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Dev Only Button */}
        <button 
          onClick={simulateScan}
          className="absolute bottom-10 bg-white text-black font-bold py-3 px-6 rounded-full shadow-xl flex items-center gap-2 active:scale-95 transition-transform z-30"
        >
          <Camera className="w-5 h-5" />
          Simular Leitura (Dev)
        </button>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-120px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(120px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};