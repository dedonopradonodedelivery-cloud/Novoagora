import React, { useMemo } from 'react';
import { ChevronLeft, Star, MapPin, BadgeCheck } from 'lucide-react';
import { Store, AdType } from '../types';

export interface EditorialCollection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  keywords: string[]; 
}

interface EditorialListViewProps {
  collection: EditorialCollection;
  stores: Store[];
  onBack: () => void;
  onStoreClick: (store: Store) => void;
}

export const EditorialListView: React.FC<EditorialListViewProps> = ({ 
  collection, 
  stores, 
  onBack, 
  onStoreClick 
}) => {

  const displayedStores = useMemo(() => {
    const filtered = stores.filter(store => {
      const searchStr = `${store.name} ${store.category} ${store.subcategory} ${store.description}`.toLowerCase();
      
      if (collection.id === 'top-rated') {
        return (store.rating || 0) >= 4.7;
      }

      return collection.keywords.some(keyword => searchStr.includes(keyword.toLowerCase()));
    });

    let sponsored = filtered.filter(s => s.adType === AdType.PREMIUM || s.isSponsored || s.adType === AdType.LOCAL);
    let organic = filtered.filter(s => s.adType === AdType.ORGANIC && !s.isSponsored);

    organic.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return [...sponsored, ...organic];
  }, [stores, collection]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans animate-in slide-in-from-right duration-300">
      
      <div className="relative h-[280px] w-full">
        <img 
          src={collection.image} 
          alt={collection.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
        
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center pt-8">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-orange-400 font-bold text-xs uppercase tracking-wider mb-2 block">
            Achadinhos da Freguesia
          </span>
          <h1 className="text-3xl font-bold text-white leading-tight font-display mb-2">
            {collection.title}
          </h1>
          <p className="text-gray-200 text-sm font-medium opacity-90">
            {collection.subtitle}
          </p>
        </div>
      </div>

      <div className="p-5 pb-24 -mt-4 relative z-10 rounded-t-[32px] bg-gray-50 dark:bg-gray-950 min-h-[500px]">
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {displayedStores.length} lugares encontrados
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {displayedStores.map((store, index) => {
            const isSponsored = index < 5 && (store.adType === AdType.PREMIUM || store.isSponsored);
            
            return (
              <div 
                key={`${store.id}-${index}`}
                onClick={() => onStoreClick(store)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden active:scale-[0.99]"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 dark:bg-gray-700 relative border border-gray-100 dark:border-gray-600">
                  <img src={store.logoUrl || "/assets/default-logo.png"} alt={store.name} className="w-full h-full object-contain" />
                  {store.cashback && (
                     <div className="absolute bottom-0 left-0 right-0 bg-green-600/90 text-white text-[9px] font-bold text-center py-0.5 backdrop-blur-sm">
                        {store.cashback}% VOLTA
                     </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <div className="flex justify-between items-start gap-1">
                     <h3 className="font-bold text-gray-900 dark:text-white text-base line-clamp-1">
                       {store.name}
                     </h3>
                     {isSponsored && (
                       <span className="text-[10px] font-bold text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded uppercase tracking-wide">
                         Patrocinado
                       </span>
                     )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 my-1">
                    <span className="flex items-center gap-1 text-[#1E5BFF] font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" /> 
                        {store.rating}
                    </span>
                    <span>•</span>
                    <span className="truncate">{store.category}</span>
                  </div>

                  <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2 mb-2 leading-relaxed">
                    {store.description}
                  </p>

                  <div className="flex items-center gap-3 mt-auto">
                     {store.distance && (
                       <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
                          <MapPin className="w-3 h-3" />
                          {store.distance}
                       </div>
                     )}
                     {store.verified && (
                       <div className="flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                          <BadgeCheck className="w-4 h-4 text-white fill-[#1E5BFF]" />
                          Verificado
                       </div>
                     )}
                  </div>
                </div>
              </div>
            );
          })}

          {displayedStores.length === 0 && (
             <div className="text-center py-12">
                <p className="text-gray-400">Nenhum local encontrado para este tema no momento.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};