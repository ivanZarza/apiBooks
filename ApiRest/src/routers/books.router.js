const { Router } = require('express');
const router = Router();
const booksCtrl = require('../controller/books.controller');
const verificarToken = require("../helpers/middlewareAutentificacion");

router.get('/books', verificarToken, booksCtrl.getbooks);
router.post('/books', verificarToken, booksCtrl.postbooks);
router.put('/books', verificarToken, booksCtrl.putbooks);
router.delete('/books', verificarToken, booksCtrl.deletebooks);

module.exports = router;

// https://media.licdn.com/dms/image/v2/C4D12AQGqKPFVqI79Rw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1538670283344?e=2147483647&v=beta&t=U6Qx93iQLW9betkt9pPdNacfDoYw7npKYh2xHBC1ZK0

// https://scontent.fsvq1-1.fna.fbcdn.net/v/t1.6435-9/127565677_3659691100720313_30870152208379510_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=fErv9ulamPsQ7kNvgEft1Fr&_nc_oc=AdiqS6HrjMushdv2Sc97O92ctAYlkXY7OR1u1wvzryTqrM4zEevJlN__tfk0VGQ9mbY&_nc_zt=23&_nc_ht=scontent.fsvq1-1.fna&_nc_gid=AgLA3_J_3HIyBvrPTw2tJHo&oh=00_AYCgVVogy0ckWq-kQvm6cCGjpkggdcDqlXP-5OOBfJIKVQ&oe=67E58512

// https://i0.wp.com/librosarcanos.es/wp-content/uploads/los-mejores-escritores-de-la-literatura-universal.jpg?w=960&ssl=1


