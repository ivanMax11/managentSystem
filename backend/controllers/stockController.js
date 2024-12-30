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


const eliminarProducto = async (req, res) => {
  const { id } = req.params; // ID extraído de la URL
  try {
    // Actualizar el campo activo a false
    const productoEliminado = await Stock.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true } // Retornar el documento actualizado
    );

    if (!productoEliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.status(200).json({ mensaje: 'Producto eliminado exitosamente', producto: productoEliminado });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ mensaje: 'Error al intentar eliminar el producto' });
  }
};


const obtenerProductos = async (req, res) => {
  const { activo } = req.query; // Obtener el parámetro activo de la consulta (si se proporciona)

  // Definir el filtro basado en el parámetro 'activo'
  const filtro = activo ? { activo: activo === 'true' } : {}; // Si 'activo=true', busca productos activos, si no, todos los productos.

  try {
    const productos = await Stock.find(filtro)  // Aplicar el filtro
      .populate('proveedor', 'nombre') // Poblar el campo proveedor con el nombre
      .select('nombre categoria precio cantidad proveedor activo'); // Seleccionar los campos necesarios

    res.status(200).json(productos); // Responder con los productos encontrados
  } catch (error) {
    console.error('Error al obtener los productos:', error); // Log para errores
    res.status(500).json({ mensaje: 'Error al obtener los productos', error });
  }
};



module.exports = { addProduct, updateProduct, eliminarProducto, obtenerProductos };
