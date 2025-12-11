import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

export function useQrScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  async function startScanner() {
    setError(null);
    setResult(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });

      if (!videoRef.current) return;

      videoRef.current.srcObject = stream;
      // Garante compatibilidade com iOS para não abrir em tela cheia
      videoRef.current.setAttribute("playsinline", "true"); 
      await videoRef.current.play();
      setScanning(true);
    } catch (err) {
      console.error("Camera error:", err);
      setError("Não foi possível acessar a câmera. Verifique permissões.");
      setScanning(false);
    }
  }

  function stopScanner() {
    setScanning(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }

  useEffect(() => {
    if (!scanning) return;

    const interval = setInterval(() => {
      if (!canvasRef.current || !videoRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          setResult(code.data);
          stopScanner();
        }
      }
    }, 250);

    return () => clearInterval(interval);
  }, [scanning]);

  // Limpeza ao desmontar componente
  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return {
    videoRef,
    canvasRef,
    scanning,
    result,
    error,
    startScanner,
    stopScanner,
    setResult
  };
}