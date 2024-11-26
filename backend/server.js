const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Importar las rutas personalizadas
const routes = require('./routes');
app.use('/api', routes); // Usa las rutas con prefijo '/api'

// Configuracion de puerto y lanzamiento del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});