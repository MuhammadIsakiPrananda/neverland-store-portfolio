import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Gift, User, X, LogOut, ChevronRight } from 'lucide-react';
import { menuItems } from './DesktopNav';
import logoImage from '../../../assets/Neverland Games Store.png';

/**
 * Mobile Menu Component
 * Displays full-screen mobile navigation menu
 */
const MobileMenu = ({ 
  isOpen,
  activeMenu,
  onMenuClick,
  onSpecialOfferClick,
  onSignIn,
  onCloseMenu,
  user,
  onLogout
}) => {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="relative z-[100] lg:hidden">
      {/* Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onCloseMenu}
        aria-hidden="true"
      />

      {/* Sidebar Drawer */}
      <div className="fixed inset-y-0 left-0 w-[280px] bg-zinc-950 border-r border-zinc-800 shadow-2xl flex flex-col animate-fade-in">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800/50 bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-sky-500/30 rounded-full blur-lg transition-all" />
              <img 
                src={logoImage} 
                alt="Neverland Games Store" 
                className="relative w-8 h-8 object-cover rounded-full ring-2 ring-sky-500/50 transition-all"
              />
            </div>
            <span className="font-bold text-white tracking-wide text-lg">Neverland Store</span>
          </div>
          <button 
            onClick={onCloseMenu}
            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6 custom-scrollbar">
          {/* Navigation Links */}
          <div>
            <h3 className="px-2 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Menu</h3>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = activeMenu === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      onMenuClick(e, item.id);
                      onCloseMenu();
                    }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                      isActive 
                        ? 'bg-zinc-800 text-white' 
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-sky-400' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-sky-500" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Promotions Section */}
          <div>
            <h3 className="px-2 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Offers</h3>
            <button 
              onClick={() => {
                onSpecialOfferClick();
                onCloseMenu();
              }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 hover:border-pink-500/40 transition-all group"
            >
              <div className="p-1.5 bg-pink-500/20 rounded-lg">
                <Gift className="w-5 h-5 text-pink-400" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-sm text-pink-100">Special Promo</span>
                <span className="text-xs text-pink-400/70">Limited time offers</span>
              </div>
            </button>
          </div>
        </div>

        {/* Sidebar Footer (Auth) */}
        <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/30">
          {user ? (
            <div className="flex items-center justify-between bg-zinc-900 p-3 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold border border-zinc-700 shrink-0">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-white truncate">{user.name || 'User'}</span>
                  <span className="text-xs text-zinc-500 truncate">{user.email}</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  if (onLogout) onLogout();
                  onCloseMenu();
                }}
                className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors shrink-0"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => {
                onSignIn();
                onCloseMenu();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5"
            >
              <User className="w-5 h-5" />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  activeMenu: PropTypes.string.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  onSpecialOfferClick: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onCloseMenu: PropTypes.func.isRequired,
  user: PropTypes.object,
  onLogout: PropTypes.func
};

export default MobileMenu;
