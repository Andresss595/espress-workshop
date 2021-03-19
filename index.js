const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {pokemon} = require('./pokedex.json'); //exportar el archivo json y si esta entre {} se exporta todo como tal

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

app.post("/pokemon", (req, res, next) => {
    return res.status(200).send(req.body.name);
});

app.get('/pokemon',(req, res, next)=>{
    //res.status(200); este se puede cambiar o concatenar con el res.send
    return res.status(200).send(pokemon);
});
/* es importante el orden de las rutas

RegExp es una serie de caracteres, somete a evaluacion una cadena que le hallamos metido [rango de digitos] {cantidad de digitos}*/
app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) =>{
    const id = req.params.id - 1;
    (id >= 0 && id <= 150)  ?     
        res.status(200).send(pokemon[req.params.id - 1]) : 
        res.status(404).send("Pokemon no encontrado");
    
});

app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) => {
    // operar termiario (if de una sola linea) - estructura= condicion ? valor si verdadero : valor si falso
    const name = req.params.name;
    const pk = pokemon.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p ; // return para asegurarnos que la func regrese algo, es una buena practica  
    });

    (pk.length > 0) ? 
        res.status(200).send(pk) : 
        res.status(404).send("Pokemon no encontrado");
    /*for(i = 0; i < pokemon.length; i++){
        if(pokemon[i].name.toUpperCase() == name.toUpperCase()){     --- manera menos eficiente
            return res.status(200).send(pokemon[i]);
        }
    }
    return res.status(404).res.send("Pokemon no encotrado");*/
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});