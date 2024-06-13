import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const GestionarDireccion = () => {
  const [direcciones, setDirecciones] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [newDireccion, setNewDireccion] = useState({
    id: '',
    descripcion: '',
    nombreDepartamento: '',
    nombreLocalidad: ''
  });
  const [editDireccion, setEditDireccion] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchDirecciones = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/direcciones`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDirecciones(response.data);
      setShowTable(true);
    } catch (error) {
      console.error('Error al obtener las direcciones:', error);
    }
  };

  const fetchDepartamentos = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/departamentos`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDepartamentos(response.data);
    } catch (error) {
      console.error('Error al obtener los departamentos:', error);
    }
  };

  const fetchLocalidades = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/localidades`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setLocalidades(response.data);
    } catch (error) {
      console.error('Error al obtener las localidades:', error);
    }
  };

  useEffect(() => {
    fetchDirecciones();
    fetchDepartamentos();
    fetchLocalidades();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDireccion({ ...newDireccion, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editDireccion) {
        await axios.put(`${backendUrl}/api/direcciones/${editDireccion.ID}`, newDireccion, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEditDireccion(null);
      } else {
        await axios.post(`${backendUrl}/api/direcciones`, newDireccion, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      setNewDireccion({ id: '', descripcion: '', nombreDepartamento: '', nombreLocalidad: '' });
      fetchDirecciones();
    } catch (error) {
      console.error('Error al registrar la dirección:', error);
    }
  };

  const handleEdit = (direccion) => {
    setNewDireccion({
      id: direccion.ID,
      descripcion: direccion.DESCRIPCION,
      nombreDepartamento: direccion.NOMBREDEPARTAMENTO,
      nombreLocalidad: direccion.NOMBRELOCALIDAD
    });
    setEditDireccion(direccion);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/direcciones/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchDirecciones();
    } catch (error) {
      console.error('Error al eliminar la dirección:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col xs={12}>
          <h3>{editDireccion ? 'Editar Dirección' : 'Registrar Nueva Dirección'}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-4">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" name="id" value={newDireccion.id} onChange={handleChange} placeholder="Ingrese el ID" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" name="descripcion" value={newDireccion.descripcion} onChange={handleChange} placeholder="Ingrese la descripción" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Departamento</Form.Label>
              <Form.Control as="select" name="nombreDepartamento" value={newDireccion.nombreDepartamento} onChange={handleChange}>
                <option value="">Seleccione un departamento</option>
                {departamentos.map(departamento => (
                  <option key={departamento.NOMBRE} value={departamento.NOMBRE}>{departamento.NOMBRE}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Localidad</Form.Label>
              <Form.Control as="select" name="nombreLocalidad" value={newDireccion.nombreLocalidad} onChange={handleChange}>
                <option value="">Seleccione una localidad</option>
                {localidades.filter(localidad => localidad.NOMBREDEPARTAMENTO === newDireccion.nombreDepartamento).map(localidad => (
                  <option key={`${localidad.NOMBRE}-${localidad.NOMBREDEPARTAMENTO}`} value={localidad.NOMBRE}>{localidad.NOMBRE}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="mb-3">{editDireccion ? 'Actualizar' : 'Registrar'}</Button>
          </Form>
        </Col>
      </Row>

      {showTable && (
        <Row>
          <Col xs={12}>
            <h3>Lista de Direcciones</h3>
            <div className="table-responsive">
              <Table bordered>
                <thead className="thead-light">
                  <tr>
                    <th>ID</th>
                    <th>Descripción</th>
                    <th>Departamento</th>
                    <th>Localidad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {direcciones.length > 0 ? (
                    direcciones.map(direccion => (
                      <tr key={direccion.ID}>
                        <td>{direccion.ID}</td>
                        <td>{direccion.DESCRIPCION}</td>
                        <td>{direccion.NOMBREDEPARTAMENTO}</td>
                        <td>{direccion.NOMBRELOCALIDAD}</td>
                        <td>
                          <Button variant="warning" size="sm" onClick={() => handleEdit(direccion)}>Editar</Button>
                          <Button variant="danger" size="sm" onClick={() => handleDelete(direccion.ID)}>Eliminar</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No se encontraron direcciones</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default GestionarDireccion;
