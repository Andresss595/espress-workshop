const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require ('./routes/pokemon');
const user = require('./routes/user');
 
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
app.get("/", (req, res, next)=>{
    return res.status(200).json({code: 1, message: "Bienvenido al pokedex"});
});

app.use("/pokemon", pokemon); //no hay preferencias, solo considerar que se lee de arriba a abajo
app.use("/user", user);

app.use((req, res, next) => {
    return res.status(404).json({code: 404, message: "URL no encontrada"});
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});
