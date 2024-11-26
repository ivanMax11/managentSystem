const Cliente = require('../models/Cliente');

// Obtener todos los clientes
async function obtenerCliente(req, res) {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los clientes', error });
    }
}

module.exports = { obtenerCliente }; 