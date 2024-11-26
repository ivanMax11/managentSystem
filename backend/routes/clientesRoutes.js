const express = require('express');
const router = express.Router();
const { obtenerCliente } = require('../controllers/clienteController');

router.get('/', obtenerCliente)

module.exports = router;