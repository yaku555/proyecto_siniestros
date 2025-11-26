// src/components/Header.jsx
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import ContactInfo from "./ContactInfo";
import UserLink from "./UserLink"; // Importamos el nuevo componente

export default function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Logo" style={{ borderRadius: "5px" }} />
      <section className="header-info">
        <ContactInfo />
        <UserLink /> {/* Aquí agregamos el UserLink que maneja login y logout */}
        
      </section>
    </div>
  );
}
