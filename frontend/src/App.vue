<template>
  <div id="app" class="d-flex flex-column" style="min-height: 100vh;">
    <HeaderComponent />
    <div class="container-fluid flex-grow-1">
      <router-view />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent
  }
};
</script>

<style>
/* Estilo global para la impresión */
@media print {
  nav, header {
    display: none !important;
  }
}

#app {
  background-color: #444;
  width: 100%;
  min-height: 100vh;  /* Asegura que el contenedor ocupe al menos toda la altura de la pantalla */
}

body {
  margin: 0;
  padding: 0;
}


</style>
