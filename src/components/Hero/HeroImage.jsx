import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import heroImage from '../../assets/Neverland Games Store.png';

/**
 * Hero Image Component
 * Interactive image with mouse parallax effect and emerald/lime theme
 */
const HeroImage = () => {
  const [imageStyle, setImageStyle] = useState({});
  const [glowStyle, setGlowStyle] = useState({});
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const panX = (x / rect.width - 0.5) * -10; 
    const panY = (y / rect.height - 0.5) * -10;

    setImageStyle({
      transform: `scale(1.03) translateX(${panX}px) translateY(${panY}px)`,
      transition: 'transform 0.15s ease-out',
    });

    setGlowStyle({
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(16, 185, 129, 0.2), transparent 40%)`,
      opacity: 1,
      transition: 'opacity 0.15s ease-out',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setImageStyle({
      transform: 'scale(1) translateX(0) translateY(0)',
      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    });
    setGlowStyle({ opacity: 0, transition: 'opacity 0.4s ease-out' });
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group animate-fade-in-up lg:mt-0 mt-12 hidden md:block" 
      style={{ animationDelay: '0.4s' }}
    >
      <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/30 ring-1 ring-emerald-400/20 group-hover:ring-emerald-400/40 transition-all duration-300">
        <img 
          src={heroImage}
          alt="Neverland Games Store Showcase"
          style={imageStyle}
          className="w-full max-w-lg lg:max-w-none transition-transform cursor-pointer"
          loading="eager"
        />
        {/* Interactive glow */}
        <div className="absolute inset-0 pointer-events-none" style={glowStyle} />
        
        {/* Border glow on hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-emerald-500/10 via-lime-500/10 to-emerald-500/10 pointer-events-none" />
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-emerald-500/25 to-transparent rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-br from-lime-500/20 to-transparent rounded-full blur-3xl -z-10 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 -right-8 w-32 h-32 bg-gradient-to-br from-emerald-400/15 to-transparent rounded-full blur-2xl -z-10 animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
};

export default HeroImage;
