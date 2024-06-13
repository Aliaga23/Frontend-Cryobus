import React, { useEffect, useState } from 'react';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import io from 'socket.io-client';
import axios from 'axios';

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
    { name: 'ELEMENTOMODIFICADO', label: 'ELEMENTOMODIFICADO' }
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'standard',
    rowsPerPage: 40,
    rowsPerPageOptions: [40, 80, 120],
    download: false,
    selectableRows: 'none', // Esta opción elimina los checkboxes
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
            textAlign: 'center', // Center align text in table cells
            padding: '6px', // Uniform padding
            fontSize: '12px', // Uniform font size
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
              fontSize: '14px', // Larger font size for header
              fontWeight: 'bold',
            }
          }
        }
      }
    }
  });

  return (
    <Container>
      <style>
        {`
          @media print {
            .MuiTableCell-root {
              font-size: 10px; // Slightly smaller font size for print
              padding: 4px;
              text-align: center; // Center align text in table cells for print
            }
            .MuiTableRow-root {
              height: auto;
            }
            .MuiTableHead-root {
              font-size: 12px;
              text-align: center; // Center align text in table header cells for print
            }
            h3 {
              font-size: 14px;
              text-align: center; // Center align text for title
            }
            .MuiTable-root {
              width: 100% !important; // Ensure table takes full width for print
            }
          }
          @media (max-width: 600px) {
            .MuiTable-root {
              font-size: 8px; // Smaller font size for mobile
            }
            .MuiTableCell-root {
              padding: 4px; // Smaller padding for mobile
            }
          }
        `}
      </style>
      <h3 className="mt-3">Bitácora de Acciones</h3>
      <div className="table-responsive mt-2">
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable 
            title={"Bitácora de Acciones"}
            data={registros}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    </Container>
  );
};

export default Bitacora;