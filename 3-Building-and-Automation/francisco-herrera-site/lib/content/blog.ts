// Blog content migrated from franciscoherreramusic.com (Bandzoogle).
// Source: https://franciscoherreramusic.com/blog (3 paginated index pages,
// captured 2026-05-07). Posts retain their original numeric IDs in `id`
// and link back to the source via `originalUrl` for posts whose full body
// text could not be captured at migration time — those entries fall back
// to the displayed excerpt as the body.
//
// Structure designed so:
//   - The blog index renders all posts paginated newest-first.
//   - Individual post pages route via slug.
//   - Each `body` paragraph is bilingual; when the original was written in
//     a single language only, both `en` and `es` carry that text and the
//     reader gets the same content regardless of their language toggle.

import type { Localized } from "@/lib/i18n";

/** A single comment captured from the source post. Preserved verbatim,
 *  including obvious spam — the visitor is reading an archive of the
 *  original blog, not a curated reblog, and what was on the original is
 *  what's on the new site. */
export type BlogComment = {
  author: string;
  /** Free-form location label as it appeared on the source ("United States",
   *  "Pakistan", "Dubai"…). Optional because not every source row has one. */
  location?: string;
  /** Free-form date string preserved as-displayed: "Sep 11 2020 2:19 AM". */
  date: string;
  body: string;
};

export type BlogPost = {
  /** Numeric post id from the source Bandzoogle URL */
  id: string;
  /** URL-safe slug used at /blog/[slug] */
  slug: string;
  title: Localized;
  /** ISO YYYY-MM-DD for chronological sorting */
  date: string;
  /** Human display string: "March 6, 2016" / "6 de marzo de 2016" */
  dateDisplay: Localized;
  /** Optional category tag pulled from the source */
  category?: Localized;
  /** Short summary used on cards + the index */
  excerpt: Localized;
  /** Body paragraphs in display order. Each paragraph is bilingual. */
  body: Localized[];
  /** Whether the source had an embedded audio/podcast player */
  hasAudio?: boolean;
  /** Whether the source had a podcast feed indicator */
  hasPodcast?: boolean;
  /** Original Bandzoogle URL — used for "Read original" link on posts whose
   *  full body wasn't captured in the migration. */
  originalUrl: string;
  /** Optional hero image. Falls back to a category-tinted placeholder. */
  image?: string;
  /** Reader comments captured from the source. Preserved verbatim. */
  comments?: BlogComment[];
  /** Total comment count on the source (often larger than `comments.length`
   *  because only a subset of comments is captured per post). */
  commentCount?: number;
};

export const POSTS_PER_PAGE = 7;

