import React from 'react';
import { Star, Quote } from 'lucide-react';

const SectionHeader = () => (
  <div className="text-center mb-12 space-y-3">
    <h2 className="text-3xl md:text-4xl font-bold">
      <span className="text-emerald-600">
        Loved by Gamers
      </span>
      {' '}
      <span className="text-gray-900">Like You</span>
    </h2>
    <p className="text-gray-600 text-base max-w-2xl mx-auto">
      Join thousands of satisfied players who trust us for their gaming needs.
    </p>
  </div>
);

const TestimonialCard = ({ testimonial, index }) => (
  <figure
    className="group relative h-full flex flex-col"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="relative h-full flex-grow flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:border-emerald-300 shadow-sm hover:shadow-md">
      
      {/* Quote Icon */}
      <Quote className="absolute top-4 right-4 w-12 h-12 text-emerald-100" />

      {/* Content */}
      <div className="relative p-6 flex-grow">
        <div className="flex items-center gap-1 mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <blockquote className="text-gray-700 text-sm leading-relaxed">
          <p>"{testimonial.comment}"</p>
        </blockquote>
      </div>

      {/* Author Info Footer */}
      <figcaption className="relative flex items-center gap-3 p-4 bg-gray-50 border-t border-gray-100 mt-auto">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-lg shrink-0 text-white font-semibold">
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
          <div className="text-xs text-gray-600">Played: <span className="font-medium text-emerald-600">{testimonial.game}</span></div>
        </div>
      </figcaption>
    </div>
  </figure>
);

const Testimonials = ({ testimonials }) => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader />

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;