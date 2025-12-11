
import React from 'react';
import { 
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
  Shield
} from 'lucide-react';

interface ServicesViewProps {
  onSelectMacro: (id: string, name: string) => void;
  onOpenTerms: () => void;
  onNavigate: (view: string) => void;
  searchTerm?: string;
}

// Added keywords to support search logic
const MACRO_SERVICES = [
  { 
    id: 'emergency', 
    name: 'Emergência', 
    icon: TriangleAlert,
    keywords: ['chaveiro', 'desentupidora', 'guincho', 'eletricista', 'bombeiro', 'vazamento', '24 horas', '24h', 'urgente']
  },
  { 
    id: 'home', 
    name: 'Casa & Reparos', 
    icon: Hammer,
    keywords: ['pedreiro', 'pintor', 'encanador', 'marido de aluguel', 'ar condicionado', 'marceneiro', 'serralheiro', 'obra', 'reforma', 'manutenção']
  },
  { 
    id: 'auto', 
    name: 'Auto & Veículos', 
    icon: CarFront,
    keywords: ['mecânico', 'oficina', 'funilaria', 'pintura', 'borracharia', 'insulfilm', 'lavajato', 'estética automotiva', 'carro', 'moto']
  },
  { 
    id: 'tech', 
    name: 'Tecnologia', 
    icon: Smartphone,
    keywords: ['celular', 'smartphone', 'computador', 'notebook', 'impressora', 'internet', 'wifi', 'câmera', 'segurança', 'iphone', 'android']
  },
  { 
    id: 'pet', 
    name: 'Pets', 
    icon: Dog,
    keywords: ['veterinário', 'banho', 'tosa', 'adestramento', 'hotel', 'dog walker', 'passeador', 'gato', 'cachorro']
  },
  { 
    id: 'clean', 
    name: 'Limpeza', 
    icon: Sparkles,
    keywords: ['diarista', 'faxina', 'limpeza de estofados', 'lavanderia', 'passadeira', 'dedetização', 'pós obra']
  },
  { 
    id: 'pro', 
    name: 'Consultoria & Outros', 
    icon: Briefcase,
    keywords: ['advogado', 'contador', 'marketing', 'designer', 'tradutor', 'consultor', 'frete', 'mudança', 'jardinagem']
  },
];

