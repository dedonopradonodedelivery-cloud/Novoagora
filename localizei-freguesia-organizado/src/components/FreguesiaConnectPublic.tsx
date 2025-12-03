
import React from 'react';
import { ChevronLeft, Users, Zap, Handshake, ArrowRight } from 'lucide-react';

interface FreguesiaConnectPublicProps {
  onBack: () => void;
  onLogin: () => void;
}

export const FreguesiaConnectPublic: React.FC<FreguesiaConnectPublicProps> = ({ onBack, onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300 flex flex-col relative overflow-hidden">
      
      {/* Background Decorativo - Gradiente Roxo/Indigo */}
      <div className="absolute top-0 left-0 right-0 h-[60vh] bg-[#4F46E5] rounded-b-[40px] z-0">
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)', backgroundSize: '24px 24px' }}></div>
         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#4F46E5] to-transparent"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-5 pt-6 flex items-center justify-between">
        <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
        >
            <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-white/80 font-medium text-sm">Networking</span>
        <div className="w-10"></div>
      </div>

      {/* Conteúdo Principal Scrollável */}
      <div className="flex-1 relative z-10 flex flex-col items-center pt-6 px-6 overflow-y-auto pb-40 no-scrollbar">
        
        {/* Título e Subtítulo */}
        <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 mb-4 shadow-sm">
                <Users className="w-3 h-3 text-indigo-200 fill-indigo-200" />
                <span className="text-xs font-bold text-white uppercase tracking-wide">Comunidade Exclusiva</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3 font-display drop-shadow-sm">
                Freguesia Connect
            </h1>
            <p className="text-indigo-100 text-sm leading-relaxed max-w-xs mx-auto font-medium">
                O grupo oficial de networking da Freguesia.
            </p>
        </div>

        {/* Imagem Ilustrativa */}
        <div className="w-full max-w-xs aspect-[4/3] bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden mb-8 shadow-2xl shadow-indigo-900/30 border border-white/20 relative">
            <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop" 
                alt="Pessoas conectadas" 
                className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4F46E5]/90 to-transparent flex items-end justify-center pb-4">
                <p className="text-white text-xs font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                    +2.500 membros ativos
                </p>
            </div>
        </div>

        {/* Seção Benefícios */}
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg text-center">Por que participar?</h3>
            
            <div className="space-y-5">
                {/* Benefício 1 */}
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                        <Handshake className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 dark:text-white text-sm">Parcerias Locais</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                            Conecte-se com outros lojistas e empreendedores do bairro.
                        </p>
                    </div>
                </div>

                {/* Benefício 2 */}
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                        <Zap className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 dark:text-white text-sm">Oportunidades Rápidas</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                            Divulgue vagas, encontre fornecedores e feche negócios.
                        </p>
                    </div>
                </div>

                {/* Benefício 3 */}
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 dark:text-white text-sm">Eventos Exclusivos</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                            Acesso prioritário a encontros e workshops na Freguesia.
                        </p>
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* Footer Fixo */}
      <div className="fixed bottom-0 left-0 right-0 p-5 pb-8 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-30 flex flex-col gap-3 max-w-md mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button 
            onClick={onLogin}
            className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
            Quero participar
            <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
        
        <button 
            onClick={onLogin}
            className="w-full py-2 text-sm font-bold text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
        >
            Já tenho conta
        </button>
      </div>

    </div>
  );
};
