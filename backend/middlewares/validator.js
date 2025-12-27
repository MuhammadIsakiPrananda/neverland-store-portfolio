const { body, validationResult } = require('express-validator');
const { AppError } = require('./errorHandler');

/**
 * Validation middleware to check validation results
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    return next(new AppError(errorMessages, 400));
  }
  next();
};

/**
 * Common validation rules
 */
const validationRules = {
  // Email validation
  email: body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  // Password validation
  password: body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  // Name validation
  name: body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long')
    .escape(),

  // Order validation
  customerName: body('customerName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Customer name must be at least 2 characters long')
    .escape(),

  gameName: body('gameName')
    .trim()
    .notEmpty()
    .withMessage('Game name is required')
    .escape(),

  totalPrice: body('totalPrice')
    .isFloat({ min: 0 })
    .withMessage('Total price must be a positive number'),

  // Review validation
  rating: body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),

  comment: body('comment')
    .optional()
    .trim()
    .escape(),
};

/**
 * Sanitize input to prevent XSS
 */
const sanitizeInput = (req, res, next) => {
  // Basic XSS prevention
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        // Remove script tags and other dangerous HTML
        req.body[key] = req.body[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
          .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
      }
    });
  }
  next();
};

module.exports = {
  validate,
  validationRules,
  sanitizeInput,
};
