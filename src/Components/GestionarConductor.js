import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const GestionarConductor = () => {
  const [conductores, setConductores] = useState([]);
  const [formData, setFormData] = useState({
    codigo: '',
    apellidos: '',
    nombres: ''
  });
  const [editConductor, setEditConductor] = useState(null);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  useEffect(() => {
    fetchConductores();
  }, []);

  const fetchConductores = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/conductores`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setConductores(response.data);
    } catch (error) {
      console.error('Error al obtener los conductores:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editConductor) {
        await axios.put(`${backendUrl}/api/conductores/${editConductor.CODIGO}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEditConductor(null);
      } else {
        await axios.post(`${backendUrl}/api/conductores`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      setFormData({ codigo: '', apellidos: '', nombres: '' });
      fetchConductores();
    } catch (error) {
      console.error('Error al guardar el conductor:', error);
    }
  };

  const handleEdit = (conductor) => {
    setFormData({
      codigo: conductor.CODIGO,
      apellidos: conductor.APELLIDOS,
      nombres: conductor.NOMBRES
    });
    setEditConductor(conductor);
  };

  const handleDelete = async (codigo) => {
    try {
      await axios.delete(`${backendUrl}/api/conductores/${codigo}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchConductores();
    } catch (error) {
      console.error('Error al eliminar el conductor:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-5">
        <Col md={12}>
          <h3>Gestionar Conductor</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Código</Form.Label>
              <Form.Control type="text" name="codigo" value={formData.codigo} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellidos</Form.Label>
              <Form.Control type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombres</Form.Label>
              <Form.Control type="text" name="nombres" value={formData.nombres} onChange={handleChange} required />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              {editConductor ? 'Actualizar Conductor' : 'Crear Conductor'}
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h3>Lista de Conductores</h3>
          <Table bordered>
            <thead>
              <tr>
                <th>Código</th>
                <th>Apellidos</th>
                <th>Nombres</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {conductores.map((conductor) => (
                <tr key={conductor.CODIGO}>
                  <td>{conductor.CODIGO}</td>
                  <td>{conductor.APELLIDOS}</td>
                  <td>{conductor.NOMBRES}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => handleEdit(conductor)}>Editar</Button>
                    {' '}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(conductor.CODIGO)}>Eliminar</Button>
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

export default GestionarConductor;
