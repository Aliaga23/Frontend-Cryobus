import React, { useState, useEffect } from 'react';

import {  Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import '../../../Assets/gestion_empleados.module.css';

const GestionRoles = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ id: '', nombre: '' });
  const [editRole, setEditRole] = useState(null);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://proyecto2-production-ba5b.up.railway.app/api/roles');
      setRoles(response.data);
    } catch (error) {
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
        await axios.put(`https://proyecto2-production-ba5b.up.railway.app/api/roles/${editRole.ID}`, newRole);
        setEditRole(null);
      } else {
        await axios.post('https://proyecto2-production-ba5b.up.railway.app/api/roles', newRole);
      }
      setNewRole({ id: '', nombre: '' });
      fetchRoles();
    } catch (error) {
      console.error('Error al registrar el rol:', error);
    }
  };

  const handleEdit = (role) => {
    setNewRole({ id: role.ID, nombre: role.NOMBRE });
    setEditRole(role);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://proyecto2-production-ba5b.up.railway.app/api/roles/${id}`);
      fetchRoles();
    } catch (error) {
      console.error('Error al eliminar el rol:', error);
    }
  };

  return (
    <div>
      

      <Container className="mt-5">
        <Row className="mb-5">
          <Col md={12}>
            <h3>{editRole ? 'Editar Rol' : 'Registrar Nuevo Rol'}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="id">ID</Form.Label>
                <Form.Control type="text" id="id" name="id" value={newRole.id} onChange={handleChange} placeholder="Ingrese el ID del rol" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="nombre">Nombre</Form.Label>
                <Form.Control type="text" id="nombre" name="nombre" value={newRole.nombre} onChange={handleChange} placeholder="Ingrese el nombre del rol" />
              </Form.Group>
              <Button type="submit" variant="primary">{editRole ? 'Actualizar' : 'Registrar'}</Button>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <h3>Lista de Roles</h3>
            <Table bordered>
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {roles.map(role => (
                  <tr key={role.ID}>
                    <td>{role.ID}</td>
                    <td>{role.NOMBRE}</td>
                    <td>
                      <Button variant="warning" size="sm" onClick={() => handleEdit(role)}>Editar</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(role.ID)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GestionRoles;
