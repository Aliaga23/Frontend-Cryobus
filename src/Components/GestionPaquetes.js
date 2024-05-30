import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import styles from '../Assets/gestion_empleados.module.css';

const GestionPaquetes = () => {
  const [paquetes, setPaquetes] = useState([]);
  const [newPaquete, setNewPaquete] = useState({
    codigo: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editPaquete, setEditPaquete] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchPaquetes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/paquetes`);
      setPaquetes(response.data);
      setShowTable(true);
    } catch (error) {
      console.error('Error al obtener los paquetes:', error);
    }
  };

  useEffect(() => {
    fetchPaquetes();
  }, []);

  const handleChange = (e) => {
    setNewPaquete({ ...newPaquete, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editPaquete) {
        await axios.put(`${backendUrl}/api/paquetes/${editPaquete.CODIGO}`, newPaquete);
        setEditPaquete(null);
      } else {
        await axios.post(`${backendUrl}/api/paquetes`, newPaquete);
      }
      setNewPaquete({ codigo: '' });
      fetchPaquetes();
    } catch (error) {
      console.error('Error al registrar el paquete:', error);
    }
  };

  const handleEdit = (paquete) => {
    setNewPaquete({
      codigo: paquete.CODIGO
    });
    setEditPaquete(paquete);
  };

  const handleDelete = async (codigo) => {
    try {
      await axios.delete(`${backendUrl}/api/paquetes/${codigo}`);
      fetchPaquetes();
    } catch (error) {
      console.error('Error al eliminar el paquete:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${backendUrl}/api/paquetes/${searchTerm}`);
      setPaquetes([response.data]);
      setShowTable(true);
    } catch (error) {
      console.error('Error al buscar el paquete:', error);
    }
  };

  return (
    <Container className={styles.gestionContainer}>
      <Row className="mt-5">
        <Col xs={12}>
          <h3>{editPaquete ? 'Editar Paquete' : 'Registrar Nuevo Paquete'}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="codigo">Código</Form.Label>
              <Form.Control type="text" id="codigo" name="codigo" value={newPaquete.codigo} onChange={handleChange} placeholder="Ingrese el código del paquete" />
            </Form.Group>
            <Button type="submit" variant="primary" className="mb-3">{editPaquete ? 'Actualizar' : 'Registrar'}</Button>
          </Form>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col xs={12}>
          <h3>Buscar Paquetes</h3>
          <Form onSubmit={handleSearch}>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el código del paquete"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col xs={6} sm={3}>
                <Button type="submit" variant="primary" className="mb-3 w-100">Buscar</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {showTable && (
        <Row>
          <Col xs={12}>
            <h3>Lista de Paquetes</h3>
            <div className="table-responsive">
              <Table bordered>
                <thead className="thead-light">
                  <tr>
                    <th>Código</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {paquetes.length > 0 ? (
                    paquetes.map(paquete => (
                      <tr key={paquete.CODIGO}>
                        <td>{paquete.CODIGO}</td>
                        <td>
                          <Button variant="warning" size="sm" onClick={() => handleEdit(paquete)}>Editar</Button>
                          <Button variant="danger" size="sm" onClick={() => handleDelete(paquete.CODIGO)}>Eliminar</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">No se encontraron paquetes</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default GestionPaquetes;
