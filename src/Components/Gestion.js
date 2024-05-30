import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import styles from '../Assets/gestion_empleados.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

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
      } else {
        console.error('Error inesperado al obtener los usuarios:', response);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error al obtener los usuarios:', error.response.data);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
      } else {
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
      Swal.fire({
        title: "¡Usuario creado!",
        text: "El usario se creo correctamente.",
        icon: "success"
      });
      fetchUsers(); // Fetch all users again to update the list
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      Swal.fire({
        title: "Error",
        text: "Rol no autorizado",
        icon: "error"
      });
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
      const result = await Swal.fire({
        title: "Estas seguro?",
        
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si , estoy seguro"
      });
  
      if (result.isConfirmed) {
        await axios.delete(`${backendUrl}/api/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        Swal.fire({
          title: "Usuario Eliminado",
          
          icon: "success"
        });
  
        fetchUsers(); // Fetch all users again to update the list
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      Swal.fire({
        title: "Error",
        text: "Rol no autorizado",
        icon: "error"
      });
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
      setUsers(response.data ? [response.data] : []);
      setShowTable(true);
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      setUsers([]);
      setShowTable(true);
    }
  };

  const handleCancelEdit = () => {
    setEditUser(null);
    setNewUser({ id: '', apellidos: '', nombres: '', contra: '', idRol: '' });
  };

  const handleCancelSearch = () => {
    setSearchTerm('');
    fetchUsers();
  };

  return (
    <div className={styles.gestionContainer}>
      <Container className="mt-5">
        <Row className="mb-5">
          <Col xs={12}>
            <h3>{editUser ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</h3>
            <Form >
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
                <Form.Control as="select" id="idRol" name="idRol" value={newUser.idRol} onChange={handleChange} className="mb-3 w-90">
                  <option value="">Seleccione un rol</option>
                  {roles.map(role => (
                    <option key={role.ID} value={role.ID}>{role.NOMBRE}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary" className="mb-3"onClick={handleSubmit}>{editUser ? 'Actualizar' : 'Registrar'}</Button>
              {editUser && <Button type="submit" variant="secondary" onClick={handleCancelEdit}>Cancelar</Button>}
            </Form>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col xs={12}>
            <h3>Buscar Usuarios</h3>
            <Form>
              <Row className="mb-3">
                <Col className="w-50 ">
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el ID del usuario"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>
              
              </Row>
              <Row >
                  <Col xs="auto">
                  <Button size="lg"  variant="primary" style={{ width: '150px' }} onClick={handleSearch}>Buscar</Button>
                </Col>
                <Col xs="auto" >
                <Button  size="lg" variant="dark" style={{ width: '150px' }} onClick={handleCancelSearch}>Cancelar</Button>
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
                <Table bordered striped>
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
                    {users.length > 0 ? (
                      users.map(user => (
                        <tr key={user.ID}>
                          <td>{user.ID}</td>
                          <td>{user.APELLIDOS}</td>
                          <td>{user.NOMBRES}</td>
                          <td>{roles.find(role => role.ID === user.IDROL)?.NOMBRE}</td>
                          <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(user)}
                      className="me-2"
                    >
                      <FontAwesomeIcon icon={faEdit} /> Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(user.ID)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
                    </Button>
                  </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">Usuario Inexistente</td>
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
