import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, User as UserIcon, QrCode, ScanLine, MapPin } from 'lucide-react';

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
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleTheme,
  onAuthClick,
  user,
  searchTerm,
  onSearchChange,
  onNavigate,
  activeTab,
  userRole,
  onOpenMerchantQr
}) => {
  const [locationText, setLocationText] = useState<string>('Freguesia, RJ');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationText('Freguesia, RJ'),
        (error) => {
          console.log('Erro geo:', error);
          setLocationText('Freguesia, RJ');
        }
      );
    }
  }, []);

  const renderQrButton = () => {
    if (!user || !userRole) return null;

    if (userRole === 'cliente') {
      return (
        <button
          onClick={() => onNavigate('qrcode_scan')}
          className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 transition-colors"
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
          className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400 transition-colors"
          title="Meu QR Code"
        >
          <QrCode className="w-5 h-5" />
        </button>
      );
    }

    return null;
  };

  return (
    <header className="w-full max-w-md mx-auto px-4 pt-4 pb-2 bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-30 transition-colors duration-300">
      
      {/* Linha Principal: Logo, Ações (QR, Theme, Auth) */}
      <div className="flex justify-between items-center mb-4">
        
        {/* Logo & Localização */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#2D6DF6] to-[#1B54D9] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-gray-900 dark:text-white font-bold text-base font-display leading-tight tracking-tight">
              Localizei
            </h1>
            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium tracking-wide flex items-center gap-1">
              {locationText}
            </span>
          </div>
        </div>

        {/* Ações à direita */}
        <div className="flex items-center gap-2">
          
          {renderQrButton()}

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
            aria-label="Alternar Tema"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button 
            onClick={onAuthClick}
            className="p-0.5 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
            aria-label="Perfil"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Campo de Busca */}
      <div className="relative w-full pb-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar na Freguesia..."
          className="block w-full h-12 pl-12 pr-4 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 border border-transparent focus:border-[#2D6DF6] focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm font-medium transition-all"
        />
        <div className="absolute top-0 bottom-2 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>

    </header>
  );
};