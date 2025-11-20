import { createContext, useState, useContext, useEffect } from "react";
import { getSiniestros, crearSiniestro } from "../api/siniestro"; // Asegúrate de que la ruta esté correcta

const SiniestroContext = createContext();

export function useSiniestros() {
  return useContext(SiniestroContext); // Hook para acceder al contexto
}

export function SiniestroProvider({ children }) {
  const [siniestros, setSiniestros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSiniestros = async () => {
      try {
        const res = await getSiniestros();
        if (!res || res.data.length === 0) {
          setError("No se encontraron siniestros.");
          return;
        }
        setSiniestros(res.data); // Actualiza el estado de los siniestros
      } catch (err) {
        console.error(err);
        setError("Error al cargar los siniestros.");
      } finally {
        setLoading(false);
      }
    };

    fetchSiniestros();
  }, []);

  // Función para agregar un siniestro
  const agregarSiniestroContext = async (nuevoSiniestro) => {
    try {
      const res = await crearSiniestro(nuevoSiniestro);
      if (res) {
        setSiniestros((prevSiniestros) => [...prevSiniestros, res]); // Actualiza el estado con el nuevo siniestro
      }
    } catch (err) {
      console.error(err);
      setError("Error al agregar el siniestro.");
    }
  };

  return (
    <SiniestroContext.Provider value={{ siniestros, loading, error, agregarSiniestro: agregarSiniestroContext }}>
      {children}
    </SiniestroContext.Provider>
  );
}
