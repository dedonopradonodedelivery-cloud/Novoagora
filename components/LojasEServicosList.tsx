import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Star,
  Loader2,
  AlertCircle,
  ChevronRight,
  BadgeCheck,
  Heart,
  Check,
  Coins,
} from "lucide-react";
import { Store, AdType } from "../types";
import { useFavorites } from "../hooks/useFavorites";
import { auth } from "../lib/firebase";

// --- 1. MOCK DE LOJAS (64 ITENS PARA TESTE) ---
const CATEGORIES_MOCK = [
  "Alimentação",
  "Beleza",
  "Serviços",
  "Pets",
  "Moda",
  "Saúde",
];
const SUBCATEGORIES_MOCK = [
  "Restaurante",
  "Salão",
  "Manutenção",
  "Pet Shop",
  "Roupas",
  "Clínica",
];

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
      image: `https://picsum.photos/400/300?random=${i + 100}`,
      rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
      reviewsCount: Math.floor(Math.random() * 500) + 10,
      description: "O melhor atendimento da região.",
      distance: `${(Math.random() * 5).toFixed(1)}km`,
      adType: isPremium ? AdType.PREMIUM : AdType.ORGANIC,
      isSponsored: isSponsored || isPremium,
      verified: i % 3 === 0,
      cashback: hasCashback ? Math.floor(Math.random() * 10) + 2 : undefined,
      address: "Rua Exemplo, 123",
      isOpenNow: isOpenNow,
    };
  });
};

// --- 2. ORDENAR LISTA (Regra: Premium > Cashback > Orgânico) ---
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

interface LojasEServicosListProps {
  onStoreClick?: (store: Store) => void;
  onViewAll?: () => void;
  activeFilter?: "all" | "cashback" | "top_rated" | "open_now";
}

export const LojasEServicosList: React.FC<LojasEServicosListProps> = ({
  onStoreClick,
  onViewAll,
  activeFilter = "all",
}) => {
  const [visibleStores, setVisibleStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites(auth.currentUser);

  const observer = useRef<IntersectionObserver | null>(null);

  // --- 3. FILTRAGEM ---
  useEffect(() => {
    let data = [...ALL_SORTED_STORES];

    if (activeFilter === "cashback") {
      data = data.filter((s) => s.cashback && s.cashback > 0);
    } else if (activeFilter === "top_rated") {
      data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (activeFilter === "open_now") {
      data = data.filter((s) => s.isOpenNow);
    }

    setFilteredStores(data);
    setVisibleStores(data.slice(0, ITEMS_PER_PAGE));
    setHasMore(data.length > ITEMS_PER_PAGE);
  }, [activeFilter]);

  // --- 4. CARREGAMENTO INFINITO ---
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(false);

    setTimeout(() => {
      try {
        setVisibleStores((prev) => {
          const currentLength = prev.length;
          const nextSlice = filteredStores.slice(
            currentLength,
            currentLength + ITEMS_PER_PAGE
          );

          if (currentLength + nextSlice.length >= filteredStores.length) {
            setHasMore(false);
          }

          return [...prev, ...nextSlice];
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }, 800);
  }, [loading, hasMore, filteredStores]);

  // --- 5. OBSERVER ---
  const lastStoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadMore();
          }
        },
        { rootMargin: "100px" }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  // --- 6. FAVORITOS ---
  const toggleFav = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!auth.currentUser) {
      alert("Faça login para favoritar lojas!");
      return;
    }
    await toggleFavorite(id);
  };

  // --- UI ---
  return (
    <div className="flex flex-col w-full pb-4">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-3 px-1">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          Lojas & Serviços
        </h3>

        {onViewAll ? (
          <button
            onClick={onViewAll}
            className="text-sm font-medium text-primary-500 hover:text-primary-600"
          >
            Ver mais
          </button>
        ) : (
          <span className="text-[10px] text-gray-400 font-medium">
            {visibleStores.length} de {filteredStores.length}
          </span>
        )}
      </div>

      {/* LISTA */}
      <div className="flex flex-col gap-3">
        {visibleStores.map((store, index) => {
          const isLast = index === visibleStores.length - 1;
          const isSponsored = store.isSponsored || store.adType === AdType.PREMIUM;
          const favorite = isFavorite(store.id);

          return (
            <div
              key={store.id}
              ref={isLast ? lastStoreRef : null}
              onClick={() => onStoreClick && onStoreClick(store)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 flex gap-3 cursor-pointer active:bg-gray-50 dark:active:bg-gray-700/50"
            >
              {/* TAG PATROCINADO */}
              {isSponsored && (
                <div className="absolute top-2 right-3 text-[10px] text-gray-500">
                  Patrocinado
                </div>
              )}

              {/* IMAGEM */}
              <div className="w-[80px] h-[80px] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTEÚDO */}
              <div className="flex-1 flex flex-col min-w-0 pr-8">
                {/* TÍTULO + BADGES */}
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  <h4 className="font-bold text-gray-800 dark:text-white text-sm truncate max-w-[85%]">
                    {store.name}
                  </h4>

                  {/* VERIFICADO */}
                  {store.verified && (
                    <div title="Loja Verificada">
                      <BadgeCheck className="w-4 h-4 text-[#1E5BFF]" />
                    </div>
                  )}

                  {/* CASHBACK */}
                  {store.cashback && (
                    <div
                      className="w-3.5 h-3.5 bg-black rounded-full flex items-center justify-center"
                      title="Cashback ativo"
                    >
                      <Coins className="w-2.5 h-2.5 text-[#FFD447]" strokeWidth={1} />
                    </div>
                  )}
                </div>

                {/* META INFO */}
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <div className="flex items-center gap-0.5 text-[#1E5BFF] font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{store.rating}</span>
                  </div>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="truncate max-w-[110px]">{store.category}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>{store.distance}</span>
                </div>
              </div>

              {/* FAVORITO */}
              <button
                onClick={(e) => toggleFav(e, store.id)}
                className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center border shadow-sm ${
                  favorite
                    ? "bg-[#E8EFFF] border-blue-200"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorite ? "text-[#1E5BFF] fill-[#1E5BFF]" : "text-gray-400"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center py-6">
          <div className="flex items-center gap-2 text-primary-500 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span className="text-[11px] font-bold">Carregando...</span>
          </div>
        </div>
      )}

      {/* ERRO */}
      {error && (
        <div className="flex justify-center py-4">
          <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-bold">Erro ao carregar.</span>
            <button
              onClick={() => {
                setHasMore(true);
                loadMore();
              }}
              className="underline ml-1 font-bold"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )}

      {/* FIM DA LISTA */}
      {!hasMore && !loading && (
        <div className="text-center py-8">
          <p className="text-[11px] text-gray-400">Você chegou ao fim 👋</p>
        </div>
      )}
    </div>
  );
};
