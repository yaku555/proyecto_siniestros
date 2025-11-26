import { useAuth } from "../context/AuthContext"; // Para obtener el usuario y su rol

export default function Inicio() {
  const { usuario } = useAuth(); // Obtenemos el usuario logueado y su rol

  return (
    <main>
      {usuario?.rol === "EJECUTIVO" ? (
        <>
          <h1>Bienvenido al Portal de Administración de Autex</h1>
          <p>Utiliza las opciones en el menú para gestionar los siniestros y consultar los reportes del sistema.</p>
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>Siniestros Activos</h3>
              <p>10 Siniestros pendientes de atención</p>
            </div>
            <div className="dashboard-card">
              <h3>Reparaciones en Curso</h3>
              <p>5 Reparaciones en progreso</p>
            </div>
            <div className="dashboard-card">
              <h3>Alertas de Seguimiento</h3>
              <p>3 siniestros retrasados en reparación</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Bienvenido, {usuario?.nombre} {usuario?.apellido}</h1>
          <p>Consulta y gestiona tus siniestros desde aquí.</p>
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>Siniestros Registrados</h3>
              <p>1 Siniestro pendiente de evaluación</p>
            </div>
            <div className="dashboard-card">
              <h3>Estado de Reparaciones</h3>
              <p>1 Reparación en curso</p>
            </div>
            <div className="dashboard-card">
              <h3>Historial de Siniestros</h3>
              <p>Consulta tus siniestros anteriores</p>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
