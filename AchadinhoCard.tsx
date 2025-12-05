import React from "react";
import { IMAGE_BASES } from "../../config/images";

interface AchadinhoCardProps {
  name: string;
  reason: string;
}

const AchadinhoCard: React.FC<AchadinhoCardProps> = ({ name, reason }) => {
  return (
    <div className="min-w-[160px] max-w-[160px] rounded-premium bg-white dark:bg-gray-800 shadow-light border border-gray-100 dark:border-gray-700 overflow-hidden flex-shrink-0 cursor-pointer active:scale-95 transition-transform">
      <div className="h-24 bg-gray-200 dark:bg-gray-700 w-full relative">
        <img
          src={`${IMAGE_BASES.store}${name}`}
          alt={name}
          width={300}
          height={200}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{reason}</p>
      </div>
    </div>
  );
};

export default AchadinhoCard;
