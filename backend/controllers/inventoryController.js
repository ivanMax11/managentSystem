const Inventario = require('../models/Inventario');

// Crear un nuevo artículo de inventario
const addInventoryItem = async (req, res) => {
  const { nombre, cantidad, descripcion, fechaAdquisicion } = req.body;

  // Validaciones en el backend
  if (!nombre || !cantidad || !descripcion || !fechaAdquisicion) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }
  if (cantidad < 0) {
    return res.status(400).json({ message: 'La cantidad no puede ser negativa.' });
  }
  if (new Date(fechaAdquisicion) > new Date()) {
    return res.status(400).json({ message: 'La fecha de adquisición no puede ser en el futuro.' });
  }

  try {
    const newItem = new Inventario({
      nombre,
      cantidad,
      descripcion,
      fechaAdquisicion,
    });
    await newItem.save();
    res.status(201).json({ message: 'Artículo añadido con éxito', data: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir el artículo al inventario', error: error.message });
  }
};

// Obtener todos los artículos del inventario
const getInventoryItems = async (req, res) => {
  try {
    const items = await Inventario.find();
    res.json(items); // Cambiado a enviar solo los datos directamente
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los artículos de inventario', error: error.message });
  }
};


module.exports = { addInventoryItem, getInventoryItems };
