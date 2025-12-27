import React, { useState, useEffect } from 'react';
import WhatsAppIcon from '../UI/WhatsAppIcon';

/**
 * Floating WhatsApp Button - Modern & Clean
 * Always visible - Quick access to WhatsApp contact
 */
const FloatingActionButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button with animation after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed bottom-24 right-4 sm:right-6 z-50 transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      {/* WhatsApp Button - Clean & Modern */}
      <a
        href="https://wa.me/628995257735"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <WhatsAppIcon className="w-7 h-7 text-white relative z-10" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg hidden sm:block">
          Chat via WhatsApp
          <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-0.5 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-gray-900"></div>
        </div>
      </a>
    </div>
  );
};

export default FloatingActionButtons;