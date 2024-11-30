<template>
  <div class="container mt-5">
    <div class="card bg-dark text-white p-4 shadow-lg">
      <h2 class="mb-4 text-center">Añadir Nuevo Producto</h2>
      <form @submit.prevent="addProduct">
        <!-- Nombre del Producto -->
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre del Producto</label>
          <input
            v-model="nombre"
            type="text"
            id="nombre"
            class="form-control"
            placeholder="Nombre del producto"
            required
          />
        </div>

        <!-- Categoría -->
        <div class="mb-3">
          <label for="categoria" class="form-label">Categoría</label>
          <input
            v-model="categoria"
            type="text"
            id="categoria"
            class="form-control"
            placeholder="Categoría"
          />
        </div>

        <!-- Precio -->
        <div class="mb-3">
          <label for="precio" class="form-label">Precio</label>
          <input
            v-model.number="precio"
            type="number"
            id="precio"
            class="form-control"
            placeholder="Precio"
            required
          />
        </div>

        <!-- Cantidad -->
        <div class="mb-3">
          <label for="cantidad" class="form-label">Cantidad</label>
          <input
            v-model.number="cantidad"
            type="number"
            id="cantidad"
            class="form-control"
            placeholder="Cantidad"
            required
          />
        </div>

        <!-- Sección Proveedor -->
        <h4 class="mt-4">Detalles del Proveedor</h4>

        <div class="mb-3">
          <label for="proveedorNombre" class="form-label">Nombre del Proveedor</label>
          <input
            v-model="proveedorNombre"
            type="text"
            id="proveedorNombre"
            class="form-control"
            placeholder="Nombre del proveedor"
            required
          />
        </div>

        <div class="mb-3">
          <label for="proveedorCuit" class="form-label">CUIT</label>
          <input
            v-model="proveedorCuit"
            type="text"
            id="proveedorCuit"
            class="form-control"
            placeholder="CUIT del proveedor"
            required
          />
        </div>

        <div class="mb-3">
          <label for="proveedorTelefono" class="form-label">Teléfono</label>
          <input
            v-model="proveedorTelefono"
            type="text"
            id="proveedorTelefono"
            class="form-control"
            placeholder="Teléfono del proveedor"
          />
        </div>

        <div class="mb-3">
          <label for="proveedorDireccion" class="form-label">Dirección</label>
          <input
            v-model="proveedorDireccion"
            type="text"
            id="proveedorDireccion"
            class="form-control"
            placeholder="Dirección del proveedor"
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">Añadir Producto</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nombre: "",
      categoria: "",
      precio: 0,
      cantidad: 0,
      proveedorNombre: "",
      proveedorCuit: "",
      proveedorTelefono: "",
      proveedorDireccion: "",
    };
  },
  methods: {
    async addProduct() {
  try {
    // Crear los datos del producto
    const productData = {
      nombre: this.nombre,
      categoria: this.categoria,
      precio: this.precio,
      cantidad: this.cantidad,
      proveedorNombre: this.proveedorNombre,
      proveedorCuit: this.proveedorCuit,
      proveedorTelefono: this.proveedorTelefono,
      proveedorDireccion: this.proveedorDireccion,
    };

    const apiUrl = process.env.VUE_APP_API_URL; 

    // Realizar la solicitud POST para añadir el producto
    await axios.post(`${apiUrl}/api/stock/product`, productData);

    // Si todo sale bien
    alert("Producto añadido exitosamente");
    this.resetForm(); // Reiniciar el formulario si es necesario
  } catch (error) {
    console.error("Error al añadir producto:", error);
    alert("Hubo un error al añadir el producto");
  }
},

    resetForm() {
      this.nombre = "";
      this.categoria = "";
      this.precio = 0;
      this.cantidad = 0;
      this.proveedorNombre = "";
      this.proveedorCuit = "";
      this.proveedorTelefono = "";
      this.proveedorDireccion = "";
    },
  },
};
</script>

<style scoped>
h2,
h4 {
  color: #fff;
}

.container {
  color: #fff;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 60px;
}

.card {
  border: none;
  border-radius: 10px;
}

.form-label {
  font-weight: bold;
  color: #ddd;
}

.form-control {
  background-color: #333;
  color: #fff; /* Cambia el color del texto en el input a blanco */
  border: 1px solid #555;
}

.form-control::placeholder {
  color: #aaa; /* Asegura que los placeholders sean distinguibles */
}

.form-control:focus {
  background-color: #444;
  color: #fff; /* Asegura que el texto siga siendo blanco al enfocar */
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

textarea.form-control {
  resize: none; /* Opcional: Evita que los usuarios cambien el tamaño del textarea */
}

.btn-primary {
  background-color: #3b3a96;
  border-color: #3b3a96;
}

.btn-primary:hover {
  background-color: #26207c;
  border-color: #26207c;
}

</style>
