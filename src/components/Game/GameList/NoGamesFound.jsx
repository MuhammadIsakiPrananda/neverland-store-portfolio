import React from 'react';
import { SearchX } from 'lucide-react';

/**
 * No Games Found Component
 * Empty state when no games match the filters
 */
const NoGamesFound = () => {
  return (
    <div className="text-center py-16 animate-fade-in flex flex-col items-center">
      <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-lg shadow-violet-500/5">
        <SearchX className="w-10 h-10 text-slate-500" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">No Games Found</h3>
      <p className="text-slate-400">Try adjusting your filters or search query</p>
    </div>
  );
};

export default NoGamesFound;
