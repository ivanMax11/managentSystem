<template>
  <div class="container">
    <h2>Registrar Venta</h2>

    <!-- Formulario de venta -->
    <form @submit.prevent="agregarProducto" class="mt-5 p-4 bg-light rounded shadow-sm">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="producto" class="form-label">Selecciona el producto</label>
          <select v-model="productoSeleccionado" class="form-select" id="producto" required>
            <option v-for="producto in productos" :key="producto._id" :value="producto">
              {{ producto.nombre }} - ${{ producto.precio }} (Stock: {{ producto.cantidad }})
            </option>
          </select>
        </div>

        <div class="col-md-6 mb-3">
          <label for="cantidad" class="form-label">Cantidad</label>
          <input v-model="cantidad" type="number" min="1" class="form-control" id="cantidad" required />
        </div>

        <div class="col-md-12">
          <button type="submit" class="btn btn-secondary">Añadir al Carrito</button>
        </div>
      </div>
    </form>

    <!-- Lista de productos añadidos -->
    <div v-if="carrito.length" class="mt-4">
      <h3>Carrito</h3>
      <ul class="list-group mb-4">
        <li v-for="(item, index) in carrito" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
          {{ item.producto.nombre }} ({{ item.cantidad }} unidades) - ${{ item.total }}
          <button @click="eliminarProducto(index)" class="btn btn-sm btn-danger">Eliminar</button>
        </li>
      </ul>
    </div>

    <!-- Detalles del cliente -->
    <form @submit.prevent="registrarVenta" v-if="carrito.length" class="mt-5 p-4 bg-light rounded shadow-sm">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="cliente" class="form-label">Cliente</label>
          <input v-model="cliente" type="text" class="form-control" id="cliente" required />
        </div>

        <div class="col-md-6 mb-3">
          <label for="cuit" class="form-label">CUIT del Cliente</label>
          <input v-model="cuit" type="text" class="form-control" id="cuit" required />
        </div>

        <div class="col-md-6 mb-3">
          <label for="email" class="form-label">Correo Electrónico</label>
          <input v-model="email" type="email" class="form-control" id="email" required />
        </div>

        <div class="col-md-6 mb-3">
          <label for="telefono" class="form-label">Teléfono</label>
          <input v-model="telefono" type="tel" class="form-control" id="telefono" required />
        </div>

        <div class="col-md-6 mb-3">
          <label for="fecha" class="form-label">Fecha</label>
          <input v-model="fecha" type="date" class="form-control" id="fecha" required />
        </div>

        <div class="col-md-6 mb-3">
          <label for="total" class="form-label">Total</label>
          <input :value="totalVenta" type="text" class="form-control" id="total" disabled />
        </div>

        <div class="col-md-12">
          <button type="submit" class="btn btn-primary">Registrar Venta</button>
        </div>
      </div>
    </form>

    <div class="row mt-5">
  <!-- Tarjeta Historial de Ventas -->
  <div class="col-md-6 mb-4">
    <div class="card" style="cursor: pointer;" @click="irA('historial')">
      <div class="card-body d-flex align-items-center justify-content-start text-start">
        <i class="bi bi-journal-text fs-2 me-3"></i> <!-- Icono para Historial de Ventas -->
        <div>
          <h5 class="card-title">Historial de Ventas</h5>
          <p class="card-text">Consulta el historial completo de ventas registradas.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Tarjeta Presupuesto -->
  <div class="col-md-6 mb-4">
    <div class="card" style="cursor: pointer;" @click="irA('presupuestos')">
      <div class="card-body d-flex align-items-center justify-content-start text-start">
        <i class="bi bi-cash-stack fs-2 me-3"></i> <!-- Icono para Presupuesto -->
        <div>
          <h5 class="card-title">Presupuesto</h5>
          <p class="card-text">Calcula y genera presupuestos basados en los productos seleccionados.</p>
        </div>
      </div>
    </div>
  </div>
