import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import styles from '../Assets/gestion_empleados.module.css';

const GestionUbicaciones = () => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [newUbicacion, setNewUbicacion] = useState({
    id: '',
    nombre: ''
  });
  const [editUbicacion, setEditUbicacion] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchUbicaciones = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/ubicaciones`);
      setUbicaciones(response.data);
      setShowTable(true);
    } catch (error) {
      console.error('Error al obtener las ubicaciones:', error);
    }
  };

  useEffect(() => {
    fetchUbicaciones();
  }, []);

  const handleChange = (e) => {
    setNewUbicacion({ ...newUbicacion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUbicacion) {
        await axios.put(`${backendUrl}/api/ubicaciones/${editUbicacion.ID}`, newUbicacion);
        setEditUbicacion(null);
      } else {
        await axios.post(`${backendUrl}/api/ubicaciones`, newUbicacion);
      }
      setNewUbicacion({ id: '', nombre: '' });
      fetchUbicaciones();
    } catch (error) {
      console.error('Error al registrar la ubicacion:', error);
    }
  };

  const handleEdit = (ubicacion) => {
    setNewUbicacion({
      id: ubicacion.ID,
      nombre: ubicacion.NOMBRE
    });
    setEditUbicacion(ubicacion);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/ubicaciones/${id}`);
      fetchUbicaciones();
    } catch (error) {
      console.error('Error al eliminar la ubicacion:', error);
    }
  };

  return (
    <div className={styles.gestionContainer}>
      <Container className="mt-4">
        <Row className="mb-4">
          <Col xs={12}>
            <h3>{editUbicacion ? 'Editar Ubicación' : 'Registrar Nueva Ubicación'}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mt-4">
                <Form.Label htmlFor="id">ID</Form.Label>
                <Form.Control type="text" id="id" name="id" value={newUbicacion.id} onChange={handleChange} placeholder="Ingrese el ID de la ubicación" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="nombre">Nombre</Form.Label>
                <Form.Control type="text" id="nombre" name="nombre" value={newUbicacion.nombre} onChange={handleChange} placeholder="Ingrese el nombre de la ubicación" />
              </Form.Group>
              <Button type="submit" variant="primary" className="mb-3">{editUbicacion ? 'Actualizar' : 'Registrar'}</Button>
            </Form>
          </Col>
        </Row>

        {showTable && (
          <Row>
            <Col xs={12}>
              <h3>Lista de Ubicaciones</h3>
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
                    {ubicaciones.length > 0 ? (
                      ubicaciones.map(ubicacion => (
                        <tr key={ubicacion.ID}>
                          <td>{ubicacion.ID}</td>
                          <td>{ubicacion.NOMBRE}</td>
                          <td>
                            <Button variant="warning" size="sm" onClick={() => handleEdit(ubicacion)}>Editar</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(ubicacion.ID)}>Eliminar</Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">No se encontraron ubicaciones</td>
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

export default GestionUbicaciones;
