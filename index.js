const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require ('./routes/pokemon');

app.use(morgan ('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
    return res.status(200).send("Bienvenido al Pokedex");
});

app.use("/pokemon", pokemon);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});