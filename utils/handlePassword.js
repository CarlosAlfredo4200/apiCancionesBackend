const bcryptjs = require("bcryptjs");

 //passwordPlain es la clave ingresada por el usuario
const encrypt = async ( passwordPlain) => {
    const hash  = await bcryptjs.hash(passwordPlain, 10);
    //Nueva clave random 
    return hash;
};

// Pasar contraseña sin encriptar y pasar contraseña encriptada
const compare = async (passwordPlain, hashPassword) => {
    return bcryptjs.compare(passwordPlain, hashPassword);   
};

module.exports = { encrypt, compare };