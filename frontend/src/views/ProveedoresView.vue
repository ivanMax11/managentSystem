<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>CUIT</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proveedor in proveedores" :key="proveedor._id">
          <td>{{ proveedor.nombre }}</td>
          <td>{{ proveedor.cuit }}</td>
          <td>{{ proveedor.telefono }}</td>
          <td>{{ proveedor.direccion }}</td>
          <td>
            <button
              @click="cargarDatos(proveedor)"
              class="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#editarModal"
            >
              Editar
            </button>
            <button
              @click="eliminarProveedor(proveedor._id)"
              class="btn btn-danger btn-sm ms-2"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para editar proveedor -->
    <div class="modal fade" id="editarModal" tabindex="-1" aria-labelledby="editarModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editarModalLabel">Editar Proveedor</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="actualizarProveedor">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input v-model="proveedorActual.nombre" type="text" class="form-control" id="nombre" required />
              </div>
              <div class="mb-3">
                <label for="cuit" class="form-label">CUIT</label>
                <input v-model="proveedorActual.cuit" type="text" class="form-control" id="cuit" required />
              </div>
              <div class="mb-3">
                <label for="telefono" class="form-label">Teléfono</label>
                <input v-model="proveedorActual.telefono" type="text" class="form-control" id="telefono" required />
              </div>
              <div class="mb-3">
                <label for="direccion" class="form-label">Dirección</label>
                <input v-model="proveedorActual.direccion" type="text" class="form-control" id="direccion" required />
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
import axios from 'axios';

export default {
  data() {
    return {
      proveedores: [],
      proveedorActual: {}, // Datos del proveedor seleccionado para editar
    };
  },
  methods: {
    async obtenerProveedores() {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      try {
        const response = await axios.get(`${apiUrl}/api/proveedores`);
        this.proveedores = response.data;
      } catch (error) {
        console.error('Error al obtener proveedores:', error);
      }
    },
    cargarDatos(proveedor) {
      this.proveedorActual = { ...proveedor }; // Copia los datos del proveedor para edición
    },
    async actualizarProveedor() {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      try {
        await axios.put(`${apiUrl}/api/proveedores/${this.proveedorActual._id}`, this.proveedorActual);
        this.obtenerProveedores(); // Refresca la lista
        alert('Proveedor actualizado con éxito');
        this.proveedorActual = {}; // Limpia el formulario
        const modal = document.getElementById('editarModal');
        modal.querySelector('.btn-close').click(); // Cierra el modal
      } catch (error) {
        console.error('Error al actualizar proveedor:', error);
        alert('Hubo un error al actualizar el proveedor');
      }
    },
    async eliminarProveedor(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
        const apiUrl = import.meta.env.VITE_APP_API_URL;
        try {
          await axios.delete(`${apiUrl}/api/proveedores/${id}`);
          this.obtenerProveedores(); // Refresca la lista tras eliminar
          alert('Proveedor eliminado con éxito');
        } catch (error) {
          console.error('Error al eliminar proveedor:', error);
        }
      }
    },
  },
  mounted() {
    this.obtenerProveedores();
  },
};
</script>


  
  <style scoped>
h1 {
  color: #fff;
  text-align: center;
}

  .container {
    max-width: 100%;
  }

</style>
  