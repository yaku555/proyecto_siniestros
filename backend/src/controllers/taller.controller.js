const Taller = require('../models/Taller');
const createCrudController = require('./baseCrud.controller');
const { getTallerData } = require('../utils/getDatas.js');


const {
  getAll: getTalleres,
  create: crearTaller,
  getById: getTallerPorId,
  update: actualizarTaller,
  remove: borrarTaller,
} = createCrudController(Taller, getTallerData ,'idTaller', 'idTaller');

module.exports = {
  getTalleres,
  crearTaller,
  getTallerPorId,
  actualizarTaller,
  borrarTaller,
};
