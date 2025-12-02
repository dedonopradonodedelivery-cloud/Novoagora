
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, Loader2, AlertCircle, ChevronRight, BadgeCheck } from 'lucide-react';
import { Store, AdType } from '../types';

interface LojasEServicosListProps {
  onStoreClick?: (store: Store) => void;
}

// --- 1. GERAÇÃO DE DADOS FAKE LOCAIS (64 ITENS) ---
const CATEGORIES_MOCK = ['Alimentação', 'Beleza', 'Serviços', 'Pets', 'Moda', 'Saúde'];
const SUBCATEGORIES_MOCK = ['Restaurante', 'Salão', 'Manutenção', 'Pet Shop', 'Roupas', 'Clínica'];

const generateFakeStores = (): Store[] => {
  return Array.from({ length: 64 }, (_, i) => {
    const catIndex = i % CATEGORIES_MOCK.length;
    // Lógica para garantir variedade nos dados para teste de ordenação
    const isPremium = i % 10 === 0; // 10% Premium
    const isSponsored = i % 15 === 0; // ~6% Sponsored
    const hasCashback = i % 3 === 0 && !isPremium && !isSponsored; // ~30% com Cashback (exclusivo de quem nao é premium para teste)

    return {
      id: `fake-infinite-${i}`,
      name: `Loja Comercial ${i + 1}`,
      category: CATEGORIES_MOCK[catIndex],
      subcategory: SUBCATEGORIES_MOCK[catIndex],
      image: `https://picsum.photos/400/300?random=${i + 100}`,
      rating: Number((3.5 + Math.random() * 1.5).toFixed(1)), // Rating entre 3.5 e 5.0
      reviewsCount: Math.floor(Math.random() * 500) + 10,
      description: 'O melhor atendimento da região.',
      distance: `${(Math.random() * 5).toFixed(1)}km`,
      adType: isPremium ? AdType.PREMIUM : AdType.ORGANIC,
      isSponsored: isSponsored || isPremium, // Consideramos Premium como patrocinado para o topo
      verified: i % 3 === 0, // 33% verificadas
      cashback: hasCashback ? (Math.floor(Math.random() * 10) + 2) : undefined, // Cashback entre 2% e 12%
      address: 'Rua Exemplo, 123',
    };
  });
};

// --- 2. LÓGICA DE ORDENAÇÃO (REGRA DE OURO) ---
// 1. Patrocinados (PRO/PREMIUM)
// 2. Com Cashback
// 3. Normais
const sortStores = (stores: Store[]) => {
  return stores.sort((a, b) => {
    // Critério 1: É Patrocinado/Premium?
    const aIsSponsored = a.isSponsored || a.adType === AdType.PREMIUM;
    const bIsSponsored = b.isSponsored || b.adType === AdType.PREMIUM;

    if (aIsSponsored && !bIsSponsored) return -1;
    if (!aIsSponsored && bIsSponsored) return 1;

    // Critério 2: Tem Cashback? (Só conta se ambos não forem patrocinados, ou ambos forem)
    const aHasCashback = !!a.cashback;
    const bHasCashback = !!b.cashback;

    if (aHasCashback && !bHasCashback) return -1;
    if (!aHasCashback && bHasCashback) return 1;

    // Critério 3: Desempate (opcional, por rating ou id)
    return 0;
  });
};

// Gera e ordena a lista MESTRA uma única vez
const RAW_STORES = generateFakeStores();
const ALL_SORTED_STORES = sortStores([...RAW_STORES]);
const ITEMS_PER_PAGE = 12;

