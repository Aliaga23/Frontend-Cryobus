import React, { useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../Assets/logo.png';
import routesConfig from './routesConfig';

const CustomNavbar = () => {
  const { user, role, permisos } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Usuario:', user);
    console.log('Rol:', role);
    console.log('Permisos:', permisos);
  }, [user, role, permisos]);

  const handleLogout = () => {
    navigate('/logout');
  };

  const hasPermission = (permisoId) => {
    return permisos.includes(permisoId);
  };

  const renderMenuItems = (items) => {
    return items.map(item => {
      if (item.role && role !== item.role) {
        return null;
      }
      if (item.permiso && !hasPermission(item.permiso)) {
        return null;
      }
      return <NavDropdown.Item key={item.path} as={Link} to={item.path}>{item.label}</NavDropdown.Item>;
    });
  };

  const renderDropdowns = () => {
    return Object.keys(routesConfig).map(key => {
      const section = routesConfig[key];
      if (section.items) {
        return (
          <NavDropdown title={section.title} id={`${key}-dropdown`} key={key}>
            {renderMenuItems(section.items)}
          </NavDropdown>
        );
      }
      if (section.role && role !== section.role) {
        return null;
      }
      if (section.permiso && hasPermission(section.permiso)) {
        return <Nav.Link key={section.path} as={Link} to={section.path}>{section.label}</Nav.Link>;
      }
      return null;
    });
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
                {renderDropdowns()}
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
