// routes/ventaRoutes.js
const express = require('express');
const { registrarVenta, obtenerVentas, generarPresupuesto } = require('../controllers/ventaController'); // Asegúrate de que el controlador esté importado correctamente

const router = express.Router();

// Ruta para registrar una venta
router.post('/venta', registrarVenta);

// Ruta para obtener el historial de las ventas
router.get('/ventas', obtenerVentas);

// Ruta para presupuestos
router.post('/presupuesto', generarPresupuesto)

module.exports = router;
