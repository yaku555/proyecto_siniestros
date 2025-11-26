import axios from './axios';


// Crear / registrar un nuevo usuario
export const crearUsuario = (nuevoUsuario) => {
  return axios
    .post('/usuarios', nuevoUsuario)
    .then((response) => {
      console.log('Usuario creado:', response.data);
      return response.data;
    })
    .catch((error) => {
      console.error('Error al crear usuario:', error);
      console.error('Respuesta del servidor:', error.response?.data);
      throw error;
    });
};

// Login de usuario
// Ajusta la ruta /auth/login si tu backend usa otra (por ejemplo /usuarios/login)
export const loginUsuario = (credenciales) => {
  return axios
    .post('/auth/login', credenciales)
    .then((response) => {
      console.log('Login OK:', response.data);
      return response.data; // idealmente { user, token }
    })
    .catch((error) => {
      console.error('Error al hacer login:', error);
      console.error('Respuesta del servidor:', error.response?.data);
      throw error;
    });
};

// Obtener todos los usuarios
export const getUsuarios = () => {
  return axios.get('/usuarios')
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    });
};


// Función para actualizar un usuario
export const actualizarUsuario = (rut, updatedUser) => {
  return axios.put(`/usuarios/${rut}`, updatedUser)
    .then((response) => response.data)  // Retorna la respuesta
    .catch((error) => {
      console.error('Error al actualizar el usuario:', error);
      throw error;  // Asegúrate de lanzar el error correctamente
    });
};
// Función para eliminar un usuario
export const borrarUsuario = (rut) => {
  return axios.delete(`/usuarios/${rut}`)  // Asegúrate de que la ruta sea correcta
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error al eliminar el usuario:', error);
      throw error;
    });
};