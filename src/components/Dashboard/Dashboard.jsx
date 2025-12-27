import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Zap, 
  MessageSquare, 
  HelpCircle,
  Settings,
  Menu,
  X,
  Home,
  LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationBell from './UI/NotificationBell';
import DashboardOverview from './DashboardOverview';
import OrderManagement from './OrderManagement';
import GameManagement from './GameManagement';
import UserManagement from './UserManagement';
import FlashSaleManagement from './FlashSaleManagement';
import TestimonialManagement from './TestimonialManagement';
import FAQManagement from './FAQManagement';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  // Sidebar open by default on desktop (lg+), closed on mobile
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  const navigate = useNavigate();

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview', component: DashboardOverview },
    { id: 'orders', icon: ShoppingCart, label: 'Orders', component: OrderManagement },
    { id: 'games', icon: Package, label: 'Games', component: GameManagement },
    { id: 'users', icon: Users, label: 'Users', component: UserManagement },
    { id: 'flashsales', icon: Zap, label: 'Flash Sales', component: FlashSaleManagement },
    { id: 'testimonials', icon: MessageSquare, label: 'Testimonials', component: TestimonialManagement },
    { id: 'faq', icon: HelpCircle, label: 'FAQ', component: FAQManagement },
  ];

  const ActiveComponent = menuItems.find(item => item.id === activeSection)?.component || DashboardOverview;

  const handleMenuClick = (id) => {
    setActiveSection(id);
    // Auto-close sidebar on mobile after clicking
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/20 to-lime-50/20">
      {/* Mobile Menu Button - Fixed top left */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        {sidebarOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>

      {/* Backdrop for mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: sidebarOpen ? 0 : '-100%',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="lg:translate-x-0 fixed left-0 top-0 h-screen w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-xl z-40 overflow-hidden"
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-200">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-lime-600 bg-clip-text text-transparent"
          >
            Dashboard
          </motion.h1>
          {/* Hide toggle on desktop, show close on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-180px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-lime-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white/80 backdrop-blur-xl">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:ml-72 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
          <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
            {/* Left side - Title (hidden menu button space on mobile) */}
            <div className="ml-16 lg:ml-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-gray-700 mt-1 hidden sm:block">
                Manage your Neverland Store from here
              </p>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <NotificationBell />
              
              <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">Admin</p>
                  <p className="text-xs text-gray-600">Administrator</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center text-white font-bold shadow-lg">
                  A
                </div>
              </div>
              {/* Mobile: Just avatar */}
              <div className="sm:hidden w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-4 sm:p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveComponent />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
