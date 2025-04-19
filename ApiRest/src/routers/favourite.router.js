const { Router } = require('express');
const router = Router();
const favoriteCtrl = require('../controller/favorite.controller');

router.get('/favourite', favoriteCtrl.getFavourites);
router.put('/favourite', favoriteCtrl.putFavourites);

module.exports = router;