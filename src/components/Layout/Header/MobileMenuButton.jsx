import React from 'react';
import PropTypes from 'prop-types';
import { Menu, X, ShoppingBag, Bell } from 'lucide-react';

/**
 * Mobile Menu Button Component
 * Displays cart, notifications, and hamburger menu for mobile screens
 */
const MobileMenuButton = ({ 
  menuOpen, 
  onToggleMenu,
  onCartClick,
  cartItemCount,
  notifications,
  setShowNotifications
}) => {
  return (
    <div className="flex lg:hidden items-center gap-2">
      {/* Mobile Cart */}
      <button onClick={onCartClick} aria-label={`Shopping Cart (${cartItemCount} items)`} className="relative p-2.5 rounded-xl hover:bg-emerald-50 transition-all duration-300 hover:scale-110">
        <ShoppingBag className="w-5 h-5 text-gray-600" />
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-br from-emerald-500 to-lime-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/40 animate-bounce">
            {cartItemCount}
          </span>
        )}
      </button>

      {/* Mobile Notifications */}
      <button
        onClick={() => setShowNotifications((v) => !v)}
        aria-label={`Notifications (${notifications} new)`}
        className="relative p-2.5 rounded-xl hover:bg-emerald-50 transition-all duration-300 hover:scale-110"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {notifications > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-br from-emerald-500 to-green-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/40 animate-pulse">
            {notifications}
          </span>
        )}
      </button>
      
      {/* Hamburger */}
      <button 
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        className="p-2.5 rounded-xl hover:bg-gradient-to-br hover:from-emerald-50 hover:to-lime-50 transition-all duration-300 hover:scale-110"
        onClick={onToggleMenu}
      >
        {menuOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>
    </div>
  );
};

MobileMenuButton.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  onToggleMenu: PropTypes.func.isRequired,
  onCartClick: PropTypes.func.isRequired,
  cartItemCount: PropTypes.number,
  notifications: PropTypes.number,
  setShowNotifications: PropTypes.func.isRequired,
};

MobileMenuButton.defaultProps = {
  cartItemCount: 0,
  notifications: 0,
};

export default MobileMenuButton;
