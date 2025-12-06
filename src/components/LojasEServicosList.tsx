import React from 'react';

export interface LojasEServicosListProps {
  title?: string;
  stores?: any[];
  onStoreClick?: (store: any) => void;
  onViewAll?: () => void;
  activeFilter?: 'all' | 'cashback' | 'top_rated' | 'open_now';
}

export const LojasEServicosList: React.FC<LojasEServicosListProps> = ({
  title = 'Lojas e Serviços',
  stores = [],
  onStoreClick,
  onViewAll,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h2>

        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-[#1E5BFF] hover:underline"
          >
            Ver todas
          </button>
        )}
      </div>

      <div className="space-y-3">
        {stores.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Nenhuma loja disponível no momento.
          </p>
        )}

        {stores.map((store) => (
          <button
            key={store.id ?? store.name}
            onClick={() => onStoreClick && onStoreClick(store)}
            className="w-full text-left bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              {store.name ?? 'Loja sem nome'}
            </p>
            {store.category && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {store.category}
              </p>
            )}
            {store.address && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {store.address}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
