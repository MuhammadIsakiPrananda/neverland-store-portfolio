import axios from 'axios';

// API Base URL
// In development, Vite proxy will handle /api requests
// In production, use the full URL
const API_BASE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_BASE_URL || 'http://store.neverlandstudio.my.id'
  : ''; // Empty string in dev mode to use Vite proxy

// Request timeout
const REQUEST_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 30000; // 30 seconds

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and retry logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout:', error.config.url);
      return Promise.reject({
        message: 'Request timeout. Please check your connection and try again.',
        error
      });
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
      return Promise.reject({
        message: 'Network error. Please check your internet connection.',
        error
      });
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Only redirect if not already on home page
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
      
      return Promise.reject({
        message: 'Session expired. Please login again.',
        error
      });
    }

    // Handle 429 Too Many Requests
    if (error.response?.status === 429) {
      return Promise.reject({
        message: 'Too many requests. Please try again later.',
        error
      });
    }

    // Handle 500 Server Errors
    if (error.response?.status >= 500) {
      return Promise.reject({
        message: 'Server error. Please try again later.',
        error
      });
    }

    // Return the error with a user-friendly message
    const errorMessage = error.response?.data?.error 
      || error.response?.data?.message 
      || error.message 
      || 'An unexpected error occurred';

    return Promise.reject({
      message: errorMessage,
      statusCode: error.response?.status,
      error
    });
  }
);

/**
 * Helper function to handle API errors consistently
 */
export const handleApiError = (error) => {
  if (error.message) {
    return error.message;
  }
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  return 'An unexpected error occurred';
};

export default api;

