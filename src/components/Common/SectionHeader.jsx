import React from 'react';
import PropTypes from 'prop-types';
import { Gamepad2 } from 'lucide-react';

/**
 * Section Header Component - ULTRA MODERN
 * Premium section header with animated decorative elements
 */
const SectionHeader = ({ title, description, icon: Icon }) => (
  <div className="text-center mb-16 relative">
    {/* Decorative top line */}
    <div className="flex items-center justify-center gap-4 mb-6">
      <div className="h-1 w-16 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full" />
      {Icon && (
        <div className="relative">
          <Icon className="w-8 h-8 text-emerald-600 animate-pulse" />
          <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-50" />
        </div>
      )}
      {!Icon && <Gamepad2 className="w-8 h-8 text-emerald-600 animate-pulse" />}
      <div className="h-1 w-16 bg-gradient-to-r from-transparent via-lime-500 to-transparent rounded-full" />
    </div>

    {/* Title with enhanced gradient */}
    <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-emerald-600 via-lime-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-sm animate-fade-in-up">
      {title}
    </h2>
    
    {description && (
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        {description}
      </p>
    )}

    {/* Decorative bottom accent */}
    <div className="mt-6 flex items-center justify-center gap-2">
      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
    </div>
  </div>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.elementType,
};

export default SectionHeader;
