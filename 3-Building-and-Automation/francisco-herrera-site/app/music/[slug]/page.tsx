import { StubPage } from "@/components/layout/StubPage";
import { getLang } from "@/lib/i18n-server";

type Params = Promise<{ slug: string }>;

export default async function AlbumPage({ params }: { params: Params }) {
  const { slug } = await params;
  const lang = await getLang();

  return (
    <StubPage
      lang={lang}
      title={{ en: "Album", es: "Álbum" }}
      detail={`${lang === "en" ? "Album" : "Álbum"}: ${slug} — ${lang === "en" ? "coming soon" : "próximamente"}`}
    />
  );
}
