import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import GestionReembolso from './GestionarReembolso'; // Importa el componente de Gestión de Reembolso
import styles from '../Assets/gestion_empleados.module.css';
import { jwtDecode } from 'jwt-decode'; // Para decodificar el token JWT

const RegistrarEntrega = () => {
  const [entregas, setEntregas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tiposEnvio, setTiposEnvio] = useState([]);
  const [reembolsos, setReembolsos] = useState([]);
  const [notasTraslado, setNotasTraslado] = useState([]);
  const [showModalReembolso, setShowModalReembolso] = useState(false); // Estado para el modal de reembolso
  const [searchNRO, setSearchNRO] = useState(''); // Estado para el campo de búsqueda
  const [newEntrega, setNewEntrega] = useState({
    nroReembolso: '', // Campo para el reembolso
    nroNotaTraslado: '', // Campo para la nota de traslado
    NRO: '' // Campo para el NRO de entrega (si se encuentra)
  });

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';
  const token = localStorage.getItem('token');
  const user = jwtDecode(token); // Decodificar el token para obtener información del usuario
  const userId = user.userId; // Obtener el ID del usuario

  const fetchEntregas = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/entregas`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntregas(response.data);
    } catch (error) {
      console.error('Error al obtener las entregas:', error);
    }
  }, [backendUrl, token]);

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

  const fetchReembolsos = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/reembolsos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReembolsos(response.data);
    } catch (error) {
      console.error('Error al obtener los reembolsos:', error);
    }
  }, [backendUrl, token]);

  const fetchNotasTraslado = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/notasTraslado`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotasTraslado(response.data);
    } catch (error) {
      console.error('Error al obtener las notas de traslado:', error);
    }
  }, [backendUrl, token]);

  useEffect(() => {
    fetchEntregas();
    fetchClientes();
    fetchTiposEnvio();
    fetchReembolsos();
    fetchNotasTraslado();
  }, [fetchEntregas, fetchClientes, fetchTiposEnvio, fetchReembolsos, fetchNotasTraslado]);

  const handleSearch = async () => {
    if (searchNRO) {
      try {
        const response = await axios.get(`${backendUrl}/api/entregas/${searchNRO}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const entrega = response.data;
        if (entrega) {
          setNewEntrega({
            nroReembolso: entrega.NROREEMBOLSO || '',
            nroNotaTraslado: entrega.NRONOTATRASLADO || '',
            NRO: entrega.NRO
          });
          Swal.fire({
            title: 'Entrega encontrada',
            text: `Se encontró la entrega con NRO ${searchNRO}.`,
            icon: 'success'
          });
        } else {
          Swal.fire({
            title: 'No encontrado',
            text: `No se encontró ninguna entrega con NRO ${searchNRO}.`,
            icon: 'error'
          });
        }
      } catch (error) {
        console.error('Error al buscar la entrega:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al buscar la entrega.',
          icon: 'error'
        });
      }
    }
  };

  const handleChangeEntrega = (e) => {
    const { name, value } = e.target;
    setNewEntrega({ ...newEntrega, [name]: value });
  };

  const handleSubmitEntrega = async (e) => {
    e.preventDefault();
    try {
      const method = newEntrega.NRO ? 'put' : 'post';
      const url = `${backendUrl}/api/entregas${method === 'put' ? `/${newEntrega.NRO}` : ''}`;
      await axios[method](url, {
        ...newEntrega,
        IDUSUARIORECIBE: userId, // Usar el ID del usuario en sesión
        fechaEntrega: new Date().toISOString().split('T')[0],
        horaEntrega: new Date().toTimeString().split(' ')[0],
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire({
        title: newEntrega.NRO ? '¡Entrega actualizada!' : '¡Entrega registrada!',
        text: newEntrega.NRO ? 'La entrega se ha actualizado correctamente.' : 'La entrega se ha registrado correctamente.',
        icon: 'success'
      });
      fetchEntregas();
      setNewEntrega({
        nroReembolso: '',
        nroNotaTraslado: '',
        NRO: ''
      });
      setSearchNRO(''); // Reset search field
    } catch (error) {
      console.error('Error al registrar la entrega:', error);
    }
  };

  const handleShowModalReembolso = () => {
    setShowModalReembolso(true);
  };

  const closeModalReembolso = () => {
    setShowModalReembolso(false);
    fetchReembolsos(); // Refrescar la lista de reembolsos después de gestionar
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
          <h3>Registrar Entrega</h3>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label htmlFor="searchNRO">Buscar NRO de Entrega</Form.Label>
                <Form.Control
                  type="text"
                  id="searchNRO"
                  value={searchNRO}
                  onChange={(e) => setSearchNRO(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="primary" className="mt-4" onClick={handleSearch}>
                Buscar
              </Button>
            </Col>
          </Row>
          <Form onSubmit={handleSubmitEntrega}>
            <Form.Group>
              <Form.Label htmlFor="nroReembolso">Reembolso</Form.Label>
              <Form.Control
                as="select"
                id="NROREEMBOLSO"
                name="NROREEMBOLSO"
                value={newEntrega.NROREEMBOLSO}
                onChange={handleChangeEntrega}
              >
                <option value="">Seleccione un reembolso</option>
                {reembolsos.map(reembolso => (
                  <option key={reembolso.NRO} value={reembolso.NRO}>
                    {reembolso.NRO}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="nroNotaTraslado">Nota de Traslado</Form.Label>
              <Form.Control
                as="select"
                id="NRONOTATRASLADO"
                name="NRONOTATRASLADO"
                value={newEntrega.NRONOTATRASLADO}
                onChange={handleChangeEntrega}
              >
                <option value="">Seleccione una nota de traslado</option>
                {notasTraslado.map(nota => (
                  <option key={nota.NRO} value={nota.NRO}>
                    {nota.NRO}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2 w-100">
              {newEntrega.NRO ? 'Actualizar' : 'Registrar'}
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col className="">
          <Button variant="info" size="md" style={{ width: '150px', marginRight: '10px' }} onClick={handleShowModalReembolso}>Gestionar Reembolsos</Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col xs={12}>
          <h3 className="text-center">Entregas Registradas</h3>
          <Table bordered responsive>
            <thead className="thead-light">
              <tr>
                <th>Número</th>
                <th>Fecha Entrega</th>
                <th>Hora Entrega</th>
                <th>Precio Estimado</th>
                <th>Cliente Envia</th>
                <th>Cliente Recibe</th>
                <th>Tipo Envío</th>
                <th>Plan Ruta</th>
                <th>Estado Entrega</th>
                <th>Usuario Entregando</th>
                <th>Paquete</th>
                <th>Reembolso</th>
                <th>Nota de Traslado</th>
              </tr>
            </thead>
            <tbody>
              {entregas.map(entrega => (
                <tr key={entrega.NRO}>
                  <td>{entrega.NRO}</td>
                  <td>{entrega.FECHAENTREGA}</td>
                  <td>{entrega.HORAENTREGA}</td>
                  <td>{entrega.PRECIOESTIMADO}</td>
                  <td>{getClienteNombre(entrega.CODIGOCLIENTEENVIA)}</td>
                  <td>{getClienteNombre(entrega.CODIGOCLIENTERECIBE)}</td>
                  <td>{getTipoEnvioNombre(entrega.IDTIPOENVIO)}</td>
                  <td>{entrega.IDPLANDERUTA}</td>
                  <td>{entrega.IDESTADOENTREGA}</td>
                  <td>{entrega.IDUSUARIORECIBE}</td>
                  <td>{entrega.CODIGOPAQUETE}</td>
                  <td>{entrega.NROREEMBOLSO}</td>
                  <td>{entrega.NRONOTATRASLADO}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModalReembolso} onHide={closeModalReembolso}>
        <Modal.Header closeButton>
          <Modal.Title>Gestionar Reembolsos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GestionReembolso />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalReembolso}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RegistrarEntrega;
