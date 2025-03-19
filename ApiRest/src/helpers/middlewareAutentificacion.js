require('dotenv').config();
const jwt = require('jsonwebtoken');
const { pool } = require('../database');

const claveJWT = process.env.claveJWT

async function verificarToken(req, res, next) {
const token = req.cookies.autentificacion;
console.log(token);
  if(!token) {
    return res.status(401).json({ok: false, message: 'No hay token'});
  }
try {
  const decoded = jwt.verify(token, claveJWT);
  const sql = 'SELECT * FROM user WHERE id_user = ?';
  const user = await pool.query(sql, [decoded.id]);

  if(user.length === 0) {
    return res.status(401).json({ok: false, message: 'Usuario del token no existe'});
  }

  if (user[0][0].email !== decoded.email) {
    console.log('linea 26', user[0][0].email, decoded.email);
    return res.status(401).json({ok: false, message: 'Verificacion del token negativa'});
  }


  console.log('linea 28 middleware token', req.user);
next();

} catch (error) {
  return res.status(401).json({ok: false, message: 'Token no valido'});
}

}

module.exports = verificarToken;