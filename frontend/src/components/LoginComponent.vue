<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-4" style="width: 100%; max-width: 400px; border-radius: 1rem; background-color: #f8f9fa;">
      <div class="text-center mb-4">
        <i class="bi bi-person-circle" style="font-size: 4rem; color: #007bff;"></i>
        <h3 class="mt-3">Iniciar Sesión</h3>
        <p class="text-muted">Accede a tu cuenta</p>
      </div>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Correo Electrónico</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-envelope"></i></span>
            <input
              type="email"
              v-model="email"
              class="form-control"
              id="email"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-lock"></i></span>
            <input
              type="password"
              v-model="password"
              class="form-control"
              id="password"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
      </form>
      <div class="text-center mt-3">
        <small class="text-muted">
          ¿No tienes una cuenta? <a href="/register" class="text-primary">Regístrate aquí</a>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  
  methods: {
    ...mapActions(['login']),
    async login() {

    const apiUrl = process.env.VUE_APP_API_URL;

  try {
   
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.email, password: this.password }),
    });
    const data = await response.json();

    if (response.ok) {
      // Guarda el token en el store
      this.$store.dispatch('login', data.token);
      this.$router.push({ name: 'Dashboard' }); // Redirige al dashboard
    } else {
      alert(data.message || 'Error al iniciar sesión');
    }
  } catch (error) {
    alert('Error al conectarse al servidor');
  }
},
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
}

.card {
  border: none;
}

.card h3 {
  color: #343a40;
}

.card .btn-primary:hover {
  background-color: #0056b3;
}

.input-group-text {
  background-color: #e9ecef;
  border: none;
}

.input-group-text i {
  color: #6c757d;
}

</style>
