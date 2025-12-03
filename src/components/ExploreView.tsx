
import React, { useMemo, useState } from 'react';
import { Category, Store } from '../types';
import {
  MapPin,
  Star,
  Percent,
  Sparkles,
  Compass,
  Filter,
  Crown,
} from 'lucide-react';
import { MasterSponsorBanner } from './MasterSponsorBanner';

interface ExploreViewProps {
  onSelectCategory: (category: Category) => void;
  onNavigate: (view: string) => void;
  onStoreClick: (store: Store) => void;
  stores: Store[];
  searchTerm?: string;
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
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
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

          return (
            <button
              key={store.id}
              className="min-w-[190px] max-w-[210px] bg-white rounded-2xl shadow-sm border border-gray-100 flex-shrink-0 text-left overflow-hidden active:scale-[0.98] transition-transform"
              onClick={() => onStoreClick(store)}
            >
              <div className="h-24 w-full bg-gray-100 overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div className="px-3 py-2.5">
                <p className="font-semibold text-sm text-gray-900 line-clamp-2">
                  {name}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] text-gray-500 truncate max-w-[70%]">
                    {category || distance}
                  </span>
                  {rating > 0 && (
                    <span className="flex items-center gap-0.5 text-[11px] text-yellow-600 font-medium">
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

  const normalizedSearch = searchTerm.trim().toLowerCase();

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

  // --- Seções de recomendação ---

  // 1. Lojas perto de você (por enquanto só as primeiras, simulando proximidade)
  const nearYouStores = useMemo(() => {
    return finalFilteredStores.slice(0, 10);
  }, [finalFilteredStores]);

  // 2. Pra você (mais bem avaliadas)
  const forYouStores = useMemo(() => {
    const sorted = [...finalFilteredStores].sort((a, b) => {
      const ratingA =
        (a as any).rating || (a as any).nota || (a as any).avaliacao || 0;
      const ratingB =
        (b as any).rating || (b as any).nota || (b as any).avaliacao || 0;
      return ratingB - ratingA;
    });
    return sorted.slice(0, 10);
  }, [finalFilteredStores]);

  // 3. Com cashback
  const cashbackStores = useMemo(
    () =>
      finalFilteredStores.filter(
        (store) => (store as any).cashback && (store as any).cashback > 0
      ),
    [finalFilteredStores]
  );

  // 4. Tendências na Freguesia (aleatório)
  const trendingStores = useMemo(() => {
    const shuffled = [...finalFilteredStores].sort(
      () => Math.random() - 0.5
    );
    return shuffled.slice(0, 10);
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
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap ${
              quickFilter === 'all'
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-700 border-gray-200'
            }`}
            onClick={() => setQuickFilter('all')}
          >
            <Filter className="w-3 h-3" />
            Todos
          </button>
          <button
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap ${
              quickFilter === 'cashback'
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-white text-gray-700 border-gray-200'
            }`}
            onClick={() => setQuickFilter('cashback')}
          >
            <Percent className="w-3 h-3" />
            Cashback
          </button>
          <button
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap ${
              quickFilter === 'top_rated'
                ? 'bg-yellow-500 text-white border-yellow-500'
                : 'bg-white text-gray-700 border-gray-200'
            }`}
            onClick={() => setQuickFilter('top_rated')}
          >
            <Star className="w-3 h-3" />
            Melhor avaliadas
          </button>
          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap bg-white text-gray-400 border-gray-200"
            type="button"
          >
            ⏱ Abertos agora
          </button>
        </div>

        {/* Card Patrocinador Master */}
        <div className="mt-2 mb-2">
          <MasterSponsorBanner />
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
          <div className="pt-8 pb-4 flex flex-col items-center text-center text-gray-500">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5 text-gray-400" />
            </div>
            <p className="font-semibold text-sm">Nenhuma loja encontrada</p>
            <p className="text-xs mt-1">
              Ajuste a busca ou os filtros para ver novas opções.
            </p>
          </div>
        )}

        {/* Descubra por estilo - no final da página */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-2">
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
                className={`px-3 py-1.5 rounded-full text-xs border ${
                  activeStyle === chip.id
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
