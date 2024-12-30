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
                <button class="btn btn-info btn-sm" @click="openEditModal(item)">Editar</button>
                <button class="btn btn-danger btn-sm" @click="deleteItem(item._id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Mostrar mensaje si no hay artículos -->
        <p v-else class="text-muted">No hay artículos en el inventario.</p>
      </div>
    </div>

    <!-- Modal para editar inventario -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Editar Inventario</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveChanges">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input v-model="editItem.nombre" type="text" class="form-control" id="nombre" />
              </div>
              <div class="mb-3">
                <label for="cantidad" class="form-label">Cantidad</label>
                <input v-model="editItem.cantidad" type="number" class="form-control" id="cantidad" />
              </div>
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea v-model="editItem.descripcion" class="form-control" id="descripcion"></textarea>
              </div>
              <div class="mb-3">
                <label for="fechaAdquisicion" class="form-label">Fecha de Adquisición</label>
                <input
                  v-model="editItem.fechaAdquisicion"
                  type="text"
                  class="form-control"
                  id="fechaAdquisicion"
                  placeholder="DD/MM/YYYY"
                />
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
import { ref, onMounted } from "vue";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

export default {
  name: "InventoryList",
  setup() {
    const inventoryItems = ref([]);
    const editItem = ref({});
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    // Cargar inventario
    const loadInventoryItems = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/inventario/items`);
        inventoryItems.value = response.data;
      } catch (error) {
        console.error("Error al cargar los artículos del inventario:", error);
      }
    };

    // Formatear fecha
    const formatFecha = (fecha) => {
  if (!fecha) return "Sin fecha"; // Si no hay fecha
  try {
    const fechaObj = new Date(fecha);
    if (isNaN(fechaObj)) return "Fecha inválida"; // Si la fecha no es válida
    const dia = String(fechaObj.getDate()).padStart(2, "0");
    const mes = String(fechaObj.getMonth() + 1).padStart(2, "0");
    const anio = fechaObj.getFullYear();
    return `${dia}/${mes}/${anio}`;
  } catch (error) {
    console.error("Error al formatear la fecha:", fecha, error);
    return "Error en fecha";
  }
};


    // Abrir modal para editar
    const openEditModal = (item) => {
      editItem.value = { ...item };

      // Fecha queda en formato DD/MM/YYYY
      editItem.value.fechaAdquisicion = formatFecha(item.fechaAdquisicion);

      const modal = new bootstrap.Modal(document.getElementById("editModal"));
      modal.show();
    };

    // Guardar cambios
    const saveChanges = async () => {
  try {
    // Convertir la fecha en formato "DD/MM/YYYY" a un formato ISO
    const fechaParts = editItem.value.fechaAdquisicion.split('/');
    if (fechaParts.length === 3) {
      // Formato esperado: DD/MM/YYYY -> YYYY-MM-DD
      const fechaISO = `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`;
      editItem.value.fechaAdquisicion = fechaISO;
    }

    const response = await axios.put(
      `${apiUrl}/api/inventario/items/${editItem.value._id}`,
      editItem.value
    );

    console.log("Producto actualizado:", response.data);

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
    modal.hide();

    // Recargar lista de inventario
    await loadInventoryItems();
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
  }
};

// Eliminar producto
const deleteItem = async (id) => {
      const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este producto?");
      if (!confirmDelete) return;

      try {
        const response = await axios.delete(`${apiUrl}/api/inventario/items/${id}`);
        console.log("Producto eliminado:", response.data);

        // Recargar lista de inventario después de eliminar
        await loadInventoryItems();
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    };


    onMounted(loadInventoryItems);

    return {
      inventoryItems,
      editItem,
      openEditModal,
      saveChanges,
      formatFecha,
      deleteItem,
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

.table th,
.table td {
  text-align: center;
}
.text-muted {
  text-align: center;
  margin-top: 20px;
}
</style>
