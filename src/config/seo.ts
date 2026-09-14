import { siteConfig } from "@/config/site";
import { faqItems } from "@/config/faq";
import { getStartingPrice } from "@/config/pricing";

/** Target queries for gym management software / app (India-first). */
export const seoKeywords = [
  "gym management software",
  "gym management app",
  "gym management software India",
  "gym owner software",
  "fitness studio management software",
  "gym member management software",
  "gym attendance app",
  "QR check-in for gym",
  "gym billing software",
  "gym CRM software",
  "fitness center management app",
  "best gym management software",
  "gym membership management",
  "trainer management app",
  "FITZENIX",
] as const;

export const defaultTitle =
  "Gym Management Software & App for Owners | FITZENIX";

export const defaultDescription =
  "FITZENIX is gym management software for Indian gym owners — members, QR attendance, payments, trainers and member apps in one platform. Start free for 14 days.";

export const ogImagePath = "/images/hero/hero_mobile.png";

export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildOrganizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${absoluteUrl()}/#organization`,
    name: siteConfig.name,
    url: absoluteUrl(),
    logo: absoluteUrl("/images/logo/fitzenix_logo.png"),
    email: siteConfig.contactEmail,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: "IN",
      streetAddress: `${siteConfig.address.locality}, ${siteConfig.address.city}`,
    },
    sameAs: [] as string[],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${absoluteUrl()}/#website`,
    url: absoluteUrl(),
    name: siteConfig.name,
    description: defaultDescription,
    publisher: { "@id": `${absoluteUrl()}/#organization` },
    inLanguage: "en-IN",
  };
}

export function buildSoftwareApplicationJsonLd() {
  const startingPrice = getStartingPrice();
  return {
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl()}/#software`,
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Gym Management Software",
    operatingSystem: "Android, iOS, Web",
    description: defaultDescription,
    url: absoluteUrl(),
    image: absoluteUrl(ogImagePath),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: String(startingPrice),
      highPrice: "1999",
      offerCount: 3,
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "Member management",
      "QR check-in attendance",
      "Gym payment tracking",
      "Owner app",
      "Trainer app",
      "Member app",
      "Reports and CRM",
    ],
    publisher: { "@id": `${absoluteUrl()}/#organization` },
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
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
