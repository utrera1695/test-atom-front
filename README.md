# Test TODO AtomChat - Frontend

Este es el FrontEnd para la prueba técnica de AtomChat. Tablero de gestión de tareas estilo ToDo List. Desarrollado Con Angular 17

[live preview](https://test-atom-latest.onrender.com/docs)

## Características

- **Autenticación de Usuarios:** Registro e inicio de sesión.
- **Sesiones con JWT:** Manejo de JSON Web Tokens (JWT) para manejar sesiones de usuario de forma segura.
- **Middleware de Autenticación:** Un middleware para proteger las rutas que requieren que el usuario esté autenticado.
- **Escrito en TypeScript:** Código tipado para mayor robustez y mantenibilidad.
- **Estilos:** PrimeNg para un mejor estilo visual

## Empezando

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Prerrequisitos

Asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Instalación

1.  Clona el repositorio en tu máquina local:

    ```sh
    git clone
    ```

2.  Ingresa al directorio e instala las dependencias del proyecto:
    ```sh
    npm install
    ```

### Configuración

1.  **Variables de Entorno:**

    - Crea un archivo `enviroments.ts` en el directorio `src/enviroments` y copia el contenido enviroment.example.ts

    Tu archivo `enviroments.ts` debería verse así:

    ```js
    export const enviroments = {
      apiUrl: "http://localhost:3000/api",
    };
    ```

## Ejecución

### Modo de Desarrollo

Para iniciar el servidor en modo de desarrollo:

```sh
npm run watch
```
