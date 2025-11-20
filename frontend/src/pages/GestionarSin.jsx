// src/pages/GestionarSin.jsx
import { useSiniestros } from "../context/SiniestroContext"; // Importa el hook

import '../styles/gestion.css'; // Asegúrate de tener los estilos necesarios

export default function GestionarSin() {
  const { siniestros, loading, error } = useSiniestros(); // Accede al estado global de los siniestros

  if (loading) {
    return (
      <main>
        <h1>Gestionar siniestros</h1>
        <p>Cargando siniestros...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>Gestionar siniestros</h1>
        <p style={{ color: "red" }}>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Gestionar siniestros</h1>

      {siniestros.length === 0 ? (
        <p>No hay siniestros registrados.</p>
      ) : (
        <div className="contenedor-principal">
          {siniestros.map((s) => (
            <div
              className="siniestro-card"
              key={s.idSiniestro || s._id}
              style={{ borderLeft: `5px solid #999999` }} // Color gris por defecto
            >
              <div className="card-header">
                <h2>#{s.idSiniestro}</h2>
                <span
                  className="estado-badge"
                  style={{ backgroundColor: "#999999", color: "#fff" }} // Color gris por defecto
                  aria-label={s.estadoSiniestro}
                  title={s.estadoSiniestro}
                >
                  {s.estadoSiniestro.toUpperCase()}
                </span>
              </div>

              <div className="card-details">
                <div>
                  <p><strong>Póliza:</strong> {s.poliza}</p>
                  <p><strong>RUT:</strong> {s.rut}</p>
                  <p><strong>Dirección siniestro:</strong> {s.direccionSin}</p>
                  <p><strong>Comuna siniestro:</strong> {s.comunaSin}</p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p><strong>ID Taller:</strong> {s.idTaller}</p>
                  <p><strong>ID Grúa:</strong> {s.idGrua}</p>
                </div>
              </div>
              <button className="btn" onClick={() => alert("Gestionar siniestro (sin funcionalidad por ahora)")}>
                GESTIONAR
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
