import React from 'react';
import { Twitter, Instagram, Youtube, Twitch } from 'lucide-react';

const socialLinks = [
  { 
    icon: <Twitter size={20} />, 
    href: '#', 
    name: 'Twitter',
    gradient: 'from-sky-400 to-blue-500',
    hoverGlow: 'group-hover:shadow-sky-500/50'
  },
  { 
    icon: <Instagram size={20} />, 
    href: '#', 
    name: 'Instagram',
    gradient: 'from-pink-500 via-purple-500 to-orange-400',
    hoverGlow: 'group-hover:shadow-pink-500/50'
  },
  { 
    icon: <Youtube size={20} />, 
    href: '#', 
    name: 'Youtube',
    gradient: 'from-red-500 to-red-600',
    hoverGlow: 'group-hover:shadow-red-500/50'
  },
  { 
    icon: <Twitch size={20} />, 
    href: '#', 
    name: 'Twitch',
    gradient: 'from-purple-500 to-purple-600',
    hoverGlow: 'group-hover:shadow-purple-500/50'
  },
];

/**
 * Social Media Links Component
 * Ultra-modern social media buttons with glassmorphism and platform-specific colors
 */
const SocialLinks = React.memo(() => (
  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
    {/* Heading with gradient */}
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold bg-gradient-to-r from-emerald-600 to-lime-600 bg-clip-text text-transparent">
        Follow us on:
      </span>
      <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent rounded-full hidden sm:block" />
    </div>
    
    {/* Social Icons */}
    <div className="flex items-center gap-3">
      {socialLinks.map((link) => (
        <a 
          key={link.name}
          href={link.href}
          aria-label={`Follow us on ${link.name}`}
          className={`group relative p-3 bg-white/95 hover:bg-white border-2 border-gray-200/60 hover:border-transparent rounded-2xl backdrop-blur-xl transition-all duration-500 hover:scale-125 hover:-translate-y-1 shadow-lg ${link.hoverGlow} overflow-hidden`}
        >
          {/* Gradient background on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl`} />
          
          {/* Icon glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`} />
          
          {/* Icon */}
          <div className="relative z-10 text-gray-700 group-hover:text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
            {link.icon}
          </div>
          
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} rounded-2xl animate-ping`} style={{ animationDuration: '1.5s' }} />
          </div>
        </a>
      ))}
    </div>
  </div>
));

export default SocialLinks;
