import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ element, ...rest }) {
  const { isAuthenticated } = useAuth();

  // Si el usuario no está autenticado, lo redirigimos a la página de login
  return isAuthenticated ? element : <Navigate to="/login" />;
}

export default PrivateRoute;
