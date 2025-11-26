// src/routes/user.routes.js
const { Router } = require('express');
const {
  getDenuncios,
  crearDenuncio,
  getDenuncioPorId,
  actualizarDenuncio,
  borrarDenuncio
} = require('../controllers/denuncio.controller');

const router = Router();

router.get('/', getDenuncios);          
router.post('/', crearDenuncio);   
router.get('/:idDenuncio', getDenuncioPorId);   
router.put('/:idDenuncio', actualizarDenuncio);    
router.delete('/:idDenuncio', borrarDenuncio);  

module.exports = router;
