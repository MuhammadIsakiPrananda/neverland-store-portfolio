import React from 'react';
import PropTypes from 'prop-types';
import SectionHeader from '../Common/SectionHeader';
import FeatureCard from './FeatureCard';

/**
 * Features Component - Emerald/Lime Theme
 * Displays key features in card grid with modern design
 */
const Features = ({ features }) => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/20 to-lime-50/20 border-y-4 border-emerald-200/30">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl bottom-0 left-0 animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-lime-300/15 rounded-full blur-3xl top-0 right-0 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          title="Why Choose Neverland Store?"
          description="Experience the best gaming top-up service with unmatched benefits" 
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

Features.propTypes = {
  features: PropTypes.array.isRequired,
};

export default Features;
