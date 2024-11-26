<template>
  <div class="dashboard-container mt-5">
    <div class="row">
      <!-- Tarjeta para Incrementar Stock -->
      <div class="col-md-6 mb-4">
        <div class="card" style="cursor: pointer;" @click="goToAddProductForm">
          <div class="card-body d-flex align-items-center justify-content-start text-start">
            <i class="bi bi-plus-circle fs-2 me-3"></i> <!-- Icono para agregar stock -->
            <div>
              <h5 class="card-title">Incrementar Stock</h5>
              <p class="card-text">Añade productos o incrementa el stock existente.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta para Listado de Stock -->
      <div class="col-md-6 mb-4">
        <div class="card" style="cursor: pointer;" @click="goToStock">
          <div class="card-body d-flex align-items-center justify-content-start text-start">
            <i class="bi bi-list-ul fs-2 me-3"></i> <!-- Icono de lista de stock -->
            <div>
              <h5 class="card-title">Lista de Stock</h5>
              <p class="card-text">Consulta y administra el listado de productos en stock.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockDashboardView',
  methods: {
    // Método para navegar al formulario de agregar stock
    goToAddProductForm() {
      this.$router.push('/add-stock'); // Definir la ruta a la vista de agregar stock
    },
    // Método para navegar al listado de inventario
    goToStock() {
      this.$router.push('/stock'); // Definir la ruta a la vista del listado de inventario
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.card {
  background-color: #45469f;
  color: #fff;
}

.card:hover {
  transform: translateY(-10px);
  /* Hace que las tarjetas se eleven ligeramente al pasar el mouse */
}
</style>
