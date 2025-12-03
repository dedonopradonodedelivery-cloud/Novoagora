import React, { ReactNode } from 'react';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-28 font-sans w-full max-w-md border-x border-gray-100 dark:border-gray-800 shadow-2xl transition-colors duration-300 relative">
        {children}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};