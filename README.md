# El retorno de Saturno — sitio web

Sitio estático (HTML/CSS/JS, sin build ni dependencias). Se abre y se publica tal cual.

## Estructura

**Diseño activo:** Retrofuturista. El tema vive en `css/estilos.css`.
Hay un respaldo del diseño anterior en `css/estilos-cosmos.css`.
Para volver al Cosmos: copiá `estilos-cosmos.css` encima de `estilos.css`.

```
sitio/
├── index.html          ← la página (estructura). Casi nunca se toca.
├── admin/              ← ⭐ PANEL de administración (Sveltia CMS) → tusitio.com/admin
│   ├── index.html      ← carga el panel
│   └── config.yml      ← formulario que ve Paulo (completá acá tu repo de GitHub)
├── content/
│   └── contenido.json  ← ⭐ contenido EN VIVO (lo edita el panel: amuletos, precios, textos)
├── css/estilos.css     ← diseño ACTIVO (retrofuturista). Casi nunca se toca.
├── css/estilos-cosmos.css         ← respaldo del diseño Cosmos
├── css/estilos-retrofuturista.css ← copia del diseño activo
├── js/
│   ├── datos.js        ← respaldo/semilla del contenido (si no hay conexión al JSON)
│   └── app.js          ← lógica (carrito, idiomas, WhatsApp). No se toca.
├── img/                ← las fotos de los amuletos
└── GUIA-ADMIN.md       ← ⭐ pasos para activar el panel (GitHub + Netlify + login)
```

## Panel de administración (para que Paulo edite desde la web)
El sitio tiene un panel en `/admin` (Sveltia CMS) para editar amuletos, precios, fotos y
textos con login de GitHub, sin tocar código. **Requiere una configuración inicial de una vez**
(repo de GitHub + Netlify + login): está todo el paso a paso en **`GUIA-ADMIN.md`**.

El contenido en vivo vive en `content/contenido.json` (lo edita el panel). `js/datos.js` quedó
como respaldo. Editar a mano sigue siendo posible en cualquiera de los dos, pero lo normal ya es
usar el panel.

## Ver el sitio en tu compu
Doble clic en `index.html`. Se abre en el navegador (no necesita internet ni servidor).

## Editar contenido (todo en `js/datos.js`)

**Cambiar un precio:** buscá el amuleto y editá `precio: 96000` (solo números, sin puntos ni `$`).

**Cambiar el WhatsApp:** arriba de todo, `whatsapp: "557591713898"` (país+área+número, solo dígitos).

**Agregar un amuleto:**
1. Poné la foto en `img/` (ideal cuadrada o vertical, máx ~1400 px, liviana).
2. Copiá un bloque `{ ... }` entero dentro de `amuletos: [ ]`, pegalo y cambiá los datos
   (`id` único, `fotos`, `precio`, `nombre`, `material`, `descripcion`, `significado`, etc.).
   Todo lo que dice `{ es: "...", pt: "..." }` va en los dos idiomas.

**Sacar / ocultar un amuleto:** borrá su bloque, o poné `disponible: false`.

**Editar la bio o la historia:** en `datos.js`, sección `textos:` → campos `about_p1`, `about_p2`,
`historia_p1`, `historia_p2` (recordá completarlos en `es` y en `pt`).

> Regla de oro: respetá las comillas `"` y las comas `,`. Si algo se rompe, casi siempre es una
> comilla o una coma de más/menos.

## Publicar (gratis)

**Opción fácil — Netlify Drop:**
1. Entrá a https://app.netlify.com/drop
2. Arrastrá la carpeta **`sitio`** entera.
3. Te da un link público (`algo.netlify.app`) para compartir. Con una cuenta gratis podés
   ponerle un nombre lindo y, más adelante, un dominio propio (ej: `elretornodesaturno.com`).

Alternativas equivalentes: Cloudflare Pages o GitHub Pages.

## Pendientes / notas
- **Precios**: los cargados son de ejemplo — reemplazar por los reales.
- Cuando los precios sean definitivos, borrá en `index.html` la línea del cartelito
  `<div class="demo-note">…</div>`.
- **Bio / historia**: primer borrador, reemplazar con las respuestas de Paulo.
- **Compartir bonito**: al tener dominio, en `index.html` poné la URL absoluta de la foto en
  `og:image` (para la vista previa en WhatsApp/redes).
- **Fotos**: conviene reemplazar por las originales en alta (Instagram comprime).
