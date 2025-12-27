import { useLayoutEffect } from 'react';

/**
 * A custom React hook to lock body scroll and prevent layout shift
 * when a modal or overlay is open.
 * @param {boolean} isLocked - Whether the scroll should be locked.
 */
const useScrollLock = (isLocked) => {
  useLayoutEffect(() => {
    // Do nothing if the scroll is not locked
    if (!isLocked) {
      return;
    }

    // Save the original body styles
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;
    
    // Get the scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Lock the scroll
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // Also adjust the fixed header if it exists
    const header = document.querySelector('nav.fixed');
    const originalHeaderPaddingRight = header ? header.style.paddingRight : '';
    if (header) {
      header.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Return a cleanup function to restore the original styles
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;
      if (header) {
        header.style.paddingRight = originalHeaderPaddingRight;
      }
    };
  }, [isLocked]); // Only re-run when isLocked changes
};

export default useScrollLock;