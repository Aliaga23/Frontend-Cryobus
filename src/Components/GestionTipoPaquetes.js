import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import styles from '../Assets/gestion_empleados.module.css';

const GestionTipoPaquetes = () => {
  const [tipoPaquetes, setTipoPaquetes] = useState([]);
  const [newTipoPaquete, setNewTipoPaquete] = useState({ id: '', nombre: '' });
  const [editTipoPaquete, setEditTipoPaquete] = useState(null);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchTipoPaquetes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/tipoPaquete`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTipoPaquetes(response.data);
    } catch (error) {
      console.error('Error al obtener los tipos de paquete:', error);
    }
  };

  useEffect(() => {
    fetchTipoPaquetes();
  }, []);

  const handleChange = (e) => {
    setNewTipoPaquete({ ...newTipoPaquete, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTipoPaquete) {
        await axios.put(`${backendUrl}/api/tipoPaquete/${editTipoPaquete.ID}`, newTipoPaquete, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEditTipoPaquete(null);
      } else {
        await axios.post(`${backendUrl}/api/tipoPaquete`, newTipoPaquete, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      setNewTipoPaquete({ id: '', nombre: '' });
      fetchTipoPaquetes();
    } catch (error) {
      console.error('Error al registrar el tipo de paquete:', error);
    }
  };

  const handleEdit = (tipoPaquete) => {
    setNewTipoPaquete({ id: tipoPaquete.ID, nombre: tipoPaquete.NOMBRE });
    setEditTipoPaquete(tipoPaquete);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/tipoPaquete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchTipoPaquetes();
    } catch (error) {
      console.error('Error al eliminar el tipo de paquete:', error);
    }
  };

  return (
    <div className={styles.gestionContainer}>
      <Container className="mt-4">
        <Row className="mb-4">
          <Col xs={12}>
            <h3>{editTipoPaquete ? 'Editar Tipo de Paquete' : 'Registrar Nuevo Tipo de Paquete'}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mt-4">
                <Form.Label htmlFor="id">ID</Form.Label>
                <Form.Control type="text" id="id" name="id" value={newTipoPaquete.id} onChange={handleChange} placeholder="Ingrese el ID del tipo de paquete" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="nombre">Nombre</Form.Label>
                <Form.Control type="text" id="nombre" name="nombre" value={newTipoPaquete.nombre} onChange={handleChange} placeholder="Ingrese el nombre del tipo de paquete" />
              </Form.Group>
              <Button type="submit" variant="primary" className="mb-3">{editTipoPaquete ? 'Actualizar' : 'Registrar'}</Button>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <h3>Lista de Tipos de Paquete</h3>
            <div className="table-responsive">
              <Table bordered>
                <thead className="thead-light">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tipoPaquetes.length > 0 ? (
                    tipoPaquetes.map(tipoPaquete => (
                      <tr key={tipoPaquete.ID}>
                        <td>{tipoPaquete.ID}</td>
                        <td>{tipoPaquete.NOMBRE}</td>
                        <td>
                          <Button variant="warning" size="sm" onClick={() => handleEdit(tipoPaquete)}>Editar</Button>
                          <Button variant="danger" size="sm" onClick={() => handleDelete(tipoPaquete.ID)}>Eliminar</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">No se encontraron tipos de paquete</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GestionTipoPaquetes;
