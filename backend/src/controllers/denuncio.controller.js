const Denuncio = require('../models/Denuncio');
const createCrudController = require('./baseCrud.controller');
const { getDenuncioData } = require('../utils/getDatas.js');

const {
  getAll: getDenuncios,
  create: crearDenuncio,
  getById: getDenuncioPorPoliza,
  update: actualizarDenuncio,
  remove: borrarDenuncio,
} = createCrudController(Denuncio, getDenuncioData,'poliza', 'poliza');

module.exports = {
  getDenuncios,
  crearDenuncio,
  getDenuncioPorPoliza,
  actualizarDenuncio,
  borrarDenuncio,
};
