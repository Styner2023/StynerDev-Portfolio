import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AlbumPage } from "@/components/sections/AlbumPage";
import { StubPage } from "@/components/layout/StubPage";
import { storeContent } from "@/lib/content/store";
import { getLang } from "@/lib/i18n-server";

type Params = Promise<{ slug: string }>;

export default async function ProductPage({ params }: { params: Params }) {
  const lang = await getLang();

  const { slug } = await params;

  const release = storeContent.featured.releases.find((r) => r.slug === slug);
  if (release) {
    return (
      <>
        <Header lang={lang} />
        <main>
          <AlbumPage release={release} lang={lang} />
        </main>
        <Footer lang={lang} />
      </>
    );
  }

  const catalogItem = storeContent.catalog.items.find((i) => i.slug === slug);
  if (catalogItem) {
    return (
      <StubPage
        title={catalogItem.title}
        detail={`Full album page for "${catalogItem.title.en}" — coming soon`}
        lang={lang}
      />
    );
  }

  notFound();
}
