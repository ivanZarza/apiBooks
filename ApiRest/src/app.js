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

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
            return callback(null, true);
    }
    callback(null, true);
  },
  credentials: true 
}));

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