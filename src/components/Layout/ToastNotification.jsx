import React, { useState, useEffect } from 'react';
import { CheckCircle, X, AlertCircle, Info, AlertTriangle } from 'lucide-react';

// Konfigurasi untuk setiap tipe notifikasi agar lebih mudah dikelola dan diperluas.
const toastConfig = {
  success: {
    Icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
    style: 'bg-white border-2 border-emerald-400 shadow-emerald-400/30',
    textColor: 'text-emerald-700'
  },
  error: {
    Icon: <AlertCircle className="w-5 h-5 text-red-600" />,
    style: 'bg-white border-2 border-red-400 shadow-red-400/30',
    textColor: 'text-red-700'
  },
  info: {
    Icon: <Info className="w-5 h-5 text-cyan-600" />,
    style: 'bg-white border-2 border-cyan-400 shadow-cyan-400/30',
    textColor: 'text-cyan-700'
  },
  warning: {
    Icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
    style: 'bg-white border-2 border-orange-400 shadow-orange-400/30',
    textColor: 'text-orange-700'
  },
};

const ToastNotification = ({ message, type = 'success', onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Efek untuk animasi masuk dan keluar
  useEffect(() => {
    // Animasikan saat komponen muncul
    setIsVisible(true);

    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]); // sengaja onClose tidak dimasukkan agar tidak reset timer jika prop berubah

  const handleClose = () => {
    setIsVisible(false);
    // Tunggu animasi selesai sebelum memanggil onClose dari parent
    const animationDuration = 300; // Sesuaikan dengan `duration-300` dari Tailwind
    setTimeout(() => {
      onClose();
    }, animationDuration);
  };

  const { Icon, style, textColor } = toastConfig[type] || toastConfig.success;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed top-4 right-4 z-[200] flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-lg transition-all duration-300 ease-in-out ${style} ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}
    >
      {Icon}
      <span className={`${textColor} text-sm font-medium`}>{message}</span>
      <button
        onClick={handleClose}
        aria-label="Close notification"
        className="ml-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <X className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
};

export default ToastNotification;