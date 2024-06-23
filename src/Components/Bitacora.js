import React, { useEffect, useState } from 'react';
import {
  Container, createTheme, ThemeProvider, Typography
} from '@mui/material';
import MUIDataTable from 'mui-datatables';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('https://proyecto2-production-ba5b.up.railway.app');

const Bitacora = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await axios.get('https://proyecto2-production-ba5b.up.railway.app/api/bitacora');
        setRegistros(response.data);
      } catch (error) {
        console.error('Error al obtener la bitacora:', error);
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

  const columns = [
    { name: 'NRO', label: 'NRO' },
    { name: 'IDACCION', label: 'IDACCION' },
    { name: 'IDUSUARIO', label: 'IDUSUARIO' },
    { name: 'IP', label: 'IP' },
    {
      name: 'FECHA',
      label: 'FECHA',
      options: {
        customBodyRender: (value) => new Date(value).toISOString().split('T')[0]
      }
    },
    { name: 'HORAACCION', label: 'HORA' },
    { name: 'ELEMENTOMODIFICADO', label: 'ELEMENTO MODIFICADO' },
    {
      name: 'DETALLE',
      label: 'DETALLE',
      options: {
        customBodyRender: (value) => (
          <Typography variant="body2" color="textSecondary">
            {value}
          </Typography>
        )
      }
    }
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'standard',
    rowsPerPage: 40,
    rowsPerPageOptions: [40, 80, 120],
    selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: "No se encontraron registros coincidentes",
        toolTip: "Ordenar",
        columnHeaderTooltip: column => `Ordenar por ${column.label}`
      },
      pagination: {
        next: "Siguiente Página",
        previous: "Página Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver Columnas",
        filterTable: "Filtrar Tabla",
      },
      filter: {
        all: "Todo",
        title: "FILTROS",
        reset: "REINICIAR",
      },
      viewColumns: {
        title: "Mostrar Columnas",
        titleAria: "Mostrar/Ocultar Columnas",
      },
      selectedRows: {
        text: "fila(s) seleccionada(s)",
        delete: "Eliminar",
        deleteAria: "Eliminar Filas Seleccionadas",
      },
    },
  };

  const getMuiTheme = () => createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            border: '1px solid rgba(224, 224, 224, 1)',
            textAlign: 'center',
            padding: '6px',
            fontSize: '12px',
          }
        }
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:nth-of-type(odd)': {
              backgroundColor: '#f9f9f9',
            },
          }
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-root': {
              fontSize: '14px',
              fontWeight: 'bold',
            }
          }
        }
      }
    }
  });

  return (
    <Container>
      <h3 className="mt-3">Bitácora de Acciones</h3>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Registro de acciones en la bitácora"}
          data={registros}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </Container>
  );
};

export default Bitacora;
