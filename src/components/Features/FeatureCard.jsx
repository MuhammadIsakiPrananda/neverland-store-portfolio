import React from 'react';
import PropTypes from 'prop-types';

/**
 * Feature Card Component - Emerald/Lime Theme
 * Individual feature card with icon, title, description and modern glassmorphism
 */
const FeatureCard = ({ feature, index }) => {
  const Icon = feature.icon;
  
  return (
    <div 
      className="group relative bg-white/95 border-2 border-emerald-200/60 rounded-2xl p-8 hover:border-emerald-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25 backdrop-blur-xl overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Gradient Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-lime-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-emerald-200/30 to-transparent" />
      
      {/* Icon */}
      <div className="relative z-10 w-16 h-16 mb-6 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-emerald-500/30">
        {typeof Icon === 'function' ? (
          <Icon className="w-8 h-8 text-white transition-all duration-300" strokeWidth={2.5} />
        ) : (
          <div className="text-2xl text-white">{feature.icon}</div>
        )}
        {/* Icon glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-lime-400 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-lime-700 bg-clip-text text-transparent mb-3 group-hover:from-emerald-600 group-hover:to-lime-600 transition-all">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {feature.desc || feature.description}
        </p>
      </div>
      
      {/* Hover Effect Arrow */}
      <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
        <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  );
};

FeatureCard.propTypes = {
  feature: PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]).isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default FeatureCard;
