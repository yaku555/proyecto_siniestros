// Se importa el módulo 'Router' de Express para crear nuevas rutas.
const { Router } = require('express');

// Se importan las funciones del controlador 'siniestro.controller' para manejar las operaciones CRUD.
const {
  getSiniestros,          // Función para obtener todos los siniestros
  crearSiniestro,         // Función para crear un nuevo siniestro
  getSiniestroPorId,      // Función para obtener un siniestro por su 'idSiniestro'
  actualizarSiniestro,    // Función para actualizar un siniestro
  borrarSiniestro         // Función para eliminar un siniestro
} = require('../controllers/siniestro.controller');

// Se crea una instancia del enrutador de Express.
const router = Router();

// Definición de las rutas de la API para los siniestros:

// Ruta GET para obtener todos los siniestros
router.get('/', getSiniestros);          

// Ruta POST para crear un nuevo siniestro
router.post('/', crearSiniestro);   

// Ruta GET para obtener un siniestro específico por su 'idSiniestro'
router.get('/:idSiniestro', getSiniestroPorId);   

// Ruta PUT para actualizar un siniestro específico por su 'idSiniestro'
router.put('/:idSiniestro', actualizarSiniestro);    

// Ruta DELETE para eliminar un siniestro específico por su 'idSiniestro'
router.delete('/:idSiniestro', borrarSiniestro);  

// Se exporta el enrutador para que pueda ser utilizado en otros archivos, como en 'app.js' o 'server.js'.
module.exports = router;
