import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Asegurarse de cerrar sesión antes de redirigir
        await logout();
        // Redirige al usuario a la página de login después de cerrar sesión
        navigate('/login');
      } catch (error) {
        console.error('Error during logout:', error);
        if (error.response && error.response.status === 401) {
          // Si el token ya expiró o es inválido, intenta cerrar sesión de todos modos
          try {
            await logout();
          } finally {
            // Redirige al usuario a la página de login
            navigate('/login');
          }
        }
      }
    };

    performLogout();
  }, [logout, navigate]);

  return null;
};

export default Logout;
