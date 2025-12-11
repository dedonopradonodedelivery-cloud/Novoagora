
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
  VolumeX,
  Heart,
  Users
} from "lucide-react";
import { useUserLocation } from "../hooks/useUserLocation";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { quickFilters } from "../constants";
import { MasterSponsorBanner } from "./MasterSponsorBanner";
import { getStoreLogo } from "../utils/mockLogos";

type ExploreViewProps = {
  stores: Store[];
  searchQuery: string;
  onStoreClick: (store: Store) => void;
  onLocationClick: () => void;
  onFilterClick: () => void;
  onOpenPlans: () => void;
  onViewAllVerified?: () => void;
  onViewMasterSponsor?: () => void;
};

// --- MOCK DATA FOR STORIES ---
const EXPLORE_STORIES = [
  { 
    id: 's1', 
    merchantName: 'Padaria Imperial', 
    logo: getStoreLogo(8), 
    videoUrl: 'https://videos.pexels.com/video-files/2942857/2942857-sd_540_960_24fps.mp4', 
    isLive: false 
  },
  { 
    id: 's2', 
    merchantName: 'Fit Studio', 
    logo: getStoreLogo(7), 
    videoUrl: 'https://videos.pexels.com/video-files/4434246/4434246-sd_540_960_25fps.mp4', 
    isLive: false 
  },
  { 
    id: 's3', 
    merchantName: 'Burger King', 
    logo: getStoreLogo(1), 
    videoUrl: 'https://videos.pexels.com/video-files/852395/852395-sd_540_960_30fps.mp4', 
    isLive: true 
  },
  { 
    id: 's4', 
    merchantName: 'Moda Freguesia', 
    logo: getStoreLogo(11), 
    videoUrl: 'https://videos.pexels.com/video-files/6333333/6333333-sd_540_960_30fps.mp4', 
    isLive: false 
  },
  { 
    id: 's5', 
    merchantName: 'Pet Shop Bob', 
    logo: getStoreLogo(5), 
    videoUrl: 'https://videos.pexels.com/video-files/4625753/4625753-sd_540_960_25fps.mp4', 
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
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all whitespace-nowrap flex-shrink-0
      ${
        active
          ? "bg-[#1E5BFF] text-white border-transparent shadow-sm"
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
  onViewAll?: () => void;
};

const HorizontalStoreSection: React.FC<HorizontalStoreSectionProps> = ({
  title,
  subtitle,
  stores,
  onStoreClick,
  onViewAll,
}) => {
  if (!stores.length) return null;

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
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

        {/* Botão Ver mais substitui as setas */}
        <button 
          onClick={onViewAll}
          className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors flex items-center gap-0.5"
        >
          Ver mais
        </button>
      </div>

      <div
        className="horizontal-scroll flex gap-3 overflow-x-auto pb-1 no-scrollbar -mx-0.5 px-0.5"
      >
        {stores.map((store) => (
          <button
            key={store.id}
            onClick={() => onStoreClick(store)}
            className="min-w-[250px] max-w-[260px] bg-white dark:bg-gray-900 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.45)] border border-gray-100 dark:border-gray-800 overflow-hidden group text-left hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="relative h-24 bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <img
                src={(store as any).coverImage || store.image || (store as any).imageUrl}
                alt={store.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
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

                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm">
                  <MapPin className="w-3 h-3 text-white/90" />
                  <span className="text-[10px] text-white/90">
                    {(store as any).distanceText || store.distance || "Perto de você"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="min-w-0 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-gray-100 dark:border-gray-700 overflow-hidden flex-shrink-0">
                    {/* Using new Logo Logic */}
                    <img src={store.logoUrl || getStoreLogo(store.name.length)} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white truncate max-w-[140px]">
                        {store.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-[140px]">
                        {(store as any).categoryName || store.category || "Categoria"}
                    </p>
                  </div>
                </div>

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
    </section>
  );
};

export const ExploreView: React.FC<ExploreViewProps> = ({
  stores,
  searchQuery,
  onStoreClick,
  onLocationClick,
  onFilterClick,
  onOpenPlans,
  onViewAllVerified,
  onViewMasterSponsor,
}) => {
  const { location, isLoading: isLoadingLocation } = useUserLocation();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<"nearby" | "topRated" | "cashback" | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  
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

  const activeStory = activeStoryIndex !== null ? EXPLORE_STORIES[activeStoryIndex] : null;

  useEffect(() => {
    let interval: any;
    if (activeStoryIndex !== null) {
      setStoryProgress(0);
      const duration = 15000; 
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
      setActiveStoryIndex(null); 
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
      <div className="px-4 py-4 space-y-6">
        
        {/* Stories Section */}
        <section className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Stories da Freguesia
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4">
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

        {hasAnyStore ? (
          <React.Fragment>
            <HorizontalStoreSection
              title="Lojas perto de você"
              subtitle="Sugestões na Freguesia e arredores"
              stores={nearbyStores}
              onStoreClick={onStoreClick}
              onViewAll={onFilterClick}
            />

            <HorizontalStoreSection
              title="Pra você"
              subtitle="Selecionadas pelo seu estilo e avaliações"
              stores={sortedStores}
              onStoreClick={onStoreClick}
              onViewAll={onFilterClick}
            />

            {cashbackStores.length > 0 && (
              <HorizontalStoreSection
                title="Com cashback"
                subtitle="Ganhe parte do valor de volta nas suas compras"
                stores={cashbackStores}
                onStoreClick={onStoreClick}
                onViewAll={() => handleFilterClick("cashback")}
              />
            )}

            <HorizontalStoreSection
              title="Tendências na Freguesia"
              subtitle="Lugares que estão chamando atenção por aqui"
              stores={trendingStores}
              onStoreClick={onStoreClick}
              onViewAll={onFilterClick}
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

        {/* SECTION REPLACED: STYLE FILTER CHIPS */}
        <section className="mt-6 mb-2">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Descubra seu estilo na Freguesia
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
            <CategoryChip
              label="Romântico"
              active={selectedStyle === "Romântico"}
              icon={<Heart className={`w-3 h-3 ${selectedStyle === "Romântico" ? "text-white" : "text-pink-500"}`} />}
              onClick={() => setSelectedStyle(selectedStyle === "Romântico" ? null : "Romântico")}
            />
            <CategoryChip
              label="Família"
              active={selectedStyle === "Família"}
              icon={<Users className={`w-3 h-3 ${selectedStyle === "Família" ? "text-white" : "text-emerald-500"}`} />}
              onClick={() => setSelectedStyle(selectedStyle === "Família" ? null : "Família")}
            />
            <CategoryChip
              label="Moderno"
              active={selectedStyle === "Moderno"}
              icon={<Zap className={`w-3 h-3 ${selectedStyle === "Moderno" ? "text-white" : "text-violet-500"}`} />}
              onClick={() => setSelectedStyle(selectedStyle === "Moderno" ? null : "Moderno")}
            />
            <CategoryChip
              label="Clássico"
              active={selectedStyle === "Clássico"}
              icon={<Star className={`w-3 h-3 ${selectedStyle === "Clássico" ? "text-white" : "text-amber-500"}`} />}
              onClick={() => setSelectedStyle(selectedStyle === "Clássico" ? null : "Clássico")}
            />
          </div>
        </section>

        {/* --- ADDED MASTER SPONSOR BANNER --- */}
        <section className="mt-6 mb-8">
           <MasterSponsorBanner onClick={onViewMasterSponsor} />
        </section>

      </div>

      {activeStory && (
        <div className="fixed inset-0 z-[100] bg-black animate-in fade-in zoom-in-95 duration-200 flex flex-col">
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

          <div className="absolute top-6 left-0 right-0 z-20 px-4 py-2 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-white/50 bg-gray-50">
                      <img src={activeStory.logo} alt="" className="w-full h-full object-contain" />
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
             
             <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>

             <div className="absolute inset-y-0 left-0 w-1/3 z-10" onClick={handlePrevStory}></div>
             <div className="absolute inset-y-0 right-0 w-1/3 z-10" onClick={handleNextStory}></div>
          </div>

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
