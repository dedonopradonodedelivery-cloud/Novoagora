import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
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
} from "lucide-react";
import { useUserLocation } from "../hooks/useUserLocation";
import useMediaQuery from "../hooks/useMediaQuery";
import { quickFilters } from "../constants";

type ExploreViewProps = {
  stores: Store[];

  // Compatibilidade com o código antigo (App.tsx)
  searchTerm?: string;
  onSelectCategory?: (category: any) => void;
  onNavigate?: Dispatch<SetStateAction<string>>;
  onViewAllVerified?: () => void;

  // Versão nova do componente
  searchQuery?: string;
  onStoreClick: (store: Store) => void;
  onLocationClick?: () => void;
  onFilterClick?: () => void;
  onOpenPlans?: () => void;
};

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
    {icon && (
      <span className="w-3.5 h-3.5 flex items-center justify-center">
        {icon}
      </span>
    )}
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
                src={
                  (store as any).coverImage ||
                  (store as any).imageUrl ||
                  (store as any).image ||
                  (store as any).logo ||
                  ""
                }
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
                    {store.rating && store.rating > 0
                      ? store.rating.toFixed(1)
                      : "Novo"}
                  </span>
                  {typeof (store as any).reviewsCount === "number" && (
                    <span className="text-[10px] text-white/70">
                      ({(store as any).reviewsCount})
                    </span>
                  )}
                </div>

                {/* Distância / tempo */}
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm">
                  <MapPin className="w-3 h-3 text-white/90" />
                  <span className="text-[10px] text-white/90">
                    {(store as any).distanceText ||
                      (store as any).distance ||
                      "Perto de você"}
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

                  {(store as any).cashbackPercentage &&
                    (store as any).cashbackPercentage > 0 && (
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

// 🔹 Export named + default
export const ExploreView: React.FC<ExploreViewProps> = (props) => {
  const {
    stores,
    searchQuery,
    searchTerm,

    onStoreClick,
    onLocationClick,
    onFilterClick,
    onOpenPlans,
  } = props;

  const { location, isLoading: isLoadingLocation } = useUserLocation();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<
    "nearby" | "topRated" | "cashback"
  >("nearby");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const effectiveSearch = (searchQuery ?? searchTerm ?? "").toLowerCase();

  // Label de localização sem quebrar o tipo
  const locationLabel = useMemo(() => {
    if (isLoadingLocation) {
      return "Detectando localização...";
    }
    const locAny = location as any;
    return (
      locAny?.address?.neighborhood ||
      locAny?.neighborhood ||
      "Freguesia e região"
    );
  }, [location, isLoadingLocation]);

  const nearbyStores = useMemo(() => {
    if (!stores.length) return [];

    let filtered = [...stores];

    if (selectedFilter === "cashback") {
      filtered = filtered.filter(
        (store) =>
          (store as any).cashbackPercentage &&
          (store as any).cashbackPercentage > 0
      );
    } else if (selectedFilter === "open_now") {
      filtered = filtered.filter(
        (store) => (store as any).status === "Aberto agora"
      );
    }

    if (effectiveSearch) {
      filtered = filtered.filter((store) => {
        const tagsArray = (store as any).tags as string[] | undefined;
        return (
          store.name.toLowerCase().includes(effectiveSearch) ||
          store.category?.toLowerCase().includes(effectiveSearch) ||
          store.description?.toLowerCase().includes(effectiveSearch) ||
          tagsArray?.some((tag) =>
            tag.toLowerCase().includes(effectiveSearch)
          )
        );
      });
    }

    if (location) {
      return filtered.sort((a, b) => {
        const distanceA = (a as any).distance ?? Infinity;
        const distanceB = (b as any).distance ?? Infinity;
        return typeof distanceA === "number" && typeof distanceB === "number"
          ? distanceA - distanceB
          : 0;
      });
    }

    return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [stores, effectiveSearch, selectedFilter, location]);

  const cashbackStores = useMemo(
    () =>
      stores.filter(
        (store) =>
          (store as any).cashbackPercentage &&
          (store as any).cashbackPercentage > 0
      ),
    [stores]
  );

  const topRatedStores = useMemo(
    () => stores.filter((store) => (store.rating || 0) >= 4.5),
    [stores]
  );

  const trendingStores = useMemo(
    () =>
      stores.filter(
        (store) =>
          (store as any).tags?.includes("Trending") ||
          (store as any).tags?.includes("Popular")
      ),
    [stores]
  );

  const modernStores = useMemo(
    () =>
      stores.filter(
        (store) =>
          (store as any).tags?.includes("Moderno") ||
          (store as any).tags?.includes("Conceito")
      ),
    [stores]
  );

  const classicStores = useMemo(
    () =>
      stores.filter(
        (store) =>
          (store as any).tags?.includes("Clássico") ||
          (store as any).tags?.includes("Tradicional")
      ),
    [stores]
  );

  const familyStores = useMemo(
    () =>
      stores.filter(
        (store) =>
          (store as any).tags?.includes("Família") ||
          (store as any).tags?.includes("Kids") ||
          (store as any).tags?.includes("Para família")
      ),
    [stores]
  );

  const romanticStores = useMemo(
    () =>
      stores.filter(
        (store) =>
          (store as any).tags?.includes("Romântico") ||
          (store as any).tags?.includes("Casal") ||
          (store as any).tags?.includes("Encontro")
      ),
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
        .filter(
          (store) =>
            (store as any).cashbackPercentage &&
            (store as any).cashbackPercentage > 0
        )
        .sort(
          (a, b) =>
            ((b as any).cashbackPercentage || 0) -
            ((a as any).cashbackPercentage || 0)
        );
    } else if (sortOption === "topRated") {
      list = list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortOption === "nearby" && location) {
      list = list.sort((a, b) => {
        const distanceA = (a as any).distance ?? Infinity;
        const distanceB = (b as any).distance ?? Infinity;
        return typeof distanceA === "number" && typeof distanceB === "number"
          ? distanceA - distanceB
          : 0;
      });
    }

    if (selectedStyle) {
      list = list.filter((store) =>
        (store as any).tags?.some((tag: string) =>
          tag.toLowerCase().includes(selectedStyle.toLowerCase())
        )
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

  return (
    <>
      {/* Header com localização */}
      <div className="px-4 pt-3 pb-1 flex items-center justify-between gap-3">
        <button
          onClick={onLocationClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-900 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          <MapPin className="w-3.5 h-3.5 text-orange-500" />
          <span className="font-medium">{locationLabel}</span>
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
        {/* ... (resto do JSX igual ao que você já tinha, não alterei) ... */}
        {/* Vou omitir aqui para não estourar, mas é idêntico ao seu bloco original
            de "Achados pela Freguesia", seções, estilos, sponsor banner etc. */}
      </div>
    </>
  );
};

export default ExploreView;
