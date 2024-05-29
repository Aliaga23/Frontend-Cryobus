import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, InputGroup, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Assets/gestion_empleados.module.css';

const GestionRoles = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ id: '', nombre: '' });
  const [editRole, setEditRole] = useState(null);
  const [error, setError] = useState(null);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/roles`);
      setRoles(response.data);
    } catch (error) {
      setError('Error al obtener los roles');
      console.error('Error al obtener los roles:', error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setNewRole({ ...newRole, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editRole) {
        await axios.put(`${backendUrl}/api/roles/${editRole.ID}`, newRole);
        setEditRole(null);
        Swal.fire({
          title: "¡Rol actualizado!",
          text: "El rol se ha actualizado correctamente.",
          icon: "success"
        });
      } else {
        await axios.post(`${backendUrl}/api/roles`, newRole);
        Swal.fire({
          title: "¡Rol registrado!",
          text: "El rol se ha registrado correctamente.",
          icon: "success"
        });
      }
      setNewRole({ id: '', nombre: '' });
      fetchRoles();
    } catch (error) {
      setError('Error al registrar el rol');
      console.error('Error al registrar el rol:', error);
    }
  };

  const handleEdit = (role) => {
    setNewRole({ id: role.ID, nombre: role.NOMBRE });
    setEditRole(role);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/roles/${id}`);
      fetchRoles();
      Swal.fire({
        title: "¡Rol eliminado!",
        text: "El rol se ha eliminado correctamente.",
        icon: "success"
      });
    } catch (error) {
      setError('Error al eliminar el rol');
      console.error('Error al eliminar el rol:', error);
    }
  };

  return (
    <Container className="mt-5">
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      <Row className="mb-5">
        <Col md={12}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>{editRole ? 'Editar Rol' : 'Registrar Nuevo Rol'}</h3>
          </div>
          <Form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
            <Form.Group className="mb-3" size="lg" >
              <InputGroup>
                <InputGroup.Text>ID</InputGroup.Text>
                <Form.Control
                  placeholder="Ingrese el ID"
                  id="id"
                  name="id"
                  value={newRole.id}
                  onChange={handleChange}
                  aria-label="ID"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <InputGroup.Text>Nombre</InputGroup.Text>
                <Form.Control
                  placeholder="Ingrese el nombre"
                  id="nombre"
                  name="nombre"
                  value={newRole.nombre}
                  onChange={handleChange}
                  aria-label="Nombre"
                />
              </InputGroup>
            </Form.Group>
            <Button type="submit" variant="primary" size="sm">
              {editRole ? 'Actualizar' : 'Registrar'}
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h3>Lista de Roles</h3>
          <Table bordered hover striped responsive="sm">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.ID}>
                  <td>{role.ID}</td>
                  <td>{role.NOMBRE}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(role)}
                      className="me-2"
                    >
                      <FontAwesomeIcon icon={faEdit} /> Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(role.ID)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default GestionRoles;
