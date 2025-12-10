# 🍓 Mi Dulce Corazón

**Mi Dulce Corazón** es una aplicación web de comercio electrónico diseñada para una tienda de postres. Permite a los usuarios explorar un catálogo de delicias (como fresas con crema, malteadas y waffles), gestionar un carrito de compras y realizar pedidos. Incluye un panel de administración para gestionar el inventario.

## 🚀 Tecnologías Utilizadas

El proyecto utiliza una arquitectura moderna separando el Frontend del Backend:

### Frontend (Cliente)
*   **React:** Biblioteca principal para la interfaz de usuario.
*   **Vite:** Empaquetador y entorno de desarrollo rápido.
*   **CSS3:** Estilos personalizados y diseño responsivo.
*   **Context API:** Manejo del estado global (Autenticación y Carrito de compras).
*   **React Router:** Navegación entre páginas.

### Backend (Servidor)
*   **Node.js & Express:** Servidor web y API REST.
*   **SQLite:** Base de datos relacional ligera (archivo local).
*   **JWT (JSON Web Tokens):** Manejo seguro de sesiones y autenticación.
*   **Bcrypt.js:** Encriptación de contraseñas.

---

## 🛠️ Instalación y Configuración

Este proyecto consta de dos partes: la raíz (Frontend) y la carpeta `server` (Backend). Debes instalar las dependencias para ambas.

### Prerrequisitos
*   Node.js (versión 14 o superior)
*   NPM (viene instalado con Node.js)

### Pasos

1.  **Clonar el repositorio:**
    ```bash
    git clone <tu-repositorio>
    cd miDulceCorazon
    ```

2.  **Instalar dependencias del Backend:**
    ```bash
    cd server
    npm install
    ```

3.  **Instalar dependencias del Frontend:**
    Regresa a la carpeta raíz y ejecuta:
    ```bash
    cd ..
    npm install
    ```

---

## ▶️ Ejecución

Para que la aplicación funcione correctamente, debes ejecutar **ambos** servicios simultáneamente (puedes usar dos terminales).

### 1. Iniciar el Servidor (Backend)
En una terminal, navega a la carpeta `server` e inicia la API:
```bash
cd server
npm start
```
> El servidor correrá en: `http://localhost:3001`

### 2. Iniciar la Aplicación (Frontend)
En una **segunda terminal**, desde la carpeta raíz:
```bash
npm run dev
```
> La aplicación web estará disponible generalmente en: `http://localhost:5173`

---

## 👤 Usuarios y Roles

La aplicación maneja dos tipos de roles: **Usuario** y **Admin**.

### Credenciales de Administrador (Pre-configurado)
Para acceder a las funciones de gestión de productos (Crear, Editar, Eliminar):

*   **Email:** `admin@midulcecorazon.com`
*   **Contraseña:** `admin123`

---

## 📂 Estructura del Proyecto

*   `/server`: Código del backend, API y base de datos SQLite.
*   `/src`: Código fuente del frontend React.
    *   `/components`: Componentes reutilizables (Header, Cart, ProductCard).
    *   `/context`: Estados globales (Auth, Cart).
    *   `/pages`: Vistas principales (Home, Login, Orders).
    *   `/hooks`: Lógica personalizada (ej. integración con WhatsApp).
*   `/public`: Archivos estáticos e imágenes de los productos.