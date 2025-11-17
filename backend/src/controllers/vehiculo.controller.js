const Vehiculo = require('../models/Vehiculo');
const createCrudController = require('./baseCrud.controller');
const { getVehiculoData } = require('../utils/getDatas.js');


// Aquí le decimos que el identificador es poliza
const {
  getAll: getVehiculos,
  create: crearVehiculo,
  getById: getVehiculoPorPoliza,
  update: actualizarVehiculo,
  remove: borrarVehiculo,
} = createCrudController(Vehiculo, getVehiculoData,'poliza', 'poliza');

module.exports = {
  getVehiculos,
  crearVehiculo,
  getVehiculoPorPoliza,
  actualizarVehiculo,
  borrarVehiculo,
};
