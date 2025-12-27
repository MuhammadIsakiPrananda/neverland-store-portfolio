import React from 'react';
import PropTypes from 'prop-types';
import GameBadge from './GameBadge';
import GameStats from './GameStats';
import { ArrowRight } from 'lucide-react';

/**
 * GameCard Component - Modern & Clean
 * Soft, professional game card with subtle animations and modern design
 */
const GameCard = ({ game, onClick, onGameSelect }) => {
  const handleClick = () => {
    if (onGameSelect) {
      onGameSelect(game);
    } else if (onClick) {
      onClick(game);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative w-full flex flex-col h-full"
      style={{ minWidth: 0 }}
    >
      {/* Card Container */}
      <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-300 transition-all duration-300 hover:shadow-lg w-full flex flex-col h-full">
        
        {/* Game Image */}
        <div className="relative aspect-square overflow-hidden flex-shrink-0">
          <img
            src={game.image}
            alt={game.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
            {game.popular && <GameBadge type="popular" />}
            {game.trending && <GameBadge type="trending" />}
          </div>
          
          {/* "NEW" indicator */}
          {game.isNew && (
            <div className="absolute top-3 right-3 z-20">
              <span className="inline-flex bg-gradient-to-r from-emerald-500 to-lime-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md">
                NEW
              </span>
            </div>
          )}
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Card Content */}
        <div className="p-4 flex flex-col gap-2.5 flex-grow">
          {/* Title & Category */}
          <div className="flex items-start gap-2">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-1 group-hover:text-emerald-600 transition-colors duration-200 flex-1 min-w-0">
              {game.name}
            </h3>
            <span className="flex-shrink-0 text-[10px] sm:text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap">
              {game.category}
            </span>
          </div>
          
          {/* Description */}
          <div className="min-h-[32px] sm:min-h-[36px]">
            <p className="text-gray-600 text-[11px] sm:text-xs line-clamp-2">
              {game.description}
            </p>
          </div>
          
          {/* Tags */}
          <div className="min-h-[24px]">
            {game.tags && game.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {game.tags.slice(0, 3).map((tag, i) => (
                  <span 
                    key={i} 
                    className="bg-gray-100 text-gray-700 text-[9px] sm:text-[10px] px-2 py-1 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Stats */}
          <div className="h-6 flex items-center">
            <GameStats rating={game.rating} players={game.players} />
          </div>
          
          {/* Spacer */}
          <div className="flex-grow" />
          
          {/* Action Button */}
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              handleClick();
            }}
            className="mt-2 w-full px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] min-h-[44px] sm:min-h-0 flex items-center justify-center gap-2 group/btn"
          >
            <span>Top Up Now</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    players: PropTypes.string,
    badge: PropTypes.string,
    isNew: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func,
  onGameSelect: PropTypes.func,
};

export default GameCard;
