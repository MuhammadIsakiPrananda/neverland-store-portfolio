import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Top Banner Component
 * Displays promotional message at the top of the header
 */
const TopBanner = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-600 via-lime-500 to-emerald-600 text-white py-2.5 px-4 text-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2 text-sm font-medium">
        <Sparkles className="w-4 h-4 animate-pulse" />
        <span>🎮 New Year Sale - Up to 50% OFF on all games! Limited time only</span>
        <Sparkles className="w-4 h-4 animate-pulse" />
      </div>
    </div>
  );
};

export default TopBanner;
