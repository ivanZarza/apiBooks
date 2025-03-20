const { pool } = require('../database');
const bcrypt = require('bcrypt');
/* const jwt = require('jsonwebtoken');

const claveJWT = process.env.claveJWT */

const postRegister = async (req, res) => {
  let { name, last_name, email, photo, password } = req.body;
  console.log(req.body, {
    name: !name,
    last_name: !last_name,
    email: !email,
    photo: !photo,   
    password: !password
  });

  if (!name || !last_name || !email || !photo || !password) {
    res.status(400).json({ ok: false, message: 'Faltan datos' });
    return;
  }

  email = email.toLowerCase();

  try {
    let encontrarUsuario = "SELECT * FROM user WHERE email = ?";
    let [usuario] = await pool.query(encontrarUsuario, [email]);
    if (usuario.length > 0) {
      res.status(400).json({ ok: false, message: 'Usuario ya existe' });
      return
    }

    password = bcrypt.hashSync(password, 10)

    let sql = 'INSERT INTO user (name, last_name, email, photo, password) VALUES (?, ?, ?, ?, ?)';
    let [result] = await pool.query(sql, [name, last_name, email, photo, password]);
    let id = result.insertId;
/*     let token = jwt.sign({ id, email }, claveJWT, { expiresIn: '1h' }); */
/*     res.cookie('autentificacion', token, { httpOnly: true, secure: true, sameSite: 'none' });
 */    res.status(200).json({ ok: true, message: 'Exito!!', data: result });
    return;
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

module.exports = { postRegister };