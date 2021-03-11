const express = require('express');
const app = express();


console.log("Hola Mundo!");
/*
Los verbos HTTP
GET - OBTENER ALGO
POST - 
PATCH - cambia solo unos elementos 
PUT - cambia todos lo elemntos
DELETE
*/
app.get("/", (req, res, next)=>{
    res.send("Bienvenido!");

});

app.listen(3000, () => {
    console.log("Server is running...");
});