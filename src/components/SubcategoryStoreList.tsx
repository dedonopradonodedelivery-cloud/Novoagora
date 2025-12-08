import React from 'react';
import { ChevronLeft, MapPin, Star, BadgeCheck, Zap } from 'lucide-react';
import { Store, AdType } from '../types';

interface SubcategoryStoreListProps {
  subcategoryName: string;
  onBack: () => void;
  onStoreClick: (store: Store) => void;
  stores: Store[];
  sponsoredBanners?: any[];
}

export const SubcategoryStoreList: React.FC<SubcategoryStoreListProps> = ({ 
  subcategoryName, 
  onBack, 
  onStoreClick, 
  stores,
  sponsoredBanners = []
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-in slide-in-from-right duration-300 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 px-5 py-4 flex items-center gap-4 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
        </button>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">{subcategoryName}</h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Optional Banners */}
        {sponsoredBanners.length > 0 && (
          <div className="mb-4 space-y-3">
             {sponsoredBanners.map(banner => (
               <div key={banner.id} className="w-full h-32 rounded-xl overflow-hidden relative shadow-sm">
                 <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                   <p className="text-white font-bold text-sm">{banner.title}</p>
                 </div>
               </div>
             ))}
          </div>
        )}

        {/* Store List */}
        <div className="flex flex-col gap-3">
            {stores.length > 0 ? (
                stores.map((store) => {
                    const isSponsored = store.isSponsored || store.adType === AdType.PREMIUM;
                    return (
                        <div
                            key={store.id}
                            onClick={() => onStoreClick(store)}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-2 flex gap-3 cursor-pointer active:bg-gray-50 dark:active:bg-gray-700/50 transition-colors h-[88px]"
                        >
                            {/* Image */}
                            <div className="w-[88px] h-[72px] flex-shrink-0 relative rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                                <img 
                                    src={store.image} 
                                    alt={store.name} 
                                    className="w-full h-full object-cover" 
                                />
                                {store.cashback && (
                                   <div className="absolute bottom-1 left-1 bg-[#2ECC71] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-sm z-10 leading-none">
                                     {store.cashback}% VOLTA
                                   </div>
                                )}
                            </div>
        
                            {/* Content */}
                            <div className="flex-1 flex flex-col justify-center min-w-0 py-0.5">
                                <div className="flex justify-between items-start gap-2">
                                     <div className="flex items-center gap-1.5 min-w-0">
                                       <h4 className="font-bold text-gray-800 dark:text-white text-[13px] leading-tight truncate">
                                          {store.name}
                                       </h4>
                                       {store.verified && (
                                         <BadgeCheck className="w-4 h-4 text-white fill-[#1E5BFF] flex-shrink-0" />
                                       )}
                                     </div>
                                     
                                     {isSponsored && (
                                         <span className="flex-shrink-0 text-[9px] font-bold bg-[#EAF0FF] text-[#1E5BFF] px-1.5 py-0.5 rounded shadow-sm leading-none flex items-center gap-0.5">
                                             <Zap className="w-2 h-2" />
                                             TOP
                                         </span>
                                     )}
                                </div>
        
                                <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mt-1.5">
                                     {store.rating > 0 && (
                                        <>
                                            <div className="flex items-center gap-0.5 text-[#1E5BFF] font-bold">
                                                <Star className="w-3 h-3 fill-current" />
                                                <span>{store.rating}</span>
                                            </div>
                                            <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                                        </>
                                     )}
                                     <span className="truncate">{store.subcategory || store.category}</span>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <MapPin className="w-10 h-10 text-gray-300 mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Nenhum local encontrado nesta categoria.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};