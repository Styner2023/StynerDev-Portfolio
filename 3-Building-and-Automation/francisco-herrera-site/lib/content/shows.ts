// Past-events archive — sourced from franciscoherreramusic.com (Bandzoogle).
// Sorted newest → oldest. The /shows page paginates this list; the
// homepage's PastHighlights section pulls a curated subset.

import type { Localized } from "@/lib/i18n";

export type PastEvent = {
  id: string;
  /** ISO date for sorting, e.g. "2025-06-21". */
  date: string;
  /** Display time string, e.g. "7:00 PM" or "" if not specified. */
  time?: string;
  title: Localized;
  /** Venue name, e.g. "Herbst Theatre". */
  venue?: string;
  /** Street + city, e.g. "401 Van Ness, San Francisco, CA". */
  address?: string;
  /** Short description, kept under ~280 chars where possible; full text on click. */
  description: Localized;
  /** Optional ticket / event page URL. */
  ticketUrl?: string;
  /** Optional "View on Google Maps" link. */
  mapsUrl?: string;
  /** Whether the event was free. */
  free?: boolean;
  /** Optional poster / hero image path. */
  image?: string;
  /** Whether to surface this in the homepage highlights reel. */
  highlight?: boolean;
};

export const pastEvents: PastEvent[] = [
  {
    id: "migration-strengthens-2025",
    date: "2025-06-21",
    time: "7:00 PM",
    title: {
      en: "Caminante Cultural Foundation Presents: Migration Strengthens the Nation",
      es: "Caminante Cultural Foundation Presenta: La Migración Fortalece la Nación",
    },
    venue: "Herbst Theatre",
    address: "401 Van Ness, San Francisco, CA 94102",
    description: {
      en: "A musical journey lifting voices and stories of migrant and working people. Francisco Herrera shares the stage with Dr. Loco, Liliana Herrera, Rafael Herrera, Ayla Dávila, Camilo Landau, Chris Trinidad, Roberto Corona, MC Pauze, Gerardo Martinez, with opener Tierra Suelta. Songs from Honor Migrante, produced by Caminante Cultural Foundation Inc. with Grammy-nominated Greg Landau.",
      es: "Un viaje musical que eleva voces e historias de personas migrantes y trabajadoras. Francisco Herrera comparte escenario con Dr. Loco, Liliana Herrera, Rafael Herrera, Ayla Dávila, Camilo Landau, Chris Trinidad, Roberto Corona, MC Pauze, Gerardo Martinez, y la banda de apertura Tierra Suelta. Canciones de Honor Migrante, producido por Caminante Cultural Foundation Inc. con Greg Landau, nominado al Grammy.",
    },
    ticketUrl: "https://www.cityboxoffice.com/orderticketsvenue.asp?p=15146",
    mapsUrl: "https://maps.google.com/?q=Herbst+Theatre+401+Van+Ness+San+Francisco",
    highlight: true,
  },
  {
    id: "valentines-2024",
    date: "2024-02-09",
    time: "7:00 PM",
    title: { en: "Valentine's Concert: Songs of Love and Justice", es: "Concierto de Amor y Amistad" },
    venue: "Alice Street Fire House",
    address: "817 Alice Street, Oakland",
    description: {
      en: "Songs of love and justice with Francisco Herrera and Meche-Ita. Donations / Donación (Sliding Scale $20+).",
      es: "Cantos de amor y justicia con Francisco Herrera y Meche-Ita. Donaciones (escala variable $20+).",
    },
    mapsUrl: "https://maps.google.com/?q=817+Alice+Street+Oakland",
  },
  {
    id: "arlene-francis-2022",
    date: "2022-08-07",
    time: "4:00 PM",
    title: { en: "An Afternoon of Diverse Music Styles", es: "Una Tarde de Estilos Musicales Diversos" },
    venue: "Arlene Francis Center",
    address: "99 6th Street, Santa Rosa",
    description: {
      en: "An afternoon of diverse music styles with Francisco Herrera, Chico Ruiz, Chad Bola, MC Pauze, Francis, DJ Smooveez.",
      es: "Una tarde de estilos musicales diversos con Francisco Herrera, Chico Ruiz, Chad Bola, MC Pauze, Francis, DJ Smooveez.",
    },
    mapsUrl: "https://maps.google.com/?q=Arlene+Francis+Center+Santa+Rosa",
  },
  {
    id: "noches-bohemias-2022",
    date: "2022-08-06",
    time: "6:00 PM",
    title: { en: "Noches Bohemias with Vicky Melchor and Francisco Herrera", es: "Noches Bohemias con Vicky Melchor y Francisco Herrera" },
    venue: "San Francisco, CA",
    description: {
      en: "A night of romantic music and friendship — fundraising for the Mi Granjita con Amor project.",
      es: "Noche de música romántica y amistad — recaudando fondos para el proyecto Mi Granjita con Amor.",
    },
  },
  {
    id: "somos-esenciales-2022",
    date: "2022-06-18",
    time: "5:30 PM",
    title: { en: "SOMOS ESENCIALES / WE ARE ESSENTIAL", es: "SOMOS ESENCIALES / WE ARE ESSENTIAL" },
    venue: "MLVS – Latino Task Force Food Hub",
    address: "701 Alabama St., San Francisco",
    description: {
      en: "Francisco Herrera and the COVID Survivors celebrating Latinx labor and essential workers. Free bilingual community art performances with Paul S. Flores, Greg Landau, Arturo Carrillo, and Ayla Dávila.",
      es: "Francisco Herrera y los COVID Survivors celebrando el trabajo Latin@ y trabajadorxs esenciales. Presentaciones artísticas comunitarias bilingües al aire libre con Paul S. Flores, Greg Landau, Arturo Carrillo y Ayla Dávila.",
    },
    free: true,
    mapsUrl: "https://maps.google.com/?q=701+Alabama+St+San+Francisco",
    highlight: true,
  },
  {
    id: "mlk-beyond-vietnam-2022",
    date: "2022-04-04",
    time: "5:30 PM",
    title: {
      en: "Public Reading of Dr. Martin Luther King's \"Beyond Vietnam\" Speech",
      es: "Lectura Pública del Discurso \"Más Allá de Vietnam\" del Dr. Martin Luther King",
    },
    venue: "Steps of City Hall",
    address: "1 Dr Carlton B Goodlett Pl., San Francisco",
    description: {
      en: "Statewide public anniversary readings of MLK's \"Beyond Vietnam: A Time to Break Silence,\" denouncing the triple evils of racism, materialism, and militarism. Music by Francisco Herrera.",
      es: "Lecturas públicas estatales aniversario del discurso \"Más Allá de Vietnam: Tiempo de Romper el Silencio\" del Dr. King, denunciando los tres males: racismo, materialismo y militarismo. Música por Francisco Herrera.",
    },
    mapsUrl: "https://maps.google.com/?q=San+Francisco+City+Hall",
    highlight: true,
  },
  {
    id: "balboa-cafe-2022",
    date: "2022-01-04",
    time: "7:00 PM",
    title: { en: "New Year at Balboa Café", es: "Año Nuevo en Balboa Café" },
    venue: "Balboa Café",
    address: "3199 Filmore Street, San Francisco",
    description: {
      en: "Welcome the new year with an eclectic set of soulful ranchera (Mexican blues), Latin American and U.S. jazzy folk classics and originals from the neighborhood.",
      es: "Abre el año con una diversa serie de canciones latinoamericanas, con sentimiento y pasión.",
    },
    mapsUrl: "https://maps.google.com/?q=Balboa+Cafe+San+Francisco",
  },
  {
    id: "haiti-2021",
    date: "2021-10-02",
    time: "4:00 PM",
    title: { en: "Song of Emergency for Haiti", es: "Canción de Emergencia para Haití" },
    venue: "Virtual — Zoom",
    description: {
      en: "Song of Emergency for Haiti — Canción de emergencia para Haití.",
      es: "Canción de emergencia para Haití — Song of Emergency for Haiti.",
    },
  },
  {
    id: "posada-2019",
    date: "2019-12-21",
    time: "6:30 PM",
    title: { en: "Francisco Herrera \"POSADA\"", es: "Francisco Herrera \"POSADA\"" },
    venue: "Eric Quezada Cultural Center",
    address: "518 Valencia St., San Francisco, CA 94110",
    description: {
      en: "A special night of song and celebration of the dignity migrant people represent. \"Posada\" means offering shelter — this evening's music nourishes our collective efforts to recognize the need for shelter as an act of liberation.",
      es: "Una noche especial de canto y celebración de la dignidad que representa el pueblo migrante y la liberación que se vive al dar Posada. Habrá ricas empanadas y bebida de venta.",
    },
    mapsUrl: "https://maps.google.com/?q=518+Valencia+St+San+Francisco",
    highlight: true,
  },
  {
    id: "zawaya-menlo-2019",
    date: "2019-12-15",
    time: "2:00 PM",
    title: {
      en: "Zawaya Presents: No Ban; No Wall; No Wars — Aswat Ensemble (Menlo Park)",
      es: "Zawaya Presenta: No al Veto; No al Muro; No a las Guerras — Aswat Ensemble (Menlo Park)",
    },
    venue: "Hillview School Performing Art Center",
    address: "1100 Elder Ave, Menlo Park, CA 94025",
    description: {
      en: "Aswat Ensemble (director: George Khouri) with Vukani Mawethu, Diana Gameros, Francisco Herrera, Liliana Herrera, Sophia Bouzid, Naya Salah, Lina del Robles and Cyril Drame. Performances in Arabic, English, Spanish, French. Free and accessible.",
      es: "El Ensamble Aswat (director: George Khouri) con Vukani Mawethu, Diana Gameros, Francisco y Liliana Herrera, Sophia Bouzid, Naya Salah, MC Pauze, Lina Del Roble y Cyril Drame. Presentaciones en árabe, inglés, español y francés. Gratuito y accesible.",
    },
    free: true,
    mapsUrl: "https://maps.google.com/?q=1100+Elder+Ave+Menlo+Park",
  },
  {
    id: "zawaya-oakland-2019",
    date: "2019-12-14",
    time: "7:30 PM",
    title: {
      en: "Zawaya Presents: No Ban; No Wall; No Wars — Aswat Ensemble (Oakland)",
      es: "Zawaya Presenta: No al Veto; No al Muro; No a las Guerras — Aswat Ensemble (Oakland)",
    },
    venue: "Islamic Cultural Center of Northern California",
    address: "1433 Madison St., Oakland, CA 94612",
    description: {
      en: "Companion concert to the Menlo Park show. Themes of unity, resistance, diversity, solidarity. Performances in Arabic, English, Spanish, French. Free and accessible.",
      es: "Concierto compañero al de Menlo Park. Temas de unidad, resistencia, diversidad, solidaridad. Presentaciones en árabe, inglés, español y francés. Gratuito y accesible.",
    },
    free: true,
    mapsUrl: "https://maps.google.com/?q=1433+Madison+St+Oakland",
  },
  {
    id: "many-sounds-christmas-2019",
    date: "2019-12-13",
    time: "6:30 PM",
    title: { en: "Many Sounds of Christmas", es: "Muchos Sonidos de Navidad" },
    venue: "St. Columba Church",
    address: "6401 San Pablo Ave, Oakland, CA",
    description: {
      en: "Francisco joins Kev Choice, Candace Johnson, Mykah Montgomery, Michelle Jacques, the Oakland School of the Arts Select Ensemble, and radio personality Miranda Wilson for a night of Classical, Jazz, Gospel, and Hip Hop supporting community work.",
      es: "Francisco se une a Kev Choice, Candace Johnson, y otras personalidades musicales en una noche de inspiración y apoyo comunitario — Música Inspiradora, Clásica, Gospel, Jazz, Hip Hop.",
    },
    mapsUrl: "https://maps.google.com/?q=St+Columba+Church+Oakland",
  },
  {
    id: "pena-mujer-2019",
    date: "2019-12-08",
    time: "6:30 PM",
    title: { en: "Peña Mujer", es: "Peña Mujer" },
    venue: "Eric Quezada Cultural Center",
    address: "518 Valencia St., San Francisco",
    description: {
      en: "A night of music where women sing their herstory. Francisco sponsors singers from the community who represent the dignity of our people.",
      es: "Noche donde la mujer canta su historia. Francisco patrocina cantantes de la comunidad que representan la dignidad de nuestro pueblo.",
    },
    mapsUrl: "https://maps.google.com/?q=518+Valencia+St+San+Francisco",
  },
  {
    id: "five-oceans-2019",
    date: "2019-10-10",
    time: "7:30 PM",
    title: { en: "Dennis Bernstein & Warren Lehrer: Five Oceans in a Tea Spoon", es: "Dennis Bernstein y Warren Lehrer: Cinco Océanos en una Cucharadita" },
    venue: "The Hillside Club",
    address: "2286 Cedar St., Berkeley, CA 94709",
    description: {
      en: "Francisco opens and accompanies an evening of poetry by Dennis Bernstein and visualizations by Warren Lehrer with haunting music — a musical score to an intimate evening.",
      es: "Francisco da fondo musical a la obra del poeta Dennis Bernstein y el artista Warren Lehrer.",
    },
    mapsUrl: "https://maps.google.com/?q=Hillside+Club+Berkeley",
  },
  {
    id: "sanctuary-declaration-2018",
    date: "2018-03-25",
    time: "2:00 PM",
    title: { en: "Sanctuary Declaration", es: "Declaración de Santuario" },
    venue: "1st Unitarian Universalists of San Francisco",
    address: "1187 Franklin St. @ Geary, San Francisco",
    description: {
      en: "All are welcome. SF Rockin Solidarity Labor Chorus, Rev. Vanessa Rush Southern (UUSF), Rev. Deborah Lee (SFICI), Francisco Herrera, and testimonials from immigrant community members. No Ban, No Wall — Sanctuary for All.",
      es: "Todos son bienvenidos. Coro Laboral de Solidaridad SF Rockin, Rev. Vanessa Rush Southern (UUSF), Rev. Deborah Lee (SFICI), Francisco Herrera, y testimonios de miembros de la comunidad inmigrante.",
    },
    free: true,
    mapsUrl: "https://maps.google.com/?q=1187+Franklin+San+Francisco",
  },
  {
    id: "corpus-christi-2016",
    date: "2016-11-26",
    time: "6:00 PM",
    title: { en: "Celebrating Champions for Immigrants", es: "Celebrando Campeones para Inmigrantes" },
    venue: "Community Hall — Corpus Christi Church",
    address: "62 Santa Rosa St. & Alemany, San Francisco, CA 94112",
    description: {
      en: "Great music, inspiring people, celebrating four champions for immigrants: Bishop Bill Justice (Archdiocese SF), Holly Ayala and Jorge Argueta (Luna Press), Jaime Pinto (Peregrinación Sn. Judas).",
      es: "Música conmovedora, personas inspiradoras, celebremos a 4 campeones de la comunidad: Obispo Bill Justice (Arquidiócesis SF), Holly Ayala y Jorge Argueta (Luna Press), Jaime Pinto (Peregrinación Sn. Judas).",
    },
    mapsUrl: "https://maps.google.com/?q=Corpus+Christi+Church+San+Francisco",
  },
  {
    id: "studio-album-benefit-2014",
    date: "2014-05-17",
    time: "6:00 PM",
    title: { en: "Francisco Herrera's Studio Album Benefit Party", es: "Fiesta Beneficio del Álbum de Estudio de Francisco Herrera" },
    venue: "Eric Quezada Building / Center for Political Education",
    address: "518 Valencia St., San Francisco",
    description: {
      en: "Public launch of the campaign for Francisco's 7th album with MC Cynthia Munoz-Ramos (Causa Justa). Mini-musical program with Miguel and Susan Govea, Rafael and Liliana Herrera, with poetry by Dorothy Payne, Jorge Argueta, and Manlio Argueta.",
      es: "Lanzamiento público de la campaña del 7° álbum de Francisco con MC Cynthia Muñoz-Ramos (Causa Justa). Programa musical con Miguel y Susan Govea, Rafael y Liliana Herrera, y poesía de Dorothy Payne, Jorge Argueta y Manlio Argueta.",
    },
    free: true,
    mapsUrl: "https://maps.google.com/?q=518+Valencia+St+San+Francisco",
  },
  {
    id: "ingleside-library-2013",
    date: "2013-10-15",
    time: "10:00 AM",
    title: { en: "Children's Music at Ingleside Library", es: "Música Infantil en Biblioteca Ingleside" },
    venue: "SF Ingleside Branch Library",
    address: "1649 Ocean Ave, San Francisco, CA",
    description: {
      en: "Children's music in Spanish — come play and sing to celebrate humanity. All ages.",
      es: "Música infantil en castellano — vengan a jugar y cantar para celebrar la humanidad. Para todas las edades.",
    },
    free: true,
    mapsUrl: "https://maps.google.com/?q=Ingleside+Library+San+Francisco",
  },
  {
    id: "red-stone-2013",
    date: "2013-09-16",
    time: "7:00 PM",
    title: { en: "Francisco Herrera with Diana Gameros & Friends", es: "Francisco Herrera con Diana Gameros y Amig@s" },
    venue: "Red Stone Building — Second Floor Theater",
    address: "2940 16th Street, San Francisco, CA",
    description: {
      en: "An evening of music to move your soul, in support of Las Hormigas community support group in Ciudad Juárez, Chihuahua, Mexico.",
      es: "Una noche de música para mover el alma, en apoyo del grupo comunitario Las Hormigas en Ciudad Juárez, Chihuahua, México.",
    },
    mapsUrl: "https://maps.google.com/?q=2940+16th+Street+San+Francisco",
  },
  {
    id: "concierto-zapatista-2013",
    date: "2013-07-02",
    time: "7:00 PM",
    title: { en: "Concierto Zapatista", es: "Concierto Zapatista" },
    venue: "Rincón",
    address: "3265 17 St #2 (Mission and Capp), San Francisco, CA",
    description: {
      en: "Support a small delegation traveling to celebrate and \"un-learn\" at the Freedom Zapatista School in the CARACOLES zones of liberation. Songs of liberation, alternative economies, solidarity.",
      es: "Apoyemos a esta delegación de celebración y \"des-aprender\" en la escuelita Zapatista de la libertad en los caracoles. Cantos de liberación y celebración de economías alternativas y solidaridad.",
    },
    mapsUrl: "https://maps.google.com/?q=3265+17th+Street+San+Francisco",
  },
  {
    id: "concierto-comunitario-2013",
    date: "2013-06-29",
    time: "7:00 PM",
    title: { en: "Concierto Comunitario", es: "Concierto Comunitario" },
    venue: "Compañeros del Barrio — Black and Brown Cafe",
    address: "474 Valencia St., San Francisco, CA",
    description: {
      en: "Community concert at Compañeros del Barrio.",
      es: "Concierto comunitario en Compañeros del Barrio.",
    },
    mapsUrl: "https://maps.google.com/?q=474+Valencia+St+San+Francisco",
  },
  {
    id: "premio-mujer-2013",
    date: "2013-05-11",
    time: "6:00 PM",
    title: { en: "PREMIO MUJER 2013 — Francisco Herrera and Friends in Concert", es: "PREMIO MUJER 2013 — Francisco Herrera y Amig@s en Concierto" },
    venue: "St. Mary's Cathedral Event Center",
    address: "1111 Gough St., San Francisco, CA",
    description: {
      en: "PREMIO MUJER celebrates the everyday woman, daily courage, and the woman's sense of life. Homestyle dinner cooked by Trabajo Cultural CAMINANTE Director Maria Christina Herrera, with songs of love and dignity from Francisco and special guests. $10.00.",
      es: "PREMIO MUJER celebra la vida de la mujer cotidiana, el valor y su sentido de vida. Cena casera con la cocina de la Directora Maria Christina Herrera (Trabajo Cultural CAMINANTE), música de Francisco e invitad@s. $10.00.",
    },
    mapsUrl: "https://maps.google.com/?q=St+Marys+Cathedral+San+Francisco",
  },
  {
    id: "may-day-rally-2013",
    date: "2013-05-01",
    time: "3:30 PM",
    title: { en: "Rally & March Commemorating 1st of May", es: "Marcha del 1° de Mayo" },
    venue: "1 de Mayo / 1st",
    address: "665 Sebastopol Rd., Santa Rosa, CA",
    description: {
      en: "March from 665 Sebastopol to Juilliard Park, Santa Rosa. Free event. Songs from the album Honor Migrante.",
      es: "Marcha desde 665 Sebastopol hasta Juilliard Park, Santa Rosa. Evento gratuito. Cantos del disco Honor Migrante.",
    },
    free: true,
    mapsUrl: "https://maps.google.com/?q=665+Sebastopol+Rd+Santa+Rosa",
  },
  {
    id: "interfaith-vigil-2013",
    date: "2013-04-30",
    time: "6:30 PM",
    title: { en: "Interfaith Vigil for Immigrant Rights", es: "Vigilia Interreligiosa Pro Derecho Inmigrante" },
    venue: "Frank Ogawa Plaza",
    address: "14th and Broadway, Oakland, CA",
    description: {
      en: "An evening of prayer, song, and movement for family unity, worker justice, and a path to citizenship — on the eve of May 1st. Together we make the difference.",
      es: "Una noche de oración, canto y movimiento por la unidad familiar, justicia laboral y un camino a la ciudadanía — en víspera del 1° de Mayo.",
    },
    free: true,
    mapsUrl: "https://maps.google.com/?q=Frank+Ogawa+Plaza+Oakland",
  },
  {
    id: "immigration-summit-2013",
    date: "2013-03-16",
    time: "8:00 AM",
    title: { en: "National Leadership Summit for Immigration Reform", es: "Cumbre Nacional de Liderazgo para Reforma Migratoria" },
    venue: "UC Riverside — Highlander Union Building",
    address: "1136 Highlander Hall, Rm 302, Riverside, CA 92521",
    description: {
      en: "A non-partisan event with federal representatives, state and local elected officials, and community activists voicing prospects and proposals for humane immigration reform in 2013.",
      es: "Un evento no partidista con representantes federales, oficiales estatales y locales, y activistas comunitarios proponiendo una reforma migratoria humana para 2013.",
    },
    mapsUrl: "https://maps.google.com/?q=UC+Riverside",
  },
  {
    id: "honor-migrante-brava-2013",
    date: "2013-03-02",
    time: "8:00 PM",
    title: { en: "Francisco Herrera in Concert: HONOR MIGRANTE", es: "Francisco Herrera en Concierto: HONOR MIGRANTE" },
    venue: "BRAVA Theater Center",
    address: "2781 24th St., San Francisco, CA",
    description: {
      en: "Francisco presents music from his album HONOR MIGRANTE, singing the life and dignity of migrant people to inspire the struggle for legalization. Ranchera, norteña, Cal-Mex, rhythm and blues, trova and balada — in Spanish, English, Spanglish, and a touch of Maya-Quiché. $18.00.",
      es: "Francisco presenta música de su disco HONOR MIGRANTE, cantándole a la vida y dignidad migrante. Ranchera, norteña, Cal-Mex, rhythm and blues, trova y balada — en español, inglés, caló y hasta un poco de Maya-Quiché. $18.00.",
    },
    mapsUrl: "https://maps.google.com/?q=BRAVA+Theater+San+Francisco",
    highlight: true,
  },
  {
    id: "se-puede-2012",
    date: "2012-08-23",
    time: "7:00 PM",
    title: { en: "SE PUEDE ¿O QUE? — Concert for La Raza Information Center", es: "SE PUEDE ¿O QUE? — Concierto para La Raza Information Center" },
    venue: "Arlene Francis Center",
    address: "99 6th St., Santa Rosa, CA",
    description: {
      en: "Francisco shares songs from Fuerza de la Raíz and HONOR MIGRANTE plus original songs not yet recorded — exploring the lives of working people: campesinos, hotel workers, street vendors, students.",
      es: "Francisco comparte canciones de Fuerza de la Raíz y HONOR MIGRANTE más originales aún no grabadas — explorando la vida de trabajador@s: campesin@s, trabajadores de hotel, vendedores de fruta, estudiantes.",
    },
    mapsUrl: "https://maps.google.com/?q=Arlene+Francis+Center+Santa+Rosa",
  },
  {
    id: "honor-migrante-2011",
    date: "2011-12-03",
    time: "6:00 PM",
    title: { en: "CONCIERTO HONOR MIGRANTE", es: "CONCIERTO HONOR MIGRANTE" },
    venue: "Iglesia Sn. Pedro — Salón Social",
    address: "1245 Alabama St., San Francisco, CA",
    description: {
      en: "Annual concert of Trabajo Cultural Caminante, celebrating the working class. Featuring Francisco Herrera's HONOR MIGRANTE, Los Nadie, and the new acoustic group DELIRIA. Recognizing Mr. Ramón Cardona for years of work with immigrant families. $10.00.",
      es: "Concierto anual de Trabajo Cultural Caminante celebrando la clase trabajadora. Con la música de Francisco Herrera (HONOR MIGRANTE), Los Nadie, y el conjunto acústico DELIRIA. Reconocimiento al Sr. Ramón Cardona por años de trabajo con familias inmigrantes. $10.00.",
    },
    mapsUrl: "https://maps.google.com/?q=1245+Alabama+St+San+Francisco",
  },
  {
    id: "hope-coralito-2011",
    date: "2011-11-05",
    time: "8:00 PM",
    title: { en: "Hope For Coralito / Esperanza Para Coralito", es: "Hope For Coralito / Esperanza Para Coralito" },
    venue: "Unitarian Universalists Fellowship Hall",
    address: "1924 Cedar St @ Bonita, Berkeley, CA 94709",
    description: {
      en: "Event begins at 7:30 PM; musical performance at 8:40. $25.00.",
      es: "El evento empieza a las 7:30; presentación musical a las 8:40. $25.00.",
    },
    mapsUrl: "https://maps.google.com/?q=1924+Cedar+St+Berkeley",
  },
  {
    id: "spanish-meetup-2011",
    date: "2011-11-05",
    time: "1:00 PM",
    title: { en: "East Bay Spanish-Language MeetUp", es: "Reunión de Idioma Español del East Bay" },
    venue: "Melrose Branch Library",
    address: "4805 Foothill Blvd., Oakland, CA",
    description: {
      en: "All are welcome to this musical celebration.",
      es: "Toda persona invitada a esta celebración musical.",
    },
    free: true,
    mapsUrl: "https://maps.google.com/?q=4805+Foothill+Oakland",
  },
  {
    id: "social-justice-workshop-2011",
    date: "2011-11-05",
    time: "9:00 AM",
    title: { en: "Social Justice Ministry Workshop", es: "Día de Pastoral de Justicia Social" },
    venue: "Conference Center at the Cathedral of Christ the Light",
    address: "2121 Harrison St., Oakland, CA",
    description: {
      en: "A day of social justice ministry. $20 if paid before Nov. 1; $30 at the door.",
      es: "Día de pastoral de justicia social. $20 antes del 1 de noviembre; $30 a la entrada.",
    },
    mapsUrl: "https://maps.google.com/?q=Cathedral+of+Christ+the+Light+Oakland",
  },
  {
    id: "central-library-childrens-2011",
    date: "2011-10-05",
    time: "10:30 AM",
    title: { en: "Children's Music — SF Central Library", es: "Música Infantil — Biblioteca Central SF" },
    venue: "San Francisco Central Library",
    address: "Hyde & Grove, San Francisco, CA",
    description: {
      en: "Children's music in Spanish, celebrating Latin American contribution to the U.S.",
      es: "Música infantil celebrando la contribución latina de América Latina en EE.UU.",
    },
    free: true,
    mapsUrl: "https://maps.google.com/?q=SF+Central+Library",
  },
  {
    id: "marin-task-force-2011",
    date: "2011-09-25",
    time: "7:00 PM",
    title: { en: "Marin Task Force on Latin America — Annual Dinner", es: "Cena Anual del Marin Task Force on Latin America" },
    venue: "Unitarian Universalist Congregation of Marin",
    address: "240 Channing Way, San Rafael, CA",
    description: {
      en: "Francisco entertains with a medley of Jon Fromer's songs. Guest speaker Patricia Isasa, an Argentine torture survivor, discusses her latest investigative assignment requested by President Cristina Kirchner. $50–100.",
      es: "Francisco entretiene con un popurrí de canciones de Jon Fromer. La oradora invitada Patricia Isasa, sobreviviente de tortura en Argentina, comparte su trabajo de investigación. $50–100.",
    },
    mapsUrl: "https://maps.google.com/?q=240+Channing+Way+San+Rafael",
  },
  {
    id: "transition-mill-valley-2011",
    date: "2011-09-22",
    time: "7:00 PM",
    title: { en: "Transition Mill Valley", es: "Transition Mill Valley" },
    venue: "Mill Valley Theater",
    address: "142 Throckmorton Theatre, Mill Valley, CA",
    description: {
      en: "Envisioning a more resilient community in the face of peak oil. $15.",
      es: "Imaginando una comunidad más resiliente ante el pico petrolero. $15.",
    },
    mapsUrl: "https://maps.google.com/?q=Throckmorton+Theatre+Mill+Valley",
  },
  {
    id: "premio-mujer-2011",
    date: "2011-05-14",
    time: "6:00 PM",
    title: { en: "Cena/Concierto PREMIO MUJER 2011", es: "Cena/Concierto PREMIO MUJER 2011" },
    venue: "St. Mary's Cathedral Event Center",
    address: "1111 Gough St., San Francisco, CA 94109",
    description: {
      en: "Dinner/concert celebrating the life and ongoing work of five heroic women of the Bay Area: Maria Luna, Vivian Zelaya, Mary Fromer, Haydee Martinez, Ana Galvez. Francisco dedicates the evening to the late Mercedes Sosa.",
      es: "Cena/concierto celebrando la vida y el trabajo de cinco mujeres heroicas del Área de la Bahía: Maria Luna, Vivian Zelaya, Mary Fromer, Haydee Martínez, Ana Gálvez. Francisco dedica la noche a la memoria de Mercedes Sosa.",
    },
    mapsUrl: "https://maps.google.com/?q=St+Marys+Cathedral+San+Francisco",
  },
  {
    id: "tamborcitos-2011",
    date: "2011-05-02",
    time: "10:00 AM",
    title: { en: "Tamborcitos / Children's Music — Música Infantil", es: "Tamborcitos / Música Infantil" },
    venue: "Parque Niños Unidos",
    address: "23 & Folsom St., San Francisco, CA",
    description: {
      en: "Come enjoy children's music with your child and strengthen their Spanish.",
      es: "Vengan a disfrutar música infantil con su niñ@ y fortalezcan el lenguaje español.",
    },
    mapsUrl: "https://maps.google.com/?q=Parque+Ninos+Unidos+San+Francisco",
  },
  {
    id: "honor-migrante-library-2010",
    date: "2010-11-27",
    time: "4:00 PM",
    title: { en: "HONOR MIGRANTE en la Biblioteca", es: "HONOR MIGRANTE en la Biblioteca" },
    venue: "Teatro KORET — San Francisco Public Library",
    address: "Grove & Hyde, San Francisco, CA 94103",
    description: {
      en: "A musical celebration of the heritage of working people, with stories of pride and dignity.",
      es: "Una celebración musical de la herencia del migrante, con música conmovedora y cuentos del orgullo trabajador.",
    },
    free: true,
    mapsUrl: "https://maps.google.com/?q=SF+Public+Library+Koret",
  },
  {
    id: "soa-watch-vigil-2010",
    date: "2010-11-18",
    time: "7:00 PM",
    title: { en: "School of the Americas Watch Vigil", es: "Vigilia en la Escuela de las Américas" },
    venue: "Gates of Ft. Benning",
    address: "Columbus, Georgia",
    description: {
      en: "Thousands gather in Columbus to remember the dignity of working people who fell victim to graduates of this school for terrorism — and to redirect U.S. tax dollars from terrorism to peace. soaw.org",
      es: "Miles se reúnen en Columbus para recordar la dignidad de la gente trabajadora víctima de los graduados de esta escuela del terrorismo, y para dedicar el dinero a la paz. soaw.org",
    },
  },
  {
    id: "marina-library-2010",
    date: "2010-10-02",
    time: "3:30 PM",
    title: { en: "Children's Music in Spanish — Marina Library", es: "Música Infantil en Español — Biblioteca Marina" },
    venue: "Marina Branch Library",
    address: "1890 Chestnut St., San Francisco, CA",
    description: {
      en: "Have a great time with your kids — music, song, and Spanish-language practice.",
      es: "Disfruten con sus hijas con música y canto y fortalezcan el castellano.",
    },
    free: true,
    mapsUrl: "https://maps.google.com/?q=Marina+Branch+Library+San+Francisco",
  },
  {
    id: "central-library-heritage-2010",
    date: "2010-09-23",
    time: "10:00 AM",
    title: { en: "Children's Music — Latino Heritage Month", es: "Música Infantil — Mes de la Herencia Latina" },
    venue: "San Francisco Central Library",
    address: "Grove & Hyde, San Francisco, CA 94103",
    description: {
      en: "Musical celebration of Latino Heritage Month at the SF Central Library.",
      es: "Celebración musical del mes de la cultura latina en la Biblioteca Central SF.",
    },
    free: true,
    mapsUrl: "https://maps.google.com/?q=SF+Central+Library",
  },
  {
    id: "fresno-pena-2010",
    date: "2010-09-11",
    time: "6:00 PM",
    title: { en: "Una Noche de Peña en Fresno", es: "Una Noche de Peña en Fresno" },
    venue: "4209 N Delbert Ave",
    address: "Fresno, CA",
    description: {
      en: "A bohemian night of love and conscience songs from Francisco. Mexican antojitos available. $5.00 donation. Caminante Foundation.",
      es: "Una noche bohemia llena de recuerdos con canciones de amor y conciencia de Francisco. Habrá antojitos mexicanos. Donación: $5.00. Fundación Caminante.",
    },
    mapsUrl: "https://maps.google.com/?q=4209+N+Delbert+Fresno",
  },
  {
    id: "deyoung-muralismo-2010",
    date: "2010-09-04",
    time: "7:00 PM",
    title: { en: "De Young Museum: Mission Muralismo Film Night", es: "Museo De Young: Noche de Cine Mission Muralismo" },
    venue: "Koret Auditorium, De Young Museum",
    address: "Golden Gate Park, San Francisco",
    description: {
      en: "Francisco opens the evening with a classic Mission street song. Cutting-edge and old-school Mission filmmaking shadowing and illuminating Mission art and life. Friday Night programs in the museum's free zone.",
      es: "Francisco abre la noche con un canto clásico de la Misión. Películas innovadoras y clásicas de la Misión iluminando el arte y la vida del barrio.",
    },
    free: true,
    mapsUrl: "https://maps.google.com/?q=De+Young+Museum+San+Francisco",
    highlight: true,
  },
  {
    id: "flor-y-canto-2010",
    date: "2010-08-29",
    time: "7:00 PM",
    title: { en: "Flor y Canto en la Mission", es: "Flor y Canto en la Mission" },
    venue: "Mission Cultural Center for Latino Arts",
    address: "25th & Mission St., San Francisco, CA 94110",
    description: {
      en: "40th-anniversary celebration of El Tecolote Newspaper. Francisco shares the stage with Francisco Alarcón, Lorna Dee Cervantes, Juan Felipe Herrera, Jack Hirschman, Genny Lim, Alejandro Murguia, Nina Serrano, Jorge Tetl Argueta, and many more poets.",
      es: "Celebración del 40° aniversario del periódico El Tecolote. Francisco comparte escenario con Francisco Alarcón, Lorna Dee Cervantes, Juan Felipe Herrera, Jack Hirschman, Genny Lim, Alejandro Murguía, Nina Serrano, Jorge Tetl Argueta y muchos otros poetas.",
    },
    mapsUrl: "https://maps.google.com/?q=Mission+Cultural+Center+San+Francisco",
  },
];

/** Pagination size for the /shows page. */
export const EVENTS_PER_PAGE = 9;

/** Curated subset for the homepage highlights reel. */
export const homepageHighlights = pastEvents.filter((e) => e.highlight);
