// Tipos para el JSON de ENTRADA (sistema legacy)
export interface ItemEntrada {
    sku: string;
    nombre_producto: string;
    cantidad: number;
    precio_unitario: number;
    descuento_porcentaje: number;
}

export interface Cliente {
    id: string;
    nombre_completo: string;
    email: string;
    direccion: {
        calle: string;
        ciudad: string;
        codigo_postal: string;
        pais: string;
    };
}

export interface PedidoEntrada {
    pedido_id: string;
    fecha_creacion: string;
    cliente: Cliente;
    items: ItemEntrada[];
    estado: string;
    metodo_pago: string;
    notas: string | null;
}

export interface DatosEntrada {
    pedidos: PedidoEntrada[];
    metadata: {
        version: string;
        generado: string;
        moneda: string;
    };
}

// Tipos para el JSON de SALIDA (lo que debe retornar la API)
export interface PedidoFormateado {
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

export interface Resumen {
    total_pedidos: number;
    total_items: number;
    monto_total_bruto: number;
    monto_total_descuentos: number;
    monto_total_neto: number;
    pedidos_por_estado: {
        [key: string]: number;
    };
}

export interface DatosSalida {
    resumen: Resumen;
    pedidos_formateados: PedidoFormateado[];
    clientes_unicos: number;
    ciudades: string[];
}
