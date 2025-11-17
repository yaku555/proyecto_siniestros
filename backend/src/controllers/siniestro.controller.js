// Se importa el modelo de Siniestro desde la carpeta 'models'.
const Siniestro = require('../models/Siniestro');

// Se importa el controlador base que gestiona las operaciones CRUD comunes (crear, obtener, actualizar, eliminar).
const createCrudController = require('./baseCrud.controller');

// Se importa la función getSiniestroData que se encarga de extraer los datos necesarios de la solicitud.
const { getSiniestroData } = require('../utils/getDatas.js');

// Se crea un controlador CRUD utilizando la función 'createCrudController'. 
// Esta función genera los métodos básicos (getAll, create, getById, update, remove) para trabajar con el modelo 'Siniestro'.
const {
  getAll: getSiniestros,              // Obtener todos los siniestros
  create: crearSiniestro,             // Crear un nuevo siniestro
  getById: getSiniestroPorId,         // Obtener un siniestro por su 'idSiniestro'
  update: actualizarSiniestro,        // Actualizar un siniestro existente
  remove: borrarSiniestro,            // Eliminar un siniestro
} = createCrudController(Siniestro, getSiniestroData, 'idSiniestro', 'idSiniestro');

// Se exportan los métodos del controlador CRUD para que puedan ser utilizados en otros archivos.
module.exports = {
  getSiniestros,          // Función para obtener todos los siniestros
  crearSiniestro,         // Función para crear un nuevo siniestro
  getSiniestroPorId,      // Función para obtener un siniestro por su 'idSiniestro'
  actualizarSiniestro,    // Función para actualizar un siniestro
  borrarSiniestro,        // Función para eliminar un siniestro
};

