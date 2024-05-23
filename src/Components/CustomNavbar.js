import React, { useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
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
                  <>
                    <Nav.Link as={Link} to="/gestion">Usuarios</Nav.Link>
                    <Nav.Link as={Link} to="/gestion_roles">Roles</Nav.Link>
                    <Nav.Link as={Link} to="/gestion_rolconductor">Rol Conductor</Nav.Link>
                    <Nav.Link as={Link} to="/gestion_tipoenvio">Tipo Envio</Nav.Link>
                    <Nav.Link as={Link} to="/gestion_permiso_rol">Permisos Rol</Nav.Link>
                    <Nav.Link as={Link} to="/gestion_tipoenvio">Tipo Envio</Nav.Link>
                  </>
                )}
                {role === 4 && (
                  <>
                    <Nav.Link as={Link} to="/gestion_tipoenvio">Tipo Envio</Nav.Link>
                  </>
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
