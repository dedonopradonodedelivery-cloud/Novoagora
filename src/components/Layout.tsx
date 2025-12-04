import React from "react";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="flex-1 overflow-y-auto pb-24">{children}</div>
      <BottomNav active={activeTab} onChange={onTabChange} />
    </div>
  );
};
