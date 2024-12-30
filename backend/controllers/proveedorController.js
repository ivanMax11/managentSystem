const Proveedor = require('../models/Proveedor');

// Obtener todos los proveedores
const obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener proveedores', error });
  }
};

// Elimianar proveedor
const eliminarProveedor = async (req, res) => {
  const { id } = req.params; // ID recibido de la URL
  try {
    const resultado = await Proveedor.findByIdAndDelete(id);
    if (!resultado) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }
    res.status(200).json({ mensaje: 'Proveedor eliminado con exito' });
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    res.status(500).json({ mensaje: 'error al eliminar el proveedor' });
  }
};

const editarProveedor = async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body; // Los datos nuevos llegan en el cuerpo de la solicitud

  try {
    const proveedor = await Proveedor.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (!proveedor) {
      return res.status(404).json({ mensaje: 'Proveedir no encontrado' });
    } 
    res.status(200).json({ mensaje: 'Proveedor actualizado con exito', proveedor });
  } catch (error) {
    console.error('Error al editar proveedor:', error);
  }
};

module.exports = { obtenerProveedores, eliminarProveedor, editarProveedor };
