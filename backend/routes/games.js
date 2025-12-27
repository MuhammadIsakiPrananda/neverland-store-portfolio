const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

// Public
router.get('/', gameController.getAllGames);
router.get('/:id', gameController.getGameById);

// Admin only
router.post('/', auth, admin, gameController.createGame);
router.put('/:id', auth, admin, gameController.updateGame);
router.delete('/:id', auth, admin, gameController.deleteGame);

module.exports = router;
