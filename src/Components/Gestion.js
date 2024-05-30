import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import styles from '../Assets/gestion_empleados.module.css';

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
  const [showAll, setShowAll] = useState(false);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

    if (!token) {
      console.error('Token no encontrado. Asegúrate de que el usuario esté autenticado.');
      return;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setUsers(response.data);
        setShowTable(true);
        setShowAll(true);
      } else {
        console.error('Error inesperado al obtener los usuarios:', response);
      }
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error('Error al obtener los usuarios:', error.response.data);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió ninguna respuesta
        console.error('No se recibió respuesta del servidor:', error.request);
      } else {
        // Algo sucedió en la configuración de la solicitud que desencadenó un error
        console.error('Error al configurar la solicitud:', error.message);
      }
    }
  };

  const fetchRoles = async () => {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    try {
      const response = await axios.get(`${backendUrl}/api/roles`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setRoles(response.data);
    } catch (error) {
      console.error('Error al obtener los roles:', error);
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    try {
      if (editUser) {
        await axios.put(`${backendUrl}/api/users/${editUser.ID}`, newUser, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setEditUser(null);
      } else {
        await axios.post(`${backendUrl}/api/users`, newUser, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
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
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    try {
      await axios.delete(`${backendUrl}/api/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    try {
      const response = await axios.get(`${backendUrl}/api/users/${searchTerm}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers([response.data]);
      setShowTable(true);
      setShowAll(false);
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
    }
  };


  return (
    <div className={styles.gestionContainer}>
      <Container className="mt-5">
        <Row className="mb-5">
          <Col xs={12}>
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
                <Form.Control as="select" id="idRol" name="idRol" value={newUser.idRol} onChange={handleChange} className="mb-3">
                  <option value="">Seleccione un rol</option>
                  {roles.map(role => (
                    <option key={role.ID} value={role.ID}>{role.NOMBRE}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary" className="mb-3">{editUser ? 'Actualizar' : 'Registrar'}</Button>
            </Form>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col xs={12}>
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
                <Col xs={6} sm={3}>
                  <Button type="submit" variant="primary" className="mb-3 w-100">Buscar</Button>
                </Col>
                <Col xs={6} sm={3}>
                  <Button variant="primary" className="mb-3 w-100" onClick={fetchUsers}>Mostrar Todos</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        {showTable && (
          <Row>
            <Col xs={12}>
              <h3>Lista de Usuarios</h3>
              <div className="table-responsive">
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
              </div>
            </Col>
          </Row>
        )}

        <Row className="mt-5">
          <Col xs={12} className="text-center">
            <h5>Gestión de Usuarios - CryoBus</h5>
            <p>Administre sus usuarios de manera eficiente y fácil.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Gestion;
