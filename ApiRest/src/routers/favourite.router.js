const { Router } = require('express');
const router = Router();
const favouriteCtrl = require('../controller/favourite.controller');

router.get('/favourite', favouriteCtrl.getFavourites);
router.put('/favourite', favouriteCtrl.putFavourites);

module.exports = router;