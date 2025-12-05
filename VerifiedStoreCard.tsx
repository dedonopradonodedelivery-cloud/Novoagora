import React from "react";
import { BadgeCheck } from "lucide-react";
import { IMAGE_BASES } from "../../config/images";

interface VerifiedStoreCardProps {
  name: string;
  category?: string;
}

const VerifiedStoreCard: React.FC<VerifiedStoreCardProps> = ({ name, category = "Loja Oficial" }) => {
  return (
    <div className="min-w-[140px] max-w-[140px] rounded-premium bg-white dark:bg-gray-800 shadow-light border border-gray-100 dark:border-gray-700 overflow-hidden flex-shrink-0 cursor-pointer active:scale-95 transition-transform group">
      <div className="h-24 bg-gray-200 dark:bg-gray-700 w-full relative">
        <img
          src={`${IMAGE_BASES.business}${name}`}
          width={300}
          height={200}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={name}
          loading="lazy"
        />
        <div className="absolute top-1.5 right-1.5 z-10 bg-white dark:bg-gray-900 rounded-full p-[1px]">
            <BadgeCheck className="w-4 h-4 text-[#1E5BFF] fill-blue-50 dark:fill-blue-900/30" />
        </div>
      </div>
      <div className="p-3">
        <p className="text-xs font-bold truncate text-gray-900 dark:text-gray-100 mb-0.5">
          {name}
        </p>
        <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
            {category}
        </p>
      </div>
    </div>
  );
};

export default VerifiedStoreCard;
