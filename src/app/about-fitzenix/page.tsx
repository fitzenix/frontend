import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { SeoLandingView } from "@/components/seo/SeoLandingView";
import { siteConfig } from "@/config/site";
import {
  buildBreadcrumbJsonLd,
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  getSeoLandingPage,
  ogImagePath,
} from "@/config/seo";

const page = getSeoLandingPage("about-fitzenix")!;

export const metadata: Metadata = {
  title: { absolute: `${page.title}` },
  description: page.description,
  keywords: page.keywords,
  alternates: { canonical: `/${page.slug}` },
  openGraph: {
    title: page.title,
    description: page.description,
    url: `/${page.slug}`,
    images: [{ url: ogImagePath, width: 1200, height: 630, alt: page.title }],
  },
};

export default function AboutFitzenixPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            buildOrganizationJsonLd(),
            buildSoftwareApplicationJsonLd(),
            buildBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "About FITZENIX", path: `/${page.slug}` },
            ]),
          ],
        }}
      />
      <SeoLandingView page={page} />
    </>
  );
}
