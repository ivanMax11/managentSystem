const Venta = require('../models/Venta');
const Stock = require('../models/Stock');
const Cliente = require('../models/Cliente'); // Asegúrate de importar el modelo Cliente
const mongoose = require('mongoose');


async function registrarVenta(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { carrito, cliente, cuit, email, telefono, fecha, total } = req.body;

    console.log('Datos recibidos:', req.body);

    // Verificar datos obligatorios
    if (!carrito || !carrito.length || !cliente || !cuit || !email || !telefono || !total) {
      return res.status(400).json({ message: 'Faltan datos obligatorios para registrar la venta' });
    }

    // Verificar existencia de productos en el carrito y validar stock
    for (let item of carrito) {
      const { productoId, cantidad } = item;
      
      if (!productoId || !cantidad) {
        throw new Error('Faltan datos de producto en el carrito');
      }

      // Buscar el producto
      const producto = await Stock.findById(productoId).populate('proveedor').session(session);
      if (!producto) {
        throw new Error('Producto no encontrado');
      }

      // Validar stock disponible
      if (producto.cantidad < cantidad) {
        throw new Error(`Stock insuficiente para el producto: ${producto.nombre}`);
      }

      // Actualizar stock
      producto.cantidad -= cantidad;
      await producto.save({ session });
    }

    // Registrar o buscar cliente por CUIT
    let clienteExistente = await Cliente.findOne({ cuit }).session(session);
    if (!clienteExistente) {
      clienteExistente = new Cliente({ nombre: cliente, cuit, email, telefono });
      await clienteExistente.save({ session });
    }

    // Crear la venta
    const venta = new Venta({
      productos: carrito.map(item => ({
        producto: item.productoId, // El ID del producto
        cantidad: item.cantidad,   // La cantidad vendida
      })),
      cliente: clienteExistente.nombre,
      cuit: clienteExistente.cuit,
      email: clienteExistente.email,
      telefono: clienteExistente.telefono,
      fecha: fecha || Date.now(),
      total,
    });

    await venta.save({ session });

    // Confirmar la transacción
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: 'Venta registrada con éxito', venta });
  } catch (error) {
    console.error('Error:', error.message);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
}



// Función para obtener el historial de ventas con filtros de fecha
async function obtenerVentas(req, res) {
  const { startDate, endDate } = req.query;

  try {
    let query = {};

    // Filtro por fechas si se proporcionan
    if (startDate || endDate) {
      query.fecha = {};
      if (startDate) query.fecha.$gte = new Date(startDate);
      if (endDate) query.fecha.$lte = new Date(endDate);
    }

    console.log('Consulta generada:', query); // Log para verificar el filtro

    // Buscar ventas con el filtro de fecha y poblar los productos y cliente
    const ventas = await Venta.find(query)
      .populate({
        path: 'productos.producto', // Poblar el campo producto dentro del arreglo productos
        select: 'nombre', // Selecciona solo el nombre del producto
      })
      .exec();

    console.log('Ventas encontradas:', ventas); // Log para verificar los datos

    // Modificar el formato de la respuesta para separar cantidad y nombre
    const ventasFormateadas = ventas.map(venta => {
      return {
        ...venta.toObject(),
        productos: venta.productos.map(p => ({
          nombre: p.producto.nombre,
          cantidad: p.cantidad
        }))
      };
    });

    res.status(200).json(ventasFormateadas); // Enviar la respuesta formateada
  } catch (error) {
    console.error('Error al obtener ventas:', error); // Log para errores
    res.status(500).json({ message: 'Error al obtener el historial de ventas', error });
  }
}


// Funcion para generar presupuesto
async function generarPresupuesto(req, res) {
  try {
    const { carrito, cliente, cuit, email, telefono, fecha, total } = req.body;

    // Verificar datos obligatorios
    if (!carrito || !carrito.length || !cliente || !cuit || !email || !telefono || !total) {
      return res.status(400).json({ message: 'Faltan datos obligatorios para generar el presupuesto' });
    }

    // Verificar existencia de productos en el carrito y validar stock
    let productosPresupuesto = [];
    for (let item of carrito) {
      const { productoId, cantidad } = item;

      if (!productoId || !cantidad) {
        throw new Error('Faltan datos de producto en el carrito');
      }

      // Buscar el producto
      const producto = await Stock.findById(productoId).populate('proveedor');
      if (!producto) {
        throw new Error('Producto no encontrado');
      }

      // Validar stock disponible (opcional, si aplica al presupuesto)
      if (producto.cantidad < cantidad) {
        throw new Error(`Stock insuficiente para el producto: ${producto.nombre}`);
      }

      // Agregar producto al presupuesto
      productosPresupuesto.push({
        producto: {
          id: producto._id,
          nombre: producto.nombre,
          precio: producto.precio,
        },
        cantidad,
      });
    }

    // Crear la estructura del presupuesto
    const presupuesto = {
      productos: productosPresupuesto,
      cliente,
      cuit,
      email,
      telefono,
      fecha: fecha || Date.now(),
      total,
    };

    // Enviar respuesta con el presupuesto generado
    res.status(201).json({ message: 'Presupuesto generado con éxito', presupuesto });
  } catch (error) {
    console.error('Error al generar el presupuesto:', error.message);
    res.status(500).json({ message: error.message });
  }
}


module.exports = { registrarVenta, obtenerVentas, generarPresupuesto };
