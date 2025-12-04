
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { HomeFeed } from './components/HomeFeed';
import { ExploreView } from './components/ExploreView';
import { StatusView } from './components/StatusView';
import { MarketplaceView } from './components/MarketplaceView';
import { CategoryView } from './components/CategoryView';
import { CategoriaAlimentacao } from './components/CategoriaAlimentacao';
import { SubcategoryStoreList } from './components/SubcategoryStoreList';
import { StoreDetailView } from './components/StoreDetailView';
import { StoreCategoryView } from './components/StoreCategoryView';
import { CashbackView } from './components/CashbackView';
import { CashbackLandingView } from './components/CashbackLandingView';
import { FreguesiaConnectPublic } from './components/FreguesiaConnectPublic';
import { FreguesiaConnectDashboard } from './components/FreguesiaConnectDashboard';
import { FreguesiaConnectRestricted } from './components/FreguesiaConnectRestricted';
import { RewardDetailsView } from './components/RewardDetailsView';
import { PrizeHistoryView } from './components/PrizeHistoryView';
import { AuthModal } from './components/AuthModal';
import { QuickRegister } from './components/QuickRegister';
import { MenuView } from './components/MenuView';
import { ServicesView } from './components/ServicesView';
import { SubcategoriesView } from './components/SubcategoriesView';
import { SpecialtiesView } from './components/SpecialtiesView';
import { StoreAreaView } from './components/StoreAreaView';
import { QuoteRequestModal } from './components/QuoteRequestModal';
import { ServiceSuccessView } from './components/ServiceSuccessView';
import { EditorialListView, EditorialCollection } from './components/EditorialListView';
import { SupportView, InviteFriendView, AboutView, FavoritesView, SponsorInfoView } from './components/SimplePages';
import { CashbackInfoView } from './components/CashbackInfoView';
import { EditProfileView } from './components/EditProfileView';
import { ServiceTermsView } from './components/ServiceTermsView';
import { PatrocinadorMasterScreen } from './components/PatrocinadorMasterScreen';
import { BusinessRegistrationFlow } from './components/BusinessRegistrationFlow';
import { StoreCashbackModule } from './components/StoreCashbackModule';
import { StoreAdsModule } from './components/StoreAdsModule';
import { StoreConnectModule } from './components/StoreConnectModule';
import { StoreProfileEdit } from './components/StoreProfileEdit';
import { StoreFinanceModule } from './components/StoreFinanceModule';
import { StoreSupportModule } from './components/StoreSupportModule';
import { MapPin, Crown } from 'lucide-react';
import { auth } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Category, Store, AdType } from './types';

