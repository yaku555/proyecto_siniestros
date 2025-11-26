// controllers/denuncio.controller.js
const Denuncio = require('../models/Denuncio');
const Usuario = require('../models/Usuario');  // 👈 importa el modelo Usuario
const { getDenuncioData } = require('../utils/getDatas.js');

const crearDenuncio = async (req, res) => {
  try {
    const { poliza, rut, direccionSin, comunaSin, detalles, estadoDenuncio } = req.body;

    // Obtener el último denuncio registrado (el de ID más alto)
    const ultimoDenuncio = await Denuncio.findOne().sort({ idDenuncio: -1 });

    // Generar el siguiente ID para el nuevo denuncio
    let nuevoIdDenuncio = 'D100';  // Si no hay denuncios previos, comenzamos con 'D100'
    if (ultimoDenuncio) {
      const ultimoId = ultimoDenuncio.idDenuncio;
      const numero = parseInt(ultimoId.substring(1)); // extrae el número quitando la "D"
      nuevoIdDenuncio = 'D' + (numero + 1).toString().padStart(3, '0'); // D101, D102, etc.
    }

    // Creamos un nuevo denuncio con el ID generado
    const nuevoDenuncio = new Denuncio({
      idDenuncio: nuevoIdDenuncio,
      poliza,
      rut,
      direccionSin,
      comunaSin,
      detalles,
      estadoDenuncio: estadoDenuncio || 'EN REVISIÓN',
    });

    // Guardamos el nuevo denuncio en la base de datos
    const savedDenuncio = await nuevoDenuncio.save();

    // Respondemos con el denuncio recién guardado
    res.status(201).json(savedDenuncio);
  } catch (error) {
    console.error("Error al registrar el denuncio:", error);
    res.status(500).json({ error: 'Hubo un problema al registrar el denuncio.' });
  }
};

// 👇 Nuevo getDenuncios con populate de usuario
const getDenuncios = async (req, res) => {
  try {
    const denuncios = await Denuncio.find().lean();

    console.log("🔥 Denuncios encontrados (sin populate):");
    denuncios.forEach(d => console.log(`ID: ${d.idDenuncio} - RUT: ${d.rut}`));

    const denunciosConUsuario = await Denuncio.find().populate('usuario').lean();

    console.log("🟦 Resultado de populate:");
    denunciosConUsuario.forEach(d => {
      console.log(`\nDenuncio ${d.idDenuncio}`);
      console.log("RUT:", d.rut);
      console.log("Usuario encontrado:", d.usuario);
    });

    res.json(denunciosConUsuario);
  } catch (error) {
    console.error("Error al obtener los denuncios:", error);
    res.status(500).json({ error: 'Hubo un problema al obtener los denuncios.' });
  }
};


// El resto de los métodos CRUD siguen usando baseCrud
const {
  update: actualizarDenuncio,
  getById: getDenuncioPorId,
  remove: borrarDenuncio
} = require('./baseCrud.controller')(Denuncio, getDenuncioData, 'idDenuncio', 'idDenuncio');

module.exports = {
  getDenuncios,
  crearDenuncio,
  getDenuncioPorId,
  actualizarDenuncio,
  borrarDenuncio,
};
