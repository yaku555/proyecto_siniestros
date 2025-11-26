// src/controllers/siniestro.controller.js
const Siniestro = require('../models/Siniestro');  // Importa el modelo de Mongoose
const { getSiniestroData } = require('../utils/getDatas.js'); // Importa la función para obtener los datos
const Usuario = require('../models/Usuario');  // 👈 importa el modelo Usuario


// Función para crear un nuevo siniestro
const crearSiniestro = async (req, res) => {
  try {
    const { poliza, rut, direccionSin, comunaSin, idTaller, idGrua, estadoSiniestro } = req.body;

    // Obtener el último siniestro registrado (el de ID más alto)
    const ultimoSiniestro = await Siniestro.findOne().sort({ idSiniestro: -1 });  // Obtiene el último siniestro por ID

    // Generar el siguiente ID para el nuevo siniestro
    let nuevoIdSiniestro = 'S001';  // Si no hay siniestros previos, comenzamos con 'S001'
    if (ultimoSiniestro) {
      const ultimoId = ultimoSiniestro.idSiniestro;  // El último ID registrado
      const numero = parseInt(ultimoId.substring(1));  // Extraemos el número del ID
      nuevoIdSiniestro = 'S' + (numero + 1).toString().padStart(3, '0');  // Generamos el siguiente ID
    }

    // Creamos un nuevo siniestro con el ID generado
    const nuevoSiniestro = new Siniestro({
      idSiniestro: nuevoIdSiniestro,
      poliza,
      rut,
      direccionSin,
      comunaSin,
      idTaller:  idTaller ||'N/A',
      idGrua: idGrua  || 'N/A',
      estadoSiniestro: estadoSiniestro || 'INGRESADO', // Si no se pasa estadoSiniestro, asignamos 'pendiente'
    });

    // Guardamos el nuevo siniestro en la base de datos
    const savedSiniestro = await nuevoSiniestro.save();

    // Respondemos con el siniestro recién guardado
    res.status(201).json(savedSiniestro);
  } catch (error) {
    console.error("Error al registrar el siniestro:", error); // Logueamos el error
    res.status(500).json({ error: 'Hubo un problema al registrar el siniestro.' });
  }
};

// 👇 Nuevo getDenuncios con populate de usuario
const getSiniestros = async (req, res) => {
  try {
    const siniestros = await Siniestro.find().lean();

    siniestros.forEach(d => console.log(`ID: ${d.idSiniestro} - RUT: ${d.rut}`));

    const siniestrosConUsuario = await Siniestro.find().populate('usuario').lean();

    console.log("🟦 Resultado de populate:");
    siniestrosConUsuario.forEach(d => {
      console.log(`\nDenuncio ${d.idSiniestro}`);
      console.log("RUT:", d.rut);
      console.log("Usuario encontrado:", d.usuario);
    });

    res.json(siniestrosConUsuario);
  } catch (error) {
    console.error("Error al obtener los denuncios:", error);
    res.status(500).json({ error: 'Hubo un problema al obtener los denuncios.' });
  }
};


// El resto de los métodos CRUD siguen igual
const {update: actualizarSiniestro, getById: getSiniestroPorId, remove: borrarSiniestro } = require('./baseCrud.controller')(Siniestro, getSiniestroData, 'idSiniestro', 'idSiniestro');

module.exports = {
  getSiniestros,
  crearSiniestro,
  getSiniestroPorId,
  actualizarSiniestro,
  borrarSiniestro,
};
