export const siteConfig = {
  name: "FITZENIX",
  tagline: "Gym Management Software for Owners, Trainers & Members",
  description:
    "Manage members, attendance, memberships, payments, staff and reports with FITZENIX — a complete gym management platform with Owner, Trainer and Member apps.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://fitzenix.app",
  locale: "en_IN",
  supportEmail: "support@fitzenix.com",
  contactEmail: "hello@fitzenix.com",
  loginUrl: process.env.NEXT_PUBLIC_LOGIN_URL ?? "/login",
  appDownloadUrl: process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ?? "#download",
  continueUrl: process.env.NEXT_PUBLIC_APP_CONTINUE_URL ?? "#",
  startingPrice: 999,
} as const;
