<template>
  <footer class="app-footer text-white text-center py-3">
    <small>Desarrollado por <strong>MonteStack</strong> © 2024</small>
    
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
/* El footer tiene que ocupar todo el ancho y estar pegado al fondo */
.app-footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0.5rem;
  background-color: #26207c;  /* Color de fondo del footer */
  text-align: center;
  color: white;
}
</style>
