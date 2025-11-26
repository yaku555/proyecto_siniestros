// src/routes/siniestro.routes.js
const { Router } = require('express');
const {
  getSiniestros,
  crearSiniestro,
  getSiniestroPorId,
  actualizarSiniestro,
  borrarSiniestro,
  getSiniestrosPorRut,  // Asegurarte de que la función esté importada
} = require('../controllers/siniestro.controller');

const router = Router();

// Rutas para los siniestros
router.get('/', getSiniestros); // Obtener todos los siniestros
router.get('/usuario/:rut', getSiniestrosPorRut); // Obtener siniestros por RUT
router.post('/', crearSiniestro); // Crear un nuevo siniestro
router.get('/:idSiniestro', getSiniestroPorId); // Obtener siniestro por ID
router.put('/:idSiniestro', actualizarSiniestro); // Actualizar siniestro
router.delete('/:idSiniestro', borrarSiniestro); // Eliminar siniestro

module.exports = router;
