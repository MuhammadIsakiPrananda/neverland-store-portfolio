import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How do I top up games on Neverland Store?",
    answer: "Simply browse our game catalog, select your game, enter your User ID, choose the top-up amount, and complete the payment. Your game credits will be added instantly!"
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including GoPay, OVO, DANA, BCA, BRI, Mandiri, and other major bank transfers for your convenience."
  },
  {
    question: "Is it safe to top up here?",
    answer: "Yes, absolutely! We use secure payment gateways and official direct top-up channels to ensure your account safety and transaction security."
  },
  {
    question: "How long does the process take?",
    answer: "Most transactions are processed instantly (1-3 minutes). However, during high traffic or maintenance, it might take slightly longer."
  },
  {
    question: "What if I entered the wrong User ID?",
    answer: "Please contact our 24/7 customer support immediately via WhatsApp with your transaction details. We'll help you resolve the issue as quickly as possible."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2.5 bg-emerald-50 rounded-xl mb-3 border border-emerald-200">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-base">
            Everything you need to know about our services and top-up process.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                  isOpen 
                    ? 'bg-white border-emerald-300 shadow-md' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className={`font-semibold text-base transition-colors ${isOpen ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                    isOpen 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
