import express from 'express';
import cors from 'cors';
import { transformarDatos } from './transformar';
import { pedidosLegacy } from './datos';

// Crear la aplicación de Express
const app = express();
const PORT = 3000;

// Configurar middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Permite leer JSON en las peticiones

// Ruta principal (GET /api/pedidos)
app.get('/api/pedidos', (req, res) => {
    try {
        // Transformar los datos
        const datosTransformados = transformarDatos(pedidosLegacy);

        // Retornar el JSON transformado
        res.json(datosTransformados);
    } catch (error) {
        // Si algo falla, retornar error 500
        console.error('Error al transformar datos:', error);
        res.status(500).json({
            error: 'Error al procesar los datos'
        });
    }
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: 'API de Pedidos funcionando ✅' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 API disponible en http://localhost:${PORT}/api/pedidos`);
});
