const express = require('express');
const { addProduct, updateProduct, eliminarProducto, obtenerProductos } = require('../controllers/stockController');

const router = express.Router();

// Ruta para añadir un producto
router.post('/product', addProduct);

// Ruta para obtener el stock
router.get('/stock', obtenerProductos);

// Ruta para actualizar un producto
router.put('/product/:id', updateProduct);

// Ruta para eliminar un producto por su ID
router.delete('/product/:id', eliminarProducto);


module.exports = router;

