import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, InputGroup, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
const GestionRecepcion = () => {
  const { user } = useAuth();
  const [recepciones, setRecepciones] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [newRecepcion, setNewRecepcion] = useState({
    nro: '',
    fechaRecepcion: '',
    horaRecepcion: '',
    precioEstimado: '',
    idUsuarioRecepcion: user ? user.id : '',
    codigoClienteEnvia: '',
    codigoPaquete: ''
  });
  const [editRecepcion, setEditRecepcion] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [error, setError] = useState(null);

  const backendUrl = 'https://proyecto2-production-ba5b.up.railway.app';

  const fetchRecepciones = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/recepciones`);
      setRecepciones(response.data);
      setShowTable(true);
    } catch (error) {
      setError('Error al obtener las recepciones');
      console.error('Error al obtener las recepciones:', error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/clientes`);
      setClientes(response.data);
    } catch (error) {
      setError('Error al obtener los clientes');
      console.error('Error al obtener los clientes:', error);
    }
  };

  const fetchPaquetes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/paquetes`);
      setPaquetes(response.data);
    } catch (error) {
      setError('Error al obtener los paquetes');
      console.error('Error al obtener los paquetes:', error);
    }
  };

  useEffect(() => {
    fetchRecepciones();
    fetchClientes();
    fetchPaquetes();
  }, []);

  const handleChange = (e) => {
    setNewRecepcion({ ...newRecepcion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editRecepcion) {
        await axios.put(`${backendUrl}/api/recepciones/${editRecepcion.nro}`, newRecepcion);
        setEditRecepcion(null);
        Swal.fire({
          title: "¡Recepción actualizada!",
          text: "La recepción se ha actualizado correctamente.",
          icon: "success"
        });
      } else {
        await axios.post(`${backendUrl}/api/recepciones`, newRecepcion);
        Swal.fire({
          title: "¡Recepción registrada!",
          text: "La recepción se ha registrado correctamente.",
          icon: "success"
        });
      }
      setNewRecepcion({
        nro: '',
        fechaRecepcion: '',
        horaRecepcion: '',
        precioEstimado: '',
        idUsuarioRecepcion: user ? user.id : '',
        codigoClienteEnvia: '',
        codigoPaquete: ''
      });
      fetchRecepciones();
    } catch (error) {
      setError('Error al registrar la recepción');
      console.error('Error al registrar la recepción:', error);
    }
  };

  const handleEdit = (recepcion) => {
    setNewRecepcion({
      nro: recepcion.nro,
      fechaRecepcion: recepcion.fechaRecepcion,
      horaRecepcion: recepcion.horaRecepcion,
      precioEstimado: recepcion.precioEstimado,
      idUsuarioRecepcion: recepcion.idUsuarioRecepcion,
      codigoClienteEnvia: recepcion.codigoClienteEnvia,
      codigoPaquete: recepcion.codigoPaquete
    });
    setEditRecepcion(recepcion);
  };

  const handleDelete = async (nro) => {
    try {
      await axios.delete(`${backendUrl}/api/recepciones/${nro}`);
      fetchRecepciones();
      Swal.fire({
        title: "¡Recepción eliminada!",
        text: "La recepción se ha eliminado correctamente.",
        icon: "success"
      });
    } catch (error) {
      setError('Error al eliminar la recepción');
      console.error('Error al eliminar la recepción:', error);
    }
  };

  return (
    <Container className="mt-5">
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      <Row className="mb-5">
        <Col md={12}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>{ editRecepcion ? 'Editar Recepción' : 'Registrar Nueva Recepción'}</h3>
          </div>
          <Form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
            <Form.Group className="mb-3">
              <InputGroup className="input-group-lg">
                <InputGroup.Text>Nro</InputGroup.Text>
                <Form.Control
                 
                  placeholder="Ingrese el número de la nota de entrega"
                  id="nro"
                  name="nro"
                  value={newRecepcion.nro}
                  onChange={handleChange}
                  aria-label="Nro"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup className="input-group-lg">
                <InputGroup.Text>Fecha</InputGroup.Text>
                <Form.Control
                  type="date"
                  id="fechaRecepcion"
                  name="fechaRecepcion"
                  value={newRecepcion.fechaRecepcion}
                  onChange={handleChange}
                  aria-label="Fecha de Recepción"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup className="input-group-lg">
                <InputGroup.Text>Hora</InputGroup.Text>
                <Form.Control
                  type="time"
                  id="horaRecepcion"
                  name="horaRecepcion"
                  value={newRecepcion.horaRecepcion}
                  onChange={handleChange}
                  aria-label="Hora de Recepción"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup className="input-group-lg">
                <InputGroup.Text>Precio</InputGroup.Text>
                <Form.Control
                  
                  placeholder="Ingrese el precio estimado"
                  id="precioEstimado"
                  name="precioEstimado"
                  value={newRecepcion.precioEstimado}
                  onChange={handleChange}
                  aria-label="Precio Estimado"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup className="input-group-lg">
                <InputGroup.Text>Cliente</InputGroup.Text>
                <Form.Control
                  as="select"
                  id="codigoClienteEnvia"
                  name="codigoClienteEnvia"
                  value={newRecepcion.codigoClienteEnvia}
                  onChange={handleChange}
                  aria-label="Cliente que Envia"
                >
                  <option value="">Seleccione un cliente</option>
                  {clientes.map(cliente => (
                    <option key={cliente.CODIGO} value={cliente.CODIGO}>
                      {cliente.NOMBRES} {cliente.APELLIDOS}
                    </option>
                  ))}
                </Form.Control>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup className="input-group-lg">
                <InputGroup.Text>Paquete</InputGroup.Text>
                <Form.Control
                  as="select"
                  id="codigoPaquete"
                  name="codigoPaquete"
                  value={newRecepcion.codigoPaquete}
                  onChange={handleChange}
                  aria-label="Paquete"
                >
                  <option value="">Seleccione un paquete</option>
                  {paquetes.map(paquete => (
                    <option key={paquete.CODIGO} value={paquete.CODIGO}>
                      {paquete.CODIGO}
                    </option>
                  ))}
                </Form.Control>
              </InputGroup>
            </Form.Group>
            <Button type="submit" variant="primary" size="lg" >
              {editRecepcion ? 'Actualizar' : 'Registrar'}
            </Button>
          </Form>
        </Col>
      </Row>
      {showTable && (
        <Row>
          <Col md={12}>
            <h3>Lista de Recepciones</h3>
            <div className="table-responsive">
              <Table bordered hover striped responsive="sm">
                <thead className="thead-dark">
                  <tr>
                    <th>Número de Nota de Entrega</th>
                    <th>Fecha de Recepción</th>
                    <th>Hora de Recepción</th>
                    <th>Precio Estimado</th>
                    <th>Cliente que Envia</th>
                    <th>Paquete</th>
                    <th>ID del Usuario</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {recepciones.map(recepcion => (
                    <tr key={recepcion.NRO}>
                            <td>{recepcion.NRO}</td>
                        <td>{format(new Date(recepcion.FECHARECEPCION), 'yyyy-MM-dd')}</td>
                        <td>{recepcion.HORARECEPCION}</td>
                        <td>{recepcion.PRECIOESTIMADO}</td>
                        <td>{recepcion.CODIGOCLIENTEENVIA}</td>
                        <td>{recepcion.CODIGOPAQUETE}</td>
                        <td>{recepcion.IDUSUARIORECIBE}</td>
                      <td>
                        <Button variant="warning" size="sm" onClick={() => handleEdit(recepcion)} className="me-2">
                          <FontAwesomeIcon icon={faEdit} /> Editar
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(recepcion.nro)}>
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

export default GestionRecepcion;
