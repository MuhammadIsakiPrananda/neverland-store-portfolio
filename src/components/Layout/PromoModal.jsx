import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Copy, Check, Zap, Clock, Percent, Tag } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import toast from 'react-hot-toast';

// Generate random voucher code
const generateVoucherCode = (flashSaleName, id) => {
  const prefix = flashSaleName.substring(0, 3).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const suffix = String(id).padStart(3, '0');
  return `${prefix}${random}${suffix}`;
};

const PromoModal = ({ isOpen, onClose }) => {
  const { flashSales } = useDashboard();
  const [copiedCode, setCopiedCode] = useState(null);
  const [voucherCodes, setVoucherCodes] = useState({});

  // Generate voucher codes for all flash sales
  useEffect(() => {
    if (flashSales.length > 0) {
      const codes = {};
      flashSales.forEach(fs => {
        if (!voucherCodes[fs.id]) {
          codes[fs.id] = generateVoucherCode(fs.name, fs.id);
        }
      });
      setVoucherCodes(prev => ({ ...prev, ...codes }));
    }
  }, [flashSales]);

  // Filter active flash sales
  const activeFlashSales = flashSales.filter(fs => {
    const now = new Date();
    const start = new Date(fs.startTime);
    const end = new Date(fs.endTime);
    return now >= start && now <= end;
  });

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success('Voucher code copied!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Special Offers & Promos</h2>
                <p className="text-white/90 mt-1">Limited time flash sales with exclusive voucher codes!</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeFlashSales.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                  <Gift className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Active Promos</h3>
                <p className="text-gray-600">Check back later for amazing deals!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeFlashSales.map((flashSale) => {
                  const voucherCode = voucherCodes[flashSale.id];
                  const isCopied = copiedCode === voucherCode;
                  
                  return (
                    <motion.div
                      key={flashSale.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 rounded-2xl border-2 border-orange-200 p-6 overflow-hidden group hover:shadow-xl transition-all duration-300"
                    >
                      {/* Background decoration */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-pink-400/10 rounded-full blur-3xl" />
                      
                      {/* Discount Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                          <div className="relative bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold text-2xl shadow-lg">
                            {flashSale.discount}%
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="p-2 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{flashSale.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">{formatTimeRemaining(flashSale.endTime)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Voucher Code */}
                        {voucherCode && (
                          <div className="mt-4">
                            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              Voucher Code
                            </label>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-white border-2 border-dashed border-orange-300 rounded-xl px-4 py-3 font-mono font-bold text-lg text-gray-900">
                                {voucherCode}
                              </div>
                              <button
                                onClick={() => handleCopyCode(voucherCode)}
                                className={`p-3 rounded-xl transition-all duration-200 ${
                                  isCopied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-lg'
                                }`}
                              >
                                {isCopied ? (
                                  <Check className="w-5 h-5" />
                                ) : (
                                  <Copy className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Applied Games */}
                        {flashSale.gameIds && flashSale.gameIds.length > 0 && (
                          <div className="mt-4">
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Valid for {flashSale.gameIds.length} game(s)</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              {flashSale.gameIds.slice(0, 3).map((_, idx) => (
                                <div key={idx} className="px-3 py-1 bg-white/80 border border-orange-200 rounded-lg text-xs font-medium text-gray-700">
                                  Game #{idx + 1}
                                </div>
                              ))}
                              {flashSale.gameIds.length > 3 && (
                                <div className="px-3 py-1 bg-orange-100 border border-orange-300 rounded-lg text-xs font-bold text-orange-700">
                                  +{flashSale.gameIds.length - 3} more
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Info Footer */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl">
              <div className="flex items-start gap-3">
                <Percent className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900 mb-1">How to use voucher codes:</p>
                  <ol className="text-gray-700 space-y-1 ml-4 list-decimal">
                    <li>Copy the voucher code by clicking the copy button</li>
                    <li>Add games to your cart</li>
                    <li>Apply the voucher code at checkout to get your discount</li>
                    <li>Complete your purchase before the offer expires!</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default PromoModal;
