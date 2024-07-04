// components/RegistrarSalidaPaquete.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

const RegistrarSalidaPaquete = () => {
  const [conductores, setConductores] = useState([]);
  const [rolesConductor, setRolesConductor] = useState([]);
  const [camiones, setCamiones] = useState([]);
  const [notasEntrega, setNotasEntrega] = useState([]);
  const [notasTraslado, setNotasTraslado] = useState([]);
  const [itemsPaquete, setItemsPaquete] = useState([]);
  const [showItemsModal, setShowItemsModal] = useState(false);
  const [selectedRecepcionPaquete, setSelectedRecepcionPaquete] = useState(null);
  const [formData, setFormData] = useState({
    conductor: '',
    rolConductor: '',
    camion: '',
    codigoPaquete: ''
  });

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  useEffect(() => {
    fetchData();
    fetchNotasTraslado();
  }, []);

  const fetchData = async () => {
    try {
      const conductoresResponse = await axios.get(`${backendUrl}/api/conductores`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const rolesResponse = await axios.get(`${backendUrl}/api/rolConductor`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const camionesResponse = await axios.get(`${backendUrl}/api/camiones`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const notasEntregaResponse = await axios.get(`${backendUrl}/api/notasEntrega`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setConductores(conductoresResponse.data);
      setRolesConductor(rolesResponse.data);
      setCamiones(camionesResponse.data);
      setNotasEntrega(notasEntregaResponse.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const fetchNotasTraslado = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/registrarsalida`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotasTraslado(response.data);
    } catch (error) {
      console.error('Error al obtener las notas de traslado:', error);
    }
  };

  const fetchItemsPaquete = async (codigoPaquete) => {
    try {
      const response = await axios.get(`${backendUrl}/api/items/${codigoPaquete}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setItemsPaquete(response.data);
    } catch (error) {
      console.error('Error al obtener los ítems del paquete:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'codigoPaquete') {
      fetchItemsPaquete(value);
      setSelectedRecepcionPaquete(value);
      setShowItemsModal(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${backendUrl}/api/registrarsalida/registrar-salida-paquete`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFormData({ conductor: '', rolConductor: '', camion: '', codigoPaquete: '' });
      fetchNotasTraslado(); // Refrescar la tabla después de registrar
    } catch (error) {
      console.error('Error al registrar la salida del paquete:', error);
    }
  };

  const closeItemsModal = () => {
    setShowItemsModal(false);
    setSelectedRecepcionPaquete(null);
  };

  return (
    <Container className="mt-5">
      <Row className="mb-5">
        <Col md={12}>
          <h3>Registrar Salida de Paquete</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Conductor</Form.Label>
              <Form.Control as="select" name="conductor" value={formData.conductor} onChange={handleChange} required>
                <option value="">Seleccione un conductor</option>
                {conductores.map(conductor => (
                  <option key={conductor.CODIGO} value={conductor.CODIGO}>
                    {conductor.NOMBRES} {conductor.APELLIDOS}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Rol del Conductor</Form.Label>
              <Form.Control as="select" name="rolConductor" value={formData.rolConductor} onChange={handleChange} required>
                <option value="">Seleccione un rol</option>
                {rolesConductor.map(rol => (
                  <option key={rol.ID} value={rol.ID}>
                    {rol.ROL}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Camión</Form.Label>
              <Form.Control as="select" name="camion" value={formData.camion} onChange={handleChange} required>
                <option value="">Seleccione un camión</option>
                {camiones.map(camion => (
                  <option key={camion.NRO} value={camion.NRO}>
                    {camion.NRO}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Código del Paquete</Form.Label>
              <Form.Control as="select" name="codigoPaquete" value={formData.codigoPaquete} onChange={handleChange} required>
                <option value="">Seleccione un código de paquete</option>
                {notasEntrega.map(nota => (
                  <option key={nota.CODIGOPAQUETE} value={nota.CODIGOPAQUETE}>
                    {nota.CODIGOPAQUETE}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Registrar Salida
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h3>Salidas de Paquetes Registradas</h3>
          <Table bordered>
            <thead>
              <tr>
                <th>Número</th>
                <th>Fecha Salida</th>
                <th>Hora Salida</th>
                <th>Conductor</th>
                <th>Rol Conductor</th>
                <th>Camión</th>
                <th>Código Paquete</th>
              </tr>
            </thead>
            <tbody>
              {notasTraslado.map(nota => (
                <tr key={nota.NRO}>
                  <td>{nota.NRO}</td>
                  <td>{moment(nota.FECHASALIDAPAQUETE).utc().format('YYYY-MM-DD')}</td>
                  <td>{nota.HORASALIDAPAQUETE}</td>
                  <td>{nota.CONDUCTOR}</td>
                  <td>{nota.ROLCONDUCTOR}</td>
                  <td>{nota.CAMION}</td>
                  <td>{nota.CODIGOPAQUETE}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showItemsModal} onHide={closeItemsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Paquete: {selectedRecepcionPaquete}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered responsive>
            <thead className="thead-light">
              <tr>
                <th>Código del Paquete</th>
                <th>Item</th>
                <th>Descripción</th>
                <th>Peso Individual</th>
              </tr>
            </thead>
            <tbody>
              {itemsPaquete.map(item => (
                <tr key={item.NRO}>
                  <td>{item.CODIGOPAQUETE}</td>
                  <td>{item.NRO}</td>
                  <td>{item.DESCRIPCION}</td>
                  <td>{item.PESOINDIVIDUAL}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeItemsModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RegistrarSalidaPaquete;
