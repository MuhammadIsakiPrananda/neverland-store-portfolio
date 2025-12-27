import React from 'react';
import { Star } from 'lucide-react';

/**
 * Premium Badge Component
 * Enhanced trust indicator with animations and glow
 */
const PremiumBadge = () => (
  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500/10 via-lime-500/10 to-emerald-500/10 border border-emerald-400/30 rounded-full backdrop-blur-md shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105 animate-fade-in-up relative overflow-hidden group">
    {/* Shimmer effect */}
    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    
    <Star className="w-4 h-4 text-emerald-400 fill-emerald-400 animate-pulse-slow relative z-10" />
    <span className="text-sm font-bold bg-gradient-to-r from-emerald-600 via-lime-600 to-emerald-600 bg-clip-text text-transparent relative z-10">
      Premium Quality ✨
    </span>
  </div>
);

export default PremiumBadge;
