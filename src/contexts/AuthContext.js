import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser.user);
      setRoles(storedUser.roles || []);
    }
  }, []);

  const login = (userData) => {
    setUser(userData.user);
    setRoles(userData.roles || []);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setRoles([]);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
