import React, { useState } from "react";
import { X } from "lucide-react";

interface CashbackScanScreenProps {
  onBack: () => void;
  onScanSuccess: (data: { merchantId: string; storeId: string }) => void;
}

const CashbackScanScreen: React.FC<CashbackScanScreenProps> = ({
  onBack,
  onScanSuccess,
}) => {
  const [error, setError] = useState("");

  const handleFile = async (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    // API pública para ler QR code a partir da imagem
    const res = await fetch("https://api.qrserver.com/v1/read-qr-code/", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    const decoded = result?.[0]?.symbol?.[0]?.data;

    if (!decoded) {
      setError("QR Code inválido.");
      return;
    }

    try {
      const parsed = JSON.parse(decoded);
      if (!parsed.merchantId || !parsed.storeId) {
        setError("QR inválido.");
        return;
      }
      onScanSuccess(parsed);
    } catch (e) {
      setError("QR inválido.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="absolute top-5 right-5">
        <button
          onClick={onBack}
          className="p-3 rounded-full bg-white/20 text-white"
        >
          <X size={26} />
        </button>
      </div>

      <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Escanear QR Code</h2>

        <p className="text-gray-600 mb-6">
          Aponte para um QR Code ou toque para abrir a câmera.
        </p>

        <label className="bg-blue-600 text-white py-3 px-6 rounded-xl text-sm font-bold inline-block cursor-pointer">
          Abrir Câmera
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFile}
            className="hidden"
          />
        </label>

        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default CashbackScanScreen;
