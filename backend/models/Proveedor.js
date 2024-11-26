const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cuit: { type: String, required: true, unique: true },
  telefono: { type: String },
  direccion: { type: String },
});

module.exports = mongoose.model('Proveedor', proveedorSchema);
