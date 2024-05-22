import React, { useState, useEffect } from 'react';
import {  Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import '../../../Assets/gestion_empleados.module.css';

const GestionRolConductor = () => {
  const [rolConductors, setRolConductors] = useState([]);
  const [newRolConductor, setNewRolConductor] = useState({ id: '', rol: '' });
  const [editRolConductor, setEditRolConductor] = useState(null);

  const fetchRolConductors = async () => {
    try {
      const response = await axios.get('https://proyecto2-production-ba5b.up.railway.app/api/rolConductor');
      setRolConductors(response.data);
    } catch (error) {
      console.error('Error al obtener los roles de conductor:', error);
    }
  };

  useEffect(() => {
    fetchRolConductors();
  }, []);

  const handleChange = (e) => {
    setNewRolConductor({ ...newRolConductor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editRolConductor) {
        await axios.put(`https://proyecto2-production-ba5b.up.railway.app/api/rolConductor/${editRolConductor.ID}`, newRolConductor);
        setEditRolConductor(null);
      } else {
        await axios.post('https://proyecto2-production-ba5b.up.railway.app/api/rolConductor', newRolConductor);
      }
      setNewRolConductor({ id: '', rol: '' });
      fetchRolConductors();
    } catch (error) {
      console.error('Error al registrar el rol de conductor:', error);
    }
  };

  const handleEdit = (rolConductor) => {
    setNewRolConductor({ id: rolConductor.ID, rol: rolConductor.ROL });
    setEditRolConductor(rolConductor);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://proyecto2-production-ba5b.up.railway.app/api/rolConductor/${id}`);
      fetchRolConductors();
    } catch (error) {
      console.error('Error al eliminar el rol de conductor:', error);
    }
  };

  return (
    <div>
 
      <Container className="mt-5">
        <Row className="mb-5">
          <Col md={12}>
            <h3>{editRolConductor ? 'Editar Rol de Conductor' : 'Registrar Nuevo Rol de Conductor'}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="id">ID</Form.Label>
                <Form.Control type="text" id="id" name="id" value={newRolConductor.id} onChange={handleChange} placeholder="Ingrese el ID del rol de conductor" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="rol">Rol</Form.Label>
                <Form.Control type="text" id="rol" name="rol" value={newRolConductor.rol} onChange={handleChange} placeholder="Ingrese el rol de conductor" />
              </Form.Group>
              <Button type="submit" variant="primary">{editRolConductor ? 'Actualizar' : 'Registrar'}</Button>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <h3>Lista de Roles de Conductor</h3>
            <Table bordered>
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rolConductors.map(rolConductor => (
                  <tr key={rolConductor.ID}>
                    <td>{rolConductor.ID}</td>
                    <td>{rolConductor.ROL}</td>
                    <td>
                      <Button variant="warning" size="sm" onClick={() => handleEdit(rolConductor)}>Editar</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(rolConductor.ID)}>Eliminar</Button>
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

export default GestionRolConductor;
