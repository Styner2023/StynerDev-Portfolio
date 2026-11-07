import { StubPage } from "@/components/layout/StubPage";
import { getLang } from "@/lib/i18n-server";

export default async function PensamientosPage() {
  const lang = await getLang();

  return (
    <StubPage
      lang={lang}
      title={{ en: "Pensamientos", es: "Pensamientos" }}
      heroImage="/images/client-sent-images/IMG_0139.jpeg"
      imagePosition="center"
      watermark={{ en: "Reflexión", es: "Reflexión" }}
      intro={{
        en: "Reflections in Spanish — notes from the road, from the altar, from the kitchen table.",
        es: "Reflexiones en español — notas del camino, del altar, de la mesa de la cocina.",
      }}
    />
  );
}
