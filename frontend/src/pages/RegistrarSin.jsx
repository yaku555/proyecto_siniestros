// src/pages/RegistrarSin.jsx
import { useState } from "react";
import { crearDenuncio } from "../api/denuncio"; // Función para registrar siniestro

const initialFormData = {
  poliza: "",
  rut: "",
  direccionSin: "",
  comunaSin: "",
  detalles: "",
};

export default function RegistrarSin() {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Datos del formulario:", formData); // Verifica los datos antes de enviarlos

    try {
      const result = await crearDenuncio(formData); // Enviamos todos los datos al backend
      console.log("Respuesta backend:", result); // Muestra la respuesta del backend

      alert("Denuncio registrado con éxito.");
      setFormData(initialFormData); // Resetea el formulario
    } catch (err) {
      console.error("Error al registrar el denuncio:", err); // Muestra el error completo
      alert("Error al registrar el denuncio.");
    }
  };

  return (
    <main>
      <h1>Registrar Denuncio</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="poliza">Póliza</label>
          <input
            type="text"
            id="poliza"
            name="poliza"
            value={formData.poliza}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="rut">RUT Asegurado</label>
          <input
            type="text"
            id="rut"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="direccionSin">Dirección del siniestro</label>
          <input
            type="text"
            id="direccionSin"
            name="direccionSin"
            value={formData.direccionSin}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="comunaSin">Comuna del siniestro</label>
          <input
            type="text"
            id="comunaSin"
            name="comunaSin"
            value={formData.comunaSin}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="detalles">Detalles del siniestro</label>
          <input
            type="text"
            id="detalles"
            name="detalles"
            value={formData.detalles}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Registrar</button>
      </form>
    </main>
  );
}
