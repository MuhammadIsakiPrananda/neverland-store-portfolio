import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Wishlist Context
 * Global state management for wishlist functionality
 */
const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    // Load from localStorage
    try {
      const saved = localStorage.getItem('neverland_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('neverland_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (gameId) => {
    setWishlist(prev => {
      if (!prev.includes(gameId)) {
        return [...prev, gameId];
      }
      return prev;
    });
  };

  const removeFromWishlist = (gameId) => {
    setWishlist(prev => prev.filter(id => id !== gameId));
  };

  const toggleWishlist = (gameId) => {
    setWishlist(prev => {
      if (prev.includes(gameId)) {
        return prev.filter(id => id !== gameId);
      }
      return [...prev, gameId];
    });
  };

  const isInWishlist = (gameId) => {
    return wishlist.includes(gameId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount: wishlist.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WishlistContext;
