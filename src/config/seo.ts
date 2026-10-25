import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { faqItems } from "@/config/faq";
import { getStartingPrice } from "@/config/pricing";
import { activeSocialLinks } from "@/config/social";
import { getSeoLandingPage, seoLandingPages } from "@/config/seo-pages";

export { getSeoLandingPage, seoLandingPages } from "@/config/seo-pages";
export type { SeoLandingPage } from "@/config/seo-pages";

/** Bump when indexable marketing copy changes so sitemap lastmod stays honest. */
export const seoContentUpdated = new Date("2026-10-10T00:00:00.000Z");

/** Target queries — gym management SaaS (not lifestyle/store). */
export const seoKeywords = [
  "FITZENIX",
  "fitzenix.app",
  "fitzenix gym management",
  "gym management software",
  "gym management software India",
  "gym management app",
  "gym management app India",
  "best gym management software India",
  "gym owner software",
  "gym member management software",
  "gym attendance software",
  "gym attendance app",
  "QR check-in for gym",
  "gym billing software",
  "gym billing software India",
  "gym membership software",
  "gym CRM software",
  "fitness studio management software",
  "fitness center management software",
  "small gym management software",
  "trainer management app",
  "gym owner app India",
] as const;

export const defaultTitle =
  "FITZENIX — Gym Management Software & App for Indian Gym Owners";

export const defaultDescription =
  "FITZENIX (fitzenix.app) is gym management software for Indian gym owners — members, QR attendance, membership billing, payments, trainer & member apps. 14-day free trial. Not a shopping store.";

export const brandDisambiguation =
  "FITZENIX on fitzenix.app is gym management software (SaaS) for gym owners. It is not a clothing or lifestyle shopping website.";

export const ogImagePath = "/images/og/og-default.png";

export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildOrganizationJsonLd() {
  const sameAs = activeSocialLinks.map((link) => link.href);
  return {
    "@type": "Organization",
    "@id": `${absoluteUrl()}/#organization`,
    name: siteConfig.name,
    alternateName: ["Fitzenix", "Fitzenix Gym Management", "fitzenix.app"],
    legalName: siteConfig.name,
    url: absoluteUrl(),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/logo/fitzenix-mark.png"),
      width: 512,
      height: 512,
    },
    image: absoluteUrl("/images/logo/fitzenix-mark.png"),
    email: siteConfig.contactEmail,
    description: `${siteConfig.description} ${brandDisambiguation}`,
    slogan: siteConfig.tagline,
    foundingDate: "2025",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: "IN",
      streetAddress: siteConfig.address.line,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    knowsAbout: [
      "Gym management software",
      "Gym membership management",
      "QR gym attendance",
      "Gym billing software",
      "Gym CRM",
      "Fitness studio management",
    ],
    sameAs,
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${absoluteUrl()}/#website`,
    url: absoluteUrl(),
    name: siteConfig.name,
    alternateName: ["Fitzenix Gym Management Software", "fitzenix.app"],
    description: defaultDescription,
    publisher: { "@id": `${absoluteUrl()}/#organization` },
    inLanguage: "en-IN",
  };
}

export function buildSoftwareApplicationJsonLd() {
  return {
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl()}/#software`,
    name: "FITZENIX Gym Management Software",
    alternateName: "FITZENIX",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Android, iOS, Web",
    description: defaultDescription,
    url: absoluteUrl(),
    image: absoluteUrl(ogImagePath),
    downloadUrl: absoluteUrl(),
    installUrl: absoluteUrl("/login"),
    offers: {
      "@type": "Offer",
      price: "499",
      priceCurrency: "INR",
      lowPrice: String(startingPrice),
      highPrice: "1999",
      offerCount: 3,
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/#pricing"),
    },
    author: { "@id": `${absoluteUrl()}/#organization` },
    featureList: [
      "Member management",
      "QR check-in attendance",
      "Gym payment tracking",
      "Owner app",
      "Trainer app",
      "Member app",
      "Reports and CRM",
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Gym owners and fitness studio operators in India",
    },
    publisher: { "@id": `${absoluteUrl()}/#organization` },
    brand: { "@id": `${absoluteUrl()}/#organization` },
  };
}

export function buildFaqJsonLd() {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl()}/#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationJsonLd(),
      buildWebsiteJsonLd(),
      buildSoftwareApplicationJsonLd(),
      buildFaqJsonLd(),
    ],
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(items[items.length - 1]?.path ?? "/")}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

const googleBot: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export function buildLandingMetadata(slug: string): Metadata {
  const page = getSeoLandingPage(slug);
  if (!page) {
    throw new Error(`Unknown SEO landing page: ${slug}`);
  }

  const path = `/${page.slug}`;

  return {
    title: { absolute: page.title },
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: path,
      languages: { "en-IN": path, "x-default": path },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: path,
      title: page.title,
      description: page.description,
      siteName: siteConfig.name,
      images: [{ url: ogImagePath, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogImagePath],
    },
    robots: googleBot,
  };
}

export function buildLandingJsonLd(slug: string) {
  const page = getSeoLandingPage(slug);
  if (!page) {
    throw new Error(`Unknown SEO landing page: ${slug}`);
  }

  const path = `/${page.slug}`;
  const pageUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationJsonLd(),
      buildWebsiteJsonLd(),
      buildSoftwareApplicationJsonLd(),
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.title,
        description: page.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${absoluteUrl()}/#website` },
        about: { "@id": `${absoluteUrl()}/#software` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        primaryImageOfPage: absoluteUrl(ogImagePath),
        dateModified: seoContentUpdated.toISOString(),
      },
      buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: page.breadcrumb, path },
      ]),
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        url: pageUrl,
        mainEntity: page.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

export function relatedSeoPages(slug: string) {
  return seoLandingPages.filter((page) => page.slug !== slug);
}
