// Homepage composition matches Guitare templates/index.json `order`:
//   slideshow → home-deal-banner → home-custom-section →
//   home-product-carousel → home-video-banner → home-grid-banner →
//   home-featured-blog
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { DealBanner } from "@/components/sections/DealBanner";
import { CustomSection } from "@/components/sections/CustomSection";
import { Gallery } from "@/components/sections/Gallery";
import { UniqueCollections } from "@/components/sections/UniqueCollections";
import { ProductCarousel } from "@/components/sections/ProductCarousel";
import { VideoBanner } from "@/components/sections/VideoBanner";
import { PlayAlong } from "@/components/sections/PlayAlong";
import { FeaturedSongs } from "@/components/sections/FeaturedSongs";
import { SongOfLiberation } from "@/components/sections/SongOfLiberation";
import { GridBanner } from "@/components/sections/GridBanner";
import { Companeros } from "@/components/sections/Companeros";
import { StageBanner } from "@/components/sections/StageBanner";
import { PastHighlights } from "@/components/sections/PastHighlights";
import { Saludos } from "@/components/sections/Saludos";
import { Voicemail } from "@/components/sections/Voicemail";
import { PullQuote } from "@/components/sections/PullQuote";
import { Donate } from "@/components/sections/Donate";
import { FeaturedBlog } from "@/components/sections/FeaturedBlog";
import { guitareHome } from "@/lib/content/home";
import { homepageHighlights, pastEvents } from "@/lib/content/shows";
import { getLang } from "@/lib/i18n-server";

export default async function HomePage() {
  const lang = await getLang();

  return (
    <>
      <Header lang={lang} />
      <main>
        <HeroSlideshow slides={guitareHome.hero} lang={lang} autoplay />
        <DealBanner content={guitareHome.dealBanner} lang={lang} />
        <CustomSection content={guitareHome.customSection} lang={lang} />
        <Gallery content={guitareHome.gallery} lang={lang} />
        <UniqueCollections content={guitareHome.uniqueCollections} lang={lang} />
        <ProductCarousel content={guitareHome.productCarousel} lang={lang} />
        <StageBanner
          lang={lang}
          image="/images/facebook/2.png"
          imageAlt={{
            en: "Francisco J. Herrera performing on stage with a fellow musician",
            es: "Francisco J. Herrera tocando en escena con un compañero",
          }}
          watermark={{ en: "Compañer@s", es: "Compañer@s" }}
        />
        <VideoBanner content={guitareHome.videoBanner} lang={lang} />
        <PlayAlong content={guitareHome.playAlong} lang={lang} />
        <FeaturedSongs content={guitareHome.featuredSongs} lang={lang} />
        <SongOfLiberation content={guitareHome.songOfLiberation} lang={lang} />
        <GridBanner content={guitareHome.gridBanner} lang={lang} />
        <Companeros content={guitareHome.companeros} lang={lang} />
        <StageBanner lang={lang} />
        <PastHighlights highlights={homepageHighlights} totalCount={pastEvents.length} lang={lang} />
        <Saludos content={guitareHome.saludos} lang={lang} />
        <Voicemail content={guitareHome.voicemail} lang={lang} />
        <PullQuote content={guitareHome.pullQuote} lang={lang} />
        <Donate content={guitareHome.donate} lang={lang} />
        <FeaturedBlog content={guitareHome.featuredBlog} lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
