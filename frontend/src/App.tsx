import { useEffect, useState } from 'react';
import './App.css';

// Tipos definidos aquí mismo
interface PedidoFormateado {
  id: string;
  fecha: string;
  cliente_nombre: string;
  cliente_email: string;
  ciudad: string;
  estado: string;
  estado_badge: string;
  metodo_pago: string;
  cantidad_items: number;
  subtotal: number;
  descuento: number;
  total: number;
  tiene_notas: boolean;
}

interface Resumen {
  total_pedidos: number;
  total_items: number;
  monto_total_bruto: number;
  monto_total_descuentos: number;
  monto_total_neto: number;
  pedidos_por_estado: {
    [key: string]: number;
  };
}

interface DatosSalida {
  resumen: Resumen;
  pedidos_formateados: PedidoFormateado[];
  clientes_unicos: number;
  ciudades: string[];
}

function App() {
  const [datos, setDatos] = useState<DatosSalida | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>('TODOS'); // NUEVO

// Implementé TypeScript siguiendo la documentación oficial
// Es mi primer proyecto completo con React + TS

useEffect(() => {
  fetch('http://localhost:3000/api/pedidos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        setDatos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">⏳ Cargando pedidos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">❌ Error: {error}</div>
      </div>
    );
  }

  if (!datos) {
    return null;
  }

  //Función para filtrar pedidos
  const pedidosFiltrados = filtroEstado === 'TODOS'
    ? datos.pedidos_formateados
    : datos.pedidos_formateados.filter(pedido => pedido.estado.toUpperCase() === filtroEstado);

  return (
    <div className="container">
      <h1>Dashboard de Pedidos</h1>
      <div className="resumen-cards">
        <div className="card card-azul">
          <div className="card-icon">📋</div>
          <div className="card-content">
            <h3>{datos.resumen.total_pedidos}</h3>
            <p>Total Pedidos</p>
          </div>
        </div>

        <div className="card card-verde">
          <div className="card-icon">💰</div>
          <div className="card-content">
            <h3>${datos.resumen.monto_total_neto.toLocaleString('es-CL')}</h3>
            <p>Ventas Netas</p>
          </div>
        </div>

        <div className="card card-naranja">
          <div className="card-icon">📦</div>
          <div className="card-content">
            <h3>{datos.resumen.total_items}</h3>
            <p>Items Vendidos</p>
          </div>
        </div>

        <div className="card card-morado">
          <div className="card-icon">💳</div>
          <div className="card-content">
            <h3>${datos.resumen.monto_total_descuentos.toLocaleString('es-CL')}</h3>
            <p>Descuentos</p>
          </div>
        </div>
      </div>

      {/* Controle de filtro */}
      <div className="filtros-container">
        <label htmlFor="filtro-estado">Filtrar por estado:</label>
        <div className="filtros-botones">
          <button
            className={filtroEstado === 'TODOS' ? 'filtro-btn active' : 'filtro-btn'}
            onClick={() => setFiltroEstado('TODOS')}
          >
            Todos ({datos.pedidos_formateados.length})
          </button>
          <button
            className={filtroEstado === 'PENDIENTE' ? 'filtro-btn active filtro-warning' : 'filtro-btn filtro-warning'}
            onClick={() => setFiltroEstado('PENDIENTE')}
          >
            Pendiente ({datos.resumen.pedidos_por_estado.PENDIENTE || 0})
          </button>
          <button
            className={filtroEstado === 'ENVIADO' ? 'filtro-btn active filtro-info' : 'filtro-btn filtro-info'}
            onClick={() => setFiltroEstado('ENVIADO')}
          >
            Enviado ({datos.resumen.pedidos_por_estado.ENVIADO || 0})
          </button>
          <button
            className={filtroEstado === 'ENTREGADO' ? 'filtro-btn active filtro-success' : 'filtro-btn filtro-success'}
            onClick={() => setFiltroEstado('ENTREGADO')}
          >
            Entregado ({datos.resumen.pedidos_por_estado.ENTREGADO || 0})
          </button>
        </div>
      </div>

      <div className="tabla-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Email</th>
              <th>Ciudad</th>
              <th>Estado</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            
            {/* MODIFICADO: Usar pedidosFiltrados en lugar de datos.pedidos_formateados */}
            {pedidosFiltrados.length > 0 ? (
              pedidosFiltrados.map((pedido: PedidoFormateado) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.fecha}</td>
                  <td>{pedido.cliente_nombre}</td>
                  <td>{pedido.cliente_email}</td>
                  <td>{pedido.ciudad}</td>
                  <td>
                    <span className={`badge badge-${pedido.estado_badge}`}>
                      {pedido.estado}
                    </span>
                  </td>
                  <td>${pedido.total.toLocaleString('es-CL')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#999' }}>
                  No hay pedidos con el estado seleccionado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <footer className="footer">
        <p>Desarrollado por Carolina Calderón Gómez | Prueba Técnica Full Stack 2026</p>
        <p className="tech-stack">React + TypeScript + Express + Node.js</p>
      </footer>

    </div>
  );
}

export default App;
