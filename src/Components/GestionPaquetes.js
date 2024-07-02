import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import styles from '../Assets/gestion_empleados.module.css';
import Swal from 'sweetalert2';

const GestionPaquetes = () => {
  const [paquetes, setPaquetes] = useState([]);
  const [tiposPaquete, setTiposPaquete] = useState([]);
  const [availableTiposPaquete, setAvailableTiposPaquete] = useState([]);
  const [newPaquete, setNewPaquete] = useState({
    codigo: ''
  });
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    codigopaquete: '',
    nro: '',
    descripcion: '',
    pesoindividual: ''
  });
  const [newTipoPaquete, setNewTipoPaquete] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editPaquete, setEditPaquete] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [showModalItems, setShowModalItems] = useState(false);
  const [showModalTipos, setShowModalTipos] = useState(false);
  const [selectedPaquete, setSelectedPaquete] = useState(null);
  const [error, setError] = useState(null);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchPaquetes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/paquetes`);
      setPaquetes(response.data);
      setShowTable(true);
    } catch (error) {
      console.error('Error al obtener los paquetes:', error);
    }
  };

  const fetchItems = async (codigoPaquete) => {
    try {
      const response = await axios.get(`${backendUrl}/api/items/${codigoPaquete}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error al obtener los items:', error);
    }
  };

  const fetchTiposPaquete = async (codigoPaquete) => {
    try {
      const response = await axios.get(`${backendUrl}/api/paquetes/${codigoPaquete}/tipos`);
      setTiposPaquete(response.data);
    } catch (error) {
      console.error('Error al obtener los tipos de paquete:', error);
    }
  };

  const fetchAvailableTiposPaquete = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/tipoPaquete`);
      setAvailableTiposPaquete(response.data);
    } catch (error) {
      console.error('Error al obtener los tipos de paquete disponibles:', error);
    }
  };

  useEffect(() => {
    fetchPaquetes();
    fetchAvailableTiposPaquete();
  }, []);

  const handleChangePaquete = (e) => {
    setNewPaquete({ ...newPaquete, [e.target.name]: e.target.value });
  };

  const handleChangeItem = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSubmitPaquete = async (e) => {
    e.preventDefault();
    try {
      if (editPaquete) {
        await axios.put(`${backendUrl}/api/paquetes/${editPaquete.CODIGO}`, newPaquete);
        setEditPaquete(null);
      } else {
        await axios.post(`${backendUrl}/api/paquetes`, newPaquete);
      }
      setNewPaquete({ codigo: '' });
      fetchPaquetes();
    } catch (error) {
      console.error('Error al registrar el paquete:', error);
    }
  };

  const handleSubmitItem = async (e) => {
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
        await axios.post(`${backendUrl}/api/items`, { ...newItem, codigopaquete: selectedPaquete.CODIGO });
        Swal.fire({
          title: "¡Item registrado!",
          text: "El item se ha registrado correctamente.",
          icon: "success"
        });
      }
      setNewItem({ codigopaquete: '', nro: '', descripcion: '', pesoindividual: '' });
      fetchItems(selectedPaquete.CODIGO);
    } catch (error) {
      setError('Error al registrar el item');
      console.error('Error al registrar el item:', error);
    }
  };

  const handleAddTipoPaquete = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/paquetes/${selectedPaquete.CODIGO}/tipos`, { idTipoPaquete: newTipoPaquete });
      fetchTiposPaquete(selectedPaquete.CODIGO);
      setNewTipoPaquete('');
    } catch (error) {
      console.error('Error al añadir tipo de paquete:', error);
    }
  };

  const handleEditPaquete = (paquete) => {
    setNewPaquete({
      codigo: paquete.CODIGO
    });
    setEditPaquete(paquete);
  };

  const handleEditItem = (item) => {
    setNewItem({
      codigopaquete: item.CODIGOPAQUETE,
      nro: item.NRO,
      descripcion: item.DESCRIPCION,
      pesoindividual: item.PESOINDIVIDUAL
    });
    setEditItem(item);
  };

  const handleDeletePaquete = async (codigo) => {
    try {
      await axios.delete(`${backendUrl}/api/paquetes/${codigo}`);
      fetchPaquetes();
    } catch (error) {
      console.error('Error al eliminar el paquete:', error);
    }
  };

  const handleDeleteItem = async (codigopaquete, nro) => {
    try {
      await axios.delete(`${backendUrl}/api/items/${codigopaquete}/${nro}`);
      fetchItems(selectedPaquete.CODIGO);
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

  const handleDeleteTipoPaquete = async (idTipoPaquete) => {
    try {
      await axios.delete(`${backendUrl}/api/paquetes/${selectedPaquete.CODIGO}/tipos`, { data: { idTipoPaquete } });
      fetchTiposPaquete(selectedPaquete.CODIGO);
    } catch (error) {
      console.error('Error al eliminar el tipo de paquete:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${backendUrl}/api/paquetes/${searchTerm}`);
      setPaquetes([response.data]);
      setShowTable(true);
    } catch (error) {
      console.error('Error al buscar el paquete:', error);
    }
  };

  const openModalItems = (paquete) => {
    setSelectedPaquete(paquete);
    fetchItems(paquete.CODIGO);
    setShowModalItems(true);
  };

  const closeModalItems = () => {
    setShowModalItems(false);
    setSelectedPaquete(null);
    setItems([]);
  };

  const openModalTipos = (paquete) => {
    setSelectedPaquete(paquete);
    fetchTiposPaquete(paquete.CODIGO);
    setShowModalTipos(true);
  };

  const closeModalTipos = () => {
    setShowModalTipos(false);
    setSelectedPaquete(null);
    setTiposPaquete([]);
  };

  return (
    <Container className={styles.gestionContainer}>
      <Row className="mt-5">
        <Col xs={12}>
          <h3>{editPaquete ? 'Editar Paquete' : 'Registrar Nuevo Paquete'}</h3>
          <Form onSubmit={handleSubmitPaquete}>
            <Form.Group>
              <Form.Label htmlFor="codigo">Código</Form.Label>
              <Form.Control type="text" id="codigo" name="codigo" value={newPaquete.codigo} onChange={handleChangePaquete} placeholder="Ingrese el código del paquete" />
            </Form.Group>
            <Button type="submit" variant="primary" className="mb-3">{editPaquete ? 'Actualizar' : 'Registrar'}</Button>
          </Form>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col xs={12}>
          <h3>Buscar Paquetes</h3>
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
              <Col xs={6} sm={3}>
                <Button type="submit" variant="primary" className="mb-3 w-100">Buscar</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {showTable && (
        <Row>
          <Col xs={12}>
            <h3>Lista de Paquetes</h3>
            <div className="table-responsive">
              <Table bordered>
                <thead className="thead-light">
                  <tr>
                    <th>Código</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {paquetes.length > 0 ? (
                    paquetes.map(paquete => (
                      <tr key={paquete.CODIGO}>
                        <td>{paquete.CODIGO}</td>
                        <td>
                          <Button variant="warning" size="sm" onClick={() => handleEditPaquete(paquete)}>Editar</Button>
                          <Button variant="danger" size="sm" onClick={() => handleDeletePaquete(paquete.CODIGO)}>Eliminar</Button>
                          <Button variant="info" size="sm" onClick={() => openModalItems(paquete)}>Añadir Item</Button>
                          <Button variant="dark" size="sm" onClick={() => openModalTipos(paquete)}>Añadir Tipo de Paquete</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">No se encontraron paquetes</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      )}

      <Modal show={showModalItems} onHide={closeModalItems}>
        <Modal.Header closeButton>
          <Modal.Title>Gestionar Items del Paquete {selectedPaquete?.CODIGO}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitItem}>
            <Form.Group>
              <Form.Label>Número</Form.Label>
              <Form.Control type="text" name="nro" value={newItem.nro} onChange={handleChangeItem} placeholder="Ingrese el número del item" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" name="descripcion" value={newItem.descripcion} onChange={handleChangeItem} placeholder="Ingrese la descripción del item" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Peso Individual</Form.Label>
              <Form.Control type="text" name="pesoindividual" value={newItem.pesoindividual} onChange={handleChangeItem} placeholder="Ingrese el peso individual del item" />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2">{editItem ? 'Actualizar' : 'Registrar'}</Button>
          </Form>
          <Table bordered className="mt-4">
            <thead>
              <tr>
                <th>Número</th>
                <th>Descripción</th>
                <th>Peso Individual</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map(item => (
                  <tr key={item.NRO}>
                    <td>{item.NRO}</td>
                    <td>{item.DESCRIPCION}</td>
                    <td>{item.PESOINDIVIDUAL}</td>
                    <td>
                      <Button variant="warning" size="sm" onClick={() => handleEditItem(item)}>Editar</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteItem(item.CODIGOPAQUETE, item.NRO)}>Eliminar</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No se encontraron items</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalItems}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalTipos} onHide={closeModalTipos}>
        <Modal.Header closeButton>
          <Modal.Title>Gestionar Tipos de Paquete del Paquete {selectedPaquete?.CODIGO}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddTipoPaquete}>
            <Form.Group>
              <Form.Label>Tipo de Paquete</Form.Label>
              <Form.Control as="select" value={newTipoPaquete} onChange={(e) => setNewTipoPaquete(e.target.value)}>
                <option value="">Seleccione un tipo de paquete</option>
                {availableTiposPaquete.map(tipo => (
                  <option key={tipo.ID} value={tipo.ID}>{tipo.NOMBRE}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2">Añadir Tipo de Paquete</Button>
          </Form>
          <Table bordered className="mt-4">
            <thead>
              <tr>
                <th>Tipo de Paquete</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tiposPaquete.length > 0 ? (
                tiposPaquete.map(tipo => (
                  <tr key={tipo.ID}>
                    <td>{tipo.NOMBRE}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteTipoPaquete(tipo.ID)}>Eliminar</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">No se encontraron tipos de paquete</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalTipos}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GestionPaquetes;
