import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import GestionPaquetes from './GestionPaquetes';
import GestionClientes from './GestionCliente';
import styles from '../Assets/gestion_empleados.module.css';
import {jwtDecode} from 'jwt-decode';

const RegistrarRecepcion = () => {
  const [recepciones, setRecepciones] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tiposEnvio, setTiposEnvio] = useState([]);
  const [planRutas, setPlanRutas] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [itemsPaquete, setItemsPaquete] = useState([]);
  const [newRecepcion, setNewRecepcion] = useState({
    CODIGOCLIENTEENVIA: '',
    CODIGOCLIENTERECIBE: '',
    IDTIPOENVIO: '',
    IDPLANDERUTA: '',
    PRECIOESTIMADO: '',
    CODIGOPAQUETE: ''
  });
  const [showModalPaquete, setShowModalPaquete] = useState(false);
  const [showModalCliente, setShowModalCliente] = useState(false);
  const [showItemsModal, setShowItemsModal] = useState(false);
  const [selectedRecepcionPaquete, setSelectedRecepcionPaquete] = useState(null);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';
  const token = localStorage.getItem('token');

  const user = jwtDecode(token);
  const userId = user.userId;

  const fetchClientes = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/clientes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  }, [backendUrl, token]);

  const fetchTiposEnvio = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/tipoEnvio`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTiposEnvio(response.data);
    } catch (error) {
      console.error('Error al obtener los tipos de envío:', error);
    }
  }, [backendUrl, token]);

  const fetchPlanRutas = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/planRuta`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlanRutas(response.data);
    } catch (error) {
      console.error('Error al obtener los planes de ruta:', error);
    }
  }, [backendUrl, token]);

  const fetchRecepciones = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/recepciones`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecepciones(response.data);
    } catch (error) {
      console.error('Error al obtener las recepciones:', error);
    }
  }, [backendUrl, token]);

  const fetchPaquetes = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/paquetes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPaquetes(response.data);
    } catch (error) {
      console.error('Error al obtener los paquetes:', error);
    }
  }, [backendUrl, token]);

  const fetchItemsPaquete = async (codigoPaquete) => {
    try {
      const response = await axios.get(`${backendUrl}/api/items/${codigoPaquete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItemsPaquete(response.data);
    } catch (error) {
      console.error('Error al obtener los ítems del paquete:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
    fetchTiposEnvio();
    fetchPlanRutas();
    fetchRecepciones();
    fetchPaquetes();
  }, [fetchClientes, fetchTiposEnvio, fetchPlanRutas, fetchRecepciones, fetchPaquetes]);

  const handleChangeRecepcion = (e) => {
    setNewRecepcion({ ...newRecepcion, [e.target.name]: e.target.value });
  };

  const handleSubmitRecepcion = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/recepciones`, {
        ...newRecepcion,
        IDUSUARIOENVIA: userId,
        IDESTADOENTREGA: 1,
        FECHARECEPCION: new Date().toISOString().split('T')[0],
        HORARECEPCION: new Date().toTimeString().split(' ')[0],
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire({
        title: '¡Recepción registrada!',
        text: 'La recepción se ha registrado correctamente.',
        icon: 'success'
      });
      fetchRecepciones();
      setNewRecepcion({
        CODIGOCLIENTEENVIA: '',
        CODIGOCLIENTERECIBE: '',
        IDTIPOENVIO: '',
        IDPLANDERUTA: '',
        PRECIOESTIMADO: '',
        CODIGOPAQUETE: ''
      });
      setItemsPaquete([]);
    } catch (error) {
      console.error('Error al registrar la recepción:', error);
    }
  };

  const handleSelectPaquete = async (e) => {
    setNewRecepcion({ ...newRecepcion, CODIGOPAQUETE: e.target.value });
    await fetchItemsPaquete(e.target.value);
    setShowItemsModal(true);
  };

  const handleShowModalPaquete = () => {
    setShowModalPaquete(true);
  };

  const handleShowModalCliente = () => {
    setShowModalCliente(true);
  };

  const closeModalPaquete = () => {
    setShowModalPaquete(false);
    fetchPaquetes();
  };

  const closeModalCliente = () => {
    setShowModalCliente(false);
    fetchClientes();
  };

  const closeItemsModal = () => {
    setShowItemsModal(false);
  };

  const handleVerPaquete = async (codigoPaquete) => {
    setSelectedRecepcionPaquete(codigoPaquete);
    await fetchItemsPaquete(codigoPaquete);
    setShowItemsModal(true);
  };

  const getClienteNombre = (codigo) => {
    const cliente = clientes.find(cliente => cliente.CODIGO === codigo);
    return cliente ? `${cliente.NOMBRES} ${cliente.APELLIDOS}` : '';
  };

  const getTipoEnvioNombre = (id) => {
    const tipoEnvio = tiposEnvio.find(tipo => tipo.ID === id);
    return tipoEnvio ? tipoEnvio.NOMBRE : '';
  };

  return (
    <Container className={`${styles.gestionContainer} p-3`} style={{ maxWidth: '1400px' }}>
      <Row className="mt-5 justify-content-center">
        <Col xs={12}>
          <h3>Registrar Recepción</h3>
          <Form onSubmit={handleSubmitRecepcion}>
            <Form.Group>
              <Form.Label htmlFor="codigoClienteEnvia">Cliente que Envia</Form.Label>
              <Form.Control as="select" id="CODIGOCLIENTEENVIA" name="CODIGOCLIENTEENVIA" value={newRecepcion.CODIGOCLIENTEENVIA} onChange={handleChangeRecepcion} required>
                <option value="">Seleccione un cliente</option>
                {clientes.map(cliente => (
                  <option key={cliente.CODIGO} value={cliente.CODIGO}>{cliente.NOMBRES} {cliente.APELLIDOS}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="codigoClienteRecibe">Cliente que Recibe</Form.Label>
              <Form.Control as="select" id="CODIGOCLIENTERECIBE" name="CODIGOCLIENTERECIBE" value={newRecepcion.CODIGOCLIENTERECIBE} onChange={handleChangeRecepcion} required>
                <option value="">Seleccione un cliente</option>
                {clientes.map(cliente => (
                  <option key={cliente.CODIGO} value={cliente.CODIGO}>{cliente.NOMBRES} {cliente.APELLIDOS}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="idTipoEnvio">Tipo de Envío</Form.Label>
              <Form.Control as="select" id="IDTIPOENVIO" name="IDTIPOENVIO" value={newRecepcion.IDTIPOENVIO} onChange={handleChangeRecepcion} required>
                <option value="">Seleccione un tipo de envío</option>
                {tiposEnvio.map(tipo => (
                  <option key={tipo.ID} value={tipo.ID}>{tipo.NOMBRE}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="idPlanRuta">Plan de Ruta</Form.Label>
              <Form.Control as="select" id="IDPLANDERUTA" name="IDPLANDERUTA" value={newRecepcion.IDPLANDERUTA} onChange={handleChangeRecepcion} required>
                <option value="">Seleccione un plan de ruta</option>
                {planRutas.map(plan => (
                  <option key={plan.ID} value={plan.ID}>{plan.NOMBRELOCALIDAD} - {plan.NOMBREDEPARTAMENTO}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="PRECIOESTIMADO">Costo Previsto</Form.Label>
              <Form.Control type="number" id="PRECIOESTIMADO" name="PRECIOESTIMADO" value={newRecepcion.PRECIOESTIMADO} onChange={handleChangeRecepcion} required />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="CODIGOPAQUETE">Seleccionar Paquete</Form.Label>
              <Form.Control as="select" id="CODIGOPAQUETE" name="CODIGOPAQUETE" value={newRecepcion.CODIGOPAQUETE} onChange={handleSelectPaquete} required>
                <option value="">Seleccione un paquete</option>
                {paquetes.map(paquete => (
                  <option key={paquete.CODIGO} value={paquete.CODIGO}>{paquete.CODIGO}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2 w-100">Registrar</Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col className="">
          <Button variant="info" size="md" style={{ width: '150px', marginRight: '10px' }} onClick={handleShowModalCliente}>Gestionar Clientes</Button>
          <Button variant="primary" size="md" style={{ width: '150px', marginLeft: '10px' }} onClick={handleShowModalPaquete}>Gestionar Paquetes</Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col xs={12}>
          <h3 className="text-center">Recepciones Registradas</h3>
          <Table bordered responsive>
            <thead className="thead-light">
              <tr>
                <th>Número</th>
                <th>Fecha Recepción</th>
                <th>Hora Recepción</th>
                <th>Precio Estimado</th>
                <th>Cliente Envia</th>
                <th>Cliente Recibe</th>
                <th>Tipo Envío</th>
                <th>Plan Ruta</th>
                <th>Estado Entrega</th>
                <th>Usuario Atendiendo</th>
                <th>Paquete</th>
              </tr>
            </thead>
            <tbody>
              {recepciones.map(recepcion => (
                <tr key={recepcion.NRO}>
                  <td>{recepcion.NRO}</td>
                  <td>{recepcion.FECHARECEPCION}</td>
                  <td>{recepcion.HORARECEPCION}</td>
                  <td>{recepcion.PRECIOESTIMADO}</td>
                  <td>{getClienteNombre(recepcion.CODIGOCLIENTEENVIA)}</td>
                  <td>{getClienteNombre(recepcion.CODIGOCLIENTERECIBE)}</td>
                  <td>{getTipoEnvioNombre(recepcion.IDTIPOENVIO)}</td>
                  <td>{recepcion.IDPLANDERUTA}</td>
                  <td>{recepcion.IDESTADOENTREGA}</td>
                  <td>{recepcion.IDUSUARIOENVIA}</td>
                  <td><Button variant="dark" size="sm" onClick={() => handleVerPaquete(recepcion.CODIGOPAQUETE)}>Ver Paquete {recepcion.CODIGOPAQUETE}</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModalPaquete} onHide={closeModalPaquete}>
        <Modal.Header closeButton>
          <Modal.Title>Gestionar Paquetes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GestionPaquetes onPaqueteCreated={fetchPaquetes} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalPaquete}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalCliente} onHide={closeModalCliente}>
        <Modal.Header closeButton>
          <Modal.Title>Gestionar Clientes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GestionClientes onClienteCreated={fetchClientes} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalCliente}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

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

export default RegistrarRecepcion;
