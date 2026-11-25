import { JsonLd } from "@/components/seo/JsonLd";
import { SeoLandingView } from "@/components/seo/SeoLandingView";
import { buildLandingJsonLd, getSeoLandingPage } from "@/config/seo";

export function SeoLandingRoute({ slug }: { slug: string }) {
  const page = getSeoLandingPage(slug);
  if (!page) return null;

  return (
    <>
      <JsonLd data={buildLandingJsonLd(slug)} />
      <SeoLandingView page={page} />
    </>
  );
}
