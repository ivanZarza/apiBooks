const { Router } = require('express');
const router = Router();
const favoriteCtrl = require('../controller/favorite.controller');

router.get('/favourite', favoriteCtrl.getFavorites);
router.put('/favourite', favoriteCtrl.putFavorites);

module.exports = router;