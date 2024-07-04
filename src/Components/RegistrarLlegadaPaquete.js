// components/RegistrarLlegadaPaquete.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

const RegistrarLlegadaPaquete = () => {
  const [notasTraslado, setNotasTraslado] = useState([]);
  const [formData, setFormData] = useState({
    codigoPaquete: ''
  });

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  useEffect(() => {
    fetchNotasTraslado();
  }, []);

  const fetchNotasTraslado = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/notasTraslado`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotasTraslado(response.data);
    } catch (error) {
      console.error('Error al obtener las notas de traslado:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${backendUrl}/api/registrarllegada/registrar-llegada-paquete`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFormData({ codigoPaquete: '' });
      fetchNotasTraslado(); // Refrescar la tabla después de registrar
    } catch (error) {
      console.error('Error al registrar la llegada del paquete:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-5">
        <Col md={12}>
          <h3>Registrar Llegada de Paquete</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Código del Paquete</Form.Label>
              <Form.Control as="select" name="codigoPaquete" value={formData.codigoPaquete} onChange={handleChange} required>
                <option value="">Seleccione un código de paquete</option>
                {notasTraslado
                  .filter(nota => !nota.FECHALLEGADAPAQUETE && !nota.HORALLEGADAPAQUETE) // Filtrar solo los paquetes que no tienen fecha y hora de llegada
                  .map(nota => (
                    <option key={nota.CODIGOPAQUETE} value={nota.CODIGOPAQUETE}>
                      {nota.CODIGOPAQUETE}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Registrar Llegada
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h3>Llegadas de Paquetes Registradas</h3>
          <Table bordered>
            <thead>
              <tr>
                <th>Código Paquete</th>
                <th>Fecha Llegada</th>
                <th>Hora Llegada</th>
              </tr>
            </thead>
            <tbody>
              {notasTraslado
                .filter(nota => nota.FECHALLEGADAPAQUETE && nota.HORALLEGADAPAQUETE)
                .map(nota => (
                  <tr key={nota.CODIGOPAQUETE}>
                    <td>{nota.CODIGOPAQUETE}</td>
                    <td>{moment(nota.FECHALLEGADAPAQUETE).utc().format('YYYY-MM-DD')}</td>
                    <td>{nota.HORALLEGADAPAQUETE}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrarLlegadaPaquete;
