const express = require('express');
const router = express.Router();
const fs = require('fs');

const PATH_ROUTES = __dirname;//ruta absoluta 


const removeExtension = (fileName) => {
    return fileName.split('.').shift();
}

//Leer directorio
fs.readdirSync(PATH_ROUTES).filter((file)=>{
    const name = removeExtension(file);
    if(name !== 'index'){
        //Cargar ruta
        router.use(`/${name}`, require(`./${file}`))
    }
});
 
 
module.exports = router