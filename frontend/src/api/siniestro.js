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