// =============================
// MOCK DE LOJAS PARA AMBIENTE SEM SUPABASE
// =============================
const MOCK_STORES: Store[] = [
  {
    id: '1',
    name: 'Burger Freguesia',
    category: 'Alimentação',
    description: 'Hambúrgueres artesanais com sabor de bairro.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 124,
    distance: 'Freguesia • RJ',
    cashback: 5,
    adType: AdType.ORGANIC,
    subcategory: 'Hamburgueria',
    address: 'Rua Tirol, 1245 - Freguesia',
    phone: '(21) 99999-1111',
    hours: 'Seg a Dom • 11h às 23h',
  },
  {
    id: '2',
    name: 'Padaria do Vale',
    category: 'Alimentação',
    description: 'Pães fresquinhos e café da manhã completo.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 87,
    distance: 'Freguesia • RJ',
    cashback: 3,
    adType: AdType.PREMIUM,
    subcategory: 'Padaria',
    address: 'Estrada dos Três Rios, 800 - Freguesia',
    phone: '(21) 98888-2222',
    hours: 'Todos os dias • 6h às 21h',
  },
  {
    id: '3',
    name: 'Studio Vida Fitness',
    category: 'Saúde & Bem-estar',
    description: 'Treinos funcionais e personal trainer.',
    image: 'https://images.unsplash.com/photo-1554344058-8d1d1dbc5960?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 54,
    distance: 'Freguesia • RJ',
    cashback: 7,
    adType: AdType.ORGANIC,
    subcategory: 'Academia',
    address: 'Rua Araguaia, 300 - Freguesia',
    phone: '(21) 97777-3333',
    hours: 'Seg a Sáb • 6h às 22h',
  },
  {
    id: '4',
    name: 'Pet Club Freguesia',
    category: 'Pets',
    description: 'Banho, tosa e boutique pet.',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 98,
    distance: 'Freguesia • RJ',
    cashback: 4,
    adType: AdType.ORGANIC,
    subcategory: 'Pet shop',
    address: 'Estrada do Gabinal, 1500 - Freguesia',
    phone: '(21) 96666-4444',
    hours: 'Ter a Dom • 9h às 19h',
  },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'cliente' | 'lojista' | null>(null);

  const [globalSearch, setGlobalSearch] = useState('');
  const [stores] = useState<Store[]>(MOCK_STORES); // usa apenas os mocks

  const [needsProfileSetup, setNeedsProfileSetup] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [selectedSubcategoryName, setSelectedSubcategoryName] = useState<string | null>(null);

  const [selectedCollection, setSelectedCollection] = useState<EditorialCollection | null>(null);

  const [selectedServiceMacro, setSelectedServiceMacro] = useState<{ id: string; name: string } | null>(null);
  const [selectedServiceSubcategory, setSelectedServiceSubcategory] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteCategoryName, setQuoteCategoryName] = useState('');

  const [selectedReward, setSelectedReward] = useState<any>(null);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // AUTH
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && activeTab === 'cashback_landing') {
        setActiveTab('cashback');
      }
      if (currentUser && activeTab === 'freguesia_connect_public') {
        setActiveTab('home');
      }
    });
    return () => unsubscribe();
  }, [activeTab]);

  // ROLE DO USUÁRIO
  useEffect(() => {
    // em ambiente fake, mantém lógica básica
    if (!user) {
      setUserRole(null);
      return;
    }
    setUserRole('cliente'); 
  }, [user]);

  // SPLASH
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    if (category.slug === 'food') {
      setActiveTab('food_category');
    } else {
      setActiveTab('category_detail');
    }
  };

  const handleSelectSubcategory = (subcategoryName: string) => {
    setSelectedSubcategoryName(subcategoryName);
    setActiveTab('subcategory_store_list');
  };

  const handleSelectStore = (store: Store) => {
    setSelectedStore(store);
    setActiveTab('store_detail');
  };

  const handleSelectCollection = (collection: EditorialCollection) => {
    setSelectedCollection(collection);
    setActiveTab('editorial_list');
  };

  const handleSelectServiceMacro = (id: string, name: string) => {
    setSelectedServiceMacro({ id, name });
    setActiveTab('service_subcategories');
  };

  const handleSelectServiceSubcategory = (subName: string) => {
    setSelectedServiceSubcategory(subName);
    setActiveTab('service_specialties');
  };

  const handleSelectSpecialty = (specialty: string) => {
    setQuoteCategoryName(`${selectedServiceSubcategory} - ${specialty}`);
    setIsQuoteModalOpen(true);
  };

  const handleSpinWin = (reward: any) => {
    setSelectedReward(reward);
    setActiveTab('reward_details');
  };

  const handleProfileComplete = () => {
    setNeedsProfileSetup(false);
    setActiveTab('home');
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-primary-500 to-orange-700 flex flex-col items-center justify-center text-white z-50">
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-4 animate-pop-in opacity-0">
            <MapPin className="w-8 h-8 text-primary-600 fill-primary-600" />
          </div>
          <div className="text-4xl font-bold font-display animate-slide-up opacity-0 [animation-delay:500ms]">
            Localizei
          </div>
          <div className="text-xs font-light uppercase mt-2 animate-tracking-expand opacity-0 [animation-delay:1000ms]">
            Freguesia
          </div>
        </div>
        <div className="mt-16 text-center animate-spin-in opacity-0 [animation-delay:1500ms]">
          <p className="text-[9px] opacity-70 uppercase tracking-wider mb-1">
            Patrocinador Master
          </p>
          <div className="bg-white/10 backdrop-blur-sm px-5 py-1.5 rounded-full border border-white/20 flex items-center gap-2 shadow-lg">
            <Crown className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 drop-shadow-md" />
            <p className="font-bold text-base tracking-wide text-white drop-shadow-sm">
              Grupo Esquematiza
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (user && needsProfileSetup) {
    return <QuickRegister user={user} onComplete={handleProfileComplete} />;
  }

  const MOCK_BANNERS = [
    {
      id: 'sub-ad-1',
      title: 'Desconto especial em Pizzas',
      image:
        'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=800&auto=format=fit-crop',
      merchantName: 'Pizza Place',
    },
    {
      id: 'sub-ad-2',
      title: 'Seu almoço executivo aqui',
      image:
        'https://images.unsplash.com/photo-1559329007-4477ca94264a?q=80&w=800&auto=format=fit-crop',
      merchantName: 'Sabor & Cia',
    },
  ];

  const hideHeader = [
    'category_detail',
    'food_category',
    'subcategory_store_list',
    'store_detail',
    'store_category',
    'cashback',
    'cashback_landing',
    'cashback_info',
    'profile',
    'store_area',
    'store_cashback_module',
    'store_ads_module',
    'store_connect',
    'store_profile',
    'store_finance',
    'store_support',
    'service_subcategories',
    'service_specialties',
    'service_success',
    'service_terms', 
    'editorial_list',
    'freguesia_connect_public',
    'freguesia_connect_dashboard',
    'freguesia_connect_restricted',
    'reward_details',
    'prize_history',
    'support',
    'invite_friend',
    'about',
    'favorites',
    'become_sponsor',
    'edit_profile',
    'patrocinador_master',
    'business_registration'
  ].includes(activeTab);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center transition-colors duration-300 relative">
        <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
          {!hideHeader && (
            <Header
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              onAuthClick={() => setIsAuthOpen(true)}
              user={user}
              searchTerm={globalSearch}
              onSearchChange={setGlobalSearch}
              onNavigate={setActiveTab}
              activeTab={activeTab}
            />
          )}

          <main className="animate-in fade-in duration-500">
            {activeTab === 'home' && (
              <HomeFeed
                onNavigate={setActiveTab}
                onSelectCategory={handleSelectCategory}
                onSelectCollection={handleSelectCollection}
                onStoreClick={handleSelectStore}
                stores={stores}
                searchTerm={globalSearch}
                user={user}
                userRole={userRole}
                onSpinWin={handleSpinWin}
                onRequireLogin={() => setIsAuthOpen(true)}
              />
            )}

            {activeTab === 'explore' && (
              <ExploreView
                onSelectCategory={handleSelectCategory}
                onNavigate={setActiveTab}
                onStoreClick={handleSelectStore}
                stores={stores}
                searchTerm={globalSearch}
              />
            )}

            {activeTab === 'editorial_list' && selectedCollection && (
              <EditorialListView
                collection={selectedCollection}
                stores={stores}
                onBack={() => setActiveTab('home')}
                onStoreClick={handleSelectStore}
              />
            )}

            {activeTab === 'services' && (
              <ServicesView 
                onSelectMacro={handleSelectServiceMacro} 
                onOpenTerms={() => setActiveTab('service_terms')}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'service_terms' && (
              <ServiceTermsView 
                onBack={() => setActiveTab('services')} 
              />
            )}

            {activeTab === 'service_subcategories' && selectedServiceMacro && (
              <SubcategoriesView
                macroId={selectedServiceMacro.id}
                macroName={selectedServiceMacro.name}
                onBack={() => setActiveTab('services')}
                onSelectSubcategory={handleSelectServiceSubcategory}
              />
            )}

            {activeTab === 'service_specialties' && selectedServiceSubcategory && (
              <SpecialtiesView
                subcategoryName={selectedServiceSubcategory}
                onBack={() => setActiveTab('service_subcategories')}
                onSelectSpecialty={handleSelectSpecialty}
              />
            )}

            {activeTab === 'service_success' && (
              <ServiceSuccessView
                onHome={() => setActiveTab('home')}
                onViewRequests={() => setActiveTab('profile')}
              />
            )}

            {activeTab === 'status' && <StatusView />}

            {activeTab === 'marketplace' && (
              <MarketplaceView onBack={() => setActiveTab('home')} stores={stores} />
            )}

            {activeTab === 'food_category' && (
              <CategoriaAlimentacao
                onBack={() => setActiveTab('home')}
                onSelectSubcategory={handleSelectSubcategory}
              />
            )}

            {activeTab === 'subcategory_store_list' && selectedSubcategoryName && (
              <SubcategoryStoreList
                subcategoryName={selectedSubcategoryName}
                onBack={() => setActiveTab('food_category')}
                onStoreClick={handleSelectStore}
                stores={stores.filter(
                  (s: any) =>
                    s.subcategory?.toLowerCase() ===
                    selectedSubcategoryName.toLowerCase(),
                )}
                sponsoredBanners={MOCK_BANNERS}
              />
            )}

            {activeTab === 'category_detail' && selectedCategory && (
              <CategoryView
                category={selectedCategory}
                onBack={() => setActiveTab('home')}
                onStoreClick={handleSelectStore}
                stores={stores}
              />
            )}

            {activeTab === 'store_detail' && selectedStore && (
              <StoreDetailView
                store={selectedStore}
                onBack={() =>
                  setActiveTab(
                    selectedSubcategoryName ? 'subcategory_store_list' : 'home',
                  )
                }
                onOpenCashback={() => setActiveTab('cashback')}
              />
            )}

            {activeTab === 'store_category' && (
              <StoreCategoryView
                categoryName="Produtos"
                onBack={() => setActiveTab('store_detail')}
              />
            )}

            {activeTab === 'cashback' && (
              <CashbackView onBack={() => setActiveTab('home')} />
            )}

            {activeTab === 'cashback_landing' && (
              <CashbackLandingView
                onBack={() => setActiveTab('home')}
                onLogin={() => setIsAuthOpen(true)}
              />
            )}

            {activeTab === 'cashback_info' && (
              <CashbackInfoView
                user={user}
                userRole={userRole}
                onBack={() => setActiveTab('home')}
                onLogin={() => setIsAuthOpen(true)}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'profile' && (
              <MenuView
                user={user}
                userRole={userRole}
                onAuthClick={() => setIsAuthOpen(true)}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'store_area' && (
              <StoreAreaView onBack={() => setActiveTab('profile')} onNavigate={setActiveTab} />
            )}

            {activeTab === 'business_registration' && (
              <BusinessRegistrationFlow 
                onBack={() => setActiveTab('profile')} 
                onComplete={() => {
                    setUserRole('lojista'); // Simulate logic
                    setActiveTab('store_area');
                }}
              />
            )}

            {activeTab === 'store_cashback_module' && (
                <StoreCashbackModule onBack={() => setActiveTab('store_area')} />
            )}

            {activeTab === 'store_ads_module' && (
                <StoreAdsModule onBack={() => setActiveTab('store_area')} />
            )}

            {activeTab === 'store_connect' && (
                <StoreConnectModule onBack={() => setActiveTab('store_area')} />
            )}

            {activeTab === 'store_profile' && (
                <StoreProfileEdit onBack={() => setActiveTab('store_area')} />
            )}

            {activeTab === 'store_finance' && (
                <StoreFinanceModule onBack={() => setActiveTab('store_area')} />
            )}

            {activeTab === 'store_support' && (
                <StoreSupportModule onBack={() => setActiveTab('store_area')} />
            )}

            {activeTab === 'freguesia_connect_public' && (
              <FreguesiaConnectPublic
                onBack={() => setActiveTab('home')}
                onLogin={() => setIsAuthOpen(true)}
              />
            )}

            {activeTab === 'freguesia_connect_dashboard' && (
              <FreguesiaConnectDashboard onBack={() => setActiveTab('home')} />
            )}

            {activeTab === 'freguesia_connect_restricted' && (
              <FreguesiaConnectRestricted onBack={() => setActiveTab('home')} />
            )}

            {activeTab === 'reward_details' && (
              <RewardDetailsView
                reward={selectedReward}
                onBack={() => setActiveTab('home')}
                onHome={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'prize_history' && user && (
              <PrizeHistoryView
                userId={user.uid}
                onBack={() => setActiveTab('home')}
                onGoToSpinWheel={() => setActiveTab('home')}
              />
            )}

            {/* Simple Pages Routing */}
            {activeTab === 'support' && <SupportView onBack={() => setActiveTab('profile')} />}
            {activeTab === 'invite_friend' && <InviteFriendView onBack={() => setActiveTab('profile')} />}
            {activeTab === 'about' && <AboutView onBack={() => setActiveTab('profile')} />}
            {activeTab === 'favorites' && <FavoritesView onBack={() => setActiveTab('profile')} />}
            {activeTab === 'become_sponsor' && <SponsorInfoView onBack={() => setActiveTab('profile')} />}
            {activeTab === 'edit_profile' && user && <EditProfileView user={user} onBack={() => setActiveTab('profile')} />}
            
            {activeTab === 'patrocinador_master' && (
                <PatrocinadorMasterScreen onBack={() => setActiveTab('profile')} />
            )}

          </main>

          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            user={user}
          />

          <QuoteRequestModal
            isOpen={isQuoteModalOpen}
            onClose={() => setIsQuoteModalOpen(false)}
            categoryName={quoteCategoryName}
            onSuccess={() => setActiveTab('service_success')}
          />
        </Layout>
      </div>
    </div>
  );
};

export default App;
