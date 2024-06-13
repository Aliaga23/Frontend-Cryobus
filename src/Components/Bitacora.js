import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Collapse, IconButton,
  Container, Paper, Box, Typography, TextField,
  TablePagination
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('https://proyecto2-production-ba5b.up.railway.app');

const Row = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{row.NRO}</TableCell>
        <TableCell>{row.IDACCION}</TableCell>
        <TableCell>{row.IDUSUARIO}</TableCell>
        <TableCell>{row.IP}</TableCell>
        <TableCell>{new Date(row.FECHA).toISOString().split('T')[0]}</TableCell>
        <TableCell>{row.HORAACCION}</TableCell>
        <TableCell>{row.ELEMENTOMODIFICADO}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {row.DETALLE}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Bitacora = () => {
  const [registros, setRegistros] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredRegistros, setFilteredRegistros] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await axios.get('https://proyecto2-production-ba5b.up.railway.app/api/bitacora');
        setRegistros(response.data);
        setFilteredRegistros(response.data);
      } catch (error) {
        console.error('Error al obtener la bitácora:', error);
      }
    };

    fetchRegistros();

    socket.on('nuevaAccion', (nuevoRegistro) => {
      setRegistros((prevRegistros) => [nuevoRegistro, ...prevRegistros]);
      setFilteredRegistros((prevRegistros) => [nuevoRegistro, ...prevRegistros]);
    });

    return () => {
      socket.off('nuevaAccion');
    };
  }, []);

  useEffect(() => {
    setFilteredRegistros(
      registros.filter((registro) =>
        Object.values(registro).some((value) =>
          value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      )
    );
  }, [searchText, registros]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <h3 className="mt-3">Bitácora de Acciones</h3>
      <TextField
        label="Buscar"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>NRO</TableCell>
                <TableCell>IDACCION</TableCell>
                <TableCell>IDUSUARIO</TableCell>
                <TableCell>IP</TableCell>
                <TableCell>FECHA</TableCell>
                <TableCell>HORA</TableCell>
                <TableCell>ELEMENTOMODIFICADO</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRegistros
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <Row key={row.NRO} row={row} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[50, 100, 150]}
          component="div"
          count={filteredRegistros.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Container>
  );
};

export default Bitacora;
