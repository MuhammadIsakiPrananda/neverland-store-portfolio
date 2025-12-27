const express = require('express');
const router = express.Router();
const flashSaleController = require('../controllers/flashSaleController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

// Public
router.get('/', flashSaleController.getAllFlashSales);

// Admin only
router.post('/', auth, admin, flashSaleController.createFlashSale);
router.put('/:id', auth, admin, flashSaleController.updateFlashSale);
router.delete('/:id', auth, admin, flashSaleController.deleteFlashSale);

module.exports = router;
