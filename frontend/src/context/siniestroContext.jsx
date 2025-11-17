// src/context/SiniestroContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getSiniestros } from '../api/siniestro';

const SiniestroContext = createContext();

export const SiniestroProvider = ({ children }) => {
  const [siniestros, setSiniestros] = useState([]);

  useEffect(() => {
    // Obtener siniestros desde el backend
    const fetchSiniestros = async () => {
      try {
        const response = await getSiniestros();
        setSiniestros(response.data);
      } catch (error) {
        console.error("Error fetching siniestros:", error);
      }
    };
    fetchSiniestros();
  }, []);

  return (
    <SiniestroContext.Provider value={{ siniestros }}>
      {children}
    </SiniestroContext.Provider>
  );
};

export default SiniestroContext;
