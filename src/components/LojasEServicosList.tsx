import React from 'react';
import { Store } from '../types';

interface LojasEServicosListProps {
  onStoreClick?: (store: Store) => void;
  onViewAll: () => void;
  activeFilter: 'all' | 'cashback' | 'top_rated' | 'open_now';
}

export const LojasEServicosList: React.FC<LojasEServicosListProps> = ({ 
  onStoreClick, 
  onViewAll, 
  activeFilter 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
      <p className="text-gray-500 dark:text-gray-400 font-medium">Lista de Lojas e Serviços</p>
      <p className="text-xs text-gray-400 mt-1">Filtro ativo: {activeFilter}</p>
      <button 
        onClick={onViewAll} 
        className="mt-4 px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 rounded-full transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/30"
      >
        Ver todos
      </button>
    </div>
  );
};