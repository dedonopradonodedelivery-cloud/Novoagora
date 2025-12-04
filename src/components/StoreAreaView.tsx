
import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  BadgeCheck, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Repeat, 
  TrendingUp, 
  Wallet, 
  Megaphone, 
  Zap, 
  ChevronRight,
  Settings,
  HelpCircle,
  CreditCard,
  LayoutDashboard,
  Calendar,
  Filter
} from 'lucide-react';

interface StoreAreaViewProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

// Mock Base Data (Reference for 30 days)
const STORE_DATA = {
  name: "Hamburgueria Brasa",
  isVerified: true,
  logo: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=200&auto=format&fit=crop",
  baseKpis: {
    sales: 12450.00,
    orders: 142,
    newCustomers: 28,
    recurringCustomers: 114,
    cashbackGiven: 622.50,
    adBalance: 45.00
  },
  connectStatus: 'inactive' // 'active' | 'inactive'
};

type DateRange = '7d' | '15d' | '30d' | '90d' | 'custom';

const KPICard: React.FC<{ 
  icon: React.ElementType; 
  label: string; 
  value: string; 
  color: string 
}> = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between h-24 transition-all duration-300 animate-in fade-in">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color} bg-opacity-10 dark:bg-opacity-20`}>
      <Icon className={`w-4 h-4 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide truncate">{label}</p>
      <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{value}</p>
    </div>
  </div>
);

const MenuLink: React.FC<{ 
  icon: React.ElementType; 
  label: string; 
  onClick?: () => void;
}> = ({ icon: Icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full bg-white dark:bg-gray-800 p-4 border-b last:border-b-0 border-gray-100 dark:border-gray-700 flex items-center justify-between group active:bg-gray-50 dark:active:bg-gray-700/50 transition-colors"
  >
    <div className="flex items-center gap-3">
      <div className="text-gray-400 group-hover:text-[#2D6DF6] transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{label}</span>
    </div>
    <ChevronRight className="w-4 h-4 text-gray-300" />
  </button>
);

export const StoreAreaView: React.FC<StoreAreaViewProps> = ({ onBack, onNavigate }) => {
  const [isCashbackEnabled, setIsCashbackEnabled] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>('30d');

  // Logic to recalculate KPIs based on selected filter
  const currentKpis = useMemo(() => {
    let multiplier = 1;
    switch (dateRange) {
        case '7d': multiplier = 0.25; break;
        case '15d': multiplier = 0.5; break;
        case '30d': multiplier = 1; break;
        case '90d': multiplier = 3; break;
        case 'custom': multiplier = 1; break; // Default for demo
    }

    return {
        sales: STORE_DATA.baseKpis.sales * multiplier,
        orders: Math.round(STORE_DATA.baseKpis.orders * multiplier),
        newCustomers: Math.round(STORE_DATA.baseKpis.newCustomers * multiplier),
        recurringCustomers: Math.round(STORE_DATA.baseKpis.recurringCustomers * multiplier),
        cashbackGiven: STORE_DATA.baseKpis.cashbackGiven * multiplier,
        adBalance: STORE_DATA.baseKpis.adBalance // Balance doesn't typically scale with time range view
    };
  }, [dateRange]);

  const formatCurrency = (val: number) => 
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const filterOptions: { id: DateRange; label: string }[] = [
      { id: '7d', label: '7 dias' },
      { id: '15d', label: '15 dias' },
      { id: '30d', label: '30 dias' },
      { id: '90d', label: '90 dias' },
      { id: 'custom', label: 'Personalizado' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 font-sans animate-in slide-in-from-right duration-300">
      
      {/* --- HEADER --- */}
      <div className="bg-white dark:bg-gray-900 px-5 pt-12 pb-6 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <button 
            onClick={onBack}
            className="w-10 h-10 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-500 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Painel do Parceiro</span>
        </div>

        <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-gray-100 dark:border-gray-600 shadow-sm">
                <img src={STORE_DATA.logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
                <div className="flex items-center gap-1.5">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display leading-tight">
                        {STORE_DATA.name}
                    </h1>
                    {STORE_DATA.isVerified && <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-50 dark:fill-blue-900" />}
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Operação Ativa</p>
                </div>
            </div>
        </div>
      </div>

      <div className="p-5 space-y-8">
        
        {/* --- VISÃO GERAL & FILTROS --- */}
        <div>
            <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-base font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-[#2D6DF6]" />
                    Visão Geral
                </h2>
            </div>

            {/* Filter Scroll */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2 -mx-5 px-5">
                {filterOptions.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => setDateRange(opt.id)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                            dateRange === opt.id
                            ? 'bg-[#1E5BFF] text-white border-[#1E5BFF] shadow-md shadow-blue-500/20'
                            : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-gray-600'
                        }`}
                    >
                        {opt.id === 'custom' && <Calendar className="w-3 h-3 inline-block mr-1.5 -mt-0.5" />}
                        {opt.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <KPICard 
                    icon={DollarSign} 
                    label="Vendas Localizei" 
                    value={formatCurrency(currentKpis.sales)} 
                    color="bg-green-500"
                />
                <KPICard 
                    icon={ShoppingBag} 
                    label="Pedidos" 
                    value={currentKpis.orders.toString()} 
                    color="bg-blue-500"
                />
                <KPICard 
                    icon={Users} 
                    label="Novos Clientes" 
                    value={`+${currentKpis.newCustomers}`} 
                    color="bg-purple-500"
                />
                <KPICard 
                    icon={Repeat} 
                    label="Recorrentes" 
                    value={currentKpis.recurringCustomers.toString()} 
                    color="bg-[#1E5BFF]"
                />
                <KPICard 
                    icon={TrendingUp} 
                    label="Cashback Gerado" 
                    value={formatCurrency(currentKpis.cashbackGiven)} 
                    color="bg-[#1E5BFF]"
                />
                <KPICard 
                    icon={Wallet} 
                    label="Saldo Anúncios" 
                    value={formatCurrency(currentKpis.adBalance)} 
                    color="bg-gray-500"
                />
            </div>
        </div>

        {/* --- BLOCK: CASHBACK --- */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Cashback da Loja</h3>
                </div>
                
                {/* Toggle Switch */}
                <button 
                    onClick={() => setIsCashbackEnabled(!isCashbackEnabled)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isCashbackEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${isCashbackEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
            </div>

            <div className="flex gap-4 mb-4">
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Taxa atual</p>
                    <p className="font-bold text-gray-900 dark:text-white text-xl">5%</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Retorno</p>
                    <p className="font-bold text-green-600 text-xl">R$ 4,5k</p>
                </div>
            </div>

            <button 
                onClick={() => onNavigate && onNavigate('store_cashback_module')}
                className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
                Ver painel completo de fidelidade
            </button>
        </div>

        {/* --- BLOCK: ADS & HIGHLIGHTS --- */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                    <Megaphone className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Anúncios e Destaques</h3>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 mb-4 flex items-center justify-between">
                <div>
                    <p className="text-xs font-bold text-gray-800 dark:text-white">Campanha "Fim de Semana"</p>
                    <p className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Ativa agora
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Cliques</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">84</p>
                </div>
            </div>

            <button 
                onClick={() => onNavigate && onNavigate('store_ads_module')}
                className="w-full bg-[#1E5BFF] text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
            >
                Gerenciar campanhas
            </button>
        </div>

        {/* --- BLOCK: FREGUESIA CONNECT --- */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-5 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            
            <div className="flex justify-between items-start mb-2 relative z-10">
                <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <h3 className="font-bold">Freguesia Connect</h3>
                </div>
                {STORE_DATA.connectStatus === 'active' ? (
                    <span className="text-[10px] font-bold bg-green-500 text-white px-2 py-0.5 rounded-full">Membro</span>
                ) : (
                    <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">Não Membro</span>
                )}
            </div>

            <p className="text-sm text-indigo-100 mb-4 leading-relaxed relative z-10">
                Participe da maior rede de networking empresarial do bairro. Eventos, parcerias e descontos B2B.
            </p>

            <button 
                onClick={() => onNavigate && onNavigate('store_connect')}
                className="w-full bg-white text-indigo-600 py-3 rounded-xl text-sm font-bold shadow-sm active:scale-[0.98] transition-all relative z-10"
            >
                {STORE_DATA.connectStatus === 'active' ? 'Acessar Comunidade' : 'Quero participar'}
            </button>
        </div>

        {/* --- NAVIGATION LIST --- */}
        <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">
                Navegação Rápida
            </h3>
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                <MenuLink 
                    icon={LayoutDashboard} 
                    label="Home do Painel" 
                    onClick={() => onNavigate && onNavigate('store_area')}
                />
                <MenuLink 
                    icon={Settings} 
                    label="Minha Loja (Perfil Público)" 
                    onClick={() => onNavigate && onNavigate('store_profile')}
                />
                <MenuLink 
                    icon={CreditCard} 
                    label="Minha conta / Financeiro" 
                    onClick={() => onNavigate && onNavigate('store_finance')}
                />
                <MenuLink 
                    icon={HelpCircle} 
                    label="Suporte ao Lojista" 
                    onClick={() => onNavigate && onNavigate('store_support')}
                />
            </div>
        </div>

      </div>
    </div>
  );
};
