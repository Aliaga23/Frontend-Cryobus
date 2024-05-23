import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Home from './Components/Home';

import Register from './Components/Register';
import Gestion from './Components/Gestion';
import Login from './Components/Login';
import GestionRoles from './Components/GestionRoles';
import GestionPermisoRol from './Components/GestionPermisoRol';
import GestionTipoEnvio from './Components/GestionTipoEnvio';
import GestionRolConductor from './Components/GestionRolConductor';


import CustomNavbar from './Components/Navbar';

import './Assets/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <AuthProvider>
    <Router>
    <CustomNavbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/gestion_rol" element={<GestionRoles />} />
        <Route path="/gestion_permiso_rol" element={<GestionPermisoRol />} />
        <Route path="/gestion_tipoenvio" element={<GestionTipoEnvio />} />
        <Route path="/gestion_rolconductor" element={<GestionRolConductor />} />
        
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
