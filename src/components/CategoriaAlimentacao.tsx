import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { SUBCATEGORIES } from '../constants';

interface CategoriaAlimentacaoProps {
  onBack: () => void;
  onSelectSubcategory: (sub: string) => void;
}

export const CategoriaAlimentacao: React.FC<CategoriaAlimentacaoProps> = ({ onBack, onSelectSubcategory }) => {
  const subcategories = SUBCATEGORIES['Alimentação'] || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-in slide-in-from-right">
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 px-5 py-4 flex items-center gap-4 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
        </button>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Alimentação</h2>
      </div>
      <div className="p-5 grid grid-cols-2 gap-3">
        {subcategories.map((sub, idx) => (
          <button
            key={idx}
            onClick={() => onSelectSubcategory(sub.name)}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center gap-3 hover:shadow-md transition-all active:scale-95"
          >
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
              {sub.icon}
            </div>
            <span className="font-medium text-sm text-gray-700 dark:text-gray-300">{sub.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
