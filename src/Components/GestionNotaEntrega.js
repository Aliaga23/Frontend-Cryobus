// src/Components/GestionNotaEntrega.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import '../Assets/gestion_empleados.module.css';

const GestionNotaEntrega = () => {
  const [notasEntrega, setNotasEntrega] = useState([]);
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

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchNotasEntrega = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/notasEntrega`);
      setNotasEntrega(response.data);
      setShowTable(true);
    } catch (error) {
      console.error('Error al obtener las notas de entrega:', error);
    }
  };

  useEffect(() => {
    fetchNotasEntrega();
  }, []);

  const handleChange = (e) => {
    setNewNotaEntrega({ ...newNotaEntrega, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editNotaEntrega) {
        await axios.put(`${backendUrl}/api/notasEntrega/${editNotaEntrega.NRO}`, newNotaEntrega);
        setEditNotaEntrega(null);
      } else {
        await axios.post(`${backendUrl}/api/notasEntrega`, newNotaEntrega);
      }
      setNewNotaEntrega({ NRO: '', FECHARECEPCION: '', HORARECEPCION: '', FECHAENTREGA: '', HORAENTREGA: '', PRECIOESTIMADO: '', CODIGOCLIENTEENVIA: '', CODIGOCLIENTERECIBE: '', IDUSUARIOENVIA: '', IDUSUARIORECIBE: '', IDTIPOENVIO: '', IDESTADOENTREGA: '', NROREEMBOLSO: '', CODIGOPAQUETE: '', NRONOTATRASLADO: '' });
      fetchNotasEntrega();
    } catch (error) {
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
      console.error('Error al eliminar la nota de entrega:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-5">
        <Col xs={12}>
          <h3>{editNotaEntrega ? 'Editar Nota de Entrega' : 'Registrar Nueva Nota de Entrega'}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="NRO">Número</Form.Label>
              <Form.Control type="text" id="NRO" name="NRO" value={newNotaEntrega.NRO} onChange={handleChange} placeholder="Ingrese el número de la nota de entrega" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="FECHARECEPCION">Fecha de Recepción</Form.Label>
              <Form.Control type="date" id="FECHARECEPCION" name="FECHARECEPCION" value={newNotaEntrega.FECHARECEPCION} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="HORARECEPCION">Hora de Recepción</Form.Label>
              <Form.Control type="time" id="HORARECEPCION" name="HORARECEPCION" value={newNotaEntrega.HORARECEPCION} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="FECHAENTREGA">Fecha de Entrega</Form.Label>
              <Form.Control type="date" id="FECHAENTREGA" name="FECHAENTREGA" value={newNotaEntrega.FECHAENTREGA} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="HORAENTREGA">Hora de Entrega</Form.Label>
              <Form.Control type="time" id="HORAENTREGA" name="HORAENTREGA" value={newNotaEntrega.HORAENTREGA} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="PRECIOESTIMADO">Precio Estimado</Form.Label>
              <Form.Control type="number" id="PRECIOESTIMADO" name="PRECIOESTIMADO" value={newNotaEntrega.PRECIOESTIMADO} onChange={handleChange} placeholder="Ingrese el precio estimado" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="CODIGOCLIENTEENVIA">Código Cliente Envia</Form.Label>
              <Form.Control type="text" id="CODIGOCLIENTEENVIA" name="CODIGOCLIENTEENVIA" value={newNotaEntrega.CODIGOCLIENTEENVIA} onChange={handleChange} placeholder="Ingrese el código del cliente que envía" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="CODIGOCLIENTERECIBE">Código Cliente Recibe</Form.Label>
              <Form.Control type="text" id="CODIGOCLIENTERECIBE" name="CODIGOCLIENTERECIBE" value={newNotaEntrega.CODIGOCLIENTERECIBE} onChange={handleChange} placeholder="Ingrese el código del cliente que recibe" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="IDUSUARIOENVIA">ID Usuario Envia</Form.Label>
              <Form.Control type="text" id="IDUSUARIOENVIA" name="IDUSUARIOENVIA" value={newNotaEntrega.IDUSUARIOENVIA} onChange={handleChange} placeholder="Ingrese el ID del usuario que envía" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="IDUSUARIORECIBE">ID Usuario Recibe</Form.Label>
              <Form.Control type="text" id="IDUSUARIORECIBE" name="IDUSUARIORECIBE" value={newNotaEntrega.IDUSUARIORECIBE} onChange={handleChange} placeholder="Ingrese el ID del usuario que recibe" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="IDTIPOENVIO">ID Tipo de Envio</Form.Label>
              <Form.Control type="text" id="IDTIPOENVIO" name="IDTIPOENVIO" value={newNotaEntrega.IDTIPOENVIO} onChange={handleChange} placeholder="Ingrese el ID del tipo de envio" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="IDESTADOENTREGA">ID Estado de Entrega</Form.Label>
              <Form.Control type="text" id="IDESTADOENTREGA" name="IDESTADOENTREGA" value={newNotaEntrega.IDESTADOENTREGA} onChange={handleChange} placeholder="Ingrese el ID del estado de entrega" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="NROREEMBOLSO">Número de Reembolso</Form.Label>
              <Form.Control type="text" id="NROREEMBOLSO" name="NROREEMBOLSO" value={newNotaEntrega.NROREEMBOLSO} onChange={handleChange} placeholder="Ingrese el número de reembolso" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="CODIGOPAQUETE">Código de Paquete</Form.Label>
              <Form.Control type="text" id="CODIGOPAQUETE" name="CODIGOPAQUETE" value={newNotaEntrega.CODIGOPAQUETE} onChange={handleChange} placeholder="Ingrese el código del paquete" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="NRONOTATRASLADO">Número de Nota de Traslado</Form.Label>
              <Form.Control type="text" id="NRONOTATRASLADO" name="NRONOTATRASLADO" value={newNotaEntrega.NRONOTATRASLADO} onChange={handleChange} placeholder="Ingrese el número de la nota de traslado" />
            </Form.Group>
            <Button type="submit" variant="primary" className="mb-3">{editNotaEntrega ? 'Actualizar' : 'Registrar'}</Button>
          </Form>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col xs={12}>
          <h3>Lista de Notas de Entrega</h3>
          {showTable && (
            <Table bordered>
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
                  <th>ID Tipo de Envio</th>
                  <th>ID Estado de Entrega</th>
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
                    <td>{notaEntrega.CODIGOCLIENTEENVIA}</td>
                    <td>{notaEntrega.CODIGOCLIENTERECIBE}</td>
                    <td>{notaEntrega.IDUSUARIOENVIA}</td>
                    <td>{notaEntrega.IDUSUARIORECIBE}</td>
                    <td>{notaEntrega.IDTIPOENVIO}</td>
                    <td>{notaEntrega.IDESTADOENTREGA}</td>
                    <td>{notaEntrega.NROREEMBOLSO}</td>
                    <td>{notaEntrega.CODIGOPAQUETE}</td>
                    <td>{notaEntrega.NRONOTATRASLADO}</td>
                    <td>
                      <Button variant="warning" size="sm" onClick={() => handleEdit(notaEntrega)}>Editar</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(notaEntrega.NRO)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GestionNotaEntrega;
