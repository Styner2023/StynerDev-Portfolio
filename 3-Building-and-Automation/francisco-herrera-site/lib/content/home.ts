import type { Localized } from "@/lib/i18n";

/* ─── Existing exports (kept for back-compat) ─────────────────────────── */

type ThemeCard = {
  id: string;
  title: Localized;
  blurb: Localized;
};

type LegacyHomeContent = {
  hero: {
    eyebrow: Localized;
    title: Localized;
    tagline: Localized;
    ctaPrimary: Localized;
    ctaSecondary: Localized;
  };
  catalogIntro: Localized;
  themes: ThemeCard[];
};

export const homeContent: LegacyHomeContent = {
  hero: {
    eyebrow: { en: "Public Art / Arte Público", es: "Arte Público" },
    title: { en: "Francisco J. Herrera", es: "Francisco J. Herrera" },
    tagline: {
      en: "Songs of liberation, migration, family, and faith — sung in churches, plazas, schools, picket lines, and everywhere people are organizing.",
      es: "Cantos de liberación, migración, familia y fe — cantados en iglesias, plazas, escuelas, huelgas, y donde la gente se organiza.",
    },
    ctaPrimary: { en: "Listen", es: "Escuchar" },
    ctaSecondary: { en: "Book Now", es: "Contrátanos" },
  },
  catalogIntro: {
    en: "Music for movements, families, and the journey home.",
    es: "Música para los movimientos, las familias, y el camino a casa.",
  },
  themes: [
    {
      id: "migration",
      title: { en: "Migration & Liberation", es: "Migración y Liberación" },
      blurb: {
        en: "Honor Migrante and the songs of the journey.",
        es: "Honor Migrante y los cantos del camino.",
      },
    },
    {
      id: "family",
      title: { en: "Children & Family", es: "Niños y Familia" },
      blurb: {
        en: "Francisco y Los Niños — songs in Spanish for the whole family.",
        es: "Francisco y Los Niños — canciones en español para toda la familia.",
      },
    },
    {
      id: "faith",
      title: { en: "Faith & Reflection", es: "Fe y Reflexión" },
      blurb: {
        en: "Songs for churches, vigils, and the work of justice.",
        es: "Cantos para iglesias, vigilias, y el trabajo de la justicia.",
      },
    },
  ],
};

/* ─── Guitare-section content (new) ───────────────────────────────────── */

export type HeroSlide = {
  id: string;
  image: string;
  imageAlt: Localized;
  eyebrow: Localized;
  title: Localized;
  tagline: Localized;
  cta: { label: Localized; href: string };
  align?: "left" | "center-below" | "right-below";
  /** Optional big decorative word rendered above the eyebrow in the
   *  Silently signature script + gold accent. Used as an atmospheric
   *  flourish (e.g. "CANTO") that sits as the visual anchor of the slide. */
  decorTitle?: Localized;
  overlay?: boolean;
  /** Optional uniform dark tint over the slide (independent of the
   *  gradient `overlay`). Useful when overlay is off but the image still
   *  needs slight darkening. */
  tint?: "light" | "medium" | "heavy";
  /** Optional symmetric side-vignette — darker tint on left + right edges,
   *  lighter in the middle. Used when the image subject sits on one side
   *  and the text overlay needs the opposite side / center to read clean. */
  sideVignette?: boolean;
  /** CSS `object-position` override for the bg image — e.g. "top",
   *  "center 30%", "bottom right". Defaults to "center" if omitted. */
  imagePosition?: string;
  /** Object-fit mode. Defaults to "cover" (fills container, crops). Use
   *  "contain" when the source image has important elements at its edges
   *  that would be cropped on narrow viewports. */
  imageFit?: "cover" | "contain";
};

export type DealBannerContent = {
  background: string;
  eyebrow: Localized;
  title: Localized;
  body: Localized;
  cta: { label: Localized; href: string };
};

export type CustomBlock = {
  id: string;
  image: string;
  imageAlt: Localized;
  reverse: boolean;
  eyebrow: Localized;
  title: Localized;
  body: Localized;
  cta: { label: Localized; href: string };
};

export type CustomSectionContent = {
  sectionEyebrow: Localized;
  sectionTitle: Localized;
  blocks: CustomBlock[];
};

export type AlbumCard = {
  id: string;
  image: string;
  title: Localized;
  theme: Localized;
  href: string;
  /** Optional `object-position` keyword — same vocabulary as HeroSlide.
   *  e.g. "top", "top-30", "bottom-65". See OBJECT_POSITION_CLASSES. */
  imagePosition?: string;
};

export type ProductCarouselContent = {
  /** Cursive Silently watermark word, bleeding off the corner. */
  watermark: Localized;
  eyebrow: Localized;
  title: Localized;
  description: Localized;
  ctaLabel: Localized;
  items: AlbumCard[];
};

export type VideoBannerContent = {
  poster: string;
  backgroundVideo?: string;
  eyebrow: Localized;
  title: Localized;
  caption: Localized;
  videoUrl: string;
};

export type SpecRow = { label: Localized; value: Localized };

export type AlbumTrack = {
  number: number;
  title: string;
  duration: string;
  /** "Free", "$0.99", "$0.55", or any string. Empty/undefined hides the badge. */
  price?: string;
  /** Original price if track is on sale (renders strikethrough). */
  originalPrice?: string;
  /** Optional href to a lyrics page. */
  lyricsHref?: string;
  /** Optional href to a track-info / liner-notes page. */
  infoHref?: string;
  /** Optional MP3 source — when present, a per-track play button can be wired. */
  audioSrc?: string;
};

export type GridBannerCard = {
  id: string;
  image: string;
  title: Localized;
  series: Localized;
  price: Localized;
  originalPrice?: Localized;
  /** Visible-by-default excerpt (first paragraph). */
  description: Localized;
  /** Optional additional paragraphs revealed by the Read more disclosure. */
  fullDescription?: Localized[];
  featuredTrack: {
    title: string;
    duration: string;
    audioSrc?: string;
  };
  tracks: AlbumTrack[];
  cta: { label: Localized; href: string };
};

export type GridBannerContent = {
  background: string;
  eyebrow: Localized;
  title: Localized;
  cards: GridBannerCard[];
};

export type BlogPostCard = {
  id: string;
  image: string;
  date: Localized;
  title: Localized;
  excerpt: Localized;
  href: string;
};

export type FeaturedBlogContent = {
  background: string;
  eyebrow: Localized;
  title: Localized;
  posts: BlogPostCard[];
};

export type CollectionAlbum = {
  id: string;
  image: string;
  imageAlt: Localized;
  title: Localized;
  price: Localized;
  cta: { label: Localized; href: string };
};

export type UniqueCollectionsContent = {
  watermark: Localized;
  eyebrow: Localized;
  title: Localized;
  description: Localized;
  albums: CollectionAlbum[];
};

export type GalleryContent = {
  watermark: Localized;
  wideImage: string;
  wideImageAlt: Localized;
  /** Small inset photo tucked into the banner's empty top-right corner. */
  portraitImage: string;
  portraitImageAlt: Localized;
};

export type SongDetailRow = { label: Localized; value: Localized };

export type FeaturedSong = {
  id: string;
  reverse: boolean;
  image: string;
  imageAlt: Localized;
  title: Localized;
  meta: Localized;
  excerpt: Localized;
  fullStory: Localized[];
  details: SongDetailRow[];
  cta: { label: Localized; href: string };
};

export type FeaturedSongsContent = {
  watermark: Localized;
  eyebrow: Localized;
  title: Localized;
  songs: FeaturedSong[];
};

export type CompaneroCard = {
  id: string;
  image: string;
  imageAlt: Localized;
  name: Localized;
  role: Localized;
  bio: Localized;
  /** Optional outbound link rendered inside the bio. The first occurrence
   *  of `label` within the bio text becomes an anchor to `href` — used to
   *  point a compañer@'s name at their own site. */
  bioLink?: { label: Localized; href: string };
  cta: { label: Localized; href: string };
};

