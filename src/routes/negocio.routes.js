const router = require("express").Router();
const auth = require("../middleware/auth");
const negocioController = require("../controllers/negocio.controller");

//crear negocio
router.post("/", auth, negocioController.addNegocio);
//obtener un negocio
router.get("/:id", negocioController.getNegocio);
//obtener todos los negocios
router.get("/", negocioController.getNegocios);
//modificar un negocio
router.put("/:id", auth, negocioController.editNegocio);
//eliminar o poner el atributo eliminado en true
router.delete("/:id", auth, negocioController.deleteNegocio);

module.exports = router;
