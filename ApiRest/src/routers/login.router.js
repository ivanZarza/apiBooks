const { Router } = require('express');
const router = Router();
const loginCtrl = require('../controller/login.controller');


router.post('/login', loginCtrl.postLogin);

module.exports = router;


