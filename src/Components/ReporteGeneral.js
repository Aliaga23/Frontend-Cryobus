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

const ReporteGeneral = () => {
  const [registros, setRegistros] = useState([]);
  const [filteredRegistros, setFilteredRegistros] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await axios.get('https://proyecto2-production-ba5b.up.railway.app/api/reporte_general');
        setRegistros(response.data);
        setFilteredRegistros(response.data);
      } catch (error) {
        console.error('Error al obtener las notas de entrega:', error);
      }
    };

    fetchRegistros();

    socket.on('nuevaEntrega', (nuevoEntrega) => {
      setRegistros((prevRegistros) => [nuevoEntrega, ...prevRegistros]);
      setFilteredRegistros((prevRegistros) => [nuevoEntrega, ...prevRegistros]);
    });

    return () => {
      socket.off('nuevaEntrega');
    };
  }, []);

  const filterRecords = useCallback(() => {
    if (startDate && endDate) {
      const filtered = registros.filter((record) => {
        const recordDate = new Date(record.FECHARECEPCION);
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
    { name: 'NotaEntregaNumero', label: 'Nota Entrega Número' },
    { 
      name: 'FECHARECEPCION', 
      label: 'Fecha Recepción',
      options: {
        customBodyRender: (value) => moment(value).utc().format('YYYY-MM-DD')
      }
    },
    { name: 'HORARECEPCION', label: 'Hora Recepción' },
    { 
      name: 'FECHAENTREGA', 
      label: 'Fecha Entrega',
      options: {
        customBodyRender: (value) => moment(value).utc().format('YYYY-MM-DD')
      }
    },
    { name: 'HORAENTREGA', label: 'Hora Entrega' },
    { name: 'PRECIOESTIMADO', label: 'Precio Estimado' },
    { name: 'CodigoClienteEnvia', label: 'Código Cliente Envía' },
    { name: 'ClienteEnviaApellidos', label: 'Apellidos Cliente Envía' },
    { name: 'ClienteEnviaNombres', label: 'Nombres Cliente Envía' },
    { name: 'CodigoClienteRecibe', label: 'Código Cliente Recibe' },
    { name: 'ClienteRecibeApellidos', label: 'Apellidos Cliente Recibe' },
    { name: 'ClienteRecibeNombres', label: 'Nombres Cliente Recibe' },
    { name: 'UsuarioEnviaID', label: 'ID Usuario Envía' },
    { name: 'UsuarioEnviaApellidos', label: 'Apellidos Usuario Envía' },
    { name: 'UsuarioEnviaNombres', label: 'Nombres Usuario Envía' },
    { name: 'UsuarioRecibeID', label: 'ID Usuario Recibe' },
    { name: 'UsuarioRecibeApellidos', label: 'Apellidos Usuario Recibe' },
    { name: 'UsuarioRecibeNombres', label: 'Nombres Usuario Recibe' },
    { name: 'EstadoEntrega', label: 'Estado Entrega' },
    { name: 'ReembolsoMotivo', label: 'Motivo Reembolso' },
    { name: 'PaqueteCodigo', label: 'Código Paquete' },
    { name: 'Departamento', label: 'Departamento' },
    { name: 'Localidad', label: 'Localidad' },
    { name: 'DireccionDescripcion', label: 'Descripción Dirección' },
    { 
      name: 'FECHASALIDAESPERADA', 
      label: 'Fecha Salida Esperada',
      options: {
        customBodyRender: (value) => moment(value).utc().format('YYYY-MM-DD')
      }
    },
    { name: 'HORASALIDAESPERADA', label: 'Hora Salida Esperada' },
    { 
      name: 'FECHALLEGADAESPERADA', 
      label: 'Fecha Llegada Esperada',
      options: {
        customBodyRender: (value) => moment(value).utc().format('YYYY-MM-DD')
      }
    },
    { name: 'HORALLEGADAESPERADA', label: 'Hora Llegada Esperada' },
    { name: 'ConductorCodigo', label: 'Código Conductor' },
    { name: 'ConductorApellidos', label: 'Apellidos Conductor' },
    { name: 'ConductorNombres', label: 'Nombres Conductor' },
    { name: 'RolConductor', label: 'Rol Conductor' },
    { name: 'CamionNumero', label: 'Número Camión' },
    { name: 'TipoCamion', label: 'Tipo Camión' },
    { name: 'NotaTrasladoNumero', label: 'Número Nota Traslado' },
    { 
      name: 'NotaTrasladoFechaLlegada', 
      label: 'Fecha Llegada Nota Traslado',
      options: {
        customBodyRender: (value) => moment(value).utc().format('YYYY-MM-DD')
      }
    },
    { name: 'NotaTrasladoHoraLlegada', label: 'Hora Llegada Nota Traslado' },
    { 
      name: 'NotaTrasladoFechaSalida', 
      label: 'Fecha Salida Nota Traslado',
      options: {
        customBodyRender: (value) => moment(value).utc().format('YYYY-MM-DD')
      }
    },
    { name: 'NotaTrasladoHoraSalida', label: 'Hora Salida Nota Traslado' },
    { 
      name: 'FECHALLEGADAPAQUETE', 
      label: 'Fecha Llegada Paquete',
      options: {
        customBodyRender: (value) => moment(value).utc().format('YYYY-MM-DD')
      }
    },
    { name: 'HORALLEGADAPAQUETE', label: 'Hora Llegada Paquete' },
    { 
      name: 'FECHASALIDAPAQUETE', 
      label: 'Fecha Salida Paquete',
      options: {
        customBodyRender: (value) => moment(value).utc().format('YYYY-MM-DD')
      }
    },
    { name: 'HORASALIDAPAQUETE', label: 'Hora Salida Paquete' },
    { name: 'LOCALIDADDESTINO', label: 'Localidad Destino' },
    { name: 'DEPARTAMENTODESTINO', label: 'Departamento Destino' },
    { name: 'NOMBREDEPARTAMENTO', label: 'Nombre Departamento' },
    { name: 'NOMBRELOCALIDAD', label: 'Nombre Localidad' },
    { name: 'DireccionID', label: 'ID Dirección' },
    { name: 'IDTIPOPAQUETE', label: 'ID Tipo Paquete' },
    { name: 'TipoPaqueteNombre', label: 'Nombre Tipo Paquete' },
    { name: 'ItemDescripcion', label: 'Descripción Item' },
    { name: 'ItemPeso', label: 'Peso Item' },
    { name: 'ClienteCelular', label: 'Celular Cliente' }
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
    ws['!autofilter'] = { ref: 'A1:BG1' }; // Ajustar la referencia según el número total de columnas
  
    // Adjust column widths
    const wscols = [
      { wch: 5 },  // NotaEntregaNumero
      { wch: 15 }, // FECHARECEPCION
      { wch: 10 }, // HORARECEPCION
      { wch: 15 }, // FECHAENTREGA
      { wch: 10 }, // HORAENTREGA
      { wch: 12 }, // PRECIOESTIMADO
      { wch: 10 }, // CodigoClienteEnvia
      { wch: 20 }, // ClienteEnviaApellidos
      { wch: 20 }, // ClienteEnviaNombres
      { wch: 10 }, // CodigoClienteRecibe
      { wch: 20 }, // ClienteRecibeApellidos
      { wch: 20 }, // ClienteRecibeNombres
      { wch: 10 }, // UsuarioEnviaID
      { wch: 20 }, // UsuarioEnviaApellidos
      { wch: 20 }, // UsuarioEnviaNombres
      { wch: 10 }, // UsuarioRecibeID
      { wch: 20 }, // UsuarioRecibeApellidos
      { wch: 20 }, // UsuarioRecibeNombres
      { wch: 20 }, // EstadoEntrega
      { wch: 20 }, // ReembolsoMotivo
      { wch: 15 }, // PaqueteCodigo
      { wch: 15 }, // Departamento
      { wch: 15 }, // Localidad
      { wch: 30 }, // DireccionDescripcion
      { wch: 15 }, // FECHASALIDAESPERADA
      { wch: 10 }, // HORASALIDAESPERADA
      { wch: 15 }, // FECHALLEGADAESPERADA
      { wch: 10 }, // HORALLEGADAESPERADA
      { wch: 10 }, // ConductorCodigo
      { wch: 20 }, // ConductorApellidos
      { wch: 20 }, // ConductorNombres
      { wch: 20 }, // RolConductor
      { wch: 10 }, // CamionNumero
      { wch: 20 }, // TipoCamion
      { wch: 10 }, // NotaTrasladoNumero
      { wch: 15 }, // NotaTrasladoFechaLlegada
      { wch: 10 }, // NotaTrasladoHoraLlegada
      { wch: 15 }, // NotaTrasladoFechaSalida
      { wch: 10 }, // NotaTrasladoHoraSalida
      { wch: 15 }, // FECHALLEGADAPAQUETE
      { wch: 10 }, // HORALLEGADAPAQUETE
      { wch: 15 }, // FECHASALIDAPAQUETE
      { wch: 10 }, // HORASALIDAPAQUETE
      { wch: 20 }, // LOCALIDADDESTINO
      { wch: 20 }, // DEPARTAMENTODESTINO
      { wch: 15 }, // NOMBREDEPARTAMENTO
      { wch: 15 }, // NOMBRELOCALIDAD
      { wch: 10 }, // DireccionID
      { wch: 10 }, // IDTIPOPAQUETE
      { wch: 20 }, // TipoPaqueteNombre
      { wch: 30 }, // ItemDescripcion
      { wch: 10 }, // ItemPeso
      { wch: 15 }  // ClienteCelular
    ];
    ws['!cols'] = wscols;
  
    // Add styles
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "NotasEntrega");
  
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: EXCEL_TYPE });
    saveAs(data, `NotasEntrega_${new Date().toLocaleDateString()}.xlsx`);
  };
  
  const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  

  return (
    <Container style={{ maxWidth: '1500px' }}>
      <h3 className="mt-3">Reporte General de Notas de Entrega</h3>
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
          title={"Notas de Entrega"}
          data={filteredRegistros}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </Container>
  );
};

export default ReporteGeneral;
