import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SectionHeader from '../../Common/SectionHeader';
import FilterControls from './FilterControls';
import SortByDropdown from './SortByDropdown';
import GameCard from './GameCard';
import NoGamesFound from './NoGamesFound';

const sortFunctions = {
  popular: (a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0),
  rating: (a, b) => b.rating - a.rating,
  name: (a, b) => a.name.localeCompare(b.name),
};

/**
 * GameList Component - Fully Modularized
 * Displays filterable and sortable list of games
 */
const GameList = ({ games, onGameSelect, categories }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  // Filter games by category
  let processedGames;
  // Support both string and object categories (with id/name)
  const filterVal = (typeof activeFilter === 'object' && activeFilter !== null)
    ? (activeFilter.id || activeFilter.name)
    : activeFilter;

  if (
    filterVal.toLowerCase() === 'all' ||
    filterVal.toLowerCase() === 'all games'
  ) {
    processedGames = games;
  } else if (filterVal === 'Popular') {
    processedGames = games.filter(game => game.popular);
  } else if (filterVal === 'Trending') {
    processedGames = games.filter(game => game.trending);
  } else if (filterVal === 'New') {
    processedGames = games.filter(game => game.isNew);
  } else {
    processedGames = games.filter(game => {
      if (!game.category) return false;
      return (
        game.category.toLowerCase() === filterVal.toLowerCase() ||
        game.category === filterVal
      );
    });
  }

  // Sort games
  if (sortFunctions[sortBy]) {
    processedGames = [...processedGames].sort(sortFunctions[sortBy]);
  }

  return (
    <section className="py-8 px-3 sm:py-12 sm:px-4 md:py-16 md:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-lime-50 border-y-4 border-emerald-300/30">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-lime-300/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-lime-300/20 to-emerald-200/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-200/10 to-lime-200/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          title="Top Up Your Favorite Games"
          description="Browse through our extensive collection of top-up options for the most popular games"
        />

        {/* Filter & Sort Controls */}
        <div className="flex flex-col gap-3 mb-8 sm:mb-10 md:mb-12">
          <div className="w-full overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
            <FilterControls
              categories={categories}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
          <div className="flex justify-end">
            <SortByDropdown
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </div>

        {/* Games Grid - Compact Mobile Layout */}
        {processedGames.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {processedGames.slice(0, 8).map((game, index) => (
              <GameCard
                key={game.id}
                game={game}
                onGameSelect={onGameSelect}
                index={index}
              />
            ))}
          </div>
        ) : (
          <NoGamesFound />
        )}
      </div>
    </section>
  );
};

GameList.propTypes = {
  games: PropTypes.array.isRequired,
  onGameSelect: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default GameList;
