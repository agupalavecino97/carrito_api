const router = require('express').Router();

// Import Ruotess
const userRoutes = require('./usuario.routes');

// Redirecting to different routes
router.use('/usuarios', userRoutes);
// Export API routes
module.exports = router;