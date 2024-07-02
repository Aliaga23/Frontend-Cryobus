import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const GestionDetalleConductor = () => {
  const [detalles, setDetalles] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [rolesConductor, setRolesConductor] = useState([]);
  const [notaTraslados, setNotaTraslados] = useState([]);
  const [formData, setFormData] = useState({
    codigoConductor: '',
    idRolConductor: '',
    nroNotaTraslado: ''
  });
  const [editDetalle, setEditDetalle] = useState(null);
  const [error, setError] = useState(null);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  useEffect(() => {
    fetchDetalles();
    fetchConductores();
    fetchRolesConductor();
    fetchNotaTraslados();
  }, []);

  const fetchDetalles = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/detalleconductor`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDetalles(response.data);
    } catch (error) {
      setError('Error al obtener los detalles del conductor');
      console.error('Error al obtener los detalles del conductor:', error);
    }
  };

  const fetchConductores = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/conductores`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setConductores(response.data);
    } catch (error) {
      setError('Error al obtener los conductores');
      console.error('Error al obtener los conductores:', error);
    }
  };

  const fetchRolesConductor = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/rolConductor`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRolesConductor(response.data);
    } catch (error) {
      setError('Error al obtener los roles de conductor');
      console.error('Error al obtener los roles de conductor:', error);
    }
  };

  const fetchNotaTraslados = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/notasTraslado`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotaTraslados(response.data);
    } catch (error) {
      setError('Error al obtener las notas de traslado');
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
      if (editDetalle) {
        await axios.put(`${backendUrl}/api/detalleconductor/${editDetalle.NRO}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEditDetalle(null);
        Swal.fire({
          title: "¡Detalle actualizado!",
          text: "El detalle se ha actualizado correctamente.",
          icon: "success"
        });
      } else {
        await axios.post(`${backendUrl}/api/detalleconductor`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        Swal.fire({
          title: "¡Detalle registrado!",
          text: "El detalle se ha registrado correctamente.",
          icon: "success"
        });
      }
      setFormData({ codigoConductor: '', idRolConductor: '', nroNotaTraslado: '' });
      fetchDetalles();
    } catch (error) {
      setError('Error al registrar el detalle');
      console.error('Error al registrar el detalle:', error);
    }
  };

  const handleEdit = (detalle) => {
    setFormData({
      codigoConductor: detalle.CODIGOCONDUCTOR,
      idRolConductor: detalle.IDROLCONDUCTOR,
      nroNotaTraslado: detalle.NRONOTATRASLADO
    });
    setEditDetalle(detalle);
  };

  const handleDelete = async (nro) => {
    try {
      await axios.delete(`${backendUrl}/api/detalleconductor/${nro}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchDetalles();
      Swal.fire({
        title: "¡Detalle eliminado!",
        text: "El detalle se ha eliminado correctamente.",
        icon: "success"
      });
    } catch (error) {
      setError('Error al eliminar el detalle del conductor');
      console.error('Error al eliminar el detalle del conductor:', error);
    }
  };

  return (
    <Container className="mt-5">
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      <Row className="mb-5">
        <Col md={12}>
          <h3>Gestionar Detalle del Conductor</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Código del Conductor</Form.Label>
              <Form.Control as="select" name="codigoConductor" value={formData.codigoConductor} onChange={handleChange} required>
                <option value="">Seleccione un conductor</option>
                {conductores.map((conductor) => (
                  <option key={conductor.CODIGO} value={conductor.CODIGO}>
                    {conductor.APELLIDOS} {conductor.NOMBRES}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Rol del Conductor</Form.Label>
              <Form.Control as="select" name="idRolConductor" value={formData.idRolConductor} onChange={handleChange} required>
                <option value="">Seleccione un rol</option>
                {rolesConductor.map((rol) => (
                  <option key={rol.ID} value={rol.ID}>
                    {rol.ROL}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Número de Nota de Traslado</Form.Label>
              <Form.Control as="select" name="nroNotaTraslado" value={formData.nroNotaTraslado} onChange={handleChange} required>
                <option value="">Seleccione una nota de traslado</option>
                {notaTraslados.map((nota) => (
                  <option key={nota.NRO} value={nota.NRO}>
                    {nota.NRO}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              {editDetalle ? 'Actualizar Detalle' : 'Crear Detalle'}
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h3>Lista de Detalles de Conductores</h3>
          <Table bordered>
            <thead>
              <tr>
                <th>Número</th>
                <th>Nombre del Conductor</th>
                <th>Rol del Conductor</th>
                <th>Número de Nota de Traslado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((detalle) => (
                <tr key={detalle.NRO}>
                  <td>{detalle.NRO}</td>
                  <td>{detalle.APELLIDOS} {detalle.NOMBRES}</td>
                  <td>{detalle.ROL}</td>
                  <td>{detalle.NRONOTATRASLADO}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => handleEdit(detalle)}>Editar</Button>
                    {' '}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(detalle.NRO)}>Eliminar</Button>
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

export default GestionDetalleConductor;
