const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');
 /*se va a importar textualmente lo que este en las llaves*/

pokemon.post("/", (req, res, next) => {
    return res.status(200).json(req.body);
});

pokemon.get('/', async (req, res, next)=>{
    const pkmn = await db.query("SELECT * FROM pokemon");
    //res.status(200); este se puede cambiar o concatenar con el res.send
    return res.status(200).json({ code: 1, message: pkmn});
});
/* es importante el orden de las rutas

RegExp es una serie de caracteres, somete a evaluacion una cadena que le hallamos metido [rango de digitos] {cantidad de digitos}*/
pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if (id >= 1 && id <= 722){
        const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id="+id+";");
        return res.status(200).json({code: 1, message: pkmn});
    }
    return res.status(404).send({code: 404, message: "Pokemon no encontrado"});
});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    // operar termiario (if de una sola linea) - estructura= condicion ? valor si verdadero : valor si falso
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='" + name + "';");
    if (pkmn.length > 0){
        return res.status(200).json({code: 1, message: pkmn});
    }
    return res.status(404).send({code: 404, message: "Pokemon  no encontrado"});
});
  
module.exports = pokemon;