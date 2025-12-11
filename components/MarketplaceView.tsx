import React from 'react';
import { Store } from '../types';
import { ChevronLeft, Search, SlidersHorizontal, Coins, ShoppingCart } from 'lucide-react';

interface MarketplaceViewProps {
  onBack: () => void;
  stores: Store[];
}

const MarketplaceProductCard: React.FC<{ item: Store }> = ({ item }) => {
    const priceOriginal = item.price_original;
    const priceCurrent = item.price_current;
    const hasDiscount = priceOriginal && priceCurrent && priceOriginal > priceCurrent;
    const discountPercent = hasDiscount && priceOriginal ? Math.floor(((priceOriginal - priceCurrent) / priceOriginal) * 100) : 0;
    const hasCashback = item.cashback && item.cashback > 0;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50 dark:bg-gray-700 relative flex items-center justify-center p-2">
                <img 
                    src={item.logoUrl || "/assets/default-logo.png"} 
                    alt={item.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                {hasDiscount && (
                    <div className="absolute top-2 left-2 bg-[#1E5BFF] text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-md">
                        {discountPercent}% OFF
                    </div>
                )}
                <button 
                    className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform duration-200"
                    aria-label="Adicionar ao carrinho"
                >
                    <ShoppingCart className="w-4 h-4 text-[#1E5BFF]" />
                </button>
            </div>
            <div className="p-3 flex-1 flex flex-col">
                <h3 className="font-bold text-sm text-[#000] dark:text-white line-clamp-2 h-10 leading-tight">
                    {item.name}
                </h3>
                <div className="mt-auto pt-2">
                    <div>
                        {hasDiscount && priceOriginal && (
                            <p className="text-sm text-[#9CA3AF] line-through">
                                R$ {priceOriginal.toFixed(2).replace('.', ',')}
                            </p>
                        )}
                        <div className="flex items-center gap-1.5">
                            <p className="font-extrabold text-base text-[#000] dark:text-gray-100">
                                {priceCurrent ? `R$ ${priceCurrent.toFixed(2).replace('.', ',')}` : 'Consultar'}
                            </p>
                            {hasDiscount && (
                                <p className="text-sm font-bold text-[#0E8A3A]">
                                    · {discountPercent}% OFF
                                </p>
                            )}
                        </div>
                    </div>
                    {hasCashback && (
                        <div className="mt-1.5 flex items-center gap-1.5 bg-[#E6F8EA] text-[#0E8A3A] w-fit px-2 py-1 rounded-lg">
                            <Coins className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold">{item.cashback}% Cashback</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onBack, stores }) => {
  const marketplaceItems = stores.filter(store => store.isMarketplace);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 animate-in slide-in-from-right duration-300">
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-5 py-4 flex items-center gap-4 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white font-display">Achadinhos</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">As melhores ofertas da Freguesia</p>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Search className="w-5 h-5 text-gray-700 dark:text-white" />
        </button>
      </div>

      <div className="px-5 py-4 flex gap-2 overflow-x-auto no-scrollbar">
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-full text-xs font-bold shadow-md shadow-primary-500/20">
          <SlidersHorizontal className="w-3 h-3" />
          Filtrar
        </button>
        <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium whitespace-nowrap">
          Alimentos
        </button>
        <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium whitespace-nowrap">
          Moda
        </button>
        <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium whitespace-nowrap">
          Serviços
        </button>
      </div>

      <div className="px-5 grid grid-cols-2 gap-4">
        {marketplaceItems.length > 0 ? marketplaceItems.map((item) => (
          <MarketplaceProductCard key={item.id} item={item} />
        )) : (
            <div className="col-span-2 text-center py-10 text-gray-400 text-sm">
                Nenhum achadinho encontrado.
            </div>
        )}
      </div>
    </div>
  );
};