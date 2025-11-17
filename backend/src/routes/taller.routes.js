const { Router } = require('express');
const {
  getTalleres,
  crearTaller,
  getTallerPorId,
  actualizarTaller,
  borrarTaller
} = require('../controllers/taller.controller');

const router = Router();

router.get('/', getTalleres);          
router.post('/', crearTaller);   
router.get('/:idTaller', getTallerPorId);   
router.put('/:idTaller', actualizarTaller);    
router.delete('/:idTaller', borrarTaller);  

module.exports = router;
