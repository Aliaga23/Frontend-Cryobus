import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, redirectPath = '/login', children }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }
  
  return children ? children : <Outlet />;
};

export default PrivateRoute;
