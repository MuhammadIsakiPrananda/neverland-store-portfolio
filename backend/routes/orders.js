const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

// User
router.post('/', auth, orderController.createOrder);
router.get('/', auth, orderController.getOrders);

// Admin
router.get('/all', auth, admin, orderController.getAllOrders);
router.put('/:id/status', auth, admin, orderController.updateOrderStatus);

module.exports = router;
