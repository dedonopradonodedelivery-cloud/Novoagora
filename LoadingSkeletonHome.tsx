import React from "react";
import Skeleton from "../ui/Skeleton";

const LoadingSkeletonHome = () => {
  return (
    <div className="px-5 py-3 flex flex-col gap-6">
      
      <Skeleton className="h-9 w-40" /> {/* Header title */}
      <Skeleton className="h-11 w-full rounded-full" /> {/* Search */}

      {/* Stories */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="w-16 h-16 rounded-full flex-shrink-0" />
        ))}
      </div>

      {/* Categorias */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="w-16 h-16 rounded-2xl flex-shrink-0" />
        ))}
      </div>

      {/* Achadinhos */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-[160px] h-40 rounded-xl flex-shrink-0" />
        ))}
      </div>

      {/* Verificadas */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-[140px] h-36 rounded-xl flex-shrink-0" />
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeletonHome;