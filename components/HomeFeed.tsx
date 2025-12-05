// ... keep imports ...
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
  X,
  ArrowRight,
  ThumbsUp,
  Calendar,
  MapPin,
  Filter,
  Percent,
  Star,
  BadgeCheck,
  QrCode,
  Bell
} from 'lucide-react';
import { QuoteRequestModal } from './QuoteRequestModal';
import { EditorialCollection } from './EditorialListView';
import { supabase } from '../lib/supabase';
import { LojasEServicosList } from './LojasEServicosList';
import { User } from 'firebase/auth';
import { SpinWheelView } from './SpinWheelView';
// Removed MasterSponsorBanner import to use inline standardized version

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
  { id: 'coffee', title: 'Melhores Cafés', subtitle: '', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop', keywords: ['café', 'padaria', 'confeitaria', 'bistrô'] },
  { id: 'barber', title: 'Corte de Confiança', subtitle: '', image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=600&auto=format&fit=crop', keywords: ['barbearia', 'cabeleireiro', 'salão', 'cortes'] },
  { id: 'sweets', title: 'Docerias Amadas', subtitle: '', image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&w=600&auto=format&fit=crop', keywords: ['doce', 'bolo', 'torta', 'sorvete', 'açaí'] },
  { id: 'top-rated', title: 'Os Top Avaliados', subtitle: '', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop', keywords: [] },
  { id: 'party', title: 'Festas', subtitle: '', image: 'https://images.unsplash.com/photo-1530103862676-de3c9a59af38?q=80&w=600&auto=format&fit=crop', keywords: ['festa', 'decoração', 'buffet'] },
  { id: 'fashion', title: 'Moda', subtitle: '', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=600&auto=format&fit=crop', keywords: ['roupa', 'moda', 'boutique'] },
];

const CASHBACK_HIGHLIGHTS = [
  { id: 'cb1', name: 'Mundial', category: 'Mercado', cashback: 2, image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=400&auto=format=fit=crop' },
  { id: 'cb2', name: 'Drogaria Raia', category: 'Farmácia', cashback: 5, image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=400&auto=format=fit=crop' },
  { id: 'cb3', name: 'Petz', category: 'Pets', cashback: 8, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=400&auto=format=fit=crop' },
  { id: 'cb4', name: 'Smart Fit', category: 'Academia', cashback: 10, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format=fit=crop' },
  { id: 'cb5', name: 'Rei do Mate', category: 'Lanches', cashback: 15, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400&auto=format=fit=crop' },
];

const RECOMMENDED_FOR_YOU = [
  { id: 'rec1', name: 'Espetto Carioca', category: 'Bar e Restaurante', image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=400&auto=format=fit=crop' },
  { id: 'rec2', name: 'Kopenhagen', category: 'Chocolates', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=400&auto=format=fit=crop' },
  { id: 'rec3', name: 'Drogasmil', category: 'Farmácia', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=400&auto=format=fit=crop' },
  { id: 'rec4', name: 'China In Box', category: 'Culinária Chinesa', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=400&auto=format=fit=crop' },
  { id: 'rec5', name: 'Vila da Mata', category: 'Floricultura', image: 'https://images.unsplash.com/photo-1490750967868-58cb75069ed6?q=80&w=400&auto=format=fit=crop' },
];

// Modal da Roleta (bottom sheet)
const SpinWheelModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  userRole: 'cliente' | 'lojista' | null;
  onWin: (reward: any) => void;
  onRequireLogin: () => void;
  onViewHistory: () => void;
}> = ({ isOpen, onClose, userId, userRole, onWin, onRequireLogin, onViewHistory }) => {
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
              userRole={userRole}
              onWin={onWin}
              onRequireLogin={onRequireLogin}
              onViewHistory={onViewHistory}
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

  // Banner Scroll Ref
  const bannerScrollRef = useRef<HTMLDivElement>(null);

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedQuoteNiche, setSelectedQuoteNiche] = useState('');

  // List Filter State
  const [listFilter, setListFilter] = useState<'all' | 'cashback' | 'top_rated' | 'open_now'>('all');

  // State to trigger spin animation on mount
  const [hasSpun, setHasSpun] = useState(false);

  // Filter Verified Stores
  const verifiedStores = stores.filter(s => s.verified);

  const firstName =
    user?.displayName?.split(' ')[0] || 'Rafael';

  useEffect(() => {
    // Trigger the spin animation once when the component mounts
    const timer = setTimeout(() => setHasSpun(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
    { id: 'cashback', title: "Cashback Local", subtitle: "Dinheiro de volta.", icon: <Coins className="w-8 h-8 text-white" />, bgClass: "bg-gradient-to-r from-[#1E5BFF] to-[#1B54D9]", action: () => onNavigate('cashback_info'), cta: "Ver Agora" },
    { id: 'services', title: "Peça um Orçamento", subtitle: "Receba até 5 orçamentos.", icon: <Wrench className="w-8 h-8 text-white" />, bgClass: "bg-gradient-to-r from-blue-600 to-cyan-500", action: () => onNavigate('services'), cta: "Orçamento" },
    { id: 'connect', title: "Freguesia Connect", subtitle: "Networking empresarial.", icon: <Users className="w-8 h-8 text-white" />, bgClass: "bg-gradient-to-r from-indigo-600 to-purple-600", action: () => onNavigate(!user ? 'freguesia_connect_public' : userRole === 'lojista' ? 'freguesia_connect_dashboard' : 'freguesia_connect_restricted'), cta: "Faça Parte" },
    { id: 'achadinhos', title: "Achados de Hoje", subtitle: "Ofertas especiais.", icon: <Sparkles className="w-8 h-8 text-white" />, bgClass: "bg-gradient-to-r from-pink-500 to-rose-500", action: () => onNavigate('marketplace'), cta: "Ver Ofertas" }
  ];

  const handleCategoryScroll = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
      if (scrollWidth > clientWidth) setCategoryProgress(scrollLeft / (scrollWidth - clientWidth));
    }
  };

  const handleBannerScrollRight = () => {
    if (bannerScrollRef.current) {
      const scrollAmount = bannerScrollRef.current.clientWidth * 0.85;
      bannerScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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
    <div className="flex flex-col gap-4 mt-[12px] pb-24 bg-gray-50 dark:bg-gray-900 w-full max-w-md mx-auto !pt-0 animate-in fade-in duration-500">
      <style>{`
        @keyframes wheel-spin-once {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(1800deg); }
        }
        .spin-wheel-animate {
          animation: wheel-spin-once 5s ease-out forwards;
        }
      `}</style>
      
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
                <div className="flex flex-col gap-3">
                    {searchResults.map((store, index) => (
                    <div key={`${store.id}-${index}`} onClick={() => onStoreClick && onStoreClick(store)} className="bg-white dark:bg-gray-800 rounded-xl p-2.5 shadow-sm border border-gray-100 dark:border-gray-700 flex gap-3 hover:shadow-md transition-all cursor-pointer">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                          <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <h4 className="font-bold text-gray-800 dark:text-white line-clamp-1 text-sm">{store.name}</h4>
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
        <div className="flex flex-col gap-6 w-full">

          {/* ====== BLOCO PRETO ORIGINAL LOCALIZEI ====== */}
          <section className="px-5 pt-4 pb-6 rounded-t-3xl bg-[#050505] text-white">
            {/* VOCÊ ESTÁ EM / Sou lojista / sino */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF6501] flex items-center justify-center text-sm font-semibold shadow-[0_0_18px_rgba(255,122,0,0.65)]">
                  LF
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] tracking-[0.18em] uppercase text-white/60">
                    Você está em
                  </span>
                  <button className="flex items-center gap-1 text-xs font-medium text-white">
                    Freguesia, Jacarepaguá
                    <span className="text-[10px]">▾</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-white/5 transition"
                  onClick={() => onNavigate('sou_lojista')}
                >
                  Sou lojista
                </button>
                <button className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-xs hover:bg-white/10 transition">
                  <Bell className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Saudação + saldo */}
            <div className="flex items-end justify-between mb-4">
              <div className="space-y-1">
                <p className="text-xs text-white/70">
                  Boa tarde, {firstName} 👋
                </p>
                <h1 className="text-[20px] font-semibold leading-snug">
                  Bora girar a economia da
                  <br />
                  Freguesia?
                </h1>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">
                  Saldo Localizei Pay
                </p>
                <p className="text-sm font-bold text-emerald-400">
                  R$ 32,80
                </p>
              </div>
            </div>

            {/* Card laranja Cashback ativo */}
            <div className="flex items-stretch gap-3 mb-6">
              <div className="relative flex-1">
                <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_50%_120%,rgba(255,165,0,0.55),transparent_60%)] pointer-events-none" />
                <div className="relative rounded-[28px] bg-gradient-to-r from-[#FF7A00] to-[#FF6501] px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.7)]">
                  <p className="text-[10px] tracking-[0.24em] uppercase text-white/70 mb-1">
                    Cashback ativo
                  </p>
                  <p className="text-[13px] leading-snug font-semibold">
                    Ganhe até 10% de volta nas compras em parceiros Localizei.
                  </p>
                </div>
              </div>
              <button className="w-11 rounded-[20px] bg-white/6 flex items-center justify-center text-xl text-white/80 border border-white/10 hover:bg-white/10 transition">
                +
              </button>
            </div>

            {/* Destaques da semana */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold">
                  Destaques da semana
                </h2>
                <button className="text-[11px] text-white/60 hover:text-white/85 transition">
                  Ver todos
                </button>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {/* Card 1 */}
                <article className="min-w-[240px] max-w-[240px] rounded-[24px] border border-[#FF7A00] bg-gradient-to-b from-[#141414] to-[#050505] px-4 py-3 flex flex-col justify-between shadow-[0_0_18px_rgba(255,122,0,0.35)]">
                  <div className="mb-3">
                    <h3 className="text-[13px] font-semibold mb-1">
                      Cashback em toda a Freguesia
                    </h3>
                    <p className="text-[11px] text-white/70 leading-snug">
                      Ative seu Localizei Pay e ganhe parte do dinheiro de
                      volta em cada compra.
                    </p>
                  </div>
                  <button className="self-start rounded-full bg-white text-[11px] font-medium text-black px-3 py-1.5 flex items-center gap-1 hover:bg-neutral-100 transition">
                    Ver lojas com cashback
                    <span className="text-[10px]">↗</span>
                  </button>
                </article>

                {/* Card 2 */}
                <article className="min-w-[240px] max-w-[240px] rounded-[24px] border border-[#FF7A00] bg-gradient-to-b from-[#141414] to-[#050505] px-4 py-3 flex flex-col justify-between">
                  <div className="mb-3">
                    <h3 className="text-[13px] font-semibold mb-1">
                      Freguesia Connect
                    </h3>
                    <p className="text-[11px] text-white/70 leading-snug">
                      Rede exclusiva para empreendedores locais crescerem
                      juntos.
                    </p>
                  </div>
                  <button className="self-start rounded-full bg-white text-[11px] font-medium text-black px-3 py-1.5 flex items-center gap-1 hover:bg-neutral-100 transition">
                    Conhecer os planos
                    <span className="text-[10px]">›</span>
                  </button>
                </article>
              </div>

              {/* Barra de progresso fake */}
              <div className="mt-1 h-1 w-full rounded-full bg-white/10">
                <div className="h-1 w-1/3 rounded-full bg-white/70" />
              </div>
            </div>

            {/* O que você quer fazer agora? */}
            <div className="space-y-2">
              <h2 className="text-sm font-semibold mb-1">
                O que você quer fazer agora?
              </h2>

              <button className="w-full flex items-center justify-between rounded-[999px] border border-white/18 px-4 py-3 bg-transparent hover:bg-white/[0.06] transition">
                <div className="text-left">
                  <p className="text-xs font-medium">Explorar categorias</p>
                  <p className="text-[11px] text-white/70">
                    Encontre restaurantes, serviços, saúde, beleza e muito
                    mais.
                  </p>
                </div>
                <span className="text-sm text-white/70">›</span>
              </button>

              <button className="w-full flex items-center justify-between rounded-[999px] border border-white/18 px-4 py-3 bg-transparent hover:bg-white/[0.06] transition">
                <div className="text-left">
                  <p className="text-xs font-medium">Ver ofertas de hoje</p>
                  <p className="text-[11px] text-white/70">
                    Promoções com cashback extra em parceiros selecionados.
                  </p>
                </div>
                <span className="text-sm text-white/70">›</span>
              </button>

              <button className="w-full flex items-center justify-between rounded-[999px] border border-white/18 px-4 py-3 bg-transparent hover:bg-white/[0.06] transition">
                <div className="text-left">
                  <p className="text-xs font-medium">Sou lojista</p>
                  <p className="text-[11px] text-white/70">
                    Cadastre seu negócio, ative o cashback e apareça para quem
                    está perto.
                  </p>
                </div>
                <span className="text-sm text-white/70">›</span>
              </button>
            </div>
          </section>
          {/* ====== FIM BLOCO PRETO ORIGINAL ====== */}
            
          {/* --- Faixa Roleta Localizei (Layout Organizado) --- */}
          <div className="px-5 w-full">
            <div
              onClick={handleSpinWheelClick}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-100 via-indigo-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 border border-blue-200/60 dark:border-gray-600 shadow-md shadow-blue-100/50 flex items-center px-2 py-3 relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all duration-300"
            >
              {/* Background Decor */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-xl -mr-6 -mt-6 pointer-events-none"></div>
              <div className="absolute bottom-0 left-1/3 w-16 h-16 bg-indigo-400/20 rounded-full blur-lg pointer-events-none"></div>
              
              {/* Left: Icon */}
              <div className="relative z-10 flex-shrink-0 mr-2">
                <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/50 relative ${hasSpun ? 'spin-wheel-animate' : ''}`}>
                  <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="15" fill="white" stroke="#FFE0B2" strokeWidth="1" />
                      <path d="M16 16 L16 1 A15 15 0 0 1 26.6 5.4 Z" fill="#FF5252" /> 
                      <path d="M16 16 L26.6 5.4 A15 15 0 0 1 31 16 Z" fill="#FFD740" />
                      <path d="M16 16 L31 16 A15 15 0 0 1 26.6 26.6 Z" fill="#448AFF" />
                      <path d="M16 16 L26.6 26.6 A15 15 0 0 1 16 31 Z" fill="#69F0AE" />
                      <path d="M16 16 L16 31 A15 15 0 0 1 5.4 26.6 Z" fill="#FF4081" />
                      <path d="M16 16 L5.4 26.6 A15 15 0 0 1 1 16 Z" fill="#E040FB" />
                      <path d="M16 16 L1 16 A15 15 0 0 1 5.4 5.4 Z" fill="#536DFE" />
                      <path d="M16 16 L5.4 5.4 A15 15 0 0 1 16 1 Z" fill="#FFAB40" />
                      <circle cx="16" cy="16" r="3" fill="white" stroke="#ECEFF1" strokeWidth="1" />
                      <circle cx="16" cy="16" r="1.5" fill="#37474F" />
                      <path d="M16 0 L18 4 H14 L16 0Z" fill="#D32F2F" stroke="white" strokeWidth="0.5" />
                  </svg>
                </div>
              </div>
              
              {/* Center: Text (Aligned Left) */}
              <div className="relative z-10 flex-1 flex flex-col justify-center min-w-0 mr-1">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-0.5 whitespace-nowrap">
                    Roleta Localizei
                  </span>
                  <span className="text-[11px] xs:text-[12px] sm:text-[13px] font-bold text-gray-900 dark:text-white leading-none whitespace-nowrap overflow-visible">
                    Ganhe prêmios todos os dias
                  </span>
              </div>

              {/* Right: CTA Button */}
              <div className="relative z-10 flex-shrink-0 ml-1">
                  <button className="bg-gradient-to-r from-[#1E5BFF] to-[#1B54D9] text-white text-[10px] font-bold px-4 py-2 rounded-full shadow-md shadow-blue-500/20 active:scale-95 transition-transform uppercase tracking-wide whitespace-nowrap">
                      Gire Agora
                  </button>
              </div>
            </div>
          </div>

          {/* Categorias rápidas */}
          <div className="w-full">
            <div ref={categoryScrollRef} onScroll={handleCategoryScroll} className="overflow-x-auto px-5 pb-2 no-scrollbar">
              <div className="grid grid-rows-2 grid-flow-col gap-x-5 gap-y-4 w-max">
                  {CATEGORIES.map((cat) => (
                    <div key={cat.id} onClick={() => onSelectCategory(cat)} className="flex flex-col items-center gap-1.5 cursor-pointer group active:scale-95 transition-transform w-[68px]">
                        <div className="w-14 h-14 bg-[#EEF4FF] dark:bg-gray-800 rounded-2xl shadow-sm border border-[#EEF4FF] dark:border-gray-700 flex items-center justify-center group-hover:shadow-md group-active:bg-[#DCE8FF] group-hover:bg-[#DCE8FF] transition-all">
                            {React.isValidElement(cat.icon) ? React.cloneElement(cat.icon as React.ReactElement<any>, { className: "w-6 h-6 text-primary-500" }) : cat.icon}
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

          {/* Carrossel de Banners Estilo Méliuz */}
          <div className="w-full relative group">
            <div className="px-5 mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">O que você vai encontrar na Localizei</h3>
            </div>
            
            {/* Botão de Navegação Flutuante */}
            <button 
              onClick={handleBannerScrollRight}
              className="absolute right-2 top-1/2 translate-y-1/4 z-20 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg text-gray-600 dark:text-gray-300 backdrop-blur-sm border border-gray-100 dark:border-gray-700 active:scale-95 transition-all opacity-0 group-hover:opacity-100 hidden sm:block"
              aria-label="Próximo banner"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            <div 
              ref={bannerScrollRef}
              className="flex gap-3 overflow-x-auto px-5 pb-4 no-scrollbar snap-x snap-mandatory items-start"
              style={{ scrollPaddingLeft: '20px' }}
            >
              {MINI_BANNERS.map((banner) => {
                  const heightClass = 'h-[72px]'; 
                  const paddingClass = 'p-3.5';
                  const titleClass = 'text-[15px] mb-0.5 font-extrabold';
                  const subtitleClass = 'mb-1.5 text-[11px] leading-snug';
                  const btnPaddingClass = 'px-3 py-1 text-[9px]';
                  const iconContainerClass = 'w-10 h-10';
                  
                  const IconElement = React.isValidElement(banner.icon) 
                      ? React.cloneElement(banner.icon as React.ReactElement<any>, { className: "w-5 h-5 text-white" })
                      : banner.icon;

                  return (
                      <div key={banner.id} onClick={banner.action} className="min-w-[88%] sm:min-w-[340px] snap-center cursor-pointer relative active:scale-[0.98] transition-transform">
                          <div className={`w-full ${heightClass} rounded-[20px] ${banner.bgClass} ${paddingClass} flex flex-row items-center justify-between shadow-lg shadow-gray-200/60 dark:shadow-none relative overflow-hidden transition-all`}>
                          
                          {/* 1. Icon (Left) */}
                          <div className="z-10 relative flex-shrink-0 mr-3">
                              <div className={`${iconContainerClass} bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-inner`}>
                                  {IconElement}
                              </div>
                          </div>

                          {/* 2. Text (Center) */}
                          <div className="z-10 flex flex-col justify-center h-full flex-1 min-w-0">
                              <h3 className={`text-white font-display leading-tight tracking-tight ${titleClass}`}>{banner.title}</h3>
                              <p className={`text-white/90 font-medium ${subtitleClass}`}>{banner.subtitle}</p>
                          </div>

                          {/* 3. CTA (Right) */}
                          <div className="z-10 flex-shrink-0 ml-2">
                              <button className={`bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white font-bold rounded-full w-fit transition-colors flex items-center gap-1 ${btnPaddingClass}`}>
                                  {banner.cta} <ArrowRight className="w-2.5 h-2.5" />
                              </button>
                          </div>

                          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                          <div className="absolute -left-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                          </div>
                      </div>
                  );
              })}
              <div className="min-w-[5px] flex-shrink-0"></div>
            </div>
          </div>

          {/* Achadinhos */}
          <div className="pl-5 space-y-2.5 w-full">
            <div className="flex items-center justify-between pr-5">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Achadinhos da Freguesia</h3>
              <button 
                  onClick={() => onNavigate('marketplace')}
                  className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
              >
                  Ver mais
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-3 pr-5 no-scrollbar">
              {EDITORIAL_THEMES.map((theme) => (
                <div key={theme.id} className="min-w-[108px] w-[108px] h-[192px] rounded-2xl overflow-hidden relative cursor-pointer group active:scale-[0.98] transition-transform shadow-md" onClick={() => onSelectCollection(theme)}>
                  <img src={theme.image} alt={theme.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-center items-center p-3 text-center">
                    <h4 className="font-bold text-white text-base font-display leading-tight">{theme.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lojas com Cashback */}
          <div className="pl-5 space-y-2.5 w-full">
            <div className="flex items-center justify-between pr-5">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Lojas com Cashback</h3>
              <button 
                  onClick={() => onNavigate('explore')}
                  className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
              >
                  Ver todas
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-3 pr-5 no-scrollbar">
              {CASHBACK_HIGHLIGHTS.map((store) => (
                <div key={store.id} onClick={() => {
                    const mockStore: Store = {
                        id: store.id,
                        name: store.name,
                        category: store.category,
                        subcategory: store.category,
                        image: store.image,
                        rating: 4.5,
                        distance: '1.2km',
                        adType: AdType.ORGANIC,
                        description: 'Loja parceira com cashback.',
                        cashback: store.cashback
                    };
                    if (onStoreClick) onStoreClick(mockStore);
                }} className="min-w-[140px] w-[140px] bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col group cursor-pointer active:scale-95 transition-transform">
                  <div className="h-24 w-full relative bg-gray-200 dark:bg-gray-700">
                      <img src={store.image} alt={store.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm flex items-center gap-0.5">
                        <Coins className="w-3 h-3" />
                        {store.cashback}%
                      </div>
                  </div>
                  <div className="p-2.5 flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-white text-xs line-clamp-1">{store.name}</h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{store.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lojas Verificadas */}
          {verifiedStores.length > 0 && (
            <div className="pl-5 space-y-2.5 w-full">
              <div className="flex items-center justify-between pr-5">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Lojas Verificadas</h3>
                  <button
                      onClick={() => onNavigate('verified_stores')}
                      className="text-sm font-medium text-[#1E5BFF] hover:text-[#1749CC] transition-colors"
                  >
                      Ver todas
                  </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-3 pr-5 no-scrollbar">
                  {verifiedStores.slice(0, 10).map((store) => (
                  <div key={store.id} onClick={() => onStoreClick && onStoreClick(store)} className="min-w-[140px] w-[140px] bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col group cursor-pointer active:scale-95 transition-transform">
                      <div className="h-24 w-full relative bg-gray-200 dark:bg-gray-700">
                          <img src={store.image} alt={store.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute top-2 right-2 z-10">
                              <BadgeCheck className="w-5 h-5 text-white fill-[#1E5BFF]" />
                          </div>
                      </div>
                      <div className="p-2.5 flex flex-col flex-1 justify-between">
                          <div>
                              <h4 className="font-bold text-gray-800 dark:text-white text-xs line-clamp-1">{store.name}</h4>
                              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{store.category}</p>
                          </div>
                      </div>
                  </div>
                  ))}
              </div>
            </div>
          )}

          {/* Recomendados para você */}
          <div className="pl-5 space-y-2.5 w-full">
            <div className="flex items-center justify-between pr-5">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Recomendados para você</h3>
              <button 
                  onClick={() => onNavigate('explore')}
                  className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
              >
                  Ver mais
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-3 pr-5 no-scrollbar">
              {RECOMMENDED_FOR_YOU.map((store) => (
                <div key={store.id} onClick={() => {
                    const mockStore: Store = {
                        id: store.id,
                        name: store.name,
                        category: store.category,
                        subcategory: store.category,
                        image: store.image,
                        rating: 4.8,
                        distance: '2.5km',
                        adType: AdType.ORGANIC,
                        description: 'Recomendação personalizada para você.',
                    };
                    if (onStoreClick) onStoreClick(mockStore);
                }} className="min-w-[140px] w-[140px] bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col group cursor-pointer active:scale-95 transition-transform">
                  <div className="h-24 w-full relative bg-gray-200 dark:bg-gray-700">
                      <img src={store.image} alt={store.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-2.5 flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-white text-xs line-clamp-1">{store.name}</h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{store.category}</p>
                      <div className="flex items-center gap-1 mt-1.5">
                          <ThumbsUp className="w-3 h-3 text-blue-500" />
                          <span className="text-[9px] font-medium text-blue-600 dark:text-blue-400">Recomendado</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top buscados */}
          <div className="pl-5 space-y-2.5 w-full">
            <div className="flex items-center justify-between pr-5">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">As lojas mais buscadas</h3>
                <button 
                    onClick={() => onNavigate('explore')}
                    className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
                >
                    Ver mais
                </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-3 pr-5 no-scrollbar">
              {TOP_SEARCHED.map((item) => (
                <div key={item.id} className="min-w-[135px] w-[135px] h-[120px] rounded-xl overflow-hidden relative group cursor-pointer active:scale-95 transition-transform">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-2 flex flex-col justify-end">
                        <h4 className="text-white font-bold text-xs line-clamp-3">{item.title}</h4>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patrocinador Master */}
          <div className="px-5 w-full">
            <div 
              onClick={() => onNavigate('patrocinador_master')}
              className="w-full bg-[#1F2A44] rounded-2xl p-4 shadow-sm border border-transparent relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-inner flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1E5BFF]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" fill="currentColor"/>
                    <path d="M8 8H16V10H10V11H15V13H10V14H16V16H8V8Z" fill="white"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-0.5">Patrocinador Master</p>
                  <h3 className="text-white font-bold text-lg leading-tight truncate">Grupo Esquematiza</h3>
                  <p className="text-white text-xs mt-0.5 font-medium truncate">Transformando desafios em soluções seguras!</p>
                </div>
                <ChevronRight className="w-5 h-5 text-white opacity-80 group-hover:opacity-100 transition-colors" />
              </div>
            </div>
          </div>

          {/* Filtros da Lista Home */}
          <div className="px-5 w-full -mb-2 mt-1">
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  <button
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap transition-colors ${
                      listFilter === 'all'
                          ? 'bg-[#1E5BFF] text-white border-[#1E5BFF]'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => setListFilter('all')}
                  >
                      <Filter className="w-3 h-3" />
                      Todos
                  </button>
                  <button
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap transition-colors ${
                      listFilter === 'cashback'
                          ? 'bg-green-500 text-white border-green-500'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => setListFilter('cashback')}
                  >
                      <Percent className="w-3 h-3" />
                      Cashback
                  </button>
                  <button
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap transition-colors ${
                      listFilter === 'top_rated'
                          ? 'bg-[#1E5BFF] text-white border-[#1E5BFF]'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => setListFilter('top_rated')}
                  >
                      <Star className="w-3 h-3" />
                      Melhor avaliadas
                  </button>
                  <button
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap transition-colors ${
                      listFilter === 'open_now'
                          ? 'bg-[#1E5BFF] text-white border-[#1E5BFF]'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => setListFilter('open_now')}
                  >
                      ⏱ Aberto agora
                  </button>
              </div>
          </div>

          {/* Lista principal */}
          <div className="px-5 pb-4 min-h-[300px] w-full">
              <LojasEServicosList 
                  onStoreClick={onStoreClick} 
                  onViewAll={() => onNavigate('explore')}
                  activeFilter={listFilter}
              />
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
        userRole={userRole || null}
        onWin={handleSpinWin}
        onRequireLogin={onRequireLogin}
        onViewHistory={() => onNavigate('prize_history')}
      />
    </div>
  );
};
