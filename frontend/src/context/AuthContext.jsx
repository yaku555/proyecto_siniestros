// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { crearUsuario, loginUsuario } from "../api/usuario";
import { getSiniestrosPorRut } from "../api/siniestro"; // Importa la función para obtener siniestros

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [siniestros, setSiniestros] = useState([]); // Estado para los siniestros
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Cargar usuario/token desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("usuario");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      try {
        setUsuario(JSON.parse(savedUser));
        setToken(savedToken);
      } catch {
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
      }
    }
  }, []);

  // Llamada a la API para obtener los siniestros de un usuario
  useEffect(() => {
    if (usuario?.rut) {
      getSiniestrosPorRut(usuario.rut) // Llama a la API para obtener siniestros por rut
        .then((data) => {
          setSiniestros(data); // Guarda los siniestros en el estado
        })
        .catch((err) => {
          console.error("Error al obtener los siniestros:", err);
        });
    }
  }, [usuario]);

  // Registrar usuario
  const register = async (datosRegistro) => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const newUser = await crearUsuario(datosRegistro);
      setUsuario(newUser);
      localStorage.setItem("usuario", JSON.stringify(newUser));
      return newUser;
    } catch (err) {
      setAuthError(err.response?.data?.message || "Error al registrar usuario");
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  // Login
  const login = async (credenciales) => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const data = await loginUsuario(credenciales);
      const userFromServer = data.user || data.usuario || data;
      const tokenFromServer = data.token || null;

      setUsuario(userFromServer);
      setToken(tokenFromServer);

      localStorage.setItem("usuario", JSON.stringify(userFromServer));
      if (tokenFromServer) {
        localStorage.setItem("token", tokenFromServer);
      }

      return userFromServer;
    } catch (err) {
      setAuthError(err.response?.data?.message || "Credenciales inválidas");
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUsuario(null);
    setToken(null);
    setSiniestros([]); // Limpiar siniestros cuando el usuario se desloguea
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  };

  const value = {
    usuario,
    token,
    siniestros, // Pasar los siniestros al contexto
    authLoading,
    authError,
    register,
    login,
    logout,
    isAuthenticated: !!usuario,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
