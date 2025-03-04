const { pool } = require('../database');
const bcrypt = require('bcrypt');

const putUsuarios = async (req, res) => {
  let {
    id_user,
    name = '',
    last_name = '',
    email = '',
    photo = '',
    password = null,
  } = req.body;

  email = email.toLowerCase();

  if (!id_user || !name || !last_name || !email || !photo) {
    res.status(400).json({ ok: false, message: 'Faltan datos' });
    return
  }
  sql = 'SELECT * FROM user WHERE id_user = ?';
  let [result] = await pool.query(sql, [id_user]);
  console.log(result);
  if (!result) {
    res.status(404).json({ ok: false, message: 'No se encontro el usuario' });
    return
  }

  try {
    if (password) {
      password = bcrypt.hashSync(password, 10)
      let sql = 'UPDATE user SET name = ?, last_name = ?, email = ?, photo = ?, password = ? WHERE id_user = ?';
      await pool.query(sql, [name, last_name, email, photo, password, id_user]);
    } else {
      let sql = 'UPDATE user SET name = ?, last_name = ?, email = ?, photo = ? WHERE id_user = ?';
      await pool.query(sql, [name, last_name, email, photo, id_user]);
    }
    let sqlActualizado = 'SELECT * FROM user WHERE id_user = ?';
    let [result] = await pool.query(sqlActualizado, [id_user]);
    res.status(200).json({ ok: true, message: 'Exito!!', data: result });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

module.exports = { putUsuarios };