const express = require('express');
const stockRoutes = require('./stockRoutes');
const ventaRoutes = require('./ventaRoutes');
const clientesRoutes = require('./clientesRoutes');
const proveedoresRoutes = require('./proveedoresRoutes');
const inventarioRoutes = require('./inventoryRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

// Rutas de stock
router.use('/stock', stockRoutes);

// Rutas de ventas
router.use('/ventas', ventaRoutes);

// Rutas para clientes
router.use('/clientes', clientesRoutes);

// Rutas para ver proveedores
router.use('/proveedores', proveedoresRoutes);

// Rutas para el inventario
router.use('/inventario', inventarioRoutes);

// Rutas para para autenticacion
router.use('/auth', authRoutes);

module.exports = router;

