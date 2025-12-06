
import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  MapPin,
  User as UserIcon,
  Search,
  Sun,
  Moon,
  QrCode
} from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  onAuthClick: () => void;
  user: User | null;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  onNavigate?: (view: string) => void;
  activeTab?: string;
  userRole?: 'cliente' | 'lojista' | null;
}

// Helper to get initials from user data
const getInitials = (user: User | null): string => {
    if (!user) return '';
    if (user.displayName) {
        const names = user.displayName.split(' ');
        const first = names[0]?.[0] || '';
        const last = names.length > 1 ? names[names.length - 1]?.[0] : '';
        return `${first}${last}`.toUpperCase();
    }
    if (user.email) {
        return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
};

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleTheme,
  onAuthClick,
  user,
  searchTerm = '',
  onSearchChange,
  onNavigate,
}) => {
  const [locationText, setLocationText] = useState<string>('Buscando localização...');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationText('Freguesia, RJ');
        },
        () => {
          setLocationText('Freguesia, RJ'); // Fallback on error/denial
        }
      );
    } else {
      setLocationText('Freguesia, RJ'); // Fallback for no geolocation support
    }
  }, []);

  const handleQrClick = () => {
    onNavigate && onNavigate('qrcode_scan');
  };

  const placeholderText = "Busque por lojas, serviços ou produtos";

  return (
    <header className="contents">
      {/* Top section with location and actions */}
      <div
        className="bg-gradient-to-r from-[#2D6DF6] to-[#1B54D9] px-4 pb-2 relative z-40"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 6px)' }}
      >
        <div className="flex justify-between items-center">
          {/* Left: Location */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 shadow-sm flex-shrink-0">
              <MapPin className="w-5 h-5 text-white fill-white/20" />
            </div>
            <div>
              <h1 className="text-white font-bold text-base font-display leading-tight tracking-tight">
                Localizei Freguesia
              </h1>
              <span className="text-white/80 text-xs font-medium tracking-wide flex items-center gap-1">
                {locationText}
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-lg transition-all active:scale-95 border border-white/10 shadow-sm"
              aria-label="Alternar Tema"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user && (
              <button
                onClick={handleQrClick}
                className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full transition-all active:scale-95 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Escanear QR Code"
              >
                <QrCode className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={onAuthClick}
              className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full transition-all active:scale-95 border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
              aria-label="Perfil"
            >
              {user ? (
                <span className="font-bold text-sm text-gray-700 dark:text-gray-200">
                  {getInitials(user)}
                </span>
              ) : (
                <UserIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sticky search bar section */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[#2D6DF6] to-[#1B54D9] px-4 pb-6 pt-2 rounded-b-[28px] shadow-lg -mt-px">
        <div className="relative w-full">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
             <Search className="h-5 w-5 text-[#666666]" />
           </div>
           <input
             type="text"
             value={searchTerm}
             onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
             placeholder={placeholderText}
             className="block w-full h-12 pl-12 pr-5 rounded-full bg-white text-[#333333] placeholder-[#8A8A8A] shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-[15px] font-normal transition-all"
           />
        </div>
      </div>
    </header>
  );
};
