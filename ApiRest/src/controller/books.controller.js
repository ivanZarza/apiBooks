const { pool } = require('../database');

/* const getbooks = async (req) => {
  let { id_user, id_book } = req.query;
  try {
    let sql;
    if ((id_user === null || id_user === undefined) && (id_book === null || id_book === undefined)) {
      sql = 'SELECT * FROM book';
      let [result] = await pool.query(sql);
      
      return { status: 200, data: result }
      // res.status(200).json({ ok: true, message: 'Exito!!', data: result, headers: req.headers });
      // return
    }
 */
const getbooks = async (req, res) => {
  let { id_user, id_book } = req.query;
  try {
    let sql;
    if ((id_user === null || id_user === undefined) && (id_book === null || id_book === undefined)) {
      sql = 'SELECT * FROM book';
      let [result] = await pool.query(sql);
      // return { ok: true, message: 'Exito!!', data: result, headers: req.headers }
      res.status(200).json({ ok: true, message: 'Exito!!', data: result, headers: req.headers });
    }


    if (id_user && id_book) {
      sql = 'SELECT * FROM book WHERE id_book = ? AND id_user = ?';
      let [result] = await pool.query(sql, [id_book, id_user]);
      if (result.length === 0) {
        return res.status(404).json({ ok: false, message: 'No se encontro el libro' });
      }
      res.status(200).json({ ok: true, message: 'Exito!!', data: result });
    }

    if (id_user && (id_book = null || id_book === undefined)) {
      sql = 'SELECT * FROM book WHERE id_user = ?';
      let [result] = await pool.query(sql, id_user);
      res.status(200).json({ ok: true, message: 'Exito!!', data: result });
    }

    if (id_book && (id_user === null || id_user === undefined)) {
      sql = 'SELECT * FROM book WHERE id_book = ?';
      let [result] = await pool.query(sql, id_book);
      res.status(200).json({ ok: true, message: 'Exito!!', data: result });
    }

  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

const postbooks = async (req, res) => {
  console.log(req.body);
  let { id_user, title, type, author, price, photo } = req.body.book;
  console.log('id_user', id_user
              ,'title', title
              ,'type', type
              ,'author', author
              ,'price', price
              ,'photo', photo
  );
  if (!id_user || !title || !type || !author || !price || !photo) {
    res.status(400).json({ ok: false, message: 'Faltan datos' });
    return;
  }


  try {
    let sql = 'INSERT INTO book (id_user, title, type, author, price, photo) VALUES (?, ?, ?, ?, ?, ?)';
    let [result] = await pool.query(sql, [id_user, title, type, author, price, photo]);
    res.status(200).json({ ok: true, message: 'Exito!!', data: result });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

const putbooks = async (req, res) => {
  console.log(req.body);
  let {
    id_book,
    id_user,
    title,
    type,
    author,
    price,
    photo
  } = req.body.book;

  if (!id_book || !id_user) {
    res.status(400).json({ ok: false, message: 'Faltan datos' });
    return; 
  }

  try {
    let sql = 'UPDATE book SET title = ?, type = ?, author = ?, price = ?, photo = ? WHERE id_book = ? AND id_user = ?';
    let [result] = await pool.query(sql, [title, type, author, price, photo, id_book, id_user]);

    res.status(200).json({ ok: true, message: 'Libro actualizado con éxito', data: result });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

const deletebooks = async (req, res) => {
  const { id_book, id_user } = req.body;
  if (!id_book || !id_user) {
    res.status(400).json({ ok: false, message: 'Faltan datos' });
  }
  try {
    let sql = 'DELETE FROM book WHERE id_book = ? AND id_user = ?';
    let [result] = await pool.query(sql, [id_book, id_user]);
    res.status(200).json({ ok: true, message: 'Exito!!', data: result });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

module.exports = { getbooks, postbooks, putbooks, deletebooks };