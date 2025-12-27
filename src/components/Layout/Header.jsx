import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import AuthModal from '../Auth/AuthModal';
import TopBanner from './Header/TopBanner';
import Logo from './Header/Logo';
import DesktopNav from './Header/DesktopNav';
import DesktopActions from './Header/DesktopActions';
import MobileMenuButton from './Header/MobileMenuButton';
import MobileMenu from './Header/MobileMenu';

/**
 * Header Component - Fully Modularized
 * Main navigation header with desktop and mobile variants
 */
const Header = (props) => {
  const { menuOpen, setMenuOpen, onCartClick, showToast, cartItemCount = 0, onSpecialOfferClick, showPromoModal, setShowPromoModal } = props;
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const [notifications, setNotifications] = useState(3);
  const [activeMenu, setActiveMenu] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  // Listen to login/logout changes
  useEffect(() => {
    const syncUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem('user')));
      } catch {
        setUser(null);
      }
    };
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    if (showToast) showToast('Berhasil logout', 'success');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy - Update active menu
      const sections = ['home', 'features', 'games', 'faq', 'contact'];
      const scrollPosition = window.scrollY;
      const activationOffset = headerRef.current ? headerRef.current.offsetHeight + 20 : 150;
      let newActiveMenu = '';

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const section = document.getElementById(sectionId);
        if (section) {
          if (section.offsetTop <= scrollPosition + activationOffset) {
            newActiveMenu = sectionId;
            break;
          }
        }
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        newActiveMenu = sections[sections.length - 1];
      }

      setActiveMenu(newActiveMenu || 'home');
    };

    handleScroll();

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  const handleMenuClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target && headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition < 0 ? 0 : targetPosition,
        behavior: 'smooth'
      });

      if (menuOpen) setMenuOpen(false);
    }
  };

  const handleSignIn = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleSpecialOffer = () => {
    setShowPromoModal(true);
    if (onSpecialOfferClick) onSpecialOfferClick();
  };

  return (
    <nav ref={headerRef} style={{ width: '100vw' }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-2xl border-b-2 border-emerald-300/70 shadow-2xl shadow-emerald-500/20' 
        : 'bg-white/95 backdrop-blur-xl border-b-2 border-emerald-200/50 shadow-lg shadow-emerald-400/10'
    }`}>
      {/* Top Banner - Promo */}
      <TopBanner />

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center h-20 gap-6">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo onClick={(e) => handleMenuClick(e, 'home')} />
          </div>
          
          {/* Divider */}
          <div className="hidden lg:block w-px h-8 bg-gradient-to-b from-transparent via-emerald-200 to-transparent" />
          
          {/* Desktop Navigation - Flex grow to push actions to right */}
          <div className="flex-1 flex justify-center">
            <DesktopNav 
              activeMenu={activeMenu}
              onMenuClick={handleMenuClick}
            />
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-8 bg-gradient-to-b from-transparent via-emerald-200 to-transparent" />

          {/* Desktop Actions Section */}
          <div className="flex-shrink-0">
            <DesktopActions
              onSpecialOfferClick={handleSpecialOffer}
              onCartClick={onCartClick}
              cartItemCount={cartItemCount}
              notifications={notifications}
              showNotifications={showNotifications}
              setShowNotifications={setShowNotifications}
              user={user}
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onLogout={handleLogout}
            />
          </div>

          {/* Mobile Menu Button */}
          <MobileMenuButton
            menuOpen={menuOpen}
            onToggleMenu={() => setMenuOpen(!menuOpen)}
            onCartClick={onCartClick}
            cartItemCount={cartItemCount}
            notifications={notifications}
            setShowNotifications={setShowNotifications}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={menuOpen}
        activeMenu={activeMenu}
        onMenuClick={handleMenuClick}
        onSpecialOfferClick={handleSpecialOffer}
        onSignIn={handleSignIn}
        onCloseMenu={() => setMenuOpen(false)}
        user={user}
        onLogout={handleLogout}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
        showToast={showToast}
      />
    </nav>
  );
};

Header.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  onCartClick: PropTypes.func.isRequired,
  showToast: PropTypes.func,
  cartItemCount: PropTypes.number,
  onSpecialOfferClick: PropTypes.func.isRequired,
  showPromoModal: PropTypes.bool.isRequired,
  setShowPromoModal: PropTypes.func.isRequired,
};

Header.defaultProps = {
  cartItemCount: 0,
  showToast: null,
};

export default Header;