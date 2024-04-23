const express = require('express');
const path = require('path');
const app = express();
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const session = require ("express-session");
const sessionMiddleware = require ("./middlewares/sessionMiddleware");
const cookies = require ("cookie-parser");


const PORT = process.env.PORT || 3000;
 
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.set('view engine', 'ejs');
app.use(session({secret: "texto cualquiera", resave: false, saveUninitialized: false}));
app.use(cookies());
app.use(sessionMiddleware);

// rutas a /
let mainRoute = require("./routers/mainRoute");
let userRoute = require("./routers/userRoute");

app.use('/', mainRoute);
app.use('/users', userRoute);
app.use((req, res, next) => {
  res.status(404).render('404-page', {title: 'Error 404'});
  next();
  });

// levantamos servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: http://localhost:${PORT}`);
  });
