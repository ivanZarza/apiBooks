/* require('dotenv').config();*/
 const express = require("express");
const cors = require("cors");
/* const cookieParser = require("cookie-parser"); */
const loginRouters = require("./routers/login.router");
const logoutRouters = require("./routers/logout.router");
const registerRouters = require("./routers/register.router");
const booksRouters = require("./routers/books.router");
const usuariosRouters = require("./routers/usuarios.router");
const errorHandling = require("./error/errorHandling");
const favoriteRouters = require("./routers/favorite.router"); 


/* console.log('claveJWT', process.env.claveJWT)
 */
const app = express();

app.set("port", process.env.PORT || 3000);

app.use(function logRequest (req, res, next) {
  console.log("Peticion recibida del cliente");
  console.log("URL:",  req.url);
  console.log("Metodo", req.method);
  console.log("Headers", req.headers);
  next();
})


// como restringir dominios 
const checkIfDomainIsAllowed = (origin) => {
  if (origin.startsWith("http://localhost:")) return true
  if (origin.endsWith(".vercel.app")) return true
  if (origin.endsWith(".github.io")) return true

  return false
}

// Middleware para habilitar CORS con cabeceras personalizadas
app.use(function enableCORS (req, res, next) {
  const { origin }  = req.headers
  
  if (checkIfDomainIsAllowed(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(cookieParser()); */

app.use((req, res, next) => {
  console.log("Peticion recibida del cliente");
  console.log("URL: " + req.url);
  console.log("Metodo: " + req.method);
  console.log("User-agent: " + req.headers["user-agent"]);
  next();  
});

app.use(loginRouters, registerRouters, logoutRouters, booksRouters, usuariosRouters, favoriteRouters);
app.use(errorHandling);


module.exports = app;