
import React from 'react';
import { Home, Search, Wrench, User, QrCode } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole?: 'cliente' | 'lojista' | null;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, userRole }) => {
  const isMerchant = userRole === 'lojista';

  // Base tabs
  const tabs = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'explore', icon: Search, label: 'Explorar' },
    // If merchant, insert QR code in the middle, remove 'services' or just add as 5th?
    // Let's replace 'services' or add it. For better UX, 5 items is fine.
    ...(isMerchant 
        ? [{ id: 'merchant_qr', icon: QrCode, label: 'Ler QR', isSpecial: true }] 
        : [{ id: 'services', icon: Wrench, label: 'Serviços' }]
    ),
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  // If merchant, we might want to keep Services accessible? 
  // Let's stick to the prompt: "Include a QR Code icon in the footer".
  // A common pattern for merchant apps is: Home, Orders, [QR], Finance, Profile.
  // Preserving existing structure but injecting QR for merchants.
  
  if (isMerchant) {
      // Re-organize for merchant view if needed, or just insert the special button
      // Current: Home, Explore, [QR], Profile. (Removing Services for Merchant to make space, assuming merchants focus on their store)
      // Or we can have 5 items: Home, Explore, QR, Services, Profile.
      // Let's use 5 items for Merchant to keep access to everything.
      tabs.splice(2, 0, { id: 'services', icon: Wrench, label: 'Serviços' });
      // Remove the one we just added in the conditional above to avoid dupes if logic gets complex, 
      // but simpler:
      // Client: Home, Explore, Services, Profile
      // Merchant: Home, Explore, QR (Highlight), Services, Profile
  }

  // Redefine tabs list cleanly based on role
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
