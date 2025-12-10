import { useCallback, useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

export function useQrScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const animationFrameIdRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopScanner = useCallback(() => {
    setIsScanning(false);

    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const scan = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) {
      animationFrameIdRef.current = requestAnimationFrame(scan);
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) {
      animationFrameIdRef.current = requestAnimationFrame(scan);
      return;
    }

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);

    if (code && code.data) {
      setQrCode(code.data);
      setResult(code.data);
      stopScanner();
      return;
    }

    animationFrameIdRef.current = requestAnimationFrame(scan);
  }, [stopScanner]);

  const startScanner = useCallback(async () => {
    try {
      setError(null);
      setResult(null);
      setQrCode(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsScanning(true);
      animationFrameIdRef.current = requestAnimationFrame(scan);
    } catch (err) {
      console.error("Erro ao iniciar o scanner:", err);
      setError("Não foi possível acessar a câmera.");
      setIsScanning(false);
    }
  }, [scan]);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, [stopScanner]);

  return {
    videoRef,
    canvasRef,
    qrCode,
    result,
    error,
    isScanning,
    scanning: isScanning,
    startScanner,
    stopScanner,
    setResult,
  };
}
