import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import styles from '../Assets/gestion_empleados.module.css';

const GestionNotasTraslado = () => {
  const [notasTraslado, setNotasTraslado] = useState([]);
  const [camiones, setCamiones] = useState([]);
  const [planRutas, setPlanRutas] = useState([]);
  const [newNotaTraslado, setNewNotaTraslado] = useState({
    nro: '',
    fechaLlegada: '',
    horaLlegada: '',
    fechaSalida: '',
    horaSalida: '',
    nroCamion: '',
    idPlanRuta: ''
  });
  const [editNotaTraslado, setEditNotaTraslado] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchNotasTraslado = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/notasTraslado`);
      setNotasTraslado(response.data);
      setShowTable(true);
    } catch (error) {
      console.error('Error al obtener las notas de traslado:', error);
    }
  };

  const fetchCamiones = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/camiones`);
      setCamiones(response.data);
    } catch (error) {
      console.error('Error al obtener los camiones:', error);
    }
  };

  const fetchPlanRutas = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${backendUrl}/api/planRuta`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlanRutas(response.data);
    } catch (error) {
      console.error('Error al obtener los planes de ruta:', error);
    }
  };

  useEffect(() => {
    fetchNotasTraslado();
    fetchCamiones();
    fetchPlanRutas();
  }, []);

  const handleChange = (e) => {
    setNewNotaTraslado({ ...newNotaTraslado, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editNotaTraslado) {
        await axios.put(`${backendUrl}/api/notasTraslado/${editNotaTraslado.NRO}`, newNotaTraslado);
        setEditNotaTraslado(null);
      } else {
        await axios.post(`${backendUrl}/api/notasTraslado`, newNotaTraslado);
      }
      setNewNotaTraslado({ nro: '', fechaLlegada: '', horaLlegada: '', fechaSalida: '', horaSalida: '', nroCamion: '', idPlanRuta: '' });
      fetchNotasTraslado();
    } catch (error) {
      console.error('Error al registrar la nota de traslado:', error);
    }
  };

  const handleEdit = (notaTraslado) => {
    setNewNotaTraslado({
      nro: notaTraslado.NRO,
      fechaLlegada: notaTraslado.FECHALLEGADA,
      horaLlegada: notaTraslado.HORALLEGADA,
      fechaSalida: notaTraslado.FECHASALIDA,
      horaSalida: notaTraslado.HORASALIDA,
      nroCamion: notaTraslado.NROCAMION,
      idPlanRuta: notaTraslado.IDPLANRUTA
    });
    setEditNotaTraslado(notaTraslado);
  };

  const handleDelete = async (nro) => {
    try {
      await axios.delete(`${backendUrl}/api/notasTraslado/${nro}`);
      fetchNotasTraslado();
    } catch (error) {
      console.error('Error al eliminar la nota de traslado:', error);
    }
  };

  return (
    <div className={styles.gestionContainer}>
      <Container className="mt-4">
        <Row className="mb-4">
          <Col xs={12}>
            <h3>{editNotaTraslado ? 'Editar Nota de Traslado' : 'Registrar Nueva Nota de Traslado'}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mt-4">
                <Form.Label htmlFor="nro">Número</Form.Label>
                <Form.Control type="text" id="nro" name="nro" value={newNotaTraslado.nro} onChange={handleChange} placeholder="Ingrese el número de la nota de traslado" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="fechaLlegada">Fecha de Llegada</Form.Label>
                <Form.Control type="date" id="fechaLlegada" name="fechaLlegada" value={newNotaTraslado.fechaLlegada} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="horaLlegada">Hora de Llegada</Form.Label>
                <Form.Control type="time" id="horaLlegada" name="horaLlegada" value={newNotaTraslado.horaLlegada} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="fechaSalida">Fecha de Salida</Form.Label>
                <Form.Control type="date" id="fechaSalida" name="fechaSalida" value={newNotaTraslado.fechaSalida} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="horaSalida">Hora de Salida</Form.Label>
                <Form.Control type="time" id="horaSalida" name="horaSalida" value={newNotaTraslado.horaSalida} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="nroCamion">Número del Camión</Form.Label>
                <Form.Control as="select" id="nroCamion" name="nroCamion" value={newNotaTraslado.nroCamion} onChange={handleChange}>
                  <option value="">Seleccione el número del camión</option>
                  {camiones.map(camion => (
                    <option key={camion.NRO} value={camion.NRO}>{camion.NRO}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="idPlanRuta">ID del Plan de Ruta</Form.Label>
                <Form.Control as="select" id="idPlanRuta" name="idPlanRuta" value={newNotaTraslado.idPlanRuta} onChange={handleChange}>
                  <option value="">Seleccione el ID del plan de ruta</option>
                  {planRutas.map(planRuta => (
                    <option key={planRuta.ID} value={planRuta.ID}>{planRuta.ID}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary" className="mb-3">{editNotaTraslado ? 'Actualizar' : 'Registrar'}</Button>
            </Form>
          </Col>
        </Row>

        {showTable && (
          <Row>
            <Col xs={12}>
              <h3>Lista de Notas de Traslado</h3>
              <div className="table-responsive">
                <Table bordered>
                  <thead className="thead-light">
                    <tr>
                      <th>Número</th>
                      <th>Fecha de Llegada</th>
                      <th>Hora de Llegada</th>
                      <th>Fecha de Salida</th>
                      <th>Hora de Salida</th>
                      <th>Número del Camión</th>
                      <th>ID del Plan de Ruta</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notasTraslado.length > 0 ? (
                      notasTraslado.map(notaTraslado => (
                        <tr key={notaTraslado.NRO}>
                          <td>{notaTraslado.NRO}</td>
                          <td>{notaTraslado.FECHALLEGADA}</td>
                          <td>{notaTraslado.HORALLEGADA}</td>
                          <td>{notaTraslado.FECHASALIDA}</td>
                          <td>{notaTraslado.HORASALIDA}</td>
                          <td>{notaTraslado.NROCAMION}</td>
                          <td>{notaTraslado.IDPLANRUTA}</td>
                          <td>
                            <Button variant="warning" size="sm" onClick={() => handleEdit(notaTraslado)}>Editar</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(notaTraslado.NRO)}>Eliminar</Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">No se encontraron notas de traslado</td>
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

export default GestionNotasTraslado;
