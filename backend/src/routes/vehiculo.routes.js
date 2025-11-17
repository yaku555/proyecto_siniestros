const { Router } = require('express');
const {
  getVehiculos,
  crearVehiculo,
  getVehiculoPorPoliza,
  actualizarVehiculo,
  borrarVehiculo
} = require('../controllers/vehiculo.controller');

const router = Router();

router.get('/', getVehiculos);          
router.post('/', crearVehiculo);   
router.get('/:poliza', getVehiculoPorPoliza);   
router.put('/:poliza', actualizarVehiculo);    
router.delete('/:poliza', borrarVehiculo);  

module.exports = router;
