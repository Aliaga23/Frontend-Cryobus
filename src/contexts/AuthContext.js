import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [permisos, setPermisos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(storedUser.user);
      setRole(storedUser.role || '');
      fetchPermisos(storedUser.user.id); // Asume que user tiene un id
    }
    setLoading(false);
  }, []);

  const fetchPermisos = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await axios.get(`https://proyecto2-production-ba5b.up.railway.app/api/permisos/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPermisos(response.data.map(permiso => permiso.IDPERMISO)); // Asegúrate de que la respuesta contiene IDPERMISO
    } catch (error) {
      console.error('Error al obtener los permisos:', error);
    }
  };

  const login = (userData) => {
    setUser(userData.user);
    setRole(userData.role || '');
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
    fetchPermisos(userData.user.id);
  };

  const logout = () => {
    setUser(null);
    setRole('');
    setPermisos([]);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, role, permisos, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
