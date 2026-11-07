import type { Localized } from "@/lib/i18n";

export type Money = { amount: number; currency: "USD" };

export type TrackPrice =
  | { kind: "free" }
  | { kind: "your-price" }
  | { kind: "fixed"; amount: number; salePrice?: number };

export type Track = {
  index: number;
  title: string;
  duration: string; // mm:ss
  price: TrackPrice;
  hasInfo?: boolean;
  hasLyrics?: boolean;
};

export type AlbumPricing = {
  model: "fixed" | "your-price";
  physical?: Money;
  download?: Money;
};

export type FeaturedRelease = {
  id: string;
  slug: string;
  image: string;
  imageAlt: Localized;
  title: Localized;
  artist: Localized;
  meta: Localized;
  excerpt: Localized;
  fullStory: Localized[];
  details: { label: Localized; value: Localized }[];
  cta: { label: Localized; href: string };
  pricing: AlbumPricing;
  featuredTrackIndex?: number;
  tracks?: Track[];
};

export type StoreProduct = {
  id: string;
  slug: string;
  image: string;
  imageAlt: Localized;
  title: Localized;
  description: Localized;
  price: Money;
  salePrice?: Money;
  outOfStock?: boolean;
};

export type StoreContent = {
  hero: {
    eyebrow: Localized;
    title: Localized;
    description: Localized;
  };
  featured: {
    eyebrow: Localized;
    title: Localized;
    releases: FeaturedRelease[];
  };
  catalog: {
    eyebrow: Localized;
    title: Localized;
    items: StoreProduct[];
    addToCart: Localized;
    outOfStock: Localized;
    sale: Localized;
    share: Localized;
  };
};

