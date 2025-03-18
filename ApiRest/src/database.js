const mysql = require('mysql2');

const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = '3st3v3Z99!',
  DB_NAME = 'AppBooks',
  DB_PORT = 3306,
} = process.env

const pool = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle : 10,
  idleTimeout: 60000,
  queueLimit : 0,
}).promise();

console.log('Conexión correcta');

module.exports = {pool};