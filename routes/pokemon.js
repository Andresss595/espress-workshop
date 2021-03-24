const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');
 //se va a importar textualmente lo que este en las llaves

pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body);
});

pokemon.get('/', async (req, res, next)=>{
    const pkmn = await db.query("SELECT * FROM pokemon");
    //res.status(200); este se puede cambiar o concatenar con el res.send
    return res.status(200).json(pkmn);
});
/* es importante el orden de las rutas

RegExp es una serie de caracteres, somete a evaluacion una cadena que le hallamos metido [rango de digitos] {cantidad de digitos}*/
pokemon.get('/:id([0-9]{1,3})', (req, res, next) => {
    const id = req.params.id - 1;
    (id >= 0 && id <= 150)  ?     
        res.status(200).send(pk[req.params.id - 1]) : 
        res.status(404).send("Pokemon no encontrado");
    
});

pokemon.get('/:name([A-Za-z]+)', (req, res, next) => {
    // operar termiario (if de una sola linea) - estructura= condicion ? valor si verdadero : valor si falso
    const name = req.params.name;
    const pkmn = pk.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p ; // return para asegurarnos que la func regrese algo, es una buena practica  
    });

    (pkmn.length > 0) ? 
        res.status(200).send(pkmn) : 
        res.status(404).send("Pokemon no encontrado");
    /*for(i = 0; i < pokemon.length; i++){
        if(pokemon[i].name.toUpperCase() == name.toUpperCase()){     --- manera menos eficiente
            return res.status(200).send(pokemon[i]);
        }
    }
    return res.status(404).res.send("Pokemon no encotrado");*/
});

module.exports = pokemon;