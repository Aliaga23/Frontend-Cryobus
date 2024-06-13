// routesConfig.js
const routesConfig = {
    gestion: {
      title: "Gestión",
      items: [
        { path: "/gestion", label: "Usuarios", permiso: 13 },
        { path: "/gestion_roles", label: "Roles", role: 1 },
        { path: "/gestion_rolconductor", label: "Rol Conductor", permiso: 10 },
        { path: "/gestion_tipoenvio", label: "Tipo Envio", permiso: 12 },
        { path: "/gestion_permiso_rol", label: "Permisos Rol", role: 1 },
        { path: "/gestion_cliente", label: "Gestion Cliente", permiso: 31 },
        { path: "/gestion_items", label: "Gestion Items", permiso: 7 },
        { path: "/gestion_paquetes", label: "Gestion Paquetes", permiso: 7 },
        { path: "/gestion_notaentrega", label: "Gestion Nota Entrega", permiso: 5 },
        { path: "/gestion_camion", label: "Gestion Camion", permiso: 1 },
        { path: "/gestion_tipo_camion", label: "Gestion Tipo Camion", permiso: 1 },
        { path: "/gestion_departamento", label: "Gestion Departamento", permiso: 3 },
        { path: "/gestion_localidad", label: "Gestion Localidad", permiso: 3 },
        { path: "/gestion_direccion", label: "Gestion Direccion", permiso: 3 },
        { path: "/gestion_notas_traslado", label: "Gestion Notas Traslado", permiso: 6 },
        { path: "/gestion_estados_entrega", label: "Gestion Estado Entrega", permiso: 4 },
        { path: "/gestion_plan_ruta", label: "Gestion Plan Ruta", permiso: 8 },
        { path: "/gestion_tipo_paquete", label: "Gestion Tipo Paquete", permiso: 11 },
        { path: "/gestion_conductor", label: "Gestion Conductor", permiso: 2 },
        { path: "/gestion_detalle_conductor", label: "Gestion Detalle Conductor", permiso: 2},

        { path: "/change_password", label: "Cambiar Contraseña"}
      ]
    },
    registro: {
      title: "Registro",
      items: [
        { path: "/gestion_recepcion", label: "Registrar Recepcion", permiso: 5 }
      ]
    },
    bitacora: { path: "/bitacora", label: "Bitacora", permiso: 14 }
  };
  
  export default routesConfig;
  