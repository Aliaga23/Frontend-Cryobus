import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import '../Assets/gestion_empleados.module.css';
import Swal from 'sweetalert2';

const GestionRolConductor = () => {
  const [rolConductors, setRolConductors] = useState([]);
  const [newRolConductor, setNewRolConductor] = useState({ id: '', rol: '' });
  const [editRolConductor, setEditRolConductor] = useState(null);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app'; // URL de tu backend en Railway

  const fetchRolConductors = async () => {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

    if (!token) {
      console.error('Token no encontrado. Asegúrate de que el usuario esté autenticado.');
      return;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/rolConductor`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setRolConductors(response.data);
    } catch (error) {
      console.error('Error al obtener los roles de conductor:', error);
    }
  };

  useEffect(() => {
    fetchRolConductors();
  }, []);

  const handleChange = (e) => {
    setNewRolConductor({ ...newRolConductor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

    try {
      if (editRolConductor) {
        await axios.put(`${backendUrl}/api/rolConductor/${editRolConductor.ID}`, newRolConductor, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setEditRolConductor(null);
      } else {
        await axios.post(`${backendUrl}/api/rolConductor`, newRolConductor, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      setNewRolConductor({ id: '', rol: '' });
      fetchRolConductors();
      Swal.fire({
        title: "¡Rol de Conductor creado!",
        text: "El rol de conductor se creó correctamente.",
        icon: "success"
      });
    } catch (error) {
      console.error('Error al registrar el rol de conductor:', error);
      Swal.fire({
        title: "Error",
        text: "Rol no autorizado",
        icon: "error"
      });
    }
  };

  const handleEdit = (rolConductor) => {
    setNewRolConductor({ id: rolConductor.ID, rol: rolConductor.ROL });
    setEditRolConductor(rolConductor);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, estoy seguro"
      });

      if (result.isConfirmed) {
        await axios.delete(`${backendUrl}/api/rolConductor/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        Swal.fire({
          title: "Rol de Conductor Eliminado",
          icon: "success"
        });
        fetchRolConductors();
      }
    } catch (error) {
      console.error('Error al eliminar el rol de conductor:', error);
      Swal.fire({
        title: "Error",
        text: "Rol no autorizado",
        icon: "error"
      });
    }
  };

  return (
    <div>
      <Container className="mt-5">
        <Row className="mb-5">
          <Col md={12}>
            <h3>{editRolConductor ? 'Editar Rol de Conductor' : 'Registrar Nuevo Rol de Conductor'}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="id">ID</Form.Label>
                <Form.Control type="text" id="id" name="id" value={newRolConductor.id} onChange={handleChange} placeholder="Ingrese el ID del rol de conductor" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="rol">Rol</Form.Label>
                <Form.Control type="text" id="rol" name="rol" value={newRolConductor.rol} onChange={handleChange} placeholder="Ingrese el rol de conductor" />
              </Form.Group>
              <Button type="submit" variant="primary">{editRolConductor ? 'Actualizar' : 'Registrar'}</Button>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <h3>Lista de Roles de Conductor</h3>
            <Table bordered>
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rolConductors.map(rolConductor => (
                  <tr key={rolConductor.ID}>
                    <td>{rolConductor.ID}</td>
                    <td>{rolConductor.ROL}</td>
                    <td>
                      <Button variant="warning" size="sm" onClick={() => handleEdit(rolConductor)}>Editar</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(rolConductor.ID)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GestionRolConductor;
