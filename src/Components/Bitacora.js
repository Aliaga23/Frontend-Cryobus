import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import io from 'socket.io-client';
import axios from 'axios';
import moment from 'moment';

const socket = io('https://proyecto2-production-ba5b.up.railway.app'); // URL de tu servidor

const Bitacora = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await axios.get('https://proyecto2-production-ba5b.up.railway.app/api/bitacora'); // Ajustar URL
        setRegistros(response.data);
      } catch (error) {
        console.error('Error al obtener la bitácora:', error);
      }
    };

    fetchRegistros();

    socket.on('nuevaAccion', (nuevoRegistro) => {
      setRegistros((prevRegistros) => [nuevoRegistro, ...prevRegistros]);
    });

    return () => {
      socket.off('nuevaAccion');
    };
  }, []);

  return (
    <Container>
      <h3 className="mt-3">Bitácora de Acciones</h3>
      <div className="table-responsive mt-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>NRO</th>
              <th>IDACCION</th>
              <th>IDUSUARIO</th>
              <th>IP</th>
              <th>FECHA</th>
              <th>HORAACCION</th>
              <th>ELEMENTOMODIFICADO</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.NRO}>
                <td>{registro.NRO}</td>
                <td>{registro.IDACCION}</td>
                <td>{registro.IDUSUARIO}</td>
                <td>{registro.IP}</td>
                <td>{moment(registro.FECHA).format('YYYY-MM-DD')}</td>
                <td>{registro.HORAACCION}</td>
                <td>{registro.ELEMENTOMODIFICADO}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Bitacora;
