// src/components/Header.jsx
import logo from "../assets/logo.png";
import ContactInfo from "./ContactInfo";
import LoginLink from "./LoginLink";

export default function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Logo" style={{ borderRadius: "5px" }} />
      <section className="header-info">
        <ContactInfo />
        <LoginLink />
      </section>
    </div>
  );
}
