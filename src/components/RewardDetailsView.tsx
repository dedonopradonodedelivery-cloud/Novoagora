
import React, { useState } from 'react';
import { ChevronLeft, Copy, CheckCircle, Ticket, Wallet } from 'lucide-react';

interface RewardDetailsViewProps {
  reward: {
    label: string;
    code: string;
    value: string;
    description?: string;
  } | null;
  onBack: () => void;
  onHome: () => void;
}

export const RewardDetailsView: React.FC<RewardDetailsViewProps> = ({ reward, onBack, onHome }) => {
  const [copied, setCopied] = useState(false);

  if (!reward) return null;

  const rewardName = reward.label;
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
      <div className="absolute top-0 w-full h-[40vh] bg-gradient-to-b from-[#1E5BFF] to-[#1749CC] rounded-b-[34px] z-0"></div>

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
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full shadow-2xl shadow-blue-900/20 flex flex-col items-center text-center relative overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* Visuals */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#1E5BFF] via-[#4D7CFF] to-[#1E5BFF]"></div>

            <div className="w-20 h-20 bg-[#EAF0FF] dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-5 ring-8 ring-[#EAF0FF] dark:ring-blue-900/10">
                {isCashback ? (
                    <Wallet className="w-10 h-10 text-[#1E5BFF] dark:text-blue-400" />
                ) : (
                    <Ticket className="w-10 h-10 text-[#1E5BFF] dark:text-blue-400" />
                )}
            </div>

            {/* Título Grande */}
            <h2 className="text-2xl font-extrabold text-[#1E5BFF] mb-4 font-display leading-tight">
                {rewardName}
            </h2>

            {/* Texto Explicativo Lógico */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl w-full mb-6 text-sm text-gray-600 dark:text-gray-300">
                <p className="leading-relaxed">
                    {reward.description || "Parabéns! Utilize o código abaixo para resgatar seu prêmio na loja ou ele será creditado automaticamente."}
                </p>
            </div>

            {/* Código de Resgate */}
            <div className="w-full mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Código do Cupom</p>
                <button 
                    onClick={handleCopy}
                    className="w-full bg-[#EAF0FF] dark:bg-gray-900 border-2 border-dashed border-[#1E5BFF]/30 rounded-xl p-4 flex items-center justify-between group active:scale-[0.98] transition-all"
                >
                    <span className="font-mono text-xl font-bold text-gray-800 dark:text-white tracking-wider">
                        {reward.code}
                    </span>
                    <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-[#1E5BFF]">
                        {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </div>
                </button>
                {copied && <p className="text-xs text-green-500 font-bold mt-2 animate-pulse">Copiado para a área de transferência!</p>}
            </div>

            <p className="text-xs text-gray-400">
                Válido por 7 dias. Apresente este código no caixa.
            </p>
        </div>

        {/* Botão Home */}
        <button 
            onClick={onHome}
            className="mt-8 text-white/80 font-bold text-sm hover:text-white transition-colors"
        >
            Voltar para o início
        </button>

      </div>
    </div>
  );
};
