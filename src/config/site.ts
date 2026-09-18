/** Marketing site URL only — never the API host (fixes robots.txt / sitemap / canonicals). */
function resolveMarketingUrl(): string {
  const fallback = "https://www.fitzenix.app";
  const raw = (process.env.NEXT_PUBLIC_APP_URL ?? fallback).replace(/\/$/, "");

  try {
    const { hostname } = new URL(raw);
    // Block API / local backend URLs from leaking into SEO metadata.
    if (
      hostname === "api.fitzenix.app" ||
      hostname === "localhost" ||
      hostname.startsWith("127.0.0.1")
    ) {
      return fallback;
    }
    return raw;
  } catch {
    return fallback;
  }
}

export const siteConfig = {
  name: "FITZENIX",
  tagline: "Gym Management Software for Owners, Trainers & Members",
  description:
    "FITZENIX is gym management software for Indian gym owners — manage members, QR attendance, memberships, payments, trainers and reports with Owner, Trainer and Member apps on fitzenix.app.",
  url: resolveMarketingUrl(),
  locale: "en_IN",
  language: "en-IN",
  supportEmail: "support@fitzenix.app",
  contactEmail: "hello@fitzenix.app",
  address: {
    locality: "Guindy",
    city: "Chennai",
    postalCode: "600032",
    region: "Tamil Nadu",
    country: "India",
    line: "Guindy, Chennai, Tamil Nadu 600032, India",
  },
  loginUrl: process.env.NEXT_PUBLIC_LOGIN_URL ?? "/login",
  appDownloadUrl: process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ?? "#download",
  continueUrl: process.env.NEXT_PUBLIC_APP_CONTINUE_URL ?? "#",
  startingPrice: 499,
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
} as const;
