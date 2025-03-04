const { pool } = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const postLogin = async (req, res) => {
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
    console.log('JWT Secret:', process.env.claveJWT);
    const isMatch = await bcrypt.compare(password, passwordHaseado);
    if (!isMatch) {
      return res.status(400).json({ ok: false, message: 'Contraseña incorrecta' });
    }

    let datosUsuario = 'SELECT id_user, name, last_name, email, photo FROM user WHERE email = ?';
    let [result] = await pool.query(datosUsuario, [email]);
    let id = result[0].id_user;
    let token = jwt.sign({ id, email }, process.env.claveJWT, { expiresIn: '1h' });
    res.cookie('autentificacion', token, { httpOnly: true, secure: false, sameSite: 'lax' });
    return res.status(200).json({ ok: true, message: 'Éxito!!', data: result });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
}


    module.exports = { postLogin };