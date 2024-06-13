import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import styles from '../Assets/gestion_empleados.module.css';

const GestionDepartamentos = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [newDepartamento, setNewDepartamento] = useState({
    nombre: '',
    nuevoNombre: ''
  });
  const [editDepartamento, setEditDepartamento] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchDepartamentos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${backendUrl}/api/departamentos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDepartamentos(response.data);
      setShowTable(true);
    } catch (error) {
      console.error('Error al obtener los departamentos:', error);
    }
  };

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  const handleChange = (e) => {
    setNewDepartamento({ ...newDepartamento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editDepartamento) {
        await axios.put(`${backendUrl}/api/departamentos/${editDepartamento.NOMBRE}`, newDepartamento, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEditDepartamento(null);
      } else {
        await axios.post(`${backendUrl}/api/departamentos`, newDepartamento, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setNewDepartamento({ nombre: '', nuevoNombre: '' });
      fetchDepartamentos();
    } catch (error) {
      console.error('Error al registrar el departamento:', error);
    }
  };

  const handleEdit = (departamento) => {
    setNewDepartamento({
      nombre: departamento.NOMBRE,
      nuevoNombre: departamento.NOMBRE
    });
    setEditDepartamento(departamento);
  };

  const handleDelete = async (nombre) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${backendUrl}/api/departamentos/${nombre}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDepartamentos();
    } catch (error) {
      console.error('Error al eliminar el departamento:', error);
    }
  };

  return (
    <div className={styles.gestionContainer}>
      <Container className="mt-4">
        <Row className="mb-4">
          <Col xs={12}>
            <h3>{editDepartamento ? 'Editar Departamento' : 'Registrar Nuevo Departamento'}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mt-4">
                <Form.Label htmlFor="nombre">Nombre</Form.Label>
                <Form.Control type="text" id="nombre" name="nombre" value={newDepartamento.nombre} onChange={handleChange} placeholder="Ingrese el nombre del departamento" />
              </Form.Group>
              {editDepartamento && (
                <Form.Group>
                  <Form.Label htmlFor="nuevoNombre">Nuevo Nombre</Form.Label>
                  <Form.Control type="text" id="nuevoNombre" name="nuevoNombre" value={newDepartamento.nuevoNombre} onChange={handleChange} placeholder="Ingrese el nuevo nombre del departamento" />
                </Form.Group>
              )}
              <Button type="submit" variant="primary" className="mb-3">{editDepartamento ? 'Actualizar' : 'Registrar'}</Button>
            </Form>
          </Col>
        </Row>

        {showTable && (
          <Row>
            <Col xs={12}>
              <h3>Lista de Departamentos</h3>
              <div className="table-responsive">
                <Table bordered>
                  <thead className="thead-light">
                    <tr>
                      <th>Nombre</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departamentos.length > 0 ? (
                      departamentos.map(departamento => (
                        <tr key={departamento.NOMBRE}>
                          <td>{departamento.NOMBRE}</td>
                          <td>
                            <Button variant="warning" size="sm" onClick={() => handleEdit(departamento)}>Editar</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(departamento.NOMBRE)}>Eliminar</Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center">No se encontraron departamentos</td>
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

export default GestionDepartamentos;
