const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRoutes = require('./dogRoutes');
const temperamentsRouter = require('./temperaments');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRoutes);
router.use('/temperaments', temperamentsRouter);

module.exports = router;
