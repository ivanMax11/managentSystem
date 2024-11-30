<template>
  <div class="container mt-4">
    <h2>Inventario de Negocio</h2>
    <div class="row">
      <div class="col-md-12">
        <!-- Mostrar tabla solo si hay artículos -->
        <table v-if="inventoryItems.length > 0" class="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Descripción</th>
              <th>Fecha de Adquisición</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in inventoryItems" :key="item._id">
              <td>{{ item.nombre }}</td>
              <td>{{ item.cantidad }}</td>
              <td>{{ item.descripcion }}</td>
              <td>{{ formatFecha(item.fechaAdquisicion) }}</td>
              <td>
                <button class="btn btn-info btn-sm" @click="viewItem(item._id)">Ver Detalles</button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Mostrar mensaje si no hay artículos -->
        <p v-else class="text-muted">No hay artículos en el inventario.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'InventoryList',
  setup() {
    const inventoryItems = ref([]);

    // Función para cargar los artículos del inventario
    const loadInventoryItems = async () => {
      
      const apiUrl = process.env.VUE_APP_API_URL;

      try {
        const response = await axios.get(`${apiUrl}/api/inventario/items`); // Ajusta la URL si es necesario
        console.log('Datos del inventario:', response.data); // Log para verificar los datos
        inventoryItems.value = response.data;
      } catch (error) {
        console.error('Error al cargar los artículos del inventario:', error);
      }
    };

    // Función para ver detalles (puedes personalizarla)
    const viewItem = (itemId) => {
      console.log('Detalles del artículo:', itemId);
      // Implementa lógica de navegación si es necesario
    };

    // Formatear fecha para mostrarla legible
    const formatFecha = (fecha) => {
      if (!fecha) return 'Sin fecha';
      const fechaObj = new Date(fecha);
      return fechaObj.toLocaleDateString();
    };

    onMounted(loadInventoryItems);

    return {
      inventoryItems,
      viewItem,
      formatFecha,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
}

h2 {
  color: #fff;
  text-align: center;
}

.table th, .table td {
  text-align: center;
}
.text-muted {
  text-align: center;
  margin-top: 20px;
}
</style>
