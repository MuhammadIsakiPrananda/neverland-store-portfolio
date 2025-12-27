
import React from 'react';
import PropTypes from 'prop-types';
import { Flame, Star, Sparkles, TrendingUp, Grid } from 'lucide-react';

/**
 * Filter Controls Component - Clean & Elegant
 * Simple, modern category filter buttons with subtle interactions
 */

const FILTER_ICONS = {
  All: <Grid className="w-4 h-4" />,
  Popular: <Star className="w-4 h-4 fill-current" />,
  New: <Sparkles className="w-4 h-4" />,
  Trending: <TrendingUp className="w-4 h-4" />,
};

const FilterControls = ({ activeFilter, onFilterChange, categories = [], counts = {} }) => {
  // Support both string and object categories
  const defaultFilters = ['All', 'Popular', 'New', 'Trending'];
  const filters = categories.length > 0 ? categories : defaultFilters;

  return (
    <nav className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mb-2 min-w-0" aria-label="Game filters" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {filters.map((filter) => {
        // If filter is an object, use its name and icon
        const isObj = typeof filter === 'object' && filter !== null;
        const key = isObj ? filter.id || filter.name : filter;
        const name = isObj ? filter.name : filter;
        const icon = isObj ? filter.icon : FILTER_ICONS[name] || <Flame className="w-4 h-4" />;
        const isActive = activeFilter === name;
        
        return (
          <button
            key={key}
            onClick={() => onFilterChange(name)}
            className={`group flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 whitespace-nowrap snap-start flex-shrink-0 min-h-[44px] sm:min-h-0 ${
              isActive
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300'
            }`}
            aria-pressed={isActive}
          >
            {/* Icon */}
            <span className={`${isActive ? 'text-white' : 'text-emerald-600'}`}>
              {icon}
            </span>
            
            {/* Label */}
            <span className="text-sm sm:text-base">{name}</span>
            
            {/* Count badge */}
            {typeof counts[name] === 'number' && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {counts[name]}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};


FilterControls.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  categories: PropTypes.array,
  counts: PropTypes.object,
};

export default FilterControls;
