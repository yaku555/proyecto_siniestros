// src/api/denuncio.js
import axios from './axios';

// Función para obtener todos los siniestros
export const getDenuncios = () => {
  return axios.get('/denuncios')
    .then(response => {
      console.log('Denuncios obtenidos:', response.data);
      return response;
    })
    .catch(error => {
      console.error('Error al obtener los siniestros:', error);
    });
};

// Función para registrar un nuevo siniestro
export const crearDenuncio = (nuevoDenuncio) => {
  return axios.post('/denuncios', nuevoDenuncio)
    .then(response => {
      console.log('Denuncio registrado:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error al registrar el denuncio:', error);
      console.error('Respuesta del servidor:', error.response?.data);
      throw error;
    });
};

// Función para actualizar el estado de un denuncio
export const actualizarDenuncio = (idDenuncio, estadoDenuncio) => {
  return axios.put(`/denuncios/${idDenuncio}`, { estadoDenuncio })
    .then(response => {
      console.log('Estado actualizado:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error al actualizar el estado del denuncio:', error);
      throw error;
    });
};

// Función para borrar un denuncio
export const borrarDenuncio = (idDenuncio) => {
  return axios.delete(`/denuncios/${idDenuncio}`)
    .then(response => {
      console.log('Denuncio borrado:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error al borrar el denuncio:', error);
      throw error;
    });
};
