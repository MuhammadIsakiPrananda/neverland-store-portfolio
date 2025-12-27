import React from 'react';
import PropTypes from 'prop-types';
import { Star, TrendingUp } from 'lucide-react';

/**
 * Game Badge Component - ULTRA MODERN
 * Displays POPULAR or TRENDING badge with advanced animations and 3D effects
 */
const GameBadge = ({ type, className = '' }) => {
  if (type === 'popular') {
    return (
      <div className={`group/badge relative ${className}`}>
        {/* Animated glow background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-full blur-md opacity-60 group-hover/badge:opacity-100 animate-pulse" />
        
        {/* Badge content */}
        <div className="relative bg-gradient-to-r from-emerald-600 via-lime-600 to-emerald-600 bg-[length:200%_100%] text-white text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg shadow-emerald-500/40 border border-white/20 animate-scale-in group-hover/badge:scale-110 transition-transform duration-300">
          <Star size={12} className="fill-current animate-pulse" />
          <span className="tracking-wide">POPULAR</span>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover/badge:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (type === 'trending') {
    return (
      <div className={`group/badge relative ${className}`} style={{ animationDelay: '0.1s' }}>
        {/* Animated glow background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-md opacity-60 group-hover/badge:opacity-100 animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Badge content */}
        <div className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 bg-[length:200%_100%] text-white text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg shadow-emerald-500/40 border border-white/20 animate-scale-in group-hover/badge:scale-110 transition-transform duration-300">
          <TrendingUp size={12} className="group-hover/badge:rotate-12 transition-transform duration-300" />
          <span className="tracking-wide">TRENDING</span>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover/badge:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return null;
};

GameBadge.propTypes = {
  type: PropTypes.oneOf(['popular', 'trending']),
  className: PropTypes.string,
};

export default GameBadge;
