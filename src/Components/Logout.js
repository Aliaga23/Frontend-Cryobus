import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.post(
          'https://proyecto2-production-ba5b.up.railway.app/api/logout',
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        logout();
        navigate('/login');
      } catch (error) {
        console.error('Error during logout:', error);
        if (error.response && error.response.status === 401) {
          // Manejar el token expirado
          logout();
          navigate('/login');
        }
      }
    };

    performLogout();
  }, [logout, navigate]);

  return null;
};

export default Logout;
