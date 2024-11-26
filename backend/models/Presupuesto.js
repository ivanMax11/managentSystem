const mongoose = require('mongoose');

const presupuestoSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stock',
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  cliente: String,
  cuit: String,
  email: String,
  telefono: String,
  fecha: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number,
    required: true,
  },
});

const Presupuesto = mongoose.model('Presupuesto', presupuestoSchema);
module.exports = Presupuesto;
