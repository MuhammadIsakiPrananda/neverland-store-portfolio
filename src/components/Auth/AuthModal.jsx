import React, { useState, useEffect, useRef } from 'react';
// Tambah fetch polyfill jika perlu
import { createPortal } from 'react-dom';
import { X, Mail, Lock, User, Eye, EyeOff, Github, Chrome, Facebook, Sparkles, Shield, Zap } from 'lucide-react';

// Password strength requirements
const passwordRequirements = [
  {
    label: 'At least 8 characters',
    test: (pw) => pw.length >= 8,
  },
  {
    label: 'Uppercase letter',
    test: (pw) => /[A-Z]/.test(pw),
  },
  {
    label: 'Lowercase letter',
    test: (pw) => /[a-z]/.test(pw),
  },
  {
    label: 'Number',
    test: (pw) => /\d/.test(pw),
  },
  {
    label: 'Symbol',
    test: (pw) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw),
  },
];

const AuthModal = ({ isOpen, onClose, initialMode = 'signin', showToast, onLoginSuccess }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [forgotError, setForgotError] = useState("");
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Prevent body scroll and layout shift when modal is open.
  // This effect calculates the scrollbar width and adds padding to the body
  // and the fixed header to prevent them from shifting when the scrollbar is hidden.
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const originalBodyPaddingRight = document.body.style.paddingRight;
      const originalBodyOverflow = document.body.style.overflow;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Apply padding to the fixed header as well
      const header = document.querySelector('nav.fixed');
      if (header) header.style.paddingRight = `${scrollbarWidth}px`;

      return () => {
        // Restore body styles
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.paddingRight = originalBodyPaddingRight;

        // For the header, temporarily disable transitions to prevent the "slide" effect on close.
        if (header) {
          header.style.transition = 'none';
          header.style.paddingRight = originalBodyPaddingRight;
          // Re-enable transitions on the next frame so other effects (like scroll) work again.
          requestAnimationFrame(() => {
            header.style.transition = ''; // Let the CSS class's transition take over.
          });
        }
      };
    }
  }, [isOpen]);

  // Sync mode with initialMode when modal opens
  // Also resets the entire form state for a clean slate
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrors({});
      setShowPassword(false);
      setShowConfirmPassword(false);
      setShowForgot(false);
      setForgotEmail("");
      setForgotSuccess("");
      setForgotError("");
      setForgotLoading(false);
      // Reset form data to ensure the modal is always fresh
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
      });
    }
  }, [isOpen, initialMode]);

  // Handle keyboard interactions (focus trapping only)
  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    const modalElement = modalRef.current;
    modalElement?.addEventListener('keydown', handleTabKey);
    return () => modalElement?.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (mode === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the terms';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    const apiBase = '';

    if (mode === 'signup') {
      try {
        const res = await fetch(`${apiBase}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          })
        });
        const data = await res.json();
        
        if (!res.ok) {
          setErrors(prev => ({ ...prev, email: data.message || 'Registration failed' }));
          setIsLoading(false);
          return;
        }
        
        setIsLoading(false);
        onClose();
        if (showToast) showToast('Akun berhasil dibuat! Silakan login.', 'success');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false
        });
      } catch (err) {
        console.error('Registration error:', err);
        setIsLoading(false);
        setErrors(prev => ({ ...prev, email: 'Registration failed. Check connection.' }));
      }
    } else {
      try {
        const res = await fetch(`${apiBase}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });
        const data = await res.json();
        
        if (!res.ok) {
          setErrors(prev => ({ ...prev, password: data.message || 'Login failed' }));
          setIsLoading(false);
          return;
        }
        
        // Simpan token/user ke localStorage jika perlu
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Trigger custom event for login (with delay to ensure localStorage is set)
        setTimeout(() => {
          window.dispatchEvent(new Event('user-login'));
          window.dispatchEvent(new Event('storage'));
          if (onLoginSuccess) onLoginSuccess(data.user);
        }, 10);
        
        setIsLoading(false);
        onClose();
        if (showToast) showToast('Login berhasil! Selamat datang kembali.', 'success');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false
        });
      } catch (err) {
        console.error('Login error:', err);
        setIsLoading(false);
        setErrors(prev => ({ ...prev, password: 'Login failed. Check connection.' }));
      }
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setErrors({});
  };

  // Handler for forgot password
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSuccess("");
    setForgotError("");
    setForgotLoading(true);
    // Simulasi request
    setTimeout(() => {
      if (!forgotEmail.trim()) {
        setForgotError("Email wajib diisi.");
      } else if (!/\S+@\S+\.\S+/.test(forgotEmail)) {
        setForgotError("Format email tidak valid.");
      } else {
        setForgotSuccess("Link reset password telah dikirim ke email Anda.");
      }
      setForgotLoading(false);
    }, 1500);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      
      {/* Modal Content */}
      <div 
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl border-2 border-emerald-300 shadow-2xl shadow-emerald-400/20 animate-scale-in custom-scrollbar"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/15 to-lime-400/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-lime-300/10 to-emerald-300/15 rounded-full blur-[120px] pointer-events-none" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 group"
        >
          <X className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
        </button>
        <div className="relative p-8">
          {showForgot ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-100 via-lime-50 to-emerald-100 border-2 border-emerald-200 mb-6 shadow-xl shadow-emerald-500/25 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-lime-400/20 rounded-3xl blur-xl opacity-50" />
                  <Lock className="w-9 h-9 text-emerald-600 relative z-10" />
                </div>
                  <h2 id="auth-modal-title" className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-lime-600 bg-clip-text text-transparent mb-3">
                    Forgot Password
                  </h2>
                  <p className="text-sm text-gray-600 font-medium">
                    Enter your Neverland Store account email. We will send a password reset link to your email.
                  </p>
              </div>
              <form onSubmit={handleForgotSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      name="forgotEmail"
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={`w-full pl-10 pr-4 py-3 bg-white border-2 ${forgotError ? 'border-red-500' : 'border-gray-200'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300`}
                      autoFocus
                      disabled={forgotLoading} 
                    />
                  </div>
                  {forgotError && <p className="mt-1 text-xs text-red-600">{forgotError}</p>}
                  {forgotSuccess && <p className="mt-1 text-xs text-emerald-600">{forgotSuccess}</p>}
                </div>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full relative group px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-500 hover:to-lime-500 text-white overflow-hidden shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  <span className="relative flex items-center justify-center gap-2">
                    {forgotLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Zap className="w-5 h-5 text-white" />
                    )}
                    Kirim Link Reset
                  </span>
                </button>
                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    onClick={() => setShowForgot(false)}
                  >
                    Kembali ke Login
                  </button>
                  <button
                    type="button" 
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                    onClick={() => { setShowForgot(false); setMode('signup'); }}
                  >
                    Register
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              {/* ...existing code... */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-100 via-lime-50 to-emerald-100 border-2 border-emerald-200 mb-6 shadow-xl shadow-emerald-500/25 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-lime-400/20 rounded-3xl blur-xl opacity-50" />
                  {mode === 'signup' ? ( 
                    <Sparkles className="w-9 h-9 text-emerald-600 relative z-10" />
                  ) : (
                    <Shield className="w-9 h-9 text-emerald-600 relative z-10" />
                  )}
                </div>
                <h2 id="auth-modal-title" className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-lime-600 bg-clip-text text-transparent mb-3">
                  {mode === 'signup' ? 'Join Neverland 🌟' : 'Welcome Back! 👋'}
                </h2>
                <p className="text-sm text-gray-600 font-medium">
                  {mode === 'signup' 
                    ? 'Create your account and start your journey' 
                    : 'Sign in to access exclusive gaming content'
                  }
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 mb-6">
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-white hover:bg-gradient-to-r hover:from-emerald-50 hover:to-lime-50 border-2 border-gray-200 hover:border-emerald-400 transition-all duration-300 group shadow-md hover:shadow-lg hover:shadow-emerald-400/20 hover:scale-105"
                > 
                  <Chrome className="w-5 h-5 text-gray-600 group-hover:text-emerald-600 transition-all duration-300 group-hover:scale-110" />
                  <span className="font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors">
                    Continue with Google
                  </span>
                </button> 
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSocialLogin('github')}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-emerald-50 border-2 border-gray-200 hover:border-emerald-400 transition-all duration-300 group shadow-sm hover:shadow-md hover:scale-105"
                  >
                    <Github className="w-5 h-5 text-gray-600 group-hover:text-emerald-600 transition-all duration-300" />
                    <span className="font-semibold text-gray-700 text-sm group-hover:text-emerald-700">
                      GitHub
                    </span>
                  </button>
                  <button
                    onClick={() => handleSocialLogin('facebook')}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-emerald-50 border-2 border-gray-200 hover:border-emerald-400 transition-all duration-300 group shadow-sm hover:shadow-md hover:scale-105"
                  >
                    <Facebook className="w-5 h-5 text-gray-600 group-hover:text-emerald-600 transition-all duration-300" />
                    <span className="font-semibold text-gray-700 text-sm group-hover:text-emerald-700">
                      Facebook
                    </span>
                  </button>
                </div>
              </div>
              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-200" />
                </div>
                <div className="relative px-4 bg-white text-xs text-gray-500 font-medium">
                  OR CONTINUE WITH EMAIL
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full pl-10 pr-4 py-3 bg-white border-2 ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300`}
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-4 py-3 bg-white border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-12 py-3 bg-white border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300`}
                    />
                    <button
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {/* Password strength indicator */}
                  {mode === 'signup' && (
                    <ul className="mt-2 mb-1 text-xs space-y-1">
                      {passwordRequirements.map((req, idx) => {
                        const met = req.test(formData.password);
                        return (
                          <li key={idx} className={met ? 'text-green-400 flex items-center gap-1' : 'text-slate-500 flex items-center gap-1'}>
                            <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ background: met ? '#22c55e' : '#64748b' }}></span>
                            {req.label}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                </div>
                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-12 py-3 bg-white border-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 hover:border-emerald-300`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
                  </div>
                )}
                {mode === 'signin' ? (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-white/10 bg-white/5 text-emerald-500 focus:ring-emerald-500/50 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                    </label>
                    <button
                      type="button" 
                      className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                      onClick={() => setShowForgot(true)}
                    >
                      Forgot Password?
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className={`mt-0.5 w-4 h-4 rounded border-white/10 bg-white/5 text-emerald-500 focus:ring-emerald-500/50 focus:ring-offset-0 cursor-pointer ${errors.agreeTerms ? 'border-red-500/50' : ''}`}
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        I agree to the{' '}
                        <a href="#" className="text-emerald-600 hover:underline">Terms of Service</a>{' '}and{' '}
                        <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a>
                      </span>
                    </label>
                    {errors.agreeTerms && <p className="mt-1 text-xs text-red-600">{errors.agreeTerms}</p>}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group px-6 py-4 rounded-xl font-bold text-sm transition-all duration-300 bg-gradient-to-r from-emerald-500 via-lime-500 to-emerald-500 hover:from-emerald-400 hover:via-lime-400 hover:to-emerald-400 text-white overflow-hidden shadow-xl shadow-emerald-500/40 hover:shadow-emerald-500/60 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 bg-[length:200%_100%] hover:bg-[position:100%_0]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5\" />
                        <span>{mode === 'signup' ? 'Create Account' : 'Sign In Now'}</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                  <button
                    onClick={switchMode}
                    className="ml-1 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                  >
                    {mode === 'signup' ? 'Sign In' : 'Create one'}
                  </button>
                </p>
              </div>
              {mode === 'signup' && (
                <div className="mt-6 pt-6 border-t-2 border-gray-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Shield className="w-6 h-6 text-emerald-600" />
                      </div>
                      <span className="text-xs text-gray-600 font-medium">Secure</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Zap className="w-6 h-6 text-emerald-600" />
                      </div>
                      <span className="text-xs text-gray-600 font-medium">Fast</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Sparkles className="w-6 h-6 text-emerald-600" />
                      </div>
                      <span className="text-xs text-gray-600 font-medium">Premium</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  , document.body);

};

export default AuthModal;
