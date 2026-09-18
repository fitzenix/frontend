import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { SeoLandingView } from "@/components/seo/SeoLandingView";
import { siteConfig } from "@/config/site";
import {
  buildBreadcrumbJsonLd,
  buildSoftwareApplicationJsonLd,
  getSeoLandingPage,
  ogImagePath,
} from "@/config/seo";

const page = getSeoLandingPage("gym-management-app")!;

export const metadata: Metadata = {
  title: { absolute: `${page.title} | ${siteConfig.name}` },
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

export default function GymManagementAppPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            buildSoftwareApplicationJsonLd(),
            buildBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Gym Management App", path: `/${page.slug}` },
            ]),
          ],
        }}
      />
      <SeoLandingView page={page} />
    </>
  );
}
