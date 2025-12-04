import React from "react";
import { Home, Search, Percent, User } from "lucide-react";

interface BottomNavProps {
  active: string;
  onChange: (tab: string) => void;
}

const tabs = [
  { id: "home", label: "Início", icon: Home },
  { id: "explore", label: "Explorar", icon: Search },
  { id: "cashback", label: "Cashback", icon: Percent },
  { id: "profile", label: "Perfil", icon: User },
];

export const BottomNav: React.FC<BottomNavProps> = ({ active, onChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-md mx-auto flex justify-between px-6 py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex flex-col items-center gap-1 text-xs font-medium transition-all ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "bg-transparent"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
