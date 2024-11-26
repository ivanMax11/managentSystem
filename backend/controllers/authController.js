const User = require('../models/Usuario');
const jwt = require('jsonwebtoken');


// Registrar usuario
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear y guardar el nuevo usuario
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};

// Iniciar sesión
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Intentando iniciar sesión con email:", email);

    // Buscar al usuario en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      console.error("Usuario no encontrado:", email);
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    console.log("Usuario encontrado:", user);

    // Verificar la contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.error("Contraseña incorrecta para el usuario:", email);
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    console.log("Contraseña verificada para el usuario:", email);

    // Generar el token JWT
    const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
    console.log("Token generado:", token);

    res.json({ token, user: { email: user.email, id: user._id } });
  } catch (error) {
    console.error("Error en loginUser:", error.message);
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};


