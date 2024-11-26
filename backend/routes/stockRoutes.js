const express = require('express');
const { addProduct, getStock, updateProduct } = require('../controllers/stockController');

const router = express.Router();

// Ruta para añadir un producto
router.post('/product', addProduct);

// Ruta para obtener el stock
router.get('/stock', getStock);

// Ruta para actualizar un producto
router.put('/product/:id', updateProduct);


module.exports = router;

