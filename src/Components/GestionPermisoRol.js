import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const GestionPermisoRol = () => {
  const [roles, setRoles] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [selectedRol, setSelectedRol] = useState(null);
  const [rolPermisos, setRolPermisos] = useState([]);
  const [newPermiso, setNewPermiso] = useState({ nro: '', idPermiso: '' });

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app'; // URL de tu backend en Railway

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/roles`);
      setRoles(response.data);
    } catch (error) {
      console.error('Error al obtener los roles:', error);
    }
  };

  const fetchPermisos = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/permisos`);
      setPermisos(response.data);
    } catch (error) {
      console.error('Error al obtener los permisos:', error);
    }
  };

  const fetchRolPermisos = async (idRol) => {
    try {
      const response = await axios.get(`${backendUrl}/api/permisoRol/${idRol}`);
      setRolPermisos(response.data);
    } catch (error) {
      console.error('Error al obtener los permisos del rol:', error);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchPermisos();
  }, []);

  const handleRolChange = (e) => {
    const idRol = e.target.value;
    setSelectedRol(idRol);
    fetchRolPermisos(idRol);
  };

  const handlePermisoChange = (e) => {
    setNewPermiso({ ...newPermiso, [e.target.name]: e.target.value });
  };

  const handleAssignPermiso = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/permisoRol/${selectedRol}`, newPermiso);
      fetchRolPermisos(selectedRol);
      setNewPermiso({ nro: '', idPermiso: '' });
    } catch (error) {
      console.error('Error al asignar el permiso:', error);
    }
  };

  const handleRemovePermiso = async (nro) => {
    try {
      await axios.delete(`${backendUrl}/api/permisoRol/${selectedRol}/${nro}`);
      fetchRolPermisos(selectedRol);
    } catch (error) {
      console.error('Error al eliminar el permiso:', error);
    }
  };

  return (
    <div>
      <Container className="mt-5">
        <Row className="mb-5">
          <Col md={12}>
            <h3>Asignar Permisos a Rol</h3>
            <Form onSubmit={handleAssignPermiso}>
              <Form.Group>
                <Form.Label htmlFor="rol">Rol</Form.Label>
                <Form.Control as="select" id="rol" name="rol" onChange={handleRolChange}>
                  <option value="">Seleccione un rol</option>
                  {roles.map(rol => (
                    <option key={rol.ID} value={rol.ID}>{rol.NOMBRE}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="nro">Número de Permiso</Form.Label>
                <Form.Control type="text" id="nro" name="nro" value={newPermiso.nro} onChange={handlePermisoChange} placeholder="Ingrese el número del permiso" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="idPermiso">ID Permiso</Form.Label>
                <Form.Control as="select" id="idPermiso" name="idPermiso" value={newPermiso.idPermiso} onChange={handlePermisoChange}>
                  <option value="">Seleccione un permiso</option>
                  {permisos.map(permiso => (
                    <option key={permiso.ID} value={permiso.ID}>{permiso.NOMBRE}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">Asignar Permiso</Button>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <h3>Permisos Asignados</h3>
            {selectedRol && (
              <Table bordered>
                <thead className="thead-light">
                  <tr>
                    <th>Número</th>
                    <th>ID Permiso</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {rolPermisos.map(permiso => (
                    <tr key={permiso.NRO}>
                      <td>{permiso.NRO}</td>
                      <td>{permiso.IDPERMISO}</td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => handleRemovePermiso(permiso.NRO)}>Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GestionPermisoRol;
