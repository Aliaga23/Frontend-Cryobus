import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

const Bitacora = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('https://proyecto2-production-ba5b.up.railway.app/api/bitacora');
        setLogs(response.data);
      } catch (error) {
        console.error('Error al obtener la bitácora:', error);
      }
    };

    fetchLogs();

    const socket = socketIOClient('https://proyecto2-production-ba5b.up.railway.app');
    socket.on('newLog', (newLog) => {
      setLogs((prevLogs) => [newLog, ...prevLogs]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container className="mt-5">
      <h3>Bitácora de Acciones</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Acción</th>
            <th>Usuario</th>
            <th>IP</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Elemento Modificado</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.NRO}>
              <td>{log.NRO}</td>
              <td>{log.IDACCION}</td>
              <td>{log.IDUSUARIO}</td>
              <td>{log.IP}</td>
              <td>{log.FECHA}</td>
              <td>{log.HORAACCION}</td>
              <td>{log.ELEMENTOMODIFICADO}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Bitacora;
