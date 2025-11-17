const { Router } = require('express');
const {
  getGruas,
  crearGrua,
  getGruaPorId,
  actualizarGrua,
  borrarGrua
} = require('../controllers/grua.controller');

const router = Router();

router.get('/', getGruas);          
router.post('/', crearGrua);   
router.get('/:idGrua', getGruaPorId);   
router.put('/:idGrua', actualizarGrua);    
router.delete('/:idGrua', borrarGrua);  

module.exports = router;