export const LojasEServicosList: React.FC<LojasEServicosListProps> = ({ onStoreClick }) => {
  // --- ESTADOS ---
  const [visibleStores, setVisibleStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  
  // Referência para o observador de scroll
  const observer = useRef<IntersectionObserver | null>(null);

  // --- LÓGICA DE CARREGAMENTO ---
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(false);

    // Simula delay de rede (800ms)
    setTimeout(() => {
      try {
        setVisibleStores(prev => {
          const currentLength = prev.length;
          const nextSlice = ALL_SORTED_STORES.slice(currentLength, currentLength + ITEMS_PER_PAGE);
          
          if (currentLength + nextSlice.length >= ALL_SORTED_STORES.length) {
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
  }, [loading, hasMore]);

  // --- INICIALIZAÇÃO ---
  useEffect(() => {
    // Carrega os primeiros itens da lista JÁ ORDENADA
    const initialSlice = ALL_SORTED_STORES.slice(0, ITEMS_PER_PAGE);
    setVisibleStores(initialSlice);
  }, []);

  // --- INFINITE SCROLL OBSERVER ---
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


  // --- UI ---
  return (
    <div className="flex flex-col w-full pb-4">
      
      {/* HEADER DA SEÇÃO */}
      <div className="flex justify-between items-end mb-3 px-1">
        <h3 className="text-[18px] font-semibold text-gray-800 dark:text-white leading-none">
          Lojas & Serviços
        </h3>
        <span className="text-[10px] text-gray-400 font-medium">
          {visibleStores.length} de {ALL_SORTED_STORES.length}
        </span>
      </div>

      {/* LISTA VERTICAL DE CARDS COMPACTOS */}
      <div className="flex flex-col gap-3">
        {visibleStores.map((store, index) => {
            const isLastElement = index === visibleStores.length - 1;
            const isSponsored = store.isSponsored || store.adType === AdType.PREMIUM;
            
            return (
                <div
                    key={store.id}
                    ref={isLastElement ? lastStoreElementRef : null}
                    onClick={() => onStoreClick && onStoreClick(store)}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-2 flex gap-3 cursor-pointer active:bg-gray-50 dark:active:bg-gray-700/50 transition-colors h-[88px]"
                >
                    {/* Imagem Esquerda (Horizontal Layout) */}
                    <div className="w-[88px] h-[72px] flex-shrink-0 relative rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <img 
                            src={store.image} 
                            alt={store.name} 
                            className="w-full h-full object-cover" 
                            loading="lazy"
                        />
                        
                        {/* STICKER CASHBACK (Regra 2: Canto inferior esquerdo, Verde, Bold) */}
                        {store.cashback && (
                           <div className="absolute bottom-1 left-1 bg-[#2ECC71] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-sm z-10 leading-none">
                             {store.cashback}% VOLTA
                           </div>
                        )}
                    </div>

                    {/* Conteúdo Direita */}
                    <div className="flex-1 flex flex-col justify-center min-w-0 py-0.5">
                        <div className="flex justify-between items-start gap-2">
                             {/* Nome + Verificação */}
                             <div className="flex items-center gap-1.5 min-w-0">
                               <h4 className="font-bold text-gray-800 dark:text-white text-[13px] leading-tight truncate">
                                  {store.name}
                               </h4>
                               {store.verified && (
                                 <BadgeCheck className="w-3.5 h-3.5 text-blue-500 fill-white flex-shrink-0" />
                               )}
                             </div>
                             
                             {/* Sticker PATROCINADO (Substitui PRO) */}
                             {isSponsored && (
                                 <span className="flex-shrink-0 text-[9px] font-bold bg-[#FF6501] text-white px-1.5 py-0.5 rounded shadow-sm leading-none">
                                     PATROCINADO
                                 </span>
                             )}
                        </div>

                        {/* Linha Secundária de Metadados */}
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mt-1.5">
                             <div className="flex items-center gap-0.5 text-orange-500 font-bold">
                                <Star className="w-3 h-3 fill-current" />
                                <span>{store.rating}</span>
                             </div>
                             <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                             <span className="truncate">{store.category}</span>
                             <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                             <span>{store.distance}</span>
                        </div>
                    </div>
                    
                    {/* Seta indicativa */}
                    <div className="flex items-center justify-center pr-1 text-gray-300">
                        <ChevronRight className="w-4 h-4" />
                    </div>
                </div>
            );
        })}
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="w-full flex justify-center py-6">
            <div className="flex items-center gap-2 text-primary-500 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="text-[11px] font-bold">Carregando...</span>
            </div>
        </div>
      )}

      {/* ERROR STATE */}
      {error && (
        <div className="w-full flex justify-center py-4">
            <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-bold">Erro ao carregar.</span>
                <button onClick={() => { setHasMore(true); loadMore(); }} className="underline ml-1 font-bold">Tentar novamente</button>
            </div>
        </div>
      )}

      {/* END OF LIST MESSAGE */}
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
