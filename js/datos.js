/* ============================================================================
   EL RETORNO DE SATURNO — CONTENIDO DEL SITIO
   ----------------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitás tocar para el día a día:
   agregar / sacar amuletos, cambiar precios, editar textos o la bio.
   No hace falta saber programar: seguí los ejemplos y respetá las comillas.
   ============================================================================ */

window.DATOS = {

  /* ---- Configuración general -------------------------------------------- */
  config: {
    // Número de WhatsApp SOLO con números (país + área + número, sin +, sin espacios).
    // +55 75 9171-3898  ->  "557591713898"   (si los móviles de Brasil piden el 9 extra: "5575991713898")
    whatsapp: "557591713898",
    instagram: "https://www.instagram.com/el.retorno.de.saturno.artes/",
    // Moneda para mostrar los precios
    moneda: "$ ",
    localePrecio: "es-AR"
  },

  /* ---- Categorías del menú de filtros (en este orden) -------------------
     Para renombrar una: cambiá el texto de "label". Para sumar una nueva:
     agregá un bloque con su "key" (sin espacios) y su label es/pt, y después
     sumá esa misma opción en admin/config.yml (campo "Categorías").
     ----------------------------------------------------------------------- */
  categorias: [
    { key: "dijes",        label: { es: "Dijes",               pt: "Pingentes" } },
    { key: "gargantillas", label: { es: "Gargantillas",        pt: "Gargantilhas" } },
    { key: "anillos",      label: { es: "Anillos",             pt: "Anéis" } },
    { key: "pulseras",     label: { es: "Pulseras",            pt: "Pulseiras" } },
    { key: "coleccion",    label: { es: "Piezas de colección", pt: "Peças de coleção" } }
  ],

  /* ---- Amuletos ---------------------------------------------------------
     Para AGREGAR uno nuevo: copiá un bloque { ... } entero, pegalo, y cambiá
     los datos. La foto va en la carpeta /img y acá ponés su nombre de archivo.
     Para SACAR uno: borrá su bloque (o poné  disponible: false  para ocultarlo).
     Los textos que tienen  { es: "...", pt: "..." }  van en los dos idiomas.
     precio: es un número, sin puntos ni símbolos (ej: 96000).
     ----------------------------------------------------------------------- */
  amuletos: [
    {
      id: "rodocrosita",
      disponible: true,
      categorias: ["dijes"],
      fotos: ["img/rodocrosita.jpg"],
      precio: 96000,                          // precio de ejemplo — reemplazar por el real
      medida: { es: "4,5 cm", pt: "4,5 cm" },
      piedra: { es: "Rodocrosita", pt: "Rodocrosita" },
      nombre: { es: "Colgante Rodocrosita", pt: "Pingente Rodocrosita" },
      material: { es: "Plata 950 · Rodocrosita", pt: "Prata 950 · Rodocrosita" },
      descripcion: {
        es: "Rodocrosita rosa bandeada —la piedra nacional argentina— engarzada en plata con un marco trenzado hecho a mano.",
        pt: "Rodocrosita rosa —a pedra nacional argentina— cravada em prata com moldura trançada feita à mão."
      },
      significado: {                           // significado de la piedra (a confirmar con Paulo)
        es: "Piedra del amor y la calma. Se asocia a sanar el corazón y suavizar las emociones.",
        pt: "Pedra do amor e da calma. Associada a curar o coração e suavizar as emoções."
      }
    },
    {
      id: "onix-azul",
      disponible: false,
      categorias: ["pulseras", "coleccion"],
      fotos: ["img/onix-azul.jpg"],
      precio: 184000,
      medida: { es: "Ajustable", pt: "Ajustável" },
      piedra: { es: "Ónix azul", pt: "Ônix azul" },
      nombre: { es: "Brazalete Ónix Azul", pt: "Bracelete Ônix Azul" },
      material: { es: "Alpaca · Ónix azul", pt: "Alpaca · Ônix azul" },
      descripcion: {
        es: "Brazalete de plata con grabado geométrico de inspiración andina y un gran cabujón de ónix azul bandeado.",
        pt: "Bracelete de prata com gravação geométrica de inspiração andina e um grande cabochão de ônix azul."
      },
      significado: {
        es: "Serenidad y equilibrio. Ayuda a calmar la mente y sostener el foco.",
        pt: "Serenidade e equilíbrio. Ajuda a acalmar a mente e sustentar o foco."
      }
    },
    {
      id: "mandala",
      disponible: true,
      categorias: ["gargantillas", "coleccion"],
      fotos: ["img/mandala-labradorita.jpg"],
      precio: 122000,
      medida: { es: "5 cm · cordón 45 cm", pt: "5 cm · cordão 45 cm" },
      piedra: { es: "Labradorita", pt: "Labradorita" },
      nombre: { es: "Colgante Mandala", pt: "Pingente Mandala" },
      material: { es: "Plata · Labradorita · Cuero", pt: "Prata · Labradorita · Couro" },
      descripcion: {
        es: "Disco de plata grabado a mano como un sol, con una labradorita central de destello verde y dorado. Cordón de cuero.",
        pt: "Disco de prata gravado à mão como um sol, com labradorita central de reflexo verde e dourado. Cordão de couro."
      },
      significado: {
        es: "Protección y transformación. Actúa como un escudo energético en los cambios.",
        pt: "Proteção e transformação. Atua como um escudo energético nas mudanças."
      }
    },
    {
      id: "ojo-de-tigre",
      disponible: true,
      categorias: ["dijes"],
      fotos: ["img/ojo-de-tigre.jpg"],
      precio: 112000,
      medida: { es: "5,5 cm", pt: "5,5 cm" },
      piedra: { es: "Ojo de tigre", pt: "Olho de tigre" },
      nombre: { es: "Colgante Ojo de Tigre", pt: "Pingente Olho de Tigre" },
      material: { es: "Plata · Ojo de tigre · Lapislázuli", pt: "Prata · Olho de tigre · Lápis-lazúli" },
      descripcion: {
        es: "Ojo de tigre dorado con un acento de lapislázuli y filigrana de espirales en plata.",
        pt: "Olho de tigre dourado com detalhe de lápis-lazúli e filigrana de espirais em prata."
      },
      significado: {
        es: "Fuerza, coraje y protección. Ancla, da confianza y aleja lo que no suma.",
        pt: "Força, coragem e proteção. Ancora, dá confiança e afasta o que não soma."
      }
    }
  ],

  /* ---- Textos del sitio (interfaz + bio) --------------------------------
     Todo lo que se lee en la página, en español y portugués.
     La BIO y la HISTORIA son un primer borrador: reemplazar con las
     respuestas de Paulo a las 10 preguntas.
     ----------------------------------------------------------------------- */
  textos: {
    es: {
      nav_amuletos: "Amuletos", nav_artista: "El artista", nav_historia: "Historia", nav_encargos: "Encargos",
      cart_word: "Pedido",
      hero_eyebrow: "Orfebrería · amuletos únicos",
      hero_title: 'Amuletos nacidos del <span class="it">metal y la piedra</span>',
      hero_sub: "Cada amuleto de Paulo Imbellone es único, forjado a mano y engarzado con piedras naturales. Envíos a toda Argentina y Brasil.",
      hero_cta1: "Ver los amuletos", hero_cta2: "Encargo personalizado",
      collection_eyebrow: "La colección", collection_title: "Amuletos disponibles",
      collection_note: "Cada uno es único — cuando se va, se va.",
      filtro_todos: "Todos", cat_vacia_title: "Próximamente en esta categoría",
      cat_vacia_p: "Todavía no hay piezas acá — o pedila a medida", cat_vacia_link: "por WhatsApp",
      // — El artista (BORRADOR, reemplazar con la bio real) —
      about_eyebrow: "El artista", about_title: "Paulo Imbellone",
      about_p1: "Orfebre. Trabaja la plata a mano, pieza por pieza, dejando que cada piedra decida su forma final. Nada se repite: lo que ves es lo que hay.",
      about_p2: "Del taller salen colgantes, anillos y brazaletes que combinan técnica tradicional con un pulso propio. También toma encargos personalizados.",
      about_sig: "El retorno de Saturno",
      // — Historia / proceso (BORRADOR) —
      historia_eyebrow: "El oficio",
      historia_title: "Cada amuleto empieza en el banco de trabajo",
      historia_p1: "No hay dos iguales. La piedra llega primero y pide su forma; el metal la acompaña. Después vienen el grabado, el engarce y el pulido, todo a mano.",
      historia_p2: "Un amuleto no es solo una pieza linda: es algo que se lleva puesto, que acompaña. Por eso cada piedra se elige por lo que carga, además de por cómo se ve.",
      significado_label: "La piedra",
      // — Encargos —
      custom_eyebrow: "A medida", custom_title: "¿Buscás un amuleto único para vos?",
      custom_p: "Contame qué piedra te llama o qué idea tenés en mente y lo creamos juntos, desde cero.",
      custom_cta: "Escribir por WhatsApp",
      // — Producto / carrito —
      unique: "Pieza única", sold: "Vendido", add: "Agregar", added: "En el pedido", remove: "Quitar",
      material: "Material", measure: "Medida",
      cart_title: "Tu pedido", subtotal: "Subtotal", empty: "Todavía no elegiste amuletos.",
      ship_note: "Coordinamos envío y forma de pago por WhatsApp.",
      checkout: "Finalizar por WhatsApp",
      foot_ship: "Envíos a Argentina y Brasil",
      // — Mensajes de WhatsApp —
      wa_hi: "¡Hola! Me interesan estos amuletos de El retorno de Saturno:",
      wa_total: "Total", wa_end: "¿Me contás sobre disponibilidad y envío?",
      wa_custom: "¡Hola Paulo! Me gustaría encargar un amuleto personalizado. Te cuento la idea:"
    },
    pt: {
      nav_amuletos: "Amuletos", nav_artista: "O artista", nav_historia: "História", nav_encargos: "Encomendas",
      cart_word: "Pedido",
      hero_eyebrow: "Ourivesaria · amuletos únicos",
      hero_title: 'Amuletos nascidos do <span class="it">metal e da pedra</span>',
      hero_sub: "Cada amuleto de Paulo Imbellone é único, forjado à mão e cravado com pedras naturais. Envios para toda a Argentina e o Brasil.",
      hero_cta1: "Ver os amuletos", hero_cta2: "Encomenda personalizada",
      collection_eyebrow: "A coleção", collection_title: "Amuletos disponíveis",
      collection_note: "Cada um é único — quando vai, vai.",
      filtro_todos: "Todos", cat_vacia_title: "Em breve nesta categoria",
      cat_vacia_p: "Ainda não há peças aqui — ou peça sob medida", cat_vacia_link: "pelo WhatsApp",
      about_eyebrow: "O artista", about_title: "Paulo Imbellone",
      about_p1: "Ourives. Trabalha a prata à mão, peça por peça, deixando cada pedra decidir sua forma final. Nada se repete: o que você vê é o que há.",
      about_p2: "Do ateliê saem pingentes, anéis e braceletes que unem técnica tradicional a um pulso próprio. Também aceita encomendas personalizadas.",
      about_sig: "El retorno de Saturno",
      historia_eyebrow: "O ofício",
      historia_title: "Cada amuleto começa na bancada",
      historia_p1: "Não há dois iguais. A pedra chega primeiro e pede sua forma; o metal acompanha. Depois vêm a gravação, a cravação e o polimento, tudo à mão.",
      historia_p2: "Um amuleto não é só uma peça bonita: é algo que se usa, que acompanha. Por isso cada pedra é escolhida pelo que carrega, além de como se vê.",
      significado_label: "A pedra",
      custom_eyebrow: "Sob medida", custom_title: "Procura um amuleto único para você?",
      custom_p: "Conte qual pedra te chama ou que ideia tem em mente e criamos juntos, do zero.",
      custom_cta: "Escrever no WhatsApp",
      unique: "Peça única", sold: "Vendido", add: "Adicionar", added: "No pedido", remove: "Remover",
      material: "Material", measure: "Medida",
      cart_title: "Seu pedido", subtotal: "Subtotal", empty: "Você ainda não escolheu amuletos.",
      ship_note: "Combinamos envio e forma de pagamento pelo WhatsApp.",
      checkout: "Finalizar pelo WhatsApp",
      foot_ship: "Envios para Argentina e Brasil",
      wa_hi: "Olá! Tenho interesse nestes amuletos de El retorno de Saturno:",
      wa_total: "Total", wa_end: "Pode me contar sobre disponibilidade e envio?",
      wa_custom: "Olá Paulo! Gostaria de encomendar um amuleto personalizado. Vou te contar a ideia:"
    }
  }
};
