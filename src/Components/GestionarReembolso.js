import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const GestionReembolsos = () => {
  const [reembolsos, setReembolsos] = useState([]);
  const [selectedReembolso, setSelectedReembolso] = useState(null);
  const [formData, setFormData] = useState({
    nro: '',
    motivo: ''
  });

  useEffect(() => {
    fetchReembolsos();
  }, []);

  const fetchReembolsos = async () => {
    try {
      const response = await axios.get('https://proyecto2-production-ba5b.up.railway.app/api/reembolsos', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setReembolsos(response.data);
    } catch (error) {
      console.error('Error al obtener los reembolsos:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedReembolso) {
        await axios.put(`https://proyecto2-production-ba5b.up.railway.app/api/reembolsos/${selectedReembolso.nro}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await axios.post('https://proyecto2-production-ba5b.up.railway.app/api/reembolsos', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      fetchReembolsos();
      setFormData({ nro: '', motivo: '' });
      setSelectedReembolso(null);
    } catch (error) {
      console.error('Error al guardar el reembolso:', error);
    }
  };

  const handleEdit = (reembolso) => {
    setSelectedReembolso(reembolso);
    setFormData(reembolso);
  };

  const handleDelete = async (nro) => {
    try {
      await axios.delete(`https://proyecto2-production-ba5b.up.railway.app/api/reembolsos/${nro}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchReembolsos();
    } catch (error) {
      console.error('Error al eliminar el reembolso:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-5">
        <Col md={12}>
          <h3>Gestionar Reembolso</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>NRO</Form.Label>
              <Form.Control type="text" name="nro" value={formData.nro} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Motivo</Form.Label>
              <Form.Control type="text" name="motivo" value={formData.motivo} onChange={handleInputChange} required />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              {selectedReembolso ? 'Actualizar Reembolso' : 'Crear Reembolso'}
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h3>Lista de Reembolsos</h3>
          <Table bordered>
            <thead>
              <tr>
                <th>NRO</th>
                <th>Motivo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reembolsos.map((reembolso) => (
                <tr key={reembolso.NRO}>
                  <td>{reembolso.NRO}</td>
                  <td>{reembolso.MOTIVO}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => handleEdit(reembolso)}>Editar</Button>
                    {' '}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(reembolso.NRO)}>Eliminar</Button>
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

export default GestionReembolsos;
