import type { Localized } from "@/lib/i18n";

/**
 * Copy for the /about page. Previously this text lived inline in the page
 * as English-only JSX (with a few "English / Español" slash labels), which
 * meant the header toggle swapped the chrome but left the whole story in
 * English. Everything a visitor can read now lives here as a Localized
 * pair so the page follows the language toggle end to end.
 *
 * Source of the English text: franciscoherreramusic.com/about-francisco
 * and /epk (captured 2026-05-07).
 */

export const aboutCopy = {
  /* ─── Hero ─────────────────────────────────────────────────────────── */
  heroAria: { en: "About Francisco Herrera", es: "Acerca de Francisco Herrera" },
  heroEyebrow: { en: "About", es: "Acerca" },
  heroLead: {
    en: "Theologian. Cultural worker. Singer-songwriter. Four decades of carrying songs across borders — between English and Spanish, churches and union halls, elders and children.",
    es: "Teólogo. Trabajador cultural. Cantautor. Cuatro décadas llevando canciones a través de las fronteras — entre el inglés y el español, las iglesias y los salones sindicales, los mayores y los niños.",
  },

  /* ─── Lead bio ─────────────────────────────────────────────────────── */
  portraitAlt: {
    en: "Francisco J. Herrera with classical guitar",
    es: "Francisco J. Herrera con guitarra clásica",
  },
  bio1: {
    en: "Francisco Herrera is a boundary-crossing artist whose music blends cultural pride with a call for justice. Born into a family where performance was a way of life, Francisco began his musical journey as a child, singing Mexican rancheras and romantic ballads alongside his siblings at community and political events. By his teenage years, his talent and curiosity led him to explore rhythm and blues, jazz, rock, punk rock, pop, and gospel — creating an eclectic style that knows no borders.",
    es: "Francisco Herrera es un artista sin fronteras cuya música une el orgullo cultural con un llamado a la justicia. Nacido en una familia donde tocar era una forma de vida, Francisco comenzó su camino musical de niño, cantando rancheras mexicanas y baladas románticas junto a sus hermanos en eventos comunitarios y políticos. Ya en la adolescencia, su talento y su curiosidad lo llevaron a explorar el rhythm and blues, el jazz, el rock, el punk, el pop y el gospel — creando un estilo ecléctico que no conoce fronteras.",
  },
  bio2: {
    en: "Inspired by the legacy of Archbishop Óscar Romero and the rise of Base Christian Communities, Francisco's music found its true direction — championing human rights and amplifying the voices of working people. His creativity is fueled by the joy of music, the energy of collaborating with other artists, and the deep connection he forms with audiences. He especially cherishes live performances in community centers, on the streets, in churches, and union halls, where his music becomes a tool for empowerment and solidarity.",
    es: "Inspirada por el legado de Monseñor Óscar Romero y el surgimiento de las Comunidades Eclesiales de Base, la música de Francisco encontró su verdadero rumbo — defender los derechos humanos y amplificar las voces de la gente trabajadora. Su creatividad se nutre de la alegría de la música, la energía de colaborar con otros artistas y la conexión profunda que forma con el público. Aprecia especialmente las presentaciones en centros comunitarios, en las calles, en iglesias y en salones sindicales, donde su música se vuelve una herramienta de empoderamiento y solidaridad.",
  },
  bio3: {
    en: "What sets Francisco apart is his ability to turn his songs into human stories, blending great musicality with first-class storytelling. Audiences laugh, cry, reminisce, and envision a better future — all within a transformative and enjoyable musical experience.",
    es: "Lo que distingue a Francisco es su capacidad de convertir sus canciones en historias humanas, uniendo una gran musicalidad con una narración de primer nivel. El público ríe, llora, recuerda e imagina un futuro mejor — todo dentro de una experiencia musical transformadora y gozosa.",
  },

  /* ─── Calexico / formative years ───────────────────────────────────── */
  performanceAlt: {
    en: "Francisco J. Herrera in performance",
    es: "Francisco J. Herrera en presentación",
  },
  performanceCaption: { en: "In performance", es: "En presentación" },
  calexicoEyebrow: { en: "Calexico / Formative Years", es: "Calexico / Años Formativos" },
  calexicoTitle: { en: "Two worlds", es: "Dos mundos" },
  calexicoTitleAccent: { en: "at once.", es: "a la vez." },
  calexico1: {
    en: "Growing up in the border town of Calexico, Francisco always straddles two worlds. “My siblings and cousins and I used to sing rancheras and some mariachi at family parties, and when we got a little older we started some garage rock bands,” he recalls of his early musical exploits.",
    es: "Criado en el pueblo fronterizo de Calexico, Francisco siempre ha vivido entre dos mundos. “Mis hermanos, mis primos y yo cantábamos rancheras y algo de mariachi en las fiestas familiares, y cuando crecimos un poco armamos unas bandas de rock de garaje”, recuerda de sus primeras andanzas musicales.",
  },
  calexico2: {
    en: "As he became more involved in the church and Latin American social movements, Herrera began exploring ways to use music to further his goals of social justice. He traveled extensively throughout Latin America working with community organizations even as he finished his four years at seminary school — toting his guitar, ready to support events, actions, and church meetings.",
    es: "Conforme se involucró más en la iglesia y en los movimientos sociales latinoamericanos, Herrera empezó a explorar maneras de usar la música para impulsar sus metas de justicia social. Viajó extensamente por América Latina trabajando con organizaciones comunitarias, incluso mientras terminaba sus cuatro años de seminario — cargando su guitarra, listo para acompañar eventos, acciones y reuniones de iglesia.",
  },
  calexicoQuote: {
    en: "“Reflection, meditation, prayer — all those things are important. But they're important so you can play a role here to make social change. De ahí nacen all those misas that have a social message.”",
    es: "“La reflexión, la meditación, la oración — todas esas cosas son importantes. Pero son importantes para que puedas cumplir un papel aquí y generar cambio social. De ahí nacen todas esas misas que llevan un mensaje social.”",
  },
  calexico3: {
    en: "He deftly weaves between English and Spanish as he explains the philosophy of Liberation Theology, sitting under portraits of his two heroes — Che Guevara, and Monseñor Óscar Romero, the Salvadoran archbishop assassinated in 1980.",
    es: "Teje con destreza entre el inglés y el español mientras explica la filosofía de la Teología de la Liberación, sentado bajo los retratos de sus dos héroes — el Che Guevara y Monseñor Óscar Romero, el arzobispo salvadoreño asesinado en 1980.",
  },

  /* ─── Portraits ────────────────────────────────────────────────────── */
  portraitsEyebrow: { en: "Portraits", es: "Retratos" },
  portraitsTitle: { en: "On", es: "En" },
  portraitsTitleAccent: { en: "stage.", es: "escena." },
  portraitNAlt: {
    en: "Francisco J. Herrera — portrait",
    es: "Francisco J. Herrera — retrato",
  },

  /* ─── Discography ──────────────────────────────────────────────────── */
  discographyEyebrow: { en: "Discography", es: "Discografía" },
  discographyTitle: { en: "Seven", es: "Siete" },
  discographyTitleAccent: { en: "albums.", es: "álbumes." },
  discographyNote: {
    en: "Including two children's albums in Spanish.",
    es: "Incluyendo dos álbumes infantiles en español.",
  },

  /* ─── Listen — Amor Sin Papeles ────────────────────────────────────── */
  musicEyebrow: { en: "Music", es: "Música" },
  musicTitle: { en: "Amor sin", es: "Amor sin" },
  musicTitleAccent: { en: "papeles.", es: "papeles." },
  albumCoverAlt: {
    en: "Amor Sin Papeles — Francisco J. Herrera",
    es: "Amor Sin Papeles — Francisco J. Herrera",
  },
  playAria: {
    en: "Play Amor Sin Papeles on the original site",
    es: "Reproducir Amor Sin Papeles en el sitio original",
  },
  trackInfoAria: { en: "Info about", es: "Información sobre" },
  info: { en: "Info", es: "Info" },
  sale: { en: "Sale", es: "Oferta" },
  listenCta: { en: "Listen", es: "Escuchar" },
  buyCta: { en: "Buy in store", es: "Comprar en la tienda" },

  /* ─── Video sections ───────────────────────────────────────────────── */
  watchAria: { en: "Watch Francisco perform", es: "Ver a Francisco en presentación" },
  watchAria2: {
    en: "Watch Francisco perform — second video",
    es: "Ver a Francisco en presentación — segundo video",
  },
  watchEyebrow: { en: "Watch", es: "Ver" },
  watch1Title: { en: "Francisco", es: "Francisco" },
  watch1TitleAccent: { en: "in performance.", es: "en presentación." },
  watch1Lead: {
    en: "A few minutes on stage — the songs, the storytelling, the room.",
    es: "Unos minutos en escena — las canciones, las historias, la sala.",
  },
  watch2Title: { en: "Another song,", es: "Otra canción," },
  watch2TitleAccent: { en: "another stage.", es: "otro escenario." },
  watch2Lead: {
    en: "More from the road — different room, same heart.",
    es: "Más del camino — otra sala, el mismo corazón.",
  },
  watchCta: { en: "Watch on YouTube", es: "Ver en YouTube" },

  /* ─── Career highlights ────────────────────────────────────────────── */
  onStageAlt: { en: "Francisco J. Herrera on stage", es: "Francisco J. Herrera en escena" },
  onStageCaption: { en: "On stage", es: "En escena" },
  highlightsEyebrow: { en: "On Stage", es: "En Escena" },
  highlightsTitle: { en: "Notable", es: "Momentos" },
  highlightsTitleAccent: { en: "moments.", es: "notables." },
  highlightsClosing: {
    en: "Francisco's most common place is not on big stages. He's found in intimate gatherings of women recovering from domestic violence, day laborers organizing for a universal wage, children becoming bilingual, interfaith groups shutting down private prisons — always performing songs that move, teach, and inspire.",
    es: "El lugar más habitual de Francisco no son los grandes escenarios. Se le encuentra en reuniones íntimas de mujeres que se recuperan de la violencia doméstica, jornaleros que se organizan por un salario universal, niñas y niños que se hacen bilingües, grupos interreligiosos que cierran cárceles privadas — siempre cantando canciones que conmueven, enseñan e inspiran.",
  },

  /* ─── Compañeros gallery ───────────────────────────────────────────── */
  companionsEyebrow: { en: "Companions · Compañeros", es: "Compañeros" },
  companionsTitle: { en: "On the", es: "En el" },
  companionsTitleAccent: { en: "road.", es: "camino." },
  companionsLead: {
    en: "Bandmates, congregants, organizers — the people the songs are sung with and for.",
    es: "Compañeros de banda, congregantes, organizadores — la gente con quien y para quien se cantan las canciones.",
  },
  companionsOverlaySubtitle: {
    en: "Forty years on the road.",
    es: "Cuarenta años en el camino.",
  },
  companionsAria: { en: "Compañeros gallery", es: "Galería de compañeros" },

  /* ─── Present-day banner ───────────────────────────────────────────── */
  todayAria: { en: "Francisco J. Herrera today", es: "Francisco J. Herrera hoy" },
  todayAlt: {
    en: "Francisco J. Herrera with his classical guitar in a park",
    es: "Francisco J. Herrera con su guitarra clásica en un parque",
  },

  /* ─── Letter from Francisco ────────────────────────────────────────── */
  letterEyebrow: { en: "From Francisco", es: "De Francisco" },
  letter: {
    en: "Welcome — these are the songs I sing because they need singing. The songs of liberation, of the migrant journey, of family at the table, of children laughing in two languages. I share them with you.",
    es: "Bienvenidos — estos son los cantos que canto porque necesitan ser cantados. Los cantos de liberación, del camino migrante, de la familia en la mesa, de las niñas y niños riendo en dos idiomas. Se los comparto.",
  },

  /* ─── Band & collaborators ─────────────────────────────────────────── */
  bandEyebrow: { en: "Band & Collaborators", es: "Banda y Colaboradores" },

  /* ─── Reviews ──────────────────────────────────────────────────────── */
  reviewsEyebrow: { en: "Reviews", es: "Reseñas" },
  reviewsTitle: { en: "In their", es: "En sus" },
  reviewsTitleAccent: { en: "words.", es: "palabras." },
  reviewPortraitCaption: {
    en: "Francisco in performance",
    es: "Francisco en presentación",
  },
  review: {
    en: "Francisco Herrera is an extraordinary guitarist and singer. He has performed often at the San Francisco Public Library's Children's Center over the past half-dozen years. Francisco is wonderfully capable of adjusting his repertoire of songs and program length to different age groups — from the littlest pre-K children and school-aged kids to teens and adults. I personally recommend Francisco with great honor!",
    es: "Francisco Herrera es un guitarrista y cantante extraordinario. Se ha presentado con frecuencia en el Centro Infantil de la Biblioteca Pública de San Francisco durante los últimos seis años. Francisco tiene una capacidad admirable para adaptar su repertorio y la duración de su programa a distintas edades — desde los más pequeños de preescolar y niños de primaria hasta adolescentes y adultos. ¡Recomiendo a Francisco personalmente y con gran honor!",
  },
  reviewRole: {
    en: "Library · Fisher Children's Center",
    es: "Biblioteca · Centro Infantil Fisher",
  },
  reviewOrg: {
    en: "San Francisco Public Library",
    es: "Biblioteca Pública de San Francisco",
  },

  /* ─── Road banner ──────────────────────────────────────────────────── */
  roadAria: {
    en: "Songs of the road — guitar and hat on the sand at sunset",
    es: "Cantos del camino — guitarra y sombrero en la arena al atardecer",
  },
  roadAlt: {
    en: "A classical guitar and a straw hat resting on the sand at sunset",
    es: "Una guitarra clásica y un sombrero de paja sobre la arena al atardecer",
  },

  /* ─── Press quote + CTA ────────────────────────────────────────────── */
  pressQuote: {
    en: "“An extraordinary guitarist and singer.”",
    es: "“Un guitarrista y cantante extraordinario.”",
  },
  pressAttribution: {
    en: "— Tim Troy, San Francisco Public Library / Fisher Children's Center",
    es: "— Tim Troy, Biblioteca Pública de San Francisco / Centro Infantil Fisher",
  },
  bookCta: { en: "Book Francisco", es: "Contrátanos" },
  writingCta: { en: "Read his writing", es: "Leer su escritura" },
} satisfies Record<string, Localized>;

