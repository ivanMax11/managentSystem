<template>
    <div class="container mt-4">
      <h2>Detalles del Producto</h2>
      <div v-if="product">
        <div class="row">
          <div class="col-md-6">
            <img :src="product.image" alt="Imagen del producto" class="img-fluid" />
          </div>
          <div class="col-md-6">
            <h3>{{ product.name }}</h3>
            <p><strong>Categoría:</strong> {{ product.category }}</p>
            <p><strong>Cantidad:</strong> {{ product.quantity }}</p>
            <p><strong>Precio:</strong> {{ product.price | currency }}</p>
            <p><strong>Proveedor:</strong> {{ product.supplier }}</p>
            <p><strong>Calificación:</strong> {{ product.rating }} / 5</p>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <h5>Descripción</h5>
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Cargando información del producto...</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'ProductDetailView',
    data() {
      return {
        product: null
      };
    },
    methods: {
      async loadProduct() {
  const productId = this.$route.params.id;
  
  const apiUrl = process.env.VUE_APP_API_URL; 

  try {
    const response = await axios.get(`${apiUrl}/api/products/${productId}`); // Usar la URL dinámica
    this.product = response.data;
  } catch (error) {
    console.error('Error al cargar el producto:', error);
  }
}

    },
    mounted() {
      this.loadProduct();
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para el detalle del producto */
  </style>
  