import React from 'react';
import PropTypes from 'prop-types';
import FlashSaleCountdown from '../FlashSale/FlashSaleCountdown';
import { Flame, Sparkles } from 'lucide-react';

/**
 * Flash Sale Banner Component - ULTRA MODERN
 * Premium flash sale with enhanced 3D cards and animations
 */
const FlashSaleBanner = ({ endTime, saleGames }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 via-white to-lime-50/30 relative overflow-hidden border-y-4 border-emerald-400/50">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl bottom-0 left-0 animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-lime-300/20 rounded-full blur-3xl top-0 right-0 animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute w-72 h-72 bg-emerald-300/20 rounded-full blur-2xl top-1/2 left-1/2 animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Flash Sale Countdown */}
        <FlashSaleCountdown endTime={endTime} />

        {/* Hot Deals Grid */}
        {saleGames && saleGames.length > 0 && (
          <div className="mt-10">
            {/* Enhanced Header */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="relative">
                <Flame className="w-8 h-8 text-emerald-600 fill-emerald-600 animate-pulse" />
                <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-50" />
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-600 via-lime-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-sm">
                Hot Deals
              </h3>
              
              <Sparkles className="w-6 h-6 text-lime-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Premium Game Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {saleGames.map((game, index) => (
                <div
                  key={game.id}
                  className="group relative bg-gradient-to-br from-white via-emerald-50/20 to-white border-2 border-emerald-200/60 rounded-3xl overflow-hidden cursor-pointer hover:border-emerald-500 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/30 backdrop-blur-xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* 3D Discount Badge */}
                  <div className="absolute top-3 right-3 z-20">
                    <div className="relative">
                      {/* Glow behind badge */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-lime-500 rounded-2xl blur-md opacity-75" />
                      
                      {/* Badge */}
                      <span className="relative block bg-gradient-to-r from-emerald-600 via-lime-500 to-emerald-600 text-white text-xs font-black px-3 py-2 rounded-2xl shadow-2xl shadow-emerald-500/50 border border-emerald-300/30">
                        -{game.discount}%
                      </span>
                    </div>
                  </div>

                  {/* Image with enhanced overlay */}
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Multi-layer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Shimmer sweep */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent" />
                    
                    {/* Glow effect on edges */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 border-4 border-emerald-400/50 rounded-t-3xl blur-sm" />
                    </div>
                  </div>

                  {/* Enhanced Info Section */}
                  <div className="p-4 bg-gradient-to-br from-white via-emerald-50/30 to-white">
                    <h4 className="font-bold text-gray-900 text-sm mb-3 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                      {game.name}
                    </h4>
                    
                    {/* Premium Price Display */}
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-gray-400 line-through text-xs">
                          Rp {game.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      
                      {/* Animated Sale Price */}
                      <div className="relative inline-block">
                        <span className="text-emerald-600 font-black text-lg group-hover:scale-110 inline-block transition-transform">
                          Rp {game.salePrice.toLocaleString()}
                        </span>
                        
                        {/* Shine effect on price */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Card glow effect on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/0 via-lime-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:via-lime-500/10 group-hover:to-emerald-500/10 transition-all duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

FlashSaleBanner.propTypes = {
  endTime: PropTypes.string.isRequired,
  saleGames: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    discount: PropTypes.number.isRequired,
    originalPrice: PropTypes.number.isRequired,
    salePrice: PropTypes.number.isRequired,
  })),
};

export default FlashSaleBanner;
