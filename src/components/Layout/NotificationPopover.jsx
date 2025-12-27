import React, { useRef, useEffect } from 'react';
import { Shield } from 'lucide-react';

const NotificationPopover = ({ isOpen, onClose, triggerRef }) => {
  const popoverRef = useRef(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current && !popoverRef.current.contains(event.target) &&
        triggerRef.current && !triggerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return ( 
    <div ref={popoverRef} className="absolute top-full right-0 mt-3 w-80 bg-white backdrop-blur-xl border-2 border-emerald-300 rounded-2xl shadow-2xl shadow-emerald-400/20 animate-fade-in-down z-50">
      <div className="p-4 border-b-2 border-gray-200 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-lime-50">
        <h3 className="font-bold text-gray-900">Notifications</h3>
      </div>
      <div className="max-h-80 overflow-y-auto custom-scrollbar">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 border-2 border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-emerald-600" />
          </div>
          <p className="text-sm text-gray-700 font-medium">Tidak ada notifikasi</p> 
          <p className="text-xs text-gray-500 mt-1">Semua notifikasi akan muncul di sini</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopover;