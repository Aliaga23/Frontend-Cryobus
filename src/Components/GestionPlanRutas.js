import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
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
    horaLlegadaEsperada: '',
    localidadDestino: '',
    departamentoDestino: ''
  });
  const [editPlanRuta, setEditPlanRuta] = useState(null);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

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

  const fetchLocalidades = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${backendUrl}/api/localidades`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLocalidades(response.data);
    } catch (error) {
      console.error('Error al obtener las localidades:', error);
    }
  };

  const fetchDepartamentos = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${backendUrl}/api/departamentos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
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
    const token = localStorage.getItem('token');
    try {
      if (editPlanRuta) {
        await axios.put(`${backendUrl}/api/planRuta/${editPlanRuta.ID}`, newPlanRuta, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEditPlanRuta(null);
      } else {
        await axios.post(`${backendUrl}/api/planRuta`, newPlanRuta, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setNewPlanRuta({
        id: '',
        nombreLocalidad: '',
        nombreDepartamento: '',
        fechaSalidaEsperada: '',
        horaSalidaEsperada: '',
        fechaLlegadaEsperada: '',
        horaLlegadaEsperada: '',
        localidadDestino: '',
        departamentoDestino: ''
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
      horaLlegadaEsperada: planRuta.HORALLEGADAESPERADA,
      localidadDestino: planRuta.LOCALIDADDESTINO,
      departamentoDestino: planRuta.DEPARTAMENTODESTINO
    });
    setEditPlanRuta(planRuta);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${backendUrl}/api/planRuta/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
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
              <Form.Control
                type="text"
                id="id"
                name="id"
                value={newPlanRuta.id}
                onChange={handleChange}
                placeholder="Ingrese el ID del plan de ruta"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="nombreLocalidad">Nombre de la Localidad</Form.Label>
              <Form.Control
                as="select"
                id="nombreLocalidad"
                name="nombreLocalidad"
                value={newPlanRuta.nombreLocalidad}
                onChange={handleChange}
              >
                <option value="">Seleccione la Localidad</option>
                {localidades.map((localidad) => (
                  <option key={localidad.NOMBRE} value={localidad.NOMBRE}>
                    {localidad.NOMBRE}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="nombreDepartamento">Nombre del Departamento</Form.Label>
              <Form.Control
                as="select"
                id="nombreDepartamento"
                name="nombreDepartamento"
                value={newPlanRuta.nombreDepartamento}
                onChange={handleChange}
              >
                <option value="">Seleccione el Departamento</option>
                {departamentos.map((departamento) => (
                  <option key={departamento.NOMBRE} value={departamento.NOMBRE}>
                    {departamento.NOMBRE}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="fechaSalidaEsperada">Fecha de Salida Esperada</Form.Label>
              <Form.Control
                type="date"
                id="fechaSalidaEsperada"
                name="fechaSalidaEsperada"
                value={newPlanRuta.fechaSalidaEsperada}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="horaSalidaEsperada">Hora de Salida Esperada</Form.Label>
              <Form.Control
                type="time"
                id="horaSalidaEsperada"
                name="horaSalidaEsperada"
                value={newPlanRuta.horaSalidaEsperada}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="fechaLlegadaEsperada">Fecha de Llegada Esperada</Form.Label>
              <Form.Control
                type="date"
                id="fechaLlegadaEsperada"
                name="fechaLlegadaEsperada"
                value={newPlanRuta.fechaLlegadaEsperada}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="horaLlegadaEsperada">Hora de Llegada Esperada</Form.Label>
              <Form.Control
                type="time"
                id="horaLlegadaEsperada"
                name="horaLlegadaEsperada"
                value={newPlanRuta.horaLlegadaEsperada}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="localidadDestino">Localidad de Destino</Form.Label>
              <Form.Control
                as="select"
                id="localidadDestino"
                name="localidadDestino"
                value={newPlanRuta.localidadDestino}
                onChange={handleChange}
              >
                <option value="">Seleccione la Localidad</option>
                {localidades.map((localidad) => (
                  <option key={localidad.NOMBRE} value={localidad.NOMBRE}>
                    {localidad.NOMBRE}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="departamentoDestino">Departamento de Destino</Form.Label>
              <Form.Control
                as="select"
                id="departamentoDestino"
                name="departamentoDestino"
                value={newPlanRuta.departamentoDestino}
                onChange={handleChange}
              >
                <option value="">Seleccione el Departamento</option>
                {departamentos.map((departamento) => (
                  <option key={departamento.NOMBRE} value={departamento.NOMBRE}>
                    {departamento.NOMBRE}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              {editPlanRuta ? 'Actualizar' : 'Registrar'}
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h3>Lista de Planes de Ruta</h3>
          <Table bordered responsive>
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>Localidad</th>
                <th>Departamento</th>
                <th>Fecha Salida</th>
                <th>Hora Salida</th>
                <th>Fecha Llegada</th>
                <th>Hora Llegada</th>
                <th>Localidad Destino</th>
                <th>Departamento Destino</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {planRutas.map((planRuta) => (
                <tr key={planRuta.ID}>
                  <td>{planRuta.ID}</td>
                  <td>{planRuta.NOMBRELOCALIDAD}</td>
                  <td>{planRuta.NOMBREDEPARTAMENTO}</td>
                  <td>{moment(planRuta.FECHASALIDAESPERADA).utc().format('YYYY-MM-DD')}</td>
                  <td>{planRuta.HORASALIDAESPERADA.slice(0, 5)}</td>
                  <td>{moment(planRuta.FECHALLEGADAESPERADA).utc().format('YYYY-MM-DD')}</td>
                  <td>{planRuta.HORALLEGADAESPERADA.slice(0, 5)}</td>
                  <td>{planRuta.LOCALIDADDESTINO}</td>
                  <td>{planRuta.DEPARTAMENTODESTINO}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(planRuta)}
                      className="mr-2 mb-2"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(planRuta.ID)}
                      className="mb-2"
                    >
                      Eliminar
                    </Button>
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
