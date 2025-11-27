# proferick.com

Este es el repositorio del código fuente para el sitio web **proferick.com**. El proyecto está configurado con un flujo de trabajo de desarrollo que automatiza la compilación y minificación de SASS y JavaScript.

## Tecnologías Utilizadas

-   **SASS**: Para la escritura de estilos CSS de forma modular y avanzada.
-   **JavaScript**: Minificado para producción utilizando `esbuild`.
-   **Font Awesome**: Se utiliza una versión personalizada para optimizar el peso del archivo final. Solo se compilan los íconos necesarios, que se activan descomentando las variables correspondientes en el archivo `src/scss/fonts/fontawesome/_variables.scss`.
-   **Prism**: Para mostrar bloques de código en la página (sección mentorías).
-   **Nodemon**: Para observar cambios en los archivos JavaScript y reconstruirlos automáticamente.
-   **npm-run-all**: Para ejecutar múltiples scripts de npm en paralelo.

## Requisitos Previos

-   [Node.js](https://nodejs.org/) y npm.

## Instalación

1.  Clona el repositorio en tu máquina local:
    ```bash
    git clone https://github.com/Salegomx/proferick.com.git
    ```

2.  Navega al directorio del proyecto:
    ```bash
    cd proferick.com
    ```

3.  Instala las dependencias de desarrollo:
    ```bash
    npm install
    ```

## Uso

### Entorno de Desarrollo

Para iniciar el entorno de desarrollo, ejecuta el siguiente comando. Este compilará los archivos SASS y JavaScript, y quedará a la espera de cambios para reconstruirlos automáticamente.

```bash
npm start
```

El comando `npm start` ejecuta las siguientes tareas en paralelo:
-   **Compilación de SASS**: Compila los archivos de `src/scss/` a `assets/css/` en formato minificado.
-   **Minificación de JavaScript**: Observa los cambios en `src/js/` y utiliza `esbuild` para minificar los archivos en `assets/js/`.

### Visualización

Para visualizar el sitio y ver los cambios en tiempo real, se recomienda usar la extensión **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)** para Visual Studio Code.

Una vez instalada, haz clic derecho sobre tu archivo `index.html` y selecciona `Open with Live Server`.
