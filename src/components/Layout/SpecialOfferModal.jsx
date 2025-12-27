import React from 'react';
import PropTypes from 'prop-types';


// Komponen modal modern untuk Special Offer
// SpecialOfferModal now supports multiple promo coupons
const SpecialOfferModal = ({ isOpen, onClose, offers = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl mx-4 rounded-2xl shadow-2xl border-2 border-cyan-300 bg-white backdrop-blur-xl overflow-hidden animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-red-500 text-gray-600 hover:text-white transition-all shadow-lg border-2 border-gray-200 hover:border-red-500"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Decorative Gradient Top */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-gradient-to-br from-cyan-400/20 via-emerald-400/20 to-transparent rounded-full blur-2xl opacity-70 pointer-events-none" />

        {/* Content */}
        <div className="relative flex flex-col items-center px-6 pt-10 pb-8 sm:px-10">
          {/* Icon & Title */}
          <div className="mb-2 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 via-emerald-500 to-cyan-500/80 shadow-lg shadow-cyan-500/30 animate-bounce-slow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7m16-2V7a2 2 0 00-2-2h-2.586a1 1 0 01-.707-.293l-1.414-1.414a1 1 0 00-.707-.293h-2.172a1 1 0 00-.707.293L8.293 4.707A1 1 0 017.586 5H5a2 2 0 00-2 2v3m16 0H4" /></svg>
          </div>
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-sky-600 to-emerald-600 text-center drop-shadow mb-6 tracking-tight">
            Promo & Kupon Spesial
          </h2>
          {/* Promo List */}
          <div className="w-full max-h-[60vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-6 custom-scrollbar">
            {offers.length === 0 && (
              <div className="col-span-2 text-center text-gray-500 py-8">Belum ada promo aktif saat ini.</div>
            )}
            {offers.map((promo, idx) => (
              <div key={idx} className="relative flex flex-col bg-white border-2 border-gray-200 rounded-xl shadow-lg p-5 group hover:scale-[1.03] hover:shadow-cyan-500/20 transition-all hover:border-cyan-400">
                {/* Promo Image */}
                {promo.image && (
                  <img src={promo.image} alt={promo.title} className="w-full h-28 object-cover object-center rounded-lg mb-3 border-2 border-gray-200" />
                )}
                {/* Promo Title */}
                <h3 className="text-xl font-bold text-cyan-600 mb-1 group-hover:text-emerald-600 transition-colors">
                  {promo.title}
                </h3>
                {/* Promo Description */}
                <p className="text-gray-700 text-sm mb-2 line-clamp-3 min-h-[48px]">{promo.description}</p>
                {/* Promo Code */}
                {promo.code && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-cyan-100 text-cyan-700 font-mono px-3 py-1 rounded-lg text-xs tracking-wider select-all border-2 border-cyan-300">
                      {promo.code}
                    </span>
                    <button
                      className="text-xs text-emerald-600 hover:underline font-medium"
                      onClick={() => {navigator.clipboard.writeText(promo.code)}}
                    >
                      Salin
                    </button>
                  </div>
                )}
                {/* CTA Button */}
                {promo.cta && (
                  <a
                    href={promo.cta.link}
                    className="block w-full text-center bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white font-bold py-2.5 px-4 rounded-lg shadow-md shadow-cyan-500/30 transition-all text-base tracking-wide mt-auto"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {promo.cta.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Gradient Bottom */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-cyan-400/20 via-emerald-400/20 to-transparent rounded-full blur-2xl opacity-60 pointer-events-none" />
      </div>
    </div>
  );
};

SpecialOfferModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  offer: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    cta: PropTypes.shape({
      label: PropTypes.string,
      link: PropTypes.string,
    }),
  }),
};

export default SpecialOfferModal;
