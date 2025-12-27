import api from './api';

// ========== GAMES ==========
export const fetchGames = async () => {
  const response = await api.get('/api/games');
  return response.data;
};

export const createGame = async (gameData) => {
  const response = await api.post('/api/games', gameData);
  return response.data;
};

export const updateGame = async (id, gameData) => {
  const response = await api.put(`/api/games/${id}`, gameData);
  return response.data;
};

export const deleteGame = async (id) => {
  const response = await api.delete(`/api/games/${id}`);
  return response.data;
};

// ========== ORDERS ==========
export const fetchOrders = async () => {
  const response = await api.get('/api/orders/all');
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/api/orders/${id}/status`, { status });
  return response.data;
};

// ========== TESTIMONIALS ==========
export const fetchTestimonials = async () => {
  const response = await api.get('/api/testimonials');
  return response.data;
};

export const createTestimonial = async (testimonialData) => {
  const response = await api.post('/api/testimonials', testimonialData);
  return response.data;
};

export const updateTestimonial = async (id, testimonialData) => {
  const response = await api.put(`/api/testimonials/${id}`, testimonialData);
  return response.data;
};

export const deleteTestimonial = async (id) => {
  const response = await api.delete(`/api/testimonials/${id}`);
  return response.data;
};

// ========== FAQs ==========
export const fetchFAQs = async () => {
  const response = await api.get('/api/faq');
  return response.data;
};

export const createFAQ = async (faqData) => {
  const response = await api.post('/api/faq', faqData);
  return response.data;
};

export const updateFAQ = async (id, faqData) => {
  const response = await api.put(`/api/faq/${id}`, faqData);
  return response.data;
};

export const deleteFAQ = async (id) => {
  const response = await api.delete(`/api/faq/${id}`);
  return response.data;
};

// ========== FLASH SALES ==========
export const fetchFlashSales = async () => {
  const response = await api.get('/api/flashsales');
  return response.data;
};

export const createFlashSale = async (flashSaleData) => {
  const response = await api.post('/api/flashsales', flashSaleData);
  return response.data;
};

export const updateFlashSale = async (id, flashSaleData) => {
  const response = await api.put(`/api/flashsales/${id}`, flashSaleData);
  return response.data;
};

export const deleteFlashSale = async (id) => {
  const response = await api.delete(`/api/flashsales/${id}`);
  return response.data;
};

// ========== USERS (for dashboard) ==========
// Note: User routes might need to be created in backend
export const fetchUsers = async () => {
  try {
    const response = await api.get('/api/users');
    return response.data;
  } catch (error) {
    console.warn('Users endpoint not available, using mock data');
    // Fallback to mock data if endpoint doesn't exist
    return [];
  }
};

export const updateUserRole = async (id, role) => {
  try {
    const response = await api.put(`/api/users/${id}/role`, { role });
    return response.data;
  } catch (error) {
    console.warn('User role update endpoint not available');
    throw error;
  }
};
