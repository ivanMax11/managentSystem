<template>
  <div class="dashboard-container">
    <div class="row">
      <!-- Tarjeta de Stock -->
      <div class="col-md-6 mb-4">
        <div class="card" style="cursor: pointer;" @click="goToStockDashboardView">
          <div class="card-body d-flex align-items-center justify-content-start text-start">
            <i class="bi bi-boxes fs-2 me-3"></i> <!-- Icono de inventario -->
            <div>
              <h5 class="card-title">Stock</h5>
              <p class="card-text">Administra los productos y su stock.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta Movimiento de Stock -->
      <div class="col-md-6 mb-4">
        <div class="card" style="cursor: pointer;" @click="goToVentaForm">
          <div class="card-body d-flex align-items-center justify-content-start text-start">
            <i class="bi bi-arrow-left-right fs-2 me-3"></i> <!-- Icono de movimiento de stock -->
            <div>
              <h5 class="card-title">Seccion de Ventas</h5>
              <p class="card-text">Gestiona y administra tus ventas.</p>
            </div>
          </div>
        </div>
      </div>


      <!-- Tarjeta de Proveedores -->
      <div class="col-md-6 mb-4">
        <div class="card" style="cursor: pointer;" @click="goToProveedores">
          <div class="card-body d-flex align-items-center justify-content-start text-start">
            <i class="bi bi-person-lines-fill fs-2 me-3"></i> <!-- Icono de proveedores -->
            <div>
              <h5 class="card-title">Proveedores</h5>
              <p class="card-text">Gestiona tus proveedores de productos.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta de Clientes -->
      <div class="col-md-6 mb-4">
        <div class="card" style="cursor: pointer;" @click="goToClientes">
          <div class="card-body d-flex align-items-center justify-content-start text-start">
            <i class="bi bi-person-fill fs-2 me-3"></i> <!-- Icono de clientes -->
            <div>
              <h5 class="card-title">Clientes</h5>
              <p class="card-text">Gestiona los datos y pedidos de tus clientes.</p>
            </div>
          </div>
        </div>
      </div>


      <div class="col-md-6 mb-4">
        <div class="card" style="cursor: pointer;" @click="goToInventory">
          <div class="card-body d-flex align-items-center justify-content-start text-start">
            <i class="bi bi-box-seam fs-2 me-3"></i> <!-- Icono para Inventario -->
            <div>
              <h5 class="card-title">Inventario de Negocio</h5>
              <p class="card-text">Gestiona tus items.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Agrega más tarjetas aquí según sea necesario -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  methods: {
    // Métodos para navegar a cada vista
    goToStockDashboardView() {
      this.$router.push('/stock-dashboard');
    },
    goToVentaForm() {
      this.$router.push('/venta');
    },
    goToProveedores() {
      this.$router.push('/proveedores'); // Asegúrate de tener esta ruta configurada
    },
    goToClientes() {
      this.$router.push('/clientes'); // Asegúrate de tener esta ruta configurada
    },
   
    goToInventory() {
      this.$router.push({ name: 'Inventory' });
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  margin-top: 100px;
  /* Espacio desde el header */
}

/* Estilo de las tarjetas */
.card {
  background-color: #3b3a96; /* Azul profesional */
  color: #fff;
  width: 100%;
  /* Hace que las tarjetas sean más anchas */
  height: auto;
  /* Reduce la altura de las tarjetas */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra elegante */
  /* Agrega una sombra sutil */
  transition: transform 0.2s;
  /* Animación de hover */
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgb(0, 0, 0, 0.3);
  /* Hace que las tarjetas se eleven ligeramente al pasar el mouse */
}

.card-body {
  display: flex;
  align-items: center;
  justify-content: start;
  /* Alineación al principio */
  padding: 1rem;
  /* Ajuste del padding */
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: -20px;
  /* Levanta el texto */
}

.card-text {
  font-size: 1rem;
}

.card-body i {
  font-size: 2rem;
  /* Tamaño del icono */
  margin-right: 1rem;
  /* Ajuste de margen entre el icono y el texto */
}

.card-body div {
  display: flex;
  flex-direction: column;
  /* Alineación en columna */
  justify-content: center;
}

.col-md-4 {
  display: flex;
  justify-content: center;
}

i {
  margin-bottom: 30px;
}
</style>
