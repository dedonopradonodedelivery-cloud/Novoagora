import React, { useEffect, useMemo, useState, useRef } from "react";
import { Store } from "../types";
import {
  MapPin,
  Filter,
  Zap,
  Star,
  Clock,
  ChevronRight,
  ChevronLeft,
  Compass,
  BadgeCheck,
  Percent,
  Coins,
  Sparkles,
  Phone,
  Crown,
  X,
  Volume2,
  VolumeX
} from "lucide-react";
import { useUserLocation } from "../hooks/useUserLocation";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { quickFilters } from "../constants";

type ExploreViewProps = {
  stores: Store[];
  searchQuery: string;
  onStoreClick: (store: Store) => void;
  onLocationClick: () => void;
  onFilterClick: () => void;
  onOpenPlans: () => void;
  onViewAllVerified?: () => void;
};

// --- MOCK DATA FOR STORIES ---
const EXPLORE_STORIES = [
  { 
    id: 's1', 
    merchantName: 'Padaria Imperial', 
    logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=200&auto=format=fit=crop', 
    videoUrl: 'https://videos.pexels.com/video-files/2942857/2942857-sd_540_960_24fps.mp4', 
    isLive: false 
  },
  { 
    id: 's2', 
    merchantName: 'Fit Studio', 
    logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format=fit=crop', 
    videoUrl: 'https://videos.pexels.com/video-files/4434246/4434246-sd_540_960_25fps.mp4', // Gym video placeholder
    isLive: false 
  },
  { 
    id: 's3', 
    merchantName: 'Burger King', 
    logo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&auto=format=fit=crop', 
    videoUrl: 'https://videos.pexels.com/video-files/852395/852395-sd_540_960_30fps.mp4', // Burger video
    isLive: true 
  },
  { 
    id: 's4', 
    merchantName: 'Moda Freguesia', 
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=200&auto=format=fit=crop', 
    videoUrl: 'https://videos.pexels.com/video-files/6333333/6333333-sd_540_960_30fps.mp4', // Fashion video
    isLive: false 
  },
  { 
    id: 's5', 
    merchantName: 'Pet Shop Bob', 
    logo: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200&auto=format=fit=crop', 
    videoUrl: 'https://videos.pexels.com/video-files/4625753/4625753-sd_540_960_25fps.mp4', // Dog video
    isLive: false 
  },
];

