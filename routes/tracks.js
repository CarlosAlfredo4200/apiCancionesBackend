const express = require('express');
const router = express.Router();
const { getItems, createItem, getItem, updateItem, deleteItem} = require("../controllers/tracks");
const {validatorCreateItem, validatorGetItem } = require("../validators/tracks");
const authMiddleWare = require("../middleware/session");
const checkRol = require("../middleware/rol");

//Listar Items
router.get("/", authMiddleWare, getItems);

//Obtener detalles de  Items
router.get("/:id", authMiddleWare, validatorGetItem, getItem);

//Actualizar un registro
router.put("/:id", authMiddleWare, validatorGetItem, validatorCreateItem, updateItem);


//Crear Items
router.post("/", authMiddleWare, checkRol(["admin"]), validatorCreateItem,createItem);

//Eliminar  Items
router.delete("/:id", authMiddleWare, validatorGetItem, deleteItem);


module.exports = router