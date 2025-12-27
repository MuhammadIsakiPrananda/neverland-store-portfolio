import React from 'react';
import { Zap, Shield, Clock } from 'lucide-react';

/**
 * Feature Pills Component
 * Ultra-modern feature showcase with glassmorphism and 3D effects
 */
const FeaturePills = () => {
  const features = [
    { text: 'Instant Delivery', icon: Zap, gradient: 'from-emerald-500 to-lime-500' },
    { text: '24/7 Support', icon: Clock, gradient: 'from-lime-500 to-emerald-400' },
    { text: 'Secure Payment', icon: Shield, gradient: 'from-emerald-400 to-lime-400' },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      {features.map((feature, idx) => {
        const Icon = feature.icon;
        return (
          <div
            key={idx}
            className="group relative px-6 py-3.5 bg-gradient-to-br from-white/95 to-white/90 border-2 border-emerald-200/60 hover:border-emerald-400/80 rounded-2xl backdrop-blur-xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:scale-110 cursor-pointer overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
          >
            {/* Animated gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent" />
            
            {/* Content */}
            <div className="relative z-10 flex items-center gap-3">
              {/* Icon with gradient background */}
              <div className={`relative p-2 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                {/* Icon glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity`} />
              </div>
              
              {/* Text */}
              <span className="text-sm font-bold bg-gradient-to-r from-emerald-700 to-lime-700 bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:to-lime-600 transition-all duration-300">
                {feature.text}
              </span>
            </div>
            
            {/* Bottom accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`} />
          </div>
        );
      })}
    </div>
  );
};

export default FeaturePills;
