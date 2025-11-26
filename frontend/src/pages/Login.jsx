// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css"; // usamos mismo estilo base

export default function Login() {
  const { login, register, authLoading, authError } = useAuth();

  // Formulario de login
  const [loginForm, setLoginForm] = useState({
    rut: "",
    password: "",
  });

  // Formulario de registro
  const [registerForm, setRegisterForm] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    telefono: "",
    email: "",
    comuna: "",
    rol: "CLIENTE",
    password: "",
    passwordConfirm: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(loginForm);
      // aquí podrías redirigir a otra ruta con react-router (navigate)
      alert("Sesión iniciada correctamente");
    } catch {
      // el error ya se maneja en el contexto
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.passwordConfirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const nuevoUsuario = {
      nombre: registerForm.nombre,
      apellido: registerForm.apellido,
      rut: registerForm.rut,
      telefono: Number(registerForm.telefono),
      email: registerForm.email,
      comuna: registerForm.comuna,
      rol: "CLIENTE",
      password: registerForm.password,
    };

    try {
      await register(nuevoUsuario);
      alert("Usuario registrado correctamente");
    } catch {
      // el error ya se maneja en el contexto
    }
  };

  return (
    <main className="auth-main">
      <div className="auth-wrapper">
        {/* Panel Login */}
        <section className="auth-card">
          <h1>Iniciar sesión</h1>
          <p className="auth-subtitle">Accede con tu cuenta de usuario</p>

          {authError && <p style={{ color: "red" }}>{authError}</p>}

          <form onSubmit={handleLoginSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="login-rut">RUT</label>
              <input
                id="login-rut"
                name="rut"
                type="text"
                value={loginForm.rut}
                onChange={handleLoginChange}
                placeholder="12.345.678-9"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Contraseña</label>
              <input
                id="login-password"
                name="password"
                type="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
            </div>

            <button type="submit" className="btn auth-btn" disabled={authLoading}>
              {authLoading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </section>

        {/* Panel Registro */}
        <section className="auth-card">
          <h1>Crear cuenta</h1>
          <p className="auth-subtitle">Registra un nuevo usuario en el sistema</p>

          <form onSubmit={handleRegisterSubmit} className="auth-form auth-form-grid">
            <div className="form-group">
              <label htmlFor="reg-nombre">Nombre</label>
              <input
                id="reg-nombre"
                name="nombre"
                type="text"
                value={registerForm.nombre}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-apellido">Apellido</label>
              <input
                id="reg-apellido"
                name="apellido"
                type="text"
                value={registerForm.apellido}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-rut">RUT</label>
              <input
                id="reg-rut"
                name="rut"
                type="text"
                value={registerForm.rut}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-telefono">Teléfono</label>
              <input
                id="reg-telefono"
                name="telefono"
                type="tel"
                value={registerForm.telefono}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                name="email"
                type="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-comuna">Comuna</label>
              <input
                id="reg-comuna"
                name="comuna"
                type="text"
                value={registerForm.comuna}
                onChange={handleRegisterChange}
                required
              />
            </div>

            

            <div className="form-group">
              <label htmlFor="reg-password">Contraseña</label>
              <input
                id="reg-password"
                name="password"
                type="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-passwordConfirm">Confirmar contraseña</label>
              <input
                id="reg-passwordConfirm"
                name="passwordConfirm"
                type="password"
                value={registerForm.passwordConfirm}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="form-group form-group-full">
              <button type="submit" className="btn auth-btn" disabled={authLoading}>
                {authLoading ? "Creando usuario..." : "Registrarse"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
