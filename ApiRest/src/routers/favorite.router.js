const { Router } = require('express');
const router = Router();
const favoriteCtrl = require('../controller/favorite.controller');

router.get('/favorite', favoriteCtrl.getFavorites);
router.put('/favorite', favoriteCtrl.putFavorites);

module.exports = router;