// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";

export default function Navbar() {
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
            REGISTRAR SINIESTRO
          </NavLink>
        </li>
        <li>
          <NavLink to="/GestionarSin" className={({ isActive }) => (isActive ? "active" : "")}>
            GESTIONAR SINIESTROS
          </NavLink>
        </li>
        <li>
          <NavLink to="/ReportesBI" className={({ isActive }) => (isActive ? "active" : "")}>
            REPORTES BI
          </NavLink>
        </li>
        <li>
          <NavLink to="/adminUsuarios" className={({ isActive }) => (isActive ? "active" : "")}>
            ADMINISTRAR USUARIOS
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
