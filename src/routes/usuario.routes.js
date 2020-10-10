const router = require("express").Router();
const auth = require("../middleware/auth");
const usuarioController = require("../controllers/usuario.controller");

//registro
router.post("/registro", usuarioController.registro);
//login
router.post("/login", usuarioController.login);
//autenticar usuario con el token del header
router.get("/auth", auth, usuarioController.autenticarUsuario);
//obtener un usuario
router.get("/:id", auth, usuarioController.getUsuario);
//obtener todos los usuarios
router.get("/", auth, usuarioController.getUsuarios);
//modificar un usuario
router.put("/:id", auth, usuarioController.editUsuario);
//eliminar o poner el atributo eliminado en true
router.delete("/:id", auth, usuarioController.deleteUsuario);

module.exports = router;
