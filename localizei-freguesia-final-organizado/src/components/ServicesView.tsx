
import React from 'react';
import { 
  Wrench, 
  TriangleAlert, 
  Hammer, 
  CarFront, 
  Smartphone, 
  Dog, 
  Sparkles, 
  Briefcase, 
  Search,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  MoveRight
} from 'lucide-react';
import { MasterSponsorBanner } from './MasterSponsorBanner';

interface ServicesViewProps {
  onSelectMacro: (id: string, name: string) => void;
  onOpenTerms: () => void;
  onNavigate: (view: string) => void;
}

const MACRO_SERVICES = [
  { 
    id: 'emergency', 
    name: 'Emergência', 
    description: 'Chaveiro, desentupidora e elétrica 24h', 
    icon: TriangleAlert,
    color: 'text-red-600',
  },
  { 
    id: 'home', 
    name: 'Casa & Reparos', 
    description: 'Pequenas obras, pintura e manutenção', 
    icon: Hammer,
    color: 'text-orange-600',
  },
  { 
    id: 'auto', 
    name: 'Auto & Veículos', 
    description: 'Mecânica, estética e socorro veicular', 
    icon: CarFront,
    color: 'text-blue-600',
  },
  { 
    id: 'tech', 
    name: 'Tecnologia', 
    description: 'Celulares, computadores e redes', 
    icon: Smartphone,
    color: 'text-purple-600',
  },
  { 
    id: 'pet', 
    name: 'Pets', 
    description: 'Banho, tosa, veterinário e hotel', 
    icon: Dog,
    color: 'text-amber-600',
  },
  { 
    id: 'clean', 
    name: 'Limpeza', 
    description: 'Diaristas, pós-obra e estofados', 
    icon: Sparkles,
    color: 'text-cyan-600',
  },
  { 
    id: 'pro', 
    name: 'Consultoria', 
    description: 'Advogados, contadores e mais', 
    icon: Briefcase,
    color: 'text-indigo-600',
  },
];

export const ServicesView: React.FC<ServicesViewProps> = ({ onSelectMacro, onOpenTerms, onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in fade-in duration-500 pb-32">
      
      <div className="px-5 pt-6 flex flex-col gap-6">
        
        {/* Patrocinador Master */}
        <MasterSponsorBanner onClick={() => onNavigate('patrocinador_master')} />

        {/* Hero Banner Estilo Card Premium */}
        <div className="relative w-full rounded-[20px] bg-gradient-to-r from-[#FF6501] to-[#FF7A00] p-7 shadow-lg shadow-orange-500/20 overflow-hidden group cursor-default transition-all duration-300 hover:shadow-orange-500/25">
          {/* Elementos Decorativos */}
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner shrink-0">
              <Wrench className="w-7 h-7 text-white drop-shadow-sm" />
            </div>
            
            <div className="flex-1 flex flex-col justify-center pt-1">
              <h2 className="text-xl font-semibold text-white leading-tight mb-1">
                Precisando de um serviço?
              </h2>
              <p className="text-[13px] text-white/90 font-medium leading-relaxed max-w-[260px]">
                Receba até 5 orçamentos grátis pelo seu WhatsApp agora mesmo de profissionais da Freguesia.
              </p>
            </div>
          </div>
        </div>

        {/* Seção Grid de Categorias */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              O que você precisa?
            </h3>
            <span className="text-[12px] font-semibold text-gray-600 dark:text-gray-300 bg-[#F8F8F8] dark:bg-gray-800 px-[10px] py-1.5 rounded-[12px]">
              {MACRO_SERVICES.length} categorias
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {MACRO_SERVICES.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectMacro(item.id, item.name)}
                  className="bg-white dark:bg-gray-800 rounded-[20px] px-5 py-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-700/50 flex flex-col items-start gap-4 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:border-orange-100 dark:hover:border-gray-600 transition-all duration-300 active:scale-[0.96] group text-left h-full relative overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-750 border border-gray-100 dark:border-gray-700 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className={`w-6 h-6 ${item.color}`} strokeWidth={2} />
                  </div>
                  
                  <div className="flex-1 w-full space-y-1.5">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight group-hover:text-[#FF6501] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug line-clamp-2 font-medium">
                      {item.description}
                    </p>
                  </div>

                  <div className="w-full pt-4 mt-auto border-t border-gray-50 dark:border-gray-700/50 flex items-center justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold text-[#FF6501] uppercase tracking-wide">
                      Ver opções
                    </span>
                    <div className="w-6 h-6 rounded-full bg-orange-50 dark:bg-gray-700 flex items-center justify-center group-hover:bg-[#FF6501] transition-colors">
                        <MoveRight className="w-3.5 h-3.5 text-[#FF6501] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Seção Como Funciona */}
        <div className="bg-[#F8F8F8] dark:bg-gray-800/50 rounded-[20px] p-8 border border-gray-100 dark:border-gray-700/50">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-8 text-center">
            Como funciona?
          </h3>
          
          <div className="relative flex flex-col gap-8">
            {/* Linha Vertical Conectora */}
            <div className="absolute left-[22px] top-4 bottom-4 w-[2px] bg-gray-300/25 dark:bg-gray-600/25 rounded-full"></div>

            {/* Passo 1 */}
            <div className="relative flex items-center gap-5 z-10 group">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-[#F8F8F8] dark:border-gray-900 flex items-center justify-center shadow-sm text-[#FF6501] shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div>
                <strong className="text-sm font-bold text-gray-900 dark:text-white block mb-1">
                  Escolha a categoria
                </strong>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                  Selecione o tipo de serviço que você precisa resolver.
                </p>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="relative flex items-center gap-5 z-10 group">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-[#F8F8F8] dark:border-gray-900 flex items-center justify-center shadow-sm text-[#FF6501] shrink-0 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div>
                <strong className="text-sm font-bold text-gray-900 dark:text-white block mb-1">
                  Descreva o pedido
                </strong>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                  Conte o que precisa e adicione fotos se quiser.
                </p>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="relative flex items-center gap-5 z-10 group">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-[#F8F8F8] dark:border-gray-900 flex items-center justify-center shadow-sm text-green-500 shrink-0 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div>
                <strong className="text-sm font-bold text-gray-900 dark:text-white block mb-1">
                  Receba orçamentos
                </strong>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                  Profissionais da Freguesia entrarão em contato.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-center">
             <button 
                onClick={onOpenTerms}
                className="flex items-center gap-2 text-xs font-bold text-[#FF6501] hover:text-[#e65a00] transition-colors px-4 py-2 rounded-full hover:bg-orange-50 dark:hover:bg-orange-900/10 active:scale-95"
             >
                Ler termos de uso <ArrowRight className="w-3.5 h-3.5" />
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};
