//DEPENDENCIES
const morgan = require('morgan');
const express = require('express');
const app = express();

//ROUTES
const pokemon = require ('./routes/pokemon');
const user = require('./routes/user');

//MIDDLEWARE
const auth = require('./middleware/auth');
const notFoud = require('./middleware/notFound');
const index = require('./middleware/index');
 
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
/*Verbos HTTP
GET - obtener datos 
POST - almacenar recursos 
PATCH - modificar una parte de un recurso
PUT - modificar un recurso completo
DELETE - borrar un recurso
*/

/*
¿como actualizar un repositor con git desde la terminal?
1- git add .
2- git commit -m "mensaje"
3- git push
4- revisar tu repositorio en github

Agregar nodemon de manera global para que se valla actualizando

agregar los datos de bugs, homepage y en el reporitorio
*/

app.get("/", index);
app.use("/user", user);
app.use(auth);
app.use("/pokemon", pokemon); //no hay preferencias, solo considerar que se lee de arriba a abajo


app.use(notFoud);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});
