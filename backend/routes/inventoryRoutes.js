const express = require('express');
const router = express.Router();
const { getInventoryItems, addInventoryItem, actualizarProducto, eliminarProducto  } = require('../controllers/inventoryController');

// Ruta para obtener los artículos del inventario
router.get('/items', getInventoryItems);

// Ruta para añadir un nuevo artículo al inventario
router.post('/', addInventoryItem);

// Ruta para actualizar un producto
router.put('/items/:id', actualizarProducto)

// Ruta para eliminar un producto
router.delete('/items/:id', eliminarProducto);

module.exports = router;
