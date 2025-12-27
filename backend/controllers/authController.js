const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Validasi email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validasi password strength
const isStrongPassword = (password) => {
  // Min 8 chars, uppercase, lowercase, number, symbol
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return strongPassword.test(password);
};

// Register - Signup user baru
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validasi input
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Semua field harus diisi (name, email, password)' 
      });
    }

    // Validasi nama minimal 2 karakter
    if (name.trim().length < 2) {
      return res.status(400).json({ 
        success: false,
        message: 'Nama harus minimal 2 karakter' 
      });
    }

    // Validasi format email
    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Format email tidak valid' 
      });
    }

    // Validasi password strength
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password harus minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, dan simbol'
      });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'Email sudah terdaftar' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Buat user baru
    const user = await User.create({ 
      name: name.trim(), 
      email: email.toLowerCase(), 
      password: hashedPassword 
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    // Return success response
    res.status(201).json({ 
      success: true,
      message: 'Registrasi berhasil',
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Terjadi kesalahan server', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Login - Masuk dengan email dan password
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email dan password harus diisi' 
      });
    }

    // Validasi format email
    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Format email tidak valid' 
      });
    }

    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Email atau password salah' 
      });
    }

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Email atau password salah' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    // Return success response
    res.json({ 
      success: true,
      message: 'Login berhasil',
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Terjadi kesalahan server' 
    });
  }
};

// Get Profile - Mendapatkan data user yang sedang login
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { 
      attributes: { exclude: ['password'] } 
    });

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User tidak ditemukan' 
      });
    }

    res.json({ 
      success: true,
      user 
    });

  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Terjadi kesalahan server' 
    });
  }
};

// Change Password - Ubah password user yang sedang login
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validasi input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false,
        message: 'Password lama dan password baru harus diisi' 
      });
    }

    // Validasi password baru
    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({
        success: false,
        message: 'Password baru harus minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, dan simbol'
      });
    }

    // Cari user
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User tidak ditemukan' 
      });
    }

    // Verifikasi password lama
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Password lama tidak sesuai' 
      });
    }

    // Cek apakah password baru sama dengan password lama
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ 
        success: false,
        message: 'Password baru tidak boleh sama dengan password lama' 
      });
    }

    // Hash password baru
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await user.update({ password: hashedPassword });

    res.json({ 
      success: true,
      message: 'Password berhasil diubah' 
    });

  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Terjadi kesalahan server' 
    });
  }
};
