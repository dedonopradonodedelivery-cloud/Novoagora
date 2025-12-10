// src/hooks/useQrScanner.ts

import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

export function useQrScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    async function startScanner() {
      try {
        setIsScanning(true);

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) return;

        const scan = () => {
          if (!videoRef.current) return;

          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;

          context.drawImage(
            videoRef.current,
            0,
            0,
            canvas.width,
            canvas.height
          );

          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );

          const code = jsQR(imageData.data, canvas.width, canvas.height);

          if (code && code.data) {
            setQrCode(code.data);
            stopScanner();
            return;
          }

          animationFrameId = requestAnimationFrame(scan);
        };

        scan();
      } catch (error) {
        console.error("Erro ao iniciar o scanner:", error);
        setIsScanning(false);
      }
    }

    function stopScanner() {
      setIsScanning(false);
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
      cancelAnimationFrame(animationFrameId);
    }

    startScanner();

    return () => stopScanner();
  }, []);

  return { videoRef, qrCode, isScanning };
}
