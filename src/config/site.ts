const appUrl =
  process.env.APP_URL?.replace(/\/$/, "") ??
  process.env.PUBLIC_APP_URL?.replace(/\/$/, "") ??
  "https://www.fitzenix.app";

export const siteConfig = {
  name: "FITZENIX",
  tagline: "Gym Management Software for Owners, Trainers & Members",
  description:
    "FITZENIX is gym management software for Indian gym owners — manage members, QR attendance, memberships, payments, trainers and reports with Owner, Trainer and Member apps on fitzenix.app.",
  /** Always the marketing site — never the API host. */
  url: (process.env.NEXT_PUBLIC_APP_URL ?? "https://www.fitzenix.app").replace(/\/$/, ""),
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
    /** Single-line display */
    line: "Guindy, Chennai, Tamil Nadu 600032, India",
  },
  loginUrl: process.env.NEXT_PUBLIC_LOGIN_URL ?? "/login",
  appDownloadUrl: process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ?? "#download",
  continueUrl: process.env.NEXT_PUBLIC_APP_CONTINUE_URL ?? "#",
  startingPrice: 499,
  /** Google Search Console HTML tag content (optional) */
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
} as const;
