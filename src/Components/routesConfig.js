const routesConfig = {
  gestion: {
    title: "Gestión",
    items: [
      {
        sector: "Usuarios",
        routes: [
          { path: "/gestion", label: "Gestionar Usuarios", permiso: 13 },
          { path: "/gestion_roles", label: "Gestionar Roles", role: 1 },
          { path: "/gestion_permiso_rol", label: "Asignar Permisos Rol", role: 1 },
          { path: "/gestion_reembolso", label: "Gestionar Reembolso", role: 1 },
          { path: "/change_password", label: "Cambiar Contraseña", role: 1 }
        ]
      },
      {
        sector: "Conductores",
        routes: [
          { path: "/gestion_rolconductor", label: "Gestion Rol Conductor", permiso: 10 },
          { path: "/gestion_conductor", label: "Gestion Conductor", permiso: 2 },
          { path: "/gestion_detalle_conductor", label: "Gestion Detalle Conductor", permiso: 2 }
        ]
      },
      {
        sector: "Camiones",
        routes: [
          { path: "/gestion_camion", label: "Gestion Camion", permiso: 1 },
          { path: "/gestion_tipo_camion", label: "Gestion Tipo Camion", permiso: 1 }
        ]
      },
      {
        sector: "Clientes",
        routes: [
          { path: "/gestion_cliente", label: "Gestion Cliente", permiso: 31 }
        ]
      },
      {
        sector: "Paquetes",
        routes: [
          { path: "/gestion_items", label: "Gestion Items", permiso: 7 },
          { path: "/gestion_paquetes", label: "Gestion Paquetes", permiso: 7 },
          { path: "/gestion_estados_entrega", label: "Gestion Estado Entrega", permiso: 4 },
          { path: "/gestion_tipo_paquete", label: "Gestion Tipo Paquete", permiso: 11 },
          { path: "/gestion_tipoenvio", label: "Gestion Tipo Envio", permiso: 11 }

        ]
      },
      {
        sector: "Rutas",
        routes: [
          { path: "/gestion_plan_ruta", label: "Gestion Plan Ruta", permiso: 8 },
          { path: "/gestion_departamento", label: "Gestion Departamento", permiso: 3 },
          { path: "/gestion_localidad", label: "Gestion Localidad", permiso: 3 },
          { path: "/gestion_direccion", label: "Gestion Direccion", permiso: 3 }
        ]
      }
    ]
  },
  registro: {
    title: "Registro",
    items: [
      {
        sector: "Registro",
        routes: [
          { path: "/gestion_recepcion", label: "Registrar Recepcion", permiso: 5 },
          { path: "/gestion_notaentrega", label: "Registrar Nota Entrega", permiso: 5 },
          { path: "/gestion_notas_traslado", label: "Registrar Notas Traslado", permiso: 6 },
          { path: "/registrar_entrega", label: "Registrar Entrega", permiso: 6 }
        ]
      }
    ]
  },
  bitacora: {
    title: "Bitácora",
    items: [ // Mantiene la estructura pero solo un item directo
      {
        sector: "Bitácora",
        routes: [
          { path: "/bitacora", label: "Bitácora", permiso: 14 }
        ]
      }
    ]
  }
};

export default routesConfig;
