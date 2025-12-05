import React from 'react';
import { Home, Search, Wrench, User, QrCode } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole?: 'cliente' | 'lojista' | null;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, userRole }) => {
  const isMerchant = userRole === 'lojista';

  const navItems = isMerchant 
    ? [
        { id: 'home', icon: Home, label: 'Início' },
        { id: 'explore', icon: Search, label: 'Explorar' },
        { id: 'merchant_qr', icon: QrCode, label: 'Meu QR', isSpecial: true },
        { id: 'services', icon: Wrench, label: 'Serviços' },
        { id: 'profile', icon: User, label: 'Menu' },
      ]
    : [
        { id: 'home', icon: Home, label: 'Início' },
        { id: 'explore', icon: Search, label: 'Explorar' },
        { id: 'services', icon: Wrench, label: 'Serviços' },
        { id: 'profile', icon: User, label: 'Perfil' },
      ];

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md bg-gradient-to-r from-[#2D6DF6] to-[#1B54D9] z-50 h-[64px] shadow-[0_-4px_30px_rgba(45,109,246,0.15)] rounded-t-[22px]">
      <div className="flex items-center justify-between h-full w-full px-2">
        {navItems.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          const isSpecial = (tab as any).isSpecial;

          if (isSpecial) {
              return (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 h-full flex items-center justify-center outline-none group -mt-6"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#2D6DF6] relative z-10 active:scale-90 transition-transform">
                        <Icon className="w-7 h-7 text-[#2D6DF6]" />
                    </div>
                </button>
              );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 h-full flex items-center justify-center outline-none group"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <div 
                className={`
                  flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                  ${isActive 
                    ? 'bg-white/20 text-white shadow-[0_0_12px_rgba(255,255,255,0.35)] border border-white/20 scale-105' 
                    : 'text-white/70 hover:text-white hover:bg-white/10 scale-100 border border-transparent'
                  }
                  group-active:scale-90
                `}
              >
                <Icon 
                  className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'drop-shadow-sm' : ''}`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                
                {isActive && !isMerchant && (
                  <span className="text-xs font-bold leading-none whitespace-nowrap">
                    {tab.label}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};