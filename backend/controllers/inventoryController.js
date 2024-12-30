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

// Actualiar producto de inventario
const actualizarProducto = async (req, res) => {
  const { id } = req.params; // Obtener el ID del producto desde los parámetros de la URL
  const datosActualizados = req.body; // Obtener los datos enviados desde el frontend

  try {
    // Buscar y actualizar el producto por ID
    const productoActualizado = await Inventario.findByIdAndUpdate(
      id,
      datosActualizados,
      { new: true } // Retorna el documento actualizado
    );

    if (!productoActualizado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Producto actualizado correctamente',
      producto: productoActualizado,
    });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el producto', error });
  }
};

// Funcion para eliminar un producto
const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const productoEliminado = await Inventario.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Producto eliminado corerrectamente',
      producto: productoEliminado,
    });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el producto', error });
  }
};

module.exports = { addInventoryItem, getInventoryItems, actualizarProducto, eliminarProducto };
