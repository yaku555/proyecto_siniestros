// src/components/LoginLink.jsx
import { NavLink } from "react-router-dom";

export default function LoginLink() {
  return (
    <NavLink to="/login" className={({ isActive }) => (isActive ? "active " : "") + "btn"}>
      REGISTRO / LOGIN
    </NavLink>
  );
}
