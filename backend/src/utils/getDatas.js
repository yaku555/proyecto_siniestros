const getUsuarioData = (body) => {
  const { nombre, apellido, rut, telefono, email, comuna, licencia, tipo_usuario } = body;
  return { nombre, apellido, rut, telefono, email, comuna, licencia, tipo_usuario };
};

const getVehiculoData = (body) => {
  const { poliza, patente, marca, modelo, anio } = body;
  return { poliza, patente, marca, modelo, anio };
};

const getDenuncioData = (body) => {
  const { poliza, rut, direccionSin, comunaSin, detalles, estadoDenuncio } = body;
  return { poliza, rut, direccionSin, comunaSin, detalles, estadoDenuncio  };
};


// Función para extraer los datos de un siniestro desde el cuerpo de la solicitud (body).
const getSiniestroData = (body) => {
    // Se desestructuran las propiedades relevantes del objeto 'body' para obtener los datos del siniestro.
  const { idSiniestro, poliza, rut, direccionSin, comunaSin, estadoSiniestro, idTaller, idGrua } = body;

    // Se retorna un objeto con los datos del siniestro.
  return { idSiniestro, poliza, rut, direccionSin, comunaSin, estadoSiniestro, idTaller, idGrua };
};

const getTallerData = (body) => {
  const { idTaller, telefonoTaller, direccionTaller, comunaTaller, jefeTaller } = body;
  return { idTaller, telefonoTaller, direccionTaller, comunaTaller, jefeTaller };
};

const getGruaData = (body) => {
  const { idGrua, telefonoGrua, rutGrua, idTaller, comunaGrua } = body;
  return { idGrua, telefonoGrua, rutGrua, idTaller, comunaGrua };
};
module.exports = { getUsuarioData, getVehiculoData, getDenuncioData, getSiniestroData, getTallerData, getGruaData };
