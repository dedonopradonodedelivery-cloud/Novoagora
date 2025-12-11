import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, Loader2, AlertCircle, ChevronRight, BadgeCheck, Heart, Check, Coins } from 'lucide-react';
import { Store, AdType } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import { auth } from '../lib/firebase';

interface LojasEServicosListProps {
  onStoreClick?: (store: Store) => void;
  onViewAll?: () => void;
  activeFilter?: 'all' | 'cashback' | 'top_rated' | 'open_now';
}

const CATEGORIES_MOCK = ['Alimentação', 'Beleza', 'Serviços', 'Pets', 'Moda', 'Saúde'];
const SUBCATEGORIES_MOCK = ['Restaurante', 'Salão', 'Manutenção', 'Pet Shop', 'Roupas', 'Clínica'];

const generateFakeStores = (): Store[] => {
  return Array.from({ length: 64 }, (_, i) => {
    const catIndex = i % CATEGORIES_MOCK.length;
    const isPremium = i % 10 === 0; 
    const isSponsored = i % 15 === 0; 
    const hasCashback = i % 3 === 0 && !isPremium && !isSponsored; 
    const isOpenNow = Math.random() > 0.4; 

    return {
      id: `fake-infinite-${i}`,
      name: `Loja Comercial ${i + 1}`,
      category: CATEGORIES_MOCK[catIndex],
      subcategory: SUBCATEGORIES_MOCK[catIndex],
      logoUrl: '/assets/default-logo.png', // Usando logoUrl padrão
      rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
      reviewsCount: Math.floor(Math.random() * 500) + 10,
      description: 'O melhor atendimento da região.',
      distance: `${(Math.random() * 5).toFixed(1)}km`,
      adType: isPremium ? AdType.PREMIUM : AdType.ORGANIC,
      isSponsored: isSponsored || isPremium,
      verified: i % 3 === 0,
      cashback: hasCashback ? (Math.floor(Math.random() * 10) + 2) : undefined,
      address: 'Rua Exemplo, 123',
      isOpenNow: isOpenNow,
    };
  });
};

const sortStores = (stores: Store[]) => {
  return stores.sort((a, b) => {
    const aIsSponsored = a.isSponsored || a.adType === AdType.PREMIUM;
    const bIsSponsored = b.isSponsored || b.adType === AdType.PREMIUM;

    if (aIsSponsored && !bIsSponsored) return -1;
    if (!aIsSponsored && bIsSponsored) return 1;

    const aHasCashback = !!a.cashback;
    const bHasCashback = !!b.cashback;

    if (aHasCashback && !bHasCashback) return -1;
    if (!aHasCashback && bHasCashback) return 1;

    return 0;
  });
};

const RAW_STORES = generateFakeStores();
const ALL_SORTED_STORES = sortStores([...RAW_STORES]);
const ITEMS_PER_PAGE = 12;

