import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { ShoppingBag, Bell, Gift, User } from 'lucide-react';
import NotificationPopover from '../NotificationPopover';

/**
 * Desktop Actions Component
 * Displays action buttons (promo, cart, notifications, auth) for desktop
 */
const DesktopActions = ({ 
  onSpecialOfferClick,
  onCartClick,
  cartItemCount,
  notifications,
  showNotifications,
  setShowNotifications,
  user,
  onSignIn,
  onSignUp,
  onLogout
}) => {
  const notificationButtonRef = useRef(null);

  return (
    <div className="hidden lg:flex items-center gap-6 flex-nowrap">
      <div className="flex items-center gap-3 flex-nowrap">
        {/* Promo */}
        <button 
          aria-label="Special Offers" 
          className="relative p-2.5 rounded-xl hover:bg-gradient-to-br hover:from-orange-50 hover:to-cyan-50 transition-all duration-300 group hover:scale-110"
          onClick={onSpecialOfferClick}
        >
          <Gift className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-all duration-300 group-hover:rotate-12" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full animate-pulse shadow-lg shadow-orange-500/50" />
        </button>
        
        {/* Cart & Notifications */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onCartClick} 
            aria-label={`Shopping Cart (${cartItemCount} items)`} 
            className="relative p-2.5 rounded-xl hover:bg-emerald-50 transition-all duration-300 group hover:scale-110"
          >
            <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-emerald-600 transition-all duration-300 group-hover:scale-110" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-br from-emerald-500 to-lime-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/40 animate-bounce">
                {cartItemCount}
              </span>
            )}
          </button>
          {/* Notifications Button */}
          <div className="relative">
            <button
              ref={notificationButtonRef}
              onClick={() => setShowNotifications((v) => !v)}
              aria-label="Notifications"
              className="relative p-2.5 rounded-xl hover:bg-emerald-50 transition-all duration-300 group hover:scale-110"
            >
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-emerald-600 transition-all duration-300 group-hover:rotate-12" />
            </button>
            {showNotifications && <NotificationPopover isOpen={showNotifications} onClose={() => setShowNotifications(false)} triggerRef={notificationButtonRef} />}
          </div>
        </div>
      </div>

      <div className="w-px h-8 bg-gray-200" />
      
      {/* Profile Dropdown or Auth Buttons */}
      {user ? (
        <div className="relative group">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-gray-50 to-emerald-50 hover:from-emerald-50 hover:to-lime-50 border-2 border-gray-200 hover:border-emerald-300 text-gray-800 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md" tabIndex={0}>
            <User className="w-4 h-4 text-emerald-600" />
            <span>{user.name || user.email}</span>
            <svg className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180 duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-200 rounded-xl shadow-xl py-2 z-50 hidden group-focus-within:block group-hover:block">
            <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">{user.email}</div>
            <button onClick={onLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors">Logout</button>
          </div>
        </div>
      ) : (
        <>
          <button 
            onClick={onSignIn}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-600 hover:scale-105 shadow-sm hover:shadow-md whitespace-nowrap"
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </span>
          </button>
          <button 
            onClick={onSignUp}
            className="relative group px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 overflow-hidden whitespace-nowrap"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Get Started</span>
          </button>
        </>
      )}
    </div>
  );
};

DesktopActions.propTypes = {
  onSpecialOfferClick: PropTypes.func.isRequired,
  onCartClick: PropTypes.func.isRequired,
  cartItemCount: PropTypes.number,
  notifications: PropTypes.number,
  showNotifications: PropTypes.bool.isRequired,
  setShowNotifications: PropTypes.func.isRequired,
  user: PropTypes.object,
  onSignIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

DesktopActions.defaultProps = {
  cartItemCount: 0,
  notifications: 0,
  user: null,
};

export default DesktopActions;
