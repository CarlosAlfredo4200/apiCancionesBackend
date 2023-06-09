const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { usersModel } = require("../models");
const { tokenSing } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");

//Controlador para geristrar un usuario
const registerCtrl = async (req, res) => {
  try {
    {
      req = matchedData(req);
      const password = await encrypt(req.password);
      const body = { ...req, password };
      const dataUser = await usersModel.create(body);
      dataUser.set("password", undefined, { strict: false });

      const data = {
        token: await tokenSing(dataUser),
        user: dataUser,
      };
      res.send({ data });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};




//Controlador para login un usuario
const loginCtrl = async (req, res) => {
  try {
    {
      req = matchedData(req);
      const user = await usersModel.findOne({email:req.email}).select('password name role email');
      if(!user){
        handleHttpError(res, "USER_NOT_EXIST", 404);
        return;
      }

      const hashPassword = user.password;
      const check = await compare(req.password,hashPassword);
    
      if(!check){
        
        handleHttpError(res, "PASSWORD_INVALID", 401);
        return;
      }
    
      //Devolver token de session y la data del usuario
      user.set('password', undefined,{strict:false})
      const data = {
        token: await tokenSing(user),
        user
      }
    
      res.send({data});


      
    }
  } catch (error) {
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
 

};

module.exports = { registerCtrl, loginCtrl };
