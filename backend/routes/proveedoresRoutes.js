const express = require('express');
const router = express.Router();
const { obtenerProveedores } = require('../controllers/proveedorController');

// Ruta para obtener todos los proveedores
router.get('/', obtenerProveedores);

module.exports = router;
