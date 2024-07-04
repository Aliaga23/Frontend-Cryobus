import React, { useEffect, useState, useCallback } from 'react';
import {
  Container, createTheme, ThemeProvider, Button, TextField, Box
} from '@mui/material';
import MUIDataTable from 'mui-datatables';
import io from 'socket.io-client';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import moment from 'moment';

const socket = io('https://proyecto2-production-ba5b.up.railway.app');

const ReporteTraslado = () => {
  const [registros, setRegistros] = useState([]);
  const [filteredRegistros, setFilteredRegistros] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await axios.get('https://proyecto2-production-ba5b.up.railway.app/api/notas-traslado');
        setRegistros(response.data);
        setFilteredRegistros(response.data);
      } catch (error) {
        console.error('Error al obtener las notas de traslado:', error);
      }
    };

    fetchRegistros();

    socket.on('nuevaTraslado', (nuevoTraslado) => {
      setRegistros((prevRegistros) => [nuevoTraslado, ...prevRegistros]);
      setFilteredRegistros((prevRegistros) => [nuevoTraslado, ...prevRegistros]);
    });

    return () => {
      socket.off('nuevaTraslado');
    };
  }, []);

  const filterRecords = useCallback(() => {
    if (startDate && endDate) {
      const filtered = registros.filter((record) => {
        const recordDate = new Date(record.FECHALLEGADA);
        return recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
      });
      setFilteredRegistros(filtered);
    } else {
      setFilteredRegistros(registros);
    }
  }, [startDate, endDate, registros]);

  useEffect(() => {
    filterRecords();
  }, [filterRecords]);

  const handleResetFilter = () => {
    setStartDate('');
    setEndDate('');
  };

  const columns = [
    { name: 'NRO', label: 'NRO' },
    { 
      name: 'FECHALLEGADA', 
      label: 'FECHA LLEGADA',
      options: {
        customBodyRender: (value) => moment(value).utc().format('YYYY-MM-DD')
      }
    },
    { 
      name: 'HORALLEGADA', 
      label: 'HORA LLEGADA',
    },
    { 
      name: 'FECHASALIDA', 
      label: 'FECHA SALIDA',
      options: {
        customBodyRender: (value) => moment(value).utc().format('YYYY-MM-DD')
      }
    },
    { 
      name: 'HORASALIDA', 
      label: 'HORA SALIDA',
    },
    { name: 'NROCAMION', label: 'NRO CAMION' },
    { name: 'IDPLANRUTA', label: 'ID PLAN RUTA' }
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

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredRegistros);

    // Add filters to the first row
    ws['!autofilter'] = { ref: 'A1:G1' };

    // Adjust column widths
    const wscols = [
      { wch: 5 }, // NRO
      { wch: 15 }, // FECHALLEGADA
      { wch: 15 }, // HORALLEGADA
      { wch: 15 }, // FECHASALIDA
      { wch: 15 }, // HORASALIDA
      { wch: 10 }, // NROCAMION
      { wch: 15 }  // IDPLANRUTA
    ];
    ws['!cols'] = wscols;

    // Add styles
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "NotasTraslado");

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: EXCEL_TYPE });
    saveAs(data, `NotasTraslado_${new Date().toLocaleDateString()}.xlsx`);
  };

  const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  return (
    <Container style={{ maxWidth: '1500px' }}>
      <h3 className="mt-3">Reporte de Notas de Traslado</h3>
      <ThemeProvider theme={getMuiTheme()}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
            label="Fecha de inicio"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ marginRight: 2 }}
          />
          <TextField
            label="Fecha de fin"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ marginRight: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleResetFilter}
            style={{ marginBottom: '16px' }}
          >
            Restablecer Filtro
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={exportToExcel}
            style={{ marginBottom: '16px' }}
          >
            Exportar a Excel
          </Button>
        </Box>
        <MUIDataTable
          title={"Notas de Traslado"}
          data={filteredRegistros}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </Container>
  );
};

export default ReporteTraslado;
