import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShoppingBag, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';

const CartModal = ({ isOpen, onClose, cartItems = [], onUpdateQuantity, onRemoveItem }) => {
  // Prevent body scroll and layout shift when modal is open.
  // This effect calculates the scrollbar width and adds padding to the body
  // and the fixed header to prevent them from shifting when the scrollbar is hidden.
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const originalBodyPaddingRight = document.body.style.paddingRight;
      const originalBodyOverflow = document.body.style.overflow;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Apply padding to the fixed header as well
      const header = document.querySelector('nav.fixed');
      if (header) header.style.paddingRight = `${scrollbarWidth}px`;

      return () => {
        // Restore body styles
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.paddingRight = originalBodyPaddingRight;

        // For the header, temporarily disable transitions to prevent the "slide" effect on close.
        if (header) {
          header.style.transition = 'none';
          header.style.paddingRight = originalBodyPaddingRight;
          // Re-enable transitions on the next frame so other effects (like scroll) work again.
          requestAnimationFrame(() => {
            header.style.transition = ''; // Let the CSS class's transition take over.
          });
        }
      };
    }
  }, [isOpen]);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const hasItems = cartItems.length > 0;

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      
      {/* Modal Content */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-gray-200 shadow-lg animate-scale-in custom-scrollbar"
      >
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 group"
        >
          <X className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
        </button>

        <div className="relative p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-100 via-lime-50 to-emerald-100 border-2 border-emerald-200 mb-6 shadow-xl shadow-emerald-500/25">
              <ShoppingBag className="w-9 h-9 text-emerald-600" />
            </div>
            <h2 id="cart-modal-title" className="text-2xl font-bold text-gray-900 mb-2">
              Shopping Cart
            </h2>
            <p className="text-sm text-gray-600">
              Your selected items will appear here.
            </p>
          </div>

          {hasItems ? (
            <>
              {/* Cart Items List */}
              <div className="space-y-4 border-y border-white/10 py-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 animate-fade-in-up">
                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-lg border border-white/10" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-sm">{item.name}</h3>
                      <p className="text-xs text-slate-400">{item.platform}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
                          {item.quantity === 1 ? <Trash2 size={14} className="text-error-400" /> : <Minus size={14} className="text-neutral-300" />}
                        </button>
                        <span className="text-sm font-medium w-6 text-center text-white">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
                          <Plus size={14} className="text-slate-300" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-xs text-slate-500 mt-1">${item.price.toFixed(2)} each</p>
                      <button onClick={() => onRemoveItem(item.id)} className="text-xs text-red-400 hover:text-red-300 hover:underline mt-2 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="mt-6 pt-6">
                <div className="flex justify-between items-center mb-4 text-slate-300">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-xl font-bold text-white">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-500 text-center mb-4">
                  Shipping & taxes calculated at checkout.
                </p>
                <button
                  disabled={!hasItems}
                  className="w-full px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Empty Cart Content */}
              <div className="text-center py-10 border-y border-white/10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-slate-500" />
                </div>
                <h3 className="font-semibold text-slate-300">Your cart is empty</h3>
                <p className="text-sm text-slate-500 max-w-xs">
                  Looks like you haven't added anything to your cart yet.
                </p>
              </div>

              {/* Empty Cart Footer */}
              <div className="mt-6 pt-6">
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Continue Shopping <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  , document.body);
};

export default CartModal;