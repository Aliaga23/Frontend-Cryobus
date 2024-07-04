import React, { useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../Assets/logo.png';
import routesConfig from './routesConfig';
import { FaUser, FaTruck, FaUserTie, FaBoxOpen, FaRoute, FaSignInAlt, FaBook, FaHistory, FaSignOutAlt, FaChartLine } from 'react-icons/fa'; // Importa los iconos que necesites

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

  const renderMenuItems = (items) => {
    return items.map(item => {
      if ((item.role && role !== item.role) || (item.permiso && !permisos.includes(item.permiso))) {
        return null;
      }
      return (
        <NavDropdown.Item key={item.path} as={Link} to={item.path}>
          {item.label}
        </NavDropdown.Item>
      );
    });
  };

  const renderDropdowns = () => {
    return Object.keys(routesConfig).map(key => {
      const section = routesConfig[key];
      return section.items.map((sector, index) => {
        const Icon = getIconBySector(sector.sector);
        const iconElement = Icon ? <Icon className="me-2" /> : null; // Icono a la izquierda del texto

        if (sector.routes.length > 1 || sector.sector !== "Bitácora") {
          return (
            <NavDropdown
              title={<span style={{ display: 'inline-flex', alignItems: 'center' }}>{iconElement}{sector.sector}</span>}
              id={`${key}-dropdown-${index}`}
              key={`${key}-dropdown-${index}`}
            >
              {renderMenuItems(sector.routes)}
            </NavDropdown>
          );
        } else {
          return (
            <Nav.Link key={sector.routes[0].path} as={Link} to={sector.routes[0].path}>
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>{iconElement}{sector.routes[0].label}</span>
            </Nav.Link>
          );
        }
      });
    });
  };

  const getIconBySector = (sectorName) => {
    switch (sectorName) {
      case 'Usuarios': return FaUser;
      case 'Conductores': return FaUserTie;
      case 'Camiones': return FaTruck;
      case 'Clientes': return FaUser;
      case 'Paquetes': return FaBoxOpen;
      case 'Rutas': return FaRoute;
      case 'Registro': return FaBook;
      case 'Bitácora': return FaHistory;
      case 'Reportes': return FaChartLine;
      default: return null; // Por defecto no hay ícono
    }
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
                <Nav.Link onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" style={{ display: 'inline-flex', alignItems: 'center' }} />Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                <FaSignInAlt className="me-2" />Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
