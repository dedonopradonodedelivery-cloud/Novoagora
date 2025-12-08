import React from 'react';
import { X, Share2, Copy, MapPin, Store as StoreIcon } from 'lucide-react';
import { User } from 'firebase/auth';

interface MerchantQrScreenProps {
  onBack: () => void;
  user: User | null;
}

// Mock Store Data (In a real app, this would come from a Store Context or Database)
const STORE_DATA = {
  id: 'store_123_freguesia',
  name: 'Hamburgueria Brasa',
  neighborhood: 'Freguesia',
  shortId: '#LOJA-1234'
};

const MerchantQrScreen: React.FC<MerchantQrScreenProps> = ({ onBack, user }) => {
  
  // Construct Payload
  const qrPayload = JSON.stringify({
    type: "localizei_cashback_qr",
    merchantId: user?.uid || 'unknown_merchant',
    storeId: STORE_DATA.id,
    env: "prod"
  });

  // Generate QR URL using reliable public API
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qrPayload)}&color=1B54D9&bgcolor=ffffff`;

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900/95 backdrop-blur-md flex items-center justify-center p-5 animate-in fade-in duration-300">
      
      {/* Main Card */}
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 border border-gray-200 dark:border-gray-700">
        
        {/* Background Decor */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-[#1E5BFF] to-[#1749CC]"></div>
        
        {/* Close Button */}
        <button 
          onClick={onBack}
          className="absolute top-4 right-4 z-20 bg-black/20 hover:bg-black/30 text-white p-2 rounded-full backdrop-blur-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center pt-8 pb-8 px-6 text-center">
          
          {/* Header Icon */}
          <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 text-[#1E5BFF]">
            <StoreIcon className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display mb-1">
            Receber com Cashback
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-[220px] leading-snug">
            Peça ao cliente para escanear este QR no app Localizei.
          </p>

          {/* QR Code Container */}
          <div className="p-4 bg-white rounded-3xl shadow-inner border border-gray-100 dark:border-gray-700 mb-6">
            <div className="w-56 h-56 relative">
                <img 
                    src={qrUrl} 
                    alt="QR Code da Loja" 
                    className="w-full h-full object-contain rounded-xl"
                />
                {/* Center Logo Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 bg-white rounded-full p-1 shadow-md flex items-center justify-center">
                        <div className="w-full h-full bg-[#1E5BFF] rounded-full flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Store Details */}
          <div className="w-full bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-600">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                {STORE_DATA.name}
            </h3>
            <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {STORE_DATA.neighborhood}
                </span>
                <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
                <span className="text-xs font-mono font-bold text-[#1E5BFF] bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md">
                    {STORE_DATA.shortId}
                </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 w-full mt-6">
            <button className="flex-1 bg-[#1E5BFF] hover:bg-[#1749CC] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                Compartilhar
            </button>
            <button className="w-14 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Copy className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MerchantQrScreen;