export const storeContent: StoreContent = {
  hero: {
    eyebrow: { en: "TIENDA / STORE", es: "TIENDA / STORE" },
    title: { en: "Music for the Journey", es: "Música para el Camino" },
    description: {
      en: "Albums and downloads spanning over a decade of Francisco's recorded work — songs of migration, faith, family, and the children who carry the future.",
      es: "Álbumes y descargas que abarcan más de una década del trabajo grabado de Francisco — canciones de migración, fe, familia, y los niños que cargan el futuro.",
    },
  },

  featured: {
    eyebrow: {
      en: "FEATURED RELEASES",
      es: "LANZAMIENTOS DESTACADOS",
    },
    title: { en: "Three Albums to Start With", es: "Tres Álbumes para Empezar" },
    releases: [
      {
        id: "honor-migrante",
        slug: "honor-migrante",
        image: "/images/albums/Honor-Migrante.png",
        imageAlt: {
          en: "Honor Migrante album cover",
          es: "Portada del álbum Honor Migrante",
        },
        title: { en: "Honor Migrante", es: "Honor Migrante" },
        artist: { en: "Francisco J. Herrera", es: "Francisco J. Herrera" },
        meta: {
          en: "Folk · Migrant Honor · Includes Saber ante la Migra",
          es: "Folk · Honor Migrante · Incluye Saber ante la Migra",
        },
        excerpt: {
          en: "Life, joys, struggle, triumphs, dignity of migrant people in song. Enjoy it, share it with friends and family.",
          es: "La vida, los gozos, luchas, triunfos, dignidad del pueblo migrante en canción. Disfrútala, compártela con amistades y familia.",
        },
        fullStory: [
          {
            en: "Includes a download of \"Saber ante la Migra,\" the song that walks you through your rights when ICE knocks. The album opens with the contributions of migrant people — la vida y contribución de la comunidad Migrante — and asks you to enjoy them: Disfrútalos. Enjoy it.",
            es: "Incluye una descarga de \"Saber ante la Migra,\" la canción que te acompaña ante la migra. El álbum abre con las contribuciones de la comunidad migrante — la vida y contribución de la comunidad Migrante — y te pide gozarlas: Disfrútalos.",
          },
          {
            en: "With participation from giants of the music — con la participación de genios de la música — collaborators who lent voice and string to a record about dignity, paperwork, and the long walk home.",
            es: "Con la participación de genios de la música — colaboradores que prestaron voz y cuerda a un disco sobre la dignidad, los papeles, y el largo camino a casa.",
          },
        ],
        details: [
          { label: { en: "Genre", es: "Género" }, value: { en: "Folk / Canción", es: "Folk / Canción" } },
          { label: { en: "Format", es: "Formato" }, value: { en: "CD + digital download", es: "CD + descarga digital" } },
          { label: { en: "Bonus", es: "Extra" }, value: { en: "Saber ante la Migra", es: "Saber ante la Migra" } },
          { label: { en: "Tracks", es: "Pistas" }, value: { en: "12", es: "12" } },
        ],
        cta: { label: { en: "VIEW ALBUM & TRACKLIST", es: "VER ÁLBUM Y CANCIONES" }, href: "/store/honor-migrante" },
        pricing: { model: "fixed", download: { amount: 10, currency: "USD" } },
        featuredTrackIndex: 1,
        tracks: [
          { index: 1, title: "Nuevo Sol", duration: "2:24", price: { kind: "free" }, hasInfo: true },
          { index: 2, title: "Saber ante la Migra", duration: "3:33", price: { kind: "free" }, hasInfo: true },
          { index: 3, title: "Pueblo Pueblo", duration: "3:21", price: { kind: "free" }, hasInfo: true },
          { index: 4, title: "Palomita de la Ciudad", duration: "3:15", price: { kind: "fixed", amount: 0.99 }, hasLyrics: true },
          { index: 5, title: "Yo Te Amaré", duration: "3:41", price: { kind: "fixed", amount: 0.99 }, hasLyrics: true },
          { index: 6, title: "Pelotita Blanca", duration: "3:32", price: { kind: "fixed", amount: 0.99 } },
          { index: 7, title: "Carrito de Fruta", duration: "2:51", price: { kind: "fixed", amount: 0.99 }, hasInfo: true },
          { index: 8, title: "Mujeres de la Maquila", duration: "4:19", price: { kind: "fixed", amount: 0.99 } },
          { index: 9, title: "Trabajo en el Hotel", duration: "3:22", price: { kind: "fixed", amount: 0.99 } },
          { index: 10, title: "Amor Sin Papeles", duration: "3:46", price: { kind: "fixed", amount: 0.99 }, hasInfo: true },
          { index: 11, title: "Si La Migra Viene", duration: "3:25", price: { kind: "fixed", amount: 0.99 } },
          { index: 12, title: "Se Vende Todo", duration: "6:48", price: { kind: "fixed", amount: 0.99 } },
        ],
      },
      {
        id: "fuerza-de-la-raiz",
        slug: "fuerza-de-la-raiz",
        image: "/images/albums/Fuerza-de-la-Raíz.png",
        imageAlt: {
          en: "Fuerza de la Raíz album cover",
          es: "Portada del álbum Fuerza de la Raíz",
        },
        title: {
          en: "Fuerza de la Raíz — Strength from the Roots",
          es: "Fuerza de la Raíz — Strength from the Roots",
        },
        artist: { en: "Francisco J. Herrera", es: "Francisco J. Herrera" },
        meta: {
          en: "Folk · Voice + Guitar · Original and traditional",
          es: "Folk · Voz + Guitarra · Originales y tradicionales",
        },
        excerpt: {
          en: "The strength that nourishes us as a people shows in our songs — original and traditional, this album carries the hopeful story of our migrations through Latin American and U.S. rhythms.",
          es: "La fuerza que nos nutre como pueblo se manifiesta en nuestros cantos — originales y tradicionales, este álbum transmite la historia esperanzadora de nuestras migraciones en ritmos latinoamericanos y estadounidenses.",
        },
        fullStory: [
          {
            en: "FUERZA DE LA RAÍZ: La fuerza que nos nutre como pueblo se manifiesta en nuestros cantos. The strength that nourishes us as a people shows up in our songs.",
            es: "FUERZA DE LA RAÍZ: La fuerza que nos nutre como pueblo se manifiesta en nuestros cantos.",
          },
          {
            en: "An album of original and traditional songs that carries the hopeful story of our migrations through Latin American and U.S. rhythms — folclor (Adios Mi Chaparrita), blues (Wade in the Water), nueva canción latinoamericana (Casas de Cartón), and even electrónica (Dicen Que).",
            es: "Un álbum de canción originales y tradicionales que transmite la historia esperanzadora de nuestras migraciones en ritmos latinoamericanos y estadounidenses — folclor (Adios Mi Chaparrita), blues (Wade in the Water), nueva canción latinoamericana (Casas de Cartón) y hasta electrónica (Dicen Que).",
          },
        ],
        details: [
          { label: { en: "Genre", es: "Género" }, value: { en: "Folk · blues · nueva canción", es: "Folk · blues · nueva canción" } },
          { label: { en: "Instrumentation", es: "Instrumentación" }, value: { en: "Voice + guitar", es: "Voz + guitarra" } },
          { label: { en: "Tracks", es: "Pistas" }, value: { en: "16", es: "16" } },
          { label: { en: "Price", es: "Precio" }, value: { en: "$15 CD · $5 download", es: "$15 CD · $5 descarga" } },
        ],
        cta: { label: { en: "VIEW ALBUM & TRACKLIST", es: "VER ÁLBUM Y CANCIONES" }, href: "/store/fuerza-de-la-raiz" },
        pricing: {
          model: "fixed",
          physical: { amount: 15, currency: "USD" },
          download: { amount: 5, currency: "USD" },
        },
        featuredTrackIndex: 1,
        tracks: [
          { index: 1, title: "Tambor", duration: "1:25", price: { kind: "free" }, hasInfo: true },
          { index: 2, title: "Adios Mi Chaparrita", duration: "1:53", price: { kind: "free" }, hasInfo: true },
          { index: 3, title: "La Tierra", duration: "4:15", price: { kind: "free" }, hasInfo: true },
          { index: 4, title: "Caminando", duration: "5:54", price: { kind: "free" }, hasInfo: true },
          { index: 5, title: "Casas de Cartón", duration: "3:42", price: { kind: "free" }, hasInfo: true },
          { index: 6, title: "Danny Boy", duration: "3:56", price: { kind: "free" }, hasInfo: true },
          { index: 7, title: "Fallaste Corazón", duration: "3:33", price: { kind: "free" }, hasInfo: true },
          { index: 8, title: "Wade in the Water", duration: "2:59", price: { kind: "free" } },
          { index: 9, title: "Madre Madre", duration: "4:23", price: { kind: "fixed", amount: 0.99, salePrice: 0.55 }, hasInfo: true },
          { index: 10, title: "Atrévete", duration: "3:36", price: { kind: "free" } },
          { index: 11, title: "A Desalambrar", duration: "4:42", price: { kind: "free" } },
          { index: 12, title: "Corrido de Rosalío", duration: "3:14", price: { kind: "fixed", amount: 0.55 }, hasInfo: true },
          { index: 13, title: "Dicen Que", duration: "3:16", price: { kind: "fixed", amount: 0.99, salePrice: 0.55 } },
          { index: 14, title: "Cuando el Pobre", duration: "2:00", price: { kind: "free" } },
          { index: 15, title: "Yo Traigo Flores", duration: "1:37", price: { kind: "fixed", amount: 0.99, salePrice: 0.55 } },
          { index: 16, title: "Tambor", duration: "1:24", price: { kind: "free" } },
        ],
      },
      {
        id: "francisco-y-los-ninos",
        slug: "francisco-y-los-ninos",
        image: "/images/albums/Francisco-y-L@s-NIñ@s.png",
        imageAlt: {
          en: "Francisco y Los Niños album cover",
          es: "Portada del álbum Francisco y Los Niños",
        },
        title: {
          en: "Francisco y Los Niños",
          es: "Francisco y Los Niños",
        },
        artist: { en: "Francisco J. Herrera", es: "Francisco J. Herrera" },
        meta: {
          en: "Children's · Bilingual · For families and classrooms",
          es: "Infantil · Bilingüe · Para familias y aulas",
        },
        excerpt: {
          en: "Recorded with the children Alma, Tayira, Liliana, Camila, Martín, Camilo and Germán — songs to enjoy with our daughters and friends while learning Spanish at the same time.",
          es: "Grabado con las niñas Alma, Tayira, Liliana, Camila, Martín, Camilo y Germán — canciones para divertirnos con nuestras hijas, amigas y aprender español al mismo tiempo.",
        },
        fullStory: [
          {
            en: "Grabado con niñas Alma, Tayira, Liliana, Camila, Martín, Camilo, Germán. Recorded with children: Alma, Tayira, Liliana, Camila, Martín, Camilo, Germán.",
            es: "Grabado con niñas Alma, Tayira, Liliana, Camila, Martín, Camilo, Germán.",
          },
          {
            en: "Songs to enjoy with our children and friends while learning Spanish at the same time. Canciones para divertirnos con nuestras hijas, amigas y aprender español al mismo tiempo.",
            es: "Canciones para divertirnos con nuestras hijas, amigas y aprender español al mismo tiempo.",
          },
        ],
        details: [
          { label: { en: "Genre", es: "Género" }, value: { en: "Children's / Bilingual", es: "Infantil / Bilingüe" } },
          { label: { en: "Audience", es: "Audiencia" }, value: { en: "Families + educators", es: "Familias + docentes" } },
          { label: { en: "Use", es: "Uso" }, value: { en: "Home + classroom", es: "Casa + aula" } },
          { label: { en: "Pricing", es: "Precio" }, value: { en: "Pay your price", es: "Tú pones el precio" } },
        ],
        cta: { label: { en: "VIEW ALBUM & TRACKLIST", es: "VER ÁLBUM Y CANCIONES" }, href: "/store/francisco-y-los-ninos" },
        pricing: { model: "your-price" },
        featuredTrackIndex: 1,
        tracks: [
          { index: 1, title: "Abecedario (Spanish Alphabet)", duration: "1:50", price: { kind: "your-price" }, hasInfo: true },
          { index: 2, title: "Tamborcito", duration: "1:11", price: { kind: "your-price" }, hasInfo: true },
          { index: 3, title: "Risa en Vocales (Laughing Vowels in Spanish)", duration: "0:40", price: { kind: "your-price" }, hasInfo: true },
          { index: 4, title: "Cho-co-la-te", duration: "1:49", price: { kind: "your-price" }, hasInfo: true },
          { index: 5, title: "Pajarito Cantas", duration: "2:18", price: { kind: "your-price" }, hasInfo: true },
          { index: 6, title: "La Araña Pequeñita (The Itsy Bitsy Spider — Spanish)", duration: "0:48", price: { kind: "your-price" }, hasInfo: true },
          { index: 7, title: "El Zapatito", duration: "1:07", price: { kind: "your-price" }, hasInfo: true },
          { index: 8, title: "Cierre los Ojitos (Arrullo / Lullaby — Close Your Little Eyes)", duration: "2:36", price: { kind: "your-price" }, hasInfo: true },
          { index: 9, title: "El Pajarito (Poesía)", duration: "0:17", price: { kind: "free" }, hasInfo: true },
          { index: 10, title: "Las Mañanitas Chicanitas (Bilingüe)", duration: "2:06", price: { kind: "your-price" }, hasInfo: true },
          { index: 11, title: "Los Pollitos (DAR)", duration: "0:59", price: { kind: "free" } },
          { index: 12, title: "Juanito Baila", duration: "1:46", price: { kind: "free" } },
        ],
      },
      {
        id: "nuestros-ninos-son-sagrado",
        slug: "nuestros-ninos-son-sagrado",
        image: "/images/albums/Nuestros-Niños-Son-Sagrado.png",
        imageAlt: {
          en: "Nuestros Niños Son Sagrado cover",
          es: "Portada Nuestros Niños Son Sagrado",
        },
        title: {
          en: "Nuestros Niños Son Sagrado — Our Children Are Sacred",
          es: "Nuestros Niños Son Sagrado — Our Children Are Sacred",
        },
        artist: { en: "Francisco J. Herrera", es: "Francisco J. Herrera" },
        meta: {
          en: "Single · Sanctuary · DACA, Dreamers, TPS",
          es: "Sencillo · Santuario · DACA, Dreamers, TPS",
        },
        excerpt: {
          en: "Song born in defense of children crossing the border — DACA and Dreamers, TPS families, and a call for sanctuary for the millions forced north by violent policy.",
          es: "Canción nacida en la defensa de los niños que cruzan la frontera — DACA y Dreamers, familias TPS, y un llamado al santuario para los millones forzados a venir por políticas violentas.",
        },
        fullStory: [
          {
            en: "Song born in the defense of children crossing the border, DACA and Dreamers, TPS families, and a call for Sanctuary and support for millions who have been forced to come to the U.S. because of our violent policies.",
            es: "Una canción nacida en la lucha por defender a jóvenes cruzando la frontera, estudiantes de DACA, Soñadores, familias del TPS y tantas víctimas de nuestra violencia que ahora vienen a enriquecer este país. Démosles santuario y un amparo.",
          },
          {
            en: "These children are our future and our present chance to end militarism and welcome the victims of our violence.",
            es: "Estos niños son nuestro futuro y la oportunidad presente de terminar con el militarismo y dar la bienvenida a las víctimas de nuestra violencia.",
          },
        ],
        details: [
          { label: { en: "Format", es: "Formato" }, value: { en: "Single download", es: "Descarga sencilla" } },
          { label: { en: "Theme", es: "Tema" }, value: { en: "Sanctuary · DACA · TPS", es: "Santuario · DACA · TPS" } },
          { label: { en: "Audience", es: "Audiencia" }, value: { en: "Advocates + educators", es: "Defensores + docentes" } },
          { label: { en: "Price", es: "Precio" }, value: { en: "$0.99 download", es: "$0.99 descarga" } },
        ],
        cta: { label: { en: "VIEW SINGLE / VER SENCILLO", es: "VER SENCILLO" }, href: "/store/nuestros-ninos-son-sagrado" },
        pricing: { model: "fixed", download: { amount: 0.99, currency: "USD" } },
      },
      {
        id: "canta-y-juega-precio-reducido",
        slug: "canta-y-juega-precio-reducido",
        image: "/images/albums/Canta-y-Juega-Precio-Reducido.png",
        imageAlt: {
          en: "Canta y Juega — Reduced Price cover",
          es: "Portada Canta y Juega — Precio Reducido",
        },
        title: {
          en: "Canta y Juega — Precio Reducido / Reduced Price",
          es: "Canta y Juega — Precio Reducido / Reduced Price",
        },
        artist: { en: "Francisco J. Herrera", es: "Francisco J. Herrera" },
        meta: {
          en: "Children's · Bilingual · Includes Cierre los Ojitos",
          es: "Infantil · Bilingüe · Incluye Cierre los Ojitos",
        },
        excerpt: {
          en: "A children's record to enjoy with your kids, nieces, nephews, students, and grandkids — strengthening Spanish, motor skills, and the bond between children and adults. Includes a download of Cierre los Ojitos (lullaby).",
          es: "Un disco infantil para gozar con tus hij@s, sobrin@s, estudiantes y niet@s — fortaleciendo el español, el motor grueso y fino, y la relación entre chic@s y adult@s. Incluye una descarga de Cierre los Ojitos (arrullo).",
        },
        fullStory: [
          {
            en: "Includes a download of \"Cierre los Ojitos\" — arrullo / lullaby — \"Close your little eyes.\" A bedtime gift inside a record made for daylight play.",
            es: "Incluye una descarga de \"Cierre los Ojitos\" — arrullo — la canción que acompaña a los pequeños hacia el sueño. Un regalo nocturno dentro de un disco hecho para el juego del día.",
          },
          {
            en: "Canta y Juega is a record of children's music to enjoy with your children, nieces, nephews, students, and grandchildren — strengthening Spanish-language skills, gross and fine motor coordination, celebrating nature and the human body, and the relationship between children and adults.",
            es: "Canta y Juega es un disco para gozar con tus hij@s, sobrin@s, estudiantes, nietas y nietos. Al mismo tiempo fortalecerás el español, el uso del motor grueso y fino, celebrando la naturaleza, el cuerpo y la relación entre chic@s y adult@s.",
          },
        ],
        details: [
          { label: { en: "Genre", es: "Género" }, value: { en: "Children's / Bilingual", es: "Infantil / Bilingüe" } },
          { label: { en: "Format", es: "Formato" }, value: { en: "CD + bonus download", es: "CD + descarga extra" } },
          { label: { en: "Bonus", es: "Extra" }, value: { en: "Cierre los Ojitos (arrullo)", es: "Cierre los Ojitos (arrullo)" } },
          { label: { en: "Price", es: "Precio" }, value: { en: "$10 reduced", es: "$10 precio reducido" } },
        ],
        cta: { label: { en: "VIEW ALBUM / VER ÁLBUM", es: "VER ÁLBUM" }, href: "/store/canta-y-juega-precio-reducido" },
        pricing: { model: "fixed", physical: { amount: 10, currency: "USD" } },
      },
      {
        id: "canta-y-juega",
        slug: "canta-y-juega",
        image: "/images/albums/Canta-y-Juega.png",
        imageAlt: { en: "Canta y Juega cover", es: "Portada Canta y Juega" },
        title: { en: "Canta y Juega", es: "Canta y Juega" },
        artist: { en: "Francisco J. Herrera", es: "Francisco J. Herrera" },
        meta: {
          en: "Children's · Bilingual · Learn Spanish by playing",
          es: "Infantil · Bilingüe · Aprender español jugando",
        },
        excerpt: {
          en: "The best children's music to learn Spanish the best way: by playing! Nourish your bond as parent, aunt, uncle, grandparent, or teacher with songs made to delight.",
          es: "¡La mejor música infantil para aprender español de la mejor manera: jugando! Nutre tu relación de mamá, papá, tía/tío, abuela/o o maestra/o gozando de temas divertidos.",
        },
        fullStory: [
          {
            en: "La Mejor Música Infantil para aprender español de la mejor manera: ¡¡¡JUGANDO!!! Nourish your bond as parent, aunt, uncle, grandparent, or teacher — the best children's music to learn Spanish through play.",
            es: "La Mejor Música Infantil para aprender español de la mejor manera: ¡¡¡JUGANDO!!! Nutre tu relación de mamá, papá, tía/tío, abuela/o, maestra/o gozando de temas divertidos.",
          },
          {
            en: "Built for living rooms and classrooms — songs that move bodies and grow vocabulary at the same time, the way every children's record should.",
            es: "Hecho para la sala de tu casa y para el aula — canciones que mueven el cuerpo y hacen crecer el vocabulario al mismo tiempo, como todo disco infantil debería hacer.",
          },
        ],
        details: [
          { label: { en: "Genre", es: "Género" }, value: { en: "Children's / Bilingual", es: "Infantil / Bilingüe" } },
          { label: { en: "Use", es: "Uso" }, value: { en: "Home + classroom", es: "Casa + aula" } },
          { label: { en: "Audience", es: "Audiencia" }, value: { en: "Families + educators", es: "Familias + docentes" } },
          { label: { en: "Price", es: "Precio" }, value: { en: "$10 CD", es: "$10 CD" } },
        ],
        cta: { label: { en: "VIEW ALBUM / VER ÁLBUM", es: "VER ÁLBUM" }, href: "/store/canta-y-juega" },
        pricing: { model: "fixed", physical: { amount: 10, currency: "USD" } },
      },
      {
        id: "posada-sin-fronteras",
        slug: "posada-sin-fronteras",
        image: "/images/albums/Posada-Sin-Fronteras.png",
        imageAlt: {
          en: "Posada Sin Fronteras cover",
          es: "Portada Posada Sin Fronteras",
        },
        title: {
          en: "Posada Sin Fronteras — Nativity without Borders",
          es: "Posada Sin Fronteras — Nativity without Borders",
        },
        artist: {
          en: "Rosa Martha Zárate & Francisco J. Herrera",
          es: "Rosa Martha Zárate y Francisco J. Herrera",
        },
        meta: {
          en: "Christmas · Duet · Original + traditional",
          es: "Navidad · Dueto · Originales + tradicionales",
        },
        excerpt: {
          en: "The duet of Rosa Martha Zárate and Francisco Herrera — original and traditional Christmas songs telling the story of the undocumented Holy Family, struggling to save their lives, as Joseph and Mary did 2,000 years ago.",
          es: "El dueto de Rosa Martha Zárate y Francisco Herrera — canciones navideñas originales y tradicionales que narran la historia de la Sagrada Familia indocumentada, luchando por salvar su vida como lo hicieron José y María hace 2,000 años.",
        },
        fullStory: [
          {
            en: "Featuring the duet of Rosa Martha Zárate and Francisco Herrera, this collection of original and traditional Christmas songs presents the story of the undocumented Holy Family, struggling to improve their quality of life — in fact, to save their very life — as Joseph and Mary had to do with their infant Jesus 2,000 years ago.",
            es: "Presentando el dueto de Rosa Martha Zárate y Francisco Herrera, esta colección de canciones navideñas originales y tradicionales nos adentra en la historia de la Sagrada Familia \"indocumentada,\" que lucha por mejorar y de hecho salvar su propia vida como lo tuvieron que hacer José y María hace 2,000 años.",
          },
          {
            en: "Presenting a wide variety of Latin American and Spanish rhythms and musical styles, Posada Sin Fronteras is a lively collection that will make you move — and help you speak with others about bringing the HUMAN element to immigration policy, while enjoying very good music.",
            es: "Exhibiendo una gran variedad de ritmos y estilos musicales latinoamericanos y españoles, Posada Sin Fronteras es una riquísima colección de música que les hará bailar — y les fortalecerá para poder hablar con l@s demás sobre la importancia de HUMANIZAR las leyes y políticas migratorias de cualquier país.",
          },
        ],
        details: [
          { label: { en: "Genre", es: "Género" }, value: { en: "Christmas / Latin American", es: "Navideña / Latinoamericana" } },
          { label: { en: "Featuring", es: "Con" }, value: { en: "Rosa Martha Zárate", es: "Rosa Martha Zárate" } },
          { label: { en: "Format", es: "Formato" }, value: { en: "CD", es: "CD" } },
          { label: { en: "Theme", es: "Tema" }, value: { en: "Holy Family without papers", es: "Sagrada Familia sin papeles" } },
        ],
        cta: { label: { en: "VIEW ALBUM / VER ÁLBUM", es: "VER ÁLBUM" }, href: "/store/posada-sin-fronteras" },
        pricing: { model: "fixed", physical: { amount: 15, currency: "USD" } },
      },
    ],
  },

  catalog: {
    eyebrow: { en: "FULL CATALOG", es: "CATÁLOGO COMPLETO" },
    title: { en: "All Albums & Downloads", es: "Todos los Álbumes y Descargas" },
    addToCart: { en: "Add to cart", es: "Agregar al carrito" },
    outOfStock: { en: "Out of stock", es: "Agotado" },
    sale: { en: "Sale", es: "Oferta" },
    share: { en: "Share", es: "Compartir" },
    items: [
      {
        id: "nuestros-ninos-son-sagrado",
        slug: "nuestros-ninos-son-sagrado",
        image: "/images/albums/Nuestros-Niños-Son-Sagrado.png",
        imageAlt: {
          en: "Nuestros Niños Son Sagrado cover",
          es: "Portada Nuestros Niños Son Sagrado",
        },
        title: {
          en: "Nuestros Niños Son Sagrado — Our Children Are Sacred",
          es: "Nuestros Niños Son Sagrado — Our Children Are Sacred",
        },
        description: {
          en: "Song born in the defense of children crossing the border — DACA and Dreamers, TPS families, and a call for sanctuary and support for the millions forced north by violent policy.",
          es: "Canción nacida en la defensa de los niños que cruzan la frontera — DACA y Dreamers, familias TPS, y un llamado al santuario y al apoyo para los millones forzados a venir por políticas violentas.",
        },
        price: { amount: 0.99, currency: "USD" },
      },
      {
        id: "honor-migrante",
        slug: "honor-migrante",
        image: "/images/albums/Honor-Migrante.png",
        imageAlt: {
          en: "Honor Migrante cover",
          es: "Portada Honor Migrante",
        },
        title: { en: "Honor Migrante", es: "Honor Migrante" },
        description: {
          en: "Includes a download of Saber ante la Migra. The life and contribution of migrant people — la vida y contribución de la comunidad Migrante. Disfrútalos. Con la participación de genios de la música.",
          es: "Incluye una descarga de Saber ante la Migra. La vida y contribución de la comunidad migrante. Disfrútalos. Con la participación de genios de la música.",
        },
        price: { amount: 15, currency: "USD" },
        salePrice: { amount: 10, currency: "USD" },
        outOfStock: false,
      },
      {
        id: "canta-y-juega-precio-reducido",
        slug: "canta-y-juega-precio-reducido",
        image: "/images/albums/Canta-y-Juega-Precio-Reducido.png",
        imageAlt: {
          en: "Canta y Juega — Reduced Price cover",
          es: "Portada Canta y Juega — Precio Reducido",
        },
        title: {
          en: "Canta y Juega — Precio Reducido / Reduced Price",
          es: "Canta y Juega — Precio Reducido / Reduced Price",
        },
        description: {
          en: "Includes a download of Cierre los Ojitos (arrullo / lullaby). A record to enjoy with your kids, nieces, nephews, students, grandkids — strengthening Spanish, gross and fine motor skills, the body, and our relationship with nature.",
          es: "Incluye una descarga de Cierre los Ojitos (arrullo). Un disco para gozar con tus hij@s, sobrin@s, estudiantes, niet@s — fortaleciendo el español, el motor grueso y fino, el cuerpo y la relación con la naturaleza.",
        },
        price: { amount: 10, currency: "USD" },
      },
      {
        id: "canta-y-juega",
        slug: "canta-y-juega",
        image: "/images/albums/Canta-y-Juega.png",
        imageAlt: { en: "Canta y Juega cover", es: "Portada Canta y Juega" },
        title: { en: "Canta y Juega", es: "Canta y Juega" },
        description: {
          en: "La mejor música infantil para aprender español de la mejor manera: ¡jugando! Nourish your bond as parent, aunt, uncle, grandparent, or teacher — the best children's music to learn Spanish by play.",
          es: "La mejor música infantil para aprender español de la mejor manera: ¡jugando! Nutre tu relación de mamá, papá, tía/tío, abuela/o o maestra/o gozando de temas divertidos.",
        },
        price: { amount: 10, currency: "USD" },
      },
      {
        id: "fuerza-de-la-raiz",
        slug: "fuerza-de-la-raiz",
        image: "/images/albums/Fuerza-de-la-Raíz.png",
        imageAlt: {
          en: "Fuerza de la Raíz cover",
          es: "Portada Fuerza de la Raíz",
        },
        title: {
          en: "Fuerza de la Raíz — Strength from the Roots",
          es: "Fuerza de la Raíz — Strength from the Roots",
        },
        description: {
          en: "The voice and guitar of Francisco Herrera in folk styles, interpreting original and traditional songs that bring life to the journey of migrant people — connecting roots to road.",
          es: "La voz y guitarra de Francisco Herrera en estilos folk, interpretando canciones originales y tradicionales que dan vida al camino de la comunidad migrante — conectando raíz y camino.",
        },
        price: { amount: 15, currency: "USD" },
        salePrice: { amount: 10, currency: "USD" },
      },
      {
        id: "posada-sin-fronteras",
        slug: "posada-sin-fronteras",
        image: "/images/albums/Posada-Sin-Fronteras.png",
        imageAlt: {
          en: "Posada Sin Fronteras cover",
          es: "Portada Posada Sin Fronteras",
        },
        title: {
          en: "Posada Sin Fronteras — Nativity without Borders",
          es: "Posada Sin Fronteras — Nativity without Borders",
        },
        description: {
          en: "Featuring the duet of Rosa Martha Zárate and Francisco Herrera — original and traditional Christmas songs telling the story of the undocumented Holy Family, struggling to improve their quality of life.",
          es: "Con el dúo de Rosa Martha Zárate y Francisco Herrera — canciones navideñas originales y tradicionales que narran la historia de la Sagrada Familia indocumentada, luchando por mejorar su vida.",
        },
        price: { amount: 15, currency: "USD" },
        outOfStock: false,
      },
    ],
  },
};
