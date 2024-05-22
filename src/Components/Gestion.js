import React, { useState, useEffect } from 'react';

import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import '../../../Assets/gestion_empleados.module.css';

const Gestion = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    id: '',
    apellidos: '',
    nombres: '',
    contra: '',
    idRol: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [roles, setRoles] = useState([]);
  const [showAll, setShowAll] = useState(false); // Nuevo estado para controlar la visualización de la tabla completa

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/users');
      setUsers(response.data);
      setShowTable(true);
      setShowAll(true); // Mostrar todos los usuarios
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error al obtener los roles:', error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUser) {
        await axios.put(`http://localhost:8081/api/users/${editUser.ID}`, newUser);
        setEditUser(null);
      } else {
        await axios.post('http://localhost:8081/api/users', newUser);
      }
      setNewUser({ id: '', apellidos: '', nombres: '', contra: '', idRol: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  const handleEdit = (user) => {
    setNewUser({
      id: user.ID,
      apellidos: user.APELLIDOS,
      nombres: user.NOMBRES,
      contra: '',
      idRol: user.IDROL
    });
    setEditUser(user);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8081/api/users/${searchTerm}`);
      setUsers([response.data]); // Configurar los usuarios con un solo resultado
      setShowTable(true);
      setShowAll(false); // Asegúrate de que solo se muestra una fila
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
    }
  };

  return (
    <div>
      <Container className="mt-5">
        <Row className="mb-5">
          <Col md={12}>
            <h3>{editUser ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="id">ID</Form.Label>
                <Form.Control type="text" id="id" name="id" value={newUser.id} onChange={handleChange} placeholder="Ingrese el ID del usuario" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="apellidos">Apellidos</Form.Label>
                <Form.Control type="text" id="apellidos" name="apellidos" value={newUser.apellidos} onChange={handleChange} placeholder="Ingrese los apellidos" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="nombres">Nombres</Form.Label>
                <Form.Control type="text" id="nombres" name="nombres" value={newUser.nombres} onChange={handleChange} placeholder="Ingrese los nombres" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="contra">Contraseña</Form.Label>
                <Form.Control type="password" id="contra" name="contra" value={newUser.contra} onChange={handleChange} placeholder="Ingrese la contraseña" />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="idRol">Rol</Form.Label>
                <Form.Control as="select" id="idRol" name="idRol" value={newUser.idRol} onChange={handleChange}>
                  <option value="">Seleccione un rol</option>
                  {roles.map(role => (
                    <option key={role.ID} value={role.ID}>{role.NOMBRE}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">{editUser ? 'Actualizar' : 'Registrar'}</Button>
            </Form>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={12}>
            <h3>Buscar Usuarios</h3>
            <Form onSubmit={handleSearch}>
              <Row className="mb-3">
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el ID del usuario"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <Button type="submit" variant="primary" className="mb-3 w-100">Buscar</Button>
                </Col>
                <Col md={3}>
                  <Button variant="primary" className="mb-3 w-100" onClick={fetchUsers}>Mostrar Todos</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        {showTable && (
          <Row>
            <Col md={12}>
              <h3>Lista de Usuarios</h3>
              <Table bordered>
                <thead className="thead-light">
                  <tr>
                    <th>ID</th>
                    <th>Apellidos</th>
                    <th>Nombres</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {showAll
                    ? users.map(user => (
                        <tr key={user.ID}>
                          <td>{user.ID}</td>
                          <td>{user.APELLIDOS}</td>
                          <td>{user.NOMBRES}</td>
                          <td>{roles.find(role => role.ID === user.IDROL)?.NOMBRE}</td>
                          <td>
                            <Button variant="warning" size="sm" onClick={() => handleEdit(user)}>Editar</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(user.ID)}>Eliminar</Button>
                          </td>
                        </tr>
                      ))
                    : users.length > 0 && (
                        <tr key={users[0].ID}>
                          <td>{users[0].ID}</td>
                          <td>{users[0].APELLIDOS}</td>
                          <td>{users[0].NOMBRES}</td>
                          <td>{roles.find(role => role.ID === users[0].IDROL)?.NOMBRE}</td>
                          <td>
                            <Button variant="warning" size="sm" onClick={() => handleEdit(users[0])}>Editar</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(users[0].ID)}>Eliminar</Button>
                          </td>
                        </tr>
                      )}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}

        <Row className="mt-5">
          <Col md={12} className="text-center">
            <h5>Gestión de Usuarios - CryoBus</h5>
            <p>Administre sus usuarios de manera eficiente y fácil.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Gestion;
