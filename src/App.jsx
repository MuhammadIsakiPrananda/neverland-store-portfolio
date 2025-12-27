import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import error boundary and loading
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load dashboard
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));

import { DashboardProvider } from './contexts/DashboardContext';

// Import komponen modular
import Header from './components/Layout/Header';
import SpecialOfferModal from './components/Layout/SpecialOfferModal';
import PromoModal from './components/Layout/PromoModal';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import GameList from './components/Game/GameList/GameList';
import GameModal from './components/Game/GameModal/GameModal';
import Testimonials from './components/Testimonials/Testimonials';
import CartModal from './components/Cart/CartModal';
import FAQ from './components/FAQ/FAQ';
import Newsletter from './components/Newsletter/Newsletter';
import Footer from './components/Layout/Footer/Footer';
import ToastNotification from './components/Layout/ToastNotification';
import FloatingActionButtons from './components/Layout/FloatingActionButtons';
import ScrollProgress from './components/UI/ScrollProgress';
import BackToTop from './components/UI/BackToTop';
import FlashSaleBanner from './components/FlashSale/FlashSaleBanner';
import LiveChatWidget from './components/UI/LiveChatWidget';

// Import data dan utils
import { games, categories, features, paymentMethods, testimonials, faqs } from './data/appData.jsx';
import { formatPrice } from './utils/formatters';

const HomePage = ({ 
  selectedGame, 
  setSelectedGame,
  menuOpen,
  setMenuOpen,
  searchQuery,
  setSearchQuery,
  isCartOpen,
  setIsCartOpen,
  toast,
  setToast,
  showSpecialOffer,
  setShowSpecialOffer
}) => {
  // Flash Sale end time (set to 6 hours from now for demo)
  const flashSaleEndTime = new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString();
  
  // Sample flash sale games
  const flashSaleGames = games.slice(0, 6).map(game => ({
    ...game,
    discount: 30,
    originalPrice: 100000,
    salePrice: 70000,
  }));

  // Contoh data spesial offer
  const specialOffer = {
    title: 'Special Year-End Offer!',
    description: 'Dapatkan diskon hingga 50% untuk semua top up game hanya hari ini!',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=200&fit=crop',
    cta: {
      label: 'Lihat Penawaran',
      link: '#games',
    },
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Filter games based on search query
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/20 to-lime-50/20 text-gray-900 overflow-x-hidden">
      {/* Floating UI Components */}
      <ScrollProgress />
      <BackToTop />
      <LiveChatWidget />

      {/* Header */}
      <Header 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        onCartClick={() => setIsCartOpen(true)}
        showToast={showToast}
        onSpecialOfferClick={() => setShowSpecialOffer(true)}
        showPromoModal={showSpecialOffer}
        setShowPromoModal={setShowSpecialOffer}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home">
          <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </section>

        {/* Flash Sale Section */}
        <FlashSaleBanner 
          endTime={flashSaleEndTime}
          saleGames={flashSaleGames}
        />

        {/* Features Section */}
        <section id="features">
          <Features features={features} />
        </section>

        {/* Games List Section */}
        <section id="games">
          <GameList 
            games={filteredGames} 
            onGameSelect={setSelectedGame}
            categories={categories}
          />
        </section>

        {/* Testimonials Section */}
        <Testimonials testimonials={testimonials} />

        {/* FAQ Section */}
        <section id="faq">
          <FAQ faqs={faqs} />
        </section>

        {/* Newsletter Section */}
        <section id="contact">
          <Newsletter />
        </section>
      </main>

      {/* Game Modal */}
      <GameModal 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)}
        paymentMethods={paymentMethods}
        formatPrice={formatPrice}
      />

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Footer */}
      <Footer />

      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Promo Modal (Flash Sales) - Separate from header */}
      <PromoModal 
        isOpen={showSpecialOffer}
        onClose={() => setShowSpecialOffer(false)}
      />

      {/* Floating Action Buttons */}
      <FloatingActionButtons />

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

const App = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [showSpecialOffer, setShowSpecialOffer] = useState(false);

  return (
    <ErrorBoundary>
      <DashboardProvider>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-lime-50">
            <LoadingSpinner size="xl" />
          </div>
        }>
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  selectedGame={selectedGame}
                  setSelectedGame={setSelectedGame}
                  menuOpen={menuOpen}
                  setMenuOpen={setMenuOpen}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  isCartOpen={isCartOpen}
                  setIsCartOpen={setIsCartOpen}
                  toast={toast}
                  setToast={setToast}
                  showSpecialOffer={showSpecialOffer}
                  setShowSpecialOffer={setShowSpecialOffer}
                />
              } 
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
        
        {/* Global Toaster for dashboard notifications */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </DashboardProvider>
    </ErrorBoundary>
  );
};

export default App;