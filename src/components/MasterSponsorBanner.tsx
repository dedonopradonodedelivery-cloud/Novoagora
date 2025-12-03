
import React from 'react';
import { Crown, Megaphone } from 'lucide-react';

export const MasterSponsorBanner: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar flex gap-3 snap-x snap-mandatory">
        
        {/* Existing Banner: Grupo Esquematiza */}
        <div className="min-w-full snap-center bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl flex items-center px-4 py-4 shadow-md relative overflow-hidden border border-slate-700/50 my-1">
            {/* Subtle background effect */}
            <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"></div>
            
            {/* Left: Icon */}
            <div className="z-10 flex-shrink-0 mr-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/5 shadow-inner">
                <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
              </div>
            </div>

            {/* Center: Text (Aligned Left) */}
            <div className="z-10 flex-1 flex flex-col justify-center min-w-0">
                <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-0.5">PATROCINADOR MASTER</span>
                <span className="block text-white font-bold text-sm leading-tight tracking-wide">Grupo Esquematiza</span>
                <span className="block text-gray-300 text-[11px] leading-tight mt-0.5 truncate font-medium">Transformando desafios em soluções seguras!</span>
            </div>
        </div>

        {/* New Banner: Seja o próximo */}
        <div className="min-w-full snap-center bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl flex items-center px-4 py-4 shadow-md relative overflow-hidden border border-slate-700/50 my-1">
            <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"></div>
            
            {/* Left: Icon */}
            <div className="z-10 flex-shrink-0 mr-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/5 shadow-inner">
                <Megaphone className="w-5 h-5 text-yellow-400 drop-shadow-sm" />
              </div>
            </div>

            {/* Center: Text */}
            <div className="z-10 flex-1 flex flex-col justify-center min-w-0">
                <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-0.5">ANUNCIE AQUI</span>
                <span className="block text-white font-bold text-sm leading-tight tracking-wide">Seja o próximo Patrocinador Master</span>
            </div>

            {/* Right: Button */}
            <div className="z-10 flex-shrink-0 ml-2">
                <button className="bg-gradient-to-r from-[#FF6501] to-[#FF7A00] hover:from-[#e65a00] hover:to-[#e66e00] text-white text-[10px] font-bold px-4 py-2 rounded-full shadow-lg shadow-orange-500/20 active:scale-95 transition-all whitespace-nowrap">
                    Saiba Mais
                </button>
            </div>
        </div>

    </div>
  );
};
