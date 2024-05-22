import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Home from './Components/Home';

import Register from './Components/Register';

import LoginVista from './Components/Ciclo1/CU1/Login';
import Gestion from './Components/Ciclo1/CU5/Gestion';
import GestionRoles from './Components/Ciclo1/CU4/GestionRoles';
import GestionRolConductor from './Components/Ciclo1/CU7/GestionRolConductor'; // Importar el nuevo componente
import GestionTipoEnvio from './Components/Ciclo1/CU6/GestionTipoEnvio';
import GestionPermisoRol from './Components/Ciclo1/CU3/GestionPermisoRol'; // Importar el nuevo componente
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
        <Route path="/login" element={<LoginVista />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/gestion_roles" element={<GestionRoles />} />
        <Route path="/gestion_rol_conductor" element={<GestionRolConductor />} /> 
        <Route path="/gestion_tipo_envio" element={<GestionTipoEnvio />} /> 
        <Route path="/gestion_permiso_rol" element={<GestionPermisoRol />} /> 
      
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
