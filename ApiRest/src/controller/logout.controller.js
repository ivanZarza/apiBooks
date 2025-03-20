const { pool } = require('../database');
/* const jwt = require('jsonwebtoken'); */
const bcrypt = require('bcrypt');

/* const claveJWT = process.env.claveJWT */

const postLogout = async (req, res) => {
  let { email, password } = req.body;
  console.log(req.body, {
    email: !email,
    password: !password
  });

  if (!email || !password) {
    res.status(400).json({ ok: false, message: 'Faltan datos' });
    return;
  }

  try {
    let sql = 'Select password from user where email = ?';

    let [usuarioRequerido] = await pool.query(sql, [email]);

    if (usuarioRequerido.length === 0) {
      res.status(400).json({ ok: false, message: 'Usuario no existe' });
      return;
    }

    let passwordHaseado = usuarioRequerido[0].password;
    const isMatch = await bcrypt.compare(password, passwordHaseado);
    if (!isMatch) {
      return res.status(400).json({ ok: false, message: 'Contraseña incorrecta' });
    }
/*     let token = jwt.sign({ email }, claveJWT, { expiresIn: '1s' });
    res.cookie('logout', token, { httpOnly: true, secure: true, sameSite: 'none' }); */

    return res.status(200).json({ ok: true, message: 'Éxito!!' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
}


module.exports = { postLogout };