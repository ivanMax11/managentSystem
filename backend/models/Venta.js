const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  productos: [{
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stock', // Referencia al modelo de Stock
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
  }],
  cliente: {
    type: String,
    required: true,
  },
  cuit: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, // Obligatorio para registrar ventas
  },
  telefono: {
    type: String,
    required: true, // Obligatorio para registrar ventas
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number,
    required: true,
  },
});

const Venta = mongoose.model('Venta', ventaSchema);

module.exports = Venta;
