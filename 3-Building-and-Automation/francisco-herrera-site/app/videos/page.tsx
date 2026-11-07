import { StubPage } from "@/components/layout/StubPage";
import { getLang } from "@/lib/i18n-server";

export default async function VideosPage() {
  const lang = await getLang();

  return (
    <StubPage
      lang={lang}
      title={{ en: "Videos", es: "Videos" }}
      heroImage="/images/client-sent-images/E705060C-6839-457C-91D0-76C6A08AAEA4.jpeg"
      imagePosition="center"
      watermark={{ en: "En Escena", es: "En Escena" }}
      intro={{
        en: "Performances, rallies, and recordings — fragments of decades on stage and on the street.",
        es: "Presentaciones, marchas y grabaciones — fragmentos de décadas en el escenario y en la calle.",
      }}
    />
  );
}
