const { matchedData, body } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

//Obtener Lista
const getItems = async (req, res) => {
  try {
    const user = req.user
    const data = await tracksModel.find({});
    res.send({ data, user });
  } catch (error) {
    handleHttpError(res, "ERROR:GET_ITEMS");
  }
};

//Obtener detalle
const getItem = async (req, res) => {
    try {
        req = matchedData(req);//Filtrar Id solicitado
        const {id} = req;
        const data = await tracksModel.findById(id);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEM");
    }
};

//Crear un registro
const createItem = async (req, res) => {
  try {

    const body = matchedData(req);
    const data = await tracksModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

//Actualizar registro
const updateItem = async (req, res) => {
    try {

        
        const {id, ...body} = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(id, body);
        res.send({ data });
      } catch (error) {
        handleHttpError(res, "ERROR_UPDATE_ITEMS");
      }
};

//Eliminar registro
const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);//Filtrar Id solicitado
        const {id} = req;
        const data = await tracksModel.delete({_id:id});//delete => para borrado logico
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_ITEM");
    }
};

//destructuracion
module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
