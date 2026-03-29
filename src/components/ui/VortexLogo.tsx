import React from "react";

export const VortexLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 500 500" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0L200 400L250 500L300 400L500 0H400L250 300L100 0H0Z" />
    <path d="M250 350L220 300L250 360L280 300L250 350Z" opacity="0.5" />
  </svg>
);
