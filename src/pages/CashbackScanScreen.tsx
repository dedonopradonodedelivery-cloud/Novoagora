import React, { useRef } from "react";

interface Props {
  onBack: () => void;
  onScanSuccess: (data: { merchantId: string; storeId: string }) => void;
}

const CashbackScanScreen: React.FC<Props> = ({ onBack, onScanSuccess }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Envie a foto para seu backend decodificar o QR.
    // Aqui vamos simular:
    const simulatedData = {
      merchantId: "merchant_simulado_123",
      storeId: "store_simulada_456"
    };

    onScanSuccess(simulatedData);
  };

  const openCamera = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col items-center p-6">
      <button onClick={onBack} className="self-start text-sm mb-4">
        Voltar
      </button>

      <h2 className="text-xl font-bold mb-6">Escanear QR Code</h2>

      <button
        onClick={openCamera}
        className="bg-white text-black px-6 py-3 rounded-xl font-bold"
      >
        Abrir Câmera
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
};

export default CashbackScanScreen;
