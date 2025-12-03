
import React from 'react';
import { ChevronLeft, Copy, CheckCircle, Ticket, Sparkles, Home, Wallet } from 'lucide-react';

interface RewardDetailsViewProps {
  reward: {
    label: string;
    code: string;
    value: string;
  } | null;
  onBack: () => void;
  onHome: () => void;
}

export const RewardDetailsView: React.FC<RewardDetailsViewProps> = ({ reward, onBack, onHome }) => {
  const [copied, setCopied] = React.useState(false);

  if (!reward) return null;

  const rewardName = reward.label;
  // Verifica se é cashback (case-insensitive)
  const isCashback = rewardName.toLowerCase().includes('cashback');

  const handleCopy = () => {
    if (reward?.code) {
        navigator.clipboard.writeText(reward.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300 flex flex-col items-center relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 w-full h-[40vh] bg-gradient-to-b from-orange-500 to-orange-600 rounded-b-[34px] z-0"></div>

      {/* Header */}
      <div className="w-full relative z-10 px-5 pt-6 pb-2 flex items-center justify-between">
        <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
        >
            <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-white">Prêmio Resgatado</h1>
        <div className="w-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm px-5 mt-6 flex flex-col items-center flex-1 pb-10">
        
        {/* Card Principal */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full shadow-2xl shadow-orange-900/20 flex flex-col items-center text-center relative overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* Confetti Visuals (Static) */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500"></div>

            <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-5 ring-8 ring-orange-50 dark:ring-orange-900/10">
                {isCashback ? (
                    <Wallet className="w-10 h-10 text-orange-600 dark:text-orange-400" />
                ) : (
                    <Ticket className="w-10 h-10 text-orange-600 dark:text-orange-400" />
                )}
            </div>

            {/* Título Grande */}
            <h2 className="text-2xl font-extrabold text-[#FF6501] mb-4 font-display leading-tight">
                {rewardName}
            </h2>

            {/* Texto Explicativo Lógico */}
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3 w-full mb-5">
                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium leading-relaxed text-center">
                    {isCashback 
                        ? "Seu prêmio foi creditado automaticamente no seu Cashback Local."
                        : "Resgate nos estabelecimentos parceiros."
                    }
                </p>
            </div>

            {/* Código (Apenas se não for cashback) */}
            {!isCashback && (
                <div className="w-full mb-4">
                    <div className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-600 p-3 shadow-sm">
                        <code className="text-base font-mono font-bold text-gray-800 dark:text-gray-200 tracking-wider">
                            {reward.code}
                        </code>
                        <button 
                            onClick={handleCopy}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            title="Copiar código"
                        >
                            {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
                        </button>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2">Toque no ícone para copiar</p>
                </div>
            )}

            <div className="flex items-center gap-2 text-xs text-gray-500 bg-orange-50 dark:bg-orange-900/20 px-3 py-1.5 rounded-full mt-2">
                <Sparkles className="w-3 h-3 text-orange-500" />
                <span>Válido por 24 horas</span>
            </div>
        </div>

        {/* Botão Voltar ao Início */}
        <div className="w-full mt-auto pt-8">
            <button 
                onClick={onHome}
                className="w-full bg-gradient-to-r from-[#FF6501] to-[#FF7A00] hover:shadow-orange-500/40 text-white font-bold py-3.5 rounded-2xl shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
                <Home className="w-5 h-5" />
                Voltar ao Início
            </button>
        </div>

      </div>
    </div>
  );
};