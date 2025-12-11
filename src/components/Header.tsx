
import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, User as UserIcon, QrCode, ScanLine, MapPin, ChevronDown, Bell } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  onAuthClick: () => void;
  user: any;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNavigate: (tab: string) => void;
  activeTab: string;
  userRole: "cliente" | "lojista" | null;
  onOpenMerchantQr?: () => void;
  customPlaceholder?: string;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleTheme,
  onAuthClick,
  user,
  searchTerm,
  onSearchChange,
  onNavigate,
  userRole,
  onOpenMerchantQr,
  customPlaceholder
}) => {
  const [locationText, setLocationText] = useState<string>('Freguesia, Rio de Janeiro');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Basic geolocation mock or real implementation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationText('Freguesia, Rio de Janeiro'),
        (error) => {
          console.log('Geo error, using default:', error);
          setLocationText('Freguesia, Rio de Janeiro');
        }
      );
    }

    const handleScroll = () => {
      // Threshold set to approx height of the top bar (64px) to trigger sticky state visual changes
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderQrButton = () => {
    if (!user || !userRole) return null;

    if (userRole === 'cliente') {
      return (
        <button
          onClick={() => onNavigate('qrcode_scan')}
          className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[#1E5BFF] dark:text-blue-400 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all active:scale-90 shadow-sm"
          title="Ler QR Code"
        >
          <ScanLine className="w-5 h-5" />
        </button>
      );
    }

    if (userRole === 'lojista') {
      return (
        <button
          onClick={() => onOpenMerchantQr ? onOpenMerchantQr() : onNavigate('merchant_qr')}
          className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-all active:scale-90 shadow-sm"
          title="Meu QR Code"
        >
          <QrCode className="w-5 h-5" />
        </button>
      );
    }

    return null;
  };

  return (
    <>
      {/* 
        CONTAINER 1: Top Row (Location & Icons) 
        This part is NOT sticky and will scroll away.
      */}
      <div className="w-full bg-white dark:bg-gray-900 pt-4 pb-2 px-5 transition-colors duration-300">
        <div className="flex items-center justify-between max-w-md mx-auto">
          
          {/* Location Selector */}
          <div className="flex flex-col cursor-pointer group">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-0.5 mb-0.5">
              Localização atual
            </span>
            <div className="flex items-center gap-1.5 text-gray-900 dark:text-white transition-colors group-hover:text-[#1E5BFF]">
              <MapPin className="w-4 h-4 text-[#1E5BFF]" />
              <span className="font-bold text-sm truncate max-w-[160px] leading-tight">
                {locationText}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-[#1E5BFF] transition-colors mt-0.5" />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {renderQrButton()}

            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-90"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button 
              onClick={onAuthClick}
              className="relative p-0.5 rounded-full border-2 border-gray-100 dark:border-gray-700 hover:border-[#1E5BFF] dark:hover:border-[#1E5BFF] transition-colors active:scale-95"
            >
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Perfil" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {/* Notification Dot Mock */}
              {!user && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 
        CONTAINER 2: Search Bar
        This part IS sticky and will stay at top:0 when scrolling.
      */}
      <div 
        className={`
          sticky top-0 z-40 w-full px-5 transition-all duration-300
          ${isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm pt-2 pb-3' 
            : 'bg-white dark:bg-gray-900 pt-0 pb-4'
          }
        `}
      >
        <div className="max-w-md mx-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#1E5BFF] transition-colors" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={customPlaceholder || "Buscar lojas, produtos, serviços..."}
              className="block w-full pl-11 pr-4 py-3.5 bg-gray-100 dark:bg-gray-800 border-none rounded-2xl text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E5BFF]/50 transition-all shadow-sm focus:bg-white dark:focus:bg-gray-800"
            />
          </div>
        </div>
      </div>
    </>
  );
};
