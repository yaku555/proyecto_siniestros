import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Para obtener el usuario logueado y su rol

export default function Navbar() {
  const { isAuthenticated, usuario, logout } = useAuth(); // Obtener usuario y estado de autenticación

  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            INICIO
          </NavLink>
        </li>
        <li>
          <NavLink to="/RegistrarSin" className={({ isActive }) => (isActive ? "active" : "")}>
            REGISTRAR DENUNCIO
          </NavLink>
        </li>

        {isAuthenticated && usuario?.rol === "EJECUTIVO" && (
          <>
            <li>
              <NavLink to="/gestionarSin" className={({ isActive }) => (isActive ? "active" : "")}>
                GESTIONAR SINIESTROS
              </NavLink>
            </li>
            <li>
              <NavLink to="/gestionarDen" className={({ isActive }) => (isActive ? "active" : "")}>
                GESTIONAR DENUNCIOS
              </NavLink>
            </li>
            <li>
              <NavLink to="/reportesBI" className={({ isActive }) => (isActive ? "active" : "")}>
                REPORTES BI
              </NavLink>
            </li>
            <li>
              <NavLink to="/adminUsuarios" className={({ isActive }) => (isActive ? "active" : "")}>
                ADMINISTRAR USUARIOS
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
