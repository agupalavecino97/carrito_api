const router = require("express").Router();

// Import Ruotess
const userRoutes = require("./usuario.routes");
const negocioRoutes = require("./negocio.routes");

// Redirecting to different routes
router.use("/usuarios", userRoutes);
router.use("/negocios", negocioRoutes);

// Export API routes
module.exports = router;
