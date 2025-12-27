import React from 'react';
import PropTypes from 'prop-types';
import { Star, Users } from 'lucide-react';

/**
 * Game Stats Component
 * Displays rating, players, and category for a game card
 */
const GameStats = ({ rating, players }) => (
  <div className="flex items-center gap-4 text-sm">
    {/* Rating */}
    <div className="flex items-center gap-1">
      <Star className="w-4 h-4 fill-warning-500 text-warning-500" />
      <span className="text-white font-medium">{rating}</span>
    </div>
    
    {/* Players */}
    {players && (
      <div className="flex items-center gap-1 text-slate-400">
        <Users className="w-4 h-4" />
        <span>{players}</span>
      </div>
    )}
  </div>
);

GameStats.propTypes = {
  rating: PropTypes.number.isRequired,
  players: PropTypes.string,
};

export default GameStats;
