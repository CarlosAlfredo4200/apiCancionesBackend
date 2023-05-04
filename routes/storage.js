const express = require("express");
const  upLoadMiddleware = require("../utils/handleStorage");
const { validatorGetItem} = require('../validators/storage');
const { getItems, createItem, getItem, updateItem, deleteItem} = require("../controllers/storage");
 
const router = express.Router();

//Listar Items
router.get("/", getItems);

//Obtener detalles de  Items
router.get("/:id", validatorGetItem, getItem);

//Eliminar  Items
router.delete("/:id", validatorGetItem, deleteItem);
 
router.post("/", upLoadMiddleware.single("myfile"), createItem);

module.exports = router;

