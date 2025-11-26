// src/pages/Perfil.jsx
import { useAuth } from "../context/AuthContext"; // Usamos el contexto de autenticación
import { useNavigate } from "react-router-dom"; // Para redirigir a otras rutas después de hacer logout
import '../styles/perfil.css'; // Importamos estilos específicos para el perfil

export default function Perfil() {
  const { usuario, siniestros, logout } = useAuth(); // Accedemos a los datos del usuario y los siniestros
  const navigate = useNavigate(); // Para redirigir después de logout

  const handleLogout = () => {
    logout(); // Cerrar sesión
    navigate("/login"); // Redirige al login después de cerrar sesión
  };

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h1 className="perfil-title">Perfil de {usuario?.nombre}</h1>

        {/* Datos del usuario */}
        <div className="perfil-info">
          <p><strong>Nombre:</strong> {usuario?.nombre} {usuario?.apellido}</p>
          <p><strong>Email:</strong> {usuario?.email}</p>
          <p><strong>Telefono:</strong> +56 {usuario?.telefono}</p>
          <p><strong>RUT:</strong> {usuario?.rut}</p>
          <p><strong>Comuna:</strong> {usuario?.comuna}</p>
        </div>

        {/* Botón de logout */}
        <div className="logout-btn-container">
          <button onClick={handleLogout} className="btn logout-btn">Cerrar sesión</button>
        </div>
      </div>

      {/* Siniestros del usuario */}
      <div className="perfil-siniestros-section">
        <h2 className="section-title"> <center>Siniestros</center></h2>
        {siniestros.length === 0 ? (
          <p className="no-siniestros">No tienes siniestros registrados.</p>
        ) : (
          <div className="perfil-siniestros-list">
            {siniestros.map((siniestro) => (
              <div key={siniestro.idSiniestro} className="perfil-siniestro-card">
                <p><strong>Poliza:</strong> {siniestro.poliza}</p>
                <p><strong>Estado:</strong> {siniestro.estadoSiniestro}</p>
                <p><strong>Dirección:</strong> {siniestro.direccionSin}, {siniestro.comunaSin}</p>
                 <p><strong>Fecha: </strong> {new Date(siniestro.createdAt).toLocaleDateString('es-CL')}</p>
                 <p><strong>Taller:</strong> {siniestro.idTaller}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
