import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import styles from '../Assets/gestion_empleados.module.css';

const GestionLocalidades = () => {
  const [localidades, setLocalidades] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [newLocalidad, setNewLocalidad] = useState({
    nombre: '',
    nombreDepartamento: '',
    nuevoNombre: '',
    nuevoNombreDepartamento: ''
  });
  const [editLocalidad, setEditLocalidad] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchLocalidades = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/localidades`);
      setLocalidades(response.data);
      setShowTable(true);
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
    fetchLocalidades();
    fetchDepartamentos();
  }, []);

  const handleChange = (e) => {
    setNewLocalidad({ ...newLocalidad, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editLocalidad) {
        await axios.put(`${backendUrl}/api/localidades/${editLocalidad.NOMBRE}/${editLocalidad.NOMBREDEPARTAMENTO}`, newLocalidad);
        setEditLocalidad(null);
      } else {
        await axios.post(`${backendUrl}/api/localidades`, newLocalidad);
      }
      setNewLocalidad({ nombre: '', nombreDepartamento: '', nuevoNombre: '', nuevoNombreDepartamento: '' });
      fetchLocalidades();
    } catch (error) {
      console.error('Error al registrar la localidad:', error);
    }
  };

  const handleEdit = (localidad) => {
    setNewLocalidad({
      nombre: localidad.NOMBRE,
      nombreDepartamento: localidad.NOMBREDEPARTAMENTO,
      nuevoNombre: localidad.NOMBRE,
      nuevoNombreDepartamento: localidad.NOMBREDEPARTAMENTO
    });
    setEditLocalidad(localidad);
  };

  const handleDelete = async (nombre, nombreDepartamento) => {
    try {
      await axios.delete(`${backendUrl}/api/localidades/${nombre}/${nombreDepartamento}`);
      fetchLocalidades();
    } catch (error) {
      console.error('Error al eliminar la localidad:', error);
    }
  };

  return (
    <div className={styles.gestionContainer}>
      <Container className="mt-4">
        <Row className="mb-4">
          <Col xs={12}>
            <h3>{editLocalidad ? 'Editar Localidad' : 'Registrar Nueva Localidad'}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mt-4">
                <Form.Label htmlFor="nombre">Nombre</Form.Label>
                <Form.Control type="text" id="nombre" name="nombre" value={newLocalidad.nombre} onChange={handleChange} placeholder="Ingrese el nombre de la localidad" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="nombreDepartamento">Departamento</Form.Label>
                <Form.Control as="select" id="nombreDepartamento" name="nombreDepartamento" value={newLocalidad.nombreDepartamento} onChange={handleChange}>
                  <option value="">Seleccione un departamento</option>
                  {departamentos.map(departamento => (
                    <option key={departamento.NOMBRE} value={departamento.NOMBRE}>{departamento.NOMBRE}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              {editLocalidad && (
                <>
                  <Form.Group>
                    <Form.Label htmlFor="nuevoNombre">Nuevo Nombre</Form.Label>
                    <Form.Control type="text" id="nuevoNombre" name="nuevoNombre" value={newLocalidad.nuevoNombre} onChange={handleChange} placeholder="Ingrese el nuevo nombre de la localidad" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="nuevoNombreDepartamento">Nuevo Departamento</Form.Label>
                    <Form.Control as="select" id="nuevoNombreDepartamento" name="nuevoNombreDepartamento" value={newLocalidad.nuevoNombreDepartamento} onChange={handleChange}>
                      <option value="">Seleccione un departamento</option>
                      {departamentos.map(departamento => (
                        <option key={departamento.NOMBRE} value={departamento.NOMBRE}>{departamento.NOMBRE}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </>
              )}
              <Button type="submit" variant="primary" className="mb-3">{editLocalidad ? 'Actualizar' : 'Registrar'}</Button>
            </Form>
          </Col>
        </Row>

        {showTable && (
          <Row>
            <Col xs={12}>
              <h3>Lista de Localidades</h3>
              <div className="table-responsive">
                <Table bordered>
                  <thead className="thead-light">
                    <tr>
                      <th>Nombre</th>
                      <th>Departamento</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {localidades.length > 0 ? (
                      localidades.map(localidad => (
                        <tr key={`${localidad.NOMBRE}-${localidad.NOMBREDEPARTAMENTO}`}>
                          <td>{localidad.NOMBRE}</td>
                          <td>{localidad.NOMBREDEPARTAMENTO}</td>
                          <td>
                            <Button variant="warning" size="sm" onClick={() => handleEdit(localidad)}>Editar</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(localidad.NOMBRE, localidad.NOMBREDEPARTAMENTO)}>Eliminar</Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">No se encontraron localidades</td>
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

export default GestionLocalidades;
