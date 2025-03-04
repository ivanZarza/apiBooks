const { Router } = require('express');
const router = Router();
const usuariosCtrl = require('../controller/usuarios.controller');

router.put('/usuarios', usuariosCtrl.putUsuarios);

module.exports = router;