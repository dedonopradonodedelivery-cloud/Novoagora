
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
}

export const Header: React.FC<HeaderProps> = ({ 
  isDarkMode,
  toggleTheme,
  onAuthClick, 
  user, 
  searchTerm = '', 
  onSearchChange,
  onNavigate
}) => {
  const [locationText, setLocationText] = useState<string>('Localização não ativa');
  const [hasLocation, setHasLocation] = useState(false);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Em um app real, usaríamos as coordenadas para obter o endereço (Reverse Geocoding).
          // Para este contexto da Freguesia, simulamos que estamos na região correta ao ter permissão.
          setHasLocation(true);
          setLocationText('Freguesia, RJ');
        },
        (error) => {
          console.log('Geolocalização não permitida ou erro:', error);
          setHasLocation(false);
          setLocationText('Localização não autorizada');
        }
      );
    } else {
      setLocationText('GPS indisponível');
    }
  }, []);

  return (
    <header className="relative z-40 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Background Container com Gradiente e Bordas Curvas */}
      <div className="bg-gradient-to-r from-[#FF6501] to-[#FF7A00] rounded-b-[32px] pt-6 pb-6 px-5 shadow-lg relative z-10">
        
        {/* PARTE SUPERIOR: Logo, Título e Ações */}
        <div className="flex justify-between items-start mb-6">
          
          {/* Logo Localizei Freguesia + Localização (Esquerda) */}
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-sm flex-shrink-0">
                <MapPin className="w-5 h-5 text-white fill-white/20" />
             </div>
             <div className="flex flex-col justify-center">
                {/* Título em linha única */}
                <h1 className="text-white font-bold text-lg font-display leading-tight tracking-tight">
                  Localizei Freguesia
                </h1>
                {/* Localização dinâmica */}
                <span className="text-white/80 text-xs font-medium tracking-wide flex items-center gap-1">
                  {locationText}
                </span>
             </div>
          </div>

          {/* Ícones de Ação (Direita) */}
          <div className="flex items-center gap-3">
            
            {/* Botão Tema (Dia/Noite) */}
            <button 
              onClick={toggleTheme}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2.5 rounded-xl transition-all active:scale-95 border border-white/10 shadow-sm"
              aria-label="Alternar Tema"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* REMOVIDO: Botão Cashback */}

            {/* Botão Perfil */}
            <button 
              onClick={onAuthClick}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-0.5 rounded-xl transition-all active:scale-95 border border-white/10 shadow-sm overflow-hidden w-[42px] h-[42px] flex items-center justify-center"
              aria-label="Perfil"
            >
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Perfil" className="w-full h-full object-cover rounded-[10px]" />
              ) : (
                <UserIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* PARTE INFERIOR: Busca Integrada */}
        <div className="relative group">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
             <Search className="h-5 w-5 text-[#FF6501] group-focus-within:scale-110 transition-transform duration-300" />
           </div>
           <input
             type="text"
             value={searchTerm}
             onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
             placeholder="Buscar lojas, descontos e serviços..."
             className="block w-full pl-11 pr-4 py-3.5 border-none rounded-2xl bg-white text-gray-800 placeholder-gray-400 shadow-lg shadow-orange-900/10 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all text-sm font-medium"
           />
        </div>
      </div>
    </header>
  );
};
