import React from 'react';
import PropTypes from 'prop-types';
import { Home, Gamepad2, Layers, HelpCircle, Mail } from 'lucide-react';

const menuItems = [
  { 
    id: 'home', 
    label: 'Home', 
    icon: Home, 
    href: '#home',
    description: 'Welcome to our store'
  },
  { 
    id: 'features', 
    label: 'Features', 
    icon: Layers, 
    href: '#features',
    description: 'Our key features'
  },
  { 
    id: 'games', 
    label: 'Games', 
    icon: Gamepad2, 
    href: '#games',
    description: 'Browse all games'
  },
  { 
    id: 'faq', 
    label: 'FAQ', 
    icon: HelpCircle, 
    href: '#faq',
    description: 'Get your answers'
  },
  { 
    id: 'contact', 
    label: 'Contact', 
    icon: Mail, 
    href: '#contact',
    description: 'Reach out to us'
  }
];

/**
 * Desktop Navigation Component
 * Displays navigation menu for desktop screens
 */
const DesktopNav = ({ activeMenu, onMenuClick }) => {
  return (
    <nav className="hidden lg:block" aria-label="Main navigation">
      <ul className="flex items-center gap-1">
        {menuItems.map((item) => {
          const isActive = activeMenu === item.id;
          const Icon = item.icon;
          
          return (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={(e) => onMenuClick(e, item.id)}
                className={`
                  relative flex items-center gap-2 px-4 py-2.5 rounded-xl
                  font-semibold text-sm transition-all duration-300 group
                  whitespace-nowrap
                  ${isActive 
                    ? 'text-white bg-gradient-to-r from-emerald-500 to-lime-500 shadow-lg shadow-emerald-500/30' 
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 hover:scale-105'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-4 h-4 transition-all duration-300 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-500 group-hover:text-emerald-600 group-hover:scale-110'
                }`} />
                <span className="relative">
                  {item.label}
                </span>
                
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-white rounded-full opacity-80" />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

DesktopNav.propTypes = {
  activeMenu: PropTypes.string.isRequired,
  onMenuClick: PropTypes.func.isRequired,
};

export default DesktopNav;
export { menuItems };
