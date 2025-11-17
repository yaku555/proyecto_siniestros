const { Router } = require('express');
const {
  getUsers,
  createUser,
  getUserByRut,
  updateUser,
  deleteUser
} = require('../controllers/usuario.controller');

const router = Router();

router.get('/', getUsers);        
router.post('/', createUser);      
router.get('/:rut', getUserByRut);   
router.put('/:rut', updateUser);     
router.delete('/:rut', deleteUser); 

module.exports = router;
