import { siteConfig } from "@/config/site";
import { faqItems } from "@/config/faq";
import { getStartingPrice } from "@/config/pricing";
import { activeSocialLinks } from "@/config/social";

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
  "gym membership software",
  "gym CRM software",
  "fitness studio management software",
  "fitness center management software",
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
      "Fitness studio billing",
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/gym-management-software")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildSoftwareApplicationJsonLd() {
  const startingPrice = getStartingPrice();
  return {
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl()}/#software`,
    name: "FITZENIX Gym Management Software",
    alternateName: "FITZENIX",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Gym Management Software",
    operatingSystem: "Android, iOS, Web",
    description: defaultDescription,
    url: absoluteUrl(),
    image: absoluteUrl(ogImagePath),
    downloadUrl: absoluteUrl(),
    installUrl: absoluteUrl("/login"),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: String(startingPrice),
      highPrice: "1999",
      offerCount: 3,
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/#pricing"),
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

/** Keyword landing pages for long-tail gym-management queries. */
export type SeoLandingPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  keywords: string[];
  priority: number;
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "gym-management-software",
    title: "Gym Management Software India | Members, Attendance & Payments",
    description:
      "FITZENIX gym management software for India: QR attendance, membership billing, owner/trainer/member apps. Plans from ₹499/month after a 14-day free trial on fitzenix.app.",
    h1: "Gym management software built for Indian gym owners",
    intro:
      "Searching for gym management software that handles members, attendance, billing and staff? FITZENIX on fitzenix.app is an all-in-one gym management platform — not a shopping website.",
    keywords: [
      "gym management software India",
      "gym management software",
      "gym membership software",
      "fitness studio software",
      "QR gym check-in",
      "gym billing software",
    ],
    priority: 0.95,
  },
  {
    slug: "gym-management-app",
    title: "Gym Management App for Owners, Trainers & Members | FITZENIX",
    description:
      "FITZENIX gym management app for Indian gyms — Owner, Trainer and Member apps with QR check-in, dues and renewals. Start free on fitzenix.app.",
    h1: "Gym management app that runs your entire gym",
    intro:
      "Need a gym management app, not another spreadsheet? FITZENIX gives owners, trainers and members dedicated apps on one platform at fitzenix.app.",
    keywords: [
      "gym management app",
      "gym management app India",
      "gym owner app",
      "fitness gym app",
      "trainer management app",
    ],
    priority: 0.9,
  },
  {
    slug: "gym-member-management-software",
    title: "Gym Member Management Software | Profiles, Plans & Renewals",
    description:
      "Manage gym members, membership plans and renewals with FITZENIX member management software. QR attendance and payment tracking included. Try free on fitzenix.app.",
    h1: "Gym member management software without spreadsheets",
    intro:
      "FITZENIX gym member management software helps Indian gym owners add members, assign plans, track renewals and dues — in one place on fitzenix.app.",
    keywords: [
      "gym member management software",
      "gym membership management",
      "member management for gym",
      "gym CRM software",
    ],
    priority: 0.88,
  },
  {
    slug: "gym-attendance-software",
    title: "Gym Attendance Software with QR Check-In | FITZENIX",
    description:
      "FITZENIX gym attendance software with QR check-in and manual marking. See who is in the gym and attendance history. Start free on fitzenix.app.",
    h1: "Gym attendance software with QR check-in",
    intro:
      "Replace paper registers with FITZENIX gym attendance software — members scan QR to check in; owners see live and historical attendance on fitzenix.app.",
    keywords: [
      "gym attendance software",
      "gym attendance app",
      "QR check-in for gym",
      "gym check in system",
    ],
    priority: 0.88,
  },
  {
    slug: "about-fitzenix",
    title: "About FITZENIX | Gym Management Software on fitzenix.app",
    description:
      "FITZENIX (fitzenix.app) is gym management SaaS for Indian gym owners. Official product site — not fitzenix.com shopping. Members, QR, payments and apps.",
    h1: "About FITZENIX — gym management software on fitzenix.app",
    intro:
      "FITZENIX is the official gym management software product at www.fitzenix.app. We build tools for gym owners, trainers and members. We are not a clothing or lifestyle online store.",
    keywords: [
      "FITZENIX",
      "fitzenix.app",
      "fitzenix gym management",
      "about fitzenix",
    ],
    priority: 0.85,
  },
];

export function getSeoLandingPage(slug: string): SeoLandingPage | undefined {
  return seoLandingPages.find((page) => page.slug === slug);
}
