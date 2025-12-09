
import React from 'react';
import { ChevronLeft, Lock, Store } from 'lucide-react';

interface FreguesiaConnectRestrictedProps {
  onBack: () => void;
}

export const FreguesiaConnectRestricted: React.FC<FreguesiaConnectRestrictedProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
      
      <div className="w-full max-w-sm text-center">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <Lock className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-display">
            Acesso Restrito
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
            O Freguesia Connect é uma área exclusiva para <strong>lojistas e parceiros</strong> do aplicativo.
        </p>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800 mb-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-indigo-100 dark:bg-indigo-800 p-2 rounded-lg">
                    <Store className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="text-sm font-bold text-indigo-900 dark:text-indigo-300 text-left">
                    Você é um lojista?
                </p>
            </div>
            <p className="text-xs text-indigo-700 dark:text-indigo-400 text-left leading-relaxed">
                Se você possui um estabelecimento cadastrado, entre em contato com o suporte para atualizar seu perfil.
            </p>
        </div>

        <button 
            onClick={onBack}
            className="w-full bg-gray-900 dark:bg-gray-700 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
            <ChevronLeft className="w-5 h-5" />
            Voltar para o início
        </button>
      </div>

    </div>
  );
};
