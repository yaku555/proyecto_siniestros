// src/api/siniestro.js
import axios from './axios';

// Función para obtener todos los siniestros
export const getSiniestros = () => {
  return axios.get('/siniestros').then(response => {
    console.log('Siniestros obtenidos:', response.data);
    return response;
  }).catch(error => {
    console.error('Error al obtener los siniestros:', error);
  });
};

// Función para registrar un nuevo siniestro
export const crearSiniestro = (nuevoSiniestro) => {
  return axios.post('/siniestros', nuevoSiniestro)
    .then(response => {
      console.log('Siniestro registrado:', response.data);
      return response.data;  // Devuelve los datos del siniestro registrado
    })
    .catch(error => {
      console.error('Error al registrar el siniestro:', error);
      throw error;
    });
};

// Función para actualizar un siniestro
export const actualizarSiniestro = (idSiniestro, updatedData) => {
  return axios.put(`/siniestros/${idSiniestro}`, updatedData)
    .then(response => {
      console.log('Siniestro actualizado:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error al actualizar el siniestro:', error);
      throw error;
    });
};
