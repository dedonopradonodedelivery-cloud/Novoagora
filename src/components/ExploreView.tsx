
import React, { useMemo, useState, useEffect } from 'react';
import { Category, Store, AdType } from '../types';
import {
  MapPin,
  Star,
  Percent,
  Sparkles,
  Compass,
  Filter,
  Crown,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Coins,
  Zap,
  Clock,
  Phone
} from 'lucide-react';

interface ExploreViewProps {
  onSelectCategory: (category: Category) => void;
  onNavigate: (view: string) => void;
  onStoreClick: (store: Store) => void;
  stores: Store[];
  searchTerm?: string;
  onViewAllVerified?: () => void;
}

type QuickFilter = 'all' | 'cashback' | 'top_rated';

const styleChips = [
  { id: 'saudavel', label: 'Saudável', keywords: ['saudável', 'fitness', 'salada'] },
  { id: 'barato', label: 'Barato & Bom', keywords: ['barato', 'promo', 'oferta'] },
  { id: 'familia', label: 'Para a família', keywords: ['família', 'kids', 'pizza'] },
  { id: 'gourmet', label: 'Gourmet', keywords: ['gourmet', 'premium'] },
  { id: 'fitness', label: 'Vida fitness', keywords: ['academia', 'fitness'] },
  { id: 'rapido', label: 'Serviços rápidos', keywords: ['rápido', 'express'] },
];

const HORIZONTAL_SCROLL_CSS = `
.horizontal-scroll::-webkit-scrollbar { display: none; }
.horizontal-scroll { -ms-overflow-style: none; scrollbar-width: none; }
`;

// Imagens para o carrossel automático
const EXPLORE_BANNERS = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format=fit=crop', // Academia
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format=fit=crop', // Moda Feminina
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format=fit=crop', // Celular
  'https://images.unsplash.com/photo-1599447421405-0c323d27bc8d?q=80&w=800&auto=format=fit=crop', // Yoga
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format=fit=crop', // Tech/Work
];

