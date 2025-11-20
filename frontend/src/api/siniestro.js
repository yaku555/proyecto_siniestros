// src/api/siniestro.js
import axios from './axios';

// Función para obtener todos los siniestros
export const getSiniestros = () => {
  return axios.get('/siniestros').then(response => {
    console.log('Siniestros obtenidos:', response.data);  // Log de la respuesta
    return response;
  }).catch(error => {
    console.error('Error al obtener los siniestros:', error);
  });
};

// Función para registrar un nuevo siniestro
export const crearSiniestro = (nuevoSiniestro) => {
  return axios.post('/siniestros', nuevoSiniestro)
    .then(response => {
      console.log('Siniestro registrado:', response.data);  // Log de la respuesta
      return response.data;  // Devuelve los datos del siniestro registrado
    })
    .catch(error => {
      console.error('Error al registrar el siniestro:', error);
      throw error;  // Lanza el error para manejarlo en otro lugar si es necesario
    });
};
