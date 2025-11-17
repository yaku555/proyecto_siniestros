const Usuario = require('../models/Usuario');
const createCrudController = require('./baseCrud.controller');
const { getUsuarioData } = require('../utils/getDatas.js');



const {
  getAll: getUsers,
  create: createUser,
  getById: getUserByRut,
  update: updateUser,
  remove: deleteUser,
} = createCrudController(Usuario, getUsuarioData,'rut', 'rut');

module.exports = {
  getUsers,
  createUser,
  getUserByRut,
  updateUser,
  deleteUser,
};
