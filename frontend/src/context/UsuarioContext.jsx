// src/context/UsuarioContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getUsuarios, actualizarUsuario, borrarUsuario } from '../api/usuario';  // Asegúrate de importar las nuevas funciones

const UsuarioContext = createContext(null);

export function useUsuarios() {
  return useContext(UsuarioContext);
}

export function UsuarioProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();  // Llamamos a la API para obtener los usuarios
        setUsuarios(data);
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
        setError("Hubo un problema al obtener los usuarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  // Función para actualizar un usuario
const actualizarUsuarioContext = async (rut, updatedUser) => {
  try {
    const updated = await actualizarUsuario(rut, updatedUser);
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario) =>
        usuario.rut === rut ? { ...usuario, ...updatedUser } : usuario
      )
    );
  } catch (err) {
    console.error('Error al actualizar el usuario:', err);
    setError("Error al actualizar el usuario.");
  }
};

  // Función para borrar un denuncio
  const borrarUsuarioContext = async (rut) => {
    try {
      const res = await borrarUsuario(rut);
      if (res) {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.rut !== rut)
        ); // Elimina el denuncio de la lista local
      }
    } catch (err) {
      console.error(err);
      setError("Error al borrar el denuncio.");
    }
  };

  return (
    <UsuarioContext.Provider value={{
      usuarios,
      loading,
      error,
      actualizarUsuario: actualizarUsuarioContext,
      borrarUsuario: borrarUsuarioContext
    }}>
      {children}
    </UsuarioContext.Provider>
  );
}
