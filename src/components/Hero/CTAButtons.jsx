import React from 'react';

/**
 * CTA Buttons Component
 * Enhanced call-to-action buttons with premium animations and scroll functionality
 */
const CTAButtons = () => {
  // Smooth scroll to section and update navbar
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      // Scroll to section
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Update navbar active state by triggering click on corresponding nav link
      const menuId = sectionId.replace('#', '');
      const navLink = document.querySelector(`a[href="${sectionId}"]`);
      if (navLink) {
        // Small delay to ensure scroll starts first
        setTimeout(() => {
          navLink.click();
        }, 100);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      {/* Primary CTA - Browse Games */}
      <button 
        onClick={() => scrollToSection('#games')}
        className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 via-lime-500 to-emerald-600 hover:from-emerald-400 hover:via-lime-400 hover:to-emerald-500 text-white font-bold rounded-xl shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden"
      >
        {/* Shimmer animation */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Button content */}
        <span className="relative z-10 flex items-center gap-2">
          Browse Games
          <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
        </span>
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-emerald-400/20 via-lime-400/20 to-emerald-400/20 blur-xl" />
      </button>
      
      {/* Secondary CTA - Learn More */}
      <button 
        onClick={() => scrollToSection('#features')}
        className="group relative px-8 py-4 bg-white hover:bg-emerald-50 text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-emerald-400 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 overflow-hidden"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-emerald-100/50 to-transparent" />
        
        <span className="relative z-10">Learn More</span>
      </button>
    </div>
  );
};

export default CTAButtons;
