<template>
  <header>
    <nav class="navbar navbar-expand-lg  ">
      <div class="container-fluid">
        <a class="navbar-brand text-light"  href="/">Sistema de Gestión</a>
        <div>
          <router-link v-if="!isAuthenticated" to="/login" class="btn btn-primary">
            Iniciar Sesión
          </router-link>
          <button v-else @click="logout" class="btn btn-danger">Cerrar Sesión</button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['logout']),
    async logout() {
      // Ejecuta el logout de Vuex
      await this.$store.dispatch('logout');
      // Redirige a la página de login después de cerrar sesión
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #26207c;
}

.navbar-brand {
  color: white;
}

</style>