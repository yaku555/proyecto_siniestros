// src/components/UserLink.jsx
import { useAuth } from "../context/AuthContext"; // Usamos el contexto para acceder a los datos de autenticación
import { NavLink } from "react-router-dom";

export default function UserLink() {
  const { isAuthenticated, usuario, logout } = useAuth(); // Accedemos al estado de autenticación

  return (
    <div className="user-link">
      {isAuthenticated ? (
        <>
          {/* Nombre del usuario que al hacer clic llevará al perfil */}
          <NavLink to="/perfil" className="btn">
            {usuario.nombre}
          </NavLink>
          {/* Enlace a Logout */}
        </>
      ) : (
        <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "") + " btn"}>
          LOGIN / REGISTRO
        </NavLink>
      )}
    </div>
  );
}
