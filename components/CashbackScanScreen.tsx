import React, { useEffect, useRef, useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import jsQR from 'jsqr';

interface CashbackScanScreenProps {
  onBack: () => void;
  onScanSuccess: (data: { merchantId: string; storeId: string }) => void;
}

export const CashbackScanScreen: React.FC<CashbackScanScreenProps> = ({
  onBack,
  onScanSuccess,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        setIsScanning(true);
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          scanLoop();
        }
      } catch (err) {
        console.error('Erro ao acessar câmera:', err);
        setError('Não foi possível acessar a câmera. Verifique as permissões.');
        setIsScanning(false);
      }
    };

    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
      cancelAnimationFrame(animationFrameId);
    };

    const parsePayload = (raw: string) => {
      try {
        // 1) tenta JSON
        const data = JSON.parse(raw);
        if (
          data &&
          data.type === 'LOCALIZEI_MERCHANT_QR' &&
          typeof data.merchantId === 'string'
        ) {
          const storeId =
            typeof data.storeId === 'string' ? data.storeId : 'default_store';
          onScanSuccess({ merchantId: data.merchantId, storeId });
          return true;
        }
      } catch {
        // 2) se não for JSON, tenta extrair de URL /cashback/loja/:id
        const match = raw.match(/\/cashback\/loja\/([^/]+)/);
        if (match && match[1]) {
          onScanSuccess({ merchantId: match[1], storeId: 'default_store' });
          return true;
        }
      }
      setError('QR Code inválido para cashback. Tente outro código.');
      return false;
    };

    const scanLoop = () => {
      if (!videoRef.current || !canvasRef.current) {
        animationFrameId = requestAnimationFrame(scanLoop);
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animationFrameId = requestAnimationFrame(scanLoop);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code && code.data) {
        const ok = parsePayload(code.data);
        if (ok) {
          setIsScanning(false);
          stopCamera();
          return;
        }
      }

      animationFrameId = requestAnimationFrame(scanLoop);
    };

    startCamera();

    return () => {
      stopCamera();
    };
  }, [onScanSuccess]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="flex items-center justify-between px-4 pt-4 pb-3">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-colors"
          aria-label="Voltar"
        >
          <X className="w-5 h-5 text-gray-200" />
        </button>
        <h1 className="text-sm font-semibold text-gray-100">
          Escanear QR do Lojista
        </h1>
        <div className="w-8" />
      </header>

      <main className="flex-1 flex flex-col items-center px-4 pb-6">
        <div className="relative w-full max-w-xs aspect-square rounded-3xl overflow-hidden border-2 border-blue-500/60 bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            playsInline
          />
          <canvas ref={canvasRef} className="hidden" />
          <div className="absolute inset-6 border-2 border-white/70 rounded-2xl pointer-events-none" />
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-gray-100">
            Aponte a câmera para o QR do lojista
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Use o QR gerado na área do lojista. Assim garantimos que o
            cashback seja aplicado corretamente.
          </p>
        </div>

        {isScanning && (
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-300">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Lendo QR code...
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-start gap-2 text-xs text-red-300 bg-red-900/40 px-3 py-2 rounded-xl">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-[2px]" />
            <p>{error}</p>
          </div>
        )}
      </main>
    </div>
  );
};
