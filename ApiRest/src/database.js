const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '3st3v3Z99!',
  database: 'AppBooks',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle : 10,
  idleTimeout: 60000,
  queueLimit : 0,
}).promise();

console.log('Conexión correcta');

module.exports = {pool};