import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import '../Assets/gestion_empleados.module.css';

const GestionTipoEnvio = () => {
  const [tipoEnvios, setTipoEnvios] = useState([]);
  const [newTipoEnvio, setNewTipoEnvio] = useState({ id: '', nombre: '' });
  const [editTipoEnvio, setEditTipoEnvio] = useState(null);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app'; // URL de tu backend en Railway

  const fetchTipoEnvios = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/tipoEnvio`);
      setTipoEnvios(response.data);
    } catch (error) {
      console.error('Error al obtener los tipos de envío:', error);
    }
  };

  useEffect(() => {
    fetchTipoEnvios();
  }, []);

  const handleChange = (e) => {
    setNewTipoEnvio({ ...newTipoEnvio, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTipoEnvio) {
        await axios.put(`${backendUrl}/api/tipoEnvio/${editTipoEnvio.ID}`, newTipoEnvio);
        setEditTipoEnvio(null);
      } else {
        await axios.post(`${backendUrl}/api/tipoEnvio`, newTipoEnvio);
      }
      setNewTipoEnvio({ id: '', nombre: '' });
      fetchTipoEnvios();
    } catch (error) {
      console.error('Error al registrar el tipo de envío:', error);
    }
  };

  const handleEdit = (tipoEnvio) => {
    setNewTipoEnvio({ id: tipoEnvio.ID, nombre: tipoEnvio.NOMBRE });
    setEditTipoEnvio(tipoEnvio);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/tipoEnvio/${id}`);
      fetchTipoEnvios();
    } catch (error) {
      console.error('Error al eliminar el tipo de envío:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-5">
        <Col md={12}>
          <h3>{editTipoEnvio ? 'Editar Tipo de Envío' : 'Registrar Nuevo Tipo de Envío'}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="id">ID</Form.Label>
              <Form.Control type="text" id="id" name="id" value={newTipoEnvio.id} onChange={handleChange} placeholder="Ingrese el ID del tipo de envío" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="nombre">Nombre</Form.Label>
              <Form.Control type="text" id="nombre" name="nombre" value={newTipoEnvio.nombre} onChange={handleChange} placeholder="Ingrese el nombre del tipo de envío" />
            </Form.Group>
            <Button type="submit" variant="primary">{editTipoEnvio ? 'Actualizar' : 'Registrar'}</Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h3>Lista de Tipos de Envío</h3>
          <Table bordered>
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tipoEnvios.map(tipoEnvio => (
                <tr key={tipoEnvio.ID}>
                  <td>{tipoEnvio.ID}</td>
                  <td>{tipoEnvio.NOMBRE}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => handleEdit(tipoEnvio)}>Editar</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(tipoEnvio.ID)}>Eliminar</Button>
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

export default GestionTipoEnvio;
