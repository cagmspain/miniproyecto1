# Virtual Drumpad

Batería virtual construida con HTML, CSS y JavaScript. Se puede tocar con el
teclado, ratón o una pantalla táctil.

## Funcionalidades

- Nueve sonidos de batería con reproducción simultánea.
- Teclas `E R T Y U I F G H`.
- Control de volumen y botón para silenciar.
- Diseño adaptable a escritorio y móvil.
- Controles accesibles y navegación por teclado.
- Rutas relativas compatibles con GitHub Pages.
- Pruebas automatizadas sin dependencias externas.
- Integración continua con GitHub Actions.

## Ejecutar localmente

Se necesita Node.js 20 o posterior para ejecutar las comprobaciones.

```bash
npm start
```

Abre `http://localhost:8080`.

## Pruebas

```bash
npm test
npm run check
```

Las pruebas cubren el mapeo de teclas, rutas de audio, volumen, controles
editables y consistencia entre el HTML y los archivos de sonido.

## Publicar en GitHub Pages

En GitHub, abre **Settings > Pages**, elige **Deploy from a branch** y publica
la rama `main` desde la carpeta raíz. Todos los recursos usan rutas relativas,
por lo que la aplicación funciona bajo `/miniproyecto1/`.
