const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.get('/', faqController.getAllFAQs);
router.post('/', auth, admin, faqController.createFAQ);
router.put('/:id', auth, admin, faqController.updateFAQ);
router.delete('/:id', auth, admin, faqController.deleteFAQ);

module.exports = router;
