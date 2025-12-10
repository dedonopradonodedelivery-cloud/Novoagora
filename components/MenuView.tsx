
import React from 'react';
import { 
  User as UserIcon, 
  ChevronRight, 
  Heart, 
  Coins, 
  Share2, 
  Headphones, 
  Info, 
  LogOut, 
  Store, 
  Users,
  Clock
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { MasterSponsorBanner } from './MasterSponsorBanner';

interface MenuViewProps {
  user: any;
  userRole: 'cliente' | 'lojista' | null;
  onAuthClick: () => void;
  onNavigate: (view: string) => void;
}

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  colorClass: string;
  subLabel?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, onClick, colorClass, subLabel }) => (
  <button 
    onClick={onClick}
    className="w-full bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between group active:scale-[0.98] transition-transform mb-3"
  >
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass} bg-opacity-10 dark:bg-opacity-20`}>
        <Icon className={`w-5 h-5 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
      <div className="text-left">
        <span className="block font-semibold text-gray-800 dark:text-gray-100 text-sm">{label}</span>
        {subLabel && <span className="block text-xs text-gray-400 mt-0.5">{subLabel}</span>}
      </div>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors" />
  </button>
);

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-1 mt-6">
    {title}
  </h3>
);

export const MenuView: React.FC<MenuViewProps> = ({ user, userRole, onAuthClick, onNavigate }) => {
  const isMerchant = userRole === 'lojista';
  // Mock para simulação de status pendente se necessário no futuro
  // const isPending = userRole === 'pending'; 

  const handleLogout = async () => {
    try {
      await auth.signOut();
      onNavigate('home');
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  // --- GUEST VIEW (Not Authenticated) ---
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans animate-in slide-in-from-right duration-300 flex flex-col">
        
        {/* Header Simples */}
        <div className="bg-white dark:bg-gray-900 px-5 pt-10 pb-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Perfil</h2>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 pb-28 text-center">
          
          <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-gray-100 dark:border-gray-700 transform -rotate-6">
             <UserIcon className="w-10 h-10 text-[#1E5BFF]" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Entre na sua conta
          </h2>
          
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-10 max-w-[260px] leading-relaxed font-medium">
            Faça login para acessar seus favoritos, cashback e acompanhar sua experiência no Localizei Freguesia.
          </p>

          <div className="w-full space-y-4">
            <button 
                onClick={onAuthClick}
                className="w-full bg-[#1E5BFF] hover:bg-[#1749CC] text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
                Entrar ou criar conta
                <ChevronRight className="w-5 h-5 opacity-80" />
            </button>
          </div>

        </div>
      </div>
    );
  }

  // --- LOGGED IN VIEW ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 animate-in fade-in duration-300">
      
      {/* 1) Header - Fixo (Sticky) */}
      <div className="bg-white dark:bg-gray-900 px-5 pt-10 pb-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display mb-0.5">Menu</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Configurações e Atalhos</p>
      </div>

      <div className="px-5 pb-5">
        
        {/* 2) Card de Perfil do Usuário (Cabeçalho) */}
        <div 
          onClick={() => onNavigate('edit_profile')}
          className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-transform mb-6"
        >
          <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-white dark:border-gray-600 shadow-sm">
            {user?.photoURL ? (
               <img src={user.photoURL} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
               <UserIcon className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
                {user.displayName || 'Usuário Localizei'}
            </h3>
            <p className="text-xs text-primary-500 font-bold mt-0.5 flex items-center gap-1">
                Ver meu perfil completo
                <ChevronRight className="w-3 h-3" />
            </p>
          </div>
        </div>

        {/* 3) Merchant Area (Only if Merchant) */}
        {isMerchant && (
            <button 
                onClick={() => onNavigate('store_area')}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-4 rounded-2xl shadow-md shadow-indigo-500/20 flex items-center justify-between group active:scale-[0.98] transition-transform mb-6"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-white/20 text-white">
                        <Store className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-white text-sm">Painel do Lojista</h3>
                        <p className="text-xs text-indigo-100">Gerenciar minha loja</p>
                    </div>
                </div>
                <ChevronRight className="w-5 h-5 text-indigo-200 group-hover:text-white transition-colors" />
            </button>
        )}

        {/* Simulando estado de aprovação, caso existisse a prop 'pending' ou similar */}
        {/* 
        {userRole === 'pending' && (
            <div className="w-full bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-2xl border border-yellow-200 dark:border-yellow-800 flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <div>
                    <h3 className="font-bold text-yellow-800 dark:text-yellow-200 text-sm">Aprovação em Análise</h3>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">Seu cadastro de lojista está sendo verificado.</p>
                </div>
            </div>
        )} 
        */}

        {/* 4) Seção Minha Conta */}
        <SectionTitle title="Minha Conta" />
        <MenuItem 
            icon={Heart} 
            label="Favoritos" 
            onClick={() => onNavigate('favorites')} 
            colorClass="bg-red-500" 
            subLabel="Lojas que você salvou"
        />
        <MenuItem 
            icon={Coins} 
            label="Cashback" 
            onClick={() => onNavigate('user_cashback_flow')} 
            colorClass="bg-[#1E5BFF]" 
            subLabel="Acompanhe seu saldo e ganhos"
        />

        {/* 5) Seção Comunidade & Suporte */}
        <SectionTitle title="Comunidade & Suporte" />
        
        {/* Item Exclusivo para Lojistas */}
        {isMerchant && (
             <MenuItem 
                icon={Users} 
                label="Freguesia Connect" 
                onClick={() => onNavigate('freguesia_connect_dashboard')} 
                colorClass="bg-indigo-500" 
                subLabel="Rede de negócios da Freguesia"
            />
        )}

        <MenuItem 
            icon={Share2} 
            label="Indique um amigo" 
            onClick={() => onNavigate('invite_friend')} 
            colorClass="bg-green-500"
            subLabel="Convide amigos para usar o Localizei"
        />
        <MenuItem 
            icon={Headphones} 
            label="Suporte" 
            onClick={() => onNavigate('support')} 
            colorClass="bg-blue-500" 
            subLabel="Fale com a nossa equipe"
        />

        {/* 6) Seção Parceiros & Publicidade */}
        <SectionTitle title="Parceiros & Publicidade" />
        
        {/* Patrocinador Master Banner */}
        <MasterSponsorBanner 
            onClick={() => onNavigate('patrocinador_master')}
            className="mb-4"
        />

        {/* 7) Seção Institucional */}
        <SectionTitle title="Institucional" />
        <MenuItem 
            icon={Info} 
            label="Sobre a Localizei" 
            onClick={() => onNavigate('about')} 
            colorClass="bg-gray-500" 
        />

        {/* 8) Logout Button */}
        <div className="mt-8">
            <button 
                onClick={handleLogout}
                className="w-full p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-100 dark:border-red-900/30"
            >
                <LogOut className="w-4 h-4" />
                Sair do aplicativo
            </button>
        </div>

        {/* Version Info */}
        <div className="text-center pt-8 pb-4">
            <p className="text-[10px] text-gray-400">Localizei Freguesia v1.0.5</p>
        </div>

      </div>
    </div>
  );
};
