
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
  MoveRight,
  Shield,
  UserCheck,
  Eye,
  Phone,
  Crown
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
    color: 'text-[#1E5BFF]',
  },
  { 
    id: 'auto', 
    name: 'Auto & Veículos', 
    description: 'Mecânica, estética e socorro veicular', 
    icon: CarFront,
    color: 'text-[#1E5BFF]',
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
    color: 'text-[#1E5BFF]',
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
        
        {/* Hero Banner Estilo Card Premium */}
        <div className="relative w-full rounded-[20px] bg-gradient-to-r from-[#1E5BFF] to-[#4D7CFF] p-7 shadow-lg shadow-blue-500/20 overflow-hidden group cursor-default transition-all duration-300 hover:shadow-blue-500/25">
          {/* Elementos Decorativos */}
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-white leading-tight mb-2 tracking-tight">
              Precisando de um serviço?
            </h2>
            <p className="text-sm text-white/90 font-medium leading-relaxed max-w-xs mx-auto">
              Receba até 5 orçamentos grátis pelo seu WhatsApp agora mesmo de profissionais da Freguesia.
            </p>
          </div>
        </div>

        {/* Seção Como Funciona (Moved Up) */}
        <div className="bg-[#F8F8F8] dark:bg-gray-800/50 rounded-[20px] p-8 border border-gray-100 dark:border-gray-700/50">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-8 text-center">
            Como funciona?
          </h3>
          
          <div className="relative flex flex-col gap-8">
            {/* Linha Vertical Conectora */}
            <div className="absolute left-[22px] top-4 bottom-4 w-[2px] bg-gray-300/25 dark:bg-gray-600/25 rounded-full"></div>

            {/* Passo 1 */}
            <div className="relative flex items-center gap-5 z-10 group">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-[#F8F8F8] dark:border-gray-900 flex items-center justify-center shadow-sm text-[#1E5BFF] shrink-0 group-hover:scale-110 transition-transform duration-300">
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
              <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-[#F8F8F8] dark:border-gray-900 flex items-center justify-center shadow-sm text-[#1E5BFF] shrink-0 group-hover:scale-110 transition-transform duration-300">
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
                className="flex items-center gap-2 text-xs font-bold text-[#1E5BFF] hover:text-[#1749CC] transition-colors px-4 py-2 rounded-full hover:bg-[#EAF0FF] dark:hover:bg-blue-900/10 active:scale-95"
             >
                Ler termos de uso <ArrowRight className="w-3.5 h-3.5" />
             </button>
          </div>
        </div>

        {/* Seção Grid de Categorias */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Escolha um serviço
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
                  className="bg-white dark:bg-gray-800 rounded-[24px] p-5 shadow-sm border border-gray-100 dark:border-gray-700/50 flex flex-col items-start gap-4 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-100 dark:hover:border-gray-600 transition-all duration-300 active:scale-[0.98] group text-left h-full relative overflow-hidden"
                >
                  {/* Icon Container with Hover Effect */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1E5BFF] group-hover:border-[#1E5BFF]">
                    <Icon className={`w-7 h-7 ${item.color} group-hover:text-white transition-colors duration-300`} strokeWidth={2} />
                  </div>
                  
                  <div className="flex-1 w-full space-y-1">
                    <h4 className="font-bold text-gray-900 dark:text-gray-100 text-base leading-tight group-hover:text-[#1E5BFF] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 font-medium">
                      {item.description}
                    </p>
                  </div>

                  <div className="w-full pt-3 mt-auto border-t border-gray-50 dark:border-gray-700/50 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold text-[#1E5BFF] uppercase tracking-wide">
                      Ver opções
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#EAF0FF] dark:bg-gray-700 flex items-center justify-center group-hover:bg-[#1E5BFF] transition-colors">
                        <MoveRight className="w-3.5 h-3.5 text-[#1E5BFF] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- BANNER GRANDE PATROCINADOR MASTER COM SERVIÇOS --- */}
        <div className="w-full bg-gradient-to-br from-[#263246] via-[#1F2940] to-[#161C2E] rounded-[32px] p-6 sm:p-8 text-white shadow-2xl shadow-blue-900/10 relative overflow-hidden group border border-white/5 mt-6">
          {/* Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E5BFF]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            
            {/* Header do Card */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-white/10 p-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
                        <Crown className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    </div>
                    <p className="text-[10px] font-extrabold text-yellow-400 uppercase tracking-widest">Patrocinador Master</p>
                </div>
                <h2 className="text-2xl font-[900] font-display leading-tight text-white tracking-wide drop-shadow-md">
                    Grupo Esquematiza
                </h2>
                <p className="text-sm text-gray-300 font-medium leading-relaxed mt-1.5 max-w-[260px]">
                    Segurança e facilities com excelência.
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md shadow-lg shrink-0">
                 <Shield className="w-6 h-6 text-blue-400 drop-shadow-md" />
              </div>
            </div>

            {/* Grid de Serviços do Patrocinador (Refined) */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { name: "Vigilância", icon: Shield, color: "text-blue-400", bg: "bg-blue-500/10" },
                { name: "Portaria", icon: UserCheck, color: "text-green-400", bg: "bg-green-500/10" },
                { name: "Limpeza", icon: Sparkles, color: "text-yellow-400", bg: "bg-yellow-500/10" },
                { name: "Monitoramento", icon: Eye, color: "text-purple-400", bg: "bg-purple-500/10" }
              ].map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => onNavigate('patrocinador_master')} 
                    className="relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 p-3 rounded-2xl flex items-center gap-3 transition-all active:scale-95 group/btn text-left backdrop-blur-sm h-14"
                  >
                    <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center ${item.color} shrink-0 ring-1 ring-white/5`}>
                        <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-gray-200 group-hover/btn:text-white tracking-wide">{item.name}</span>
                  </button>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onNavigate('patrocinador_master')}
              className="w-full bg-[#1E5BFF] hover:bg-[#1749CC] text-white font-bold py-4 rounded-full text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 active:scale-[0.98] tracking-wide"
            >
              Conhecer o grupo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
