
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Sparkles, ArrowRight } from 'lucide-react';
import { CashbackIcon } from './CashbackIcon';

interface CashbackLandingViewProps {
  onBack: () => void;
  onLogin: () => void;
}

export const CashbackLandingView: React.FC<CashbackLandingViewProps> = ({ onBack, onLogin }) => {
  const [fakeBalance, setFakeBalance] = useState(0);

  // Simulação de saldo crescendo para efeito visual
  useEffect(() => {
    const interval = setInterval(() => {
      setFakeBalance(prev => {
        if (prev >= 148.90) {
            clearInterval(interval);
            return 148.90;
        }
        return prev + 2.45;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300 flex flex-col relative overflow-hidden">
      
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 right-0 h-[60vh] bg-[#1E5BFF] rounded-b-[40px] z-0">
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)', backgroundSize: '24px 24px' }}></div>
         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1E5BFF] to-transparent"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-5 pt-6 flex items-center justify-between">
        <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
        >
            <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-white/80 font-medium text-sm">Freguesia</span>
        <div className="w-10"></div>
      </div>

      {/* Conteúdo Principal Scrollável */}
      <div className="flex-1 relative z-10 flex flex-col items-center pt-6 px-6 overflow-y-auto pb-40 no-scrollbar">
        
        {/* Título e Subtítulo */}
        <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 mb-4 shadow-sm">
                <Sparkles className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                <span className="text-xs font-bold text-white uppercase tracking-wide">Programa de Fidelidade</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3 font-display drop-shadow-sm">
                Cashback Localizei
            </h1>
            <p className="text-blue-100 text-sm leading-relaxed max-w-xs mx-auto font-medium">
                Ganhe parte do seu dinheiro de volta ao comprar em estabelecimentos parceiros da Freguesia.
            </p>
        </div>

        {/* Seção Como Funciona */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">Como funciona?</h3>
            
            <div className="space-y-6 relative">
                 {/* Linha conectora */}
                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-gray-700"></div>

                {/* Passo 1 */}
                <div className="relative flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1E5BFF] text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/30 z-10 shrink-0">
                        1
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 dark:text-white text-sm">Compre nas lojas</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Identifique os parceiros no app.
                        </p>
                    </div>
                </div>

                {/* Passo 2 */}
                <div className="relative flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1E5BFF] text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/30 z-10 shrink-0">
                        2
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 dark:text-white text-sm">Informe seu telefone</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Diga seu número no caixa ao pagar.
                        </p>
                    </div>
                </div>

                {/* Passo 3 */}
                <div className="relative flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1E5BFF] text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/30 z-10 shrink-0">
                        3
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 dark:text-white text-sm">Receba de volta</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            O saldo cai na hora na sua carteira.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Card Ilustrativo de Saldo */}
        <div className="w-full max-w-xs bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl shadow-blue-900/20 border border-white/50 dark:border-gray-700 mb-10 transform hover:scale-105 transition-transform duration-500 relative z-20 overflow-hidden">
            
            {/* New Cashback Icon Positioned Decoratively */}
            <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none">
                <CashbackIcon className="w-32 h-32" />
            </div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#1E5BFF] overflow-hidden">
                        <CashbackIcon className="w-12 h-12" />
                    </div>
                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Meu Saldo</span>
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                    + R$ 2,50 hoje
                </span>
            </div>
            <div className="text-center py-2 relative z-10">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    R$ {fakeBalance.toFixed(2).replace('.', ',')}
                </span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden relative z-10">
                <div className="h-full bg-gradient-to-r from-blue-400 to-[#1E5BFF] w-[70%] rounded-full animate-pulse"></div>
            </div>
            <p className="text-center text-[10px] text-gray-400 mt-2 relative z-10">
                Cashback acumulado em compras locais (exemplo)
            </p>
        </div>
      </div>

      {/* Footer Fixo */}
      <div className="fixed bottom-0 left-0 right-0 p-5 pb-8 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-30 flex flex-col gap-3 max-w-md mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button 
            onClick={onLogin}
            className="w-full bg-[#1E5BFF] hover:bg-[#1749CC] text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
            Criar conta e ativar cashback
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