export type CompanerosContent = {
  watermark: Localized;
  eyebrow: Localized;
  title: Localized;
  description: Localized;
  members: CompaneroCard[];
};

export type SaludoEntry = {
  id: string;
  name: string;
  location: Localized;
  /** ISO date for sorting / display, e.g. "2018-11-26". */
  date: string;
  /** Original message — usually one language, sometimes mixed. */
  message: string;
  /** Optional reply from Francisco. */
  reply?: string;
};

export type SaludosContent = {
  watermark: Localized;
  eyebrow: Localized;
  title: Localized;
  description: Localized;
  entries: SaludoEntry[];
};

export type VoicemailContent = {
  watermark: Localized;
  eyebrow: Localized;
  title: Localized;
  description: Localized;
  /** Embed URL for the YouTube video, e.g. https://www.youtube-nocookie.com/embed/<id> */
  videoEmbedUrl: string;
  /** Accessible title for the iframe. */
  videoTitle: Localized;
  /** Short MP4 that loops in the section background — same UX as VideoBanner. */
  loopVideoSrc?: string;
  /** Poster image shown until the loop video loads (and as a fallback). */
  poster?: string;
};

export type PullQuoteContent = {
  watermark: Localized;
  /** The primary quote — shown large in the signature script. Same string in both lang slots when the quote is itself bilingual. */
  primaryQuote: Localized;
  /** The translation — shown smaller below the rule. */
  secondaryQuote: Localized;
  /** Speaker name, e.g. "Benito Juárez". */
  attribution: Localized;
  /** Speaker context, e.g. "Former President of Mexico / Ex Presidente de México". */
  attributionDetail: Localized;
  /** Optional portrait of the speaker, framed beside the quote on desktop. */
  image?: string;
  imageAlt?: Localized;
};

export type PlayAlongSong = {
  id: string;
  title: Localized;
  /** Chordify embed URL, e.g. https://chordify.net/embed/<slug> */
  chordifyEmbedUrl: string;
};

export type PlayAlongContent = {
  watermark: Localized;
  eyebrow: Localized;
  title: Localized;
  description: Localized;
  songs: PlayAlongSong[];
};

export type SongOfLiberationContent = {
  watermark: Localized;
  eyebrow: Localized;
  title: Localized;
  image: string;
  imageAlt: Localized;
  quote: Localized;
  quoteAttribution: Localized;
  storyEn: string[];
  storyEs: string[];
  song: {
    title: Localized;
    duration: string;
    audioSrc: string;
    iTunesHref?: string;
    rssHref?: string;
    downloadHref?: string;
  };
  date: Localized;
};

export type DonateContent = {
  watermark: Localized;
  eyebrow: Localized;
  title: Localized;
  body: Localized;
  campaignTag: Localized;
  presetAmounts: number[];
  primaryCta: { label: Localized; href: string };
  secondaryCta: { label: Localized; href: string };
};

export type GuitareHomeContent = {
  hero: HeroSlide[];
  dealBanner: DealBannerContent;
  customSection: CustomSectionContent;
  productCarousel: ProductCarouselContent;
  videoBanner: VideoBannerContent;
  gridBanner: GridBannerContent;
  featuredBlog: FeaturedBlogContent;
  uniqueCollections: UniqueCollectionsContent;
  gallery: GalleryContent;
  featuredSongs: FeaturedSongsContent;
  companeros: CompanerosContent;
  songOfLiberation: SongOfLiberationContent;
  playAlong: PlayAlongContent;
  saludos: SaludosContent;
  voicemail: VoicemailContent;
  pullQuote: PullQuoteContent;
  donate: DonateContent;
};

