import React, { useMemo } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Download, QrCode, Store } from 'lucide-react';

interface MerchantQrScreenProps {
  onBack: () => void;
  user: any; // Firebase User
}

export const MerchantQrScreen: React.FC<MerchantQrScreenProps> = ({ onBack, user }) => {
  // UID do lojista (por enquanto usamos o uid do Firebase)
  const merchantId = user?.uid ?? 'merchant_demo';

  // PIN fixo por enquanto (depois podemos salvar/buscar no Supabase)
  const pinCode = '123456';

  // Payload JSON que vai dentro do QR
  const qrPayload = useMemo(
    () =>
      JSON.stringify({
        type: 'LOCALIZEI_MERCHANT_QR',
        merchantId,
        storeId: 'default_store',
      }),
    [merchantId]
  );

  const [qrDataUrl, setQrDataUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    QRCode.toDataURL(qrPayload, { width: 320, margin: 1 })
      .then(setQrDataUrl)
      .catch((err) => {
        console.error('Erro ao gerar QR:', err);
      });
  }, [qrPayload]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(qrPayload)
      .catch((err) => console.error('Erro ao copiar QR payload:', err));
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `localizei-qr-${merchantId}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Voltar"
        >
          <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Store className="w-4 h-4 text-orange-500" />
          Meu QR de Pagamento
        </h1>
        <div className="w-8" />
      </header>

      <main className="flex-1 px-4 py-6 flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-5 w-full max-w-xs flex flex-col items-center">
          <div className="mb-3 text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              QR Code do Lojista
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Cliente escaneia para pagar e acumular cashback
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-3 mb-4 flex items-center justify-center">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="QR Code do lojista"
                className="w-56 h-56 rounded-xl border border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          <div className="w-full space-y-2 mb-4">
            <div className="flex flex-col bg-gray-50 dark:bg-gray-900 rounded-xl px-3 py-2">
              <span className="text-[11px] text-gray-500 uppercase tracking-wide">
                ID do Lojista
              </span>
              <span className="text-xs font-mono text-gray-800 dark:text-gray-100 break-all">
                {merchantId}
              </span>
            </div>

            <div className="flex flex-col bg-orange-50 dark:bg-orange-900/20 rounded-xl px-3 py-2">
              <span className="text-[11px] text-orange-600 dark:text-orange-300 uppercase tracking-wide">
                PIN de Conferência
              </span>
              <span className="text-base font-bold text-orange-700 dark:text-orange-300 tracking-[0.2em]">
                {pinCode}
              </span>
              <span className="text-[11px] text-orange-600/70 dark:text-orange-300/70 mt-1">
                Mostre esse PIN para o cliente conferir na hora do pagamento.
              </span>
            </div>
          </div>

          <div className="w-full flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copiar dados
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Baixar QR
            </button>
          </div>
        </div>

        <div className="mt-6 text-[11px] text-gray-500 dark:text-gray-400 text-center max-w-xs">
          O cliente pode escanear o QR pela área de Cashback do app Localizei
          ou pela câmera do celular (caso deep link esteja habilitado).
        </div>
      </main>
    </div>
  );
};
