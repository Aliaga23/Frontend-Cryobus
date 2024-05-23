import React, { } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link} from 'react-router-dom';

import logo from '../Assets/logo.jpeg';

const CustomNavbar = () => {


  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" style={{ height: '55px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          
                    <Nav.Link as={Link} to="/gestion">Usuarios</Nav.Link>
                    <Nav.Link as={Link} to="/gestion_roles">Roles</Nav.Link>
                    <Nav.Link as={Link} to="/gestion_rolconductor">Rol Conductor</Nav.Link>
                    <Nav.Link as={Link} to="/gestion_tipoenvio">Tipo Envio</Nav.Link>
                    <Nav.Link as={Link} to="/gestion_permiso_rol">Permisos Rol</Nav.Link>
                  
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