const PIC = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const guitareHome: GuitareHomeContent = {
  hero: [
    {
      id: "honor-migrante",
      image: "/images/hero/Francisco-J._Herrera.png",
      imageAlt: { en: "Album cover — Honor Migrante", es: "Portada del álbum — Honor Migrante" },
      eyebrow: { en: "ALBUM", es: "ÁLBUM" },
      title: { en: "HONOR MIGRANTE", es: "HONOR MIGRANTE" },
      tagline: {
        en: "Songs of the journey home",
        es: "Cantos del camino a casa",
      },
      cta: { label: { en: "LISTEN", es: "ESCUCHAR" }, href: "/music" },
      decorTitle: { en: "CANTO", es: "CANTO" },
      align: "right-below",
      overlay: false,
      tint: "light",
      sideVignette: true,
      imageFit: "contain", // show whole image (gold CANTO + Francisco) without aggressive crop on mobile
      imagePosition: "top", // anchor to top so on mobile the image sits high and the text overlay below has its own clear space
    },
    {
      id: "booking",
      image: "/images/photos/francisco-festival-performance.webp",
      imagePosition: "bottom-65", // shift up so the guitar in his hands stays in frame
      imageAlt: {
        en: "Francisco performing live at Yerba Buena Center for the Arts",
        es: "Francisco actuando en vivo en Yerba Buena Center for the Arts",
      },
      eyebrow: { en: "LIVE", es: "EN VIVO" },
      title: { en: "BOOK FRANCISCO", es: "CONTRÁTANOS" },
      tagline: {
        en: "Music for movements, churches, schools, and family",
        es: "Música para movimientos, iglesias, escuelas y familias",
      },
      cta: { label: { en: "BOOK NOW", es: "CONTRÁTANOS" }, href: "/booking" },
      decorTitle: { en: "VIVO", es: "VIVO" },
      overlay: false,
      tint: "light",
      sideVignette: true,
    },
    {
      id: "ninos",
      image: "/images/client-sent-images/11.png",
      imagePosition: "center", // both Francisco (upper-right) and the seated kids (lower-left) stay in frame
      imageAlt: {
        en: "Francisco J. Herrera playing classical guitar for children in a school library",
        es: "Francisco J. Herrera tocando guitarra clásica para niños en una biblioteca escolar",
      },
      eyebrow: { en: "CHILDREN", es: "NIÑOS" },
      title: { en: "FRANCISCO Y LOS NIÑOS", es: "FRANCISCO Y LOS NIÑOS" },
      tagline: {
        en: "Bilingual songs for kids and families",
        es: "Canciones bilingües para niñas y familias",
      },
      cta: { label: { en: "EXPLORE", es: "EXPLORAR" }, href: "/music/francisco-y-los-ninos" },
      decorTitle: { en: "FAMILIA", es: "FAMILIA" },
      overlay: false,
      tint: "light",
      sideVignette: true,
    },
    {
      id: "trabajador-cultural",
      image: "/images/photos/francisco-city-hall-rally.webp",
      imageAlt: {
        en: "Crowd at SF City Hall \"Free All the Children\" rally with Solidaridad / Respeto / Justicia banner",
        es: "Multitud en la marcha \"Free All the Children\" frente al City Hall de SF con bandera Solidaridad / Respeto / Justicia",
      },
      eyebrow: { en: "CULTURAL WORKER", es: "TRABAJADOR CULTURAL" },
      title: { en: "TRABAJADOR CULTURAL", es: "TRABAJADOR CULTURAL" },
      tagline: {
        en: "Songs at picket lines, vigils, and marches — wherever community gathers",
        es: "Cantos en piquetes, vigilias y marchas — donde sea que la comunidad se reúna",
      },
      cta: { label: { en: "ABOUT FRANCISCO", es: "SOBRE FRANCISCO" }, href: "/about" },
      decorTitle: { en: "PUEBLO", es: "PUEBLO" },
      overlay: false,
      tint: "light",
      sideVignette: true,
    },
    {
      id: "on-stage",
      image: "/images/photos/francisco-singing-protest.webp",
      imagePosition: "top-30", // softer than "top" — keeps hair visible without overcropping the bottom
      imageAlt: {
        en: "Francisco singing at a rally with community members holding signs",
        es: "Francisco cantando en una marcha con miembros de la comunidad sosteniendo carteles",
      },
      eyebrow: { en: "ON STAGE", es: "EN ESCENA" },
      title: { en: "LIVE THROUGH THE YEARS", es: "EN ESCENA POR LOS AÑOS" },
      tagline: {
        en: "Over 50 concerts since 2010 — across the Bay Area, Fresno, Riverside, and beyond",
        es: "Más de 50 conciertos desde 2010 — del Área de la Bahía a Fresno, Riverside y más allá",
      },
      cta: { label: { en: "VIEW PAST EVENTS", es: "VER EVENTOS" }, href: "/shows" },
      decorTitle: { en: "ESCENA", es: "ESCENA" },
      overlay: false,
      tint: "light",
      sideVignette: true,
    },
  ],

  dealBanner: {
    background: "/stock-assets/images/amazing-beautiful-sunset-on-an-exotic-caribbean-be-2026-03-19-08-17-23-utc.jpg",
    eyebrow: { en: "PUBLIC ART", es: "ARTE PÚBLICO" },
    title: { en: "Music as Public Art", es: "Música como Arte Público" },
    body: {
      en: "Francisco's music is sung in churches, plazas, schools, picket lines — and everywhere people are organizing, having fun, and making a difference.",
      es: "La música de Francisco se canta en iglesias, plazas, escuelas, huelgas — y donde sea que la gente se organice, se divierta, y hace la diferencia.",
    },
    cta: { label: { en: "READ MORE", es: "LEER MÁS" }, href: "/about" },
  },

  customSection: {
    sectionEyebrow: { en: "ABOUT", es: "ACERCA" },
    sectionTitle: { en: "Cultural Worker. Songwriter. Bridge.", es: "Trabajador Cultural. Cantautor. Puente." },
    blocks: [
      {
        id: "bio",
        image: "/images/photos/francisco-portrait-guitar.webp",
        imageAlt: {
          en: "Portrait of Francisco Herrera holding his classical guitar",
          es: "Retrato de Francisco Herrera con su guitarra clásica",
        },
        reverse: false, // image left, text right
        eyebrow: { en: "BIO", es: "BIO" },
        title: { en: "Cultural Worker. Songwriter. Bridge.", es: "Trabajador Cultural. Cantautor. Puente." },
        body: {
          en: "For over four decades Francisco has carried songs across borders — between English and Spanish, between churches and union halls, between elders and children. His work is rooted in the Bay Area, harvested from across the Americas.",
          es: "Por más de cuatro décadas Francisco ha llevado cantos a través de fronteras — entre inglés y español, entre iglesias y salones sindicales, entre ancianos y niños. Su trabajo está arraigado en el Área de la Bahía, cosechado en todas las Américas.",
        },
        cta: {
          label: { en: "MORE ABOUT FRANCISCO", es: "SOBRE FRANCISCO" },
          href: "/about",
        },
      },
      {
        id: "mission",
        image: "/images/photos/francisco-singing-protest.webp",
        imageAlt: {
          en: "Francisco singing at a rally with community members holding signs",
          es: "Francisco cantando en una marcha con miembros de la comunidad sosteniendo carteles",
        },
        reverse: true, // image right, text left
        eyebrow: { en: "MISSION", es: "MISIÓN" },
        title: { en: "Songs of Liberation", es: "Cantos de Liberación" },
        body: {
          en: "The themes are constant: migration as a sacred journey, family as the first community, faith as the ground beneath movement. The songs are written to be sung — by you, with us, for each other.",
          es: "Los temas son constantes: la migración como peregrinaje sagrado, la familia como primera comunidad, la fe como tierra bajo el movimiento. Los cantos están escritos para ser cantados — por ti, con nosotros, los unos por los otros.",
        },
        cta: {
          label: { en: "EXPLORE THE MUSIC", es: "EXPLORA LA MÚSICA" },
          href: "/music",
        },
      },
    ],
  },

  productCarousel: {
    watermark: { en: "Carteles", es: "Carteles" },
    eyebrow: { en: "FROM THE ARCHIVE", es: "DEL ARCHIVO" },
    title: { en: "Concert Posters", es: "Carteles de Conciertos" },
    description: {
      en: "A wall of flyers and posters from past performances — vigils, concerts, communions, celebrations — over a decade and a half of Francisco's work.",
      es: "Un muro de carteles y volantes de presentaciones pasadas — vigilias, conciertos, comuniones, celebraciones — más de quince años del trabajo de Francisco.",
    },
    ctaLabel: { en: "VIEW", es: "VER" },
    items: [
      {
        id: "valentine-2024",
        image: "/images/Previous_events/image_83633699.png",
        imagePosition: "top-30", // shift down so "NIGHT OF" header stays in frame
        title: { en: "Valentine's Concert", es: "Concierto de San Valentín" },
        theme: { en: "Feb 2024 · Oakland", es: "Feb 2024 · Oakland" },
        href: "/shows",
      },
      {
        id: "musica-tacos-2022",
        image: "/images/Previous_events/image_69921db2.png",
        title: { en: "Música & Tacos", es: "Música & Tacos" },
        theme: { en: "Aug 2022 · Santa Rosa", es: "Ago 2022 · Santa Rosa" },
        href: "/shows",
      },
      {
        id: "somos-esenciales-2022",
        image: "/images/Previous_events/image_7805538.png",
        title: { en: "Somos Esenciales", es: "Somos Esenciales" },
        theme: { en: "Jun 2022 · Mission Food Hub, SF", es: "Jun 2022 · Mission Food Hub, SF" },
        href: "/shows",
      },
      {
        id: "mlk-beyond-vietnam-2022",
        image: "/images/Previous_events/image_66e49c63.png",
        title: { en: "MLK \"Beyond Vietnam\" Reading", es: "Lectura de MLK — \"Más Allá de Vietnam\"" },
        theme: { en: "Apr 2022 · SF City Hall", es: "Abr 2022 · City Hall de SF" },
        href: "/shows",
      },
      {
        id: "posada-2019",
        image: "/images/Previous_events/image_54aee390.png",
        title: { en: "Posada", es: "Posada" },
        theme: { en: "Dec 2019 · Eric Quezada Center, SF", es: "Dic 2019 · Eric Quezada Center, SF" },
        href: "/shows",
      },
      {
        id: "zawaya-2019",
        image: "/images/Previous_events/image_7e8d6b8e.png",
        title: { en: "Zawaya · Aswat Ensemble", es: "Zawaya · Aswat Ensemble" },
        theme: { en: "Dec 2019 · No Ban; No Wall; No Wars", es: "Dic 2019 · No al Veto; No al Muro" },
        href: "/shows",
      },
      {
        id: "many-sounds-christmas-2019",
        image: "/images/Previous_events/image_df263c5c.png",
        title: { en: "Many Sounds of Christmas", es: "Muchos Sonidos de Navidad" },
        theme: { en: "Dec 2019 · St. Columba, Oakland", es: "Dic 2019 · St. Columba, Oakland" },
        href: "/shows",
      },
      {
        id: "pena-mujer-2019",
        image: "/images/Previous_events/image_641f15ba.png",
        title: { en: "Peña Mujer", es: "Peña Mujer" },
        theme: { en: "Dec 2019 · Eric Quezada Center, SF", es: "Dic 2019 · Eric Quezada Center, SF" },
        href: "/shows",
      },
      {
        id: "five-oceans-2019",
        image: "/images/Previous_events/image_59b0e891.png",
        title: { en: "Five Oceans in a Tea Spoon", es: "Cinco Océanos en una Cucharadita" },
        theme: { en: "Oct 2019 · Hillside Club, Berkeley", es: "Oct 2019 · Hillside Club, Berkeley" },
        href: "/shows",
      },
      {
        id: "honor-migrante-corpus-2016",
        image: "/images/Previous_events/image_e05aa7d0.png",
        title: { en: "Concierto Honor Migrante", es: "Concierto Honor Migrante" },
        theme: { en: "Nov 2016 · Corpus Christi, SF", es: "Nov 2016 · Corpus Christi, SF" },
        href: "/shows",
      },
      {
        id: "atrevete-a-sonar",
        image: "/images/Previous_events/image_6804047e.png",
        title: { en: "Atrévete a Soñar", es: "Atrévete a Soñar" },
        theme: { en: "Live Performance", es: "Presentación en Vivo" },
        href: "/shows",
      },
      {
        id: "live-corpus-christi",
        image: "/images/Previous_events/image_f0cb2b2c.png",
        title: { en: "Live at Corpus Christi", es: "En Vivo en Corpus Christi" },
        theme: { en: "Past Performance", es: "Presentación Pasada" },
        href: "/shows",
      },
    ],
  },

  videoBanner: {
    poster: PIC("liveposter", 1920, 700),
    backgroundVideo: "/video/Artist=Revolution-032007.mp4",
    eyebrow: { en: "LIVE", es: "EN VIVO" },
    title: { en: "Saber Ante La Migra", es: "Saber Ante La Migra" },
    caption: { en: "Live at Posada Sin Fronteras", es: "En Vivo en Posada Sin Fronteras" },
    videoUrl: "https://player.vimeo.com/video/234974022",
  },

  gridBanner: {
    background: PIC("gridbg", 1920, 800),
    eyebrow: { en: "FEATURED RELEASES", es: "LANZAMIENTOS DESTACADOS" },
    title: { en: "Three Albums to Start With", es: "Tres Álbumes Para Comenzar" },
    cards: [
      {
        id: "honor-migrante",
        image: "/images/albums/Honor-Migrante.png",
        title: { en: "Honor Migrante", es: "Honor Migrante" },
        series: { en: "Francisco J. Herrera", es: "Francisco J. Herrera" },
        price: { en: "Download: $10.00", es: "Descarga: $10.00" },
        description: {
          en: "Life, Joys, Struggle, Triumphs, Dignity of Migrant People in Song. Enjoy it, share it with friends and family — La vida, los gozos, luchas, triunfos, Dignidad del pueblo migrante en Canción. Disfrútala, compártela con amistades y familia.",
          es: "La vida, los gozos, luchas, triunfos, Dignidad del pueblo migrante en Canción. Disfrútala, compártela con amistades y familia — Life, Joys, Struggle, Triumphs, Dignity of Migrant People in Song. Enjoy it, share it with friends and family.",
        },
        fullDescription: [
          {
            en: "With the musical genius of: Omar Sosa (piano), Mike Spiro (percussion), Camilo Landau (guitar), Miguel Govea (guitarrón), Rafael and Liliana Herrera (vocals).",
            es: "Con la participación de geni@s: Omar Sosa (piano), Mike Spiro (percusión), Camilo Landau (guitarra), Miguel Govea (guitarrón), Rafael y Liliana Herrera (voces).",
          },
          {
            en: "Producer: Greg Landau (Maldita Vecindad, Los Cojolites, Susana Baca). Mastering: John Greene (Los Tigres del Norte).",
            es: "Productor: Greg Landau (Maldita Vecindad, Los Cojolites, Susana Baca). Masterización: John Greene (Los Tigres del Norte).",
          },
        ],
        featuredTrack: {
          title: "Nuevo Sol",
          duration: "2:24",
          audioSrc: "/audio/Francisco%20Herrera%20-%20Nuevo%20Sol.mp3",
        },
        tracks: [
          { number: 1, title: "Nuevo Sol", duration: "2:24", price: "Free", infoHref: "#" },
          { number: 2, title: "Saber ante la Migra", duration: "3:33", price: "Free", infoHref: "#" },
          { number: 3, title: "Pueblo Pueblo", duration: "3:21", price: "Free", infoHref: "#" },
          { number: 4, title: "Palomita de la Ciudad", duration: "3:15", price: "$0.99", lyricsHref: "#" },
          { number: 5, title: "Yo Te Amaré", duration: "3:41", price: "$0.99", lyricsHref: "#" },
          { number: 6, title: "Pelotita Blanca", duration: "3:32", price: "$0.99" },
          { number: 7, title: "Carrito de Fruta", duration: "2:51", price: "$0.99", infoHref: "#" },
          { number: 8, title: "Mujeres de la Maquila", duration: "4:19", price: "$0.99" },
          { number: 9, title: "Trabajo en el Hotel", duration: "3:22", price: "$0.99" },
          { number: 10, title: "Amor Sin Papeles", duration: "3:46", price: "$0.99", infoHref: "#" },
          { number: 11, title: "Si La Migra Viene", duration: "3:25", price: "$0.99" },
          { number: 12, title: "Se Vende Todo", duration: "6:48", price: "$0.99" },
        ],
        cta: { label: { en: "BUY CD", es: "COMPRAR CD" }, href: "/store/honor-migrante" },
      },
      {
        id: "fuerza-de-la-raiz",
        image: "/images/albums/Fuerza-de-la-Ra%C3%ADz.png",
        title: { en: "Fuerza De la Raíz — Strength from the Roots", es: "Fuerza De la Raíz — Strength from the Roots" },
        series: { en: "Francisco J. Herrera", es: "Francisco J. Herrera" },
        price: { en: "Download: $5.00", es: "Descarga: $5.00" },
        originalPrice: { en: "$15.00", es: "$15.00" },
        description: {
          en: "FUERZA DE LA RAIZ: La fuerza que nos nutre como pueblo se manifiesta en nuestros cantos. Este álbum de canción originales y tradicionales transmite la historia esperanzadora de nuestras migraciones en ritmos latinoamericanos y estadounidenses — folclor (Adios Mi Chaparrita), blues (Wade in the Water), nueva canción latinoamericana (Casas de Cartón) y hasta electrónica (Dicen Que).",
          es: "FUERZA DE LA RAIZ: La fuerza que nos nutre como pueblo se manifiesta en nuestros cantos. Este álbum de canción originales y tradicionales transmite la historia esperanzadora de nuestras migraciones en ritmos latinoamericanos y estadounidenses — folclor (Adios Mi Chaparrita), blues (Wade in the Water), nueva canción latinoamericana (Casas de Cartón) y hasta electrónica (Dicen Que).",
        },
        fullDescription: [
          {
            en: "La voz conmovedora, guitarra sencilla y llamativa, letra inspiradora de Francisco Herrera te transportará a una tarde en lo más íntimo de tu corazón. En este estilo coqueto Francisco se mueve entre varios mundos musicales presentando un mosaico de ritmos, estilos del Chican@ Soul ;)",
            es: "La voz conmovedora, guitarra sencilla y llamativa, letra inspiradora de Francisco Herrera te transportará a una tarde en lo más íntimo de tu corazón. En este estilo coqueto Francisco se mueve entre varios mundos musicales presentando un mosaico de ritmos, estilos del Chican@ Soul ;)",
          },
          {
            en: "STRENGTH FROM THE ROOTS: The strength that we get when we nourish ourselves from our roots as working people comes through in this album of bilingual original and traditional songs from Latin America (A Desalambrar), the U.S. (Wade in the Water), and today's struggles (Atrévete) — with a touch of Hip Hop (Dicen Que) and oldies with a Chicano twist (Danny Boy).",
            es: "STRENGTH FROM THE ROOTS: La fuerza que obtenemos al nutrirnos de nuestras raíces como pueblo trabajador se manifiesta en este álbum de canciones bilingües originales y tradicionales de Latinoamérica (A Desalambrar), EE.UU. (Wade in the Water) y luchas de hoy (Atrévete) — con un toque de Hip Hop (Dicen Que) y oldies con un giro Chicano (Danny Boy).",
          },
          {
            en: "These songs speak to our migrations, dreams, struggles, and triumphs as we work and sing together — to our mothers (Madre Madre) and to our peace. Share in this experience of Chicano/a Soul. ;)",
            es: "Estos cantos hablan de nuestras migraciones, sueños, luchas y triunfos al trabajar y cantar juntos — a nuestras madres (Madre Madre) y a nuestra paz. Comparte esta experiencia de Chican@ Soul. ;)",
          },
        ],
        featuredTrack: {
          title: "Tambor",
          duration: "1:25",
          // No audio src yet — when you upload Tambor.mp3 to /public/audio/,
          // set the path here and the player wires up automatically.
        },
        tracks: [
          { number: 1, title: "Tambor", duration: "1:25", price: "Free", infoHref: "#" },
          { number: 2, title: "Adios Mi Chaparrita", duration: "1:53", price: "Free", infoHref: "#" },
          { number: 3, title: "La Tierra", duration: "4:15", price: "Free", infoHref: "#" },
          { number: 4, title: "Caminando", duration: "5:54", price: "Free", infoHref: "#" },
          { number: 5, title: "Casas de Cartón", duration: "3:42", price: "Free", infoHref: "#" },
          { number: 6, title: "Danny Boy", duration: "3:56", price: "Free", infoHref: "#" },
          { number: 7, title: "Fallaste Corazón", duration: "3:33", price: "Free", infoHref: "#" },
          { number: 8, title: "Wade in the Water", duration: "2:59", price: "Free" },
          { number: 9, title: "Madre Madre", duration: "4:23", price: "$0.55", originalPrice: "$0.99", infoHref: "#" },
          { number: 10, title: "Atrévete", duration: "3:36", price: "Free" },
          { number: 11, title: "A Desalambrar", duration: "4:42", price: "Free" },
          { number: 12, title: "Corrido de Rosalío", duration: "3:14", price: "$0.55", infoHref: "#" },
          { number: 13, title: "Dicen Que", duration: "3:16", price: "$0.55", originalPrice: "$0.99" },
          { number: 14, title: "Cuando el Pobre", duration: "2:00", price: "Free" },
          { number: 15, title: "Yo Traigo Flores", duration: "1:37", price: "$0.55", originalPrice: "$0.99" },
          { number: 16, title: "Tambor", duration: "1:24", price: "Free" },
        ],
        cta: { label: { en: "BUY CD", es: "COMPRAR CD" }, href: "/store/fuerza-de-la-raiz" },
      },
      {
        id: "francisco-y-los-ninos",
        image: "/images/albums/Francisco-y-L%40s-NI%C3%B1%40s.png",
        title: { en: "Francisco y Los Niños", es: "Francisco y Los Niños" },
        series: { en: "Francisco J. Herrera", es: "Francisco J. Herrera" },
        price: { en: "Download: Your Price", es: "Descarga: Tu Precio" },
        description: {
          en: "Recorded with children: Alma, Tayira, Liliana, Camila, Martín, Camilo, Germán. Songs to enjoy with our children and friends while learning Spanish at the same time.",
          es: "Grabado con niñas Alma, Tayira, Liliana, Camila, Martín, Camilo, Germán. Canciones para divertirnos con nuestras hijas, amigas y aprender español al mismo tiempo.",
        },
        featuredTrack: {
          title: "Abecedario (Spanish Alphabet)",
          duration: "1:50",
          // No audio src yet — drop the MP3 in /public/audio/ and set the path here.
        },
        tracks: [
          { number: 1, title: "Abecedario (Spanish Alphabet)", duration: "1:50", price: "Your price", infoHref: "#" },
          { number: 2, title: "Tamborcito", duration: "1:11", price: "Your price", infoHref: "#" },
          { number: 3, title: "Risa en Vocales (Laughing Vowels in Spanish)", duration: "0:40", price: "Your price", infoHref: "#" },
          { number: 4, title: "Cho-co-la-te", duration: "1:49", price: "Your price", infoHref: "#" },
          { number: 5, title: "Pajarito Cantas", duration: "2:18", price: "Your price", infoHref: "#" },
          { number: 6, title: "La Araña Pequeñita (The Itsy Bitsy Spider — Spanish)", duration: "0:48", price: "Your price", infoHref: "#" },
          { number: 7, title: "El Zapatito", duration: "1:07", price: "Your price", infoHref: "#" },
          { number: 8, title: "Cierre los Ojitos (Arrullo / Lullaby — Close Your Little Eyes)", duration: "2:36", price: "Your price", infoHref: "#" },
          { number: 9, title: "El Pajarito (Poesía)", duration: "0:17", price: "Free", infoHref: "#" },
          { number: 10, title: "Las Mañanitas Chicanitas (Bilingüe)", duration: "2:06", price: "Your price", infoHref: "#" },
          { number: 11, title: "Los Pollitos (DAR)", duration: "0:59", price: "Free", infoHref: "#" },
          { number: 12, title: "Juanito Baila", duration: "1:46", price: "Free" },
        ],
        cta: { label: { en: "BUY CD", es: "COMPRAR CD" }, href: "/store/francisco-y-los-ninos" },
      },
    ],
  },

  uniqueCollections: {
    watermark: { en: "Collection", es: "Colección" },
    eyebrow: { en: "OUR MUSIC", es: "NUESTRA MÚSICA" },
    title: { en: "Our Unique Collections", es: "Nuestras Colecciones Únicas" },
    description: {
      en: "Discover Francisco Herrera's extraordinary music collection, featuring carefully curated albums that showcase the evolution of guitar artistry. Each piece represents a milestone in musical expression, from intimate acoustic sessions to powerful electric performances. These collections capture the essence of Francisco's musical journey, blending traditional Spanish influences with contemporary sounds that speak to the soul.",
      es: "Descubre la extraordinaria colección musical de Francisco Herrera, con álbumes cuidadosamente seleccionados que muestran la evolución de su arte. Cada pieza representa un momento clave en la expresión musical, desde sesiones acústicas íntimas hasta poderosas interpretaciones eléctricas. Estas colecciones capturan la esencia del viaje musical de Francisco, fusionando influencias tradicionales con sonidos contemporáneos que hablan al alma.",
    },
    albums: [
      {
        id: "honor-migrante",
        image: "/images/albums/Honor-Migrante.png",
        imageAlt: { en: "Honor Migrante album", es: "Álbum Honor Migrante" },
        title: { en: "Honor Migrante", es: "Honor Migrante" },
        price: { en: "$10.00", es: "$10.00" },
        cta: { label: { en: "Add to Cart", es: "Añadir al Carrito" }, href: "/store/honor-migrante" },
      },
      {
        id: "fuerza-de-la-raiz",
        image: "/images/albums/Fuerza-de-la-Ra%C3%ADz.png",
        imageAlt: { en: "Fuerza de la Raíz album", es: "Álbum Fuerza de la Raíz" },
        title: { en: "Fuerza de la Raíz", es: "Fuerza de la Raíz" },
        price: { en: "$10.00", es: "$10.00" },
        cta: { label: { en: "Add to Cart", es: "Añadir al Carrito" }, href: "/store/fuerza-de-la-raiz" },
      },
      {
        id: "posada-sin-fronteras",
        image: "/images/albums/Posada-Sin-Fronteras.png",
        imageAlt: { en: "Posada Sin Fronteras album", es: "Álbum Posada Sin Fronteras" },
        title: { en: "Posada Sin Fronteras", es: "Posada Sin Fronteras" },
        price: { en: "$10.00", es: "$10.00" },
        cta: { label: { en: "Add to Cart", es: "Añadir al Carrito" }, href: "/store/posada-sin-fronteras" },
      },
      {
        id: "ninos-sagrado",
        image: "/images/albums/Nuestros-Ni%C3%B1os-Son-Sagrado.png",
        imageAlt: { en: "Nuestros Niños Son Sagrado album", es: "Álbum Nuestros Niños Son Sagrado" },
        title: { en: "Nuestros Niños Son Sagrado", es: "Nuestros Niños Son Sagrado" },
        price: { en: "$10.00", es: "$10.00" },
        cta: { label: { en: "Add to Cart", es: "Añadir al Carrito" }, href: "/store/ninos-sagrado" },
      },
      {
        id: "francisco-y-los-ninos",
        image: "/images/albums/Francisco-y-L%40s-NI%C3%B1%40s.png",
        imageAlt: { en: "Francisco y Los Niños album", es: "Álbum Francisco y Los Niños" },
        title: { en: "Francisco y Los Niños", es: "Francisco y Los Niños" },
        price: { en: "$10.00", es: "$10.00" },
        cta: { label: { en: "Add to Cart", es: "Añadir al Carrito" }, href: "/store/francisco-y-los-ninos" },
      },
      {
        id: "canta-y-juega",
        image: "/images/albums/Canta-y-Juega.png",
        imageAlt: { en: "Canta y Juega album", es: "Álbum Canta y Juega" },
        title: { en: "Canta y Juega", es: "Canta y Juega" },
        price: { en: "$10.00", es: "$10.00" },
        cta: { label: { en: "Add to Cart", es: "Añadir al Carrito" }, href: "/store/canta-y-juega" },
      },
    ],
  },

  gallery: {
    watermark: { en: "Gallery", es: "Galería" },
    wideImage: "/images/client-sent-images/69846564008__2864B8A4-74A6-440A-B1A2-60F232DAC2AA.jpeg",
    wideImageAlt: {
      en: "Francisco and the band recording in the studio",
      es: "Francisco y la banda grabando en el estudio",
    },
    portraitImage: "/images/client-sent-images/3.png",
    portraitImageAlt: {
      en: "Francisco playing classical guitar at an outdoor rally",
      es: "Francisco tocando guitarra clásica en una manifestación al aire libre",
    },
  },

  featuredSongs: {
    watermark: { en: "Our Music", es: "Nuestra Música" },
    eyebrow: { en: "Our Music", es: "Nuestra Música" },
    title: { en: "Featured Song Collection", es: "Colección de Canciones Destacadas" },
    songs: [
      {
        id: "fuerza-de-la-raiz",
        reverse: false, // image right, text left
        image: "/images/albums/Fuerza-de-la-Ra%C3%ADz.png",
        imageAlt: { en: "Fuerza de la Raíz album", es: "Álbum Fuerza de la Raíz" },
        title: { en: "Fuerza De la Raíz", es: "Fuerza De la Raíz" },
        meta: { en: "ALBUM: Strength from the Roots / YEAR: 2010", es: "ÁLBUM: Fuerza desde las Raíces / AÑO: 2010" },
        excerpt: {
          en: "FUERZA DE LA RAIZ: La fuerza que nos nutre como pueblo se manifiesta en nuestros cantos. Este Album de canción originales y tradicionales trasmite la historia esperanzadora de nuestras migraciones...",
          es: "FUERZA DE LA RAIZ: La fuerza que nos nutre como pueblo se manifiesta en nuestros cantos. Este Album de canción originales y tradicionales trasmite la historia esperanzadora de nuestras migraciones...",
        },
        fullStory: [
          {
            en: "FUERZA DE LA RAIZ: La fuerza que nos nutre como pueblo se manifiesta en nuestros cantos. Este Album de canción originales y tradicionales trasmite la historia esperanzadora de nuestras migraciones en ritmos latinoamericanos y Estadounidense en folclor (Adios Mi Chaparrita), blues (Wade in the Water), nueva canción latinoaericana (Casas de Cartón) y hasta electrónica (Dicen que).",
            es: "FUERZA DE LA RAIZ: La fuerza que nos nutre como pueblo se manifiesta en nuestros cantos. Este Album de canción originales y tradicionales trasmite la historia esperanzadora de nuestras migraciones en ritmos latinoamericanos y Estadounidense en folclor (Adios Mi Chaparrita), blues (Wade in the Water), nueva canción latinoaericana (Casas de Cartón) y hasta electrónica (Dicen que).",
          },
          {
            en: "STRENGTH FROM THE ROOTS: The Strength that we get when we nourish ourselves from our roots as working people comes through in this Album of Bilingual Original and Traditional songs from Latin America (A desalambrar), U.S. (Wade in the Water) and today's struggles (Atrévete) with a touch of Hip Hop (Dicen Que) and oldies with a Chicano twist (Danny Boy).",
            es: "STRENGTH FROM THE ROOTS: La Fuerza que obtenemos al nutrirnos de nuestras raíces como pueblo trabajador se manifiesta en este Album de canciones originales y tradicionales bilingües de Latinoamérica (A desalambrar), EE.UU. (Wade in the Water) y luchas de hoy (Atrévete) con un toque de Hip Hop (Dicen Que) y oldies con un giro Chicano (Danny Boy).",
          },
        ],
        details: [
          { label: { en: "Tracks", es: "Pistas" }, value: { en: "16", es: "16" } },
          { label: { en: "Length", es: "Duración" }, value: { en: "52 min", es: "52 min" } },
          { label: { en: "Released", es: "Lanzado" }, value: { en: "2010", es: "2010" } },
          { label: { en: "Language", es: "Idioma" }, value: { en: "Bilingual EN/ES", es: "Bilingüe EN/ES" } },
          { label: { en: "Style", es: "Estilo" }, value: { en: "Folk · Blues · Hip-Hop", es: "Folk · Blues · Hip-Hop" } },
          { label: { en: "Producer", es: "Productor" }, value: { en: "Greg Landau", es: "Greg Landau" } },
          { label: { en: "Recording", es: "Grabación" }, value: { en: "Studio", es: "Estudio" } },
          { label: { en: "Genre", es: "Género" }, value: { en: "Latin / Chican@ Soul", es: "Latino / Chican@ Soul" } },
        ],
        cta: { label: { en: "Listen Now", es: "Escuchar" }, href: "/music/fuerza-de-la-raiz" },
      },
      {
        id: "honor-migrante",
        reverse: true, // image left, text right
        image: "/images/albums/Honor-Migrante.png",
        imageAlt: { en: "Honor Migrante album", es: "Álbum Honor Migrante" },
        title: { en: "Honor Migrante", es: "Honor Migrante" },
        meta: { en: "ALBUM: Honor Migrante / YEAR: 2014", es: "ÁLBUM: Honor Migrante / AÑO: 2014" },
        excerpt: {
          en: "Life, Joys, Struggle, Triumphs, Dignity of Migrant People in Song. Enjoy it, share it with friends and family — La vida, los gozos, luchas, triunfos, Dignidad del pueblo migrante en Canción...",
          es: "La vida, los gozos, luchas, triunfos, Dignidad del pueblo migrante en Canción. Disfrútala, compártela con amistades y familia — Life, Joys, Struggle, Triumphs, Dignity of Migrant People in Song...",
        },
        fullStory: [
          {
            en: "Life, Joys, Struggle, Triumphs, Dignity of Migrant People in Song. Enjoy it, share it with friends and family — La vida, los gozos, luchas, triunfos, Dignidad del pueblo migrante en Canción. Disfrútala, compártela con amistades y familia.",
            es: "La vida, los gozos, luchas, triunfos, Dignidad del pueblo migrante en Canción. Disfrútala, compártela con amistades y familia — Life, Joys, Struggle, Triumphs, Dignity of Migrant People in Song. Enjoy it, share it with friends and family.",
          },
          {
            en: "With the musical genius of: Omar Sosa (piano), Mike Spiro (percussion), Camilo Landau (guitar), Miguel Govea (guitarrón), Rafael and Liliana Herrera (vocals). Producer: Greg Landau (Maldita Vecindad, Los Cojolites, Susana Baca). Mastering: John Greene (Los Tigres del Norte).",
            es: "Con la participación de geni@s: Omar Sosa (piano), Mike Spiro (percusión), Camilo Landau (guitarra), Miguel Govea (guitarrón), Rafael y Liliana Herrera (voces). Productor: Greg Landau (Maldita Vecindad, Los Cojolites, Susana Baca). Masterización: John Greene (Los Tigres del Norte).",
          },
        ],
        details: [
          { label: { en: "Tracks", es: "Pistas" }, value: { en: "12", es: "12" } },
          { label: { en: "Length", es: "Duración" }, value: { en: "42 min", es: "42 min" } },
          { label: { en: "Released", es: "Lanzado" }, value: { en: "2014", es: "2014" } },
          { label: { en: "Language", es: "Idioma" }, value: { en: "Bilingual EN/ES", es: "Bilingüe EN/ES" } },
          { label: { en: "Featured", es: "Invitados" }, value: { en: "Omar Sosa, Mike Spiro", es: "Omar Sosa, Mike Spiro" } },
          { label: { en: "Producer", es: "Productor" }, value: { en: "Greg Landau", es: "Greg Landau" } },
          { label: { en: "Mastering", es: "Masterización" }, value: { en: "John Greene", es: "John Greene" } },
          { label: { en: "Genre", es: "Género" }, value: { en: "Latin / Migrant Song", es: "Latino / Canto Migrante" } },
        ],
        cta: { label: { en: "Listen Now", es: "Escuchar" }, href: "/music/honor-migrante" },
      },
    ],
  },

  companeros: {
    watermark: { en: "Compañeros", es: "Compañeros" },
    eyebrow: { en: "PERFORMING WITH · COMPAÑER@S", es: "TOCANDO CON · COMPAÑER@S" },
    title: { en: "Compañeros", es: "Compañeros" },
    description: {
      en: "Francisco often sings and performs solo, but for big concerts he's joined by the compañer@s — fellow musicians and longtime collaborators who bring their own voices, instruments, and stories to the stage.",
      es: "Francisco a menudo canta y actúa en solitario, pero en los grandes conciertos lo acompañan l@s compañer@s — músicos y colaboradores de años que aportan sus propias voces, instrumentos e historias al escenario.",
    },
    members: [
      {
        id: "pedro",
        image: "/images/band/pedro.png",
        imageAlt: { en: "Pedro Gómez", es: "Pedro Gómez" },
        name: { en: "Pedro Gómez", es: "Pedro Gómez" },
        role: { en: "Percussions", es: "Percusiones" },
        bio: {
          en: "A trusted collaborator on stage and in the studio. Pedro Gómez is a multipercussionist, educator, band leader, and business owner in San Francisco.",
          es: "Colaborador de confianza en el escenario y el estudio. Pedro Gómez es multipercusionista, educador, líder de banda y empresario en San Francisco.",
        },
        bioLink: {
          label: { en: "Pedro Gómez", es: "Pedro Gómez" },
          href: "https://www.bayonics.com",
        },
        cta: { label: { en: "Read More", es: "Leer Más" }, href: "/companeros/pedro" },
      },
      {
        id: "dr-loco",
        image: "/images/band/dr-loco.png",
        imageAlt: { en: "Dr. Loco", es: "Dr. Loco" },
        name: { en: "Dr. Loco", es: "Dr. Loco" },
        role: {
          en: "Sax, Flute & Winds · Bandleader",
          es: "Saxofón, Flauta y Vientos · Líder de Banda",
        },
        bio: {
          en: "Bay Area legend whose Rockin' Jalapeño Band has long shared stages with Francisco — a kindred cultural worker in song.",
          es: "Leyenda del Área de la Bahía cuya Rockin' Jalapeño Band ha compartido escenarios con Francisco por años — un trabajador cultural hermano en el canto.",
        },
        cta: { label: { en: "Read More", es: "Leer Más" }, href: "/companeros/dr-loco" },
      },
      {
        id: "chris-trinidad",
        image: "/images/band/chris-trinidad.png",
        imageAlt: { en: "Chris Trinidad", es: "Chris Trinidad" },
        name: { en: "Chris Trinidad", es: "Chris Trinidad" },
        role: { en: "Bass & Keyboards", es: "Bajo y Teclados" },
        bio: {
          en: "Brings the low-end heartbeat to Francisco's bigger shows — a steady groove rooted in Bay Area Latin music traditions.",
          es: "Aporta el latido grave a los conciertos grandes de Francisco — un groove firme arraigado en las tradiciones de la música latina del Área de la Bahía.",
        },
        cta: { label: { en: "Read More", es: "Leer Más" }, href: "/companeros/chris-trinidad" },
      },
    ],
  },

  playAlong: {
    watermark: { en: "Play Along", es: "Toca Con" },
    eyebrow: { en: "PLAY ALONG", es: "TOCA CON NOSOTROS" },
    title: { en: "Pick Up Your Guitar", es: "Toma Tu Guitarra" },
    description: {
      en: "Chord diagrams and a video player to learn Francisco's songs at home, in the classroom, or with the community. Switch between guitar, ukulele, piano, or mandolin.",
      es: "Acordes y un reproductor de video para aprender los cantos de Francisco en casa, en el salón, o con la comunidad. Cambia entre guitarra, ukulele, piano o mandolina.",
    },
    songs: [
      {
        id: "canto-a-mi-padre",
        title: { en: "Canto a mi Padre", es: "Canto a mi Padre" },
        chordifyEmbedUrl: "https://chordify.net/embed/canto-a-mi-padre-honormigrante",
      },
    ],
  },

  songOfLiberation: {
    watermark: { en: "Liberación", es: "Liberación" },
    eyebrow: { en: "FEATURED", es: "DESTACADO" },
    title: { en: "Song of Liberation", es: "Canto de Liberación" },
    image: "/images/photos/Children-holding%20candles-at-vigil.webp",
    imageAlt: {
      en: "Children holding candles at a vigil",
      es: "Niñas sosteniendo velas en una vigilia",
    },
    quote: {
      en: "Francisco's music inspires.",
      es: "La música de Francisco inspira.",
    },
    quoteAttribution: {
      en: "— CAMINANDO · Francisco Herrera / Greg Landau",
      es: "— CAMINANDO · Francisco Herrera / Greg Landau",
    },
    storyEn: [
      "Whether it is singing with your children or with the community at a rally, action for social justice, picket line, or a celebration of our sheroes and heroes — the music of Francisco is music of liberation.",
      "Use it in your activities, give it as a present to a friend, buy the CDs and give them to a friend for donating to your organization to inspire their own actions of solidarity, communicating the stories and games, memories, heroism of our people in MUSIC.",
    ],
    storyEs: [
      "Sea cantar con sus hijas o con la comunidad en una marcha, piquete, carnaval o celebración de nuestras héroes y heroínas, la música de Francisco es Canto de Liberación.",
      "Úsala en tus actividades, obséquiala a una amistad, preséntala como regalo de gracias por una donación a tu organización para inspirar acciones de solidaridad, comunicando las historias, los juegos, las memorias de nuestro pueblo en Música.",
    ],
    song: {
      title: { en: "Nuevo Sol", es: "Nuevo Sol" },
      duration: "2:24",
      audioSrc: "/audio/Francisco%20Herrera%20-%20Nuevo%20Sol.mp3",
      iTunesHref: "#",
      rssHref: "#",
      downloadHref: "#",
    },
    date: { en: "March 6, 2016", es: "6 de marzo de 2016" },
  },

  saludos: {
    watermark: { en: "Voces", es: "Voces" },
    eyebrow: {
      en: "GREETINGS & COMMENTS",
      es: "SALUDOS Y COMENTARIOS",
    },
    title: { en: "Saludos", es: "Saludos" },
    description: {
      en: "Messages from the community over the years — fans, family, students, and fellow cultural workers. Drop a saludo of your own anytime.",
      es: "Mensajes de la comunidad a lo largo de los años — admiradores, familia, estudiantes y compañer@s del trabajo cultural. Deja tu saludo cuando quieras.",
    },
    entries: [
      {
        id: "mario-luna-2018",
        name: "Mario Luna",
        location: { en: "Dallas, TX", es: "Dallas, TX" },
        date: "2018-11-26",
        message:
          "Roberto Corona me prestó el casete de Lucha y Esperanza. Lo grabé a la computadora y se lo regresé, pero el volumen quedó muy bajo. ¿Dónde se puede conseguir ese album? Aparte lo quisiera regalar a unas compas que les gustó mucho.",
        reply:
          "Hola Mario — saludos. Estamos en esto de reproducir el casete en CD y descargas digitales. Te aviso cuando lo hayamos terminado. Un abrazo.",
      },
      {
        id: "delfino-2018",
        name: "Delfino",
        location: { en: "Riverside, CA", es: "Riverside, CA" },
        date: "2018-08-09",
        message:
          "How can I get Lucha y Esperanza? One of my all time favorite albums and mine broke. I can't find it anywhere!",
        reply:
          "Órale Delfino. Gotta get a copy to you. Still haven't made more copies in CD or digitally. Let's keep in contact. Hopefully in the next couple months I can get it to you and Roberto Lovato.",
      },
      {
        id: "alicia-lepe-2016",
        name: "Alicia Lepe",
        location: { en: "Covina, CA", es: "Covina, CA" },
        date: "2016-11-21",
        message: "Muy linda y llega al corazón. Me da ganas comenzar una revolución.",
      },
      {
        id: "diana-herrera-2013",
        name: "Diana Herrera",
        location: { en: "Chula Vista, CA", es: "Chula Vista, CA" },
        date: "2013-12-25",
        message:
          "Feliz Navidad, querido hermanito. Te mando un fuerte abrazo y un beso. Espero verte para Año Nuevo. Love you!",
      },
      {
        id: "roberto-corona-2013",
        name: "Roberto Corona",
        location: { en: "Dallas, TX", es: "Dallas, TX" },
        date: "2013-01-24",
        message: "Uso tus CD's como herramienta de educación. Gracias por compartir!!",
      },
      {
        id: "delgado-family-2012",
        name: "Delgado Family",
        location: { en: "Northern California", es: "Norte de California" },
        date: "2012-08-21",
        message:
          "We've listened to your song \"La Tierra\" on Radio Bilingüe, but recently we listened and watched the YouTube video too — and it's breathtaking; the song, the lyrics, your interpretation and the images on the video are a real spiritual journey. I encourage everybody to purchase this song and CD — it is a masterpiece.",
        reply:
          "Wow! I am truly honored — thank you so very much for these words and sentiment. Thank you also for telling your friends. Much respect, peace — Francisco",
      },
      {
        id: "teresa-machado-2011",
        name: "Teresa Machado",
        location: { en: "Mexicali, B.C., México", es: "Mexicali, B.C., México" },
        date: "2011-09-28",
        message:
          "Frankie, un afectuoso saludo desde Mexicali de parte de la familia Machado Herrera y tu tío Santiago.",
        reply:
          "Muchas gracias — pienso mucho y seguido en ustedes, mi familia. Ojalá pueda llegar pronto con ustedes. Le tengo unos chistes listos a mi tío Santiago.",
      },
    ],
  },

  voicemail: {
    watermark: { en: "Mensaje", es: "Mensaje" },
    eyebrow: {
      en: "VOICEMAIL",
      es: "CORREO DE VOZ",
    },
    title: {
      en: "A Message from Francisco",
      es: "Un Mensaje de Francisco",
    },
    description: {
      en: "A few words from Francisco — about the music, the journey, and the work ahead.",
      es: "Unas palabras de Francisco — sobre la música, el camino, y el trabajo por delante.",
    },
    // youtube-nocookie host is the privacy-respecting variant; same content,
    // no tracking cookies set until the user presses play.
    videoEmbedUrl: "https://www.youtube-nocookie.com/embed/0jQ9wMEDWDo",
    videoTitle: {
      en: "Voicemail from Francisco Herrera",
      es: "Correo de voz de Francisco Herrera",
    },
    // "Las Casas de Cartón" performance footage from La Fuerza de la Raíz (2009),
    // looping muted as the section background.
    loopVideoSrc: "/video/LAS-CASAS-DE-CART%C3%93N-LA_FUERZA_DE_LA_RAIZ-2009.mov",
  },

  pullQuote: {
    watermark: { en: "Paz", es: "Paz" },
    primaryQuote: {
      en: "Entre los individuos, como entre las naciones, el respeto al derecho ajeno es la paz.",
      es: "Entre los individuos, como entre las naciones, el respeto al derecho ajeno es la paz.",
    },
    secondaryQuote: {
      en: "Among individuals, as among nations, respect for the rights of others is peace.",
      es: "Among individuals, as among nations, respect for the rights of others is peace.",
    },
    attribution: { en: "Benito Juárez", es: "Benito Juárez" },
    attributionDetail: {
      en: "Former President of Mexico",
      es: "Ex Presidente de México",
    },
    image: "/images/photos/benito-juarez.webp",
    imageAlt: {
      en: "Painted portrait of Benito Juárez",
      es: "Retrato pintado de Benito Juárez",
    },
  },

  donate: {
    watermark: { en: "Caminando", es: "Caminando" },
    eyebrow: { en: "SUPPORT THE WORK", es: "APOYA EL TRABAJO" },
    title: { en: "Support Social Change Through Music", es: "Apoya el Cambio Social a Través de la Música" },
    body: {
      en: "Francisco's music has been sung in churches, plazas, schools, and picket lines for over four decades. Help us release the next album, CAMINANDO, and keep these songs traveling to the communities that need them.",
      es: "La música de Francisco se ha cantado en iglesias, plazas, escuelas y huelgas por más de cuatro décadas. Ayúdanos a lanzar el próximo álbum, CAMINANDO, y a seguir llevando estos cantos a las comunidades que los necesitan.",
    },
    campaignTag: { en: "CAMINANDO · Coming 2026", es: "CAMINANDO · Próximamente 2026" },
    presetAmounts: [10, 25, 50, 100],
    primaryCta: { label: { en: "Donate Now", es: "Donar" }, href: "/donate" },
    secondaryCta: { label: { en: "Other Ways to Support", es: "Otras Maneras de Apoyar" }, href: "/donate#other" },
  },

  featuredBlog: {
    background: PIC("blogbg", 1920, 800),
    eyebrow: { en: "BLOG", es: "BLOG" },
    title: { en: "On the Road", es: "En Camino" },
    // The 4 cards mirror real posts now living at /blog/[slug] — sourced
    // from franciscoherreramusic.com (see lib/content/blog.ts for the full
    // archive). Card design preserved per user request; only the data was
    // pointed at real articles.
    posts: [
      {
        id: "song-of-liberation",
        image: "/images/photos/francisco-singing-protest.webp",
        date: { en: "March 6, 2016", es: "6 de marzo de 2016" },
        title: { en: "Song of Liberation", es: "Canto de Liberación" },
        excerpt: {
          en: "Whether singing with your children or as community at a rally — the music of Francisco is music of liberation.",
          es: "Sea cantando con tus hijos o como comunidad en una marcha — la música de Francisco es Canto de Liberación.",
        },
        href: "/blog/song-of-liberation",
      },
      {
        id: "dealing-with-artificial-intelligence",
        image: "/images/photos/francisco-portrait-guitar.webp",
        date: { en: "January 4, 2024", es: "4 de enero de 2024" },
        title: { en: "Dealing with Artificial Intelligence", es: "Lidiando con la Inteligencia Artificial" },
        excerpt: {
          en: "AI is a plantation — but what if we filled these systems with humanism, sharing, and non-violence instead?",
          es: "La IA es una plantación — ¿qué tal si llenamos estos sistemas con humanismo, compartir y no-violencia?",
        },
        href: "/blog/dealing-with-artificial-intelligence",
      },
      {
        id: "thanks-giving-and-retribution",
        image: "/images/photos/francisco-city-hall-rally.webp",
        date: { en: "November 22, 2018", es: "22 de noviembre de 2018" },
        title: { en: "Thanks-Giving and Retribution", es: "Acción de Gracias y Retribución" },
        excerpt: {
          en: "If the original peoples helped the newcomer survive, it is only fitting that the newcomer give thanks: re-tribute.",
          es: "Si los pueblos originarios ayudaron al recién llegado a sobrevivir, lo justo es que el recién llegado dé gracias: re-tribuya.",
        },
        href: "/blog/thanks-giving-and-retribution",
      },
      {
        id: "why-honor-migrante",
        image: "/images/albums/Honor-Migrante.png",
        date: { en: "May 15, 2010", es: "15 de mayo de 2010" },
        title: { en: "Why HONOR MIGRANTE — ¿Por qué?", es: "Por qué HONOR MIGRANTE" },
        excerpt: {
          en: "“The migrant honors the land where she or he steps.” Notes on the album as a tribute to migrant contributions.",
          es: "“La o el migrante honra la tierra que pisa.” Notas sobre el álbum como homenaje al aporte migrante.",
        },
        href: "/blog/why-honor-migrante",
      },
    ],
  },
};
