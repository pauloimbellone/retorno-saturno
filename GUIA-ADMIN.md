# Guía: panel de administración (Sveltia CMS + GitHub)

Objetivo: que Paulo entre a `tusitio.com/admin`, se loguee y cargue/edite amuletos,
precios, fotos y textos desde un formulario — y que al guardar se publique solo.

Todo el **código ya está listo** en esta carpeta. Faltan estos pasos, que van por
**tus cuentas** (yo no puedo hacerlos porque requieren login).

> **Cómo funciona por debajo:** el sitio lee el contenido de `content/contenido.json`.
> El panel (`/admin`) edita ese archivo y las fotos de `/img`, los guarda en el repo de
> GitHub, y Netlify vuelve a publicar el sitio en ~1 minuto. `js/datos.js` queda solo
> como respaldo (si se abre el sitio sin conexión al JSON).

---

## Paso 1 — Cuentas de GitHub
1. Creá tu cuenta en https://github.com (si no tenés).
2. Creá también una **cuenta para Paulo** (o que la cree él): https://github.com/signup
   — es gratis y solo la usa para loguearse al panel.

## Paso 2 — Subir el sitio a un repositorio
1. En GitHub: **New repository** → nombre, ej. `retorno-saturno` → **Private** o Public → *Create*.
2. Subí **el contenido de esta carpeta `sitio/`** a la **raíz** del repo (que `index.html`,
   `admin/`, `content/`, `img/`, `css/`, `js/` queden en la raíz, no dentro de otra carpeta).
   - Fácil por web: en el repo → *Add file → Upload files* → arrastrás todo → *Commit*.
   - O con git: `git init`, `git add .`, `git commit -m "sitio"`, `git remote add origin ...`, `git push`.

## Paso 3 — Poner tu repo en la configuración del panel
1. Abrí `admin/config.yml`.
2. Cambiá la línea `repo: TU-USUARIO/TU-REPO` por tu repo real, ej: `repo: tuusuario/retorno-saturno`.
3. Guardá y subí el cambio.

## Paso 4 — Publicar en Netlify
1. Entrá a https://app.netlify.com → **Add new site → Import an existing project** → GitHub → elegí el repo.
2. No hace falta build: **Publish directory** = raíz (`/`). Deploy.
3. Te queda una URL tipo `algo.netlify.app` (después le podés poner dominio propio).

## Paso 5 — Activar el login con GitHub (el único paso técnico)
El panel necesita una "puerta" OAuth para loguear con GitHub. La forma oficial de Sveltia es
un pequeño relay gratis en Cloudflare (se hace una vez):

1. Creá un **GitHub OAuth App**: GitHub → *Settings → Developer settings → OAuth Apps → New OAuth App*.
   - *Homepage URL*: la URL de tu sitio.
   - *Authorization callback URL*: la que indica la guía del relay (paso siguiente).
2. Deploy del relay **`sveltia-cms-auth`** (Cloudflare Workers, gratis). Seguí el README oficial:
   https://github.com/sveltia/sveltia-cms-auth — pegás el *Client ID* y *Client Secret* del OAuth App.
3. En `admin/config.yml`, bajo `backend:`, descomentá y completá:
   `base_url: https://TU-WORKER.workers.dev`
4. Subí el cambio.

> Referencia completa y alternativas de login: https://github.com/sveltia/sveltia-cms#readme
> (Si preferís, más adelante se puede usar la OAuth de Netlify en vez del worker.)

## Paso 6 — Dar acceso a Paulo
1. En el repo → *Settings → Collaborators* → invitá el usuario de GitHub de Paulo.
2. Paulo acepta la invitación (le llega por mail).

## Paso 7 — Listo: Paulo entra al panel
1. Va a `tusitio.com/admin`.
2. **Sign in with GitHub** → autoriza una vez.
3. Ve el formulario **"Amuletos, precios y textos"**.

---

## Cómo usa Paulo el panel (día a día)
- **Agregar un amuleto:** en la lista *Amuletos* → *Add* → completa nombre (ES/PT), precio,
  sube la foto, descripción, etc. → **Save** (o *Publish*). En ~1 min está online.
- **Marcar vendido:** abre el amuleto → destilda *¿Disponible?* → Save. (Desaparece del sitio
  pero queda guardado por si vuelve a estar.)
- **Editar una descripción o precio:** abre el amuleto, edita, Save.
- **Cambiar la bio o la historia:** sección *Textos del sitio*.
- **Cambiar el WhatsApp:** sección *Configuración*.

Paulo nunca toca código ni ve GitHub por dentro: solo el formulario.

## Notas
- Las fotos que sube Paulo van a `/img` en el repo. Ideal: cuadradas o verticales, livianas (< 3 MB).
- Cuando los precios sean los definitivos, borrá en `index.html` la línea del cartelito
  `<div class="demo-note">…</div>`.
- Vista local: si abrís `index.html` con doble clic (sin servidor), el sitio muestra el
  contenido de respaldo (`datos.js`); el contenido en vivo (editable) se ve en la versión publicada.
