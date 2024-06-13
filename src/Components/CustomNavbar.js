import React, { useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../Assets/logo.png';

const CustomNavbar = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Usuario:', user);
    console.log('Rol:', role);
  }, [user, role]);

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" style={{ height: '55px', marginRight: '20px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {user ? (
              <>
                {role === 1 && (
                  <>
                    <NavDropdown title="Gestión" id="gestion-dropdown">
                      <NavDropdown.Item as={Link} to="/gestion">Usuarios</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_roles">Roles</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_rolconductor">Rol Conductor</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_tipoenvio">Tipo Envio</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_permiso_rol">Permisos Rol</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_cliente">Gestion Cliente</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_items">Gestion Items</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_paquetes">Gestion Paquetes</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_notaentrega">Gestion Nota Entrega</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_camion">Gestion Camion</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_tipo_camion">Gestion Tipo Camion</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_departamento">Gestion Departamento</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_localidad">Gestion Localidad</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_ubicacion">Gestion Ubicacion</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_notas_traslado">Gestion Notas Traslado</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_estados_entrega">Gestion Estado Entrega</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_plan_ruta">Gestion Plan Ruta</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/gestion_tipo_paquete">Gestion Tipo Paquete</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Registro" id="registro-dropdown">
                      <NavDropdown.Item as={Link} to="/gestion_recepcion">Registrar Recepcion</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to="/bitacora">Bitacora</Nav.Link>
                  </>
                )}
                {role === 4 && (
                  <NavDropdown title="Cliente" id="cliente-dropdown">
                    <NavDropdown.Item as={Link} to="/gestion">Usuarios</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/gestion_cliente">Gestion Cliente</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/gestion_paquetes">Gestion Paquetes</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/gestion_notaentrega">Gestion Nota Entrega</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/gestion_recepcion">Registrar Recepcion</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/gestion_rolconductor">Rol Conductor</NavDropdown.Item>

                  </NavDropdown>
                )}
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
