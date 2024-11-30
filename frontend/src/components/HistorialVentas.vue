<template>
  <div>
    <h2>Historial de Ventas</h2>
    <div class="row mb-3">
      <div class="col-md-6">
        <label for="fechaInicio" class="form-label">Fecha de inicio</label>
        <input v-model="fechaInicio" type="date" class="form-control" id="fechaInicio" @change="cargarVentas" />
      </div>

      <div class="col-md-6">
        <label for="fechaFin" class="form-label">Fecha de fin</label>
        <input v-model="fechaFin" type="date" class="form-control" id="fechaFin" @change="cargarVentas" />
      </div>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Cliente</th>
          <th>CUIT</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="venta in ventas" :key="venta._id">
          <td>{{ new Date(venta.fecha).toLocaleDateString() }}</td>
          <td>
            
              <div v-for="producto in venta.productos" :key="producto.nombre">
                {{ producto.nombre || 'Producto no especificado' }}
              </div>
            
          </td>
          <td>
            
              <div v-for="producto in venta.productos" :key="producto.cantidad">
                {{ producto.cantidad || 0 }}
              </div>
            
          </td>
          <td>{{ venta.cliente || 'Cliente no especificado' }}</td>
          <td>{{ venta.cuit || 'CUIT no disponible' }}</td>
          <td>{{ venta.email || 'Email no disponible' }}</td>
          <td>{{ venta.telefono || 'Teléfono no disponible' }}</td>
          <td>${{ venta.total || 0 }}</td>
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
      ventas: [],
      fechaInicio: '',
      fechaFin: '',
    };
  },
  created() {
    this.cargarVentas(); // Cargar ventas al inicio si ya hay datos predefinidos de fecha
  },
  
  methods: {
    async cargarVentas() {
      const apiUrl = process.env.VUE_APP_API_URL;

      try {
        const response = await axios.get(`${apiUrl}/api/ventas/ventas`, {
          params: {
            startDate: this.fechaInicio,
            endDate: this.fechaFin,
          },
        });
        this.ventas = response.data;
      } catch (error) {
        alert('Error al cargar el historial de ventas');
      }
    },
  },
};
</script>


<style scoped>
table {
  margin-bottom: 100px;
}

h2 {
  color: #fff;
  text-align: center;
}

label {
  color: #fff;
}

@media (max-width: 767px) {

  .table th,
  .table td {
    font-size: 10px;
    /* Reducir el tamaño de fuente para dispositivos pequeños */
  }

  .table td {
    padding: 8px;
    /* Reducir el padding */
  }

  .table th {
    padding: 10px;
    /* Reducir el padding en los encabezados */
  }
}
</style>