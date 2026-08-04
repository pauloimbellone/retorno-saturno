/* ============================================================================
   EL RETORNO DE SATURNO — Lógica del sitio
   El contenido se edita desde el panel /admin (guarda en content/contenido.json).
   Si ese archivo no está disponible (ej. abriendo index.html local), usa como
   respaldo los datos de datos.js. No hace falta tocar este archivo.
   ============================================================================ */
(function () {
  const BASE = window.DATOS;            // respaldo/semilla (datos.js)
  let config  = BASE.config;
  let textos  = BASE.textos;
  let productos = [];

  let lang = "es";
  let filtroCat = "todos";
  const cart = new Set();

  const money = n => config.moneda + Number(n).toLocaleString(config.localePrecio);
  // texto bilingüe: usa el idioma actual; si está vacío, cae al español (o al que haya)
  const f = v => {
    if (v && typeof v === "object" && !Array.isArray(v)) return v[lang] || v.es || v.pt || "";
    return v;
  };
  const t = () => textos[lang];
  const $ = id => document.getElementById(id);
  const foto = p => p.foto || (p.fotos && p.fotos[0]) || "";
  const slug = s => (s || "").toString().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  /* ---- carga de contenido (CMS) con respaldo a datos.js ---- */
  async function cargarContenido() {
    const traer = url => fetch(url, { cache: "no-store" }).then(r => r.ok ? r.json() : null).catch(() => null);
    try {
      const [a, tx, cf] = await Promise.all([
        traer("content/amuletos.json"),
        traer("content/textos.json"),
        traer("content/config.json")
      ]);
      if (cf && cf.config) config = Object.assign({}, BASE.config, cf.config);
      if (a && Array.isArray(a.amuletos)) BASE.amuletos = a.amuletos;
      if (tx && tx.textos) textos = {
        es: Object.assign({}, BASE.textos.es, tx.textos.es || {}),
        pt: Object.assign({}, BASE.textos.pt, tx.textos.pt || {})
      };
    } catch (e) {
      /* usa los valores de datos.js */
    }
    // ID automático y único (Paulo no lo carga a mano)
    const vistos = {};
    BASE.amuletos.forEach((p, i) => {
      let id = p.id || slug(p.nombre && p.nombre.es) || ("amuleto-" + (i + 1));
      if (vistos[id]) id = id + "-" + (i + 1);
      vistos[id] = 1; p.id = id;
    });
    // se muestran TODOS (las vendidas quedan visibles marcadas como "Vendido")
    productos = BASE.amuletos;
  }

  /* ---- render general ---- */
  function render() {
    const tt = t();
    document.querySelectorAll("[data-k]").forEach(el => {
      if (tt[el.dataset.k] != null) el.innerHTML = tt[el.dataset.k];
    });
    document.documentElement.lang = lang;

    renderFiltros();
    const lista = filtroCat === "todos"
      ? productos
      : productos.filter(p => (p.categorias || []).includes(filtroCat));

    if (!lista.length) {
      $("grid").innerHTML = `<div class="cat-vacia">
        <b>${tt.cat_vacia_title}</b>
        <p>${tt.cat_vacia_p} <a onclick="ERS.customWA()">${tt.cat_vacia_link}</a>.</p></div>`;
    } else {
      $("grid").innerHTML = lista.map(p => {
        const sold = p.disponible === false;
        const inCart = cart.has(p.id);
        const tag = sold
          ? `<span class="tag vendido">${tt.sold}</span>`
          : `<span class="tag">${tt.unique}</span>`;
        const boton = sold
          ? `<span class="mini soldbtn">${tt.sold}</span>`
          : `<button class="mini ${inCart ? "in" : ""}"
              onclick="event.stopPropagation();ERS.toggle('${p.id}')">${inCart ? "✓ " + tt.added : tt.add}</button>`;
        return `<article class="card ${sold ? "sold" : ""}" onclick="ERS.openModal('${p.id}')">
          <div class="ph">${tag}
            <img src="${foto(p)}" alt="${f(p.nombre)}" loading="lazy"></div>
          <div class="body">
            <h3>${f(p.nombre)}</h3><div class="mat">${f(p.material)}</div>
            <div class="foot"><span class="price">${money(p.precio)}</span>${boton}</div>
          </div></article>`;
      }).join("");
    }

    renderCart();
  }

  /* ---- barra de filtros por categoría ---- */
  function renderFiltros() {
    const cont = $("pills"); if (!cont) return;
    const tt = t(), cats = BASE.categorias || [];
    const cnt = k => productos.filter(p => (p.categorias || []).includes(k)).length;
    const pill = (k, label, n, on) =>
      `<button class="pill ${on ? "on" : ""}" onclick="ERS.setCat('${k}')">${label}<span class="c">${n}</span></button>`;
    cont.innerHTML = pill("todos", tt.filtro_todos, productos.length, filtroCat === "todos")
      + cats.map(c => pill(c.key, f(c.label), cnt(c.key), filtroCat === c.key)).join("");
  }

  /* ---- ficha (modal) ---- */
  function openModal(id) {
    const p = productos.find(x => x.id === id), tt = t(), inCart = cart.has(id);
    const sold = p.disponible === false;
    const stone = f(p.significado)
      ? `<div class="stone"><div class="lab">${tt.significado_label} · ${f(p.piedra)}</div><p>${f(p.significado)}</p></div>` : "";
    const accion = sold
      ? `<button class="btn ghost soldbtn" disabled>${tt.sold}</button>`
      : `<button class="btn ${inCart ? "ghost" : "solid"}"
          onclick="ERS.toggle('${p.id}');ERS.openModal('${p.id}')">${inCart ? "✓ " + tt.added : tt.add}</button>`;
    $("modal").innerHTML = `
      <button class="closex" onclick="ERS.closeModal()" aria-label="Cerrar">✕</button>
      <div class="mimg ${sold ? "sold" : ""}"><img src="${foto(p)}" alt="${f(p.nombre)}"></div>
      <div class="mbody">
        <div class="eyebrow ${sold ? "vendido" : ""}">${sold ? tt.sold : tt.unique}</div>
        <h3>${f(p.nombre)}</h3>
        <p class="desc">${f(p.descripcion)}</p>
        ${stone}
        <div class="specs">
          <div><span>${tt.material}</span><b>${f(p.material)}</b></div>
          <div><span>${tt.measure}</span><b>${f(p.medida)}</b></div>
        </div>
        <div class="price">${money(p.precio)}</div>
        ${accion}
      </div>`;
    $("scrim").classList.add("open");
  }
  function closeModal() { $("scrim").classList.remove("open"); }

  /* ---- carrito ---- */
  function toggle(id) {
    const p = productos.find(x => x.id === id);
    if (p && p.disponible === false) return;      // no se puede agregar una pieza vendida
    cart.has(id) ? cart.delete(id) : cart.add(id); render();
  }
  function renderCart() {
    const tt = t(), items = $("items");
    $("count").textContent = cart.size;
    const list = [...cart].map(id => productos.find(p => p.id === id)).filter(Boolean);
    items.innerHTML = list.length ? list.map(p => `<div class="item">
      <img src="${foto(p)}" alt="">
      <div class="g"><h4>${f(p.nombre)}</h4><div class="m">${f(p.material)}</div>
        <button class="rm" onclick="ERS.toggle('${p.id}')">${tt.remove}</button></div>
      <div class="p">${money(p.precio)}</div></div>`).join("")
      : `<div class="empty">${tt.empty}</div>`;
    $("subtotal").textContent = money(list.reduce((s, p) => s + p.precio, 0));
    $("wabtn").disabled = !list.length;
  }

  /* ---- WhatsApp ---- */
  function checkout() {
    const tt = t(), list = [...cart].map(id => productos.find(p => p.id === id)).filter(Boolean);
    if (!list.length) return;
    const total = list.reduce((s, p) => s + p.precio, 0);
    const msg = tt.wa_hi + "\n\n" +
      list.map(p => `• ${f(p.nombre)} — ${money(p.precio)}`).join("\n") +
      `\n\n${tt.wa_total}: ${money(total)}\n\n${tt.wa_end}`;
    openWA(msg);
  }
  function customWA() { openWA(t().wa_custom); }
  function openWA(msg) {
    window.open(`https://wa.me/${config.whatsapp}?text=` + encodeURIComponent(msg), "_blank");
  }

  /* ---- drawer / idioma / scroll ---- */
  function openCart() { $("drawer").classList.add("open"); }
  function closeCart() { $("drawer").classList.remove("open"); }
  function setLang(l, btn) {
    lang = l;
    document.querySelectorAll("[data-lang]").forEach(x => x.classList.toggle("on", x === btn));
    render();
  }
  function goTo(sel) { document.querySelector(sel).scrollIntoView({ behavior: "smooth" }); }
  function setCat(k) { filtroCat = k; render(); }

  /* ---- cielo estrellado ---- */
  function starfield() {
    const c = $("stars"); if (!c) return;
    const x = c.getContext("2d");
    let w, h, stars;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    function size() {
      w = c.width = c.offsetWidth; h = c.height = c.offsetHeight;
      stars = Array.from({ length: Math.min(120, w / 9 | 0) }, () => ({
        x: Math.random() * w, y: Math.random() * h * .9,
        r: Math.random() * 1.3 + .2, a: Math.random(), s: Math.random() * .02 + .004,
        gold: Math.random() < .5
      }));
    }
    function draw() {
      x.clearRect(0, 0, w, h);
      for (const st of stars) {
        if (!reduce) { st.a += st.s; if (st.a > 1 || st.a < .1) st.s *= -1; }
        x.globalAlpha = reduce ? .6 : Math.max(.1, st.a);
        x.fillStyle = st.gold ? "#3fd6dc" : "#e3e8f6";
        x.beginPath(); x.arc(st.x, st.y, st.r, 0, 7); x.fill();
      }
      x.globalAlpha = 1;
      if (!reduce) requestAnimationFrame(draw);
    }
    size(); draw(); addEventListener("resize", size);
  }

  /* ---- init ---- */
  async function init() {
    await cargarContenido();

    document.querySelectorAll("[data-lang]").forEach(b =>
      b.addEventListener("click", () => setLang(b.dataset.lang, b)));
    document.querySelectorAll("[data-ig]").forEach(a => a.href = config.instagram);

    window.ERS = { openModal, closeModal, toggle, checkout, customWA, openCart, closeCart, goTo, setCat };

    starfield();
    render();
  }
  init();
})();
