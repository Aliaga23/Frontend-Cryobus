import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../Assets/logo.jpeg';

const CustomNavbar = () => {
  const { user, roles, logout } = useAuth();
  const navigate = useNavigate();

  const hasRole = (roleName) => (roles || []).some(role => role.NOMBRE === roleName);

  const handleLogout = () => {
    logout();
    navigate('/Login');
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" style={{ height: '55px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {hasRole('GERENTE GENERAL') && <Nav.Link as={Link} to="/gestion">Usuarios</Nav.Link>}
            {hasRole('GERENTE GENERAL') && <Nav.Link as={Link} to="/gestion_roles">Roles</Nav.Link>}
            {hasRole('GERENTE GENERAL') && <Nav.Link as={Link} to="/gestion_rol_conductor">Rol Conductor</Nav.Link>}
            {hasRole('GERENTE GENERAL') && <Nav.Link as={Link} to="/gestion_tipo_envio">Tipo Envio</Nav.Link>}
            {user && <Nav.Link onClick={handleLogout}>Login</Nav.Link>}
            {!user && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
