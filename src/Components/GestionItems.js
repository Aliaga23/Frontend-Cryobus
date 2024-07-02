import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table,  Alert } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Assets/gestion_empleados.module.css';

const GestionItems = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    codigopaquete: '',
    nro: '',
    descripcion: '',
    pesoindividual: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [error, setError] = useState(null);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/items`);
      setItems(response.data);
      setShowTable(true);
    } catch (error) {
      setError('Error al obtener los items');
      console.error('Error al obtener los items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await axios.put(`${backendUrl}/api/items/${editItem.CODIGOPAQUETE}/${editItem.NRO}`, newItem);
        setEditItem(null);
        Swal.fire({
          title: "¡Item actualizado!",
          text: "El item se ha actualizado correctamente.",
          icon: "success"
        });
      } else {
        await axios.post(`${backendUrl}/api/items`, newItem);
        Swal.fire({
          title: "¡Item registrado!",
          text: "El item se ha registrado correctamente.",
          icon: "success"
        });
      }
      setNewItem({ codigopaquete: '', nro: '', descripcion: '', pesoindividual: '' });
      fetchItems();
    } catch (error) {
      setError('Error al registrar el item');
      console.error('Error al registrar el item:', error);
    }
  };

  const handleEdit = (item) => {
    setNewItem({
      codigopaquete: item.CODIGOPAQUETE,
      nro: item.NRO,
      descripcion: item.DESCRIPCION,
      pesoindividual: item.PESOINDIVIDUAL
    });
    setEditItem(item);
  };

  const handleDelete = async (codigopaquete, nro) => {
    try {
      await axios.delete(`${backendUrl}/api/items/${codigopaquete}/${nro}`);
      fetchItems();
      Swal.fire({
        title: "¡Item eliminado!",
        text: "El item se ha eliminado correctamente.",
        icon: "success"
      });
    } catch (error) {
      setError('Error al eliminar el item');
      console.error('Error al eliminar el item:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${backendUrl}/api/items/${searchTerm}`);
      if (Array.isArray(response.data)) {
        setItems(response.data);
      } else {
        setItems([response.data]);
      }
      setShowTable(true);
    } catch (error) {
      setError('Error al buscar el item');
      console.error('Error al buscar el item:', error);
    }
  };

  const handleCancelSearch = () => {
    setSearchTerm('');
    fetchItems();
  };

  return (
    <Container className>
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

        <Row className="mt-5">
        <Col xs={12}>
          <h3>{editItem ? 'Editar Item' : 'Registrar Nuevo Item'}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="codigopaquete">Código del Paquete</Form.Label>
              <Form.Control type="text" id="codigopaquete" name="codigopaquete" value={newItem.codigopaquete} onChange={handleChange} placeholder="Ingrese el código del paquete" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="nro">Número</Form.Label>
              <Form.Control type="text" id="nro" name="nro" value={newItem.nro} onChange={handleChange} placeholder="Ingrese el número del item" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="descripcion">Descripción</Form.Label>
              <Form.Control type="text" id="descripcion" name="descripcion" value={newItem.descripcion} onChange={handleChange} placeholder="Ingrese la descripción del item" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="pesoindividual">Peso Individual</Form.Label>
              <Form.Control type="text" id="pesoindividual" name="pesoindividual" value={newItem.pesoindividual} onChange={handleChange} placeholder="Ingrese el peso individual del item" />
            </Form.Group>
            <Button type="submit" variant="primary" className="mb-3">{editItem ? 'Actualizar' : 'Registrar'}</Button>
          </Form>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col xs={12}>
          <h3>Buscar Items</h3>
          <Form onSubmit={handleSearch}>
            <Row className="mb-3">
              <Col className="w-50">
                <Form.Control
                  type="text"
                  placeholder="Ingrese el código del paquete"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="auto">
                <Button size="lg" variant="primary" style={{ width: '150px' }} onClick={handleSearch}>Buscar</Button>
              </Col>
              <Col xs="auto">
                <Button size="lg" variant="dark" style={{ width: '150px' }} onClick={handleCancelSearch}>Cancelar</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {showTable && (
        <Row>
          <Col xs={12}>
            <h3>Lista de Items</h3>
            <div className="table-responsive">
              <Table bordered hover striped responsive="sm">
                <thead className="thead-dark">
                  <tr>
                    <th>Código del Paquete</th>
                    <th>Número</th>
                    <th>Descripción</th>
                    <th>Peso Individual</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={`${item.CODIGOPAQUETE}-${item.NRO}`}>
                      <td>{item.CODIGOPAQUETE}</td>
                      <td>{item.NRO}</td>
                      <td>{item.DESCRIPCION}</td>
                      <td>{item.PESOINDIVIDUAL}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="me-2"
                        >
                          <FontAwesomeIcon icon={faEdit} /> Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(item.CODIGOPAQUETE, item.NRO)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default GestionItems;
