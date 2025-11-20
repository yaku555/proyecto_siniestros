// src/pages/RegistrarSin.jsx
import { useState } from "react";
import { crearSiniestro } from "../api/siniestro"; // Importa la función registrarSiniestro

export default function RegistrarSin() {
  const [formData, setFormData] = useState({
    idSiniestro: "",
    poliza: "",
    rut: "",
    direccionSin: "",
    comunaSin: "",
    idTaller: "",
    idGrua: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await crearSiniestro(formData); // Llama a la función para registrar el siniestro
      alert("Siniestro registrado con éxito.");
      setFormData({}); // Limpia el formulario después de agregar
    } catch (err) {
      console.error(err);
      alert("Error al registrar el siniestro.");
    }
  };

  return (
    <main>
      <h1>Registrar Siniestro</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="idSiniestro">ID Siniestro</label>
        <input
          type="text"
          id="idSiniestro"
          name="idSiniestro"
          value={formData.idSiniestro}
          onChange={handleChange}
        />
        {/* Agrega los otros campos del formulario de manera similar */}
        <button type="submit">Registrar</button>
      </form>
    </main>
  );
}
