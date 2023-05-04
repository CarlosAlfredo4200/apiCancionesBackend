const { storageModel } = require("../models");
const { matchedData, body } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const fs = require("fs");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

//Obtener Lista
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_Get_ITEMS_STORAGE_LIST");
  }
};

//Obtener detalle
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req); //Filtrar Id solicitado
    const data = await storageModel.findById(id);

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM_STORAGE");
  }
};

//Crear un registro
const createItem = async (req, res) => {
  try {
    const { body, file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEM_STORAGE");
  }
};

//Eliminar registro
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req); //Filtrar Id solicitado
    const dataFile = await storageModel.findById(id);
    await storageModel.delete({ _id: id });
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`;

    fs.unlinkSync(filePath);
    const data = {
      filePath,
      deleted: 1,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM_STORAGE");
  }
};

//destructuracion
module.exports = { getItems, getItem, createItem,  deleteItem };
