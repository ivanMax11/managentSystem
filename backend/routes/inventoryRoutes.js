const express = require('express');
const router = express.Router();
const { getInventoryItems, addInventoryItem  } = require('../controllers/inventoryController');

// Ruta para obtener los artículos del inventario
router.get('/items', getInventoryItems);

// Ruta para añadir un nuevo artículo al inventario
router.post('/', addInventoryItem);

module.exports = router;
