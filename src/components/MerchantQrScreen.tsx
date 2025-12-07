// ScanQR.tsx — versão iPhone SAFE, câmera abre direto

import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { ArrowLeft } from "lucide-react";

interface ScanQRProps {
  onBack: () => void;
  onScan: (data: string) => void;
}

export const ScanQR: React.FC<ScanQRProps> = ({ onBack, onScan }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const permission = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });

        if (!videoRef.current) return;
        videoRef.current.srcObject = permission;
        await videoRef.current.play();

        codeReader.current.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          (result, err) => {
            if (result) {
              onScan(result.getText());
            }
          }
        );
      } catch (err) {
        console.error(err);
        setError("A câmera não pôde ser iniciada. Verifique permissões.");
      }
    };

    startCamera();

    return () => {
      codeReader.current.reset();
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-[200]">

      {/* Header */}
      <div className="p-4 flex items-center gap-3 text-white">
        <button onClick={onBack} className="p-2">
          <ArrowLeft size={26} />
        </button>
        <h1 className="text-lg font-semibold">Escanear QR do Lojista</h1>
      </div>

      {/* Video Preview */}
      <div className="flex-1 flex items-center justify-center">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-600 text-white text-center">
          {error}
        </div>
      )}
    </div>
  );
};
