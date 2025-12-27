import React from 'react';
import { Zap, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Shield, Award, ArrowRight } from 'lucide-react';
import LogoBCA from '../../../assets/Logo BCA.webp';
import LogoBRI from '../../../assets/Logo BRI.webp';
import LogoDANA from '../../../assets/Logo DANA.webp';
import LogoOVO from '../../../assets/Logo OVO.webp';
import LogoMandiri from '../../../assets/Logo Mandiri.webp';
import LogoGopay from '../../../assets/Logo Gopay.webp';
import logoImage from '../../../assets/Neverland Games Store.png';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white border-2 border-emerald-200 rounded-lg p-1.5 shadow-sm">
                <img 
                  src={logoImage} 
                  alt="Neverland Games Store" 
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900 block">Neverland Store</span>
                <span className="text-xs text-gray-500">Your Gaming Paradise</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Your trusted partner for instant game top-ups. Fast, secure, and reliable service for gamers worldwide.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 bg-white border border-emerald-200 px-2.5 py-1.5 rounded-lg">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-xs text-gray-700 font-medium">Secure</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-amber-200 px-2.5 py-1.5 rounded-lg">
                <Award className="w-4 h-4 text-amber-600" />
                <span className="text-xs text-gray-700 font-medium">Trusted</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-emerald-200 px-2.5 py-1.5 rounded-lg">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span className="text-xs text-gray-700 font-medium">Instant</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-4 text-gray-900">Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'Browse Games', 'Features', 'Testimonials', 'FAQ', 'About Us'].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors text-sm group"
                >
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 -ml-5 group-hover:ml-0" />
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-base font-bold mb-4 text-gray-900">Support</h4>
            <div className="space-y-2">
              {[
                'Help Center',
                'How to Top Up',
                'Payment Methods',
                'Terms of Service',
                'Privacy Policy',
                'Refund Policy'
              ].map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors text-sm group"
                >
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 -ml-5 group-hover:ml-0" />
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-bold mb-4 text-gray-900">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2 text-sm">
                <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900 font-medium text-xs">Email</p>
                  <a href="mailto:support@neverlandstore.com" className="text-gray-600 hover:text-emerald-600 transition-colors">
                    support@neverlandstore.com 
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-2 text-sm">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900 font-medium text-xs">WhatsApp</p>
                  <a href="https://wa.me/6281234567890" className="text-gray-600 hover:text-emerald-600 transition-colors">
                    +62 812-3456-7890 
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900 font-medium text-xs">Location</p>
                  <p className="text-gray-600">Jakarta, Indonesia</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg">
                <p className="text-xs text-gray-600">Customer Service</p>
                <p className="text-sm font-semibold text-emerald-600">24/7 Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Payment Methods */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Media */}
            <div>
              <p className="text-sm text-gray-600 mb-3 text-center md:text-left font-medium">Follow Us</p>
              <div className="flex items-center space-x-2">
                {[
                  { icon: Facebook, color: 'hover:bg-blue-600', link: '#' },
                  { icon: Instagram, color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600', link: '#' },
                  { icon: Twitter, color: 'hover:bg-sky-600', link: '#' },
                  { icon: Youtube, color: 'hover:bg-red-600', link: '#' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 bg-white border border-gray-200 flex items-center justify-center rounded-lg transition-all hover:text-white ${social.color}`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <p className="text-sm text-gray-600 mb-3 text-center md:text-right font-medium">We Accept</p>
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                {[
                  { logo: LogoGopay, name: 'GoPay' },
                  { logo: LogoOVO, name: 'OVO' },
                  { logo: LogoDANA, name: 'DANA' },
                  { logo: LogoBCA, name: 'BCA' },
                  { logo: LogoBRI, name: 'BRI' },
                  { logo: LogoMandiri, name: 'Mandiri' }
                ].map((payment, index) => (
                  <div key={index} className="bg-white border border-gray-200 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-700 flex items-center gap-1.5">
                    <img src={payment.logo} alt={`Logo ${payment.name}`} className="w-6 h-6 object-contain rounded" />
                    <span>{payment.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600 text-center">
            &copy; {currentYear} Neverland Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;