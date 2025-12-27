const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.get('/', testimonialController.getAllTestimonials);
router.post('/', auth, testimonialController.createTestimonial);
router.put('/:id', auth, admin, testimonialController.updateTestimonial);
router.delete('/:id', auth, admin, testimonialController.deleteTestimonial);

module.exports = router;
