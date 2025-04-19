const { pool } = require('../database');

const getFavorites = async (req, res) => {
  let { id_user } = req.query;

  try {
    if (!id_user) {
      res.status(400).json({ ok: false, message: 'Faltan datos' });
      return;
    }

    const sql = 'SELECT * FROM book WHERE id_user = ? AND favorite = 1';
    const [result] = await pool.query(sql, [id_user]);

    res.status(200).json({ ok: true, message: 'Éxito!!', data: result });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

const putFavorites = async (req, res) => {
  let { id_book, id_user } = req.body;
  console.log('id_user', id_user, 'id_book', id_book);
  
  if (!id_user || !id_book) {
    res.status(400).json({ ok: false, message: 'Faltan datos' });
    return;
  }

  try {
    let sql = 'UPDATE book SET favorite = NOT favorite WHERE id_user = ? AND id_book = ?';
    let [result] = await pool.query(sql, [id_user, id_book]);

    res.status(200).json({ ok: true, message: 'Favorito actualizado con éxito', data: result });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = { getFavorites, putFavorites };