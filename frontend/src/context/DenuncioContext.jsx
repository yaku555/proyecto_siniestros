import { createContext, useState, useContext, useEffect } from "react";
import { getDenuncios, crearDenuncio, actualizarDenuncio, borrarDenuncio } from "../api/denuncio"; // Asegúrate de que la ruta esté correcta

const DenuncioContext = createContext();

export function useDenuncios() {
  return useContext(DenuncioContext); // Hook para acceder al contexto
}

export function DenuncioProvider({ children }) {
  const [denuncios, setDenuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDenuncios = async () => {
      try {
        const res = await getDenuncios();
        if (!res || res.data.length === 0) {
          setError("No se encontraron siniestros.");
          return;
        }
        setDenuncios(res.data); // Actualiza el estado de los siniestros
      } catch (err) {
        console.error(err);
        setError("Error al cargar los siniestros.");
      } finally {
        setLoading(false);
      }
    };

    fetchDenuncios();
  }, []);

  // Función para agregar un siniestro
  const agregarDenuncioContext = async (nuevoDenuncio) => {
    try {
      const res = await crearDenuncio(nuevoDenuncio);
      if (res) {
        setDenuncios((prevDenuncios) => [...prevDenuncios, res]); // Actualiza el estado con el nuevo siniestro
      }
    } catch (err) {
      console.error(err);
      setError("Error al agregar el siniestro.");
    }
  };

  // Función para actualizar el estado del denuncio
  const actualizarEstadoDenuncioContext = async (idDenuncio, nuevoEstado) => {
    try {
      const res = await actualizarDenuncio(idDenuncio, nuevoEstado);
      if (res) {
        // Actualiza el estado en el contexto
        setDenuncios((prevDenuncios) =>
          prevDenuncios.map((denuncio) =>
            denuncio.idDenuncio === idDenuncio
              ? { ...denuncio, estadoDenuncio: nuevoEstado }
              : denuncio
          )
        );
      }
    } catch (err) {
      console.error(err);
      setError("Error al actualizar el estado del denuncio.");
    }
  };

  // Función para borrar un denuncio
  const borrarDenuncioContext = async (idDenuncio) => {
    try {
      const res = await borrarDenuncio(idDenuncio);
      if (res) {
        setDenuncios((prevDenuncios) =>
          prevDenuncios.filter((denuncio) => denuncio.idDenuncio !== idDenuncio)
        ); // Elimina el denuncio de la lista local
      }
    } catch (err) {
      console.error(err);
      setError("Error al borrar el denuncio.");
    }
  };

  return (
    <DenuncioContext.Provider value={{
      denuncios,
      loading,
      error,
      agregarDenuncio: agregarDenuncioContext,
      actualizarEstadoDenuncio: actualizarEstadoDenuncioContext,
      borrarDenuncio: borrarDenuncioContext
    }}>
      {children}
    </DenuncioContext.Provider>
  );
}
