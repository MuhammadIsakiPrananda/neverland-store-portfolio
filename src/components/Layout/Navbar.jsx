import React, { useState } from 'react';
import { categories } from '../../data/appData';

export default function Navbar({ onCategoryChange }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  return (
    <div className="sticky top-[104px] z-40 w-full px-4 py-2">
      <nav className="mx-auto max-w-5xl">
        <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/60 rounded-2xl p-1.5 shadow-2xl shadow-black/20 overflow-hidden ring-1 ring-white/5">
          {/* Scrollable Container with visible scrollbar */}
          <div className="flex items-center overflow-x-auto custom-scrollbar snap-x snap-mandatory gap-1 sm:gap-2 px-1">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`
                    relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 snap-center shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50
                    ${isActive 
                      ? 'text-white shadow-lg shadow-sky-500/10' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-zinc-800 rounded-xl -z-10 border border-zinc-700/50 animate-fade-in" />
                  )}
                  {/* Icon with dynamic color */}
                  {React.cloneElement(category.icon, { 
                    className: `w-4 h-4 transition-colors duration-300 ${isActive ? 'text-sky-400' : 'text-zinc-500 group-hover:text-zinc-300'}` 
                  })}
                  <span className="tracking-wide">{category.name}</span>
                </button>
              );
            })}
          </div>
          
          {/* Fade gradients for scroll indication (Mobile) */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-zinc-900/90 to-transparent pointer-events-none md:hidden rounded-l-2xl" />
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-zinc-900/90 to-transparent pointer-events-none md:hidden rounded-r-2xl" />
        </div>
      </nav>
    </div>
  );
}