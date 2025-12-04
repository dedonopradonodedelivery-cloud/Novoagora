import React from "react";
import { MapPin, QrCode, Moon, User } from "lucide-react";

interface HeaderProps {
  onQrClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onQrClick }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-b-3xl shadow-md px-4 pt-6 pb-4 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-100" />
            <span className="text-xs uppercase tracking-wide text-blue-100">
              Localizei Freguesia
            </span>
          </div>
          <p className="text-sm font-semibold">Freguesia, RJ</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onQrClick}
            className="w-9 h-9 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center"
          >
            <QrCode className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
            <Moon className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl px-4 py-2 flex items-center gap-3 shadow-sm">
        <span className="text-gray-400 text-sm">Busque por lojas, serviços ou produtos</span>
      </div>
    </div>
  );
};
