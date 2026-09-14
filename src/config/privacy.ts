import { siteConfig } from "@/config/site";
import type { LegalSection } from "@/config/legal";
import { legalProcessors } from "@/config/legal";

export const privacyIntro = `This Privacy Policy explains how ${siteConfig.name} (“FITZENIX”, “we”, “us”) collects, uses, shares, and protects personal information when you use our website at ${siteConfig.url}, create an account, start a free trial, or purchase a subscription plan.`;

export const privacySections: LegalSection[] = [
  {
    id: "scope",
    title: "1. Scope",
    paragraphs: [
      "This policy covers the FITZENIX marketing website, account registration/login, checkout, subscription billing, and related transactional communications. Gym member/trainer data that gym owners upload into the product is processed to provide the service and remains under the gym owner’s control as the primary account holder.",
    ],
  },
  {
    id: "data-we-collect",
    title: "2. Information we collect",
    bullets: [
      "Account details: name, email address, phone number (optional), password (stored in hashed form by our auth provider).",
      "Gym / business details: gym name, owner name, and other information you enter at signup or checkout.",
      "Billing metadata: selected plan, order ID, payment ID, payment status, amount, currency, and timestamps.",
      "Technical data: IP address, device/browser type, approximate location derived from IP, and security logs used to prevent abuse.",
      "Support communications: messages you send to our support email.",
    ],
    paragraphs: [
      "We do not store your full card number, CVV, UPI PIN, or netbanking passwords. Those payment credentials are entered only on Razorpay’s secure checkout and processed by Razorpay.",
    ],
  },
  {
    id: "how-we-use",
    title: "3. How we use your information",
    bullets: [
      "Create and manage your FITZENIX account and gym workspace.",
      "Process plan purchases, renewals, refunds (where applicable), and payment verification.",
      "Send transactional emails (receipts, confirmations, security alerts) via Zoho ZeptoMail.",
      "Provide customer support and respond to your requests.",
      "Improve product reliability, detect fraud, and secure our systems.",
      "Comply with legal and regulatory obligations in India.",
    ],
  },
  {
    id: "payments-razorpay",
    title: "4. Payments & Razorpay (payment safety)",
    paragraphs: [
      `${legalProcessors.razorpay.name} is our payment gateway partner. When you pay for a FITZENIX plan, you are redirected to or open Razorpay Checkout. Payment card, UPI, wallet, and netbanking data are collected and processed by Razorpay under Razorpay’s own security and compliance controls.`,
      "FITZENIX receives only payment outcome metadata needed to activate your plan (for example order ID, payment ID, signature verification result, amount, and status). We verify Razorpay payment signatures on our server before marking a purchase as successful.",
      "For Razorpay’s privacy practices, see their privacy policy on the Razorpay website. FITZENIX never asks you to share card details over email, WhatsApp, or phone.",
    ],
    bullets: [
      "Card / UPI / netbanking credentials are not stored by FITZENIX.",
      "Checkout uses Razorpay’s encrypted payment flows.",
      "Successful payments are confirmed only after server-side signature verification.",
      "Failed or cancelled payments do not activate a paid plan.",
    ],
  },
  {
    id: "email-zeptomail",
    title: "5. Emails & Zoho ZeptoMail",
    paragraphs: [
      `We use ${legalProcessors.zeptoMail.name} to send transactional emails. This may include account verification, login or security notices, payment receipts, subscription confirmations, and support replies.`,
      "Email content and recipient addresses needed to deliver those messages are processed by Zoho ZeptoMail according to Zoho’s privacy terms. We do not sell your email address. You may still receive essential service emails related to your account and payments even if you opt out of marketing messages.",
    ],
  },
  {
    id: "sharing",
    title: "6. Who we share data with",
    paragraphs: [
      "We share personal data only with service providers required to operate FITZENIX, or when required by law:",
    ],
    bullets: [
      "Razorpay — payment processing and settlement.",
      "Zoho ZeptoMail — transactional email delivery.",
      "Hosting / infrastructure providers — to run the website, APIs, and databases securely.",
      "Authorities — only if legally required (for example fraud investigation or court order).",
    ],
  },
  {
    id: "retention",
    title: "7. Data retention",
    paragraphs: [
      "We retain account and billing records for as long as your account is active and for a reasonable period afterward to meet legal, tax, accounting, dispute, and fraud-prevention requirements. Payment gateway records may also be retained by Razorpay under their policies.",
    ],
  },
  {
    id: "security",
    title: "8. Security measures",
    bullets: [
      "HTTPS encryption for data in transit on our website and APIs.",
      "Server-side verification of Razorpay payment signatures.",
      "Access controls and logging for administrative systems.",
      "No storage of full card numbers or CVV on FITZENIX systems.",
    ],
    paragraphs: [
      "No method of transmission or storage is 100% secure. We work to protect your information, but you should also keep your login credentials confidential and use a strong password.",
    ],
  },
  {
    id: "your-rights",
    title: "9. Your choices & rights",
    bullets: [
      "Access or update account profile information from your account settings (where available).",
      "Request correction or deletion of personal data by emailing support, subject to legal retention needs.",
      "Contact us about payment receipts or billing questions using your registered email.",
    ],
  },
  {
    id: "children",
    title: "10. Children’s privacy",
    paragraphs: [
      "FITZENIX is intended for gym businesses and adult operators. We do not knowingly collect personal information from children under 18 for account signup or billing.",
    ],
  },
  {
    id: "changes",
    title: "11. Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. The “Last updated” date at the top of the page will change when we do. Continued use of FITZENIX after updates means you acknowledge the revised policy.",
    ],
  },
  {
    id: "contact",
    title: "12. Contact",
    paragraphs: [
      `For privacy questions, email ${siteConfig.supportEmail} or ${siteConfig.contactEmail}. Website: ${siteConfig.url}. Registered / business address: ${siteConfig.address.line}.`,
    ],
  },
];
