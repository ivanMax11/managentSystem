const mongoose = require('mongoose');
const Stock = require('../models/Stock');
const Proveedor = require('../models/Proveedor'); // Importamos el modelo de Proveedor

// Crear o actualizar un producto (Stock)
const addProduct = async (req, res) => {
  const { nombre, categoria, precio, cantidad, proveedorNombre, proveedorCuit, proveedorTelefono, proveedorDireccion } = req.body;

  try {
    // Verificamos si el proveedor ya existe
    let proveedor = await Proveedor.findOne({ cuit: proveedorCuit });

    if (!proveedor) {
      // Creamos un nuevo proveedor si no existe
      proveedor = new Proveedor({
        nombre: proveedorNombre,
        cuit: proveedorCuit,
        telefono: proveedorTelefono,
        direccion: proveedorDireccion,
      });
      await proveedor.save();
    }

    // Creamos o actualizamos el producto
    const product = new Stock({
      nombre,
      categoria,
      precio,
      cantidad,
      proveedor: proveedor._id, // Asociamos el ID del proveedor
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir el producto', error });
  }
};

module.exports = { addProduct };



// Obtener el stock actual
const getStock = async (req, res) => {
  try {
    console.log('Obteniendo inventario...'); // Log para depuración
    const products = await Stock.find()
      .populate('proveedor', 'nombre') // Popula el campo proveedor con el nombre
      .select('nombre categoria precio cantidad proveedor'); // Selecciona los campos que necesitas
    console.log('Productos encontrados:', products); // Log para verificar los datos
    res.json(products);
  } catch (error) {
    console.error('Error al obtener el inventario:', error); // Log para el error
    res.status(500).json({ message: 'Error al obtener el inventario', error });
  }
};


    
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const updatedProduct = await Stock.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};



module.exports = { addProduct, getStock, updateProduct};
