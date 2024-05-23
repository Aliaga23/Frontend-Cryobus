import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import styles from '../Assets/gestion_empleados.module.css';

const GestionClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [newCliente, setNewCliente] = useState({
    codigo: '',
    ci: '',
    complementoci: '',
    apellidos: '',
    nombres: '',
    direccion: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editCliente, setEditCliente] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchClientes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/clientes`);
      setClientes(response.data);
      setShowTable(true);
      setShowAll(true);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleChange = (e) => {
    setNewCliente({ ...newCliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editCliente) {
        await axios.put(`${backendUrl}/api/clientes/${editCliente.CODIGO}`, newCliente);
        setEditCliente(null);
      } else {
        await axios.post(`${backendUrl}/api/clientes`, newCliente);
      }
      setNewCliente({ codigo: '', ci: '', complementoci: '', apellidos: '', nombres: '', direccion: '' });
      fetchClientes();
    } catch (error) {
      console.error('Error al registrar el cliente:', error);
    }
  };

  const handleEdit = (cliente) => {
    setNewCliente({
      codigo: cliente.CODIGO,
      ci: cliente.CI,
      complementoci: cliente.COMPLEMENTOCI,
      apellidos: cliente.APELLIDOS,
      nombres: cliente.NOMBRES,
      direccion: cliente.DIRECCION
    });
    setEditCliente(cliente);
  };

  const handleDelete = async (codigo) => {
    try {
      await axios.delete(`${backendUrl}/api/clientes/${codigo}`);
      fetchClientes();
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${backendUrl}/api/clientes/${searchTerm}`);
      setClientes([response.data]);
      setShowTable(true);
      setShowAll(false);
    } catch (error) {
      console.error('Error al buscar el cliente:', error);
    }
  };

  return (
    <div className={styles.gestionContainer}>
      <Container className="mt-5">
        <Row className="mb-5">
          <Col xs={12}>
            <h3>{editCliente ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="codigo">Código</Form.Label>
                <Form.Control type="text" id="codigo" name="codigo" value={newCliente.codigo} onChange={handleChange} placeholder="Ingrese el código del cliente" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="ci">CI</Form.Label>
                <Form.Control type="text" id="ci" name="ci" value={newCliente.ci} onChange={handleChange} placeholder="Ingrese el CI del cliente" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="complementoci">Complemento CI</Form.Label>
                <Form.Control type="text" id="complementoci" name="complementoci" value={newCliente.complementoci} onChange={handleChange} placeholder="Ingrese el complemento del CI" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="apellidos">Apellidos</Form.Label>
                <Form.Control type="text" id="apellidos" name="apellidos" value={newCliente.apellidos} onChange={handleChange} placeholder="Ingrese los apellidos" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="nombres">Nombres</Form.Label>
                <Form.Control type="text" id="nombres" name="nombres" value={newCliente.nombres} onChange={handleChange} placeholder="Ingrese los nombres" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="direccion">Dirección</Form.Label>
                <Form.Control type="text" id="direccion" name="direccion" value={newCliente.direccion} onChange={handleChange} placeholder="Ingrese la dirección" />
              </Form.Group>
              <Button type="submit" variant="primary" className="mb-3">{editCliente ? 'Actualizar' : 'Registrar'}</Button>
            </Form>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col xs={12}>
            <h3>Buscar Clientes</h3>
            <Form onSubmit={handleSearch}>
              <Row className="mb-3">
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el código del cliente"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={6} sm={3}>
                  <Button type="submit" variant="primary" className="mb-3 w-100">Buscar</Button>
                </Col>
                <Col xs={6} sm={3}>
                  <Button variant="primary" className="mb-3 w-100" onClick={fetchClientes}>Mostrar Todos</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        {showTable && (
          <Row>
            <Col xs={12}>
              <h3>Lista de Clientes</h3>
              <div className="table-responsive">
                <Table bordered>
                  <thead className="thead-light">
                    <tr>
                      <th>Código</th>
                      <th>CI</th>
                      <th>Complemento CI</th>
                      <th>Apellidos</th>
                      <th>Nombres</th>
                      <th>Dirección</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {showAll
                      ? clientes.map(cliente => (
                          <tr key={cliente.CODIGO}>
                            <td>{cliente.CODIGO}</td>
                            <td>{cliente.CI}</td>
                            <td>{cliente.COMPLEMENTOCI}</td>
                            <td>{cliente.APELLIDOS}</td>
                            <td>{cliente.NOMBRES}</td>
                            <td>{cliente.DIRECCION}</td>
                            <td>
                              <Button variant="warning" size="sm" onClick={() => handleEdit(cliente)}>Editar</Button>
                              <Button variant="danger" size="sm" onClick={() => handleDelete(cliente.CODIGO)}>Eliminar</Button>
                            </td>
                          </tr>
                        ))
                      : clientes.length > 0 && (
                          <tr key={clientes[0].CODIGO}>
                            <td>{clientes[0].CODIGO}</td>
                            <td>{clientes[0].CI}</td>
                            <td>{clientes[0].COMPLEMENTOCI}</td>
                            <td>{clientes[0].APELLIDOS}</td>
                            <td>{clientes[0].NOMBRES}</td>
                            <td>{clientes[0].DIRECCION}</td>
                            <td>
                              <Button variant="warning" size="sm" onClick={() => handleEdit(clientes[0])}>Editar</Button>
                              <Button variant="danger" size="sm" onClick={() => handleDelete(clientes[0].CODIGO)}>Eliminar</Button>
                            </td>
                          </tr>
                        )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        )}

        <Row className="mt-5">
          <Col xs={12} className="text-center">
            <h5>Gestión de Clientes - CryoBus</h5>
            <p>Administre sus clientes de manera eficiente y fácil.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GestionClientes;
