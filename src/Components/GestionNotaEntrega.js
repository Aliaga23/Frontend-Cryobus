import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import styles from '../Assets/gestion_empleados.module.css';

const GestionNotaEntrega = () => {
  const [notasEntrega, setNotasEntrega] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [reembolsos, setReembolsos] = useState([]);
  const [notasTraslado, setNotasTraslado] = useState([]);
  const [tiposEnvio, setTiposEnvio] = useState([]);
  const [estadosEntrega, setEstadosEntrega] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [newNotaEntrega, setNewNotaEntrega] = useState({
    NRO: '',
    FECHARECEPCION: '',
    HORARECEPCION: '',
    FECHAENTREGA: '',
    HORAENTREGA: '',
    PRECIOESTIMADO: '',
    CODIGOCLIENTEENVIA: '',
    CODIGOCLIENTERECIBE: '',
    IDUSUARIOENVIA: '',
    IDUSUARIORECIBE: '',
    IDTIPOENVIO: '',
    IDESTADOENTREGA: '',
    NROREEMBOLSO: '',
    CODIGOPAQUETE: '',
    NRONOTATRASLADO: ''
  });
  const [editNotaEntrega, setEditNotaEntrega] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [error, setError] = useState(null);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchNotasEntrega = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/notasEntrega`);
      setNotasEntrega(response.data);
      setShowTable(true);
    } catch (error) {
      setError('Error al obtener las notas de entrega');
      console.error('Error al obtener las notas de entrega:', error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/clientes`);
      setClientes(response.data);
    } catch (error) {
      setError('Error al obtener los clientes');
      console.error('Error al obtener los clientes:', error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/notasEntrega/usuarios`);
      setUsuarios(response.data);
    } catch (error) {
      setError('Error al obtener los usuarios');
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const fetchReembolsos = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/notasEntrega/reembolsos`);
      setReembolsos(response.data);
    } catch (error) {
      setError('Error al obtener los reembolsos');
      console.error('Error al obtener los reembolsos:', error);
    }
  };

  const fetchNotasTraslado = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/notasEntrega/notasTraslado`);
      setNotasTraslado(response.data);
    } catch (error) {
      setError('Error al obtener las notas de traslado');
      console.error('Error al obtener las notas de traslado:', error);
    }
  };

  const fetchTiposEnvio = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/tipoEnvio`);
      setTiposEnvio(response.data);
    } catch (error) {
      setError('Error al obtener los tipos de envío');
      console.error('Error al obtener los tipos de envío:', error);
    }
  };

  const fetchEstadosEntrega = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/estadosEntrega`);
      setEstadosEntrega(response.data);
    } catch (error) {
      setError('Error al obtener los estados de entrega');
      console.error('Error al obtener los estados de entrega:', error);
    }
  };

  const fetchPaquetes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/paquetes`);
      setPaquetes(response.data);
    } catch (error) {
      setError('Error al obtener los paquetes');
      console.error('Error al obtener los paquetes:', error);
    }
  };

  useEffect(() => {
    fetchNotasEntrega();
    fetchClientes();
    fetchUsuarios();
    fetchReembolsos();
    fetchNotasTraslado();
    fetchTiposEnvio();
    fetchEstadosEntrega();
    fetchPaquetes();
  }, []);

  const handleChange = (e) => {
    setNewNotaEntrega({ ...newNotaEntrega, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      NRO, FECHARECEPCION, HORARECEPCION, FECHAENTREGA, HORAENTREGA,
      PRECIOESTIMADO, CODIGOCLIENTEENVIA, CODIGOCLIENTERECIBE, IDUSUARIOENVIA,
      IDUSUARIORECIBE, IDTIPOENVIO, IDESTADOENTREGA, NROREEMBOLSO,
      CODIGOPAQUETE, NRONOTATRASLADO
    } = newNotaEntrega;

    if (!NRO || !FECHARECEPCION || !HORARECEPCION || !FECHAENTREGA || !HORAENTREGA ||
        !PRECIOESTIMADO || !CODIGOCLIENTEENVIA || !CODIGOCLIENTERECIBE || !IDUSUARIOENVIA ||
        !IDUSUARIORECIBE || !IDTIPOENVIO || !IDESTADOENTREGA || !NROREEMBOLSO ||
        !CODIGOPAQUETE || !NRONOTATRASLADO) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    try {
      if (editNotaEntrega) {
        await axios.put(`${backendUrl}/api/notasEntrega/${editNotaEntrega.NRO}`, newNotaEntrega);
        setEditNotaEntrega(null);
      } else {
        await axios.post(`${backendUrl}/api/notasEntrega`, newNotaEntrega);
      }
      setNewNotaEntrega({
        NRO: '', FECHARECEPCION: '', HORARECEPCION: '', FECHAENTREGA: '', HORAENTREGA: '',
        PRECIOESTIMADO: '', CODIGOCLIENTEENVIA: '', CODIGOCLIENTERECIBE: '', IDUSUARIOENVIA: '',
        IDUSUARIORECIBE: '', IDTIPOENVIO: '', IDESTADOENTREGA: '', NROREEMBOLSO: '',
        CODIGOPAQUETE: '', NRONOTATRASLADO: ''
      });
      fetchNotasEntrega();
    } catch (error) {
      setError('Error al registrar la nota de entrega');
      console.error('Error al registrar la nota de entrega:', error);
    }
  };

  const handleEdit = (notaEntrega) => {
    setNewNotaEntrega({
      NRO: notaEntrega.NRO,
      FECHARECEPCION: notaEntrega.FECHARECEPCION,
      HORARECEPCION: notaEntrega.HORARECEPCION,
      FECHAENTREGA: notaEntrega.FECHAENTREGA,
      HORAENTREGA: notaEntrega.HORAENTREGA,
      PRECIOESTIMADO: notaEntrega.PRECIOESTIMADO,
      CODIGOCLIENTEENVIA: notaEntrega.CODIGOCLIENTEENVIA,
      CODIGOCLIENTERECIBE: notaEntrega.CODIGOCLIENTERECIBE,
      IDUSUARIOENVIA: notaEntrega.IDUSUARIOENVIA,
      IDUSUARIORECIBE: notaEntrega.IDUSUARIORECIBE,
      IDTIPOENVIO: notaEntrega.IDTIPOENVIO,
      IDESTADOENTREGA: notaEntrega.IDESTADOENTREGA,
      NROREEMBOLSO: notaEntrega.NROREEMBOLSO,
      CODIGOPAQUETE: notaEntrega.CODIGOPAQUETE,
      NRONOTATRASLADO: notaEntrega.NRONOTATRASLADO
    });
    setEditNotaEntrega(notaEntrega);
  };

  const handleDelete = async (nro) => {
    try {
      await axios.delete(`${backendUrl}/api/notasEntrega/${nro}`);
      fetchNotasEntrega();
    } catch (error) {
      setError('Error al eliminar la nota de entrega');
      console.error('Error al eliminar la nota de entrega:', error);
    }
  };

  return (
    <Container className="mt-5">
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mb-5">
        <Col xs={12}>
          <h3>{editNotaEntrega ? 'Editar Nota de Entrega' : 'Registrar Nueva Nota de Entrega'}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className={styles.formGroup}>
              <Form.Label htmlFor="NRO" className={styles.formLabel}>Número</Form.Label>
              <Form.Control 
                 
                id="NRO" 
                name="NRO" 
                value={newNotaEntrega.NRO} 
                onChange={handleChange} 
                placeholder="Ingrese el número de la nota de entrega" 
                className="form-control form-control-sm mb-3" />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label htmlFor="FECHARECEPCION" className={styles.formLabel}>Fecha de Recepción</Form.Label>
              <Form.Control 
                type="date" 
                id="FECHARECEPCION" 
                name="FECHARECEPCION" 
                value={newNotaEntrega.FECHARECEPCION} 
                onChange={handleChange} 
                className="form-control form-control-sm mb-3" />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label htmlFor="HORARECEPCION" className={styles.formLabel}>Hora de Recepción</Form.Label>
              <Form.Control 
                type="time" 
                id="HORARECEPCION" 
                name="HORARECEPCION" 
                value={newNotaEntrega.HORARECEPCION} 
                onChange={handleChange} 
                className="form-control form-control-sm mb-3" />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label htmlFor="FECHAENTREGA" className={styles.formLabel}>Fecha de Entrega</Form.Label>
              <Form.Control 
                type="date" 
                id="FECHAENTREGA" 
                name="FECHAENTREGA" 
                value={newNotaEntrega.FECHAENTREGA} 
                onChange={handleChange} 
                className="form-control form-control-sm mb-3" />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label htmlFor="HORAENTREGA" className={styles.formLabel}>Hora de Entrega</Form.Label>
              <Form.Control 
                type="time" 
                id="HORAENTREGA" 
                name="HORAENTREGA" 
                value={newNotaEntrega.HORAENTREGA} 
                onChange={handleChange} 
                className="form-control form-control-sm mb-3" />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label htmlFor="PRECIOESTIMADO" className={styles.formLabel}>Precio Estimado</Form.Label>
              <Form.Control 
                type="number" ////cambiar , sin tipo
                id="PRECIOESTIMADO" 
                name="PRECIOESTIMADO" 
                value={newNotaEntrega.PRECIOESTIMADO} 
                onChange={handleChange} 
                placeholder="Ingrese el precio estimado" 
                className="form-control form-control-sm mb-3" />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label htmlFor="CODIGOCLIENTEENVIA" className={styles.formLabel}>Código Cliente Envia</Form.Label>
              <Form.Control 
                as="select" 
                id="CODIGOCLIENTEENVIA" 
                name="CODIGOCLIENTEENVIA" 
                value={newNotaEntrega.CODIGOCLIENTEENVIA} 
                onChange={handleChange} 
                className="form-control form-control-sm mb-3">
                <option value="">Seleccione un cliente</option>
                {clientes.map(cliente => (
                  <option key={cliente.CODIGO} value={cliente.CODIGO}>{cliente.NOMBRES} {cliente.APELLIDOS}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label htmlFor="CODIGOCLIENTERECIBE" className={styles.formLabel}>Código Cliente Recibe</Form.Label>
              <Form.Control 
                as="select" 
                id="CODIGOCLIENTERECIBE" 
                name="CODIGOCLIENTERECIBE" 
                value={newNotaEntrega.CODIGOCLIENTERECIBE} 
                onChange={handleChange} 
                className="form-control form-control-sm mb-3">
                <option value="">Seleccione un cliente</option>
                {clientes.map(cliente => (
                  <option key={cliente.CODIGO} value={cliente.CODIGO}>{cliente.NOMBRES} {cliente.APELLIDOS}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label htmlFor="IDUSUARIOENVIA" className={styles.formLabel}>ID Usuario Envia</Form.Label>
              <Form.Control 
                as="select" 
                id="IDUSUARIOENVIA" 
                name="IDUSUARIOENVIA" 
                value={newNotaEntrega.IDUSUARIOENVIA} 
                onChange={handleChange} 
                className="form-control form-control-sm mb-3">
                <option value="">Seleccione un usuario</option>
                {usuarios.map(usuario => (
                  <option key={usuario.ID} value={usuario.ID}>{usuario.NOMBRES} {usuario.APELLIDOS}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label htmlFor="IDUSUARIORECIBE" className={styles.formLabel}>ID Usuario Recibe</Form.Label>
              <Form.Control 
                as="select" 
                id="IDUSUARIORECIBE" 
                name="IDUSUARIORECIBE" 
                value={newNotaEntrega.IDUSUARIORECIBE} 
                onChange={handleChange} 
                className="form-control form-control-sm mb-3">
                <option value="">Seleccione un usuario</option>
                {usuarios.map(usuario => (
                  <option key={usuario.ID} value={usuario.ID}>{usuario.NOMBRES} {usuario.APELLIDOS}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label htmlFor="IDTIPOENVIO" className={styles.formLabel}>Tipo de Envio</Form.Label>
              <Form.Control 
                as="select" 
                id="IDTIPOENVIO" 
                name="IDTIPOENVIO" 
                value={newNotaEntrega.IDTIPOENVIO} 
                onChange={handleChange} 
                className="form-control form-control-sm mb-3">
                <option value="">Seleccione un tipo de envío</option>
                {tiposEnvio.map(tipo => (
                  <option key={tipo.ID} value={tipo.ID}>{tipo.NOMBRE}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label htmlFor="IDESTADOENTREGA" className={styles.formLabel}>Estado de Entrega</Form.Label>
              <Form.Control 
                as="select" 
                id="IDESTADOENTREGA" 
                name="IDESTADOENTREGA" 
                value={newNotaEntrega.IDESTADOENTREGA} 
                onChange={handleChange} 
                className="form-control form-control-sm mb-3">
                <option value="">Seleccione un estado de entrega</option>
                {estadosEntrega.map(estado => (
                  <option key={estado.ID} value={estado.ID}>{estado.NOMBRE}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label htmlFor="NROREEMBOLSO" className={styles.formLabel}>Número de Reembolso</Form.Label>
              <Form.Control 
                as="select" 
                id="NROREEMBOLSO" 
                name="NROREEMBOLSO" 
                value={newNotaEntrega.NROREEMBOLSO} 
                onChange={handleChange} 
                className="form-control form-control-sm mb-3">
                <option value="">Seleccione un reembolso</option>
                {reembolsos.map(reembolso => (
                  <option key={reembolso.NRO} value={reembolso.NRO}>{reembolso.NRO}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label htmlFor="CODIGOPAQUETE" className={styles.formLabel}>Código de Paquete</Form.Label>
              <Form.Control 
                as="select" 
                id="CODIGOPAQUETE" 
                name="CODIGOPAQUETE" 
                value={newNotaEntrega.CODIGOPAQUETE} 
                onChange={handleChange} 
                className="form-control form-control-sm mb-3">
                <option value="">Seleccione un paquete</option>
                {paquetes.map(paquete => (
                  <option key={paquete.CODIGO} value={paquete.CODIGO}>{paquete.CODIGO}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className={styles.formGroup }>
              <Form.Label htmlFor="NRONOTATRASLADO" className={styles.formLabel}>Número de Nota de Traslado</Form.Label>
              <Form.Control 
                as="select" 
                id="NRONOTATRASLADO" 
                name="NRONOTATRASLADO" 
                value={newNotaEntrega.NRONOTATRASLADO} 
                onChange={handleChange} 
                className="form-control form-control-sm mb-3">
                <option value="">Seleccione una nota de traslado</option>
                {notasTraslado.map(nota => (
                  <option key={nota.NRO} value={nota.NRO}>{nota.NRO}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="submit-button">{editNotaEntrega ? 'Actualizar' : 'Registrar'}</Button>
          </Form>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col xs={12}>
          <h3>Lista de Notas de Entrega</h3>
          {showTable && (
            <div className="table-responsive">
              <Table bordered className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Número</th>
                    <th>Fecha de Recepción</th>
                    <th>Hora de Recepción</th>
                    <th>Fecha de Entrega</th>
                    <th>Hora de Entrega</th>
                    <th>Precio Estimado</th>
                    <th>Código Cliente Envia</th>
                    <th>Código Cliente Recibe</th>
                    <th>ID Usuario Envia</th>
                    <th>ID Usuario Recibe</th>
                    <th>Tipo de Envio</th>
                    <th>Estado de Entrega</th>
                    <th>Número de Reembolso</th>
                    <th>Código de Paquete</th>
                    <th>Número de Nota de Traslado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {notasEntrega.map(notaEntrega => (
                    <tr key={notaEntrega.NRO}>
                      <td>{notaEntrega.NRO}</td>
                      <td>{notaEntrega.FECHARECEPCION}</td>
                      <td>{notaEntrega.HORARECEPCION}</td>
                      <td>{notaEntrega.FECHAENTREGA}</td>
                      <td>{notaEntrega.HORAENTREGA}</td>
                      <td>{notaEntrega.PRECIOESTIMADO}</td>
                      <td>{clientes.find(cliente => cliente.CODIGO === notaEntrega.CODIGOCLIENTEENVIA)?.NOMBRES} {clientes.find(cliente => cliente.CODIGO === notaEntrega.CODIGOCLIENTEENVIA)?.APELLIDOS}</td>
                      <td>{clientes.find(cliente => cliente.CODIGO === notaEntrega.CODIGOCLIENTERECIBE)?.NOMBRES} {clientes.find(cliente => cliente.CODIGO === notaEntrega.CODIGOCLIENTERECIBE)?.APELLIDOS}</td>
                      <td>{usuarios.find(usuario => usuario.ID === notaEntrega.IDUSUARIOENVIA)?.NOMBRES} {usuarios.find(usuario => usuario.ID === notaEntrega.IDUSUARIOENVIA)?.APELLIDOS}</td>
                      <td>{usuarios.find(usuario => usuario.ID === notaEntrega.IDUSUARIORECIBE)?.NOMBRES} {usuarios.find(usuario => usuario.ID === notaEntrega.IDUSUARIORECIBE)?.APELLIDOS}</td>
                      <td>{tiposEnvio.find(tipo => tipo.ID === notaEntrega.IDTIPOENVIO)?.NOMBRE}</td>
                      <td>{estadosEntrega.find(estado => estado.ID === notaEntrega.IDESTADOENTREGA)?.NOMBRE}</td>
                      <td>{notaEntrega.NROREEMBOLSO}</td>
                      <td>{paquetes.find(paquete => paquete.CODIGO === notaEntrega.CODIGOPAQUETE)?.CODIGO}</td>
                      <td>{notasTraslado.find(nota => nota.NRO === notaEntrega.NRONOTATRASLADO)?.NRO}</td>
                      <td>
                        <Button variant="warning" size="sm" onClick={() => handleEdit(notaEntrega)}>Editar</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(notaEntrega.NRO)}>Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GestionNotaEntrega;
