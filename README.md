# Dashboard de Pedidos

Prueba técnica Full Stack - Sistema de gestión de pedidos desarrollado con React, TypeScript y Express.

**Desarrollado por:** Carolina Calderón Gómez  
**Fecha:** Enero 2026

---

## Sobre el Proyecto

Este proyecto transforma datos de pedidos desde un formato legacy y los muestra en un dashboard interactivo.

**Funcionalidades:**
- Visualización de pedidos en tabla
- Filtros por estado (Pendiente, Enviado, Entregado)
- Tarjetas con resumen de métricas
- Transformación automática de datos
- API REST con Express

---

## Tecnologías

**Backend:**
- Node.js
- TypeScript
- Express
- CORS

**Frontend:**
- React 18
- TypeScript
- Vite
- CSS3

---

## Instalación

**Requisitos:** Node.js v18+

### Backend
```bash
cd backend
npm install
npm run dev
El servidor corre en http://localhost:3000

Frontend
cd frontend
npm install
npm run dev
La app corre en http://localhost:5173

Uso
Inicia el backend en una terminal
Inicia el frontend en otra terminal
Abre http://localhost:5173 en tu navegador
Usa los filtros para ver pedidos por estado

API: Principio de endpoint:
GET /api/pedidos - Retorna todos los pedidos transformados

Ejemplo de respuesta:
json
{
  "resumen": {
    "total_pedidos": 3,
    "monto_total_neto": 1227934
  },
  "pedidos_formateados": [...]
}

Estructura del Proyecto:
dashboard-pedidos/
├── backend/
│   └── src/
│       ├── index.ts        # Servidor Express
│       ├── transformar.ts  # Lógica de transformación
│       └── datos.ts        # Datos de ejemplo
├── frontend/
│   └── src/
│       ├── App.tsx         # Componente principal
│       └── App.css         # Estilos
└── README.md

Funcionalidades Implementadas
Requerimientos base:

✅ API REST con transformación de datos
✅ Frontend con React + TypeScript
✅ Tabla de pedidos con badges de estado
✅ Manejo de estados de carga y errores

Extras implementados:

✅ Filtros interactivos por estado
✅ Tarjetas de resumen con métricas
✅ Diseño personalizado y responsive

Lo que Aprendí
-Durante el desarrollo de este proyecto:
-Implementé TypeScript por primera vez en un proyecto completo
-Aprendí a usar React Hooks (useState, useEffect)
-Creé mi primera API REST con Express
-Practiqué transformación de datos con tipos
-Resolví el error de CORS entre frontend y backend

💻 Desarrolladora
Carolina Calderón Gómez
Técnico Analista Programador - INACAP

📧 carocalde20142008@gmail.com
🔗 github.com/Caro-card-cmd
📍 Padre Hurtado, Chile

📄 Licencia
Proyecto desarrollado como parte de una prueba técnica para práctica profesional Full Stack Junior.