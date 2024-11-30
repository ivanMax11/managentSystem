<template>
    <div>
      <h2>Lista de Clientes</h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>CUIT</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" :key="cliente._id">
            <td>{{ cliente.nombre }}</td>
            <td>{{ cliente.cuit }}</td>
            <td>{{ cliente.email }}</td>
            <td>{{ cliente.telefono }}</td>
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
        clientes: [],
      };
    },
    created() {
      this.cargarClientes();
    },

    methods: {
      async cargarClientes() {
        const apiUrl = import.meta.env.VITE_APP_API_URL;

        try {       
          const response = await axios.get(`${apiUrl}api/clientes`);
          this.clientes = response.data;
        } catch (error) {
          alert('Error al cargar la lista de clientes');
        }
      },
    },
  };
  </script>

<style scoped> 
h2 {
  color: #fff;
  text-align: center;
}

</style>
  