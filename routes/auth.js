const express = require("express");
const router = express.Router();
const { registerCtrl, loginCtrl } = require("../controllers/auth");
const { validatorRegiter, validatorLogin } = require("../validators/auth");
 


//Crear registro user
router.post("/register", validatorRegiter, registerCtrl);
router.post("/login", validatorLogin, loginCtrl);

module.exports = router;
