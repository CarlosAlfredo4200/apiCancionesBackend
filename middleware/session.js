const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const {  usersModel } = require("../models")

const authMiddleWare = async (req, res, next) => {
  try {
    //Necesito capturar el token
    if (!req.headers.authorization) {
      handleHttpError(res, " NOT_TOKEN", 401);
      return;
    }

    //Separar el token de la palabra Bearer
    const token = req.headers.authorization.split(" ").pop();
    //Saber el payload (carga util del token) y pasar token de session, verificar si existe id
    
    const dataToken = await verifyToken(token);
    
    if (!dataToken._id) {
        handleHttpError(res, "ERROR_ID_TOKEN", 401);
        return;
    }
    
    //Trasavilidad de usuario (Quien hizo la peticion)
    const user = await usersModel.findById(dataToken._id);
    req.user = user;
    next();


  } catch (error) {
    handleHttpError(res, " NOT_SESSION", 401);
  }
};

module.exports = authMiddleWare;
