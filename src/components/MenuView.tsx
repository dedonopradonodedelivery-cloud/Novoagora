
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
  Briefcase
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

  const handleLogout = async () => {
    try {
      await auth.signOut();
      onNavigate('home');
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 animate-in fade-in duration-300">
      
      {/* 1) Header - Fixo (Sticky), Z-index alto, padding ajustado */}
      <div className="bg-white dark:bg-gray-900 px-5 pt-10 pb-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display mb-0.5">Menu</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Configurações e Atalhos</p>
      </div>

      <div className="px-5 pb-5">
        
        {/* 2) Card de Perfil do Usuário */}
        <div 
          onClick={() => user ? onNavigate('edit_profile') : onAuthClick()}
          className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-transform mb-4"
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
                {user ? (user.displayName || 'Usuário Localizei') : 'Entrar na conta'}
            </h3>
            <p className="text-xs text-primary-500 font-bold mt-0.5 flex items-center gap-1">
                {user ? 'Ver meu perfil completo' : 'Clique para fazer login'}
                <ChevronRight className="w-3 h-3" />
            </p>
          </div>
        </div>

        {/* 3) Merchant Area (Conditional) */}
        {user && isMerchant ? (
            <button 
                onClick={() => onNavigate('store_area')}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-4 rounded-2xl shadow-md shadow-indigo-500/20 flex items-center justify-between group active:scale-[0.98] transition-transform mb-6"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-white/20 text-white">
                        <Store className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-white text-sm">Área do Lojista</h3>
                        <p className="text-xs text-indigo-100">Acesse seu painel</p>
                    </div>
                </div>
                <ChevronRight className="w-5 h-5 text-indigo-200 group-hover:text-white transition-colors" />
            </button>
        ) : user && (
            <button 
                onClick={() => onNavigate('business_registration')}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-2xl shadow-md shadow-orange-500/20 flex items-center justify-between group active:scale-[0.98] transition-transform mb-6"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-white/20 text-white">
                        <Briefcase className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-white text-sm">Cadastrar meu negócio</h3>
                        <p className="text-xs text-orange-100">Sou lojista na Freguesia</p>
                    </div>
                </div>
                <ChevronRight className="w-5 h-5 text-orange-200 group-hover:text-white transition-colors" />
            </button>
        )}

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
            onClick={() => onNavigate('cashback')} 
            colorClass="bg-yellow-500" 
            subLabel="Acompanhe seu saldo e ganhos"
        />

        {/* 5) Seção Comunidade & Suporte */}
        <SectionTitle title="Comunidade & Suporte" />
        
        {/* Item Exclusivo para Lojistas */}
        {user && isMerchant && (
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
        
        {/* Patrocinador Master Banner - Using Reusable Component */}
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
        {user && (
            <div className="mt-8">
                <button 
                    onClick={handleLogout}
                    className="w-full p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-100 dark:border-red-900/30"
                >
                    <LogOut className="w-4 h-4" />
                    Sair do aplicativo
                </button>
            </div>
        )}

        {/* Version Info */}
        <div className="text-center pt-8 pb-4">
            <p className="text-[10px] text-gray-400">Localizei Freguesia v1.0.4</p>
        </div>

      </div>
    </div>
  );
};
