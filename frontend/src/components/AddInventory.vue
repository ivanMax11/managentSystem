<template>
  <div class="container mt-5">
    <div class="card bg-dark text-white p-4 shadow-lg">
      <h2 class="mb-4 text-center">Añadir Artículo al Inventario</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre del Artículo</label>
          <input
            type="text"
            id="nombre"
            class="form-control"
            v-model="formData.nombre"
            required
          />
        </div>

        <div class="mb-3">
          <label for="cantidad" class="form-label">Cantidad</label>
          <input
            type="number"
            id="cantidad"
            class="form-control"
            v-model.number="formData.cantidad"
            required
            min="0"
          />
        </div>

        <div class="mb-3">
          <label for="descripcion" class="form-label">Descripción</label>
          <textarea
            id="descripcion"
            class="form-control"
            v-model="formData.descripcion"
            rows="3"
            required
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="fechaAdquisicion" class="form-label">Fecha de Adquisición</label>
          <input
            type="date"
            id="fechaAdquisicion"
            class="form-control"
            v-model="formData.fechaAdquisicion"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">Añadir al Inventario</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddInventory",
  data() {
    return {
      formData: {
        nombre: "",
        cantidad: 0,
        descripcion: "",
        fechaAdquisicion: "",
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/inventario",
          this.formData
        );
        alert("Artículo añadido con éxito");
        this.resetForm();
      } catch (error) {
        console.error("Error al añadir el artículo", error);
        alert("Hubo un error al añadir el artículo");
      }
    },
    resetForm() {
      this.formData = {
        nombre: "",
        cantidad: 0,
        descripcion: "",
        fechaAdquisicion: "",
      };
    },
  },
};
</script>

<style scoped>
h2 {
  color: #fff;
}

.container {
  color: #fff;
  max-width: 600px;
  margin: 0 auto;
}

.card {
  border: none;
  border-radius: 10px;
}

.form-label {
  font-weight: bold;
  color: #ddd;
}

.form-control {
  background-color: #333;
  color: #fff; /* Cambia el color del texto en el input a blanco */
  border: 1px solid #555;
}

.form-control::placeholder {
  color: #aaa; /* Asegura que los placeholders sean distinguibles */
}

.form-control:focus {
  background-color: #444;
  color: #fff; /* Asegura que el texto siga siendo blanco al enfocar */
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

textarea.form-control {
  resize: none; /* Opcional: Evita que los usuarios cambien el tamaño del textarea */
}

.btn-primary {
  background-color: #3b3a96;
  border-color: #3b3a96;
}

.btn-primary:hover {
  background-color: #26207c;
  border-color: #26207c;
}
</style>
