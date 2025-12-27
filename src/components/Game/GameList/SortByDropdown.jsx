import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';

const sortOptions = [
  { id: 'popular', label: 'Most Popular' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'name', label: 'A-Z' },
];

/**
 * Sort By Dropdown Component
 * Dropdown for sorting game list
 */
const SortByDropdown = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentSort = sortOptions.find((opt) => opt.id === sortBy);

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-cyan-400 rounded-full text-gray-700 font-semibold transition-all min-h-[44px] sm:min-h-0 shadow-sm hover:shadow-md"
      >
        <span className="text-sm font-semibold">Sort: {currentSort?.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform text-cyan-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 left-0 sm:left-auto mt-2 w-full sm:w-48 bg-white border-2 border-cyan-200 rounded-2xl shadow-2xl shadow-cyan-400/20 overflow-hidden z-50 animate-scale-in">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onSortChange(option.id);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left text-sm transition-colors min-h-[44px] sm:min-h-0 flex items-center font-medium ${
                sortBy === option.id
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-white'
                  : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

SortByDropdown.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SortByDropdown;
export { sortOptions };