export const LojasEServicosList: React.FC<LojasEServicosListProps> = ({ onStoreClick, onViewAll, activeFilter = 'all' }) => {
  const [visibleStores, setVisibleStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  
  const { toggleFavorite, isFavorite } = useFavorites(auth.currentUser);
  
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    let data = [...ALL_SORTED_STORES];

    if (activeFilter === 'cashback') {
        data = data.filter(s => s.cashback && s.cashback > 0);
    } else if (activeFilter === 'top_rated') {
        data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (activeFilter === 'open_now') {
        data = data.filter(s => s.isOpenNow);
    }

    setFilteredStores(data);
    setVisibleStores(data.slice(0, ITEMS_PER_PAGE));
    setHasMore(data.length > ITEMS_PER_PAGE);
  }, [activeFilter]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(false);

    setTimeout(() => {
      try {
        setVisibleStores(prev => {
          const currentLength = prev.length;
          const nextSlice = filteredStores.slice(currentLength, currentLength + ITEMS_PER_PAGE);
          
          if (currentLength + nextSlice.length >= filteredStores.length) {
            setHasMore(false);
          }
          
          return [...prev, ...nextSlice];
        });
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }, 800);
  }, [loading, hasMore, filteredStores]);

  const lastStoreElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    }, {
        rootMargin: '100px' 
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  const handleToggleFavorite = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!auth.currentUser) {
        alert("Faça login para favoritar lojas!");
        return;
    }
    await toggleFavorite(id);
  };

  return (
    <div className="flex flex-col w-full pb-4">
      
      <div className="flex justify-between items-end mb-3 px-1">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white leading-none">
          Lojas & Serviços
        </h3>
        {onViewAll ? (
            <button 
                onClick={onViewAll}
                className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
            >
                Ver mais
            </button>
        ) : (
            <span className="text-[10px] text-gray-400 font-medium">
              {visibleStores.length} de {filteredStores.length}
            </span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {visibleStores.map((store, index) => {
            const isLastElement = index === visibleStores.length - 1;
            const isSponsored = store.isSponsored || store.adType === AdType.PREMIUM;
            const isFavorited = isFavorite(store.id);
            
            return (
                <div
                    key={store.id}
                    ref={isLastElement ? lastStoreElementRef : null}
                    onClick={() => onStoreClick && onStoreClick(store)}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 flex gap-3 cursor-pointer active:bg-gray-50 dark:active:bg-gray-700/50 transition-colors relative group"
                >
                    {isSponsored && (
                        <div className="absolute top-2 right-3 z-10 pointer-events-none">
                            <span className="text-[10px] font-medium text-[#7A7A7A] dark:text-gray-400">
                                Patrocinado
                            </span>
                        </div>
                    )}

                    <div className="w-[80px] h-[80px] flex-shrink-0 relative rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-700">
                        <img 
                            src={store.logoUrl || "/assets/default-logo.png"} 
                            alt={store.name} 
                            className="w-full h-full object-contain"
                            loading="lazy"
                        />
                    </div>

                    <div className="flex-1 flex flex-col justify-center min-w-0 py-0.5 pr-8">
                        <div className="flex flex-col gap-1 mb-1">
                             <div className="flex items-center gap-1.5 flex-wrap">
                               <h4 className="font-bold text-gray-800 dark:text-white text-sm leading-tight truncate max-w-[85%]">
                                  {store.name}
                               </h4>
                               
                               {store.verified && (
                                 <BadgeCheck className="w-4 h-4 text-white fill-[#1E5BFF] shrink-0" aria-label="Loja Verificada" />
                               )}

                               {store.cashback && (
                                 <div className="w-3.5 h-3.5 bg-black rounded-full flex items-center justify-center shrink-0" title="Cashback Ativo">
                                    <Coins className="w-2.5 h-2.5 text-[#FFD447] fill-[#FFD447]" strokeWidth={1} aria-label="Cashback" />
                                 </div>
                               )}
                             </div>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                             <div className="flex items-center gap-0.5 text-[#1E5BFF] font-bold">
                                <Star className="w-3 h-3 fill-current" />
                                <span>{store.rating}</span>
                             </div>
                             <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                             <span className="truncate max-w-[100px]">{store.category}</span>
                             <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                             <span>{store.distance}</span>
                        </div>
                    </div>
                    
                    <button 
                        onClick={(e) => handleToggleFavorite(e, store.id)}
                        className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-sm border transition-all duration-200 z-20 ${
                            isFavorited 
                            ? 'bg-[#E8EFFF] border-blue-100' 
                            : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                        <Heart 
                            className={`w-4 h-4 transition-colors ${
                                isFavorited 
                                ? 'text-[#1E5BFF] fill-[#1E5BFF]' 
                                : 'text-gray-400 dark:text-gray-500'
                            }`} 
                        />
                    </button>
                </div>
            );
        })}
      </div>

      {loading && (
        <div className="w-full flex justify-center py-6">
            <div className="flex items-center gap-2 text-primary-500 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="text-[11px] font-bold">Carregando...</span>
            </div>
        </div>
      )}

      {error && (
        <div className="w-full flex justify-center py-4">
            <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-bold">Erro ao carregar.</span>
                <button onClick={() => { setHasMore(true); loadMore(); }} className="underline ml-1 font-bold">Tentar novamente</button>
            </div>
        </div>
      )}

      {!hasMore && !loading && (
        <div className="w-full text-center py-8">
            <p className="text-[11px] text-gray-400 dark:text-gray-600 font-medium">
                Você chegou ao fim das lojas por aqui 👋
            </p>
        </div>
      )}
    </div>
  );
};