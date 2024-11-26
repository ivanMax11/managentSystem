import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Archivo de rutas
import store from './store'; // Archivo de Vuex
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);

// Registrar filtro global
app.config.globalProperties.$filters = {
  currency(value) {
    if (!value) return '';
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(value);
  }
};

app.use(router); // Configurar el router
app.use(store);  // Configurar Vuex

app.mount('#app'); // Montar la aplicación
