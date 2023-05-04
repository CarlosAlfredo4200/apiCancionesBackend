const { check } = require("express-validator");
const validationResults = require("../utils/handleValidator")
 

const validatorGetItem = [
    
    check("id").exists().notEmpty().isMongoId(),
    (req,res,next) => {
        return validationResults(req,res,next)
    } 
   
];
module.exports = { validatorGetItem};