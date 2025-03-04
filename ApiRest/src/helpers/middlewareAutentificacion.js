require('dotenv').config();
const jwt = require('jsonwebtoken');
const { pool } = require('../database');


async function verificarToken(req, res, next) {
const token = req.cookies.autentificacion;
  if(!token) {
    return res.status(401).json({ok: false, message: 'No hay token'});
  }
try {
  const decoded = jwt.verify(token, process.env.claveJWT);
  const sql = 'SELECT * FROM user WHERE id_user = ?';
  const user = await pool.query(sql, [decoded.id]);

  if(user.length === 0) {
    return res.status(401).json({ok: false, message: 'Usuario del token no existe'});
  }

  if (user[0][0].email !== decoded.email) {
    console.log('linea 26', user[0][0].email, decoded.email);
    return res.status(401).json({ok: false, message: 'Verificacion del token negativa'});
  }

  req.user = user[0];
next();

} catch (error) {
  return res.status(401).json({ok: false, message: 'Token no valido'});
}

}

module.exports = verificarToken;