// Dados dos Serviços 24h (movido da Home)
const SERVICES_24H = [
  { id: 'srv1', name: 'Chaveiro Expresso', category: 'Chaveiro', image: 'https://images.unsplash.com/photo-1585664811087-47f65be1bac6?q=80&w=400&auto=format=fit=crop' },
  { id: 'srv2', name: 'Farmácia Pacheco', category: 'Farmácia', image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=400&auto=format=fit=crop' },
  { id: 'srv3', name: 'Vet 24h', category: 'Veterinário', image: 'https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?q=80&w=400&auto=format=fit=crop' },
  { id: 'srv4', name: 'Reboque Rápido', category: 'Auto Socorro', image: 'https://images.unsplash.com/photo-1562920616-0b63f03b22b7?q=80&w=400&auto=format=fit=crop' },
  { id: 'srv5', name: 'Desentupidora', category: 'Emergência', image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=400&auto=format=fit=crop' },
];

// --- Lógica de Ordenação e Alternância (Interleaving) ---
const interleaveStores = (stores: Store[]): Store[] => {
  // 1. Separate into buckets based on priority
  // Priority: Sponsored > Cashback > Verified > Others
  // We use exclusive buckets for the interleaving loop to ensure we pick unique items
  const sponsored = stores.filter(s => s.isSponsored || s.adType === AdType.PREMIUM);
  const cashback = stores.filter(s => (s.cashback && s.cashback > 0) && !(s.isSponsored || s.adType === AdType.PREMIUM));
  const verified = stores.filter(s => s.verified && !(s.cashback && s.cashback > 0) && !(s.isSponsored || s.adType === AdType.PREMIUM));
  const others = stores.filter(s => !s.verified && !(s.cashback && s.cashback > 0) && !(s.isSponsored || s.adType === AdType.PREMIUM));

  const result: Store[] = [];
  const maxLength = Math.max(sponsored.length, cashback.length, verified.length);

  // 2. Interleave: Sponsored -> Cashback -> Verified
  for (let i = 0; i < maxLength; i++) {
    if (sponsored[i]) result.push(sponsored[i]);
    if (cashback[i]) result.push(cashback[i]);
    if (verified[i]) result.push(verified[i]);
  }

  // 3. Append remaining "others"
  return [...result, ...others];
};

// --- Componente de seção horizontal reutilizável ---
const HorizontalStoreSection: React.FC<{
  title: string;
  subtitle?: string;
  stores: Store[];
  onStoreClick: (store: Store) => void;
}> = ({ title, subtitle, stores, onStoreClick }) => {
  if (!stores || stores.length === 0) return null;

  return (
    <section className="mb-6">
      <div className="flex items-baseline justify-between mb-2 px-1">
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h2>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="horizontal-scroll flex gap-3 overflow-x-auto pb-1">
        {stores.map((store) => {
          const image =
            (store as any).image ||
            (store as any).image_url ||
            (store as any).logo ||
            (store as any).banner ||
            '';
          const name = (store as any).name || (store as any).nome || '';
          const rating =
            (store as any).rating ||
            (store as any).nota ||
            (store as any).avaliacao ||
            0;
          const category =
            (store as any).category || (store as any).categoria || '';
          const distance = (store as any).distance || 'Freguesia • RJ';

          const isSponsored = store.isSponsored || store.adType === AdType.PREMIUM;
          const hasCashback = store.cashback && store.cashback > 0;
          const isVerified = store.verified;

          return (
            <button
              key={store.id}
              className="min-w-[190px] max-w-[210px] bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex-shrink-0 text-left overflow-hidden active:scale-[0.98] transition-transform group"
              onClick={() => onStoreClick(store)}
            >
              <div className="h-28 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden relative">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                )}

                {/* --- BADGES (PRIORITY ORDER, RIGHT ALIGNED) --- */}
                <div className="absolute top-2 right-2 flex gap-1.5 flex-row-reverse z-10">
                    
                    {/* 1. Patrocinado (Azul Royal) */}
                    {isSponsored && (
                        <div className="w-6 h-6 bg-[#1E5BFF] rounded-full flex items-center justify-center shadow-sm" title="Patrocinado">
                            <Zap className="w-3.5 h-3.5 text-white fill-white" />
                        </div>
                    )}

                    {/* 2. Cashback (Preto + Amarelo) */}
                    {hasCashback && (
                        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center shadow-sm" title="Cashback">
                            <Coins className="w-3.5 h-3.5 text-[#FFD447] fill-[#FFD447]" />
                        </div>
                    )}

                    {/* 3. Verificado (Azul Royal + Branco) */}
                    {isVerified && (
                        <BadgeCheck className="w-5 h-5 text-white fill-[#1E5BFF] drop-shadow-sm" />
                    )}
                </div>

              </div>
              <div className="px-3 py-2.5">
                <p className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 leading-tight">
                  {name}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-[70%]">
                    {category}
                  </span>
                  {rating > 0 && (
                    <span className="flex items-center gap-0.5 text-[11px] text-[#1E5BFF] font-medium">
                      <Star className="w-3 h-3" fill="currentColor" />
                      {rating.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export const ExploreView: React.FC<ExploreViewProps> = ({
  onSelectCategory,
  onNavigate,
  onStoreClick,
  stores,
  searchTerm = '',
}) => {
  const [quickFilter, setQuickFilter] = useState<QuickFilter>('all');
  const [activeStyle, setActiveStyle] = useState<string | null>(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  // Banner Auto-Rotation Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % EXPLORE_BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // --- Base: filtrar por busca ---
  const searchFilteredStores = useMemo(() => {
    if (!normalizedSearch) return stores;

    return stores.filter((store) => {
      const name = (store as any).name || (store as any).nome || '';
      const subcategory = (store as any).subcategory || (store as any).subcategoria || '';
      const category = (store as any).category || (store as any).categoria || '';
      const neighborhood =
        (store as any).neighborhood ||
        (store as any).bairro ||
        (store as any).distance ||
        '';

      const haystack =
        `${name} ${subcategory} ${category} ${neighborhood}`.toLowerCase();
      return haystack.includes(normalizedSearch);
    });
  }, [stores, normalizedSearch]);

  // --- Filtro por estilo (chips) ---
  const styleFilteredStores = useMemo(() => {
    if (!activeStyle) return searchFilteredStores;
    const style = styleChips.find((s) => s.id === activeStyle);
    if (!style) return searchFilteredStores;

    return searchFilteredStores.filter((store) => {
      const text = (
        (store as any).description ||
        (store as any).descricao ||
        (store as any).name ||
        (store as any).nome ||
        ''
      )
        .toString()
        .toLowerCase();
      return style.keywords.some((kw) => text.includes(kw.toLowerCase()));
    });
  }, [searchFilteredStores, activeStyle]);

  // --- Quick filters (cashback, top rated) ---
  const finalFilteredStores = useMemo(() => {
    if (quickFilter === 'cashback') {
      return styleFilteredStores.filter(
        (store) => (store as any).cashback && (store as any).cashback > 0
      );
    }

    if (quickFilter === 'top_rated') {
      return [...styleFilteredStores].sort((a, b) => {
        const ratingA =
          (a as any).rating || (a as any).nota || (a as any).avaliacao || 0;
        const ratingB =
          (b as any).rating || (b as any).nota || (b as any).avaliacao || 0;
        return ratingB - ratingA;
      });
    }

    return styleFilteredStores;
  }, [styleFilteredStores, quickFilter]);

  // --- Seções de recomendação (USANDO INTERLEAVE) ---

  // 1. Lojas perto de você (simulando proximidade com interleave)
  const nearYouStores = useMemo(() => {
    return interleaveStores(finalFilteredStores).slice(0, 10);
  }, [finalFilteredStores]);

  // 2. Pra você (interleave também para garantir visibilidade comercial)
  const forYouStores = useMemo(() => {
    // Basic recommendation logic (here just interleaving, normally would check user prefs)
    return interleaveStores([...finalFilteredStores].reverse()).slice(0, 10);
  }, [finalFilteredStores]);

  // 3. Com cashback
  const cashbackStores = useMemo(
    () =>
      finalFilteredStores.filter(
        (store) => (store as any).cashback && (store as any).cashback > 0
      ),
    [finalFilteredStores]
  );

  // 4. Tendências na Freguesia (interleave shuffled)
  const trendingStores = useMemo(() => {
    const shuffled = [...finalFilteredStores].sort(
      () => Math.random() - 0.5
    );
    return interleaveStores(shuffled).slice(0, 10);
  }, [finalFilteredStores]);

  const hasAnyStore = finalFilteredStores.length > 0;

  return (
    <>
      {/* CSS para esconder barras de rolagem horizontais das seções */}
      <style>{HORIZONTAL_SCROLL_CSS}</style>

      <div className="px-4 pt-3 pb-6 space-y-5">
        {/* Filtros rápidos */}
        <div className="horizontal-scroll flex gap-2 overflow-x-auto pb-1">
          <button
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap transition-colors ${
              quickFilter === 'all'
                ? 'bg-[#1E5BFF] text-white border-[#1E5BFF]'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
            }`}
            onClick={() => setQuickFilter('all')}
          >
            <Filter className="w-3 h-3" />
            Todos
          </button>
          <button
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap transition-colors ${
              quickFilter === 'cashback'
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
            }`}
            onClick={() => setQuickFilter('cashback')}
          >
            <Percent className="w-3 h-3" />
            Cashback
          </button>
          <button
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap transition-colors ${
              quickFilter === 'top_rated'
                ? 'bg-[#1E5BFF] text-white border-[#1E5BFF]'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
            }`}
            onClick={() => setQuickFilter('top_rated')}
          >
            <Star className="w-3 h-3" />
            Melhor avaliadas
          </button>
          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap bg-white dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700"
            type="button"
          >
            ⏱ Abertos agora
          </button>
        </div>

        {/* --- CARROSSEL DE IMAGENS AUTOMÁTICO --- */}
        <div className="w-full">
            <div className="w-full h-[150px] rounded-2xl overflow-hidden relative shadow-sm border border-gray-100 dark:border-gray-700">
                {EXPLORE_BANNERS.map((banner, index) => (
                    <div 
                        key={index} 
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-gray-200 dark:bg-gray-800 ${
                            index === currentBannerIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img 
                            src={banner} 
                            alt={`Banner ${index + 1}`} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                ))}
            </div>
            {/* Indicadores (Dots) */}
            <div className="flex justify-center gap-1.5 mt-3">
                {EXPLORE_BANNERS.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === currentBannerIndex 
                            ? 'w-6 bg-[#1E5BFF]' 
                            : 'w-1.5 bg-gray-300 dark:bg-gray-700'
                        }`} 
                    />
                ))}
            </div>
        </div>

        {/* Seções de recomendação */}
        {hasAnyStore ? (
          <>
            <HorizontalStoreSection
              title="Lojas perto de você"
              subtitle="Sugestões na Freguesia e arredores"
              stores={nearYouStores}
              onStoreClick={onStoreClick}
            />

            <HorizontalStoreSection
              title="Pra você"
              subtitle="Selecionadas pelo seu estilo e avaliações"
              stores={forYouStores}
              onStoreClick={onStoreClick}
            />

            {cashbackStores.length > 0 && (
              <HorizontalStoreSection
                title="Com cashback"
                subtitle="Ganhe parte do valor de volta nas suas compras"
                stores={cashbackStores}
                onStoreClick={onStoreClick}
              />
            )}

            <HorizontalStoreSection
              title="Tendências na Freguesia"
              subtitle="Lugares que estão chamando atenção por aqui"
              stores={trendingStores}
              onStoreClick={onStoreClick}
            />
          </>
        ) : (
          <div className="pt-8 pb-4 flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5 text-gray-400" />
            </div>
            <p className="font-semibold text-sm">Nenhuma loja encontrada</p>
            <p className="text-xs mt-1">
              Ajuste a busca ou os filtros para ver novas opções.
            </p>
          </div>
        )}

        {/* Serviços 24h (Moved from Home) */}
        <section>
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Serviços 24h</h2>
            </div>
            <div className="horizontal-scroll flex gap-3 overflow-x-auto pb-1">
                {SERVICES_24H.map((service) => (
                    <div key={service.id} className="min-w-[130px] w-[130px] bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col group cursor-pointer active:scale-95 transition-transform">
                        <div className="h-20 w-full relative bg-gray-200 dark:bg-gray-700">
                            <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1 animate-pulse">
                                <Clock className="w-3 h-3" />
                                24h
                            </div>
                        </div>
                        <div className="p-2.5 flex flex-col flex-1 justify-between">
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-white text-xs line-clamp-1">{service.name}</h4>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{service.category}</p>
                            </div>
                            <div className="mt-1.5 pt-1.5 border-t border-gray-100 dark:border-gray-700 flex items-center gap-1">
                                <Phone className="w-3 h-3 text-green-500" />
                                <span className="text-[9px] font-medium text-gray-600 dark:text-gray-300">Ligar agora</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Descubra por estilo - no final da página */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Descubra por estilo
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {styleChips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() =>
                  setActiveStyle((prev) => (prev === chip.id ? null : chip.id))
                }
                className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                  activeStyle === chip.id
                    ? 'bg-[#1E5BFF] text-white border-[#1E5BFF]'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </section>

        {/* Patrocinador Master Banner - New Dark Blue Style */}
        <div 
          onClick={() => onNavigate('patrocinador_master')}
          className="w-full bg-[#1F2A44] rounded-2xl p-4 shadow-sm border border-transparent relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all mt-4"
        >
          <div className="flex items-center gap-4 relative z-10">
             {/* Icon - White container for contrast */}
             <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-inner flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1E5BFF]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" fill="currentColor"/>
                  <path d="M8 8H16V10H10V11H15V13H10V14H16V16H8V8Z" fill="white"/>
                </svg>
             </div>

             {/* Text - 100% White */}
             <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-0.5">Patrocinador Master</p>
                <h3 className="text-white font-bold text-lg leading-tight truncate">Grupo Esquematiza</h3>
                <p className="text-white text-xs mt-0.5 font-medium truncate">Transformando desafios em soluções seguras!</p>
             </div>

             {/* Arrow - White */}
             <ChevronRight className="w-5 h-5 text-white opacity-80 group-hover:opacity-100 transition-colors" />
          </div>
        </div>

      </div>
    </>
  );
};
