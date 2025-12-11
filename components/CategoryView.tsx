import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronLeft, Search, Star, BadgeCheck, ChevronRight, X, AlertCircle, Check } from 'lucide-react';
import { Category, Store, AdType } from '../types';
import { SUBCATEGORIES } from '../constants';

interface CategoryViewProps {
  category: Category;
  onBack: () => void;
  onStoreClick: (store: Store) => void;
  stores: Store[];
}

const CARD_GRADIENTS = [
  "bg-gradient-to-br from-[#1E5BFF] to-[#4D7CFF]", 
  "bg-gradient-to-br from-red-500 to-rose-600",     
  "bg-gradient-to-br from-purple-500 to-indigo-600", 
  "bg-gradient-to-br from-emerald-500 to-teal-600",  
  "bg-gradient-to-br from-blue-500 to-cyan-600",     
  "bg-gradient-to-br from-pink-500 to-fuchsia-600",  
];

const FALLBACK_ADS = [
  'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=800&auto=format&fit=crop', 
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop', 
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop', 
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop', 
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop', 
];

const generateSubcategoryStores = (subName: string, categoryName: string): Store[] => {
  return Array.from({ length: 20 }).map((_, i) => {
    const isSponsored = i < 5;
    const hasCashback = !isSponsored && i < 10;
    
    let name = '';
    const suffixes = ['Prime', 'Center', 'Vida', 'Saúde', 'Mais', 'Vip', 'Premium', 'Special', 'Master', 'Excellence'];
    const suffix = suffixes[i % suffixes.length];
    
    const lowerSub = subName.toLowerCase();
    
    if (lowerSub.includes('clínica') || lowerSub.includes('médic')) {
        const prefixes = ['Clínica Médica', 'Centro Médico', 'Consultório', 'Instituto de Saúde'];
        name = `${prefixes[i % prefixes.length]} ${suffix}`;
    } else if (lowerSub.includes('dentista') || lowerSub.includes('odonto')) {
        const prefixes = ['Odonto', 'Clínica Dentária', 'Sorriso', 'Dental'];
        name = `${prefixes[i % prefixes.length]} ${suffix}`;
    } else if (lowerSub.includes('psicó')) {
        const prefixes = ['Espaço Psi', 'Clínica de Psicologia', 'Mente Sã', 'Instituto Psi'];
        name = `${prefixes[i % prefixes.length]} ${suffix}`;
    } else if (lowerSub.includes('fisiotera')) {
        const prefixes = ['Fisio', 'Reabilitação', 'Movimento', 'Fisioterapia'];
        name = `${prefixes[i % prefixes.length]} ${suffix}`;
    } else if (lowerSub.includes('nutri')) {
        const prefixes = ['Nutri', 'Vida Saudável', 'Nutrição', 'Espaço Nutri'];
        name = `${prefixes[i % prefixes.length]} ${suffix}`;
    } else if (lowerSub.includes('pilates')) {
        const prefixes = ['Studio Pilates', 'Espaço Pilates', 'Corpo & Mente', 'Pilates'];
        name = `${prefixes[i % prefixes.length]} ${suffix}`;
    } else if (lowerSub.includes('laboratório')) {
        const prefixes = ['Laboratório', 'Lab', 'Centro de Diagnósticos', 'Análises'];
        name = `${prefixes[i % prefixes.length]} ${suffix}`;
    } else if (lowerSub.includes('quiro')) {
        const prefixes = ['Quiropraxia', 'Coluna Vertebral', 'Ajuste', 'Quiro'];
        name = `${prefixes[i % prefixes.length]} ${suffix}`;
    } else if (lowerSub.includes('advogad')) {
        const prefixes = ['Advocacia', 'Escritório', 'Consultoria Jurídica', 'Advogados'];
        name = `${prefixes[i % prefixes.length]} ${suffix}`;
    } else if (lowerSub.includes('contad')) {
        const prefixes = ['Contabilidade', 'Assessoria Contábil', 'Fiscal', 'Contadores'];
        name = `${prefixes[i % prefixes.length]} ${suffix}`;
    } else if (lowerSub.includes('beleza') || lowerSub.includes('salão')) {
        const prefixes = ['Studio Beauty', 'Salão', 'Espaço da Beleza', 'Coiffure'];
        name = `${prefixes[i % prefixes.length]} ${suffix}`;
    } else {
        name = `${subName} ${suffix}`;
    }
    
    if (i > 10) name += ` ${i}`;

    return {
      id: `fake-${categoryName}-${subName}-${i}`,
      name: name,
      category: categoryName,
      subcategory: subName,
      logoUrl: '/assets/default-logo.png', 
      rating: Number((4.0 + Math.random()).toFixed(1)),
      reviewsCount: Math.floor(Math.random() * 200) + 15,
      description: `Especialistas em ${subName} na Freguesia. Agende sua visita.`,
      distance: `${(0.5 + Math.random() * 3).toFixed(1)}km`,
      adType: isSponsored ? AdType.PREMIUM : AdType.ORGANIC,
      isSponsored: isSponsored,
      verified: isSponsored || i % 3 === 0,
      cashback: hasCashback ? Math.floor(Math.random() * 8) + 3 : undefined,
      address: 'Freguesia, Jacarepaguá',
      isOpenNow: i % 2 === 0
    };
  });
};

