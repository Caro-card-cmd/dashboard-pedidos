import { DatosEntrada, DatosSalida, PedidoEntrada, PedidoFormateado } from './types';

// Función 1:  para formatear fechas
// Aprendí este método investigando sobre Date en JavaScript
function formatearFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
}

// Función 2: Convertir estado a formato capitalizado
function formatearEstado(estado: string): string {
    return estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase();
}

// Función 3: Asignar badge según el estado
function obtenerBadge(estado: string): string {
    const badges: { [key: string]: string } = {
        'PENDIENTE': 'warning',
        'ENVIADO': 'info',
        'ENTREGADO': 'success',
        'CANCELADO': 'danger'
    };
    return badges[estado] || 'secondary';
}

// Función 4: Convertir método de pago
function formatearMetodoPago(metodo: string): string {
    const metodos: { [key: string]: string } = {
        'TARJETA_CREDITO': 'Tarjeta de Crédito',
        'TARJETA_DEBITO': 'Tarjeta de Débito',
        'TRANSFERENCIA': 'Transferencia'
    };
    return metodos[metodo] || metodo;
}

// Función 5: Calcular totales de un pedido
function calcularTotales(items: any[]) {
    let subtotal = 0;
    let descuento = 0;

    items.forEach(item => {
        const montoItem = item.precio_unitario * item.cantidad;
        subtotal += montoItem;
        descuento += (montoItem * item.descuento_porcentaje) / 100;
    });

    return {
        subtotal: Math.round(subtotal),
        descuento: Math.round(descuento),
        total: Math.round(subtotal - descuento)
    };
}

// Función 6: Transformar un pedido individual
function transformarPedido(pedido: PedidoEntrada): PedidoFormateado {
    const totales = calcularTotales(pedido.items);

    return {
        id: pedido.pedido_id,
        fecha: formatearFecha(pedido.fecha_creacion),
        cliente_nombre: pedido.cliente.nombre_completo,
        cliente_email: pedido.cliente.email,
        ciudad: pedido.cliente.direccion.ciudad,
        estado: formatearEstado(pedido.estado),
        estado_badge: obtenerBadge(pedido.estado),
        metodo_pago: formatearMetodoPago(pedido.metodo_pago),
        cantidad_items: pedido.items.length,
        subtotal: totales.subtotal,
        descuento: totales.descuento,
        total: totales.total,
        tiene_notas: pedido.notas !== null && pedido.notas !== ''
    };
}

// Función de transformación de datos
// Apliqué lógica similar a la del proyecto de Cafetería Dulce Reino
export function transformarDatos(datos: DatosEntrada): DatosSalida {

    //Transformación de cada pedido
    const pedidosFormateados = datos.pedidos.map(pedido => transformarPedido(pedido));

    //Calculo de totales generales
    let totalItems = 0;
    let montoBruto = 0;
    let montoDescuentos = 0;
    let montoNeto = 0;

    pedidosFormateados.forEach(pedido => {
        totalItems += pedido.cantidad_items;
        montoBruto += pedido.subtotal;
        montoDescuentos += pedido.descuento;
        montoNeto += pedido.total;
    });

    //Contar pedidos por estado
    const pedidosPorEstado: { [key: string]: number } = {};
    datos.pedidos.forEach(pedido => {
        const estado = pedido.estado;
        pedidosPorEstado[estado] = (pedidosPorEstado[estado] || 0) + 1;
    });

    //Obtener clientes únicos
    const clientesUnicos = new Set(datos.pedidos.map(p => p.cliente.id)).size;

    //Obtener ciudades únicas
    const ciudadesSet = new Set(datos.pedidos.map(p => p.cliente.direccion.ciudad));
    const ciudades = Array.from(ciudadesSet);

    //Retornar el resultado final
    return {
        resumen: {
            total_pedidos: datos.pedidos.length,
            total_items: totalItems,
            monto_total_bruto: montoBruto,
            monto_total_descuentos: montoDescuentos,
            monto_total_neto: montoNeto,
            pedidos_por_estado: pedidosPorEstado
        },
        pedidos_formateados: pedidosFormateados,
        clientes_unicos: clientesUnicos,
        ciudades: ciudades
    };
}
