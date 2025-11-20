// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SiniestroProvider } from "./context/SiniestroContext"; // Asegúrate de que el contexto esté envuelto aquí

// Importa los componentes
import Navbar from "./components/Navbar"; // Navbar que contiene el menú de navegación
import Header from "./components/Header"; // Header que contiene logo, contacto y login
import Inicio from "./pages/Inicio";
import RegistrarSin from "./pages/RegistrarSin";
import GestionarSin from "./pages/GestionarSin";

function App() {
  return (
    <Router>
      
      <SiniestroProvider> {/* Proveedor de contexto para siniestros */}
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
        </Routes>
      </SiniestroProvider>
    </Router>
  );
}

export default App;
