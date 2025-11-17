// src/routes/user.routes.js
const { Router } = require('express');
const {
  getDenuncios,
  crearDenuncio,
  getDenuncioPorPoliza,
  actualizarDenuncio,
  borrarDenuncio
} = require('../controllers/denuncio.controller');

const router = Router();

router.get('/', getDenuncios);          
router.post('/', crearDenuncio);   
router.get('/:poliza', getDenuncioPorPoliza);   
router.put('/:poliza', actualizarDenuncio);    
router.delete('/:poliza', borrarDenuncio);  

module.exports = router;
