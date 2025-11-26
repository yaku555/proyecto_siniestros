import { useSiniestros } from "../context/SiniestroContext"; // Importa el hook
import { useState } from "react"; // Importa useState para manejar el estado del modal
import '../styles/gestion.css'; // Asegúrate de tener los estilos necesarios

export default function GestionarSin() {
  const { siniestros, loading, error, actualizarSiniestro } = useSiniestros(); // Accede al estado global de los siniestros

  // Estado para el modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    taller: "",
    grua: "",
    estado: "",
    direccionSin: "",
    comunaSin: "",
  });
  const [modalId, setModalId] = useState(null);

  // Estado para los filtros
  const [filtros, setFiltros] = useState({
    idSiniestro: "",
    comuna: "",
    taller: "",
    estado: "",
  });

  // Función para abrir el modal y precargar los datos del siniestro
  const openModal = (siniestro) => {
    setModalForm({
      taller: siniestro.idTaller || "",
      grua: siniestro.idGrua || "",
      estado: siniestro.estadoSiniestro || "",
      direccionSin: siniestro.direccionSin || "",
      comunaSin: siniestro.comunaSin || "",
    });
    setModalId(siniestro.idSiniestro);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalId(null);
    setModalForm({
      taller: "",
      grua: "",
      estado: "",
      direccionSin: "",
      comunaSin: "",
    });
  };

  // Función para manejar el envío del formulario del modal
  const handleModalSubmit = (e) => {
    e.preventDefault();
    const updatedSiniestro = {
      idSiniestro: modalId,
      idTaller: modalForm.taller,
      idGrua: modalForm.grua,
      estadoSiniestro: modalForm.estado,
      direccionSin: modalForm.direccionSin,
      comunaSin: modalForm.comunaSin,
    };

    actualizarSiniestro(modalId, updatedSiniestro);
    closeModal();
  };

  // Función para manejar los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filtrar siniestros
  const filteredSiniestros = siniestros.filter((s) => {
    return (
      (filtros.idSiniestro ? s.idSiniestro.toLowerCase().includes(filtros.idSiniestro.toLowerCase()) : true) &&
      (filtros.comuna ? s.comunaSin.toLowerCase().includes(filtros.comuna.toLowerCase()) : true) &&
      (filtros.taller ? s.idTaller.toLowerCase().includes(filtros.taller.toLowerCase()) : true) &&
      (filtros.estado ? s.estadoSiniestro.toLowerCase().includes(filtros.estado.toLowerCase()) : true)
    );
  });

  // Restablecer filtros
  const resetFilters = () => {
    setFiltros({
      idSiniestro: "",
      comuna: "",
      taller: "",
      estado: "",
    });
  };

  // Función para obtener el color de la tarjeta según el estado
  const getCardColor = (estado) => {
    switch (estado) {
      case 'INGRESADO':
        return '#70a766ff';
      case 'EN EVALUACIÓN':
        return '#C0D900';
      case 'EN REPARACIÓN':
        return '#009CD9';
      case 'RETRASADO':
        return '#D94800';
      case 'REINGRESADO':
        return '#1200D9';
      case 'FINALIZADO':
        return '#00D904';
      case 'ENTREGADO':
        return '#D2D900';
      default:
        return '#999999';
    }
  };

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
    <main className="contenedor-principal">
      {/* Panel de filtros a la derecha */}
      <div className="seccion-extra">
        <h2>Filtros</h2>
        <div className="filtro">
          <label htmlFor="idSiniestro">ID Siniestro</label>
          <input
            type="text"
            name="idSiniestro"
            value={filtros.idSiniestro}
            onChange={handleFilterChange}
            placeholder="Buscar por ID"
          />
        </div>
        <div className="filtro">
          <label htmlFor="comuna">Comuna</label>
          <input
            type="text"
            name="comuna"
            value={filtros.comuna}
            onChange={handleFilterChange}
            placeholder="Buscar por Comuna"
          />
        </div>
        <div className="filtro">
          <label htmlFor="taller">ID Taller</label>
          <input
            type="text"
            name="taller"
            value={filtros.taller}
            onChange={handleFilterChange}
            placeholder="Buscar por Taller"
          />
        </div>
        <div className="filtro">
          <label htmlFor="estado">Estado</label>
          <input
            type="text"
            name="estado"
            value={filtros.estado}
            onChange={handleFilterChange}
            placeholder="Buscar por Estado"
          />
        </div>
        <button className="btn" onClick={resetFilters}>Restablecer</button>
      </div>

      {/* Lista de siniestros filtrados */}
      <div className="seccion_siniestros">
        {filteredSiniestros.length === 0 ? (
          <p>No hay siniestros registrados.</p>
        ) : (
          filteredSiniestros.map((s) => (
            <div
              className="siniestro-card"
              key={s.idSiniestro || s._id}
              style={{
                borderLeft: `5px solid ${getCardColor(s.estadoSiniestro)}`,
              }}
            >
              <div className="card-header">
                <h2>#{s.idSiniestro}</h2>
                <span
                  className="estado-badge"
                  style={{
                    backgroundColor: getCardColor(s.estadoSiniestro),
                    color: "#fff",
                  }}
                  aria-label={s.estadoSiniestro}
                  title={s.estadoSiniestro}
                >
                  {s.estadoSiniestro.toUpperCase()}
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
                  <p><strong>ID Taller:</strong> {s.idTaller}</p>
                  <p><strong>ID Grúa:</strong> {s.idGrua}</p>
                  <p><strong>Dirección siniestro:</strong> {s.direccionSin}</p>
                  <p><strong>Comuna siniestro:</strong> {s.comunaSin}</p>
                  <p><strong>Fecha: </strong> {new Date(s.createdAt).toLocaleDateString('es-CL')}</p>
                </div>
              </div>
              <button
                className="btn"
                onClick={() => openModal(s)} // Abre el modal para editar el siniestro
              >
                GESTIONAR
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal para editar los datos del siniestro */}
      {modalOpen && (
        <div className="modal-panel">
          <div className="modal-content">
            <h2>Editar Siniestro</h2>
            <form onSubmit={handleModalSubmit}>
              <div className="form-group">
                <label htmlFor="taller">ID Taller</label>
                <input
                  type="text"
                  id="taller"
                  value={modalForm.taller}
                  onChange={(e) => setModalForm({ ...modalForm, taller: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="grua">ID Grúa</label>
                <input
                  type="text"
                  id="grua"
                  value={modalForm.grua}
                  onChange={(e) => setModalForm({ ...modalForm, grua: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  value={modalForm.estado}
                  onChange={(e) => setModalForm({ ...modalForm, estado: e.target.value })}
                  required
                >
                  <option value="INGRESADO">INGRESADO</option>
                  <option value="EN EVALUACIÓN">EN EVALUACIÓN</option>
                  <option value="EN REPARACIÓN">EN REPARACIÓN</option>
                  <option value="RETRASADO">RETRASADO</option>
                  <option value="REINGRESADO">REINGRESADO</option>
                  <option value="FINALIZADO">FINALIZADO</option>
                  <option value="ENTREGADO">ENTREGADO</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="direccionSin">Dirección del Siniestro</label>
                <input
                  type="text"
                  id="direccionSin"
                  value={modalForm.direccionSin}
                  onChange={(e) => setModalForm({ ...modalForm, direccionSin: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="comunaSin">Comuna del Siniestro</label>
                <input
                  type="text"
                  id="comunaSin"
                  value={modalForm.comunaSin}
                  onChange={(e) => setModalForm({ ...modalForm, comunaSin: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn">Guardar cambios</button>
              <button type="button" className="btn" onClick={closeModal}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
