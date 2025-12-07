import { useEffect, useRef } from "react";

interface ScanQRProps {
  onResult: (qr: string) => void;
  onBack: () => void;
}

export default function MerchantQrScreen({ onResult, onBack }: ScanQRProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment"
          }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error("camera error:", err);
        alert("Não foi possível abrir a câmera.");
      }
    }

    startCamera();
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
      ></video>

      <button
        onClick={onBack}
        className="absolute top-5 left-5 bg-white px-4 py-2 rounded-lg"
      >
        Voltar
      </button>
    </div>
  );
}
