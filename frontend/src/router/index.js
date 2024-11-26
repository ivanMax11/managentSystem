import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

import DashboardView from '../views/DashboardView.vue';
import StockView from '../views/StockView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import AddProduCtoForm from '../components/AddProductForm.vue';
import VentaForm from '../components/VentaForm.vue';
import PresupuestoForm from '../components/PresupuestoForm.vue';
import InventoryView from '../views/InventoryView.vue';
import InventoryList from '../components/InventoryList.vue';
import StockDashboardView from '../views/StockDashboardView.vue';
import HistorialVentas from '../components/HistorialVentas.vue';
import ClientesView from '../views/ClientesView.vue';
import ProveedoresView from '../views/ProveedoresView.vue';
import AddInventory from '../components/AddInventory.vue';

// Importa el componente de login
import LoginComponent from '../components/LoginComponent.vue';
import RegisterComponent from '../components/RegisterComponent.vue';


const routes = [
  {
    path: '/',
    component: DashboardView,
    name: 'Dashboard',
    meta: { requiresAuth: true }, // Proteger esta ruta
  },
  { path: '/stock-dashboard', component: StockDashboardView, name: 'StockDashboardView' },
  { path: '/stock', component: StockView, name: 'Stock' },
  { path: '/add-stock', component: AddProduCtoForm, name: 'AddStock' },
  { path: '/product/:id', component: ProductDetailView, name: 'ProductDetail' },
  { path: '/add-inventory', component: AddInventory, name: 'AddInventory' },
  { path: '/venta', component: VentaForm, name: 'VentaForm' },
  { path: '/presupuestos', component: PresupuestoForm, name: 'PresupuestosForm'},
  { path: '/clientes', component: ClientesView, name: 'Clientes' },
  { path: '/inventory', component: InventoryView, name: 'Inventory' },
  { path: '/inventory-list', component: InventoryList, name: 'InventoryList' },
  { path: '/historial', component: HistorialVentas, name: 'HistorialVentas' },
  { path: '/proveedores', component: ProveedoresView, name: 'Proveedores' },

  // Ruta para login
  { path: '/login', component: LoginComponent, name: 'Login' },
  { path: '/Register', component: RegisterComponent, name: 'Register'},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = store.getters.isAuthenticated;

  console.log(`Navegando a: ${to.name}, Autenticado: ${isAuth}`);

  if (to.meta.requiresAuth && !isAuth) {
    console.log('Redirigiendo a Login');
    next({ name: 'Login' });
  } else if (to.name === 'Login' && isAuth) {
    console.log('Ya autenticado, redirigiendo al Dashboard');
    next({ name: 'Dashboard' });
  } else {
    console.log('Navegación permitida');
    next();
  }
});



export default router;