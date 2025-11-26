import { useState, useEffect } from "react";
import { useUsuarios } from "../context/UsuarioContext"; // Usamos el contexto de usuarios
import '../styles/adminusuarios.css'; // Importamos el CSS específico para esta página

export default function AdminUsuarios() {
  const { usuarios, loading, error, actualizarUsuario, borrarUsuario } = useUsuarios(); // Accedemos al estado global de usuarios

  // Estado para el modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    telefono: "",
    email: "",
    comuna: "",
    rol: "CLIENTE",
  });
  const [modalId, setModalId] = useState(null);

  // Función para abrir el modal y precargar los datos del usuario
  const openModal = (usuario) => {
    setModalForm({
      nombre: usuario.nombre || "",
      apellido: usuario.apellido || "",
      rut: usuario.rut || "",
      telefono: usuario.telefono || "",
      email: usuario.email || "",
      comuna: usuario.comuna || "",
      rol: usuario.rol || "CLIENTE",
    });
    setModalId(usuario.rut); // Guardamos el id del usuario
    setModalOpen(true); // Abrimos el modal
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalId(null);
    setModalForm({
      nombre: "",
      apellido: "",
      rut: "",
      telefono: "",
      email: "",
      comuna: "",
      rol: "CLIENTE",
    });
  };

  // Función para manejar el envío del formulario del modal
const handleModalSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      nombre: modalForm.nombre,
      apellido: modalForm.apellido,
      rut: modalForm.rut,
      telefono: modalForm.telefono,
      email: modalForm.email,
      comuna: modalForm.comuna,
      rol: modalForm.rol,
    };

    // Llamamos a la función para actualizar el usuario
    actualizarUsuario(modalId, updatedUser); 
    closeModal();
};

  // Función para manejar la eliminación del usuario
  const handleDelete = (rut) => {
    borrarUsuario(rut); // Llamamos a la función para eliminar el usuario
  };

  if (loading) {
    return <h1>Cargando usuarios...</h1>;
  }

  if (error) {
    return <h1 style={{ color: "red" }}>{error}</h1>;
  }

  return (
    <main className="contenedor-principal">
      {/* Lista de usuarios */}
      <div className="seccion-usuarios">
        {usuarios.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          usuarios.map((usuario) => (
            <div className="usuario-card" key={usuario.rut}>
              <div className="card-header">
                <h2>{usuario.nombre} {usuario.apellido}</h2>
                <button className="btn" onClick={() => openModal(usuario)}>Editar</button>
                <button className="btn" onClick={() => handleDelete(usuario.rut)}>Eliminar</button>
              </div>
              <div className="card-details">
                <p><strong>RUT:</strong> {usuario.rut}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Comuna:</strong> {usuario.comuna}</p>
                <p><strong>Rol:</strong> {usuario.rol}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal para editar el usuario */}
      {modalOpen && (
        <div className="modal-panel">
          <div className="modal-content">
            <h2>Editar Usuario</h2>
            <form onSubmit={handleModalSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  value={modalForm.nombre}
                  onChange={(e) => setModalForm({ ...modalForm, nombre: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  id="apellido"
                  value={modalForm.apellido}
                  onChange={(e) => setModalForm({ ...modalForm, apellido: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={modalForm.email}
                  onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="comuna">Comuna</label>
                <input
                  type="text"
                  id="comuna"
                  value={modalForm.comuna}
                  onChange={(e) => setModalForm({ ...modalForm, comuna: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  value={modalForm.telefono}
                  onChange={(e) => setModalForm({ ...modalForm, telefono: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="rol">Rol</label>
                <select
                  id="rol"
                  value={modalForm.rol}
                  onChange={(e) => setModalForm({ ...modalForm, rol: e.target.value })}
                  required
                >
                  <option value="CLIENTE">CLIENTE</option>
                  <option value="EJECUTIVO">EJECUTIVO</option>
                  {/* Agregar más roles según sea necesario */}
                </select>
              </div>

              

              <div className="form-group">
                <button type="submit" className="btn">Guardar cambios</button>
                <button type="button" className="btn" onClick={closeModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
