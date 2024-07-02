import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';
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
  const [showModal, setShowModal] = useState(false);
  const [celulares, setCelulares] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [newCelular, setNewCelular] = useState('');

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';
  const token = localStorage.getItem('token');

  const fetchClientes = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/clientes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClientes(response.data);
      setShowTable(true);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  }, [backendUrl, token]);

  const fetchCelulares = async (codigoCliente) => {
    try {
      const response = await axios.get(`${backendUrl}/api/celulares/${codigoCliente}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCelulares(response.data);
    } catch (error) {
      console.error('Error al obtener los celulares del cliente:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  const handleChange = (e) => {
    setNewCliente({ ...newCliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editCliente) {
        await axios.put(`${backendUrl}/api/clientes/${editCliente.CODIGO}`, newCliente, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEditCliente(null);
      } else {
        await axios.post(`${backendUrl}/api/clientes`, newCliente, {
          headers: { Authorization: `Bearer ${token}` }
        });
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
      await axios.delete(`${backendUrl}/api/clientes/${codigo}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchClientes();
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${backendUrl}/api/clientes/${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClientes([response.data]);
      setShowTable(true);
    } catch (error) {
      console.error('Error al buscar el cliente:', error);
    }
  };

  const handleCancelSearch = () => {
    setSearchTerm('');
    fetchClientes();
  };

  const handleAddCelular = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/celulares`, { codigoCliente: selectedCliente.CODIGO, numero: newCelular }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCelulares(selectedCliente.CODIGO);
      setNewCelular('');
    } catch (error) {
      console.error('Error al agregar el celular:', error);
    }
  };

  const handleDeleteCelular = async (codigoCliente, numero) => {
    try {
      await axios.delete(`${backendUrl}/api/celulares/${codigoCliente}/${numero}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCelulares(codigoCliente);
    } catch (error) {
      console.error('Error al eliminar el celular:', error);
    }
  };

  const openModal = (cliente) => {
    setSelectedCliente(cliente);
    fetchCelulares(cliente.CODIGO);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCliente(null);
    setCelulares([]);
  };

  return (
    <div className={styles.gestionContainer}>
      <Container className="mt-4">
        <Row className="mb-4">
          <Col xs={12}>
            <h3>{editCliente ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mt-4">
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
            <Form >
              <Row className="mb-3">
                <Col className="w-50">
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el código del cliente"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs="auto">
                  <Button  size="lg" variant="primary" style={{ width: '150px' }}onClick={handleSearch}>Buscar</Button>
                </Col>
                <Col xs="auto">
                  <Button size="lg" variant="dark" style={{ width: '150px' }} onClick={handleCancelSearch}>Cancelar</Button>
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
                    {clientes.length > 0 ? (
                      clientes.map(cliente => (
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
                            <Button variant="info" size="sm" onClick={() => openModal(cliente)}>Añadir Celular</Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">No se encontraron clientes</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        )}

        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Gestión de Celulares</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddCelular}>
              <Form.Group>
                <Form.Label>Nuevo Celular</Form.Label>
                <Form.Control type="text" value={newCelular} onChange={(e) => setNewCelular(e.target.value)} />
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-2">Añadir Celular</Button>
            </Form>
            <Table bordered className="mt-4">
              <thead>
                <tr>
                  <th>Celular</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {celulares.map(celular => (
                  <tr key={celular.NUMERO}>
                    <td>{celular.NUMERO}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteCelular(selectedCliente.CODIGO, celular.NUMERO)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Cerrar</Button>
          </Modal.Footer>
        </Modal>

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
