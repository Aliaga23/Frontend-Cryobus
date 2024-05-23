import React, { useEffect } from 'react';
import { Navbar, Nav, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../Assets/logo.jpeg';

const CustomNavbar = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Usuario:', user);
    console.log('Rol:', role);
  }, [user, role]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" style={{ height: '55px', marginRight: '20px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            {user ? (
              <>
                {role === 1 && (
                  <DropdownButton id="dropdown-basic-button" title="Gestión" >
                    <Dropdown.Item as={Link} to="/gestion">Usuarios</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/gestion_roles">Roles</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/gestion_rolconductor">Rol Conductor</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/gestion_tipoenvio">Tipo Envio</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/gestion_permiso_rol">Permisos Rol</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/gestion_cliente">Gestion Cliente</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/gestion_items">Gestion Items</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/gestion_paquetes">Gestion Paquetes</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/gestion_notaentrega">Gestion Nota Entrega</Dropdown.Item>
                  </DropdownButton>
                )}
                {role === 4 && (
                  <DropdownButton id="dropdown-basic-button" title="Cliente" variant="link">
                    <Dropdown.Item as={Link} to="/gestion_cliente">Gestion Cliente</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/gestion_paquetes">Gestion Paquetes</Dropdown.Item>
                  </DropdownButton>
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
