<template>
  <div class="container mt-4">
    <h1>Actual Stock</h1>
    <div class="row">
      <div class="col-md-12">
        <table v-if="products.length > 0" class="table table-striped">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Proveedor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product._id">
              <td>{{ product.nombre }}</td>
              <td>{{ product.categoria }}</td>
              <td>{{ product.cantidad }}</td>
              <td>{{ formatCurrency(product.precio) }}</td>
              <td>{{ product.proveedor ? product.proveedor.nombre : 'Proveedor no disponible' }}</td>
              <td>
                <button class="btn btn-info btn-sm" @click="openEditModal(product)">Gestionar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="text-muted">No hay productos en stock.</p>
      </div>
    </div>

    <!-- Modal para editar producto -->
    <div v-if="selectedProduct" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Gestionar Producto</h5>
            <button type="button" class="btn-close" @click="closeEditModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateProduct">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input v-model="selectedProduct.nombre" type="text" class="form-control" id="nombre" />
              </div>
              <div class="mb-3">
                <label for="categoria" class="form-label">Categoría</label>
                <input v-model="selectedProduct.categoria" type="text" class="form-control" id="categoria" />
              </div>
              <div class="mb-3">
                <label for="cantidad" class="form-label">Cantidad Actual</label>
                <input v-model="selectedProduct.cantidad" type="number" class="form-control" id="cantidad" readonly />
              </div>
              <div class="mb-3">
                <label for="addCantidad" class="form-label">Añadir Cantidad</label>
                <input v-model="additionalQuantity" type="number" class="form-control" id="addCantidad" />
              </div>
              <div class="mb-3">
                <label for="precio" class="form-label">Precio</label>
                <input v-model="selectedProduct.precio" type="number" class="form-control" id="precio" />
              </div>
              <div class="mb-3">
                <label for="proveedor" class="form-label">Proveedor</label>
                <input v-model="selectedProduct.proveedor.nombre" type="text" class="form-control" id="proveedor" />
              </div>
              <button type="submit" class="btn btn-primary">Guardar Cambios</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'StockView',
  setup() {
    const products = ref([]);
    const selectedProduct = ref(null);
    const additionalQuantity = ref(0);

    const loadProducts = async () => {
      const apiUrl = process.env.VUE_APP_API_URL;
      
      try {
        const response = await axios.get(`${apiUrl}/api/stock/stock`);
        products.value = response.data;
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    const formatCurrency = (value) => {
      if (value == null) return '';
      return `$${parseFloat(value).toFixed(2)}`;
    };

    const openEditModal = (product) => {
      selectedProduct.value = { ...product };
      additionalQuantity.value = 0;
    };

    const closeEditModal = () => {
      selectedProduct.value = null;
    };

    const updateProduct = async () => {
  try {
    const updatedProduct = JSON.parse(JSON.stringify(selectedProduct.value));
    if (additionalQuantity.value > 0) {
      updatedProduct.cantidad += additionalQuantity.value;
    }

    const response = await axios.put(`http://localhost:5000/api/stock/product/${updatedProduct._id}`, updatedProduct);
    console.log('Producto actualizado:', response.data);

    await loadProducts();
    closeEditModal();
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
  }
};



    onMounted(loadProducts);

    return {
      products,
      selectedProduct,
      additionalQuantity,
      formatCurrency,
      openEditModal,
      closeEditModal,
      updateProduct,
    };
  },
};


</script>

<style scoped>
.container {
  max-width: 100%;
  margin-bottom: 100px;
}

h1 {
  color: #fff;
  text-align: center;
}
@media (max-width: 767px) {
  .table th, .table td {
    font-size: 10px; /* Reducir el tamaño de fuente para dispositivos pequeños */
  }

  .table td {
    padding: 8px; /* Reducir el padding */
  }

  .table th {
    padding: 10px; /* Reducir el padding en los encabezados */
  }
}
</style>
