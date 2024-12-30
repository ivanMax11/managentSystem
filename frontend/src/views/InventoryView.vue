<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Gestión de Inventario</h1>
    <div class="row">

      <!-- Tarjeta para Agregar Productos -->
      <div class="col-md-6 mb-4">
        <div class="card" style="cursor: pointer;" @click="goToAddInventory">
          <div class="card-body d-flex align-items-center justify-content-start text-start">
            <i class="bi bi-plus-circle fs-2 me-3"></i> <!-- Icono de añadir inventario -->

            <div>
              <h5 class="card-title">Añadir items al inventario</h5>
              <p class="card-text">Administra tu inventario.</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Tarjeta para Ver la Lista del Inventario -->
      <div class="col-md-6 mb-4">
        <div class="card" style="cursor: pointer;" @click="goToInventoryList">
          <div class="card-body d-flex align-items-center justify-content-start text-start">
            <i class="bi bi-list-ul fs-2 me-3"></i> <!-- Icono de lista de inventario -->

            <div>
              <h5 class="card-title">Tu inventario del Negocio</h5>
              <p class="card-text">Consulta y gestiona tu inventario.</p>
            </div>
          </div>
        </div>
      </div>

      
    </div>

    <!-- Rutas para los componentes -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "InventoryView",
  methods: {
    goToInventoryList() {
      this.$router.push({ name: "InventoryList" });
    },
    goToAddInventory() {
      this.$router.push({ name: "AddInventory" });
    },
  },
};
</script>

<style scoped>

h1 {
  color: #fff;
}

.card {
  background-color: #45469f;
  color: #fff;
  border-radius: 10px;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  font-size: 1.5rem;
}
</style>
