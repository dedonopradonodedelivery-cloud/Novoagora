
import React from 'react';
import { 
  Info, 
  Coins, 
  Users, 
  Headphones, 
  ShoppingBag, 
  Heart, 
  Share2, 
  Search, 
  Megaphone, 
  Crown, 
  ChevronRight,
  LogOut,
  UserCircle,
  Store
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { MasterSponsorBanner } from './MasterSponsorBanner';

interface MenuViewProps {
  user: any;
  onAuthClick: () => void;
  onNavigate: (view: string) => void;
}

export const MenuView: React.FC<MenuViewProps> = ({ user, onAuthClick, onNavigate }) => {
  
  const menuGroups = [
    {
      title: "Minha Conta",
      items: [
        { label: "Meus pedidos", icon: ShoppingBag, color: "text-blue-500" },
        { label: "Favoritos", icon: Heart, color: "text-red-500" },
        { label: "Buscas salvas", icon: Search, color: "text-purple-500" },
        { label: "Cashback", icon: Coins, color: "text-yellow-500" },
      ]
    },
    {
      title: "Comunidade & Suporte",
      items: [
        { label: "Freguesia Connect", icon: Users, color: "text-indigo-500" },
        { label: "Indique um amigo", icon: Share2, color: "text-green-500" },
        { label: "Suporte", icon: Headphones, color: "text-gray-600" },
      ]
    },
    {
      title: "Parceiros & Publicidade",
      items: [
        { label: "Sobre o ADS / Patrocinado", icon: Megaphone, color: "text-orange-500" },
        { label: "Diferença: Básico vs Pro", icon: Crown, color: "text-yellow-600" },
      ]
    },
    {
      title: "Institucional",
      items: [
        { label: "Sobre a Localizei", icon: Info, color: "text-primary-500" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 px-5 pt-8 pb-6 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display mb-1">Menu</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Configurações e Atalhos</p>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Patrocinador Master */}
        <MasterSponsorBanner />

        {/* User Profile Card */}
        <div 
          onClick={onAuthClick}
          className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-primary-100 dark:border-primary-900">
            {user?.photoURL ? (
               <img src={user.photoURL} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
               <UserCircle className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                {user ? (user.displayName || 'Usuário Localizei') : 'Entrar na conta'}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
                {user ? 'Ver meu perfil completo' : 'Clique para fazer login'}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>

        {/* Shopkeeper Area Button */}
        <button 
            onClick={() => onNavigate('store_area')}
            className="w-full bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 p-4 rounded-2xl shadow-md flex items-center justify-between group active:scale-[0.98] transition-transform"
        >
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-white/10 text-white">
                    <Store className="w-6 h-6" />
                </div>
                <div className="text-left">
                    <h3 className="font-bold text-white">Área do Lojista</h3>
                    <p className="text-xs text-gray-400">Acesse seu painel</p>
                </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
        </button>

        {/* Menu Groups */}
        {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx}>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">
                    {group.title}
                </h3>
                <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                    {group.items.map((item, idx) => (
                        <div key={idx}>
                            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl bg-gray-50 dark:bg-gray-700/50 group-hover:bg-white dark:group-hover:bg-gray-600 transition-colors ${item.color}`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                        {item.label}
                                    </span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary-500 transition-colors" />
                            </button>
                            {/* Divider if not last item */}
                            {idx < group.items.length - 1 && (
                                <div className="h-px w-full bg-gray-50 dark:bg-gray-700 ml-16"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ))}

        {/* Logout Button (if logged in) */}
        {user && (
            <button 
                onClick={() => auth.signOut()}
                className="w-full p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
                <LogOut className="w-4 h-4" />
                Sair do aplicativo
            </button>
        )}

        {/* Version Info */}
        <div className="text-center pt-4 pb-8">
            <p className="text-[10px] text-gray-400">Localizei Freguesia v16.0.0</p>
            <p className="text-[10px] text-gray-300 mt-1">Feito com ❤️ na Freguesia</p>
        </div>

      </div>
    </div>
  );
};
