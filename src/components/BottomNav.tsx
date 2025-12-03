
import React from 'react';
import { Home, Search, Wrench, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'explore', icon: Search, label: 'Explorar' },
    { id: 'services', icon: Wrench, label: 'Serviços' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md bg-gradient-to-r from-[#FF6501] to-[#FF7A00] z-50 h-[64px] shadow-[0_-4px_30px_rgba(255,101,1,0.15)] rounded-t-[22px]">
      <div className="flex items-center justify-between h-full w-full px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

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
                
                {isActive && (
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