/** Career highlights list — numbered 01–06 on the page. */
export const aboutHighlights: Localized[] = [
  {
    en: "Performed alongside Pete Seeger, Jon Fromer, and Emma's Revolution",
    es: "Ha tocado junto a Pete Seeger, Jon Fromer y Emma's Revolution",
  },
  {
    en: "Stage at the Battle for Seattle (1999) — 250,000 people shutting down the WTO",
    es: "En el escenario de la Batalla de Seattle (1999) — 250,000 personas cerrando la OMC",
  },
  {
    en: "School of the Americas Watch vigils — up to 22,000 people",
    es: "Vigilias de School of the Americas Watch — hasta 22,000 personas",
  },
  {
    en: "Shared the stage with Joan Baez and Jesse Jackson before 10,000 people (1987) for Brian S. Willson",
    es: "Compartió el escenario con Joan Baez y Jesse Jackson ante 10,000 personas (1987) por Brian S. Willson",
  },
  {
    en: "Toured North and Central America in solidarity with grassroots movements",
    es: "Giras por Norteamérica y Centroamérica en solidaridad con movimientos de base",
  },
  {
    en: "Scored documentaries for filmmakers Saul Landau and Haskell Wexler",
    es: "Compuso la música de documentales de los cineastas Saul Landau y Haskell Wexler",
  },
];

/** Band + collaborators. Names stay as-is; only the roles translate. */
export const aboutCollaborators: { name: string; role: Localized }[] = [
  { name: "Camilo Landau", role: { en: "Guitar", es: "Guitarra" } },
  { name: "Ayla Davila", role: { en: "Bass", es: "Bajo" } },
  { name: "Chris Trinidad", role: { en: "Bass and keyboards", es: "Bajo y teclados" } },
  { name: "Rafael Herrera", role: { en: "Percussion", es: "Percusión" } },
  { name: "Pedro Gomez", role: { en: "Drums", es: "Batería" } },
  {
    name: "Greg Landau",
    role: { en: "Producer (Grammy-nominated)", es: "Productor (nominado al Grammy)" },
  },
];
