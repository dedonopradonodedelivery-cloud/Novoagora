
import React from 'react';

interface CashbackIconProps {
  className?: string;
}

export const CashbackIcon: React.FC<CashbackIconProps> = ({ className = "w-24 h-24" }) => {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      <svg 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          <linearGradient id="coinGrad" x1="20" y1="0" x2="180" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2D6DF6" />
            <stop offset="100%" stopColor="#1B54D9" />
          </linearGradient>
          <linearGradient id="coinGradLight" x1="20" y1="0" x2="180" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5E92FF" />
            <stop offset="100%" stopColor="#2D6DF6" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Back Coin - Floats with delay */}
        <g className="animate-float-delayed origin-center">
          <circle cx="75" cy="100" r="55" fill="url(#coinGrad)" />
          <circle cx="75" cy="100" r="48" stroke="white" strokeOpacity="0.15" strokeWidth="2" />
          <path d="M75 100 L 90 85" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
        </g>

        {/* Front Coin - Floats and has the Symbol */}
        <g className="animate-float origin-center">
          {/* Main Body */}
          <circle cx="125" cy="110" r="60" fill="url(#coinGradLight)" className="shadow-2xl" />
          
          {/* Glossy Reflection */}
          <ellipse cx="125" cy="80" rx="40" ry="25" fill="white" fillOpacity="0.12" />
          
          {/* Dotted Edge */}
          <circle cx="125" cy="110" r="52" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3 3" />
          
          {/* Embossed Pin Symbol */}
          <g transform="translate(125, 110) scale(1.2) translate(-12, -12)">
             {/* Pin Shape */}
             <path 
               d="M12 0C7.58 0 4 3.58 4 8C4 14 12 22 12 22C12 22 20 14 20 8C20 3.58 16.42 0 12 0ZM12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11Z" 
               fill="white" 
               fillOpacity="0.9"
               filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.1))"
             />
          </g>
        </g>
      </svg>
    </div>
  );
};