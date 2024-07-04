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
import GestionRecepcion from './Components/RegistrarRecepcion';
import GestionCamion from './Components/GestionCamiones';
import GestionTipoCamion from './Components/GestionTiposCamion';
import GestionDepartamento from './Components/GestionDepartamentos';
import GestionLocalidad from './Components/GestionLocalidades';
import GestionNotasTraslado from './Components/GestionNotasTraslado';
import GestionEstadosEntrega from './Components/GestionEstadosEntrega';
import GestionPlanRutas from './Components/GestionPlanRutas';
import GestionTipoPaquetes from './Components/GestionTipoPaquetes';
import Bitacora from './Components/Bitacora';
import Logout from './Components/Logout';
import ChangePassword from './Components/ChangePassword';
import GestionarDireccion from './Components/GestionDireccion';
import GestionarConductor from './Components/GestionarConductor';
import GestionarDetalleConductor from './Components/GestionarDetalleConductor';
import GestionarReembolso from './Components/GestionarReembolso';
import RegistrarEntrega from './Components/RegistrarEntrega';
import ReporteEntrega from './Components/ReporteEntrega';
import ReporteTraslado from './Components/ReporteTraslado';
import RegistrarSalidaPaquete from './Components/RegistrarSalidaPaquete';
import RegistrarLlegadaPaquete from './Components/RegistrarLlegadaPaquete';
import ReporteGeneral from './Components/ReporteGeneral';



function App() {
  return (
    <AuthProvider>
      <Router>

        <CustomNavbar />
        
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} /> {/* Añadido logout */}
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
            <Route path="/gestion_recepcion" element={<GestionRecepcion />} />
            <Route path="/gestion_camion" element={<GestionCamion />} />
            <Route path="/gestion_tipo_camion" element={<GestionTipoCamion />} />
            <Route path="/gestion_departamento" element={<GestionDepartamento />} />
            <Route path="/gestion_localidad" element={<GestionLocalidad />} />
            <Route path="/gestion_notas_traslado" element={<GestionNotasTraslado />} />
            <Route path="/gestion_estados_entrega" element={<GestionEstadosEntrega />} />
            <Route path="/gestion_plan_ruta" element={<GestionPlanRutas />} />
            <Route path="/gestion_tipo_paquete" element={<GestionTipoPaquetes />} />
            <Route path="/gestion_direccion" element={<GestionarDireccion />} />
            <Route path="/gestion_conductor" element={<GestionarConductor />} />
            <Route path="/gestion_detalle_conductor" element={<GestionarDetalleConductor />} />
            <Route path="/gestion_reembolso" element={<GestionarReembolso />} />
            <Route path="/registrar_entrega" element={<RegistrarEntrega />} />
            <Route path="/reporte_entrega" element={<ReporteEntrega />} />
            <Route path="/reporte_traslado" element={<ReporteTraslado />} />
            <Route path="/registrar_salida" element={<RegistrarSalidaPaquete />} />
            <Route path="/registrar_llegada" element={<RegistrarLlegadaPaquete />} />
            <Route path="/reporte_general" element={<ReporteGeneral />} />

            <Route path="/change_password" element={<ChangePassword />} />
            <Route path="/bitacora" element={<Bitacora />} />
                        <Route path="/bitacora" element={<Bitacora />} />

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
