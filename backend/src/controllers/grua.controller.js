const Grua = require('../models/Grua.js');
const createCrudController = require('./baseCrud.controller.js');
const { getGruaData } = require('../utils/getDatas.js');


const {
  getAll: getGruas,
  create: crearGrua,
  getById: getGruaPorId,
  update: actualizarGrua,
  remove: borrarGrua,
} = createCrudController(Grua, getGruaData,'idGrua', 'idGrua');

module.exports = {
  getGruas,
  crearGrua,
  getGruaPorId,
  actualizarGrua,
  borrarGrua,
};
