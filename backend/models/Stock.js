const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true, default: 0 }, // Inicialmente en 0
  proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true } // Referencia al modelo Proveedor
});

module.exports = mongoose.model('Stock', stockSchema);
