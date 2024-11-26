const mongoose = require('mongoose');

const inventarioSchema = new mongoose.Schema({
  nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
  cantidad: { 
    type: Number, 
    required: [true, 'La cantidad es obligatoria'], 
    min: [0, 'La cantidad no puede ser negativa'] 
  },
  descripcion: { type: String, required: [true, 'La descripción es obligatoria'] },
  fechaAdquisicion: { 
    type: Date, 
    required: [true, 'La fecha de adquisición es obligatoria'], 
    validate: {
      validator: (value) => value <= new Date(),
      message: 'La fecha de adquisición no puede ser en el futuro',
    },
  },
});

module.exports = mongoose.model('Inventario', inventarioSchema);
