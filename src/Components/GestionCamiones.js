import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import styles from '../Assets/gestion_empleados.module.css';

const GestionCamiones = () => {
  const [camiones, setCamiones] = useState([]);
  const [tiposCamion, setTiposCamion] = useState([]);
  const [newCamion, setNewCamion] = useState({
    nro: '',
    idTipoCamion: ''
  });
  const [editCamion, setEditCamion] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchCamiones = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/camiones`);
      setCamiones(response.data);
      setShowTable(true);
    } catch (error) {
      console.error('Error al obtener los camiones:', error);
    }
  };

  const fetchTiposCamion = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/tiposCamion`);
      setTiposCamion(response.data);
    } catch (error) {
      console.error('Error al obtener los tipos de camión:', error);
    }
  };

  useEffect(() => {
    fetchCamiones();
    fetchTiposCamion();
  }, []);

  const handleChange = (e) => {
    setNewCamion({ ...newCamion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editCamion) {
        await axios.put(`${backendUrl}/api/camiones/${editCamion.NRO}`, newCamion);
        setEditCamion(null);
      } else {
        await axios.post(`${backendUrl}/api/camiones`, newCamion);
      }
      setNewCamion({ nro: '', idTipoCamion: '' });
      fetchCamiones();
    } catch (error) {
      console.error('Error al registrar el camión:', error);
    }
  };

  const handleEdit = (camion) => {
    setNewCamion({
      nro: camion.NRO,
      idTipoCamion: camion.IDTIPOCAMION
    });
    setEditCamion(camion);
  };

  const handleDelete = async (nro) => {
    try {
      await axios.delete(`${backendUrl}/api/camiones/${nro}`);
      fetchCamiones();
    } catch (error) {
      console.error('Error al eliminar el camión:', error);
    }
  };

  return (
    <div className={styles.gestionContainer}>
      <Container className="mt-4">
        <Row className="mb-4">
          <Col xs={12}>
            <h3>{editCamion ? 'Editar Camión' : 'Registrar Nuevo Camión'}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mt-4">
                <Form.Label htmlFor="nro">Número</Form.Label>
                <Form.Control type="text" id="nro" name="nro" value={newCamion.nro} onChange={handleChange} placeholder="Ingrese el número del camión" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="idTipoCamion">Tipo de Camión</Form.Label>
                <Form.Control as="select" id="idTipoCamion" name="idTipoCamion" value={newCamion.idTipoCamion} onChange={handleChange}>
                  <option value="">Seleccione un tipo de camión</option>
                  {tiposCamion.map(tipo => (
                    <option key={tipo.ID} value={tipo.ID}>{tipo.NOMBRE}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary" className="mb-3">{editCamion ? 'Actualizar' : 'Registrar'}</Button>
            </Form>
          </Col>
        </Row>

        {showTable && (
          <Row>
            <Col xs={12}>
              <h3>Lista de Camiones</h3>
              <div className="table-responsive">
                <Table bordered>
                  <thead className="thead-light">
                    <tr>
                      <th>Número</th>
                      <th>Tipo de Camión</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {camiones.length > 0 ? (
                      camiones.map(camion => (
                        <tr key={camion.NRO}>
                          <td>{camion.NRO}</td>
                          <td>{tiposCamion.find(tipo => tipo.ID === camion.IDTIPOCAMION)?.NOMBRE}</td>
                          <td>
                            <Button variant="warning" size="sm" onClick={() => handleEdit(camion)}>Editar</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(camion.NRO)}>Eliminar</Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">No se encontraron camiones</td>
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

export default GestionCamiones;