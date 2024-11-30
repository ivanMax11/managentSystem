<template>
  <div class="container mt-5">
    <!-- Formulario para generar presupuesto -->
    <form @submit.prevent="agregarProducto" class="p-4 bg-light rounded shadow-sm" v-if="!presupuestoGenerado">
      <h3>Generar Presupuesto</h3>
      <div class="row">
        <!-- Selección de productos -->
        <div class="col-md-6 mb-3">
          <label for="producto" class="form-label">Selecciona el producto</label>
          <select v-model="productoSeleccionado" class="form-select" id="producto">
            <option disabled value="">Seleccione un producto</option>
            <option v-for="producto in productos" :key="producto._id" :value="producto">
              {{ producto.nombre }} - ${{ producto.precio }} (Stock: {{ producto.cantidad }})
            </option>
          </select>
        </div>

        <!-- Cantidad -->
        <div class="col-md-6 mb-3">
          <label for="cantidad" class="form-label">Cantidad</label>
          <input v-model="cantidad" type="number" min="1" class="form-control" id="cantidad" />
        </div>

        <!-- Botón para añadir producto -->
        <div class="col-md-12">
          <button type="button" @click="añadirAlPresupuesto" class="btn btn-secondary">
            Añadir al Presupuesto
          </button>
        </div>
      </div>
    </form>

    <!-- Carrito de productos añadidos -->
    <div v-if="carrito.length && !presupuestoGenerado" class="mt-4">
      <h4>Lista de Productos</h4>
      <ul class="list-group mb-4">
        <li v-for="(item, index) in carrito" :key="index"
          class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>{{ item.producto?.nombre }}</strong><br />
            {{ item.cantidad }} unidades - ${{ item.total }}
          </div>
          <button @click="eliminarProducto(index)" class="btn btn-sm btn-danger">Eliminar</button>
        </li>
      </ul>
    </div>

    <!-- Formulario con los datos del cliente -->
    <form @submit.prevent="generarPresupuesto" v-if="carrito.length && !presupuestoGenerado" class="mt-5 p-4 bg-light rounded shadow-sm">
      <h4>Datos del Cliente</h4>
      <div class="row">
        <!-- Cliente -->
        <div class="col-md-6 mb-3">
          <label for="cliente" class="form-label">Cliente</label>
          <input v-model="cliente" type="text" class="form-control" id="cliente" required />
        </div>

        <!-- CUIT -->
        <div class="col-md-6 mb-3">
          <label for="cuit" class="form-label">CUIT</label>
          <input v-model="cuit" type="text" class="form-control" id="cuit" />
        </div>

        <!-- Email -->
        <div class="col-md-6 mb-3">
          <label for="email" class="form-label">Correo Electrónico</label>
          <input v-model="email" type="email" class="form-control" id="email" />
        </div>

        <!-- Teléfono -->
        <div class="col-md-6 mb-3">
          <label for="telefono" class="form-label">Teléfono</label>
          <input v-model="telefono" type="tel" class="form-control" id="telefono" />
        </div>

        <!-- Fecha -->
        <div class="col-md-6 mb-3">
          <label for="fecha" class="form-label">Fecha</label>
          <input v-model="fecha" type="date" class="form-control" id="fecha" required />
        </div>

        <!-- Total -->
        <div class="col-md-6 mb-3">
          <label for="total" class="form-label">Total</label>
          <input :value="totalPresupuesto" type="text" class="form-control" id="total" disabled />
        </div>

        <!-- Botón para generar presupuesto -->
        <div class="col-md-12">
          <button type="submit" class="btn btn-primary">Generar Presupuesto</button>
        </div>
      </div>
    </form>

    <!-- Mostrar presupuesto generado -->
    <div v-if="presupuestoGenerado" class="mt-5" id="presupuesto">
      <h4>Presupuesto Generado</h4>
      <div class="card p-3 bg-light rounded shadow-sm">
        <p><strong>Cliente:</strong> {{ cliente }}</p>
        <p><strong>CUIT:</strong> {{ cuit }}</p>
        <p><strong>Correo:</strong> {{ email }}</p>
        <p><strong>Teléfono:</strong> {{ telefono }}</p>
        <p><strong>Fecha:</strong> {{ fecha }}</p>
        <p><strong>Total:</strong> ${{ totalPresupuesto }}</p>
        
        <h5>Productos:</h5>
        <ul>
          <li v-for="item in carrito" :key="item.producto._id">
            {{ item.producto.nombre }} - {{ item.cantidad }} unidades - ${{ item.total }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Botón para imprimir -->
    <div v-if="presupuestoGenerado" class="mt-4">
      <button @click="imprimirPresupuesto" class="btn btn-success">Imprimir Presupuesto</button>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      productos: [],
      productoSeleccionado: null,
      cantidad: 1,
      carrito: [],
      cliente: "",
      cuit: "",
      email: "",
      telefono: "",
      fecha: new Date().toISOString().split("T")[0],
      totalPresupuesto: 0,
      presupuestoGenerado: false, // Nueva variable para controlar si el presupuesto fue generado
    };
  },
  methods: {
    añadirAlPresupuesto() {
      if (!this.productoSeleccionado) {
        alert("Por favor selecciona un producto");
        return;
      }

      if (this.cantidad <= 0 || this.cantidad > this.productoSeleccionado.cantidad) {
        alert("Cantidad inválida o superior al stock disponible");
        return;
      }

      const producto = this.productoSeleccionado;
      const total = producto.precio * this.cantidad;

      this.carrito.push({
        productoId: producto._id,
        cantidad: this.cantidad,
        total,
        producto,
      });

      producto.cantidad -= this.cantidad;
      this.calcularTotal();

      this.productoSeleccionado = null;
      this.cantidad = 1;
    },

    eliminarProducto(index) {
      const item = this.carrito[index];
      const producto = this.productos.find((p) => p._id === item.productoId);
      if (producto) {
        producto.cantidad += item.cantidad; // Restaurar el stock
      }
      this.carrito.splice(index, 1);
      this.calcularTotal();
    },

    calcularTotal() {
      this.totalPresupuesto = this.carrito.reduce((acc, item) => acc + item.total, 0);
    },

    generarPresupuesto() {
      // Mostrar el presupuesto generado en la misma página
      this.presupuestoGenerado = true;
    },

    imprimirPresupuesto() {
      window.print();
    },
  },
  created() {
  const apiUrl = process.env.VUE_APP_API_URL; // Asegúrate de tener la variable de entorno configurada

  // Cargar los productos disponibles
  axios
    .get(`${apiUrl}/api/stock/stock`) // Usar la URL dinámica según el entorno
    .then((response) => {
      this.productos = response.data;
    })
    .catch((error) => {
      console.error("Error al cargar los productos:", error);
      alert("Hubo un problema al cargar los productos");
    });
  },
};

</script>

<style scoped>
.container {
  max-width: 800px;
  margin-bottom: 100px;
}

/* Estilo para la impresión */
@media print {
  /* Ocultar todo lo que no quieres que aparezca en la impresión */
  body * {
    display: none;
  }
  

  /* Hacer visible solo la sección del presupuesto */
  #presupuesto, #presupuesto * {
    display: block;
    visibility: visible;
  }

  nav, header {
    display: none !important;
  }

  /* Especificar que los botones de imprimir deben desaparecer en la impresión */
  .btn {
    display: none;
  }

  /* Opcional: Establecer márgenes de impresión y otras configuraciones de página */
  @page {
    margin: 20mm;
  }
}

</style>
