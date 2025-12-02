import React, { useState } from 'react';
import { SlidersHorizontal, Clock, Percent, Star } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { Category, Store } from '../types';
import { SearchStores } from './SearchStores';

interface ExploreViewProps {
  onSelectCategory: (category: Category) => void;
  onNavigate: (view: string) => void;
  onStoreClick: (store: Store) => void;
  stores: Store[];
}

export const ExploreView: React.FC<ExploreViewProps> = ({ onSelectCategory, onNavigate, onStoreClick, stores }) => {
  // Using the new component for search, so we don't need local filter state here for the main list
  // However, we keep the default list for when the user is NOT searching (SearchStores handles its own empty state)
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24 animate-in fade-in duration-300">
      
      {/* Search Header Area */}
      <div className="bg-gray-50 dark:bg-gray-950 px-5 pt-6 pb-2 sticky top-0 z-20">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-display mb-4">Explorar</h2>
        
        {/* New Search Component */}
        <SearchStores onStoreClick={onStoreClick} />
      </div>

      {/* Filter Chips - Only visual in this demo context or could filter the static list below */}
      <div className="px-5 py-2 flex gap-2 overflow-x-auto no-scrollbar">
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-full text-xs font-bold shadow-md shadow-primary-500/20 whitespace-nowrap">
            <SlidersHorizontal className="w-3 h-3" />
            Filtros
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium whitespace-nowrap shadow-sm">
            <Percent className="w-3 h-3 text-green-500" />
            Cashback
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium whitespace-nowrap shadow-sm">
            <Clock className="w-3 h-3 text-blue-500" />
            Abertos agora
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium whitespace-nowrap shadow-sm">
            <Star className="w-3 h-3 text-yellow-500" />
            Melhor avaliados
        </button>
      </div>

      <div className="px-5 space-y-8 mt-6">
        
        {/* Promo Banner - Still visible below search */}
        <div 
            onClick={() => onNavigate('cashback')}
            className="w-full h-32 rounded-3xl overflow-hidden relative shadow-md cursor-pointer active:scale-[0.98] transition-transform"
        >
            <img src="https://picsum.photos/600/200?random=88" alt="Promo" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-6">
                <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">Oferta da Semana</span>
                <h3 className="text-white font-bold text-xl leading-tight">Ganhe até 10%<br/>de Cashback</h3>
            </div>
        </div>

        {/* Default Store List (Suggestions) - shown when not actively searching 
            (In a real app, you might hide this if search has results, but SearchStores handles its own results list) 
        */}
        <div>
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                Sugestões para você
              </h3>
           </div>
           
           <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 no-scrollbar">
              {stores.slice(0, 6).map((store) => (
                  <div 
                    key={store.id} 
                    onClick={() => onStoreClick(store)}
                    className="min-w-[160px] w-[160px] bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-2 group cursor-pointer active:scale-[0.98] transition-all"
                  >
                      <div className="w-full h-24 rounded-xl overflow-hidden relative">
                         <img src={store.image} alt={store.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                         {store.cashback && (
                             <div className="absolute top-1.5 left-1.5 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
                                 {store.cashback}%
                             </div>
                         )}
                      </div>
                      <div>
                          <h4 className="font-bold text-sm text-gray-800 dark:text-white line-clamp-1">{store.name}</h4>
                          <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{store.rating}</span>
                              <span className="mx-0.5">•</span>
                              <span>{store.distance}</span>
                          </div>
                      </div>
                  </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