export const ServicesView: React.FC<ServicesViewProps> = ({ onSelectMacro, onOpenTerms, onNavigate, searchTerm = '' }) => {
  
  // Filter logic
  const filteredServices = MACRO_SERVICES.filter(service => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    
    // Check name
    if (service.name.toLowerCase().includes(term)) return true;
    
    // Check keywords
    return service.keywords.some(keyword => keyword.toLowerCase().includes(term));
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in fade-in duration-500 pb-32">
      
      <div className="px-5 pt-6 flex flex-col gap-6">
        
        {/* Only show Hero & HowTo if not searching */}
        {!searchTerm && (
          <>
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

            {/* Seção Como Funciona */}
            <div className="bg-[#F8F8F8] dark:bg-gray-800/50 rounded-[20px] p-6 border border-gray-100 dark:border-gray-700/50">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-6 text-center">
                Como funciona?
              </h3>
              
              <div className="relative flex flex-col gap-6">
                {/* Linha Vertical Conectora */}
                <div className="absolute left-[22px] top-3 bottom-3 w-[2px] bg-gray-300/25 dark:bg-gray-600/25 rounded-full"></div>

                {/* Passo 1 */}
                <div className="relative flex items-center gap-5 z-10 group">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-[#F8F8F8] dark:border-gray-900 flex items-center justify-center shadow-sm text-[#1E5BFF] shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Search className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div>
                    <strong className="text-sm font-bold text-gray-900 dark:text-white block mb-0.5">
                      1. Escolha a categoria
                    </strong>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                      Selecione o tipo de serviço que você precisa.
                    </p>
                  </div>
                </div>

                {/* Passo 2 */}
                <div className="relative flex items-center gap-5 z-10 group">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-[#F8F8F8] dark:border-gray-900 flex items-center justify-center shadow-sm text-[#1E5BFF] shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div>
                    <strong className="text-sm font-bold text-gray-900 dark:text-white block mb-0.5">
                      2. Descreva o pedido
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
                    <strong className="text-sm font-bold text-gray-900 dark:text-white block mb-0.5">
                      3. Receba orçamentos
                    </strong>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                      Profissionais da Freguesia entrarão em contato.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
                 <button 
                    onClick={onOpenTerms}
                    className="flex items-center gap-2 text-xs font-bold text-[#1E5BFF] hover:text-[#1749CC] transition-colors px-4 py-2 rounded-full hover:bg-[#EAF0FF] dark:hover:bg-blue-900/10 active:scale-95"
                 >
                    Ler termos de uso <ArrowRight className="w-3.5 h-3.5" />
                 </button>
              </div>
            </div>
          </>
        )}

        {/* Seção Grid de Categorias - Design Clean e Uniforme */}
        <div className="bg-white dark:bg-gray-800 rounded-[32px] px-6 py-8 shadow-sm my-2">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-[#171717] dark:text-white mb-2">
              {searchTerm ? `Resultados para "${searchTerm}"` : 'O que você precisa?'}
            </h2>
            {!searchTerm && (
              <p className="text-sm font-normal text-[#6B6B6B] dark:text-gray-400">
                Categorias mais buscadas na Freguesia
              </p>
            )}
          </div>

          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredServices.map((item) => {
                const Icon = item.icon;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectMacro(item.id, item.name)}
                    className="bg-[#2F6BFF] h-[150px] w-full rounded-[24px] p-5 flex flex-col justify-between items-start text-left shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
                  >
                    <Icon className="w-8 h-8 text-white/70 group-hover:text-white transition-colors" strokeWidth={2} />
                    
                    <div className="w-full">
                      <span className="block text-white font-bold text-[17px] leading-tight mb-1">
                        {item.name}
                      </span>
                      <span className="text-white/80 text-xs font-medium flex items-center gap-1 group-hover:text-white group-hover:translate-x-1 transition-all">
                        Explorar <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>Nenhum serviço encontrado para sua busca.</p>
              <button 
                onClick={() => onSelectMacro('pro', 'Consultoria & Outros')}
                className="mt-2 text-[#1E5BFF] font-bold text-sm"
              >
                Tentar em "Consultoria & Outros"
              </button>
            </div>
          )}
        </div>

        {/* Patrocinador Master Hero Banner - Redesigned Solid Premium Look */}
        <div 
          onClick={() => onNavigate('patrocinador_master')}
          className="w-full rounded-[32px] relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all mt-6 bg-[#0D1B2A]"
        >
          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-start px-8 py-8">
            
            {/* Top Header - Updated Hierarchy */}
            <div className="flex flex-col items-start gap-2 mb-5">
               <span className="text-[11px] font-medium text-white/60 uppercase tracking-[0.2em]">
                 Patrocinador Master
               </span>
               <div className="flex items-center gap-2">
                 <Shield className="w-5 h-5 text-white/40" />
                 <h3 className="text-white font-semibold text-lg tracking-wide">
                   Grupo Esquematiza
                 </h3>
               </div>
            </div>
            
            {/* Main Title */}
            <h2 className="text-2xl font-bold text-white leading-tight max-w-[90%] mb-8">
              Serviços Profissionais para Empresas e Condomínios
            </h2>
            
            {/* Services List (Badges) - Transparent & Clean */}
            <div className="flex flex-wrap gap-2.5 mb-10 max-w-md">
              {['Vigilância', 'Portaria', 'Limpeza', 'Jardinagem', 'Monitoramento', 'Eventos'].map((srv) => (
                <span key={srv} className="border border-white/20 bg-transparent px-3 py-1.5 rounded-full text-[11px] text-white/90 font-medium">
                  {srv}
                </span>
              ))}
            </div>

            {/* CTA Button - Blue */}
            <button className="bg-[#2F6BFF] text-white text-xs font-bold px-8 py-3 rounded-full shadow-lg shadow-blue-900/10 hover:bg-[#2558D4] transition-all flex items-center gap-2 group-hover:gap-3">
              Saiba mais
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          
          {/* Subtle Decorative Element */}
          <div className="absolute -right-12 -bottom-12 opacity-[0.03] pointer-events-none rotate-12">
             <Shield className="w-80 h-80 text-white" />
          </div>
        </div>

      </div>
    </div>
  );
};
