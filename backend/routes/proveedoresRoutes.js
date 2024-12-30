const express = require('express');
const router = express.Router();
const { obtenerProveedores, eliminarProveedor, editarProveedor } = require('../controllers/proveedorController');


// Ruta para obtener todos los proveedores
router.get('/', obtenerProveedores);

// Ruta para eliminar un proveedor
router.delete('/:id', eliminarProveedor)

// Ruta para editar proveedores
router.put('/:id', editarProveedor);

module.exports = router;
