import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProviders } from "./context/AppProviders";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Inicio from "./pages/Inicio";
import RegistrarSin from "./pages/RegistrarSin";
import GestionarSin from "./pages/GestionarSin";
import GestionarDen from "./pages/GestionarDen";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil"; // Página de perfil del usuario (para ver datos y cerrar sesión
import PrivateRoute from "./components/PrivateRoute"; // Importamos PrivateRoute
import { useAuth } from "./context/AuthContext"; // Para verificar si el usuario está autenticado
import AdminUsuarios from "./pages/AdminUsuarios";
import ReportesBI from "./pages/ReportesBI";

function App() {
  const { isAuthenticated, usuario } = useAuth(); // Usamos useAuth para obtener si el usuario está autenticado

  return (
    <Router>
      <AppProviders>
        <section className="borde_nav">
          <Header />
          <Navbar />
        </section>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registrarSin" element={<RegistrarSin />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/gestionarSin"
            element={
              <PrivateRoute element={<GestionarSin />} />
            }
          />
          <Route
            path="/gestionarDen"
            element={
              <PrivateRoute element={<GestionarDen />} />
            }
          />
          <Route
            path="/perfil"
            element={
              <PrivateRoute element={<Perfil />} />
            }
          />
          <Route
            path="/adminUsuarios"
            element={
              <PrivateRoute element={<AdminUsuarios />} />
            }
          />
          <Route
            path="/reportesBI"
            element={
              <PrivateRoute element={<ReportesBI />} />
            }
          />
        </Routes>
      </AppProviders>
    </Router>
  );
}

export default App;
