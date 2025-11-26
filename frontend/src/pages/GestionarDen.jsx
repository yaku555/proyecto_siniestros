import { useDenuncios } from "../context/DenuncioContext"; // Importa el hook
import { useSiniestros } from "../context/SiniestroContext"; // Importa el hook de Siniestro
import { useState } from "react"; // Importa useState para manejar el estado del modal
import '../styles/gestion.css'; // Asegúrate de tener los estilos necesarios

export default function GestionarDen() {
  const { denuncios, loading, error, actualizarEstadoDenuncio, borrarDenuncio } = useDenuncios(); // Accede al estado global de los siniestros
  const { agregarSiniestro } = useSiniestros(); // Accede a la función para agregar un siniestro
  
  const [modalMessage, setModalMessage] = useState(""); // Para almacenar el mensaje del modal
  const [showModal, setShowModal] = useState(false); // Para controlar la visibilidad del modal

  // Función para obtener el color de la tarjeta según el estado
  const getCardColor = (estado) => {
    switch (estado) {
      case 'EN REVISIÓN':
        return '#999999'; // Gris
      case 'APROBADO':
        return '#4CAF50'; // Verde
      case 'RECHAZADO':
        return '#F44336'; // Rojo
      default:
        return '#999999';
    }
  };

  // Función para mostrar el modal con el mensaje
  const mostrarModal = (mensaje) => {
    setModalMessage(mensaje);
    setShowModal(true);

    // Después de 3 segundos, ocultamos el modal
    setTimeout(() => {
      setShowModal(false);
    }, 3000); // Duración total del modal (3 segundos)
  };

  const handleActualizarEstado = async (idDenuncio, nuevoEstado) => {
    // Primero, actualizamos el estado del denuncio
    await actualizarEstadoDenuncio(idDenuncio, nuevoEstado);

    // Luego, si es "APROBADO", creamos un nuevo siniestro
    if (nuevoEstado === "APROBADO") {
      const denuncioAprobado = denuncios.find((d) => d.idDenuncio === idDenuncio);

      const nuevoSiniestro = {
        idSiniestro: `S${new Date().getTime()}`, // Generamos un ID único para el siniestro
        poliza: denuncioAprobado.poliza,
        rut: denuncioAprobado.rut,
        direccionSin: denuncioAprobado.direccionSin,
        comunaSin: denuncioAprobado.comunaSin,
        estadoSiniestro: "INGRESADO", // Estado inicial del siniestro
        idTaller: "", // Puedes asignar un valor por defecto o actualizarlo más tarde
        idGrua: "", // Lo mismo con el idGrua
      };

      // Agregamos el nuevo siniestro utilizando el contexto de Siniestro
      agregarSiniestro(nuevoSiniestro);

      // Ahora eliminamos el denuncio de la base de datos
      borrarDenuncio(idDenuncio);

      // Mostramos el mensaje del modal
      mostrarModal(`Cambio de estado a ${nuevoEstado} y siniestro creado correctamente`);
    } else {
      mostrarModal(`Cambio de estado a ${nuevoEstado} realizado correctamente`);
    }
  };

  if (loading) {
    return (
      <main>
        <h1>Gestionar denuncios</h1>
        <p>Cargando denuncios...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>Gestionar denuncios</h1>
        <p style={{ color: "red" }}>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Gestionar denuncios</h1>

      {denuncios.length === 0 ? (
        <p>No hay denuncios registrados.</p>
      ) : (
        <div className="seccion_siniestros">
          {denuncios.map((s) => (
            <div
              className="siniestro-card"
              key={s.idDenuncio || s._id}
              style={{
                borderLeft: `5px solid ${getCardColor(s.estadoDenuncio)}`,
              }}
            >
              <div className="card-header">
                <h2>#{s.idDenuncio}</h2>
                <span
                  className="estado-badge"
                  style={{
                    backgroundColor: getCardColor(s.estadoDenuncio),
                    color: "#fff",
                  }}
                  aria-label={s.estadoDenuncio}
                  title={s.estadoDenuncio}
                >
                  {s.estadoDenuncio.toUpperCase()}
                </span>
              </div>

              <div className="card-details">
                <div>
                  <p><strong>Póliza:</strong> {s.poliza}</p>
                  <p><strong>Nombre:</strong> {s.usuario?.nombre} {s.usuario?.apellido}</p>
                  <p><strong>RUT:</strong> {s.rut}</p>
                  <p><strong>Teléfono:</strong>+56 {s.usuario?.telefono || "—"}</p>
                  <p><strong>Email:</strong>{s.usuario?.email || "—"}</p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p><strong>Dirección denuncio:</strong> {s.direccionSin}</p>
                  <p><strong>Comuna denuncio:</strong> {s.comunaSin}</p>
                  <p><strong>Detalles:</strong> {s.detalles}</p>
                  <p><strong>Fecha: </strong> {new Date(s.createdAt).toLocaleDateString('es-CL')}</p>
                </div>
              </div>
              <button
                className="btn"
                onClick={() => handleActualizarEstado(s.idDenuncio, 'APROBADO')}
              >
                APROBAR
              </button>
              <button
                className="btn"
                onClick={() => handleActualizarEstado(s.idDenuncio, 'RECHAZADO')}
              >
                RECHAZAR
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal para mostrar el mensaje */}
      {showModal && (
        <div className="notif">
          <img src="https://i.pinimg.com/originals/e8/06/52/e80652af2c77e3a73858e16b2ffe5f9a.gif" alt="Loading..." className="gif-progress" />
          <p>{modalMessage}</p>
        </div>
      )}
    </main>
  );
}

