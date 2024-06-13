import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import '../Assets/gestion_empleados.module.css';

const GestionPlanRutas = () => {
  const [planRutas, setPlanRutas] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [newPlanRuta, setNewPlanRuta] = useState({
    id: '',
    nombreLocalidad: '',
    nombreDepartamento: '',
    fechaSalidaEsperada: '',
    horaSalidaEsperada: '',
    fechaLlegadaEsperada: '',
    horaLlegadaEsperada: ''
  });
  const [editPlanRuta, setEditPlanRuta] = useState(null);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchPlanRutas = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/planRuta`);
      setPlanRutas(response.data);
    } catch (error) {
      console.error('Error al obtener los planes de ruta:', error);
    }
  };

  const fetchLocalidades = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/localidades`);
      setLocalidades(response.data);
    } catch (error) {
      console.error('Error al obtener las localidades:', error);
    }
  };

  const fetchDepartamentos = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/departamentos`);
      setDepartamentos(response.data);
    } catch (error) {
      console.error('Error al obtener los departamentos:', error);
    }
  };

  useEffect(() => {
    fetchPlanRutas();
    fetchLocalidades();
    fetchDepartamentos();
  }, []);

  const handleChange = (e) => {
    setNewPlanRuta({ ...newPlanRuta, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editPlanRuta) {
        await axios.put(`${backendUrl}/api/planRuta/${editPlanRuta.ID}`, newPlanRuta);
        setEditPlanRuta(null);
      } else {
        await axios.post(`${backendUrl}/api/planRuta`, newPlanRuta);
      }
      setNewPlanRuta({
        id: '',
        nombreLocalidad: '',
        nombreDepartamento: '',
        fechaSalidaEsperada: '',
        horaSalidaEsperada: '',
        fechaLlegadaEsperada: '',
        horaLlegadaEsperada: ''
      });
      fetchPlanRutas();
    } catch (error) {
      console.error('Error al registrar el plan de ruta:', error);
    }
  };

  const handleEdit = (planRuta) => {
    setNewPlanRuta({
      id: planRuta.ID,
      nombreLocalidad: planRuta.NOMBRELOCALIDAD,
      nombreDepartamento: planRuta.NOMBREDEPARTAMENTO,
      fechaSalidaEsperada: planRuta.FECHASALIDAESPERADA,
      horaSalidaEsperada: planRuta.HORASALIDAESPERADA,
      fechaLlegadaEsperada: planRuta.FECHALLEGADAESPERADA,
      horaLlegadaEsperada: planRuta.HORALLEGADAESPERADA
    });
    setEditPlanRuta(planRuta);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/planRuta/${id}`);
      fetchPlanRutas();
    } catch (error) {
      console.error('Error al eliminar el plan de ruta:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-5">
        <Col md={12}>
          <h3>{editPlanRuta ? 'Editar Plan de Ruta' : 'Registrar Nuevo Plan de Ruta'}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="id">ID</Form.Label>
              <Form.Control type="text" id="id" name="id" value={newPlanRuta.id} onChange={handleChange} placeholder="Ingrese el ID del plan de ruta" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="nombreLocalidad">Nombre de la Localidad</Form.Label>
              <Form.Control as="select" id="nombreLocalidad" name="nombreLocalidad" value={newPlanRuta.nombreLocalidad} onChange={handleChange}>
                <option value="">Seleccione la Localidad</option>
                {localidades.map(localidad => (
                  <option key={localidad.NOMBRE} value={localidad.NOMBRE}>{localidad.NOMBRE}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="nombreDepartamento">Nombre del Departamento</Form.Label>
              <Form.Control as="select" id="nombreDepartamento" name="nombreDepartamento" value={newPlanRuta.nombreDepartamento} onChange={handleChange}>
                <option value="">Seleccione el Departamento</option>
                {departamentos.map(departamento => (
                  <option key={departamento.NOMBRE} value={departamento.NOMBRE}>{departamento.NOMBRE}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="fechaSalidaEsperada">Fecha de Salida Esperada</Form.Label>
              <Form.Control type="date" id="fechaSalidaEsperada" name="fechaSalidaEsperada" value={newPlanRuta.fechaSalidaEsperada} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="horaSalidaEsperada">Hora de Salida Esperada</Form.Label>
              <Form.Control type="time" id="horaSalidaEsperada" name="horaSalidaEsperada" value={newPlanRuta.horaSalidaEsperada} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="fechaLlegadaEsperada">Fecha de Llegada Esperada</Form.Label>
              <Form.Control type="date" id="fechaLlegadaEsperada" name="fechaLlegadaEsperada" value={newPlanRuta.fechaLlegadaEsperada} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="horaLlegadaEsperada">Hora de Llegada Esperada</Form.Label>
              <Form.Control type="time" id="horaLlegadaEsperada" name="horaLlegadaEsperada" value={newPlanRuta.horaLlegadaEsperada} onChange={handleChange} />
            </Form.Group>
            <Button type="submit" variant="primary">{editPlanRuta ? 'Actualizar' : 'Registrar'}</Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h3>Lista de Planes de Ruta</h3>
          <Table bordered>
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>Localidad</th>
                <th>Departamento</th>
                <th>Fecha Salida</th>
                <th>Hora Salida</th>
                <th>Fecha Llegada</th>
                <th>Hora Llegada</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {planRutas.map(planRuta => (
                <tr key={planRuta.ID}>
                  <td>{planRuta.ID}</td>
                  <td>{planRuta.NOMBRELOCALIDAD}</td>
                  <td>{planRuta.NOMBREDEPARTAMENTO}</td>
                  <td>{planRuta.FECHASALIDAESPERADA}</td>
                  <td>{planRuta.HORASALIDAESPERADA}</td>
                  <td>{planRuta.FECHALLEGADAESPERADA}</td>
                  <td>{planRuta.HORALLEGADAESPERADA}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => handleEdit(planRuta)}>Editar</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(planRuta.ID)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default GestionPlanRutas;
