
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronLeft, Search, Star, Clock, MapPin, BadgeHelp, CheckCircle, XCircle, SlidersHorizontal, Award, Sparkles, TrendingUp, ImageIcon, Heart } from 'lucide-react';
import { Store, AdType } from '../types';
import { getStoreLogo } from '../utils/mockLogos';

interface BannerAd {
  id: string;
  image: string;
  title: string;
  link?: string;
  merchantName?: string;
}

const mockStores: Store[] = [
    { id: 'ms1', name: 'Pizza Place Freguesia', rating: 4.8, reviewsCount: 231, subcategory: 'Restaurantes', distanceKm: 1.2, isOpenNow: true, closingTime: '23:00', isSponsored: true, logoUrl: getStoreLogo(9), adType: AdType.PREMIUM, category: 'Alimentação', distance: '1.2km', description: 'Pizzas artesanais' },
    { id: 'ms2', name: 'Sabor & Cia', rating: 4.6, reviewsCount: 153, subcategory: 'Restaurantes', distanceKm: 0.8, isOpenNow: true, closingTime: '22:00', isSponsored: false, logoUrl: getStoreLogo(1), adType: AdType.ORGANIC, category: 'Alimentação', distance: '0.8km', description: 'Comida caseira' },
    { id: 'ms3', name: 'Cantinho da Massa - O melhor da Itália no seu bairro', rating: 4.9, reviewsCount: 302, subcategory: 'Restaurantes', distanceKm: 2.1, isOpenNow: false, closingTime: '22:00', isSponsored: true, logoUrl: getStoreLogo(2), adType: AdType.PREMIUM, category: 'Alimentação', distance: '2.1km', description: 'Massas frescas' },
    { id: 'ms4', name: 'Bistrô da Freguesia', rating: 4.7, reviewsCount: 87, subcategory: 'Restaurantes', distanceKm: 0.4, isOpenNow: true, closingTime: '22:30', isSponsored: false, logoUrl: getStoreLogo(3), adType: AdType.LOCAL, category: 'Alimentação', distance: '0.4km', description: 'Culinária francesa' },
    { id: 'ms5', name: 'Hamburgueria do Parque', rating: 4.5, reviewsCount: 241, subcategory: 'Restaurantes', distanceKm: 3.5, isOpenNow: false, closingTime: '00:00', isSponsored: false, logoUrl: getStoreLogo(4), adType: AdType.ORGANIC, category: 'Alimentação', distance: '3.5km', description: 'Burgers artesanais' },
];

