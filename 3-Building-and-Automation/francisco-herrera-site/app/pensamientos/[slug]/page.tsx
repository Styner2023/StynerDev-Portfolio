import { StubPage } from "@/components/layout/StubPage";
import { getLang } from "@/lib/i18n-server";

type Params = Promise<{ slug: string }>;

export default async function PensamientoPage({ params }: { params: Params }) {
  const { slug } = await params;
  const lang = await getLang();

  return (
    <StubPage
      lang={lang}
      title={{ en: "Pensamiento", es: "Pensamiento" }}
      detail={`Pensamiento: ${slug} — ${lang === "en" ? "coming soon" : "próximamente"}`}
    />
  );
}
