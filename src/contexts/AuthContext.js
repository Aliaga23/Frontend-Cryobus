import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token'); // Recuperar el token JWT del almacenamiento local
    if (storedUser && token) {
      setUser(storedUser.user);
      setRole(storedUser.role || '');
    }
  }, []);

  const login = (userData) => {
    setUser(userData.user);
    setRole(userData.role || '');
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token); // Almacenar el token JWT en el almacenamiento local
  };

  const logout = () => {
    setUser(null);
    setRole('');
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Eliminar el token JWT del almacenamiento local
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