const HighlightBanner: React.FC<{ banner: BannerAd; onClick: (id: string) => void; }> = ({ banner, onClick }) => (
  <div onClick={() => onClick(banner.id)} className="snap-center flex-shrink-0 w-full h-[160px] rounded-[20px] shadow-lg shadow-black/5 overflow-hidden relative group cursor-pointer">
    <img src={banner.image} alt={banner.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-4">
      <p className="text-white font-bold text-lg drop-shadow-md">{banner.title}</p>
    </div>
    {banner.merchantName && (
      <div className="absolute top-3 right-3 flex flex-col items-end">
        <div className="bg-[#EAF0FF]/85 text-[#1E5BFF] text-[10px] font-bold px-2 py-1 rounded-xl backdrop-blur-sm shadow-sm border border-black/10 tracking-tight">Patrocinado</div>
        <p className="text-white text-[11px] font-semibold drop-shadow-sm transform -translate-y-1">{banner.merchantName}</p>
      </div>
    )}
  </div>
);

const SponsoredCarousel: React.FC<{ banners: BannerAd[]; onView?: (id: string) => void; onClick?: (id: string) => void; }> = ({ banners, onView = () => {}, onClick = () => {} }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % banners.length;
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: scrollRef.current.clientWidth * nextSlide, behavior: 'smooth' });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, banners.length]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
      if (index !== currentSlide) setCurrentSlide(index);
    }
  };

  return (
    <div className="relative">
      <div ref={scrollRef} onScroll={handleScroll} className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar">
        {banners.map(banner => <HighlightBanner key={banner.id} banner={banner} onClick={onClick} />)}
      </div>
      <div className="flex justify-center items-center gap-2 mt-4">
        {banners.map((_, index) => <div key={index} className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-4 bg-gradient-to-r from-[#1E5BFF] to-[#4D7CFF]' : 'w-2 bg-gray-300'}`} />)}
      </div>
    </div>
  );
};

const StoreCard: React.FC<{ store: Store; onClick: (store: Store) => void; }> = ({ store, onClick }) => {
    const [imageError, setImageError] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    
    const handleImageError = () => {
        if (!imageError) {
            setImageError(true);
        }
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavorite(prev => !prev);
    };

    return (
        <div 
            onClick={() => onClick(store)} 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 flex gap-4 p-4 hover:shadow-xl transition-all cursor-pointer relative overflow-hidden active:scale-[0.98]"
        >
            <div className="w-24 h-24 flex-shrink-0 relative bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-600">
                <img 
                    src={store.logoUrl || getStoreLogo(store.name.length)} 
                    alt={store.name} 
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                />
            </div>

            <div className="flex-1 flex flex-col justify-center min-w-0">
                <div className="flex justify-between items-start gap-1 mb-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white text-base line-clamp-2 flex-1">{store.name}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {store.isSponsored && (
                            <span className="text-[11px] font-semibold text-[#1E5BFF] bg-[#EAF0FF] px-1.5 py-0.5 rounded-md">
                                Patrocinado
                            </span>
                        )}
                    </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 my-1">
                    <Star className="w-3.5 h-3.5 text-[#1E5BFF] fill-[#1E5BFF]" />
                    <span className="font-bold text-[#1E5BFF]">{store.rating}</span>
                    <span className="truncate">• {store.reviewsCount} avaliações</span>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">
                    {store.subcategory} • {store.distanceKm} km
                </p>

                <div className="mt-auto flex items-center justify-between">
                    {store.isOpenNow ? (
                        <div className="flex items-center gap-1.5 text-[11px] font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2 py-1 rounded-full w-fit">
                            <CheckCircle className="w-3 h-3" /> Aberto
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 text-[11px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full w-fit">
                            <Clock className="w-3 h-3" /> Fechado
                        </div>
                    )}
                    <button onClick={handleFavoriteClick} className="p-1 -mr-3 text-gray-400 hover:text-[#1E5BFF] transition-transform active:scale-110 duration-150">
                        <Heart className={`w-5 h-5 transition-all ${isFavorite ? 'fill-[#1E5BFF] text-[#1E5BFF]' : 'text-gray-400'}`} />
                    </button>
                </div>
            </div>
        </div>
    );
};

interface SubcategoryStoreListProps {
  subcategoryName: string;
  stores: Store[];
  sponsoredBanners: BannerAd[];
  onBack: () => void;
  onStoreClick: (store: Store) => void;
}

export const SubcategoryStoreList: React.FC<SubcategoryStoreListProps> = ({ subcategoryName, stores, sponsoredBanners, onBack, onStoreClick }) => {
  const [activeFilter, setActiveFilter] = useState('relevance');

  const displayStores = stores.length > 0 ? stores : mockStores;

  const filters = [
    { id: 'relevance', label: 'Relevância', icon: Sparkles },
    { id: 'rating', label: 'Maior Avaliação', icon: Award },
    { id: 'distance', label: 'Mais Próximos', icon: MapPin },
    { id: 'open', label: 'Aberto Agora', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-gray-950 font-sans">
      <header className="fixed top-0 left-0 right-0 w-full max-w-md mx-auto h-16 bg-white dark:bg-gray-900 shadow-sm z-20 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        </button>
        <h1 className="text-lg font-semibold text-[#1A1A1A] dark:text-white">{subcategoryName}</h1>
        <button className="p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Search className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        </button>
      </header>

      <main className="pt-16 overflow-y-auto">
        <div className="p-4 space-y-6 pb-12">
          
          {sponsoredBanners.length > 0 && (
            <section>
              <SponsoredCarousel banners={sponsoredBanners} />
            </section>
          )}

          <section className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
            {filters.map(filter => {
              const isActive = activeFilter === filter.id;
              const Icon = filter.icon;
              return (
                <button 
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                        isActive 
                        ? 'bg-primary-500 text-white border-transparent shadow-md shadow-primary-500/20' 
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50'
                    }`}
                >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    {filter.label}
                </button>
              );
            })}
          </section>

          <section>
            {displayStores.length > 0 ? (
              <div className="grid grid-cols-1 gap-7">
                {displayStores.map(store => (
                  <StoreCard key={store.id} store={store} onClick={onStoreClick} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                    <BadgeHelp className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Nenhuma loja encontrada</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-6 max-w-xs">
                  Ainda não temos lojas cadastradas nesta subcategoria.
                </p>
                <button onClick={onBack} className="bg-primary-500 text-white font-bold text-sm px-6 py-3 rounded-full shadow-md hover:bg-primary-600 transition-colors">
                  Explorar outras categorias
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};
