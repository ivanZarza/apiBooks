const { Router } = require('express');
const router = Router();
const registerCtrl = require('../controller/register.controller');


router.post('/register', registerCtrl.postRegister);

module.exports = router;


