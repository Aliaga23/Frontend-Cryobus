import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import styles from '../Assets/gestion_empleados.module.css';

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
  const [showAll, setShowAll] = useState(false);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/items`);
      setItems(response.data);
      setShowTable(true);
      setShowAll(true);
    } catch (error) {
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
      } else {
        await axios.post(`${backendUrl}/api/items`, newItem);
      }
      setNewItem({ codigopaquete: '', nro: '', descripcion: '', pesoindividual: '' });
      fetchItems();
    } catch (error) {
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
    } catch (error) {
      console.error('Error al eliminar el item:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${backendUrl}/api/items/${searchTerm}`);
      setItems([response.data]);
      setShowTable(true);
      setShowAll(false);
    } catch (error) {
      console.error('Error al buscar el item:', error);
    }
  };

  return (
    <Container className={styles.gestionContainer}>
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
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el código del paquete"
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
                <Button variant="primary" className="mb-3 w-100" onClick={fetchItems}>Mostrar Todos</Button>
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
              <Table bordered>
                <thead className="thead-light">
                  <tr>
                    <th>Código del Paquete</th>
                    <th>Número</th>
                    <th>Descripción</th>
                    <th>Peso Individual</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {showAll
                    ? items.map(item => (
                        <tr key={`${item.CODIGOPAQUETE}-${item.NRO}`}>
                          <td>{item.CODIGOPAQUETE}</td>
                          <td>{item.NRO}</td>
                          <td>{item.DESCRIPCION}</td>
                          <td>{item.PESOINDIVIDUAL}</td>
                          <td>
                            <Button variant="warning" size="sm" onClick={() => handleEdit(item)}>Editar</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(item.CODIGOPAQUETE, item.NRO)}>Eliminar</Button>
                          </td>
                        </tr>
                      ))
                    : items.length > 0 && (
                        <tr key={`${items[0].CODIGOPAQUETE}-${items[0].NRO}`}>
                          <td>{items[0].CODIGOPAQUETE}</td>
                          <td>{items[0].NRO}</td>
                          <td>{items[0].DESCRIPCION}</td>
                          <td>{items[0].PESOINDIVIDUAL}</td>
                          <td>
                            <Button variant="warning" size="sm" onClick={() => handleEdit(items[0])}>Editar</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(items[0].CODIGOPAQUETE, items[0].NRO)}>Eliminar</Button>
                          </td>
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

export default GestionItems;