const sortStoresByHierarchy = (list: Store[]) => {
  return list.sort((a, b) => {
    const aSponsored = a.isSponsored || a.adType === AdType.PREMIUM;
    const bSponsored = b.isSponsored || b.adType === AdType.PREMIUM;

    if (aSponsored && !bSponsored) return -1;
    if (!aSponsored && bSponsored) return 1;

    const aCashback = !!a.cashback;
    const bCashback = !!b.cashback;

    if (aCashback && !bCashback) return -1;
    if (!aCashback && bCashback) return 1;

    return 0;
  });
};

export const CategoryView: React.FC<CategoryViewProps> = ({ category, onBack, onStoreClick, stores }) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const listRef = useRef<HTMLDivElement>(null);

  const subcategories = SUBCATEGORIES[category.name] || SUBCATEGORIES['default'];

  const bannerImages = useMemo(() => {
    return FALLBACK_ADS.sort(() => Math.random() - 0.5).slice(0, 5); 
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const displayStores = useMemo(() => {
    let baseList: Store[] = [];

    if (selectedSubcategory) {
      baseList = generateSubcategoryStores(selectedSubcategory, category.name);
    } else {
      baseList = stores.filter((store) => {
        const storeCat = store.category.toLowerCase();
        const currentCat = category.name.toLowerCase();
        return storeCat === currentCat || storeCat.includes(currentCat);
      });
      if (baseList.length === 0) {
         baseList = generateSubcategoryStores(category.name, category.name);
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      baseList = baseList.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.subcategory?.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q)
      );
    }

    return sortStoresByHierarchy(baseList);

  }, [selectedSubcategory, category.name, stores, searchQuery]);

  const handleSearchToggle = () => {
    if (isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery('');
    } else {
        setIsSearchOpen(true);
    }
  };

  const handleSubcategoryClick = (subName: string) => {
    const isSelected = selectedSubcategory === subName;
    setSelectedSubcategory(isSelected ? null : subName);
    
    if (!isSelected) {
        setTimeout(() => {
            listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24 animate-in slide-in-from-right duration-300">
      <div className="sticky top-0 z-30 bg-gray-50 dark:bg-gray-900 px-5 py-4 flex items-center justify-between shadow-sm dark:shadow-none border-b border-gray-100 dark:border-gray-800 h-[72px]">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        
        {isSearchOpen ? (
            <div className="flex-1 mx-2 relative animate-in fade-in zoom-in-95 duration-200">
                <input 
                    type="text" 
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Buscar em ${selectedSubcategory || category.name}...`}
                    className="w-full bg-white dark:bg-gray-800 border-none rounded-full py-2 px-4 text-sm focus:ring-2 focus:ring-primary-500 shadow-inner dark:text-white"
                />
            </div>
        ) : (
            <h2 className="text-lg font-bold text-gray-900 dark:text-white font-display">{category.name}</h2>
        )}

        <button 
            onClick={handleSearchToggle}
            className="p-2 -mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          {isSearchOpen ? <X className="w-6 h-6 text-gray-800 dark:text-white" /> : <Search className="w-6 h-6 text-gray-800 dark:text-white" />}
        </button>
      </div>

      <div className="p-5 space-y-8">
        
        {!isSearchOpen && (
            <>
                <div className="w-full aspect-[2/1] rounded-3xl overflow-hidden relative shadow-md bg-gray-200 dark:bg-gray-800 animate-in fade-in duration-500">
                {bannerImages.map((img, index) => (
                    <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBanner ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={img} alt="Destaque" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute top-3 right-3 bg-[#EAF0FF]/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm">
                        <span className="text-[9px] font-bold text-[#1E5BFF] uppercase tracking-wide">Patrocinado</span>
                    </div>
                    </div>
                ))}
                </div>

                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg px-1">Subcategorias</h3>
                    <div className="grid grid-cols-2 gap-3">
                    {subcategories.map((sub, idx) => {
                        const isSelected = selectedSubcategory === sub.name;
                        const gradientClass = CARD_GRADIENTS[idx % CARD_GRADIENTS.length];
                        
                        return (
                            <button 
                                key={idx}
                                onClick={() => handleSubcategoryClick(sub.name)}
                                className={`
                                    relative h-[88px] w-full rounded-2xl overflow-hidden shadow-sm transition-all duration-200 active:scale-95 group text-left p-4 flex items-center
                                    ${isSelected ? 'ring-4 ring-offset-2 ring-primary-500 ring-offset-gray-50 dark:ring-offset-gray-900' : ''}
                                    ${gradientClass}
                                `}
                            >
                                <span className="relative z-10 font-bold text-white text-[15px] leading-tight max-w-[80%] drop-shadow-md">
                                    {sub.name}
                                </span>
                                
                                {isSelected && (
                                    <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md rounded-full p-1 z-20">
                                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                    </div>
                                )}

                                <div className="absolute -right-3 -bottom-4 transform rotate-[-10deg] opacity-30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-0">
                                    {React.isValidElement(sub.icon) 
                                        ? React.cloneElement(sub.icon as React.ReactElement<any>, { className: "w-20 h-20 text-white" })
                                        : sub.icon
                                    }
                                </div>
                            </button>
                        );
                    })}
                    </div>
                </div>
            </>
        )}

        <div ref={listRef} className={isSearchOpen ? "mt-2" : "scroll-mt-24"}>
            <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    {isSearchOpen && searchQuery 
                        ? `Resultados`
                        : selectedSubcategory 
                            ? `Estabelecimentos de ${selectedSubcategory}` 
                            : `Todos os estabelecimentos`
                    }
                </h3>
                <span className="text-xs text-gray-400 font-medium">{displayStores.length} locais</span>
            </div>
            
            <div className="flex flex-col gap-3">
                {displayStores.length > 0 ? (
                    displayStores.map((store) => {
                        const isSponsored = store.isSponsored || store.adType === AdType.PREMIUM;
                        return (
                            <div
                                key={store.id}
                                onClick={() => onStoreClick(store)}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-2 flex gap-3 cursor-pointer active:bg-gray-50 dark:active:bg-gray-700/50 transition-colors h-[88px]"
                            >
                                <div className="w-[88px] h-[72px] flex-shrink-0 relative rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700">
                                    <img 
                                        src={store.logoUrl || "/assets/default-logo.png"} 
                                        alt={store.name} 
                                        className="w-full h-full object-contain" 
                                    />
                                    {store.cashback && (
                                       <div className="absolute bottom-1 left-1 bg-[#2ECC71] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-sm z-10 leading-none">
                                         {store.cashback}% VOLTA
                                       </div>
                                    )}
                                </div>
            
                                <div className="flex-1 flex flex-col justify-center min-w-0 py-0.5">
                                    <div className="flex justify-between items-start gap-2">
                                         <div className="flex items-center gap-1.5 min-w-0">
                                           <h4 className="font-bold text-gray-800 dark:text-white text-[13px] leading-tight truncate">
                                              {store.name}
                                           </h4>
                                           {store.verified && (
                                             <BadgeCheck className="w-4 h-4 text-white fill-[#1E5BFF] flex-shrink-0" />
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
                                         <span className="truncate">{store.subcategory || store.category}</span>
                                         <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                                         <span>{store.distance}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-center pr-1 text-gray-300">
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                            <AlertCircle className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 font-medium text-sm">Nenhum estabelecimento encontrado.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};