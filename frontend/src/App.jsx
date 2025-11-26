// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProviders } from "./context/AppProviders";


// Importa los componentes
import Navbar from "./components/Navbar"; // Navbar que contiene el menú de navegación
import Header from "./components/Header"; // Header que contiene logo, contacto y login
import Inicio from "./pages/Inicio";
import RegistrarSin from "./pages/RegistrarSin";
import GestionarSin from "./pages/GestionarSin";
import GestionarDen from "./pages/GestionarDen";

function App() {
  return (
    <Router>
      <AppProviders>
        {/* Header con el Logo, Contacto y Login */}
        <section className="borde_nav">
          <Header />

          {/* Navbar con las opciones de navegación */}
          <Navbar />
        </section>
        {/* Rutas para las páginas */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registrarSin" element={<RegistrarSin />} />
          <Route path="/gestionarSin" element={<GestionarSin />} />
          <Route path="/gestionarDen" element={<GestionarDen />} />
        </Routes>
      </AppProviders>
    </Router>
  );
}

export default App;
