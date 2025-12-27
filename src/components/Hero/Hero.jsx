import React from 'react';
import BackgroundEffects from './BackgroundEffects';
import PremiumBadge from './PremiumBadge';
import FeaturePills from './FeaturePills';
import CTAButtons from './CTAButtons';
import SocialLinks from './SocialLinks';
import HeroImage from './HeroImage';
import ScrollIndicator from './ScrollIndicator';

/**
 * Hero Component - Fully Modularized
 * Main hero section with heading, features, CTAs, and image
 */
const Hero = () => {
  return (
    <div className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
      {/* Background Effects */}
      <BackgroundEffects />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="text-center lg:text-left">
            <div className="max-w-xl mx-auto lg:mx-0 space-y-8">
              {/* Premium Badge */}
              <PremiumBadge />

              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter animate-fade-in-up">
                <span className="bg-gradient-to-r from-emerald-500 via-lime-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                  Level Up Your <br />Gaming
                </span>{' '}
                <span className="text-gray-900 drop-shadow-[0_0_20px_rgba(0,0,0,0.05)]">Experience</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed animate-fade-in-up max-w-2xl" style={{ animationDelay: '0.1s' }}>
                Get instant top-ups for your favorite games. Enjoy fast delivery, unbeatable prices, and dedicated 24/7 support.
              </p>

              {/* Feature Pills */}
              <FeaturePills />

              {/* CTA Buttons */}
              <CTAButtons />

              {/* Social Proof */}
              <SocialLinks />
            </div>
          </div>

          {/* Right Column: Image */}
          <HeroImage />
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </div>
  );
};

export default Hero;