/** All posts, newest first. */
export const blogPosts: BlogPost[] = [
  // ─── Page 1 (newest) ──────────────────────────────────────────────
  {
    id: "7328234",
    slug: "dealing-with-artificial-intelligence",
    title: {
      en: "Dealing with Artificial Intelligence",
      es: "Dealing with Artificial Intelligence",
    },
    date: "2024-01-04",
    dateDisplay: { en: "January 4, 2024", es: "4 de enero de 2024" },
    category: { en: "Reflection", es: "Reflección" },
    excerpt: {
      en: "AI is a plantation — algorithms are programmed to take all the information you contribute and never pay you for it. But what if we filled these systems with humanism instead?",
      es: "AI is a plantation — algorithms are programmed to take all the information you contribute and never pay you for it. But what if we filled these systems with humanism instead?",
    },
    image: "/images/Solo-Portraits/1.Solo-Portraits-Vertical.png",
    body: [
      {
        en: "AI IS A PLANTATION: algorithms are programmed to take all the information you contribute into whatever internet program you are using and order it without paying you for it (the pay on YouTube is something else, don't confuse it). So like the plantations that produced cotton from the enslavement of strong people and built a booming economy, Artificial Intelligence is really your intelligence and mine gathered into files that the algorithm reaches instantly and presents without the limits of the human mind, which often inhibits our ability to quickly retrieve from our personal memory.",
        es: "AI IS A PLANTATION: algorithms are programmed to take all the information you contribute into whatever internet program you are using and order it without paying you for it (the pay on YouTube is something else, don't confuse it). So like the plantations that produced cotton from the enslavement of strong people and built a booming economy, Artificial Intelligence is really your intelligence and mine gathered into files that the algorithm reaches instantly and presents without the limits of the human mind, which often inhibits our ability to quickly retrieve from our personal memory.",
      },
      {
        en: "You don't have to be so amazed by this. Rather think about how you will use it or inform it so that it has the best of human traits and not the worst. For example, GPS gathers all our contributions and satellite information and tells you the fastest route. Translation programs gather all the edits and corrections you make and store them as information. All these programs work with information that billions of people pack into them, ordering themselves into pieces of information they can deliver to the next person who requires their services.",
        es: "You don't have to be so amazed by this. Rather think about how you will use it or inform it so that it has the best of human traits and not the worst. For example, GPS gathers all our contributions and satellite information and tells you the fastest route. Translation programs gather all the edits and corrections you make and store them as information. All these programs work with information that billions of people pack into them, ordering themselves into pieces of information they can deliver to the next person who requires their services.",
      },
      {
        en: "That's why programs taking organized intelligence tests created by humans (it's not artificial) now pass the bar exam and other professional certification exams successfully: it's like taking open book tests with all the information at your disposal. The difference is who creates the algorithm that can absorb the most information and return it to the customer: you and yours truly.",
        es: "That's why programs taking organized intelligence tests created by humans (it's not artificial) now pass the bar exam and other professional certification exams successfully: it's like taking open book tests with all the information at your disposal. The difference is who creates the algorithm that can absorb the most information and return it to the customer: you and yours truly.",
      },
      {
        en: "Artificial Intelligence is simply that, INTELLIGENCE gathered from billions of unwilling contributors. AI is exceeding individual human capacity because it is the collection of all human capacity, not just one individual's. The algorithms human beings have created turn AI into a plantation, where the program receives every piece of information and accesses it in an instant without the process of human memory. It collects all your human contributions, files them away and benefits from them, but never pays for them. It's a Hacienda, Finca, Plantation based on the use of our collective information.",
        es: "Artificial Intelligence is simply that, INTELLIGENCE gathered from billions of unwilling contributors. AI is exceeding individual human capacity because it is the collection of all human capacity, not just one individual's. The algorithms human beings have created turn AI into a plantation, where the program receives every piece of information and accesses it in an instant without the process of human memory. It collects all your human contributions, files them away and benefits from them, but never pays for them. It's a Hacienda, Finca, Plantation based on the use of our collective information.",
      },
      {
        en: "While using one of the translation services that now exist on the internet, I began making corrections to my document inside the translation program as the program prompted me. Then I realized, my God! No wonder this gets better and better, we are all editing inside this program and it is using all our information to correct the gathered information. I just stopped editing inside the translation program I was using and thought: why should I share my knowledge with this company for free? But now I am thinking, what if we all fill these AI robots with humanism, non-violent attitudes and expressions, non-violent practices of response and planning, and abhorrence for hoarding and violence? What if we overwhelm AI with alternatives to greed and the domination of others? What if in every interaction we have on the internet we express thoughts of SHARING?",
        es: "While using one of the translation services that now exist on the internet, I began making corrections to my document inside the translation program as the program prompted me. Then I realized, my God! No wonder this gets better and better, we are all editing inside this program and it is using all our information to correct the gathered information. I just stopped editing inside the translation program I was using and thought: why should I share my knowledge with this company for free? But now I am thinking, what if we all fill these AI robots with humanism, non-violent attitudes and expressions, non-violent practices of response and planning, and abhorrence for hoarding and violence? What if we overwhelm AI with alternatives to greed and the domination of others? What if in every interaction we have on the internet we express thoughts of SHARING?",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/7328234/dealing-with-artificial-intelligence",
  },
  {
    id: "7328270",
    slug: "lidiando-con-la-inteligencia-artificial",
    title: {
      en: "Lidiando con la Inteligencia Artificial",
      es: "Lidiando con la Inteligencia Artificial",
    },
    date: "2024-01-04",
    dateDisplay: { en: "January 4, 2024", es: "4 de enero de 2024" },
    category: { en: "Reflection", es: "Reflección" },
    excerpt: {
      en: "La IA ES UNA PLANTACIÓN: los algoritmos están programados para tomar toda la información que tú aportas. ¿Qué tal si llenamos estos robots con humanismo?",
      es: "La IA ES UNA PLANTACIÓN: los algoritmos están programados para tomar toda la información que tú aportas. ¿Qué tal si llenamos estos robots con humanismo?",
    },
    image: "/images/Solo-Portraits/2.Solo-Portraits-Vertical.png",
    body: [
      {
        en: "La IA ES UNA PLANTACIÓN: los algoritmos están programados para tomar toda la información que tú aportas a cualquier programa de Internet que esté utilizando y ordenarla sin pagarle por ello (la paga en YouTube es otra cosa, no lo confunda). Entonces, al igual que las plantaciones que produjeron algodón a partir de la esclavización de personas fuertes y construyó una economía en auge, la Inteligencia Artificial es en realidad su inteligencia y la mía reunidas en archivos que el algoritmo alcanza instantáneamente y los presenta sin los límites de la mente humana, que muchas veces inhibe nuestra capacidad de recuperar rápidamente de nuestra memoria personal.",
        es: "La IA ES UNA PLANTACIÓN: los algoritmos están programados para tomar toda la información que tú aportas a cualquier programa de Internet que esté utilizando y ordenarla sin pagarle por ello (la paga en YouTube es otra cosa, no lo confunda). Entonces, al igual que las plantaciones que produjeron algodón a partir de la esclavización de personas fuertes y construyó una economía en auge, la Inteligencia Artificial es en realidad su inteligencia y la mía reunidas en archivos que el algoritmo alcanza instantáneamente y los presenta sin los límites de la mente humana, que muchas veces inhibe nuestra capacidad de recuperar rápidamente de nuestra memoria personal.",
      },
      {
        en: "No tienes por qué asombrarte tanto por ésto. Más bien piensa en cómo lo usarás o informarás para que tenga lo mejor de los rasgos humanos y no los peores. Por ejemplo, el GPS recoge todas nuestras contribuciones e información satelital y te indica la ruta más rápida. Los programas de traducción recopilan todas las ediciones y correcciones que tú realizas y las almacena como información. Todos estos programas trabajan con la información que miles de millones de personas empaquetan en ellos, ordenándose en fragmentos de información que pueden entregarle a la siguiente persona que requiera sus servicios.",
        es: "No tienes por qué asombrarte tanto por ésto. Más bien piensa en cómo lo usarás o informarás para que tenga lo mejor de los rasgos humanos y no los peores. Por ejemplo, el GPS recoge todas nuestras contribuciones e información satelital y te indica la ruta más rápida. Los programas de traducción recopilan todas las ediciones y correcciones que tú realizas y las almacena como información. Todos estos programas trabajan con la información que miles de millones de personas empaquetan en ellos, ordenándose en fragmentos de información que pueden entregarle a la siguiente persona que requiera sus servicios.",
      },
      {
        en: "Es por eso que los programas para tomar exámenes de inteligencia organizada y creados por humanos (no es artificial) ahora pasan los exámenes de la abogacía y otros exámenes de certificación profesional exitosamente: es como si tomara exámenes a libro abierto con toda la información a su disposición. La diferencia es quién crea el algoritmo que puede absorber la mayor cantidad de información y devolvérsela al cliente: usted y un servidor.",
        es: "Es por eso que los programas para tomar exámenes de inteligencia organizada y creados por humanos (no es artificial) ahora pasan los exámenes de la abogacía y otros exámenes de certificación profesional exitosamente: es como si tomara exámenes a libro abierto con toda la información a su disposición. La diferencia es quién crea el algoritmo que puede absorber la mayor cantidad de información y devolvérsela al cliente: usted y un servidor.",
      },
      {
        en: "La Inteligencia Artificial es simplemente eso, INTELIGENCIA reunida a partir de miles de millones de contribuyentes involuntarios. La IA está superando la capacidad humana individual porque es la colección de toda la capacidad humana, no solo la de un individuo. Los algoritmos que han creado los seres humanos convierten a la IA en una plantación, donde el programa recibe cada pieza de información y tiene acceso a ella en un instante sin el proceso de la memoria humana. Recoge todas sus contribuciones humanas, las archiva y se beneficia de ellas, pero nunca paga por ellas. Es una Hacienda, Finca, Plantación basada en el uso de nuestra información colectiva.",
        es: "La Inteligencia Artificial es simplemente eso, INTELIGENCIA reunida a partir de miles de millones de contribuyentes involuntarios. La IA está superando la capacidad humana individual porque es la colección de toda la capacidad humana, no solo la de un individuo. Los algoritmos que han creado los seres humanos convierten a la IA en una plantación, donde el programa recibe cada pieza de información y tiene acceso a ella en un instante sin el proceso de la memoria humana. Recoge todas sus contribuciones humanas, las archiva y se beneficia de ellas, pero nunca paga por ellas. Es una Hacienda, Finca, Plantación basada en el uso de nuestra información colectiva.",
      },
      {
        en: "Mientras usaba uno de los servicios de traducción que ahora existen en Internet, comencé a hacer correcciones a mi documento dentro del programa de traducción como el programa me indicó. Entonces me di cuenta, ¡Dios mío! No es de extrañar que esto mejore cada vez más, todos estamos editando dentro de este programa y él está utilizando toda nuestra información para corregir la información recopilada. Simplemente dejé de editar dentro del programa de traducción que estaba usando y pensé: ¿por qué debería compartir mis conocimientos con esta empresa de forma gratuita? Pero ahora estoy pensando, ¿qué pasaría si todos llenamos estos robots de inteligencia artificial con humanismo, actitudes y expresiones no violentas, prácticas de respuestas y planificación no violentas y aborrecimiento por el acaparamiento, la violencia? ¿Qué tal si abrumamos la inteligencia artificial con alternativas a la codicia y la dominación de los demás? ¿Qué pasa si en cada interacción que tenemos en Internet expresamos pensamientos de COMPARTIR?",
        es: "Mientras usaba uno de los servicios de traducción que ahora existen en Internet, comencé a hacer correcciones a mi documento dentro del programa de traducción como el programa me indicó. Entonces me di cuenta, ¡Dios mío! No es de extrañar que esto mejore cada vez más, todos estamos editando dentro de este programa y él está utilizando toda nuestra información para corregir la información recopilada. Simplemente dejé de editar dentro del programa de traducción que estaba usando y pensé: ¿por qué debería compartir mis conocimientos con esta empresa de forma gratuita? Pero ahora estoy pensando, ¿qué pasaría si todos llenamos estos robots de inteligencia artificial con humanismo, actitudes y expresiones no violentas, prácticas de respuestas y planificación no violentas y aborrecimiento por el acaparamiento, la violencia? ¿Qué tal si abrumamos la inteligencia artificial con alternativas a la codicia y la dominación de los demás? ¿Qué pasa si en cada interacción que tenemos en Internet expresamos pensamientos de COMPARTIR?",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/7328270/lidiando-con-la-inteligencia-artificial",
  },
  {
    id: "7198258",
    slug: "dicen-que-so-they-say",
    title: {
      en: "Dicen Qué — So They Say",
      es: "Dicen Qué — So They Say",
    },
    date: "2023-04-27",
    dateDisplay: { en: "April 27, 2023", es: "27 de abril de 2023" },
    category: { en: "Songs", es: "Canciones" },
    excerpt: {
      en: "A bilingual song (©1999) blending traditional Latin rhythms with contemporary hip-hop, on exclusion, universal heritage, and unstoppable spirit.",
      es: "Una canción bilingüe (©1999) que mezcla ritmos latinos tradicionales con hip-hop contemporáneo, sobre exclusión, herencia universal y el espíritu indomable.",
    },
    image: "/images/photos/francisco-festival-performance.webp",
    body: [
      {
        en: "They say the party's over / But I just arrived. The composition opens by setting tension between external judgment and personal agency.",
        es: "Dicen que se acabó la fiesta / Pero yo apenas llegué. La pieza abre planteando la tensión entre el juicio externo y la voluntad personal.",
      },
      {
        en: "The piece blends traditional Latin rhythms with contemporary hip-hop elements. The narrative voice challenges the barriers and limitations imposed by others, asserting resilience and a determination to keep celebrating and participating despite the obstacles.",
        es: "La pieza mezcla ritmos tradicionales latinos con elementos contemporáneos de hip-hop. La voz narrativa desafía las barreras y limitaciones que otros imponen, afirmando la resiliencia y la determinación de seguir celebrando y participando a pesar de los obstáculos.",
      },
      {
        en: "The closing message emphasizes unstoppable natural forces and inner strength — that despite proclamations of endings, the spirit endures and rises again.",
        es: "El mensaje final enfatiza las fuerzas naturales imparables y la fortaleza interior — que a pesar de las proclamas de finales, el espíritu permanece y se levanta de nuevo.",
      },
    ],
    hasAudio: true,
    hasPodcast: true,
    originalUrl: "https://franciscoherreramusic.com/blog/blog/7198258/dicen-que-so-they-say-c-1999-francisco-herrera",
  },
  {
    id: "7185229",
    slug: "cancionero-jueves-santo-2023",
    title: {
      en: "Cancionero para lavado de pies — Jueves Santo 2023",
      es: "Cancionero para lavado de pies — Jueves Santo 2023",
    },
    date: "2023-04-06",
    dateDisplay: { en: "April 6, 2023", es: "6 de abril de 2023" },
    category: { en: "Songs", es: "Canciones" },
    excerpt: {
      en: "Three songs prepared for the Holy Thursday foot-washing ceremony at Local 87 — themes of solidarity, liberation, and collective hope.",
      es: "Tres canciones preparadas para la ceremonia de lavado de pies del Jueves Santo en el Local 87 — temas de solidaridad, liberación y esperanza colectiva.",
    },
    image: "/images/photos/Children-holding candles-at-vigil.webp",
    body: [
      {
        en: "A collection of three songs prepared for a Holy Thursday foot-washing ceremony at Local 87 in 2023.",
        es: "Una colección de tres canciones preparadas para la ceremonia de lavado de pies del Jueves Santo en el Local 87 en 2023.",
      },
      {
        en: "The first composition, “Danos Un Corazón,” calls for hearts capable of loving and struggling, celebrating Pueblos nuevos (new/reborn peoples) as creadores de la historia. The piece emphasizes themes of freedom, solidarity across borders, and standing with the poor.",
        es: "La primera composición, “Danos Un Corazón,” pide corazones capaces de amar y luchar, celebrando a los Pueblos nuevos como creadores de la historia. La pieza enfatiza temas de libertad, solidaridad a través de las fronteras, y caminar junto a las y los pobres.",
      },
      {
        en: "The second song, “Lávame,” uses cleansing imagery as spiritual metaphor, asking for transformation and divine presence.",
        es: "El segundo canto, “Lávame,” usa imágenes de purificación como metáfora espiritual, pidiendo transformación y presencia divina.",
      },
      {
        en: "The final composition, “There is Hope, There is Power,” emphasizes collective action and organizing — parallel Spanish and English verses that affirm “Si se puede, Yes we can.”",
        es: "La composición final, “There is Hope, There is Power,” enfatiza la acción colectiva y la organización — versos paralelos en español e inglés que afirman “Si se puede, Yes we can.”",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/7185229/cancionero-para-lavado-de-pies-jueves-santo-2023-local-87",
  },
  {
    id: "7181770",
    slug: "celebrando-cesar-chavez-en-cancion",
    title: {
      en: "Celebrating César Chávez in Song",
      es: "Celebrando a César Chávez en Canción",
    },
    date: "2023-03-31",
    dateDisplay: { en: "March 31, 2023", es: "31 de marzo de 2023" },
    excerpt: {
      en: "Two songs honoring César Chávez and the farmworker movement — “Huelga En General” and “Corrido de César Chávez,” both echoing “Sí Se Puede.”",
      es: "Dos canciones en honor a César Chávez y el movimiento campesino — “Huelga En General” y “Corrido de César Chávez,” ambas con el eco de “Sí Se Puede.”",
    },
    image: "/images/photos/francisco-city-hall-rally.webp",
    body: [
      {
        en: "“Huelga En General” (General Strike) — composed by Agustín Lira, lyrics by Agustín Lira and Luis Valdez. The Spanish and English versions chronicle the 1965 Delano grape strike, celebrating the moment Filipino workers walked out on September 8th, followed by Mexican workers two weeks later. The piece emphasizes worker solidarity and references César Chávez's leadership.",
        es: "“Huelga En General” — compuesta por Agustín Lira, letra de Agustín Lira y Luis Valdez. Las versiones en español e inglés narran la huelga de uvas de Delano de 1965, celebrando el momento en que los trabajadores filipinos se fueron a la huelga el 8 de septiembre, seguidos por los trabajadores mexicanos dos semanas después. La pieza enfatiza la solidaridad obrera y hace referencia al liderazgo de César Chávez.",
      },
      {
        en: "“Corrido de César Chávez” by José Luis Orozco. This corrido (traditional ballad) traces Chávez's birth in 1927 near Yuma, Arizona, documenting his organizing efforts across California's agricultural regions including Delano and Fresno, and his march to Sacramento demanding justice.",
        es: "“Corrido de César Chávez” de José Luis Orozco. Este corrido sigue el nacimiento de Chávez en 1927 cerca de Yuma, Arizona, documentando sus esfuerzos organizativos a través de las regiones agrícolas de California incluyendo Delano y Fresno, y su marcha a Sacramento exigiendo justicia.",
      },
      {
        en: "Both songs use the refrain “Sí Se Puede” and celebrate farmworker mobilization, strikes, and boycotts as instruments of social change.",
        es: "Ambas canciones usan el estribillo “Sí Se Puede” y celebran la movilización campesina, las huelgas y los boicots como instrumentos de cambio social.",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/7181770/celebrando-a-cesar-chavez-en-cancion-celebrating-cesar-chavez-in-song",
  },
  {
    id: "5643497",
    slug: "the-washing-machine",
    title: { en: "The Washing Machine", es: "The Washing Machine" },
    date: "2019-02-14",
    dateDisplay: { en: "February 14, 2019", es: "14 de febrero de 2019" },
    category: { en: "Reflection", es: "Reflección" },
    excerpt: {
      en: "From: Lessons my Grandmother taught me. Lent is like a washing machine — a time to come in with all we need cleaning.",
      es: "De: Lecciones que me enseñó mi abuela. La Cuaresma es como una lavadora — un tiempo para entrar con todo lo que necesita limpieza.",
    },
    image: "/images/Solo-Portraits/3.Solo-Portraits-Vertical.png",
    body: [
      { en: "From: Lessons my Grandmother taught me", es: "From: Lessons my Grandmother taught me" },
      { en: "Lent is like a washing machine", es: "Lent is like a washing machine" },
      { en: "A time to come in with all we need cleaning,", es: "A time to come in with all we need cleaning," },
      { en: "Face it and enjoy God's forgiveness", es: "Face it and enjoy God's forgiveness" },
      { en: "After the agitation of getting all the dirt out.", es: "After the agitation of getting all the dirt out." },
      { en: "But, the goal is not to get stuck in the dirt", es: "But, the goal is not to get stuck in the dirt" },
      { en: "The goal is to experience the Cleaning", es: "The goal is to experience the Cleaning" },
      { en: "In fact, every mass, not just lent", es: "In fact, every mass, not just lent" },
      { en: "should be experienced as a great cleaning", es: "should be experienced as a great cleaning" },
      { en: "Coming out feeling washed", es: "Coming out feeling washed" },
      { en: "Freed", es: "Freed" },
      { en: "Released", es: "Released" },
      { en: "Soaring with joy and gratefulness!!", es: "Soaring with joy and gratefulness!!" },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/5643497/the-washing-machine",
  },
  {
    id: "5524179",
    slug: "thanks-giving-and-retribution",
    title: { en: "Thanks-Giving and Retribution", es: "Thanks-Giving and Retribution" },
    date: "2018-11-22",
    dateDisplay: { en: "November 22, 2018", es: "22 de noviembre de 2018" },
    excerpt: {
      en: "If the “Thanks Giving” story goes that the original peoples helped the newcomer survive, it is only fitting that the newcomer give thanks: re-tribute; pay tribute to those who saved them.",
      es: "Si la historia de “Acción de Gracias” va de que los pueblos originarios ayudaron al recién llegado a sobrevivir, lo justo es que el recién llegado dé gracias: re-tribuya; rinda tributo a quienes le salvaron.",
    },
    image: "/images/photos/benito-juarez.webp",
    hasPodcast: true,
    body: [
      {
        en: "If the “Thanks Giving” story goes — that the original peoples helped the newcomer (“illegal immigrant”) survive, it is only fitting that the newcomer Give Thanks: re-tribute; pay tribute to those who saved them. One way to do it is to re-distribute the wealth the newcomer has amassed thanks to the original peoples.",
        es: "If the “Thanks Giving” story goes — that the original peoples helped the newcomer (“illegal immigrant”) survive, it is only fitting that the newcomer Give Thanks: re-tribute; pay tribute to those who saved them. One way to do it is to re-distribute the wealth the newcomer has amassed thanks to the original peoples.",
      },
      {
        en: "Then maybe, each year there should be a project — a political project, laws and budgets, orders of business, that follow the directives of First Nation thought and Practices, which respect each other's ways of living together in this land mass we call the United States.",
        es: "Then maybe, each year there should be a project — a political project, laws and budgets, orders of business, that follow the directives of First Nation thought and Practices, which respect each other's ways of living together in this land mass we call the United States.",
      },
      {
        en: "The fact is the “Indian” has given and continues to give. From the Original people, Benjamin Franklin took forms of sovereignty which formed the federal system of government we have today. Maslow, Rogers and so many other architects of modern Psychology learned their craft from careful study of indigenous people's form of healthy living. Even in modern times, it was the Navajo who enabled “allied” victories over the German-Italian-Japanese aggression, which finally lead to the end of World War II. And as a society around the world, people are turning to the healthy practices of the original peoples because of their proven record that sharing is a good thing.",
        es: "The fact is the “Indian” has given and continues to give. From the Original people, Benjamin Franklin took forms of sovereignty which formed the federal system of government we have today. Maslow, Rogers and so many other architects of modern Psychology learned their craft from careful study of indigenous people's form of healthy living. Even in modern times, it was the Navajo who enabled “allied” victories over the German-Italian-Japanese aggression, which finally lead to the end of World War II. And as a society around the world, people are turning to the healthy practices of the original peoples because of their proven record that sharing is a good thing.",
      },
      { en: "And the list goes on.", es: "And the list goes on." },
      {
        en: "But instead of gratitude, what we as a nation have developed has been an abusive, genocidal relationship of taking from First Nation people. Instead of Thanks Giving, we continue to see thievery on the side of the newcomer, who thinks this land belongs to him, simply because he has the ability to kill you.",
        es: "But instead of gratitude, what we as a nation have developed has been an abusive, genocidal relationship of taking from First Nation people. Instead of Thanks Giving, we continue to see thievery on the side of the newcomer, who thinks this land belongs to him, simply because he has the ability to kill you.",
      },
      {
        en: "And now there are borders dividing original peoples and business ventures that extract the goodness of the land and fracture the earth; all against the advice of the original people.",
        es: "And now there are borders dividing original peoples and business ventures that extract the goodness of the land and fracture the earth; all against the advice of the original people.",
      },
      {
        en: "So in your towns, counties, states, in the nation — let's make laws and practice Thanks-Giving by recognizing and following the leadership of the communities we have relegated to the apartheid system called reservations (South African apartheid was based on the U.S. reservation system). Let's listen, learn and respect their correct place of leadership.",
        es: "So in your towns, counties, states, in the nation — let's make laws and practice Thanks-Giving by recognizing and following the leadership of the communities we have relegated to the apartheid system called reservations (South African apartheid was based on the U.S. reservation system). Let's listen, learn and respect their correct place of leadership.",
      },
      {
        en: "This year we have the first Original Nations leader in Congress, who was just elected in Colorado. Let's make that a tradition and elect more indigenous leaders every year until they have a truly representative place in Congress, the Senate, the Presidency of this nation where First Nation people belong.",
        es: "This year we have the first Original Nations leader in Congress, who was just elected in Colorado. Let's make that a tradition and elect more indigenous leaders every year until they have a truly representative place in Congress, the Senate, the Presidency of this nation where First Nation people belong.",
      },
      {
        en: "Let us re-tribute First Nation peoples from the African Continent who were Kidnapped and forced to labor as part of the largest Human Trafficking Scheme the world has truly ever known. Let us abolish these useless borders that prohibit First Nation people from this continent from the ability to Migrate to and fro as we have done for millennia, but now (that we are called “immigrants”) are forbidden to do so. Why not erase these fictitious borders — the European Union has done it and they are flourishing.",
        es: "Let us re-tribute First Nation peoples from the African Continent who were Kidnapped and forced to labor as part of the largest Human Trafficking Scheme the world has truly ever known. Let us abolish these useless borders that prohibit First Nation people from this continent from the ability to Migrate to and fro as we have done for millennia, but now (that we are called “immigrants”) are forbidden to do so. Why not erase these fictitious borders — the European Union has done it and they are flourishing.",
      },
      {
        en: "See, the current U.S. capitalist plan simply does not work, but for a few, who “hold-up” in a crack house of leisure, at the expense of the many, whose lands are fractured, waters poisoned and health destroyed by extractive powers or military powers or drug powers — all in control of that leisurely group of crack addicts (or gold addicts).",
        es: "See, the current U.S. capitalist plan simply does not work, but for a few, who “hold-up” in a crack house of leisure, at the expense of the many, whose lands are fractured, waters poisoned and health destroyed by extractive powers or military powers or drug powers — all in control of that leisurely group of crack addicts (or gold addicts).",
      },
      {
        en: "It will always be up to the rest of us, who are looking for systems that put people and the earth before profits, to continue to organize ways of living practiced by those who saved these newcomers from assured death in the first place (well not really the first place, because this invasion is only 526 years young and whose end time has come).",
        es: "It will always be up to the rest of us, who are looking for systems that put people and the earth before profits, to continue to organize ways of living practiced by those who saved these newcomers from assured death in the first place (well not really the first place, because this invasion is only 526 years young and whose end time has come).",
      },
      {
        en: "Be a little thankful this thanks-giving and do more than eating turkey and having a break with your family and friends (which is a good thing). Recognize we owe the “Indian” our very existence and act accordingly.",
        es: "Be a little thankful this thanks-giving and do more than eating turkey and having a break with your family and friends (which is a good thing). Recognize we owe the “Indian” our very existence and act accordingly.",
      },
      { en: "All Respect, Relatives", es: "All Respect, Relatives" },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/5524179/thanks-giving-and-retribution",
  },
  {
    id: "4355807",
    slug: "save-san-francisco-99",
    title: {
      en: "Save San Francisco for and from the 99%",
      es: "Salvar a San Francisco para y desde el 99%",
    },
    date: "2016-09-03",
    dateDisplay: { en: "September 3, 2016", es: "3 de septiembre de 2016" },
    excerpt: {
      en: "Imagine a city-wide alliance — a People's campaign across political parties, religious and ethnic identities, across sectors, to save San Francisco for and from the 99%.",
      es: "Imagina una alianza ciudadana — una campaña del Pueblo a través de partidos políticos, identidades religiosas y étnicas, a través de sectores, para salvar a San Francisco para y desde el 99%.",
    },
    image: "/images/photos/city-square.png",
    hasPodcast: true,
    body: [
      {
        en: "Imagine a City-wide alliance — a People's campaign across political parties, religious and ethnic identities; across sectors to save San Francisco for and from the 99%.",
        es: "Imagina una alianza ciudadana — una campaña del Pueblo a través de partidos políticos, identidades religiosas y étnicas; a través de sectores, para salvar a San Francisco para y desde el 99%.",
      },
      {
        en: "As we enter the electoral political sphere, it is important to keep in mind what our goal is, as with everything we do. Healing is the goal. Our system in this country and in our city is completely out of balance, dangerous and harmful to us and to others. The murder of our children by Police and the sale of our seniors' homes from under them by unethical investors, the kicking out of working-class families from the city is more of the same that we are seeing across the country and around the world. We see it in Detroit, Ohio. Brazil was an embarrassing example as the world saw thousands of families being displaced from the Horto Favela during the Olympics.",
        es: "As we enter the electoral political sphere, it is important to keep in mind what our goal is, as with everything we do. Healing is the goal. Our system in this country and in our city is completely out of balance, dangerous and harmful to us and to others. The murder of our children by Police and the sale of our seniors' homes from under them by unethical investors, the kicking out of working-class families from the city is more of the same that we are seeing across the country and around the world. We see it in Detroit, Ohio. Brazil was an embarrassing example as the world saw thousands of families being displaced from the Horto Favela during the Olympics.",
      },
      {
        en: "How do we organize to turn this belligerent age of displacement into an age of mutual respect and sharing? In San Francisco, groups like the Cultural Action Network (CAN) have been doing a great job of identifying projects aimed at displacing community and offering creative solutions to keep the base of working people in the Mission district. We are running the Francisco Herrera for Supervisor of District 11 campaign to have one more progressive member on the board of supervisors and create enough power to force City Hall executives to listen to our communities before they listen and do the bidding of corporations.",
        es: "How do we organize to turn this belligerent age of displacement into an age of mutual respect and sharing? In San Francisco, groups like the Cultural Action Network (CAN) have been doing a great job of identifying projects aimed at displacing community and offering creative solutions to keep the base of working people in the Mission district. We are running the Francisco Herrera for Supervisor of District 11 campaign to have one more progressive member on the board of supervisors and create enough power to force City Hall executives to listen to our communities before they listen and do the bidding of corporations.",
      },
      {
        en: "We are creating a plan and a vision for San Francisco, as people around the country and around the world are also developing people-powered campaigns and people-first policies and budgetary practices. So let's continue putting people first in everything we do, because we are the People. There is no free market — but there can be a Fair Market place, and it can only happen with your participation and mine. Whether you are in a community organization, a neighborhood association, a political party, a revolutionary organization, a church, a combination of all of these, or running for a political position, let the logic of putting people first be the center of your objectives. Defend Dignity. Protect the Common Well-being: Healing.",
        es: "We are creating a plan and a vision for San Francisco, as people around the country and around the world are also developing people-powered campaigns and people-first policies and budgetary practices. So let's continue putting people first in everything we do, because we are the People. There is no free market — but there can be a Fair Market place, and it can only happen with your participation and mine. Whether you are in a community organization, a neighborhood association, a political party, a revolutionary organization, a church, a combination of all of these, or running for a political position, let the logic of putting people first be the center of your objectives. Defend Dignity. Protect the Common Well-being: Healing.",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/4355807/mo",
  },
  {
    id: "4262480",
    slug: "happy-holiday-revolutionaries",
    title: {
      en: "Happy Holiday — Revolutionaries / Feliz Día Revolucionario 7-4-2016",
      es: "Feliz Día Revolucionario 7-4-2016 / Happy Holiday — Revolutionaries",
    },
    date: "2016-07-04",
    dateDisplay: { en: "July 4, 2016", es: "4 de julio de 2016" },
    excerpt: {
      en: "On July 4, 1776, a group of revolutionaries declared independence from king George. The predatory spirit of 'ol king George continues — this time wearing the clothes of corporations.",
      es: "El 4 de julio de 1776 un grupo de revolucionarios se declaró independiente del rey Jorge. El espíritu depredador del viejo rey Jorge sigue — ahora con la ropa de las corporaciones.",
    },
    image: "/images/photos/francisco-singing-protest.webp",
    body: [
      {
        en: "On the fourth of July, 1776, a group of revolutionaries declared their independence from king George of England. A war was fought and a nation liberated itself from the yoke of a monarchy. Since then the social sickness of monarchy, oligarchy, domination continues to creep in to control the life of people who refuse to be dominated and struggle each day for our freedom in the simplest of forms — to be able to eat, have a dignified roof, relations and actions of quality; in other words, Life. But the predatory spirit of 'ol king George continues to want to dominate, this time by corporations. Millions of us celebrate that historic declaration with fireworks and games, food and drink and music, without realizing that the struggle continues and our responsibility is not now to become the very oppressor we once fought.",
        es: "El 4 de julio, 1776 un grupo de revolucionarios declaró que se separaban del rey Jorge de Inglaterra. Se peleó una guerra y se liberó una nación del yugo de una monarquía. Desde entonces la enfermedad social de monarquía, oligarquía, dominio social sigue queriendo dominar la vida de gente que rehúsa ser dominada y lucha cada día por su libertad en la forma más sencilla de poder comer, tener techo, acción y relaciones significativas en la vida; en otras palabras hacer vida. Pero el espíritu entrometido y depredador del rey Jorge sigue queriendo dominar, ahora a través de las ahora llamadas corporaciones. Millones celebramos con cohetes y juegos, comida y trago y música esa histórica declaración, sin darnos cuenta que esa lucha sigue y nuestra responsabilidad de no ser ahora nosotros el mismo opresor contra el cual antes luchamos.",
      },
      {
        en: "It is time to commit ourselves through music, poetry, and organizing to a quality of life and the common good — and to a constitutional amendment that separates corporation and state, just as church and state were separated.",
        es: "Es tiempo de comprometernos a través de la música, la poesía y la organización con una calidad de vida y el bien común — y con una enmienda constitucional que separe a la corporación del estado, así como antes se separó la iglesia del estado.",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/4262480/happy-holiday-revolutionaries-feliz-dia-revolucionario-7-4-2016",
  },
  {
    id: "4229141",
    slug: "amor-sin-papeles",
    title: { en: "Amor Sin Papeles", es: "Amor Sin Papeles" },
    date: "2016-06-14",
    dateDisplay: { en: "June 14, 2016", es: "14 de junio de 2016" },
    category: { en: "Songs", es: "Canciones" },
    hasAudio: true,
    hasPodcast: true,
    excerpt: {
      en: "“Learn to Love, Love to Learn, It never ends” (and always begins). Love without borders, in solidarity with the victims and survivors of the Orlando Massacre.",
      es: "“Aprende a amar, ama el aprender, nunca termina” (y siempre comienza). Amor sin fronteras, en solidaridad con las víctimas y sobrevivientes de la Masacre de Orlando.",
    },
    image: "/images/photos/francisco-portrait-guitar.webp",
    body: [
      {
        en: "“Learn to Love, Love to Learn, It never ends” (and always begins) — a quote attributed to Diamond Dave from San Francisco, with an addition from my uncle Louie: “and always begins.”",
        es: "“Aprende a amar, ama el aprender, nunca termina” (y siempre comienza) — una cita atribuida a Diamond Dave de San Francisco, con un agregado de mi tío Louie: “y siempre comienza.”",
      },
      {
        en: "Love without borders, in solidarity with the victims and survivors of the Orlando Massacre.",
        es: "Amor sin fronteras, en solidaridad con las víctimas y sobrevivientes de la Masacre de Orlando.",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/4229141/amor-sin-papeles--2",
  },

  // ─── Page 2 ───────────────────────────────────────────────────────
  {
    id: "4227611",
    slug: "disarm-homophobia",
    title: { en: "Disarm Homophobia", es: "Desarmar la Homofobia" },
    date: "2016-06-13",
    dateDisplay: { en: "June 13, 2016", es: "13 de junio de 2016" },
    excerpt: {
      en: "This recent massacre in Orlando, Florida calls us to stand with Lesbian, Gay, Transgender, Bisexual and Queer communities.",
      es: "Esta masacre reciente en Orlando, Florida nos llama a estar de pie junto a las comunidades Lésbicas, Gays, Transgénero, Bisexuales y Queer.",
    },
    image: "/images/Solo-Portraits/4.Solo-Portraits-Vertical.png",
    body: [
      {
        en: "This recent massacre in Orlando, Florida calls us to stand with Lesbian, Gay, Transgender, Bisexual and Queer communities.",
        es: "Esta masacre reciente en Orlando, Florida nos llama a estar de pie junto a las comunidades Lésbicas, Gays, Transgénero, Bisexuales y Queer.",
      },
      {
        en: "Read the rest of this entry on the original site — full text not yet captured in the migration.",
        es: "Lea el resto de esta entrada en el sitio original — el texto completo aún no fue capturado en la migración.",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/4227611/disarm-homophobia",
  },
  {
    id: "4075690",
    slug: "song-of-liberation",
    title: {
      en: "Song of Liberation — Canto de Liberación",
      es: "Canto de Liberación — Song of Liberation",
    },
    date: "2016-03-06",
    dateDisplay: { en: "March 6, 2016", es: "6 de marzo de 2016" },
    hasAudio: true,
    hasPodcast: true,
    excerpt: {
      en: "Whether singing with your children or as community at a rally, action for social justice, picket line, or a celebration of our sheroes and heroes — the music of Francisco is music of liberation.",
      es: "Sea cantando con tus hijos o como comunidad en una marcha, acción por la justicia social, piquete o celebración de nuestras heroínas y héroes — la música de Francisco es Canto de Liberación.",
    },
    image: "/images/photos/streetlights-sunset.png",
    body: [
      {
        en: "Whether it is singing with your children or as community at a rally, action for social justice, picket line, or a celebration of our sheroes and heroes the music of Francisco is music of liberation. Use it in your activities, give it as a present to a friend, buy the CDs and grant them to a friend for donating to your organization to inspire their own actions for liberation. The stories and games, memories, heroism of our people in MUSIC.",
        es: "Sea cantar con sus hij@s o comunidad en una marcha, piquete, carnaval o celebración de nuestr@s héroes y heroínas, la música de Francisco es Canto de Liberación. Usala en tus actividades, obséquealo a una amistad, presentalo como regalo de gracias por una donación a tu organización para inspirar acciones de liberación. Las historias, los juegos, las memorias de nuestro pueblo en Música.",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blogs/canciones-de-liberacion-songs-of-liberation/posts/4075690/song-of-liberation-canto-de-liberacion",
    commentCount: 764,
    comments: [
      { author: "Crystal Chapman", date: "Jul 19 2018 2:35 AM", body: "When I proceed this blog and I read this information then I consider this blog astronomy homework help importance. This information is surprising and illuminating for everyone who proceed this blog and read it." },
      { author: "Sentient Light", date: "May 22 2020 4:56 PM", body: "Great works. Thank you, blessing to your way and turn of the wrist. May we embrace again. For healing." },
      { author: "Faky", location: "Japan", date: "Jun 21 2020 7:33 PM", body: "Hello!" },
      { author: "Chubby Del Rosario", location: "Finland", date: "Jun 21 2020 11:16 PM", body: "As we all know, there are ways we can do to help a certain cause. If you cannot find one, then make one! I am glad that these CDs are our ways to help the whole community. I am hoping that more projects will be done so all of us could participate in it. As a writer, I see my talent as my way to help. Through writing and buy dissertations about this matter, I can help." },
      { author: "Anonymous", location: "United States", date: "Aug 23 2020 3:10 PM", body: "This is a really decent site post. Not very numerous individuals would really, the way you simply did. I am truly inspired that there is such a great amount of data about this subject write my college paper have been revealed and you've put forth a valiant effort, with so much class. On the off chance that needed to know more about green smoke surveys, than by all methods come in and check our stuff." },
      { author: "Anthony Anson", location: "UK", date: "Aug 24 2020 12:54 AM", body: "I might be also a part of the music of liberation because I love music and also sing it as an activity. You have mentioned that one can use it in the activities so, I mostly do this when I have to write my cipd assignment for my customers. It was the time when I get tired and then to energize I usually do this activity." },
      { author: "Allen", location: "USA", date: "Aug 26 2020 2:44 AM", body: "One should identify the goal of the paper for composing an impeccable research paper. In this context, one must have an idea about the two genres of research paper. https://24hwritemyessay.com/" },
      { author: "Jonathan Alex", location: "United Kingdom", date: "Aug 31 2020 12:29 AM", body: "This is the good strategy when you combine with all the students and create a new song for your heroes and perform in-front of all the peoples what a scene it was! phd data collection services" },
      { author: "Johny Martin", location: "United States", date: "Aug 31 2020 1:00 PM", body: "Songs making is not an easy thing it takes a lot of time then it will reach the level to sing in-front of people. Movierulz Websites" },
      { author: "James Bishop", location: "Alabama", date: "Sep 1 2020 3:03 AM", body: "As a cv writer, I want to tell you guys that I have been experiencing some issues with my work. I cannot concentrate towards my daily task. Maybe by the fact that I don't like music and right across my office space, there is a gym and the loud noise of music disturbs me a lot. What should I do?" },
      { author: "David", location: "Dubai", date: "Sep 1 2020 4:07 AM", body: "Glad to know about your activities for the Song of Liberation, actually my activity is to maintain a top essay writing for my assignments but unfortunately I'm unable to do it nowadays due to some of my personal issues." },
      { author: "Andy", location: "USA", date: "Sep 3 2020 10:29 AM", body: "the desperate artist" },
      { author: "nida amber", location: "Dubai", date: "Sep 9 2020 11:54 PM", body: "google" },
      { author: "Masonrobert", location: "United States", date: "Sep 10 2020 12:00 AM", body: "I love music and also want to make my own creation of the best online Copy Editor agency website. This is my motive to create the beautiful sound of these words, actually, this is for students who looking for motivation sounds." },
      { author: "Craig", location: "United States", date: "Sep 11 2020 2:16 AM", body: "Thank you for sharing so many ideas!" },
      { author: "Mitchell", location: "United States", date: "Sep 11 2020 2:19 AM", body: "You are suggesting an interesting thought, I'd say. https://marvelousessays.co.uk/online-dissertation-abstract-writing-service.html" },
      { author: "Elly", location: "United States", date: "Sep 18 2020 1:21 AM", body: "Good to hear that! https://marvelousessay.org/let-us-impress-you-with-our-dissertation-hypothesis-writing-services.html" },
      { author: "shawnkemp", location: "United States", date: "Sep 22 2020 8:05 AM", body: "I believe this will help your website become more organized because you have decided to set a part on this site for the inquiries regarding tax and as well https://www.topcelebrityjackets.com/yellowstone-beth-dutton-blue-jacket.html as the helpful discussions. To be honest, this is one of the few sites that are doing this kind of strategy. Also, I think that this will not only benefit your clients or the potential ones but you most especially because you will be able to see the questions easier." },
      { author: "Anonymous", location: "United States", date: "Sep 24 2020 7:34 AM", body: "I will always let you and your words become part of my day because you never know how much you make my day happier and more complete. There are even times when I feel so online assignment writing down but I will feel better right after checking your blogs. You have made me feel so good about myself all the time and please know that I do appreciate everything that you have" },
      { author: "Anonymous", location: "United States", date: "Sep 25 2020 11:08 AM", body: "I believe this will help your website become more organized because you have decided to set a part on this site for the inquiries regarding tax and as well Yellowstone Blue Jacket s the helpful discussions. To be honest, this is one of the few sites that are doing this kind of strategy. Also, I think that this will not only benefit your clients or the potential ones but you most especially because you will be able to see the questions easier." },
      { author: "lauratrott", location: "United States", date: "Oct 4 2020 11:47 PM", body: "This is a really decent site post. Not very numerous individuals would really, the way you simply did. I am truly inspired that there is such a great amount of https://www.uhjackets.com/cyberpunk-2077-samurai-leather-jacket data about this subject have been revealed and you've put forth a valiant effort, with so much class. On the off chance that needed to know more about green smoke surveys, than by all methods come in and check our stuff." },
      { author: "Anonymous", location: "United States", date: "Oct 9 2020 7:33 AM", body: "Really a great work this like news shares will make a good support from online. We can choose the experts from online by checking their quality of work. Lee Trim Parka Jacket With out this check any one can choose the expert from a top essay writing services provider from online." },
      { author: "Anonymous", location: "United States", date: "Oct 12 2020 8:27 AM", body: "Thanks for such wonderful blog that looks pretty different, I would suggest you please make a proper plan for your blog and start professional blogging as a career, https://www.essayhelperuk.co.uk/literature-essay One day you would be smart enough to earn some money, wishing you a best of luck my friend, Thanks a lot for your nice support and love." },
      { author: "Anonymous", location: "Pakistan", date: "Oct 12 2020 8:28 AM", body: "Nice post!! Your positive thinking is so helpful to me. I was looking for something like this…, hopefully you will keep posting such blogs, https://www.assignmentcrux.co.uk/law-assignment Thank you very much for this blog!!!" },
      { author: "David Matthews", location: "UK", date: "Oct 17 2020 7:54 AM", body: "Fantastic, You can certainly present this to your friend or fellow, Like they do to https://essaysnassignments.co.uk/assignment-service/" },
    ],
  },
  {
    id: "3969269",
    slug: "nuevo-sol-letra-lyrics",
    title: {
      en: "Nuevo Sol (Letra/Lyrics) ©℗ Francisco Herrera 2008",
      es: "Nuevo Sol (Letra/Lyrics) ©℗ Francisco Herrera 2008",
    },
    date: "2016-01-02",
    dateDisplay: { en: "January 2, 2016", es: "2 de enero de 2016" },
    category: { en: "Songs", es: "Canciones" },
    excerpt: {
      en: "The lyrics to “Nuevo Sol” — a celebration of the rising of the migrant people, in Spanish and English.",
      es: "La letra de “Nuevo Sol” — una celebración del surgimiento del pueblo migrante, en español e inglés.",
    },
    image: "/images/albums/Honor-Migrante.png",
    body: [
      {
        en: "Full bilingual lyrics for “Nuevo Sol” — read the complete text on the original site.",
        es: "Letra bilingüe completa de “Nuevo Sol” — lea el texto completo en el sitio original.",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/3969269/nuevo-sol-letra-lyrics-c-p-francisco-herrera-2008",
  },
  {
    id: "892593",
    slug: "nuevo-sol-notes",
    title: { en: "Nuevo Sol — Notes", es: "Nuevo Sol — Notas" },
    date: "2013-06-06",
    dateDisplay: { en: "June 6, 2013", es: "6 de junio de 2013" },
    excerpt: {
      en: "A composition celebrating “el surgimiento del pueblo migrante” — the emergence of the migrant people.",
      es: "Una composición que celebra “el surgimiento del pueblo migrante.”",
    },
    image: "/images/albums/Posada-Sin-Fronteras.png",
    body: [
      {
        en: "A composition celebrating the emergence of the migrant people. Read the full notes on the original site.",
        es: "Una composición que celebra el surgimiento del pueblo migrante. Lea las notas completas en el sitio original.",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/892593/nuevo-sol-notes",
  },
  {
    id: "101494",
    slug: "entre-el-lodo-del-racismo",
    title: {
      en: "Entre el lodo del racismo anti-inmigrante, saliendo adelante",
      es: "Entre el lodo del racismo anti-inmigrante, saliendo adelante",
    },
    date: "2011-06-01",
    dateDisplay: { en: "June 1, 2011", es: "1 de junio de 2011" },
    excerpt: {
      en: "On pushing forward through the mud of anti-immigrant racism — a Spanish-language reflection.",
      es: "Sobre seguir adelante a través del lodo del racismo anti-inmigrante — una reflexión en español.",
    },
    image: "/images/photos/francisco-singing-protest.webp",
    body: [
      {
        en: "Read the full reflection on the original site.",
        es: "Lea la reflexión completa en el sitio original.",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/101494/entre-el-lodo-del-racismo-anti-inmigrante-saliendo-adelante",
  },
  {
    id: "86277",
    slug: "mujeres-fuertes",
    title: {
      en: "Mujeres Fuertes — for María Christina D. Herrera",
      es: "Mujeres Fuertes — para María Christina D. Herrera",
    },
    date: "2010-10-10",
    dateDisplay: { en: "October 10, 2010", es: "10 de octubre de 2010" },
    excerpt: {
      en: "A song honoring strong women — dedicated to María Christina D. Herrera.",
      es: "Una canción en honor a las mujeres fuertes — dedicada a María Christina D. Herrera.",
    },
    image: "/images/albums/Fuerza-de-la-Raíz.png",
    body: [
      {
        en: "Read the full notes on the original site.",
        es: "Lea las notas completas en el sitio original.",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/86277/mujeres-fuertes-maria-christina-d-herrera",
  },
  {
    id: "81445",
    slug: "palomita-de-la-ciudad",
    title: {
      en: "Palomita de la Ciudad — Immigrants Pay a High Price to Enrich This Country and Their Own",
      es: "Palomita de la Ciudad — Las/os inmigrantes pagan un alto precio para enriquecer este país y el suyo",
    },
    date: "2010-07-19",
    dateDisplay: { en: "July 19, 2010", es: "19 de julio de 2010" },
    excerpt: {
      en: "A song about the high price immigrants pay to enrich both their adopted country and their home country.",
      es: "Una canción sobre el alto precio que las y los inmigrantes pagan para enriquecer tanto su país adoptivo como su país de origen.",
    },
    image: "/images/albums/Francisco-y-L@s-NIñ@s.png",
    body: [
      {
        en: "Read the full notes on the original site.",
        es: "Lea las notas completas en el sitio original.",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/81445/palomita-de-la-ciudad-immigrants-pay-a-hig-price-to-enrich-this-country-and-their-own",
  },
  {
    id: "80495",
    slug: "one-message-to-those-who-attack-immigrants",
    title: {
      en: "One Message to Those Who Would Attack Immigrants",
      es: "Mensaje a quienes atacan a inmigrantes",
    },
    date: "2010-06-29",
    dateDisplay: { en: "June 29, 2010", es: "29 de junio de 2010" },
    excerpt: {
      en: "A direct message — bilingual — to those who would attack immigrants.",
      es: "Un mensaje directo — bilingüe — a quienes atacarían a las y los inmigrantes.",
    },
    image: "/images/photos/francisco-city-hall-rally.webp",
    body: [
      {
        en: "Read the full message on the original site.",
        es: "Lea el mensaje completo en el sitio original.",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/80495/one-message-to-those-who-would-attack-immigrants-mensaje-a-quienes-atacan-a-inmigrantes",
  },

  // ─── Page 3 (oldest) ──────────────────────────────────────────────
  {
    id: "80425",
    slug: "pueblo-pueblo",
    title: {
      en: "Pueblo Pueblo — A Concert Opening Refrain",
      es: "Pueblo Pueblo — Refrán de apertura de concierto",
    },
    date: "2010-06-28",
    dateDisplay: { en: "June 28, 2010", es: "28 de junio de 2010" },
    excerpt: {
      en: "“I always like to open a concert with a sort of musical roll-call.” The song evolved from improvised verses into structured lyrics inspired by street vendors.",
      es: "“Siempre me gusta abrir un concierto con una especie de pase de lista musical.” La canción evolucionó de versos improvisados a una letra estructurada, inspirada en las vendedoras y vendedores ambulantes.",
    },
    image: "/images/photos/francisco-festival-performance.webp",
    body: [
      {
        en: "I always like to open a concert with a sort of musical “roll call.” The song uses this approach to create audience connection and unity, with verses that grew from improvised lines into structured lyrics inspired by street vendors.",
        es: "Siempre me gusta abrir un concierto con una especie de pase de lista musical. El canto usa este recurso para crear conexión y unidad con el público, con versos que crecieron de líneas improvisadas a una letra estructurada, inspirada en las vendedoras y vendedores ambulantes.",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/80425/pueblo-pueblo-started-as-an-opening-refrain-for-concerts",
  },
  {
    id: "79685",
    slug: "dignidad-trabajadora-carrito-de-fruta",
    title: {
      en: "La Dignidad Trabajadora — “Carrito de Fruta”",
      es: "La Dignidad Trabajadora — “Carrito de Fruta”",
    },
    date: "2010-06-15",
    dateDisplay: { en: "June 15, 2010", es: "15 de junio de 2010" },
    excerpt: {
      en: "Song #2 — about the dignity of all street vendors, walking or stationed daily on city and town streets, many facing regulatory challenges while pursuing their livelihoods.",
      es: "Canto #2 — sobre la dignidad de todas y todos los vendedores ambulantes, caminando o instalados a diario en las calles de pueblos y ciudades, muchos enfrentando trabas regulatorias para sostener su sustento.",
    },
    image: "/images/albums/Nuestros-Niños-Son-Sagrado.png",
    body: [
      {
        en: "Read the full notes on the original site.",
        es: "Lea las notas completas en el sitio original.",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/79685/la-dignidad-trabajadora-working-dignity-carrito-de-fruta",
  },
  {
    id: "75206",
    slug: "why-honor-migrante",
    title: { en: "Why HONOR MIGRANTE — ¿Por qué?", es: "Por qué HONOR MIGRANTE" },
    date: "2010-05-15",
    dateDisplay: { en: "May 15, 2010", es: "15 de mayo de 2010" },
    excerpt: {
      en: "“The migrant honors the land where she or he steps.” The album functions as a tribute to migrant contributions, with the opening track serving as an anthem comparable to historical freedom songs.",
      es: "“La o el migrante honra la tierra que pisa.” El álbum funciona como un homenaje al aporte de la gente migrante, con la pista de apertura como un himno comparable a los cantos históricos de libertad.",
    },
    image: "/images/albums/Honor-Migrante.png",
    body: [
      {
        en: "The migrant honors the land where she or he steps. The album functions as a tribute to migrant contributions, and the opening track serves as an anthem comparable to historical freedom songs.",
        es: "La o el migrante honra la tierra que pisa. El álbum funciona como un homenaje al aporte de la gente migrante, y la pista de apertura sirve como un himno comparable a los cantos históricos de libertad.",
      },
    ],
    originalUrl: "https://franciscoherreramusic.com/blog/blog/75206/why-honor-migrante-por-que",
  },
];

/** Find a single post by slug. Returns undefined if not found. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Total number of pages given POSTS_PER_PAGE. */
export function getTotalPages(): number {
  return Math.max(1, Math.ceil(blogPosts.length / POSTS_PER_PAGE));
}

/** Slice the post list to a single page (1-indexed). */
export function getPagePosts(page: number): BlogPost[] {
  const start = (page - 1) * POSTS_PER_PAGE;
  return blogPosts.slice(start, start + POSTS_PER_PAGE);
}
