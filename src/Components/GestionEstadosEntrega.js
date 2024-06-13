import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import '../Assets/gestion_empleados.module.css';

const GestionEstadosEntrega = () => {
  const [estadosEntrega, setEstadosEntrega] = useState([]);
  const [newEstadoEntrega, setNewEstadoEntrega] = useState({ id: '', nombre: '' });
  const [editEstadoEntrega, setEditEstadoEntrega] = useState(null);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app'; // URL de tu backend en Railway

  const fetchEstadosEntrega = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/estadosEntrega`);
      setEstadosEntrega(response.data);
    } catch (error) {
      console.error('Error al obtener los estados de entrega:', error);
    }
  };

  useEffect(() => {
    fetchEstadosEntrega();
  }, []);

  const handleChange = (e) => {
    setNewEstadoEntrega({ ...newEstadoEntrega, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editEstadoEntrega) {
        await axios.put(`${backendUrl}/api/estadosEntrega/${editEstadoEntrega.ID}`, newEstadoEntrega);
        setEditEstadoEntrega(null);
      } else {
        await axios.post(`${backendUrl}/api/estadosEntrega`, newEstadoEntrega);
      }
      setNewEstadoEntrega({ id: '', nombre: '' });
      fetchEstadosEntrega();
    } catch (error) {
      console.error('Error al registrar el estado de entrega:', error);
    }
  };

  const handleEdit = (estadoEntrega) => {
    setNewEstadoEntrega({ id: estadoEntrega.ID, nombre: estadoEntrega.NOMBRE });
    setEditEstadoEntrega(estadoEntrega);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/estadosEntrega/${id}`);
      fetchEstadosEntrega();
    } catch (error) {
      console.error('Error al eliminar el estado de entrega:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-5">
        <Col md={12}>
          <h3>{editEstadoEntrega ? 'Editar Estado de Entrega' : 'Registrar Nuevo Estado de Entrega'}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="id">ID</Form.Label>
              <Form.Control type="text" id="id" name="id" value={newEstadoEntrega.id} onChange={handleChange} placeholder="Ingrese el ID del estado de entrega" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="nombre">Nombre</Form.Label>
              <Form.Control type="text" id="nombre" name="nombre" value={newEstadoEntrega.nombre} onChange={handleChange} placeholder="Ingrese el nombre del estado de entrega" />
            </Form.Group>
            <Button type="submit" variant="primary">{editEstadoEntrega ? 'Actualizar' : 'Registrar'}</Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h3>Lista de Estados de Entrega</h3>
          <Table bordered>
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estadosEntrega.map(estadoEntrega => (
                <tr key={estadoEntrega.ID}>
                  <td>{estadoEntrega.ID}</td>
                  <td>{estadoEntrega.NOMBRE}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => handleEdit(estadoEntrega)}>Editar</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(estadoEntrega.ID)}>Eliminar</Button>
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

export default GestionEstadosEntrega;
