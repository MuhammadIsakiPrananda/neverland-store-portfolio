require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sequelize = require('./utils/sequelize');
const { errorHandler } = require('./middlewares/errorHandler');
const { sanitizeInput } = require('./middlewares/validator');

const app = express();

// Trust proxy (important for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security headers with Helmet
app.use(helmet({
  contentSecurityPolicy: false, // Disable for API
  crossOriginEmbedderPolicy: false,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes
app.use('/api/', limiter);

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sanitize inputs
app.use(sanitizeInput);

// Request logging (development only)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, {
      body: req.body,
      query: req.query,
      ip: req.ip,
    });
    next();
  });
}

// Health check endpoint
app.get('/', async (req, res) => {
  try {
    const dbHealth = await sequelize.healthCheck();
    res.json({ 
      message: 'Welcome to Neverland Store API!',
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: dbHealth
    });
  } catch (error) {
    res.status(503).json({
      message: 'Service Unavailable',
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/games', require('./routes/games'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/faq', require('./routes/faq'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/flashsales', require('./routes/flashSales'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/applicants', require('./routes/applicants'));
app.use('/api/collaborations', require('./routes/collaborations'));
app.use('/api/dashboard', require('./routes/dashboard'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`,
    timestamp: new Date().toISOString()
  });
});

// Use centralized error handler
app.use(errorHandler);

// Connect to MariaDB and sync models
let server;

async function startServer() {
  try {
    // Test database connection with retry logic
    await sequelize.testConnection();
    console.log('📊 Database: ' + `${process.env.DB_NAME}@${process.env.DB_HOST}:${process.env.DB_PORT}`);
    
    // Sync models
    await sequelize.sync();
    console.log('✅ Models synchronized');
    
    // Start server
    const PORT = process.env.PORT || 5000;
    server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔐 CORS Origin: ${process.env.CORS_ORIGIN || '*'}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('⚠️ SIGTERM signal received: closing HTTP server');
  if (server) {
    server.close(async () => {
      console.log('🔌 HTTP server closed');
      try {
        await sequelize.close();
        console.log('🔌 Database connection closed');
        process.exit(0);
      } catch (err) {
        console.error('❌ Error closing database connection:', err);
        process.exit(1);
      }
    });
  }
});

process.on('SIGINT', async () => {
  console.log('\n⚠️ SIGINT signal received: closing HTTP server');
  if (server) {
    server.close(async () => {
      console.log('🔌 HTTP server closed');
      try {
        await sequelize.close();
        console.log('🔌 Database connection closed');
        process.exit(0);
      } catch (err) {
        console.error('❌ Error closing database connection:', err);
        process.exit(1);
      }
    });
  } else {
    process.exit(0);
  }
});

// Start the server
startServer();
