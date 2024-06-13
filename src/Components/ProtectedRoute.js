import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ redirectPath = '/login' }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Puedes mostrar un spinner o un mensaje de carga aquí
  }

  if (!user) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