</div>


    <!-- Mensaje de alerta -->
    <div v-if="mensaje" :class="`alert alert-${mensajeTipo} mt-3`">
      {{ mensaje }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      productos: [],
      productoSeleccionado: null,
      cantidad: 1,
      carrito: [],
      cliente: '',
      cuit: '',
      fecha: '',
      email: '',
      telefono: '',
      mensaje: '',
      mensajeTipo: '',
    };
  },

  computed: {
    totalVenta() {
      return this.carrito.reduce((total, item) => total + item.total, 0).toFixed(2);
    },
  },

  created() {
    this.cargarProductos();
  },

  methods: {
    async cargarProductos() {

      const apiUrl = process.env.VUE_APP_API_URL;

      try {    
        const response = await axios.get(`${apiUrl}/api/stock/stock`);
        this.productos = response.data;
      } catch (error) {
        this.mostrarMensaje('Error al cargar los productos', 'danger');
      }
    },

    agregarProducto() {
      if (!this.productoSeleccionado || this.cantidad <= 0) {
        return this.mostrarMensaje('Selecciona un producto válido y una cantidad mayor a 0', 'danger');
      }

      if (this.cantidad > this.productoSeleccionado.cantidad) {
        return this.mostrarMensaje('La cantidad excede el stock disponible', 'danger');
      }

      const producto = {
        producto: this.productoSeleccionado,
        cantidad: this.cantidad,
        total: this.productoSeleccionado.precio * this.cantidad,
      };

      this.carrito.push(producto);
      this.productoSeleccionado = null;
      this.cantidad = 1;
      this.mostrarMensaje('Producto añadido al carrito', 'success');
    },

    eliminarProducto(index) {
      this.carrito.splice(index, 1);
      this.mostrarMensaje('Producto eliminado del carrito', 'info');
    },

    async registrarVenta() {
  if (!this.carrito.length) {
    return this.mostrarMensaje('El carrito está vacío', 'danger');
  }

  try {
    const ventaData = {
  carrito: this.carrito.map(item => ({
    productoId: item.producto._id, // ID del producto
    cantidad: item.cantidad,       // Cantidad vendida
  })),
  cliente: this.cliente,           // Nombre del cliente
  cuit: this.cuit,                 // CUIT del cliente
  email: this.email,               // Correo del cliente
  telefono: this.telefono,         // Teléfono del cliente
  fecha: this.fecha,               // Fecha de la venta
  total: this.totalVenta           // Total de la venta
};


    console.log('Datos enviados al backend:', ventaData); // Depuración
    const apiUrl = process.env.VUE_APP_API_URL;

    const response = await axios.post(`${apiUrl}/api/ventas/venta`, ventaData);

    if (response.status === 201) {
      this.mostrarMensaje('Venta registrada con éxito', 'success');
      this.carrito = [];
      this.limpiarFormulario();
    } else {
      this.mostrarMensaje('Error al registrar la venta', 'danger');
    }
  } catch (error) {
    const mensaje = error.response?.data?.message || 'Error al registrar la venta';
    console.error('Error del servidor:', error.response?.data);
    this.mostrarMensaje(mensaje, 'danger');
  }
},


    mostrarMensaje(mensaje, tipo) {
      this.mensaje = mensaje;
      this.mensajeTipo = tipo;
      setTimeout(() => {
        this.mensaje = '';
      }, 3000);
    },

    limpiarFormulario() {
      this.cliente = '';
      this.cuit = '';
      this.email = '';
      this.telefono = '';
      this.fecha = '';
    },

    irA(ruta) {
      this.$router.push(`/${ruta}`);
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  margin-top: 100px;
  /* Espacio desde el header */
}

/* Estilo de las tarjetas */
.card {
  background-color: #3b3a96; /* Azul profesional */
  color: #fff;
  width: 100%;
  /* Hace que las tarjetas sean más anchas */
  height: auto;
  /* Reduce la altura de las tarjetas */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra elegante */
  /* Agrega una sombra sutil */
  transition: transform 0.2s;
  /* Animación de hover */
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgb(0, 0, 0, 0.3);
  /* Hace que las tarjetas se eleven ligeramente al pasar el mouse */
}

.card-body {
  display: flex;
  align-items: center;
  justify-content: start;
  /* Alineación al principio */
  padding: 1rem;
  /* Ajuste del padding */
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: -20px;
  /* Levanta el texto */
}

.card-text {
  font-size: 1rem;
}

.card-body i {
  font-size: 2rem;
  /* Tamaño del icono */
  margin-right: 1rem;
  /* Ajuste de margen entre el icono y el texto */
}

.card-body div {
  display: flex;
  flex-direction: column;
  /* Alineación en columna */
  justify-content: center;
}

.col-md-4 {
  display: flex;
  justify-content: center;
}

i {
  margin-bottom: 30px;
}
</style>
