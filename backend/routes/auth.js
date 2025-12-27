const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

// Register - Signup user baru
router.post('/register', authController.register);

// Login - Masuk dengan akun yang sudah ada
router.post('/login', authController.login);

// Get profile - Mendapatkan data user yang sedang login (protected)
router.get('/profile', auth, authController.getProfile);

// Update password - Ubah password user (protected)
router.put('/change-password', auth, authController.changePassword);

module.exports = router;

