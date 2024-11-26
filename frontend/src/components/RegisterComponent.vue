<template>
    <div class="register-container">
      <h2>Regístrate</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input type="email" v-model="email" id="email" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" v-model="password" id="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Registrar</button>
      </form>
      <p>¿Ya tienes cuenta? <router-link to="/login">Inicia sesión aquí</router-link></p>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'RegisterComponent',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      ...mapActions('auth', ['register']),
      async register() {
        try {
          await this.register({ email: this.email, password: this.password });
          alert('Registro exitoso. Ahora puedes iniciar sesión.');
          this.$router.push('/login');
        } catch (error) {
          alert('Error al registrar. Intenta nuevamente.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  </style>
  