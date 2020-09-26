const router = require('express').Router();

const usuarioController = require('../controllers/usuario.controller');

//registro
router.post('/registro', usuarioController.registro);
//login
router.post('/login', usuarioController.login);
//obtener un usuario
router.get('/:id', usuarioController.getUsuario);
//obtener todos los usuarios
router.get('/', usuarioController.getUsuarios);
//modificar un usuario
router.put('/:id', usuarioController.editUsuario);
//eliminar o poner el atributo eliminado en true
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;