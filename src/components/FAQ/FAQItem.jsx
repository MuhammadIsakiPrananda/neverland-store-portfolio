import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';

/**
 * FAQ Item Component
 * Individual FAQ question with accordion behavior
 */
const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className="border-b border-white/10 last:border-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-6 text-left transition-colors hover:text-violet-300 group"
    >
      <span className="text-lg font-semibold text-white pr-8">
        {faq.question}
      </span>
      <ChevronDown 
        className={`w-5 h-5 text-violet-400 flex-shrink-0 transition-transform duration-300 ${
          isOpen ? 'rotate-180' : ''
        }`}
      />
    </button>
    
    <div 
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-96 mb-6' : 'max-h-0'
      }`}
    >
      <p className="text-slate-400 leading-relaxed">
        {faq.answer}
      </p>
    </div>
  </div>
);

FAQItem.propTypes = {
  faq: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default FAQItem;
