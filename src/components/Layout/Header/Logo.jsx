import React from 'react';
import PropTypes from 'prop-types';
import logoImage from '../../../assets/Neverland Games Store.png';

/**
 * Logo Component
 * Displays brand logo with text and tagline - Clean & Modern
 */
const Logo = ({ onClick }) => {
  return (
    <a 
      href="#home" 
      onClick={onClick} 
      className="flex items-center gap-3 group cursor-pointer flex-shrink-0"
    >
      {/* Logo Container */}
      <div className="relative">
        {/* Soft Glow Effect on Hover */}
        <div className="absolute inset-0 bg-emerald-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Image Container */}
        <div className="relative bg-white border-2 border-emerald-200 rounded-xl p-1.5 shadow-sm group-hover:shadow-md group-hover:border-emerald-300 transition-all duration-300">
          <img 
            src={logoImage} 
            alt="Neverland Games Store" 
            className="w-10 h-10 object-cover rounded-lg"
          />
        </div>
      </div>
      
      {/* Text Content */}
      <div className="hidden sm:flex flex-col justify-center">
        {/* Brand Name */}
        <span className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
          Neverland Store
        </span>
        {/* Tagline */}
        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
          🎮 Premium Gaming
        </span>
      </div>
    </a>
  );
};

Logo.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Logo;