const CategoryChip: React.FC<{
  label: string;
  active?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}> = ({ label, active, icon, onClick }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all whitespace-nowrap
      ${
        active
          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-transparent shadow-sm"
          : "bg-white/80 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/80"
      }`}
  >
    {icon && <span className="w-3.5 h-3.5 flex items-center justify-center">{icon}</span>}
    <span>{label}</span>
  </button>
);

type HorizontalStoreSectionProps = {
  title: string;
  subtitle?: string;
  stores: Store[];
  onStoreClick: (store: Store) => void;
};

const HorizontalStoreSection: React.FC<HorizontalStoreSectionProps> = ({
  title,
  subtitle,
  stores,
  onStoreClick,
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollPosition = (container: HTMLDivElement | null) => {
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScrollLeft = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < maxScrollLeft - 4);
  };

  useEffect(() => {
    const container = document.querySelector(
      `[data-section="${title}"]`
    ) as HTMLDivElement | null;
    if (!container) return;

    checkScrollPosition(container);

    const handleScroll = () => checkScrollPosition(container);
    container.addEventListener("scroll", handleScroll);

    const resizeObserver = new ResizeObserver(() =>
      checkScrollPosition(container)
    );
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [title, stores.length]);

  const scroll = (direction: "left" | "right") => {
    const container = document.querySelector(
      `[data-section="${title}"]`
    ) as HTMLDivElement | null;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.7;
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  if (!stores.length) return null;

  const WrapperComponent = isMobile ? "div" : "section";

  return (
    <WrapperComponent className="mb-6">
      {/* Header com título e navegação */}
      <div className="flex items-center justify-between mb-2 px-0.5">
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Scroll controls - Desktop only */}
        {!isMobile && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-7 h-7 rounded-full border flex items-center justify-center text-gray-400 dark:text-gray-500 bg-white/70 dark:bg-gray-900/60 backdrop-blur
                ${
                  canScrollLeft
                    ? "hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 border-gray-200 dark:border-gray-700"
                    : "opacity-40 cursor-default border-gray-100 dark:border-gray-800"
                }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-7 h-7 rounded-full border flex items-center justify-center text-gray-400 dark:text-gray-500 bg-white/70 dark:bg-gray-900/60 backdrop-blur
                ${
                  canScrollRight
                    ? "hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 border-gray-200 dark:border-gray-700"
                    : "opacity-40 cursor-default border-gray-100 dark:border-gray-800"
                }`}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Lista horizontal de lojas */}
      <div
        data-section={title}
        className="horizontal-scroll flex gap-3 overflow-x-auto pb-1 hide-scrollbar -mx-0.5 px-0.5"
      >
        {stores.map((store) => (
          <button
            key={store.id}
            onClick={() => onStoreClick(store)}
            className="min-w-[250px] max-w-[260px] bg-white dark:bg-gray-900 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.45)] border border-gray-100 dark:border-gray-800 overflow-hidden group text-left hover:-translate-y-0.5 transition-all duration-200"
          >
            {/* Imagem / Capa */}
            <div className="relative h-24 bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <img
                src={(store as any).coverImage || store.image || (store as any).imageUrl}
                alt={store.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Badges - avaliações, distância, etc */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
                {/* Avaliação */}
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-[11px] font-semibold text-white">
                    {store.rating?.toFixed(1) || "Novo"}
                  </span>
                  {store.reviewsCount !== undefined && (
                    <span className="text-[10px] text-white/70">
                      ({store.reviewsCount})
                    </span>
                  )}
                </div>

                {/* Distância / tempo */}
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm">
                  <MapPin className="w-3 h-3 text-white/90" />
                  <span className="text-[10px] text-white/90">
                    {(store as any).distanceText || store.distance || "Perto de você"}
                  </span>
                </div>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-3">
              {/* Nome e categoria */}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="min-w-0">
                  <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white truncate">
                    {store.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                    {(store as any).categoryName ||
                      store.category ||
                      "Categoria em destaque"}
                  </p>
                </div>

                {/* Selo Localizei ou Cashback */}
                <div className="flex flex-col items-end gap-1">
                  {(store as any).isLocalizeiPartner && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-[9px] font-semibold text-white shadow-sm">
                      <BadgeCheck className="w-3 h-3" />
                      Localizei
                    </span>
                  )}

                  {(store as any).cashbackPercentage && (store as any).cashbackPercentage > 0 && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <Coins className="w-3 h-3" />
                      {(store as any).cashbackPercentage}% volta
                    </span>
                  )}
                </div>
              </div>

              {/* Tags rápidas / estilo */}
              {(store as any).tags && (store as any).tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {(store as any).tags.slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800/80 text-[9px] text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700"
                    >
                      <Sparkles className="w-3 h-3 mr-1 text-orange-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Status / tempo / faixa de preço */}
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      {(store as any).status || "Aberto agora"}
                    </span>
                  </div>
                  {(store as any).eta && (
                    <span className="text-[10px] text-gray-400">
                      • {(store as any).eta} min
                    </span>
                  )}
                </div>

                {(store as any).priceLevel && (
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    {Array.from({ length: (store as any).priceLevel })
                      .map(() => "R$")
                      .join("")}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </WrapperComponent>
  );
};

export const ExploreView: React.FC<ExploreViewProps> = ({
  stores,
  searchQuery,
  onStoreClick,
  onLocationClick,
  onFilterClick,
  onOpenPlans,
}) => {
  const { location, isLoading: isLoadingLocation } = useUserLocation();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<"nearby" | "topRated" | "cashback">("nearby");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  
  // Stories State
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const nearbyStores = useMemo(() => {
    if (!stores.length) return [];

    let filtered = [...stores];

    if (selectedFilter === "cashback") {
      filtered = filtered.filter((store) => (store as any).cashbackPercentage && (store as any).cashbackPercentage > 0);
    } else if (selectedFilter === "open_now") {
      filtered = filtered.filter((store) => (store as any).status === "Aberto agora");
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (store) =>
          store.name.toLowerCase().includes(query) ||
          store.category?.toLowerCase().includes(query) ||
          store.description?.toLowerCase().includes(query) ||
          (store as any).tags?.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    if (location) {
      return filtered.sort((a, b) => {
        const distanceA = (a as any).distance || Infinity;
        const distanceB = (b as any).distance || Infinity;
        return typeof distanceA === 'number' && typeof distanceB === 'number' ? distanceA - distanceB : 0;
      });
    }

    return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [stores, searchQuery, selectedFilter, location]);

  const cashbackStores = useMemo(
    () => stores.filter((store) => (store as any).cashbackPercentage && (store as any).cashbackPercentage > 0),
    [stores]
  );

  const topRatedStores = useMemo(
    () => stores.filter((store) => (store.rating || 0) >= 4.5),
    [stores]
  );

  const trendingStores = useMemo(
    () => stores.filter((store) => (store as any).tags?.includes("Trending") || (store as any).tags?.includes("Popular")),
    [stores]
  );

  const hasAnyStore =
    nearbyStores.length > 0 ||
    cashbackStores.length > 0 ||
    topRatedStores.length > 0 ||
    trendingStores.length > 0;

  const handleFilterClick = (filterId: string) => {
    if (filterId === "cashback") {
      setSelectedFilter(selectedFilter === "cashback" ? null : "cashback");
      setSortOption("cashback");
    } else if (filterId === "open_now") {
      setSelectedFilter(selectedFilter === "open_now" ? null : "open_now");
    } else if (filterId === "nearby") {
      setSortOption("nearby");
    } else if (filterId === "top_rated") {
      setSortOption("topRated");
    } else {
      setSelectedFilter(null);
    }
  };

  const sortedStores = useMemo(() => {
    let list = [...stores];

    if (sortOption === "cashback") {
      list = list
        .filter((store) => (store as any).cashbackPercentage && (store as any).cashbackPercentage > 0)
        .sort((a, b) => ((b as any).cashbackPercentage || 0) - ((a as any).cashbackPercentage || 0));
    } else if (sortOption === "topRated") {
      list = list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortOption === "nearby" && location) {
      list = list.sort((a, b) => {
        const distanceA = (a as any).distance || Infinity;
        const distanceB = (b as any).distance || Infinity;
        return typeof distanceA === 'number' && typeof distanceB === 'number' ? distanceA - distanceB : 0;
      });
    }

    if (selectedStyle) {
      list = list.filter((store) =>
        (store as any).tags?.some((tag: string) => tag.toLowerCase().includes(selectedStyle.toLowerCase()))
      );
    }

    return list;
  }, [stores, sortOption, location, selectedStyle]);

  const SERVICES_24H = [
    {
      id: "24h-1",
      name: "Clínica 24h Freguesia",
      category: "Saúde & Emergência",
      image:
        "https://images.pexels.com/photos/1250655/pexels-photo-1250655.jpeg?auto=compress&cs=tinysrgb&w=1200",
      phone: "(21) 99999-0001",
    },
    {
      id: "24h-2",
      name: "Pet Emergência Freguesia",
      category: "Vet & Pet Care",
      image:
        "https://images.pexels.com/photos/19041061/pexels-photo-19041061/free-photo-of-mulher-menina-bonito-fofo.jpeg?auto=compress&cs=tinysrgb&w=1200",
      phone: "(21) 99999-0002",
    },
    {
      id: "24h-3",
      name: "Auto Socorro 24h",
      category: "Guincho & Socorro",
      image:
        "https://images.pexels.com/photos/19053837/pexels-photo-19053837/free-photo-of-carro-veiculo-automovel-motor.jpg?auto=compress&cs=tinysrgb&w=1200",
      phone: "(21) 99999-0003",
    },
  ];

  // --- STORY LOGIC ---
  const activeStory = activeStoryIndex !== null ? EXPLORE_STORIES[activeStoryIndex] : null;

  useEffect(() => {
    let interval: any;
    if (activeStoryIndex !== null) {
      setStoryProgress(0);
      const duration = 15000; // 15 seconds max per story
      const step = 50; 
      
      interval = setInterval(() => {
        setStoryProgress((prev) => {
          if (prev >= 100) {
            handleNextStory();
            return 0;
          }
          return prev + (step / duration) * 100;
        });
      }, step);
    }
    return () => clearInterval(interval);
  }, [activeStoryIndex]);

  const handleNextStory = () => {
    if (activeStoryIndex !== null && activeStoryIndex < EXPLORE_STORIES.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
    } else {
      setActiveStoryIndex(null); // Close
    }
  };

  const handlePrevStory = () => {
    if (activeStoryIndex !== null && activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
    } else {
      setActiveStoryIndex(null);
    }
  };

  return (
    <>
      {/* Header com localização */}
      <div className="px-4 pt-3 pb-1 flex items-center justify-between gap-3">
        <button
          onClick={onLocationClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-900 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          <MapPin className="w-3.5 h-3.5 text-orange-500" />
          <span className="font-medium">
            {isLoadingLocation
              ? "Detectando localização..."
              : location?.address?.neighborhood || "Freguesia e região"}
          </span>
        </button>

        <button
          onClick={onOpenPlans}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-xs font-semibold text-white shadow-sm hover:from-orange-600 hover:to-orange-700 transition-all"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Destaque seu negócio</span>
        </button>
      </div>

      {/* Filtros rápidos */}
      <div className="px-4 py-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
            Explore ofertas, estilos e lugares com cashback
          </span>
          <button
            onClick={onFilterClick}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-[11px] text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-900/60 hover:bg-gray-50 dark:hover:bg-gray-800/80"
          >
            <Filter className="w-3.5 h-3.5" />
            Filtros
          </button>
        </div>

        {/* Chips de filtros rápidos */}
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {quickFilters.map((filter) => (
            <CategoryChip
              key={filter.id}
              label={filter.label}
              active={
                (filter.id === "cashback" && selectedFilter === "cashback") ||
                (filter.id === "open_now" && selectedFilter === "open_now") ||
                (filter.id === "nearby" && sortOption === "nearby") ||
                (filter.id === "top_rated" && sortOption === "topRated")
              }
              icon={
                filter.icon === "zap" ? (
                  <Zap className="w-3 h-3 text-yellow-400" />
                ) : filter.icon === "star" ? (
                  <Star className="w-3 h-3 text-yellow-400" />
                ) : filter.icon === "clock" ? (
                  <Clock className="w-3 h-3 text-emerald-500" />
                ) : filter.icon === "percent" ? (
                  <Percent className="w-3 h-3 text-emerald-500" />
                ) : undefined
              }
              onClick={() => handleFilterClick(filter.id)}
            />
          ))}
        </div>
      </div>

      {/* Conteúdo principal da Explore */}
      <div className="px-4 pb-4 space-y-6">
        {/* Banner principal / destaque premium */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-[1px] shadow-[0_16px_40px_rgba(15,23,42,0.45)]">
          <div className="relative bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.14),transparent_55%),_radial-gradient(circle_at_bottom,_rgba(56,189,248,0.08),transparent_55%)] rounded-2xl px-4 py-3.5 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/30 border border-white/10 text-[9px] text-orange-200 mb-1.5">
                <Zap className="w-3 h-3 text-orange-300" />
                <span className="uppercase tracking-wider font-semibold">
                  Destaque Localizei
                </span>
              </span>
              <h2 className="text-sm font-semibold text-white leading-snug">
                Transforme sua presença local em resultados reais
              </h2>
              <p className="text-[11px] text-slate-200/80 mt-1">
                Banners, destaque nas buscas, cashback e muito mais em um só
                lugar, com foco total na Freguesia.
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <button
                  onClick={onOpenPlans}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  Conhecer planos
                </button>
                <button className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-full border border-white/20 text-[11px] text-slate-100/90 hover:bg-white/10 transition-colors">
                  <MapPin className="w-3 h-3" />
                  Ver cases na Freguesia
                </button>
              </div>
            </div>
            <div className="hidden xs:flex">
              <div className="w-[88px] h-[88px] rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-400 to-yellow-300 relative overflow-hidden shadow-[0_16px_40px_rgba(251,146,60,0.75)]">
                <div className="absolute -inset-6 bg-[conic-gradient(from_210deg,_rgba(15,23,42,0.15),_rgba(15,23,42,0.9),_rgba(15,23,42,0.15))] opacity-70" />
                <div className="relative h-full w-full flex items-center justify-center">
                  <div className="h-11 w-11 rounded-2xl bg-black/80 flex items-center justify-center shadow-lg border border-white/10">
                    <MapPin className="w-5 h-5 text-orange-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- STORIES BLOCK --- */}
        <section className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Stories da Freguesia
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar -mx-4 px-4">
            {EXPLORE_STORIES.map((story, index) => (
              <button
                key={story.id}
                onClick={() => setActiveStoryIndex(index)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
              >
                <div className={`p-[2px] rounded-full ${story.isLive ? 'bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-600 animate-pulse' : 'bg-gradient-to-tr from-orange-400 to-yellow-400'}`}>
                  <div className="w-[60px] h-[60px] rounded-full border-2 border-white dark:border-gray-900 overflow-hidden bg-gray-200 p-[1px]">
                    <img src={story.logo} alt={story.merchantName} className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform" />
                  </div>
                </div>
                <span className="text-[10px] text-gray-600 dark:text-gray-300 font-medium truncate w-[64px] text-center">
                  {story.merchantName}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Destaques de categoria / experiências */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                Achados pela Freguesia
              </h2>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                Experiências selecionadas, novidades e lugares diferentes para
                você descobrir.
              </p>
            </div>
          </div>

          {/* Cards de destaques adicionais */}
          <div className="grid grid-cols-2 gap-2.5">
            <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-500 p-[1px] shadow-lg">
              <div className="relative bg-slate-950/95 rounded-2xl px-3 py-2.5 flex flex-col h-full">
                <div className="flex items-center justify-between gap-1.5">
                  <div>
                    <p className="text-[10px] text-indigo-200/85 font-medium uppercase tracking-widest">
                      Novo por aqui
                    </p>
                    <h3 className="text-xs font-semibold text-white mt-0.5">
                      Lugares que acabaram de chegar
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-black/40 flex items-center justify-center shadow-inner">
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                  </div>
                </div>
                <p className="text-[10px] text-slate-300 mt-1.5 leading-snug">
                  Descubra as novidades e estreias na Freguesia antes de todo
                  mundo.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-slate-200/80">
                    Atualizado toda semana
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-200/80" />
                </div>
              </div>
            </button>

            <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-[1px] shadow-lg">
              <div className="relative bg-slate-950/95 rounded-2xl px-3 py-2.5 flex flex-col h-full">
                <div className="flex items-center justify-between gap-1.5">
                  <div>
                    <p className="text-[10px] text-emerald-200/85 font-medium uppercase tracking-widest">
                      Freguesia com Cashback
                    </p>
                    <h3 className="text-xs font-semibold text-white mt-0.5">
                      Lugares que devolvem parte da sua compra
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-black/40 flex items-center justify-center shadow-inner">
                    <Coins className="w-4 h-4 text-emerald-300" />
                  </div>
                </div>
                <p className="text-[10px] text-slate-300 mt-1.5 leading-snug">
                  Ganhe créditos no Localizei para comprar em outros locais da
                  região.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-slate-200/80">
                    Cashback automático
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-200/80" />
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Seções de recomendação */}
        {hasAnyStore ? (
          <React.Fragment>
            <HorizontalStoreSection
              title="Lojas perto de você"
              subtitle="Sugestões na Freguesia e arredores"
              stores={nearbyStores}
              onStoreClick={onStoreClick}
            />

            <HorizontalStoreSection
              title="Pra você"
              subtitle="Selecionadas pelo seu estilo e avaliações"
              stores={sortedStores}
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
          </React.Fragment>
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
                    <div key={service.id} className="min-w-[260px] max-w-[280px] bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col group cursor-pointer active:scale-95 transition-transform">
                        <div className="h-20 w-full relative bg-gray-200 dark:bg-gray-700">
                            <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded shadow-sm flex items-center gap-1 animate-pulse">
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
            Descubra seu estilo na Freguesia
          </h2>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => setSelectedStyle("Romântico")}
              className={`group relative overflow-hidden rounded-2xl p-[1px] shadow-md transition-transform active:scale-95 ${
                selectedStyle === "Romântico"
                  ? "bg-gradient-to-br from-pink-500 via-rose-500 to-red-500"
                  : "bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800"
              }`}
            >
              <div className="relative bg-white dark:bg-slate-950 rounded-2xl px-3 py-2.5 flex flex-col h-full">
                <div className="flex items-center justify-between gap-1.5">
                  <div>
                    <p className="text-[10px] text-pink-500 dark:text-pink-300 font-semibold uppercase tracking-widest">
                      Casal & Encontros
                    </p>
                    <h3 className="text-xs font-semibold text-gray-900 dark:text-white mt-0.5">
                      Romântico na Freguesia
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-pink-500 dark:text-pink-300" />
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1.5 leading-snug">
                  Lugares para um jantar especial ou um encontro diferente por
                  aqui.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">
                    Restaurantes, bares, rooftops
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-pink-500 dark:text-pink-300" />
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedStyle("Família")}
              className={`group relative overflow-hidden rounded-2xl p-[1px] shadow-md transition-transform active:scale-95 ${
                selectedStyle === "Família"
                  ? "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500"
                  : "bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800"
              }`}
            >
              <div className="relative bg-white dark:bg-slate-950 rounded-2xl px-3 py-2.5 flex flex-col h-full">
                <div className="flex items-center justify-between gap-1.5">
                  <div>
                    <p className="text-[10px] text-emerald-500 dark:text-emerald-300 font-semibold uppercase tracking-widest">
                      Família & Kids
                    </p>
                    <h3 className="text-xs font-semibold text-gray-900 dark:text-white mt-0.5">
                      Para ir com a família
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-300" />
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1.5 leading-snug">
                  Lugares com espaço, conforto e opções para todas as idades.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">
                    Restaurantes, lazer e mais
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-300" />
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedStyle("Moderno")}
              className={`group relative overflow-hidden rounded-2xl p-[1px] shadow-md transition-transform active:scale-95 ${
                selectedStyle === "Moderno"
                  ? "bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500"
                  : "bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800"
              }`}
            >
              <div className="relative bg-white dark:bg-slate-950 rounded-2xl px-3 py-2.5 flex flex-col h-full">
                <div className="flex items-center justify-between gap-1.5">
                  <div>
                    <p className="text-[10px] text-violet-500 dark:text-violet-300 font-semibold uppercase tracking-widest">
                      Conceito & Moderno
                    </p>
                    <h3 className="text-xs font-semibold text-gray-900 dark:text-white mt-0.5">
                      Lugares com vibe diferente
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-violet-500 dark:text-violet-300" />
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1.5 leading-snug">
                  Cafés, bares, studios e espaços com estética forte.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">
                    Cafés, studios, rooftops
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-violet-500 dark:text-violet-300" />
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedStyle("Clássico")}
              className={`group relative overflow-hidden rounded-2xl p-[1px] shadow-md transition-transform active:scale-95 ${
                selectedStyle === "Clássico"
                  ? "bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500"
                  : "bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800"
              }`}
            >
              <div className="relative bg-white dark:bg-slate-950 rounded-2xl px-3 py-2.5 flex flex-col h-full">
                <div className="flex items-center justify-between gap-1.5">
                  <div>
                    <p className="text-[10px] text-amber-500 dark:text-amber-300 font-semibold uppercase tracking-widest">
                      Tradição & Clássicos
                    </p>
                    <h3 className="text-xs font-semibold text-gray-900 dark:text-white mt-0.5">
                      Os queridinhos de sempre
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-300" />
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1.5 leading-snug">
                  Lugares clássicos, com história e sempre cheios.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">
                    Restaurantes, bares, lanchonetes
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500 dark:text-amber-300" />
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Sponsor Banner - Highlighted */}
        <div className="mt-4">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-[1px] shadow-[0_16px_40px_rgba(15,23,42,0.55)]">
            <div className="relative bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.14),transparent_55%),_radial-gradient(circle_at_bottom,_rgba(56,189,248,0.08),transparent_55%)] rounded-2xl px-4 py-3.5 flex items-center gap-3">
              {/* Left Content */}
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 border border-white/15 text-[9px] text-orange-100 mb-1.5">
                  <Zap className="w-3 h-3 text-orange-300" />
                  <span className="uppercase tracking-wider font-semibold">
                    Powered by Localizei
                  </span>
                </div>

                <h2 className="text-sm font-semibold text-white leading-snug">
                  Seja o patrocinador master da Freguesia
                </h2>
                <p className="text-xs text-slate-200/85 mt-1">
                  Sua marca em destaque em todas as experiências do Localizei,
                  com presença constante no app.
                </p>

                {/* CTA Buttons */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={onOpenPlans}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100 transition-colors"
                  >
                    <Crown className="w-3.5 h-3.5 text-yellow-500" />
                    Ver proposta exclusiva
                  </button>
                  <button className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-full border border-white/20 text-[11px] text-slate-100/90 hover:bg-white/10 transition-colors">
                    <MapPin className="w-3 h-3" />
                    Entender visibilidade
                  </button>
                </div>
              </div>

              {/* Right - Illustration / Logo placeholder */}
              <div className="hidden xs:flex">
                <div className="w-[84px] h-[84px] rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-400 to-yellow-300 relative overflow-hidden shadow-[0_16px_40px_rgba(251,146,60,0.75)]">
                  <div className="absolute -inset-10 bg-[conic-gradient(from_210deg,_rgba(15,23,42,0.15),_rgba(15,23,42,0.9),_rgba(15,23,42,0.15))] opacity-90" />
                  <div className="relative h-full w-full flex items-center justify-center p-2">
                    <div className="h-full w-full rounded-xl border border-white/25 bg-black/55 flex items-center justify-center">
                      <span className="text-[10px] font-semibold text-white/90 text-center leading-tight px-2">
                        Espaço reservado para o patrocinador master da região
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STORY VIEWER OVERLAY */}
      {activeStory && (
        <div className="fixed inset-0 z-[100] bg-black animate-in fade-in zoom-in-95 duration-200 flex flex-col">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-2 pt-3">
             {EXPLORE_STORIES.map((s, i) => (
                 <div key={s.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                     <div 
                        className="h-full bg-white transition-all duration-100 ease-linear"
                        style={{ 
                            width: i === activeStoryIndex ? `${storyProgress}%` : i < activeStoryIndex ? '100%' : '0%' 
                        }}
                     />
                 </div>
             ))}
          </div>

          {/* Header Controls */}
          <div className="absolute top-6 left-0 right-0 z-20 px-4 py-2 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-white/50">
                      <img src={activeStory.logo} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-white drop-shadow-md">
                      <p className="font-bold text-sm leading-tight">{activeStory.merchantName}</p>
                      <p className="text-[10px] opacity-80">Patrocinado</p>
                  </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                </button>
                <button 
                  onClick={() => setActiveStoryIndex(null)} 
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="w-6 h-6 text-white drop-shadow-md" />
                </button>
              </div>
          </div>

          {/* Main Video Content */}
          <div className="flex-1 relative bg-gray-900 flex items-center justify-center">
             <video 
                ref={videoRef}
                src={activeStory.videoUrl} 
                className="w-full h-full object-cover" 
                autoPlay 
                muted={isMuted}
                loop 
                playsInline
             />
             
             {/* Gradient Overlay Bottom */}
             <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>

             {/* Tap Zones */}
             <div className="absolute inset-y-0 left-0 w-1/3 z-10" onClick={handlePrevStory}></div>
             <div className="absolute inset-y-0 right-0 w-1/3 z-10" onClick={handleNextStory}></div>
          </div>

          {/* Footer CTA */}
          <div className="absolute bottom-6 left-0 right-0 px-6 z-20 flex justify-center">
             <button className="bg-white text-black font-bold py-3 px-6 rounded-full shadow-lg active:scale-95 transition-transform flex items-center gap-2">
               Ver Oferta <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      )}
    </>
  );
};