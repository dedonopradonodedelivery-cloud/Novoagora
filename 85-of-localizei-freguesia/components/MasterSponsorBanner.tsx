
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface MasterSponsorBannerProps {
  onClick?: () => void;
  className?: string;
}

export const MasterSponsorBanner: React.FC<MasterSponsorBannerProps> = ({ onClick, className = "" }) => {
  return (
    <div 
      onClick={onClick}
      className={`w-full bg-[#1F2A44] rounded-2xl p-4 shadow-sm border border-transparent relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all ${className}`}
    >
      <div className="flex items-center gap-4 relative z-10">
         {/* Icon - White container for contrast */}
         <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-inner flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1E5BFF]" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" fill="currentColor"/>
              <path d="M8 8H16V10H10V11H15V13H10V14H16V16H8V8Z" fill="white"/>
            </svg>
         </div>

         {/* Text - 100% White */}
         <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-0.5">Patrocinador Master</p>
            <h3 className="text-white font-bold text-lg leading-tight truncate">Grupo Esquematiza</h3>
            <p className="text-white text-xs mt-0.5 font-medium truncate">Transformando desafios em soluções seguras!</p>
         </div>

         {/* Arrow - White */}
         <ChevronRight className="w-5 h-5 text-white opacity-80 group-hover:opacity-100 transition-colors" />
      </div>
    </div>
  );
};
