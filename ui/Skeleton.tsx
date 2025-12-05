import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = "", ...props }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`} 
      {...props} 
    />
  );
};

export default Skeleton;