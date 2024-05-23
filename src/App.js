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
import ProtectedRoute from './Components/ProtectedRoute';
import GestionClientes from './Components/GestionCliente';

import CustomNavbar from './Components/CustomNavbar';
import './Assets/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GestionItems from './Components/GestionItems';
import GestionPaquetes from './Components/GestionPaquetes';
import GestionNotaEntrega from './Components/GestionNotaEntrega';

function App() {
  return (
    <AuthProvider>
      <Router>
        <CustomNavbar />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            
            <Route path="/gestion" element={<Gestion />} />
            <Route path="/gestion_roles" element={<GestionRoles />} />
            <Route path="/gestion_permiso_rol" element={<GestionPermisoRol />} />
            <Route path="/gestion_tipoenvio" element={<GestionTipoEnvio />} />
            <Route path="/gestion_rolconductor" element={<GestionRolConductor />} />
            <Route path="/gestion_cliente" element={<GestionClientes />} />
            <Route path="/gestion_items" element={<GestionItems />} />
            <Route path="/gestion_paquetes" element={<GestionPaquetes />} />
            <Route path="/gestion_notaentrega" element={<GestionNotaEntrega />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
