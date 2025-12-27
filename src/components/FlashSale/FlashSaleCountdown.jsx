import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Zap } from 'lucide-react';

/**
 * Time Block Component - ULTRA MODERN
 * Individual time unit with 3D flip animation and premium design
 */
const TimeBlock = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="relative group">
      {/* 3D Container with layers */}
      <div className="relative">
        {/* Glow layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
        
        {/* Main time block */}
        <div className="relative bg-gradient-to-br from-emerald-500 via-lime-500 to-emerald-600 text-white font-black text-3xl sm:text-4xl px-5 py-4 rounded-2xl shadow-2xl shadow-emerald-500/40 min-w-[70px] sm:min-w-[80px] text-center backdrop-blur-sm border-2 border-emerald-300/30 group-hover:scale-105 transition-transform">
          {String(value).padStart(2, '0')}
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-2xl" />
        </div>
        
        {/* Bottom shadow layer for 3D effect */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[90%] h-2 bg-emerald-900/20 rounded-full blur-sm" />
      </div>
    </div>
    <span className="text-xs text-emerald-700 mt-2 font-bold uppercase tracking-wider">{label}</span>
  </div>
);

TimeBlock.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

/**
 * Flash Sale Countdown Component - ULTRA MODERN
 * Premium countdown with progress bar and urgency animations
 */
const FlashSaleCountdown = ({ endTime, title = 'FLASH SALE', className = '' }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endTime) - new Date();
      const totalDuration = 6 * 60 * 60 * 1000; // 6 hours in ms

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setProgress((difference / totalDuration) * 100);
        setIsExpired(false);
      } else {
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (isExpired) {
    return null;
  }

  const isUrgent = progress < 20; // Last 20% is urgent

  return (
    <div className={`relative bg-gradient-to-br from-white via-emerald-50/30 to-lime-50/20 border-2 border-emerald-400/60 rounded-3xl p-6 sm:p-8 overflow-hidden backdrop-blur-2xl shadow-2xl shadow-emerald-500/30 ${className}`}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-lime-500/10 to-emerald-500/5 pointer-events-none animate-gradient" />
      
      {/* Urgency pulse effect */}
      {isUrgent && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-pulse" />
 )}
      
      <div className="relative space-y-4">
        {/* Title Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Animated Zap icon */}
            <div className="relative">
              <Zap className="w-8 h-8 text-emerald-600 fill-emerald-600 animate-bounce" />
              <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-50 animate-pulse" />
            </div>
            
            <div className="flex items-center gap-2">
              {/* Live indicator */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              
              <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-lime-600 to-emerald-600 drop-shadow-sm">
                {title}
              </h3>
            </div>
            
            <span className={`bg-gradient-to-r from-emerald-500 to-lime-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/40 ${isUrgent ? 'animate-pulse' : ''}`}>
              {isUrgent ? '🔥 HURRY!' : 'LIVE'}
            </span>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700">{Math.round(progress)}% time left</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-200/50 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r from-emerald-500 to-lime-500 transition-all duration-1000 ease-linear ${isUrgent ? 'animate-pulse' : ''}`}
            style={{ width: `${progress}%` }}
          />
          {/* Shine effect on progress bar */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>

        {/* Countdown Blocks */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <span className="text-4xl text-emerald-400 font-black animate-pulse">:</span>
          <TimeBlock value={timeLeft.minutes} label="Mins" />
          <span className="text-4xl text-emerald-400 font-black animate-pulse" style={{ animationDelay: '0.5s' }}>:</span>
          <TimeBlock value={timeLeft.seconds} label="Secs" />
        </div>
      </div>
    </div>
  );
};

FlashSaleCountdown.propTypes = {
  endTime: PropTypes.string.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default FlashSaleCountdown;
