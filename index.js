const express = require('express');
const app = express();
const {pokemon} = require('./pokedex.json'); //exportar el archivo json y si esta entre {} se exporta todo como tal


/*
Los verbos HTTP
GET - OBTENER ALGO
POST - 
PATCH - cambia solo unos elementos 
PUT - cambia todos lo elemntos
DELETE

Agregar nodemon de manera global para que se valla actualizando

agregar los datos de bugs, homepage y en el reporitorio
*/
app.get("/", (req, res, next)=>{
    res.status(200);
    res.send("Bienvenido al Pokedex");
});

app.get('/pokemon/all',(req, res, next)=>{
    res.status(200);
    res.send(pokemon);
});
/*importa el orden de las rutas

RegExp es una serie de caracteres, somete a evaluacion una cadena que le hallamos metido [rango de digitos] {cantidad de digitos}*/
app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) =>{
    const id = req.params.id -1;
    if(id >= 0 && id <= 150){
        res.status(200);
        res.send(pokemon[req.params.id - 1]);
    }else{
        res.status(404);
        res.send("Pokemon no encontrado");
    }
});

app.get('/pokemon/:name', (req, res, next) => {
    const name = req.params.name;
    for(i = 0; i < pokemon.length; i++){
        if(pokemon[i].name == name ){
            res.status(200);
            res.send(pokemon[i]);
        }
    }
    res.status(404);
    res.send("Pokemon no encotrado");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});