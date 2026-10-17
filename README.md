# Mi espacio · Demo local

Aplicación web móvil con **Inicio**, **Mis documentos** y **Mi salud**, inspirada en patrones visuales de Mi Argentina. Es una demostración independiente, con nombre propio y marcas permanentes de muestra. No está afiliada a organismos públicos y sus fichas no tienen validez oficial.

## Cómo abrirla

1. Descomprimí el ZIP.
2. Entrá en la carpeta `mi-espacio-demo`.
3. Abrí `index.html` en Chrome, Firefox, Safari o Edge actualizado.

No necesitás instalar paquetes, compilar ni crear una cuenta. Los archivos JavaScript y CSS son normales, sin frameworks. Las fuentes y los íconos están incluidos.

Si tu navegador restringe archivos locales, usá Python 3:

```bash
cd mi-espacio-demo
python3 serve.py
```

En Windows también podés ejecutar `py serve.py`. Después abrí **http://127.0.0.1:8080**. Para elegir otro puerto: `python3 serve.py --port 9000`.

Para probar desde un celular conectado a la misma red, ejecutá `python3 serve.py --host 0.0.0.0` y entrá desde el celular a `http://IP-LOCAL-DE-TU-PC:8080`. Los datos se guardan por navegador y dirección; no se sincronizan entre dispositivos.

## Probar el flujo principal

1. Desde Inicio, abrí **Mi salud → Editar mis datos**.
2. Cambiá nombres, apellido, número de prueba, nacimiento, sexo o nacionalidad.
3. Usá **Elegir foto** para cargar un JPG, PNG o WebP de hasta 10 MB. La demo recorta la imagen al centro en formato vertical y la comprime a un JPEG de 450 × 600 px. No solicita acceso a tu cámara.
4. Completá, si querés, domicilio, grupo sanguíneo, cobertura, observaciones y contacto de emergencia.
5. Tocá **Guardar cambios**.
6. Entrá en **Mis documentos**. La ficha y los paneles de datos muestran lo que guardaste. **Ampliar ficha** abre una vista detallada.
7. Recargá la página: la información se conserva si el navegador permite almacenamiento local.

Los cambios sin guardar tienen confirmación al navegar a otra sección o cerrar la página. **Descartar** vuelve al último perfil guardado. El menú superior permite restablecer todos los datos de ejemplo y quitar la foto.

## Qué incluye

- Diseño adaptable a celular, tablet y escritorio.
- Cabecera azul, accesos circulares y navegación inferior.
- Tres pantallas y menú de navegación.
- Ficha de identidad de muestra, con número prefijado `DEMO`, marca de agua y leyenda de falta de validez.
- Listas desplegables de datos personales y salud.
- Editor de perfil, validación de campos y vista previa en escritorio.
- Carga, procesamiento y eliminación de foto.
- Persistencia local con mensaje de error cuando el navegador no puede guardar.
- Diálogos accesibles, navegación por teclado, foco visible y soporte de movimiento reducido.

## Archivos

```text
mi-espacio-demo/
  index.html          Estructura y configuración de seguridad del navegador
  styles.css          Diseño, adaptación móvil y estilos de impresión
  app.js              Pantallas, estado, validación, fotos y persistencia
  serve.py            Servidor local opcional, sin dependencias
  assets/
    icon.svg          Ícono propio de la demo
    fonts/            Roboto local: regular, medium y bold
  README.md           Estas instrucciones
  REFERENCIAS.md      Fuentes visuales consultadas
  LICENSE             Licencia del código propio
  THIRD_PARTY.md      Licencia de las fuentes
```

## Datos y alcance

La aplicación no tiene backend, inicio de sesión, analíticas ni solicitudes a servidores externos. No consulta, valida ni modifica registros oficiales. La información introducida se guarda **sin cifrado** en `localStorage` del navegador. Usá datos ficticios para probarla.

No cargues una foto completa de un DNI; el selector está pensado para un retrato de prueba. No se crean QR, códigos de barras, firmas ni elementos de seguridad de documentos oficiales. La ficha de muestra es un diseño propio y siempre mantiene las marcas de demostración.

Borrar los datos del sitio en el navegador también elimina el perfil. Si el almacenamiento está bloqueado o lleno, la app lo informa y permite continuar solo en memoria durante esa sesión.

La app es una web, no un APK ni una aplicación nativa de iOS. Los enlaces `#inicio`, `#documentos` y `#salud` permiten abrir directamente cada sección.
