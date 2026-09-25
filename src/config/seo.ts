import { siteConfig } from "@/config/site";
import { faqItems } from "@/config/faq";

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

export const defaultTitle = "FITZENIX | Gym Management Software & App for Gym Owners";

export const defaultDescription =
  "FITZENIX is a gym management software and mobile app for managing members, attendance, trainers, memberships, payments and daily gym operations. Start your 14-day free trial. Plans from ₹499/month.";

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
    name: "Fitzenix",
    url: `${absoluteUrl()}/`,
    logo: absoluteUrl("/images/logo/Fitzenix.png"),
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
    sameAs: [...siteConfig.socialProfiles],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${absoluteUrl()}/#website`,
    url: `${absoluteUrl()}/`,
    name: "Fitzenix",
    description: defaultDescription,
    publisher: { "@id": `${absoluteUrl()}/#organization` },
    inLanguage: "en-IN",
  };
}

export function buildSoftwareApplicationJsonLd() {
  return {
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl()}/#software`,
    name: "Fitzenix",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Android, iOS, Web",
    description:
      "FITZENIX is gym management software for managing members, attendance, trainers, memberships and payments.",
    url: `${absoluteUrl()}/`,
    offers: {
      "@type": "Offer",
      price: "499",
      priceCurrency: "INR",
      url: absoluteUrl("/pricing"),
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

export function buildArticleJsonLd(article: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  modifiedAt: string;
  imagePath?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(article.path)}#article`,
    headline: article.title,
    description: article.description,
    url: absoluteUrl(article.path),
    mainEntityOfPage: absoluteUrl(article.path),
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt,
    image: absoluteUrl(article.imagePath ?? ogImagePath),
    author: { "@id": `${absoluteUrl()}/#organization`, name: "FITZENIX" },
    publisher: { "@id": `${absoluteUrl()}/#organization`, name: "FITZENIX" },
    inLanguage: "en-IN",
  };
}
