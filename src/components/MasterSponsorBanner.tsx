
import React from 'react';
import { Crown, ChevronRight } from 'lucide-react';

interface MasterSponsorBannerProps {
  onClick?: () => void;
  className?: string;
}

export const MasterSponsorBanner: React.FC<MasterSponsorBannerProps> = ({ onClick, className = "" }) => {
  return (
    <div 
      onClick={onClick}
      className={`w-full bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-4 shadow-lg border border-slate-700/50 relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all ${className}`}
    >
      {/* Subtle background effect */}
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"></div>
      
      <div className="flex items-center gap-4 relative z-10">
         {/* Icon */}
         <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/5 shadow-inner flex-shrink-0">
            <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
         </div>

         {/* Text */}
         <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-0.5">Patrocinador Master</p>
            <h3 className="text-white font-bold text-lg leading-tight truncate">Grupo Esquematiza</h3>
            <p className="text-gray-400 text-xs mt-0.5 font-medium truncate">Transformando desafios em soluções seguras!</p>
         </div>

         {/* Arrow */}
         <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
      </div>
    </div>
  );
};
