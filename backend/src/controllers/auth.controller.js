// controllers/auth.controller.js
const Usuario = require('../models/Usuario');
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Ajusta esta clave a algo que tengas en tus variables de entorno
const JWT_SECRET = process.env.JWT_SECRET || 'clave_super_secreta';

// SIN bcrypt, comparación directa
const login = async (req, res) => {
  try {
    const { rut, password } = req.body;

    if (!rut || !password) {
      return res.status(400).json({ message: 'RUT y contraseña son obligatorios' });
    }

    const usuario = await Usuario.findOne({ rut });

    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Comparación simple (porque en la BD está en texto plano)
    if (usuario.password !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Si quieres seguir usando jsonwebtoken, esto puede quedarse igual:
    const token = jwt.sign(
      { id: usuario._id, rut: usuario.rut, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    const usuarioSinPassword = usuario.toObject();
    delete usuarioSinPassword.password;

    res.json({ user: usuarioSinPassword, token });

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error en el servidor al hacer login' });
  }
};


module.exports = { login };
