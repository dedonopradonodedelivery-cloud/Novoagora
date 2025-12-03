
import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  MapPin, 
  User as UserIcon, 
  Search,
  Sun,
  Moon
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
}

export const Header: React.FC<HeaderProps> = ({ 
  isDarkMode,
  toggleTheme,
  onAuthClick, 
  user, 
  searchTerm = '', 
  onSearchChange,
  onNavigate,
  activeTab
}) => {
  const [locationText, setLocationText] = useState<string>('Localização não ativa');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationText('Freguesia, RJ');
        },
        (error) => {
          console.log('Geolocalização não permitida ou erro:', error);
          setLocationText('Freguesia, RJ'); // Default fallback
        }
      );
    } else {
      setLocationText('Freguesia, RJ');
    }
  }, []);

  // Placeholder fixo atualizado
  const placeholderText = "Busque por lojas, serviços ou produtos";

  return (
    <header className="contents">
      
      {/* 
        1. TOP SECTION (Scrolls away) 
        Contains Logo, Location, User Profile.
        Background matches the sticky part to look like one block.
        Padding top adjusted for safe-area (iPhone Notch).
      */}
      <div 
        className="bg-gradient-to-r from-[#FF6501] to-[#FF7A00] px-4 pb-2 relative z-40"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 6px)' }}
      >
        <div className="flex justify-between items-start">
          
          {/* Logo Localizei Freguesia + Localização (Esquerda) */}
          <div className="flex items-center gap-3">
             <div className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 shadow-sm flex-shrink-0">
                <MapPin className="w-5 h-5 text-white fill-white/20" />
             </div>
             <div className="flex flex-col justify-center">
                <h1 className="text-white font-bold text-base font-display leading-tight tracking-tight">
                  Localizei Freguesia
                </h1>
                <span className="text-white/80 text-xs font-medium tracking-wide flex items-center gap-1">
                  {locationText}
                </span>
             </div>
          </div>

          {/* Ícones de Ação (Direita) */}
          <div className="flex items-center gap-2">
            
            {/* Botão Tema */}
            <button 
              onClick={toggleTheme}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-lg transition-all active:scale-95 border border-white/10 shadow-sm"
              aria-label="Alternar Tema"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Botão Perfil */}
            <button 
              onClick={onAuthClick}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-0.5 rounded-lg transition-all active:scale-95 border border-white/10 shadow-sm overflow-hidden w-9 h-9 flex items-center justify-center"
              aria-label="Perfil"
            >
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Perfil" className="w-full h-full object-cover rounded-[6px]" />
              ) : (
                <UserIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 
        2. STICKY SEARCH BAR (Sticks to top)
        Contains the search input.
        Inherits the rounded bottom and shadow.
        -mt-px ensures no gap between the gradients.
      */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[#FF6501] to-[#FF7A00] px-4 pb-6 pt-2 rounded-b-[28px] shadow-lg -mt-px">
        <div className="relative w-full">
           <input
             type="text"
             value={searchTerm}
             onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
             placeholder={placeholderText}
             className="block w-full h-12 pl-5 pr-12 rounded-full bg-white text-[#333333] placeholder-[#8A8A8A] shadow-[0_2px_6px_rgba(0,0,0,0.08)] border-none focus:outline-none text-[15px] font-normal transition-all"
           />
           <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
             <Search className="h-5 w-5 text-[#666666]" />
           </div>
        </div>
      </div>

    </header>
  );
};
