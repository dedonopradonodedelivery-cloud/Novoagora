
import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES } from '../constants';
import { AdType, Category, Store } from '../types';
import { 
  ChevronRight, 
  Coins, 
  Wrench,
  Store as StoreIcon,
  Users,
  Scissors,
  Dog,
  Utensils,
  Sparkles,
  Crown,
  Loader2,
  AlertCircle,
  Dices,
  X
} from 'lucide-react';
import { QuoteRequestModal } from './QuoteRequestModal';
import { EditorialCollection } from './EditorialListView';
import { supabase } from '../lib/supabase';
import { LojasEServicosList } from './LojasEServicosList';
import { User } from 'firebase/auth';
import { SpinWheelView } from './SpinWheelView';

interface HomeFeedProps {
  onNavigate: (view: string) => void;
  onSelectCategory: (category: Category) => void;
  onSelectCollection: (collection: EditorialCollection) => void;
  onStoreClick?: (store: Store) => void;
  searchTerm?: string;
  stores: Store[];
  user: User | null;
  userRole?: 'cliente' | 'lojista' | null;
  onSpinWin: (reward: any) => void;
  onRequireLogin: () => void;
}

const TOP_SEARCHED = [
  { id: 1, title: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop", icon: <Utensils className="w-4 h-4 text-white" /> },
  { id: 3, title: "Salão de beleza", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=400&auto=format&fit=crop", icon: <Scissors className="w-4 h-4 text-white" /> },
  { id: 4, title: "Veterinário", image: "https://images.unsplash.com/photo-1553688738-a278b9f063e0?q=80&w=400&auto=format&fit=crop", icon: <Dog className="w-4 h-4 text-white" /> },
  { id: 5, title: "Mecânica", image: "https://images.unsplash.com/photo-1530046339160-ce3e41600f2e?q=80&w=400&auto=format&fit=crop", icon: <Wrench className="w-4 h-4 text-white" /> }
];

const EDITORIAL_THEMES: EditorialCollection[] = [
  { id: 'coffee', title: 'Melhores cafés', subtitle: 'Para começar o dia bem', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop', keywords: ['café', 'padaria', 'confeitaria', 'bistrô'] },
  { id: 'barber', title: 'Corte de confiança', subtitle: 'Barbearias bem avaliadas', image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=600&auto=format&fit=crop', keywords: ['barbearia', 'cabeleireiro', 'salão', 'cortes'] },
  { id: 'sweets', title: 'Docerias Amadas', subtitle: 'Adoce seu dia na Freguesia', image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&w=600&auto=format&fit=crop', keywords: ['doce', 'bolo', 'torta', 'sorvete', 'açaí'] },
  { id: 'top-rated', title: 'Os Top Avaliados', subtitle: 'Favoritos do bairro', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop', keywords: [] },
];

// Modal da Roleta (bottom sheet)
const SpinWheelModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  onWin: (reward: any) => void;
  onRequireLogin: () => void;
}> = ({ isOpen, onClose, userId, onWin, onRequireLogin }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-transparent w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 z-50">
           <button 
                onClick={onClose} 
                className="p-2 text-gray-200 hover:text-white bg-black/30 backdrop-blur-sm rounded-full"
                aria-label="Fechar roleta"
            >
              <X className="w-5 h-5" />
            </button>
        </div>
        
        <div className="animate-in slide-in-from-bottom duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <SpinWheelView 
              userId={userId}
              onWin={onWin}
              onRequireLogin={onRequireLogin}
            />
        </div>
      </div>
    </div>
  );
};

export const HomeFeed: React.FC<HomeFeedProps> = ({ 
  onNavigate, 
  onSelectCategory, 
  onSelectCollection,
  onStoreClick, 
  searchTerm: externalSearchTerm,
  stores,
  user,
  userRole,
  onSpinWin,
  onRequireLogin
}) => {
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);
  const activeSearchTerm = externalSearchTerm || '';
  
  const [searchResults, setSearchResults] = useState<Store[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [categoryProgress, setCategoryProgress] = useState(0);

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedQuoteNiche, setSelectedQuoteNiche] = useState('');
  
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (!activeSearchTerm.trim()) {
        setSearchResults([]); setHasSearched(false); setIsSearching(false); return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
        if (!supabase) { setIsSearching(false); return; }
        try {
            const { data, error } = await supabase.from('businesses').select('*')
                .or(`name.ilike.%${activeSearchTerm}%,category.ilike.%${activeSearchTerm}%,subCategory.ilike.%${activeSearchTerm}%,tags.ilike.%${activeSearchTerm}%`)
                .limit(20);
            if (error) throw error;
            const mappedResults: Store[] = (data || []).map((item: any) => ({
                id: item.id, name: item.name, category: item.category, subcategory: item.subCategory,
                image: item.imageUrl || 'https://via.placeholder.com/100', rating: item.rating || 0,
                description: item.description || '', distance: 'Localizado', adType: AdType.ORGANIC, reviewsCount: 0,
            }));
            setSearchResults(mappedResults);
            setHasSearched(true);
        } catch (err) {
            console.error('Error in HomeFeed search:', err); setSearchResults([]);
        } finally { setIsSearching(false); }
    }, 400);

    return () => { if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current); };
  }, [activeSearchTerm]);

  const MINI_BANNERS = [
    { id: 'cashback', title: "Cashback Local", subtitle: "Dinheiro de volta.", icon: <Coins className="w-10 h-10 text-white" />, bgClass: "bg-gradient-to-r from-[#FF6501] to-[#FF9E0B]", action: () => onNavigate(user ? 'cashback' : 'cashback_landing') },
    { id: 'services', title: "Peça um Orçamento", subtitle: "Receba até 5 orçamentos.", icon: <Wrench className="w-10 h-10 text-white" />, bgClass: "bg-gradient-to-r from-blue-600 to-cyan-500", action: () => onNavigate('services') },
    { id: 'connect', title: "Freguesia Connect", subtitle: "Networking empresarial.", icon: <Users className="w-10 h-10 text-white" />, bgClass: "bg-gradient-to-r from-indigo-600 to-purple-600", action: () => onNavigate(!user ? 'freguesia_connect_public' : userRole === 'lojista' ? 'freguesia_connect_dashboard' : 'freguesia_connect_restricted') },
    { id: 'achadinhos', title: "Achados de Hoje", subtitle: "Ofertas especiais.", icon: <Sparkles className="w-10 h-10 text-white" />, bgClass: "bg-gradient-to-r from-pink-500 to-rose-500", action: () => onNavigate('marketplace') }
  ];

  const handleCategoryScroll = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
      if (scrollWidth > clientWidth) setCategoryProgress(scrollLeft / (scrollWidth - clientWidth));
    }
  };

  const handleSpinWheelClick = () => {
    if (user) {
      setIsSpinWheelOpen(true);
    } else {
      onRequireLogin();
    }
  };

  const handleSpinWin = (reward: any) => {
    setIsSpinWheelOpen(false);
    onSpinWin(reward);
  };
  
  return (
    <div className="flex flex-col gap-6 pt-6 pb-20 animate-in fade-in duration-500 bg-gray-50 dark:bg-gray-900">
      
      {activeSearchTerm ? (
        <div className="px-5 mt-2 min-h-[50vh]">
             <div className="flex items-center gap-2 mb-4">
                {isSearching && <Loader2 className="w-5 h-5 animate-spin text-primary-500" />}
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                    {isSearching ? 'Buscando...' : `Resultados para "${activeSearchTerm}"`}
                </h3>
             </div>
             {!isSearching && hasSearched && searchResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4"><AlertCircle className="w-8 h-8 text-gray-400" /></div>
                    <h4 className="text-gray-900 dark:text-white font-bold mb-1">Nenhum resultado encontrado</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">Tente uma categoria ou termo diferente.</p>
                </div>
             ) : (
                <div className="flex flex-col gap-4">
                    {searchResults.map((store, index) => (
                    <div key={`${store.id}-${index}`} onClick={() => onStoreClick && onStoreClick(store)} className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4 hover:shadow-md transition-all cursor-pointer">
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                          <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <h4 className="font-bold text-gray-800 dark:text-white line-clamp-1 text-base">{store.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <span className="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded-md font-medium">{store.category}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 self-center" />
                    </div>
                    ))}
                </div>
             )}
        </div>
      ) : (
        <div className="flex flex-col gap-6 mt-1">
            {/* Faixa Roleta Localizei – estilo 99Food logo abaixo da busca */}
            <div className="px-5">
              <div
                onClick={handleSpinWheelClick}
                className="w-full rounded-2xl bg-white dark:bg-gray-900 border border-orange-100 dark:border-orange-900/40 shadow-sm flex items-center justify-between px-4 py-3 active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF6501] to-[#FF7A00] flex items-center justify-center shadow-md">
                    <Dices className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Roleta Localizei
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      Gire e ganhe prêmios no bairro
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-semibold text-[#FF6501] dark:text-orange-400">
                    Girar agora
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#FF6501] dark:text-orange-400" />
                </div>
              </div>
            </div>

            {/* Categorias rápidas */}
            <div className="w-full">
               <div ref={categoryScrollRef} onScroll={handleCategoryScroll} className="overflow-x-auto px-5 pb-2 no-scrollbar">
                  <div className="grid grid-rows-2 grid-flow-col gap-x-6 gap-y-5 w-max">
                      {CATEGORIES.map((cat) => (
                        <div key={cat.id} onClick={() => onSelectCategory(cat)} className="flex flex-col items-center gap-2 cursor-pointer group active:scale-95 transition-transform w-[72px]">
                            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center group-hover:shadow-md transition-all">
                                {React.isValidElement(cat.icon) ? React.cloneElement(cat.icon as React.ReactElement<any>, { className: "w-7 h-7 text-primary-500" }) : cat.icon}
                            </div>
                            <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 text-center leading-tight w-full">{cat.name}</span>
                        </div>
                      ))}
                  </div>
               </div>
               <div className="flex justify-center w-full mt-2">
                  <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-500 rounded-full" style={{ width: '33%', transform: `translateX(${categoryProgress * 200}%)` }} />
                  </div>
               </div>
            </div>

            {/* Mini banners */}
            <div className="w-full space-y-3">
                 <div className="px-5"><h3 className="text-[18px] font-semibold text-gray-900 dark:text-white">O que você vai encontrar aqui</h3></div>
                 <div className="flex gap-3 overflow-x-auto px-5 pb-4 no-scrollbar snap-x snap-mandatory">
                    {MINI_BANNERS.map((banner) => (
                        <div key={banner.id} onClick={banner.action} className="min-w-[150px] snap-center cursor-pointer active:scale-[0.98] transition-all">
                            <div className={`w-full h-[145px] rounded-[22px] ${banner.bgClass} p-4 flex flex-col justify-between shadow-lg relative overflow-hidden border border-white/5`}>
                              <div className="relative z-10"><h3 className="text-white font-extrabold text-[19px] font-display tracking-tight">{banner.title}</h3></div>
                              <div className="relative z-10 flex items-end justify-between w-full -mb-1">
                                <button className="text-[10px] font-bold text-white/90 uppercase tracking-wide">VER AGORA →</button>
                              </div>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>

            {/* Achadinhos */}
            <div className="pl-5 space-y-3">
                 <div className="flex items-center justify-between pr-5"><h3 className="text-[18px] font-semibold text-gray-900 dark:text-white">Achadinhos da Freguesia</h3></div>
                 <div className="flex gap-4 overflow-x-auto pb-4 pr-5 no-scrollbar">
                    {EDITORIAL_THEMES.map((theme) => (
                       <div key={theme.id} className="min-w-[200px] w-[200px] h-[240px] rounded-[24px] overflow-hidden relative cursor-pointer group active:scale-[0.98] transition-transform shadow-md" onClick={() => onSelectCollection(theme)}>
                          <img src={theme.image} alt={theme.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                             <h4 className="font-bold text-white text-lg font-display">{theme.title}</h4>
                             <p className="text-xs text-gray-200 font-medium">{theme.subtitle}</p>
                          </div>
                       </div>
                    ))}
                 </div>
            </div>

            {/* Top buscados */}
            <div className="pl-5 space-y-3">
               <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white">As lojas mais buscadas</h3>
               <div className="flex gap-4 overflow-x-auto pb-4 pr-5 no-scrollbar">
                  {TOP_SEARCHED.map((item) => (
                    <div key={item.id} className="min-w-[150px] w-[150px] h-[140px] rounded-2xl overflow-hidden relative group cursor-pointer active:scale-95 transition-transform">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex flex-col justify-end">
                            <h4 className="text-white font-bold text-sm line-clamp-3">{item.title}</h4>
                        </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Patrocinador */}
            <div className="px-5 mt-2">
                <div className="w-full h-[72px] bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl flex items-center justify-between px-4 shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-4 z-10">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-yellow-500 uppercase">Patrocinador Master</span>
                        <span className="block text-white font-bold text-base">Grupo Esquematiza</span>
                      </div>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-yellow-500/10 to-transparent"></div>
                </div>
            </div>

            {/* Lista principal */}
            <div className="px-5 pb-4 min-h-[300px]">
                <LojasEServicosList onStoreClick={onStoreClick} />
            </div>
        </div>
      )}

      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        categoryName={selectedQuoteNiche}
        onSuccess={() => onNavigate('service_success')}
      />

      <SpinWheelModal 
        isOpen={isSpinWheelOpen}
        onClose={() => setIsSpinWheelOpen(false)}
        userId={user?.uid || null}
        onWin={handleSpinWin}
        onRequireLogin={onRequireLogin}
      />
    </div>
  );
};
