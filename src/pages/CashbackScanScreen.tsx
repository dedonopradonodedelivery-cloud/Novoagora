
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, AlertCircle, CameraOff } from 'lucide-react';

interface CashbackScanScreenProps {
  onBack: () => void;
  onScanSuccess: (data: { merchantId: string; storeId: string }) => void;
}

export const CashbackScanScreen: React.FC<CashbackScanScreenProps> = ({ onBack, onScanSuccess }) => {
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const [isDetectorSupported, setIsDetectorSupported] = useState(true);

  const handleScan = (qrData: string) => {
    if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
    }
    setIsScanning(false);

    try {
      const data = JSON.parse(qrData);
      if (data.type === 'localizei_cashback_qr' && data.merchantId && data.storeId) {
        onScanSuccess({ merchantId: data.merchantId, storeId: data.storeId });
      } else {
        throw new Error("QR Code inválido para o Localizei.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Formato de QR Code incorreto.");
      setTimeout(() => {
        setError(null);
        if (isDetectorSupported) {
          scanFrame.current();
        }
      }, 3000);
    }
  };

  const simulateScan = () => {
    handleScan(JSON.stringify({
      type: "localizei_cashback_qr",
      merchantId: "merchant_123_uuid",
      storeId: "store_123_freguesia",
    }));
  };

  const scanFrame = useRef(async () => {});

  useEffect(() => {
    if (!('BarcodeDetector' in window)) {
        setIsDetectorSupported(false);
        setError("Seu navegador não suporta leitura de QR Code.");
        return;
    }
    
    const detector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });
    
    scanFrame.current = async () => {
        if (videoRef.current && !videoRef.current.paused && !videoRef.current.ended) {
            try {
                const barcodes = await detector.detect(videoRef.current);
                if (barcodes.length > 0 && barcodes[0].rawValue) {
                    handleScan(barcodes[0].rawValue);
                    return;
                }
            } catch (err) {
                console.error("Detection error:", err);
            }
        }
        animationFrameId.current = requestAnimationFrame(scanFrame.current);
    };

    const setupCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
                setIsScanning(true);
                animationFrameId.current = requestAnimationFrame(scanFrame.current);
            }
        } catch (err) {
            console.error("Camera access error:", err);
            setError("Câmera não acessível. Verifique as permissões do navegador.");
            setIsScanning(false);
        }
    };
    
    setupCamera();

    return () => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col font-sans">
      <video ref={videoRef} playsInline className="absolute inset-0 w-full h-full object-cover" />

      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div className="relative z-20 flex flex-col h-full">
        {/* Header */}
        <div className="p-5 pt-8 flex items-center justify-between">
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-white font-bold text-sm bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                Escanear QR do Lojista
            </span>
            <div className="w-10"></div>
        </div>

        {/* Viewfinder */}
        <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64">
                <div className="absolute inset-0 border-4 border-white/20 rounded-3xl"></div>
                <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-white rounded-tl-3xl"></div>
                <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-white rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-white rounded-bl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-white rounded-br-3xl"></div>
                {isScanning && (
                    <div className="absolute inset-x-2 top-2 h-0.5 bg-red-500 shadow-[0_0_15px_2px_rgba(239,68,68,0.6)] animate-[scan_3s_infinite_ease-in-out]"></div>
                )}
            </div>
            <p className="text-white/90 mt-8 text-sm font-medium text-center px-10 max-w-xs">
                Aponte a câmera para o QR Code exibido pelo lojista.
            </p>
        </div>

        {/* Footer with simulation */}
        <div className="p-5 pb-8">
            {error && (
              <div className="absolute bottom-32 left-5 right-5 bg-red-600 text-white px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-bold animate-in fade-in slide-in-from-bottom-4">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}
            
            {!isScanning && !error && (
                <div className="flex flex-col items-center text-center text-white">
                    <CameraOff className="w-8 h-8 mb-2 opacity-50"/>
                    <p className="font-bold">Câmera indisponível</p>
                </div>
            )}

            <button 
              onClick={simulateScan}
              className="w-full bg-white text-black font-bold mt-4 py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              Simular Leitura (Modo de Teste)
            </button>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(240px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
