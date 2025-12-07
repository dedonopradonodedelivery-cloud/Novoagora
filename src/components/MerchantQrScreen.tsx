import React, { useEffect, useRef } from "react";

interface ScanQRProps {
  onResult: (text: string) => void;
  onBack: () => void;
}

// Scanner usando a API nativa sem dependências
export const ScanQR: React.FC<ScanQRProps> = ({ onResult, onBack }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error("Erro ao abrir a câmera:", err);
        alert("Não foi possível acessar a câmera.");
        onBack();
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((t) => t.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[999] flex flex-col">
      {/* Botão Voltar */}
      <button
        onClick={onBack}
        className="text-white absolute top-5 left-5 text-lg bg-black/40 px-4 py-2 rounded-xl"
      >
        Voltar
      </button>

      {/* Vídeo da Câmera */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
      />

      {/* Mensagem */}
      <div className="absolute bottom-10 w-full text-center text-white text-lg">
        Aponte para o QR Code...
      </div>
    </div>
  );
};

export default ScanQR;
