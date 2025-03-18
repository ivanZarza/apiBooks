const { Router } = require('express');
const router = Router();
const booksCtrl = require('../controller/books.controller');
const verificarToken = require("../helpers/middlewareAutentificacion");

router.get('/books', /* verificarToken,  */booksCtrl.getbooks);
router.post('/books', /* verificarToken,  */booksCtrl.postbooks);
router.put('/books', /* verificarToken,  */booksCtrl.putbooks);
router.delete('/books', /* verificarToken,  */booksCtrl.deletebooks);

module.exports = router;

