import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { ChevronLeft, Download, Copy, CheckCircle2, HelpCircle, Share2 } from 'lucide-react';

interface MerchantQrScreenProps {
  onBack: () => void;
  user: any;
}

export const MerchantQrScreen: React.FC<MerchantQrScreenProps> = ({ onBack, user }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Derivar dados do usuário
  const merchantId = user?.uid || 'id_indisponivel';
  const pin = merchantId.slice(0, 6).toUpperCase();
  const deepLink = `${window.location.origin}/cashback/loja/${merchantId}`;
  const displayUrl = `localizei.app/loja/${pin}`;

  useEffect(() => {
    const generateQr = async () => {
      try {
        const url = await QRCode.toDataURL(deepLink, {
          width: 400,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        });
        setQrCodeUrl(url);
      } catch (err) {
        console.error('Erro ao gerar QR Code', err);
      }
    };

    generateQr();
  }, [deepLink]);

  const downloadQr = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qrcode-localizei-${pin}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyPin = () => {
    navigator.clipboard.writeText(pin).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleHelp = () => {
    alert('O cliente deve escanear este QR Code para iniciar o pagamento com cashback. Se a câmera não funcionar, forneça o PIN abaixo.');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center animate-in fade-in duration-300 font-sans">
      
      {/* Header */}
      <header className="w-full bg-white px-5 h-16 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="w-10 h-10 -ml-2 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-lg text-gray-900">Meu QR Code</h1>
      </header>

      <div className="w-full max-w-md p-6 flex flex-col items-center gap-6 pb-20">
        
        {/* QR Code Card */}
        <div className="bg-white rounded-3xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 w-full flex flex-col items-center text-center">
          <div className="bg-white p-2 rounded-2xl border border-gray-100 mb-4 shadow-sm">
            {qrCodeUrl ? (
              <img 
                src={qrCodeUrl} 
                alt="QR Code do Lojista" 
                className="w-64 h-64 object-contain rounded-xl"
              />
            ) : (
              <div className="w-64 h-64 bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400 text-sm">
                Gerando QR...
              </div>
            )}
          </div>
          <p className="text-sm font-medium text-gray-400">{displayUrl}</p>
        </div>

        {/* PIN Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 w-full flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              PIN de Pagamento
            </p>
            <p className="text-3xl font-mono font-black text-gray-800 tracking-wider">
              {pin}
            </p>
          </div>
          <button 
            onClick={copyPin}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors text-xs font-bold text-gray-600"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar
              </>
            )}
          </button>
        </div>

        {/* Actions */}
        <div className="w-full space-y-4 mt-2">
          <button
            onClick={downloadQr}
            className="w-full bg-[#FF6500] hover:bg-[#E65B00] text-white rounded-2xl py-4 px-6 font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all"
          >
            <Download className="w-5 h-5" />
            Baixar QR Code
          </button>

          <button
            onClick={handleHelp}
            className="w-full flex items-center justify-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-700 py-2 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Como funciona?
          </button>
        </div>

      </div>
    </div>
  );
};
