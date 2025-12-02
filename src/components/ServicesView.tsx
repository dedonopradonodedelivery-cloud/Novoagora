import React from 'react';
import { Wrench, TriangleAlert, Hammer, CarFront, Smartphone, Dog, Sparkles, Briefcase, MoreHorizontal } from 'lucide-react';

interface ServicesViewProps {
  onSelectMacro: (id: string, name: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onSelectMacro }) => {
  
  const macros = [
    { id: 'emergency', name: 'Emergência', icon: TriangleAlert, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
    { id: 'home', name: 'Casa & Reparos', icon: Hammer, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { id: 'auto', name: 'Auto & Moto', icon: CarFront, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 'tech', name: 'Tecnologia', icon: Smartphone, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { id: 'pet', name: 'Pet Serviços', icon: Dog, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { id: 'clean', name: 'Limpeza', icon: Sparkles, color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
    { id: 'pro', name: 'Profissionais', icon: Briefcase, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { id: 'other', name: 'Outros', icon: MoreHorizontal, color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-800' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 px-5 pt-8 pb-6 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display leading-tight">
          Serviços
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Peça orçamentos rapidamente
        </p>
      </div>

      {/* Content */}
      <div className="p-5">
        
        {/* Banner */}
        <div className="w-full h-[140px] rounded-[20px] bg-gradient-to-r from-[#FF6501] to-[#FF7A00] p-6 flex flex-col justify-center relative overflow-hidden shadow-lg shadow-orange-500/20 mb-8">
            <div className="flex items-start gap-4 relative z-10">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Wrench className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-white leading-tight mb-2">
                        Precisa de um serviço?
                    </h2>
                    <p className="text-sm text-white/90 font-medium leading-relaxed">
                        Peça um orçamento e fale com profissionais da Freguesia.
                    </p>
                </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-lg"></div>
        </div>

        {/* Macro Categories Grid */}
        <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg ml-1">O que você precisa?</h3>
            <div className="grid grid-cols-2 gap-4">
                {macros.map((item) => (
                    <button 
                        key={item.id}
                        onClick={() => onSelectMacro(item.id, item.name)}
                        className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-all active:scale-[0.98] min-h-[160px]"
                    >
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${item.bg} ${item.color}`}>
                            <item.icon className="w-8 h-8" />
                        </div>
                        <span className="font-bold text-gray-800 dark:text-white text-sm text-center leading-tight">
                            {item.name}
                        </span>
                    </button>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};