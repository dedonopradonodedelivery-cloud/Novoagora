import React, { useState, useEffect } from "react";
import { Camera, QrCode, KeyRound, ArrowLeft, Loader2, ArrowRight } from "lucide-react";
import { useQrScanner } from "../hooks/useQrScanner";

interface CashbackScanScreenProps {
  onBack: () => void;
  onScanSuccess: (data: { merchantId: string; storeId: string }) => void;
}

/**
 * Tela de leitura de QR + fallback por PIN
 *
 * - Usa o hook useQrScanner (câmera + jsQR)
 * - Tem botão claro de "Iniciar Leitura" (obrigatório p/ iPhone)
 * - Tem aba para alternar entre QR e PIN
 * - Exibe mensagem de erro quando a câmera é bloqueada
 */
export const CashbackScanScreen: React.FC<CashbackScanScreenProps> = ({ onBack, onScanSuccess }) => {
  const {
    videoRef,
    canvasRef,
    scanning,
    result,
    error,
    startScanner,
    stopScanner,
    setResult
  } = useQrScanner();

  const [activeTab, setActiveTab] = useState<"qr" | "pin">("qr");
  const [pin, setPin] = useState("");
  const [hasScanned, setHasScanned] = useState(false);

  // Quando ler um QR com sucesso
  useEffect(() => {
    if (result) {
      setHasScanned(true);
      console.log("QR lido:", result);
      
      try {
        // Tenta parsear o JSON do QR
        // Formato esperado: { type: "localizei_cashback_qr", merchantId: "...", storeId: "...", env: "..." }
        const data = JSON.parse(result);
        if (data.merchantId && data.storeId) {
            stopScanner();
            onScanSuccess({ merchantId: data.merchantId, storeId: data.storeId });
        } else {
            // Fallback se não for JSON do nosso padrão, mas tiver dados
            console.warn("QR fora do padrão:", result);
            alert("QR Code inválido para cashback.");
            setHasScanned(false);
        }
      } catch (e) {
        // Fallback para testes simples ou formatos antigos
        console.warn("QR não é JSON válido", result);
        // Para demo, se ler qualquer coisa, avisa
        alert(`QR lido: ${result}. (Formato inválido para cashback)`);
        setHasScanned(false);
      }
    }
  }, [result]);

  // Limpa stream ao desmontar
  useEffect(() => {
    return () => {
      stopScanner();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartScan = () => {
    setHasScanned(false);
    startScanner();
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;

    console.log("PIN informado:", pin);
    
    // Simulação de validação de PIN
    if (pin.length >= 6) {
        // Em produção, isso chamaria uma API para validar o PIN e retornar o merchantId
        onScanSuccess({ merchantId: 'merchant_pin_lookup', storeId: 'store_pin_lookup' });
    } else {
        alert("PIN inválido. Digite 6 números.");
    }
  };

  return (
    <div className="min-h-screen bg-[#05060A] text-white flex flex-col animate-in fade-in duration-300">
      {/* Header simples */}
      <div className="pt-4 px-4 pb-2 flex items-center justify-center relative">
        <button
          type="button"
          className="absolute left-4 top-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="inline-flex px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
          <span className="text-[11px] font-semibold tracking-wide uppercase">
            Escanear QR do Lojista
          </span>
        </div>
      </div>

      {/* Tabs: QR / PIN */}
      <div className="px-6 mt-6">
        <div className="bg-white/10 rounded-2xl p-1 flex items-center">
          <button
            type="button"
            onClick={() => setActiveTab("qr")}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === "qr"
                ? "bg-white text-black shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            <QrCode className="w-4 h-4" />
            QR Code
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("pin");
              stopScanner();
            }}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === "pin"
                ? "bg-white text-black shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            <KeyRound className="w-4 h-4" />
            Digitar PIN
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col items-center justify-start pt-10 px-6">
        {activeTab === "qr" ? (
          <>
            {/* Moldura do scanner */}
            <div className="relative w-[280px] h-[280px] rounded-[40px] border-4 border-[#2D6DF6] bg-black/40 overflow-hidden flex items-center justify-center shadow-[0_0_40px_rgba(45,109,246,0.3)]">
              {/* Vídeo da câmera */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
              />
              {/* Canvas invisível para leitura do frame */}
              <canvas
                ref={canvasRef}
                className="hidden"
              />

              {/* Linha vermelha animada */}
              {scanning && (
                  <div className="absolute left-4 right-4 h-[2px] bg-red-500 shadow-[0_0_15px_rgba(248,113,113,1)] animate-[scan_2s_infinite_linear]" style={{ top: '50%' }} />
              )}
              
              {!scanning && !result && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                      <Camera className="w-12 h-12 text-white/50" />
                  </div>
              )}
            </div>

            {/* Mensagem de instrução */}
            <p className="mt-8 text-center text-sm text-white/70 max-w-[260px] leading-relaxed">
              Aponte a câmera para o código QR no balcão ou celular do lojista.
            </p>

            {/* Status de leitura */}
            {scanning && !result && (
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[#2D6DF6] bg-[#2D6DF6]/10 px-4 py-2 rounded-full">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Procurando QR Code...</span>
              </div>
            )}

            {hasScanned && result && (
              <div className="mt-4 text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processando leitura...
              </div>
            )}

            {error && (
              <div className="mt-4 text-xs text-red-400 text-center max-w-xs bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                <p className="font-bold mb-1">Erro na câmera</p>
                <span className="text-white/70">
                  Verifique as permissões do navegador ou tente usar o PIN.
                </span>
              </div>
            )}

            {/* Botão: iniciar / reiniciar leitura */}
            {!scanning && (
                <button
                type="button"
                onClick={handleStartScan}
                className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#2D6DF6] text-white text-base font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-transform"
                >
                <Camera className="w-5 h-5" />
                Abrir Câmera
                </button>
            )}
            
            {scanning && (
                <button
                type="button"
                onClick={stopScanner}
                className="mt-8 text-white/60 text-sm font-bold hover:text-white transition-colors"
                >
                Cancelar
                </button>
            )}

            {/* Botão de simulação (para testes sem câmera) */}
            <button
              type="button"
              onClick={() => {
                const mockPayload = JSON.stringify({
                    merchantId: "mock_merchant_id",
                    storeId: "mock_store_id"
                });
                setResult(mockPayload);
                setHasScanned(true);
              }}
              className="mt-6 text-[10px] text-white/30 hover:text-white/50 transition-colors uppercase tracking-widest"
            >
              Simular Leitura (Dev)
            </button>
          </>
        ) : (
          <>
            {/* Campo de PIN */}
            <div className="w-full max-w-xs flex flex-col items-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                  <KeyRound className="w-8 h-8 text-white" />
              </div>
              
              <p className="text-center text-sm text-white/80 mb-8 leading-relaxed">
                Peça o <span className="font-bold text-white">PIN de 6 dígitos</span> ao lojista e digite abaixo para validar sua compra.
              </p>

              <form onSubmit={handlePinSubmit} className="w-full">
                <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full text-center text-3xl font-bold tracking-[0.5em] bg-white/5 border-2 border-white/10 rounded-2xl py-6 text-white placeholder:text-white/20 focus:outline-none focus:border-[#2D6DF6] focus:bg-white/10 transition-all mb-8"
                    placeholder="000000"
                    autoFocus
                />

                <button
                    type="submit"
                    disabled={pin.length < 6}
                    className={`w-full py-4 rounded-2xl text-base font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                    pin.length >= 6
                        ? "bg-white text-black hover:bg-gray-100"
                        : "bg-white/10 text-white/40 cursor-not-allowed shadow-none"
                    }`}
                >
                    Confirmar PIN
                    <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};