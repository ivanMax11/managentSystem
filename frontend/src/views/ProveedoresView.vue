<template>
    <div class="container mt-5">
      <h1 class="mb-4">Lista de Proveedores</h1>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">CUIT</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Dirección</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="proveedor in proveedores" :key="proveedor._id">
            <td>{{ proveedor.nombre }}</td>
            <td>{{ proveedor.cuit }}</td>
            <td>{{ proveedor.telefono }}</td>
            <td>{{ proveedor.direccion }}</td>
            <td>
              <button @click="verDetalles(proveedor)" class="btn btn-info btn-sm">Ver</button>
              <button @click="eliminarProveedor(proveedor._id)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        proveedores: [], // Aquí se almacenarán los datos de los proveedores
      };
    },
    methods: {
      async obtenerProveedores() {
        const apiUrl = import.meta.env.VITE_APP_API_URL;
        try {
          const response = await axios.get(`${apiUrl}api/proveedores`); // Asegúrate de que esta ruta sea la correcta
          this.proveedores = response.data;
        } catch (error) {
          console.error('Error al obtener proveedores:', error);
        }
      },

      verDetalles(proveedor) {
        // Función para ver los detalles del proveedor, puedes redirigir o abrir un modal
        console.log(proveedor);
      },
      async eliminarProveedor(id) {
       
        const apiUrl = import.meta.env.VITE_APP_API_URL;

        try {
          await axios.delete(`${apiUrl}/api/proveedores/${id}`); // Ruta para eliminar proveedor
          this.obtenerProveedores(); // Actualizamos la lista de proveedores
        } catch (error) {
          console.error('Error al eliminar proveedor:', error);
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
  