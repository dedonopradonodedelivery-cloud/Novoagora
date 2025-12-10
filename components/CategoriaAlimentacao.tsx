
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronLeft, Search, ImageIcon, Star, BadgeCheck, ChevronRight, X, AlertCircle } from 'lucide-react';
import { SUBCATEGORIES } from '../constants';
import { Store, AdType } from '../types';

// --- Type Definition for Banner Ads ---
interface BannerAd {
  id: string;
  image: string;
  title: string;
  link?: string;
  merchantName?: string; // If present, the "Patrocinado" tag appears
}

// --- Reusable Components ---

/**
 * A single banner card for the highlights carousel.
 * Includes a hover effect and a conditional "Patrocinado" tag.
 */
const HighlightBanner: React.FC<{ banner: BannerAd; onClick: (id: string) => void; }> = ({ banner, onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      onClick={() => onClick(banner.id)}
      className="snap-center flex-shrink-0 w-full h-[180px] rounded-[20px] shadow-lg shadow-black/5 overflow-hidden relative group cursor-pointer"
    >
      {imageError ? (
        <div className="w-full h-full bg-[#F2F2F2] dark:bg-gray-700 flex items-center justify-center">
          <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
        </div>
      ) : (
        <img 
          src={banner.image} 
          alt={banner.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" 
          onError={() => setImageError(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-4">
        <p className="text-white font-bold text-lg drop-shadow-md">{banner.title}</p>
      </div>
      {banner.merchantName && (
        <div className="absolute top-3 right-3 flex flex-col items-end">
          <div className="bg-[#EAF0FF]/85 text-[#1E5BFF] text-[10px] font-bold px-2 py-1 rounded-xl backdrop-blur-sm shadow-sm border border-black/10 tracking-tight">
            Patrocinado
          </div>
          <p className="text-white text-[11px] font-semibold drop-shadow-sm transform -translate-y-3">
            {banner.merchantName}
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * Modular carousel component for sponsored banners.
 */
const SponsoredCarousel: React.FC<{ 
  banners: BannerAd[]; 
  onView?: (id: string) => void; 
  onClick?: (id: string) => void;
}> = ({ banners, onView = (id: string) => {}, onClick = (id: string) => {} }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll effect
    useEffect(() => {
        const interval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % banners.length;
            if (scrollRef.current) {
                const scrollWidth = scrollRef.current.scrollWidth;
                const childrenCount = banners.length;
                if (childrenCount > 0) {
                    const targetScroll = (scrollWidth / childrenCount) * nextSlide;
                    scrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
                }
            }
        }, 5000); // Change every 5 seconds
        return () => clearInterval(interval);
    }, [currentSlide, banners.length]);

    // Update current slide index based on user scroll
    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            if (clientWidth > 0) {
              const index = Math.round(scrollLeft / clientWidth);
              if (index !== currentSlide) {
                  setCurrentSlide(index);
                  onView(banners[index].id); // Future metric call
              }
            }
        }
    };
    
    // Future metric call for initial view
    useEffect(() => {
        if (banners.length > 0) {
            onView(banners[0].id);
        }
    }, [banners, onView]);

    return (
        <div className="relative">
            <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar"
            >
                {banners.map((banner) => (
                    <HighlightBanner key={banner.id} banner={banner} onClick={onClick} />
                ))}
            </div>
            
            {/* Carousel Dots */}
            <div className="flex justify-center items-center gap-2 mt-4">
                {banners.map((_, index) => (
                    <div 
                        key={index} 
                        className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentSlide ? 'w-4 bg-gradient-to-r from-[#1E5BFF] to-[#4D7CFF]' : 'w-2 bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};


/**
 * A clickable card for the subcategories grid.
 */
const SubcategoryCard: React.FC<{ icon: React.ReactNode; name: string; onClick: () => void; }> = ({ icon, name, onClick }) => (
    <button 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-black/5 px-3 py-6 flex flex-col items-center justify-center cursor-pointer active:scale-95 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/10 transition-all duration-150 ease-out border border-gray-100 dark:border-gray-700 group">
        <div className="w-[100px] h-[100px] bg-gradient-to-br from-[#1E5BFF]/20 to-[#4D7CFF]/20 rounded-full mb-2.5 flex items-center justify-center transition-colors group-hover:from-[#1E5BFF]/25 group-hover:to-[#4D7CFF]/25">
            {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-10 h-10 text-primary-600 dark:text-primary-400"})}
        </div>
        <p className="text-sm font-semibold text-[#1A1A1A] dark:text-gray-200 text-center">{name}</p>
    </button>
);


// --- Static Data ---

const HIGHLIGHTS_DATA: BannerAd[] = [
  {
    id: 'ad-1',
    title: 'Ofertas em restaurantes',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format=fit=crop',
    merchantName: 'Restaurante Saboroso',
  },
  {
    id: 'ad-2',
    title: 'Padarias da Freguesia',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format=fit=crop',
    merchantName: 'Pão Dourado',
  },
  {
    id: 'ad-3',
    title: 'Experimente os melhores burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format=fit=crop', // Fixed broken link with generic burger
  },
];

// --- Fisher-Yates shuffle algorithm ---
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- DATA GENERATION FOR STORE LIST (FAKE) ---
const generateFoodStores = (): Store[] => {
  const subcats = ['Restaurante', 'Lanchonete', 'Pizzaria', 'Hambúrgueria', 'Japonês', 'Doceria'];
  const names = ['Sabor da Freguesia', 'Cantinho do Chef', 'Pizza & Cia', 'Burger King Freguesia', 'Sushi House', 'Delícias da Vovó', 'Churrascaria Orelha', 'Padaria Imperial', 'Açaí do Bairro', 'Bistrô Paris'];
  
  return Array.from({ length: 20 }, (_, i) => {
    const isPremium = i < 5; // Top 5 Sponsored
    const hasCashback = !isPremium && i % 2 === 0; // Alternating cashback for others

    return {
      id: `food-store-${i}`,
      name: `${names[i % names.length]} ${i + 1}`,
      category: 'Alimentação',
      subcategory: subcats[i % subcats.length],
      image: `https://picsum.photos/400/300?random=${i + 600}`,
      rating: Number((3.8 + Math.random() * 1.2).toFixed(1)),
      reviewsCount: Math.floor(Math.random() * 300) + 20,
      description: 'Delícias preparadas com carinho para você.',
      distance: `${(0.5 + Math.random() * 3).toFixed(1)}km`,
      adType: isPremium ? AdType.PREMIUM : AdType.ORGANIC,
      isSponsored: isPremium,
      verified: i % 3 === 0,
      cashback: hasCashback ? (Math.floor(Math.random() * 5) + 3) : undefined,
      address: 'Estrada dos Três Rios, 000',
    };
  });
};

const sortFoodStores = (stores: Store[]) => {
  return stores.sort((a, b) => {
    // 1. Sponsored / Premium
    const aSponsored = a.isSponsored || a.adType === AdType.PREMIUM;
    const bSponsored = b.isSponsored || b.adType === AdType.PREMIUM;
    if (aSponsored && !bSponsored) return -1;
    if (!aSponsored && bSponsored) return 1;

    // 2. Cashback
    const aCashback = !!a.cashback;
    const bCashback = !!b.cashback;
    if (aCashback && !bCashback) return -1;
    if (!aCashback && bCashback) return 1;

    // 3. Normal
    return 0;
  });
};


// --- Main Component ---

interface CategoriaAlimentacaoProps {
  onBack: () => void;
  onSelectSubcategory: (subcategoryName: string) => void;
}

export const CategoriaAlimentacao: React.FC<CategoriaAlimentacaoProps> = ({ onBack, onSelectSubcategory }) => {
    const subcategories = SUBCATEGORIES['Alimentação'] || [];
    
    // Search State
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Stores Data
    const allStores = useMemo(() => sortFoodStores(generateFoodStores()), []);
    
    // Shuffle banners on initial render
    const shuffledBanners = useMemo(() => shuffleArray(HIGHLIGHTS_DATA), []);

    // Placeholder functions for future metrics
    const handleBannerView = (id: string) => {
        // console.log(`[Metric] Banner Viewed: ${id}`);
    };
    const handleBannerClick = (id: string) => {
        // console.log(`[Metric] Banner Clicked: ${id}`);
    };

    // Filter Stores based on Search
    const displayedStores = useMemo(() => {
        if (!searchQuery) return allStores;
        return allStores.filter(store => 
            store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            store.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [allStores, searchQuery]);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) setSearchQuery(''); // Clear when closing
    };

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-gray-950 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full max-w-md mx-auto h-16 bg-white dark:bg-gray-900 shadow-md z-20 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-800 transition-all">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        </button>
        
        {isSearchOpen ? (
            <div className="flex-1 mx-2 relative animate-in fade-in zoom-in-95 duration-200">
                <input 
                    type="text" 
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar restaurantes..."
                    className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-2 px-4 text-sm focus:ring-2 focus:ring-primary-500 shadow-inner dark:text-white"
                />
            </div>
        ) : (
            <h1 className="text-lg font-semibold text-[#1A1A1A] dark:text-white">
            Alimentação
            </h1>
        )}

        <button 
            onClick={toggleSearch} 
            className="p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isSearchOpen ? (
              <X className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          ) : (
              <Search className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          )}
        </button>
      </header>

      {/* Scrollable Content */}
      <main className="pt-16 overflow-y-auto">
        <div className="p-4 pt-6 space-y-6 pb-24">
          
          {/* Sponsored Carousel Section (Only show if not searching) */}
          {!isSearchOpen && (
              <section>
                <h2 className="text-sm font-semibold text-[#1A1A1A] dark:text-gray-300 mb-3 px-1">
                  Destaques da Freguesia
                </h2>
                <SponsoredCarousel 
                  banners={shuffledBanners}
                  onView={handleBannerView}
                  onClick={handleBannerClick}
                />
              </section>
          )}

          {/* Subcategories Section (Only show if not searching) */}
          {!isSearchOpen && (
              <section className="pt-2">
                <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-white mb-4 px-1">
                  Subcategorias
                </h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                  {subcategories.map((sub, i) => (
                      <SubcategoryCard 
                        key={i} 
                        icon={sub.icon}
                        name={sub.name}
                        onClick={() => onSelectSubcategory(sub.name)}
                      />
                  ))}
                </div>
              </section>
          )}

          {/* Store List Section (Restored) */}
          <section className="pt-4">
             <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-[18px] font-semibold text-gray-800 dark:text-white leading-none">
                    {isSearchOpen ? (searchQuery ? `Resultados: "${searchQuery}"` : 'Busque algo...') : 'Todos os Locais'}
                </h2>
                <span className="text-[10px] text-gray-400 font-medium">
                    {displayedStores.length} locais
                </span>
             </div>

             <div className="flex flex-col gap-3">
                {displayedStores.map((store) => {
                    const isSponsored = store.isSponsored || store.adType === AdType.PREMIUM;
                    return (
                        <div
                            key={store.id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-2 flex gap-3 cursor-pointer active:bg-gray-50 dark:active:bg-gray-700/50 transition-colors h-[88px]"
                        >
                            {/* Imagem Esquerda */}
                            <div className="w-[88px] h-[72px] flex-shrink-0 relative rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                                <img 
                                    src={store.image} 
                                    alt={store.name} 
                                    className="w-full h-full object-cover" 
                                    loading="lazy"
                                />
                                {store.cashback && (
                                   <div className="absolute bottom-1 left-1 bg-[#2ECC71] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-sm z-10 leading-none">
                                     {store.cashback}% VOLTA
                                   </div>
                                )}
                            </div>

                            {/* Conteúdo Direita */}
                            <div className="flex-1 flex flex-col justify-center min-w-0 py-0.5">
                                <div className="flex justify-between items-start gap-2">
                                     <div className="flex items-center gap-1.5 min-w-0">
                                       <h4 className="font-bold text-gray-800 dark:text-white text-[13px] leading-tight truncate">
                                          {store.name}
                                       </h4>
                                       {store.verified && (
                                         <BadgeCheck className="w-3.5 h-3.5 text-blue-500 fill-white flex-shrink-0" />
                                       )}
                                     </div>
                                     
                                     {isSponsored && (
                                         <span className="flex-shrink-0 text-[9px] font-bold bg-[#EAF0FF] text-[#1E5BFF] px-1.5 py-0.5 rounded shadow-sm leading-none">
                                             PATROCINADO
                                         </span>
                                     )}
                                </div>

                                <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mt-1.5">
                                     <div className="flex items-center gap-0.5 text-[#1E5BFF] font-bold">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span>{store.rating}</span>
                                     </div>
                                     <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                                     <span className="truncate">{store.subcategory}</span>
                                     <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                                     <span>{store.distance}</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-center pr-1 text-gray-300">
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    );
                })}

                {displayedStores.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                            <AlertCircle className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 font-medium text-sm">Nenhum local encontrado.</p>
                    </div>
                )}
             </div>
          </section>

        </div>
      </main>
    </div>
  );
};
