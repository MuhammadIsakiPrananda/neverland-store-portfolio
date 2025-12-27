import React, { createContext, useContext, useState, useEffect } from 'react';
import * as dashboardApi from '../services/dashboardApi';
import { games as initialGames, testimonials as initialTestimonials, faqs as initialFaqs } from '../data/appData.jsx';
import toast from 'react-hot-toast';

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

// Helper to check if backend is available
let backendAvailable = true;

export const DashboardProvider = ({ children }) => {
  // State management with localStorage fallback
  const [games, setGames] = useState(() => {
    const saved = localStorage.getItem('dashboard_games');
    return saved ? JSON.parse(saved) : initialGames;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('dashboard_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('dashboard_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [flashSales, setFlashSales] = useState(() => {
    const saved = localStorage.getItem('dashboard_flashsales');
    return saved ? JSON.parse(saved) : [];
  });

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('dashboard_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [faqs, setFaqs] = useState(() => {
    const saved = localStorage.getItem('dashboard_faqs');
    return saved ? JSON.parse(saved) : initialFaqs;
  });

  const [notifications, setNotifications] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);
  
  // Loading states
  const [loading, setLoading] = useState({
    games: false,
    orders: false,
    users: false,
    flashSales: false,
    testimonials: false,
    faqs: false
  });

  // Statistics (calculated from real data)
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    ordersToday: 0,
    activeUsers: 0,
    revenue: 0,
    trend: {
      sales: 12.5,
      orders: 8.3,
      users: 5.7,
      revenue: 15.2
    }
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('dashboard_games', JSON.stringify(games));
  }, [games]);

  useEffect(() => {
    localStorage.setItem('dashboard_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('dashboard_flashsales', JSON.stringify(flashSales));
  }, [flashSales]);

  useEffect(() => {
    localStorage.setItem('dashboard_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('dashboard_faqs', JSON.stringify(faqs));
  }, [faqs]);

  // Try to fetch from API on mount, fallback to local if fails
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    // Try to fetch from API, but don't show errors if backend unavailable
    try {
      await Promise.all([
        fetchGames(),
        fetchOrders(),
        fetchFlashSales(),
        fetchTestimonials(),
        fetchFAQs()
      ]);
      backendAvailable = true;
    } catch (error) {
      backendAvailable = false;
      console.log('Backend not available, using local data');
    }
  };

  // ========== GAMES ==========
  const fetchGames = async () => {
    try {
      setLoading(prev => ({ ...prev, games: true }));
      const data = await dashboardApi.fetchGames();
      setGames(data);
      backendAvailable = true;
    } catch (error) {
      // Silently use local data if API fails
      console.log('Using local games data');
    } finally {
      setLoading(prev => ({ ...prev, games: false }));
    }
  };

  const addGame = async (gameData) => {
    try {
      if (backendAvailable) {
        const newGame = await dashboardApi.createGame(gameData);
        setGames(prev => [newGame, ...prev]);
        addActivity({ type: 'game', message: `Game added: ${gameData.title}` });
        toast.success('Game added successfully');
        return newGame;
      }
    } catch (error) {
      console.log('API failed, using local storage');
    }
    
    // Fallback to local
    const newGame = { ...gameData, id: Date.now() };
    setGames(prev => [newGame, ...prev]);
    addActivity({ type: 'game', message: `Game added: ${gameData.title}` });
    toast.success('Game added successfully (local)');
    return newGame;
  };

  const updateGame = async (id, gameData) => {
    try {
      if (backendAvailable) {
        const updatedGame = await dashboardApi.updateGame(id, gameData);
        setGames(prev => prev.map(g => g.id === id ? updatedGame : g));
        addActivity({ type: 'game', message: `Game updated: ${gameData.title}` });
        toast.success('Game updated successfully');
        return updatedGame;
      }
    } catch (error) {
      console.log('API failed, using local storage');
    }

    // Fallback to local
    const updatedGame = { ...gameData, id };
    setGames(prev => prev.map(g => g.id === id ? updatedGame : g));
    addActivity({ type: 'game', message: `Game updated: ${gameData.title}` });
    toast.success('Game updated successfully (local)');
    return updatedGame;
  };

  const deleteGame = async (id) => {
    try {
      if (backendAvailable) {
        await dashboardApi.deleteGame(id);
        const game = games.find(g => g.id === id);
        setGames(prev => prev.filter(g => g.id !== id));
        addActivity({ type: 'game', message: `Game deleted: ${game?.title}` });
        toast.success('Game deleted successfully');
        return;
      }
    } catch (error) {
      console.log('API failed, using local storage');
    }

    // Fallback to local
    const game = games.find(g => g.id === id);
    setGames(prev => prev.filter(g => g.id !== id));
    addActivity({ type: 'game', message: `Game deleted: ${game?.title}` });
    toast.success('Game deleted successfully (local)');
  };

  // ========== ORDERS ==========
  const fetchOrders = async () => {
    try {
      setLoading(prev => ({ ...prev, orders: true }));
      const data = await dashboardApi.fetchOrders();
      setOrders(data);
      calculateStatistics(data);
      backendAvailable = true;
    } catch (error) {
      console.log('Using local orders data');
      calculateStatistics(orders);
    } finally {
      setLoading(prev => ({ ...prev, orders: false }));
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      if (backendAvailable) {
        await dashboardApi.updateOrderStatus(id, status);
      }
    } catch (error) {
      console.log('API failed, updating locally');
    }
    
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    addActivity({ type: 'order', message: `Order #${id} status updated to ${status}` });
    toast.success('Order status updated');
  };

  // ========== FLASH SALES ==========
  const fetchFlashSales = async () => {
    try {
      setLoading(prev => ({ ...prev, flashSales: true }));
      const data = await dashboardApi.fetchFlashSales();
      setFlashSales(data);
      backendAvailable = true;
    } catch (error) {
      console.log('Using local flash sales data');
    } finally {
      setLoading(prev => ({ ...prev, flashSales: false }));
    }
  };

  const createFlashSale = async (flashSaleData) => {
    try {
      if (backendAvailable) {
        const newFlashSale = await dashboardApi.createFlashSale(flashSaleData);
        setFlashSales(prev => [newFlashSale, ...prev]);
        addActivity({ type: 'flashsale', message: `Flash sale created: ${flashSaleData.name}` });
        toast.success('Flash sale created successfully');
        return newFlashSale;
      }
    } catch (error) {
      console.log('API failed, using local storage');
    }

    // Fallback to local
    const newFlashSale = { ...flashSaleData, id: Date.now() };
    setFlashSales(prev => [newFlashSale, ...prev]);
    addActivity({ type: 'flashsale', message: `Flash sale created: ${flashSaleData.name}` });
    toast.success('Flash sale created successfully (local)');
    return newFlashSale;
  };

  const updateFlashSale = async (id, flashSaleData) => {
    try {
      if (backendAvailable) {
        const updated = await dashboardApi.updateFlashSale(id, flashSaleData);
        setFlashSales(prev => prev.map(fs => fs.id === id ? updated : fs));
        addActivity({ type: 'flashsale', message: `Flash sale updated: ${flashSaleData.name}` });
        toast.success('Flash sale updated successfully');
        return updated;
      }
    } catch (error) {
      console.log('API failed, using local storage');
    }

    // Fallback to local
    const updated = { ...flashSaleData, id };
    setFlashSales(prev => prev.map(fs => fs.id === id ? updated : fs));
    addActivity({ type: 'flashsale', message: `Flash sale updated: ${flashSaleData.name}` });
    toast.success('Flash sale updated successfully (local)');
    return updated;
  };

  const deleteFlashSale = async (id) => {
    try {
      if (backendAvailable) {
        await dashboardApi.deleteFlashSale(id);
      }
    } catch (error) {
      console.log('API failed, using local storage');
    }

    const fs = flashSales.find(f => f.id === id);
    setFlashSales(prev => prev.filter(f => f.id !== id));
    addActivity({ type: 'flashsale', message: `Flash sale deleted: ${fs?.name}` });
    toast.success('Flash sale deleted successfully');
  };

  // ========== TESTIMONIALS ==========
  const fetchTestimonials = async () => {
    try {
      setLoading(prev => ({ ...prev, testimonials: true }));
      const data = await dashboardApi.fetchTestimonials();
      setTestimonials(data);
      backendAvailable = true;
    } catch (error) {
      console.log('Using local testimonials data');
    } finally {
      setLoading(prev => ({ ...prev, testimonials: false }));
    }
  };

  const addTestimonial = async (testimonialData) => {
    try {
      if (backendAvailable) {
        const newTestimonial = await dashboardApi.createTestimonial(testimonialData);
        setTestimonials(prev => [newTestimonial, ...prev]);
        addActivity({ type: 'testimonial', message: `Testimonial added from ${testimonialData.name}` });
        return newTestimonial;
      }
    } catch (error) {
      console.log('API failed, using local storage');
    }

    // Fallback to local
    const newTestimonial = { ...testimonialData, id: Date.now() };
    setTestimonials(prev => [newTestimonial, ...prev]);
    addActivity({ type: 'testimonial', message: `Testimonial added from ${testimonialData.name}` });
    return newTestimonial;
  };

  const updateTestimonial = async (id, testimonialData) => {
    try {
      if (backendAvailable) {
        const updated = await dashboardApi.updateTestimonial(id, testimonialData);
        setTestimonials(prev => prev.map(t => (t.id === id || t._id === id) ? updated : t));
        addActivity({ type: 'testimonial', message: `Testimonial updated from ${testimonialData.name}` });
        return updated;
      }
    } catch (error) {
      console.log('API failed, using local storage');
    }

    // Fallback to local
    const updated = { ...testimonialData, id };
    setTestimonials(prev => prev.map(t => (t.id === id || t._id === id) ? updated : t));
    addActivity({ type: 'testimonial', message: `Testimonial updated from ${testimonialData.name}` });
    return updated;
  };

  const deleteTestimonial = async (id) => {
    try {
      if (backendAvailable) {
        await dashboardApi.deleteTestimonial(id);
      }
    } catch (error) {
      console.log('API failed, using local storage');
    }

    setTestimonials(prev => prev.filter(t => t.id !== id && t._id !== id));
    addActivity({ type: 'testimonial', message: 'Testimonial deleted' });
  };

  // ========== FAQs ==========
  const fetchFAQs = async () => {
    try {
      setLoading(prev => ({ ...prev, faqs: true }));
      const data = await dashboardApi.fetchFAQs();
      setFaqs(data);
      backendAvailable = true;
    } catch (error) {
      console.log('Using local FAQs data');
    } finally {
      setLoading(prev => ({ ...prev, faqs: false }));
    }
  };

  const addFaq = async (faqData) => {
    try {
      if (backendAvailable) {
        const newFaq = await dashboardApi.createFAQ(faqData);
        setFaqs(prev => [newFaq, ...prev]);
        addActivity({ type: 'faq', message: 'FAQ added' });
        return newFaq;
      }
    } catch (error) {
      console.log('API failed, using local storage');
    }

    // Fallback to local
    const newFaq = { ...faqData, id: Date.now() };
    setFaqs(prev => [newFaq, ...prev]);
    addActivity({ type: 'faq', message: 'FAQ added' });
    return newFaq;
  };

  const updateFaq = async (id, faqData) => {
    try {
      if (backendAvailable) {
        const updated = await dashboardApi.updateFAQ(id, faqData);
        setFaqs(prev => prev.map(f => (f.id === id || f._id === id) ? updated : f));
        addActivity({ type: 'faq', message: 'FAQ updated' });
        return updated;
      }
    } catch (error) {
      console.log('API failed, using local storage');
    }

    // Fallback to local
    const updated = { ...faqData, id };
    setFaqs(prev => prev.map(f => (f.id === id || f._id === id) ? updated : f));
    addActivity({ type: 'faq', message: 'FAQ updated' });
    return updated;
  };

  const deleteFaq = async (id) => {
    try {
      if (backendAvailable) {
        await dashboardApi.deleteFAQ(id);
      }
    } catch (error) {
      console.log('API failed, using local storage');
    }

    setFaqs(prev => prev.filter(f => f.id !== id && f._id !== id));
    addActivity({ type: 'faq', message: 'FAQ deleted' });
  };

  // ========== USERS (local only for now) ==========
  const updateUserRole = async (id, role) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
    addActivity({ type: 'user', message: `User role updated to ${role}` });
    toast.success('User role updated');
  };

  // ========== HELPERS ==========
  const calculateStatistics = (ordersData) => {
    const today = new Date().toDateString();
    const todayOrders = ordersData.filter(o => {
      const orderDate = new Date(o.date || o.createdAt).toDateString();
      return orderDate === today;
    });
    
    const totalRevenue = ordersData.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalSales = ordersData.reduce((sum, o) => sum + (o.quantity || 1), 0);
    
    setStatistics({
      totalSales,
      ordersToday: todayOrders.length,
      activeUsers: users.length,
      revenue: totalRevenue,
      trend: {
        sales: 12.5,
        orders: 8.3,
        users: 5.7,
        revenue: 15.2
      }
    });
  };

  const addNotification = (notification) => {
    setNotifications(prev => [{
      ...notification,
      id: Date.now(),
      read: false
    }, ...prev].slice(0, 50));
  };

  const addActivity = (activity) => {
    setActivityFeed(prev => [{
      ...activity,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }, ...prev].slice(0, 100));
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const value = {
    // Data
    games,
    orders,
    users,
    flashSales,
    testimonials,
    faqs,
    statistics,
    notifications,
    activityFeed,
    loading,

    // Game methods
    addGame,
    updateGame,
    deleteGame,
    fetchGames,

    // Order methods
    updateOrderStatus,
    fetchOrders,

    // Flash sale methods
    createFlashSale,
    updateFlashSale,
    deleteFlashSale,
    fetchFlashSales,

    // Testimonial methods
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    fetchTestimonials,

    // FAQ methods
    addFaq,
    updateFaq,
    deleteFaq,
    fetchFAQs,

    // User methods
    updateUserRole,

    // Utility methods
    addNotification,
    markNotificationAsRead,
    clearAllNotifications,
    fetchAllData
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
