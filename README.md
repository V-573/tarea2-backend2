# TAREA1 - BACKEND2

## 📌 Temática Elegida
 API REST para la gestión y reserva de eventos en línea.

---

## 🛠️ Tecnologías Utilizadas
* **Entorno de ejecución:** Node.js
* **Framework Web:** Express.js
* **Variables de entorno:** Dotenv
* **Arquitectura:** Arquitectura en capas(Controladores, Servicios, Repositorios, DAO)

---

## ⚙️ Requisitos Previos e Instalación

### 1. Clonar el repositorio
```bash
git clone <URL_DE_TU_REPOSITO>
cd <NOMBRE_DE_TU_CARPETA>

2. Instalar dependenciasBashnpm install
🔑 Configuración de Variables de Entorno
Crea un archivo .env en la raíz del proyecto basándote en el siguiente esquema:

PORT=8080
NODE_ENV=development

🚀 Cómo Ejecutar la Aplicación
Modo Producción
Bash
npm start

Modo Desarrollo (con recarga automática)
Bash
npm run dev
El servidor estará escuchando en la URL base: http://localhost:8080 (o el puerto configurado en el archivo .env).
```
---

```
📁 Estructura del Proyecto

├── .env                  # Variables de entorno
├── .gitignore            # Archivos excluidos de Git
├── app.js                # Configuración global de Express y middlewares
├── server.js             # Punto de entrada y arranque del servidor
├── package.json          # Dependencias y scripts
└── src/
    ├── config/           # Configuración centralizada de la app
    ├── controllers/      # Gestión de peticiones HTTP y respuestas
    ├── dao/              # Capa de acceso directo a datos
    ├── middlewares/      # Middlewares de validación y control de errores
    ├── models/           # Definición de clases/modelos base
    ├── repositories/     # Abstracción de persistencia entre DAO y servicios
    ├── routes/           # Definición de endpoints y enrutado de Express
    ├── services/         # Capa de lógica de negocio principal
    └── utils/            # Funciones auxiliares y formateadores
```
---

**Rutas Disponibles (Endpoints)**

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| GET | /api/health | Verifica el estado del servidor y el tiempo de ejecución (uptime). |
| GET | /api/events | Obtiene la lista global de eventos registados. |
| POST | /api/sessions/login | Endpoint base para inicio de sesión (Pendiente de implementación). |
| POST | /api/sessions/logout | Endpoint base para cierre de sesión (Pendiente de implementación). |

---