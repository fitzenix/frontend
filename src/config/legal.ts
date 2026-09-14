import { siteConfig } from "@/config/site";

export const legalLastUpdated = "9 September 2026";

export const legalProcessors = {
  razorpay: {
    name: "Razorpay",
    role: "Payment gateway",
    url: "https://razorpay.com",
    privacyUrl: "https://razorpay.com/privacy/",
    description:
      "Processes subscription checkout, card/UPI/netbanking payments, and payment verification for FITZENIX plans. Card and bank credentials are handled by Razorpay and are not stored on FITZENIX servers.",
  },
  zeptoMail: {
    name: "Zoho ZeptoMail",
    role: "Transactional email",
    url: "https://www.zoho.com/zeptomail/",
    privacyUrl: "https://www.zoho.com/privacy.html",
    description:
      "Sends transactional emails such as account verification, login/security notices, payment receipts, plan confirmations, and support-related messages.",
  },
} as const;

export const legalContact = {
  supportEmail: siteConfig.supportEmail,
  contactEmail: siteConfig.contactEmail,
  website: siteConfig.url,
  address: siteConfig.address.line,
} as const;

export interface LegalSection {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}
