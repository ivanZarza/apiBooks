const { Router } = require('express');
const router = Router();
const logoutCtrl = require('../controller/logout.controller');


router.post('/logout', logoutCtrl.postLogout);

module.exports = router;


