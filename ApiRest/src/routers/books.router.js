const { Router } = require('express');
const router = Router();
const booksCtrl = require('../controller/books.controller');
/* const verificarToken = require("../helpers/middlewareAutentificacion");
 */

/* const handleResult = ctrlFn => async (req, res) => {
    const result = await ctrlFn(req)

    res.status(result.status).json({
        ok: result.status >= 200 && result.status < 400,
        data: result.data,
    })
} */
// router.get('/books', /* verificarToken, */ handleResult(booksCtrl.getbooks));

router.get('/books', /* verificarToken, */ booksCtrl.getbooks);
router.post('/books', /* verificarToken, */ booksCtrl.postbooks);
router.put('/books', /* verificarToken, */ booksCtrl.putbooks);
router.delete('/books', /* verificarToken, */ booksCtrl.deletebooks);

module.exports = router;

