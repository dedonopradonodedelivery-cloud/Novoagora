
import React from 'react';
import { Crown } from 'lucide-react';

export const MasterSponsorBanner: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl flex items-center px-4 py-3 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-yellow-500/10 to-transparent pointer-events-none"></div>
        
        {/* Left: Icon */}
        <div className="z-10 flex-shrink-0 mr-3">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
            <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </div>
        </div>

        {/* Center: Text (Aligned Left) */}
        <div className="z-10 flex-1 flex flex-col justify-center min-w-0 mr-2">
            <span className="text-[9px] font-bold text-yellow-500 uppercase tracking-wider mb-0.5">Patrocinador Master</span>
            <span className="block text-white font-bold text-sm leading-tight">Grupo Esquematiza</span>
            <span className="block text-gray-300 text-[10px] leading-tight mt-0.5 truncate">Transformando desafios em soluções seguras para a Freguesia.</span>
        </div>
    </div>
  );
};
