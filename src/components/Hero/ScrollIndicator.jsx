import React from 'react';

/**
 * Scroll Indicator Component
 * Enhanced animated scroll indicator with smooth bounce
 */
const ScrollIndicator = () => (
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3 animate-bounce-slow group cursor-pointer">
    <span className="text-xs font-semibold text-slate-400 group-hover:text-emerald-400 transition-colors uppercase tracking-wider">Scroll Down</span>
    <div className="relative w-7 h-11 border-2 border-emerald-400/30 group-hover:border-emerald-400/60 rounded-full p-1.5 backdrop-blur-sm transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/30">
      {/* Animated scroll dot */}
      <div className="w-2 h-2 bg-gradient-to-b from-emerald-400 to-lime-400 rounded-full animate-scroll-smooth shadow-lg shadow-emerald-500/50"></div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-emerald-500/20 to-lime-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
    </div>
  </div>
);

export default ScrollIndicator;
