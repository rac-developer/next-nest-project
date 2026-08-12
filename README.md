# 🚀 NextNestApp - Sistema de Gestión de Productos Fullstack

¡Bienvenido a **NextNestApp**! Este es un proyecto de gestión de productos (CRUD) moderno y robusto estructurado como un monorepositorio. Está diseñado para demostrar prácticas modernas de desarrollo fullstack, combinando la agilidad de **Next.js** en el frontend con la robustez y escalabilidad de **NestJS** en el backend.

El proyecto está dockerizado por completo, permitiendo levantar toda la infraestructura (Base de Datos SQLite, Servidor REST API y Aplicación Web) con un único comando. Ideal para incluir en portafolios debido a su arquitectura limpia y stack tecnológico demandado en la industria.

---

## 🛠️ Stack Tecnológico

### 💻 Frontend
* **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components y TypeScript)
* **Estilos & UI:** [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/) (Componentes interactivos premium)
* **Formularios & Validación:** [React Hook Form](https://react-hook-form.com/)
* **Iconos:** [Lucide React](https://lucide.dev/)

### ⚙️ Backend (API REST)
* **Framework:** [NestJS 11](https://nestjs.com/) (Arquitectura modular e inyección de dependencias)
* **ORM:** [Prisma ORM](https://www.prisma.io/) (Migraciones y type-safety total)
* **Base de Datos:** SQLite a través de [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
* **Validación de Datos:** `class-validator` y `class-transformer` (Pipelines de validación globales)
* **Documentación:** [Swagger (OpenAPI 3.0)](https://swagger.io/)

### 🐳 DevOps & Entorno
* **Contenedores:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
* **Gestor de Paquetes:** `pnpm`

---

## ✨ Características Principales

* **CRUD Completo de Productos:** Creación, lectura, edición y eliminación de productos de forma reactiva.
* **Validación en Extremo a Extremo:** Validaciones robustas tanto en la UI (client-side) como en la API mediante decoradores (server-side).
* **Documentación de API Interactiva:** Swagger integrado para probar los endpoints del backend en tiempo real.
* **Diseño UI Adaptable & Moderno:** Interfaz de usuario responsive, rápida y elegante basada en shadcn/ui y Tailwind CSS.
* **Monorepositorio Dockerizado:** Configuración lista para producción con variables de entorno listas para desarrollo local y contenedores.
* **CORS Habilitado:** Comunicación fluida e integrada entre frontend y backend.

---

## 📂 Estructura del Proyecto

```bash
next-nest-project/
├── backend/               # Servidor NestJS API
│   ├── src/               # Código fuente (Módulos de Products y Prisma)
│   ├── prisma/            # Esquema de Prisma y base de datos SQLite (dev.db)
│   ├── Dockerfile         # Dockerfile para entorno de Backend
│   └── package.json       
├── fronted/               # Cliente Next.js (Nota: nombre del directorio físico)
│   ├── app/               # Enrutamiento basado en archivos (App Router)
│   ├── src/components/    # Componentes de UI reutilizables (shadcn)
│   ├── Dockerfile         # Dockerfile para entorno de Frontend
│   └── package.json       
├── docker-compose.yml     # Orquestación de servicios locales
└── README.md              # Documentación del proyecto
```

---

## 🚀 Instalación y Puesta en Marcha

Tienes dos opciones para ejecutar este proyecto de forma local: utilizando Docker (Recomendado) o levantando los servicios manualmente.

### Opción 1: Usando Docker Compose (Recomendado)

Asegúrate de tener instalado [Docker](https://www.docker.com/) y que el motor de Docker esté activo.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/next-nest-project.git
   cd next-nest-project
   ```

2. Levanta los contenedores con Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Accede a las aplicaciones:
   * **Frontend:** [http://localhost:3000](http://localhost:3000)
   * **Backend API / Swagger:** [http://localhost:4000/api](http://localhost:4000/api)

---

### Opción 2: Instalación Local Manual

#### 1. Requisitos Previos
* **Node.js** v18+ o v20+ instalado.
* Gestor de paquetes `pnpm`.

#### 2. Configuración y ejecución del Backend
1. Navega a la carpeta del backend e instala dependencias:
   ```bash
   cd backend
   pnpm i
   ```
2. Configura las variables de entorno si lo requieres (por defecto utiliza un archivo local SQLite y puerto `4000`).
3. Genera el cliente Prisma y ejecuta las migraciones:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   pnpm run start:dev
   ```
   *El backend estará corriendo en [http://localhost:4000](http://localhost:4000)*

#### 3. Configuración y ejecución del Frontend
1. Abre una nueva terminal, navega a la carpeta del frontend e instala dependencias:
   ```bash
   cd fronted
   pnpm i
   ```
2. Asegúrate de tener configurado tu archivo `.env` o `.env.local` con la URL del Backend:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
   ```
3. Inicia el servidor de desarrollo del cliente:
   ```bash
   pnpm run dev
   ```
   *El cliente estará corriendo en [http://localhost:3000](http://localhost:3000)*

---

## 📖 Documentación de la API (Swagger)

Cuando el backend se encuentra en ejecución, puedes explorar e interactuar con la API REST de forma interactiva en la siguiente ruta:

👉 **[http://localhost:4000/api](http://localhost:4000/api)**

### Endpoints principales (`/api/products`)

| Método | Endpoint | Descripción | Cuerpo de Petición (JSON) |
|---|---|---|---|
| **GET** | `/api/products` | Obtiene el listado completo de productos | Ninguno |
| **GET** | `/api/products/:id` | Obtiene los detalles de un producto por ID | Ninguno |
| **POST** | `/api/products` | Registra un nuevo producto | `{ name, description, price, images }` |
| **PATCH** | `/api/products/:id` | Modifica parcialmente un producto existente | `{ name, description, price, images }` (Opcionales) |
| **DELETE** | `/api/products/:id` | Remueve un producto del sistema | Ninguno |

<!-- ---

## 🎨 Capturas de Pantalla y UI
*(Una vez subas tu proyecto, puedes reemplazar estas secciones con imágenes reales de tu aplicación en funcionamiento para darle un toque aún más profesional a tu portfolio).*

* **Tablero Principal:** Vista en grilla con tarjetas de productos, precios e imágenes.
* **Formulario de Registro/Edición:** Validaciones activas integradas que notifican al usuario errores comunes antes de enviar datos al servidor. -->

---

## 👤 Autor

Desarrollado por [racdev](https://github.com/rac-developer)
