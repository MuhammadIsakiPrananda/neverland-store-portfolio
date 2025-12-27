import React from 'react';
import PropTypes from 'prop-types';

/**
 * Floating Particle Component
 * Animated decorative particles for background
 */
const FloatingParticle = React.memo(({ delay, duration, size, position }) => (
  <div
    className="absolute rounded-full bg-gradient-to-r from-emerald-400/20 to-lime-500/20 blur-md animate-float"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      left: position.x,
      top: position.y,
    }}
  />
));

FloatingParticle.propTypes = {
  delay: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  position: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string,
  }).isRequired,
};

/**
 * Background Effects Component  
 * Enhanced with dynamic gradients, particles, and animated mesh
 */
const BackgroundEffects = () => {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Bright gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-lime-50" />
      
      {/* Animated gradient mesh overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-400/30 via-transparent to-lime-400/30 animate-gradient" />
      </div>
      
      {/* Floating particles - emerald/lime colors */}
      <FloatingParticle delay={0} duration={15} size={60} position={{ y: '10%', x: '5%' }} />
      <FloatingParticle delay={1} duration={20} size={80} position={{ y: '50%', x: '20%' }} />
      <FloatingParticle delay={2} duration={18} size={40} position={{ y: '20%', x: '80%' }} />
      <FloatingParticle delay={3} duration={22} size={70} position={{ y: '80%', x: '60%' }} />
      <FloatingParticle delay={2.5} duration={17} size={50} position={{ y: '40%', x: '90%' }} />
      <FloatingParticle delay={4} duration={25} size={90} position={{ y: '70%', x: '15%' }} />
      
      {/* Large glow orbs with emerald/lime colors */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px]  bg-lime-400/15 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-300/15 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '1s' }} />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
    </div>
  );
};

export default BackgroundEffects;
