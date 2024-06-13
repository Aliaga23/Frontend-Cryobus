import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import styles from '../Assets/gestion_empleados.module.css';

const GestionTiposCamion = () => {
  const [tiposCamion, setTiposCamion] = useState([]);
  const [newTipoCamion, setNewTipoCamion] = useState({
    id: '',
    nombre: ''
  });
  const [editTipoCamion, setEditTipoCamion] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchTiposCamion = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/tiposCamion`);
      setTiposCamion(response.data);
      setShowTable(true);
    } catch (error) {
      console.error('Error al obtener los tipos de camión:', error);
    }
  };

  useEffect(() => {
    fetchTiposCamion();
  }, []);

  const handleChange = (e) => {
    setNewTipoCamion({ ...newTipoCamion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTipoCamion) {
        await axios.put(`${backendUrl}/api/tiposCamion/${editTipoCamion.ID}`, newTipoCamion);
        setEditTipoCamion(null);
      } else {
        await axios.post(`${backendUrl}/api/tiposCamion`, newTipoCamion);
      }
      setNewTipoCamion({ id: '', nombre: '' });
      fetchTiposCamion();
    } catch (error) {
      console.error('Error al registrar el tipo de camión:', error);
    }
  };

  const handleEdit = (tipoCamion) => {
    setNewTipoCamion({
      id: tipoCamion.ID,
      nombre: tipoCamion.NOMBRE
    });
    setEditTipoCamion(tipoCamion);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/tiposCamion/${id}`);
      fetchTiposCamion();
    } catch (error) {
      console.error('Error al eliminar el tipo de camión:', error);
    }
  };

  return (
    <div className={styles.gestionContainer}>
      <Container className="mt-4">
        <Row className="mb-4">
          <Col xs={12}>
            <h3>{editTipoCamion ? 'Editar Tipo de Camión' : 'Registrar Nuevo Tipo de Camión'}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mt-4">
                <Form.Label htmlFor="id">ID</Form.Label>
                <Form.Control type="text" id="id" name="id" value={newTipoCamion.id} onChange={handleChange} placeholder="Ingrese el ID del tipo de camión" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="nombre">Nombre</Form.Label>
                <Form.Control type="text" id="nombre" name="nombre" value={newTipoCamion.nombre} onChange={handleChange} placeholder="Ingrese el nombre del tipo de camión" />
              </Form.Group>
              <Button type="submit" variant="primary" className="mb-3">{editTipoCamion ? 'Actualizar' : 'Registrar'}</Button>
            </Form>
          </Col>
        </Row>

        {showTable && (
          <Row>
            <Col xs={12}>
              <h3>Lista de Tipos de Camión</h3>
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
                    {tiposCamion.length > 0 ? (
                      tiposCamion.map(tipoCamion => (
                        <tr key={tipoCamion.ID}>
                          <td>{tipoCamion.ID}</td>
                          <td>{tipoCamion.NOMBRE}</td>
                          <td>
                            <Button variant="warning" size="sm" onClick={() => handleEdit(tipoCamion)}>Editar</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(tipoCamion.ID)}>Eliminar</Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">No se encontraron tipos de camión</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default GestionTiposCamion;
