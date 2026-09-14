import { siteConfig } from "@/config/site";
import type { LegalSection } from "@/config/legal";
import { legalProcessors } from "@/config/legal";

export const termsIntro = `These Terms & Conditions (“Terms”) govern your access to and use of ${siteConfig.name} (“FITZENIX”, “we”, “us”), including our website at ${siteConfig.url}, free trial, paid subscription plans, and related services. By creating an account, starting a trial, or completing a purchase, you agree to these Terms.`;

export const termsSections: LegalSection[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of terms",
    paragraphs: [
      "If you use FITZENIX on behalf of a gym or business, you confirm that you are authorised to bind that business to these Terms. If you do not agree, do not use the service.",
    ],
  },
  {
    id: "service",
    title: "2. The service",
    paragraphs: [
      "FITZENIX provides gym management software and related mobile/web apps for owners, trainers, and members (features vary by plan). We may improve, add, or change features to maintain security, reliability, or product quality.",
    ],
  },
  {
    id: "accounts",
    title: "3. Accounts & eligibility",
    bullets: [
      "You must provide accurate gym and contact information.",
      "You are responsible for safeguarding login credentials and for activity under your account.",
      "Notify us promptly at support if you suspect unauthorised access.",
      "One gym workspace should not be used to evade billing or abuse trials.",
    ],
  },
  {
    id: "trial",
    title: "4. Free trial",
    paragraphs: [
      "Where offered, a free trial (for example 14 days) lets you evaluate FITZENIX. Trial access may be limited by features or duration. After the trial ends, continued use of paid features requires selecting a plan and completing payment. We may refuse or revoke trial access in cases of abuse or fraud.",
    ],
  },
  {
    id: "plans-billing",
    title: "5. Plans, pricing & billing",
    bullets: [
      "Plan names, prices, member limits, and features are shown on the pricing page and at checkout.",
      "Unless stated otherwise, plans are billed in INR on a monthly basis.",
      "Taxes (such as GST), if applicable, may be added as required by law or shown at checkout.",
      "Feature availability depends on the plan you purchase (Starter, Growth, Pro, or as listed).",
      "We may update pricing for future billing cycles; material changes will be communicated where reasonably possible.",
    ],
  },
  {
    id: "payments-razorpay",
    title: "6. Payments via Razorpay (safe checkout)",
    paragraphs: [
      `All online plan purchases on FITZENIX are processed through ${legalProcessors.razorpay.name}, a third-party payment gateway. By paying, you also agree to Razorpay’s applicable terms for payment processing.`,
      "You authorise FITZENIX (via Razorpay) to charge the selected plan amount using the payment method you choose (card, UPI, netbanking, wallets, or other methods Razorpay supports).",
      "A paid plan is activated only after FITZENIX successfully verifies the payment with Razorpay (including signature verification on our servers). A pending, failed, cancelled, or unverified payment does not grant paid access.",
    ],
    bullets: [
      "Never share OTP, CVV, UPI PIN, or card details with anyone claiming to be FITZENIX support.",
      "FITZENIX staff will never ask for your full card number over email, chat, or phone.",
      "Use only the official FITZENIX website checkout and Razorpay payment window.",
      "Keep payment confirmation emails and payment IDs for your records.",
    ],
  },
  {
    id: "receipts-email",
    title: "7. Receipts & transactional email (Zoho ZeptoMail)",
    paragraphs: [
      `Payment receipts, plan confirmations, and important account notices may be sent by email using ${legalProcessors.zeptoMail.name}. You are responsible for providing a valid email address and checking that inbox (including spam/junk).`,
    ],
  },
  {
    id: "refunds",
    title: "8. Cancellations, refunds & chargebacks",
    paragraphs: [
      "You may cancel a subscription according to the cancellation options available in your account or by contacting support. Cancellation typically stops future renewals; it does not automatically refund the current billing period unless required by law or expressly agreed by FITZENIX.",
      "Refund requests are reviewed case by case (for example duplicate successful charges). Approved refunds, if any, are processed back through Razorpay to the original payment method where possible.",
      "Fraudulent chargebacks or payment disputes raised without contacting us first may result in suspension of the account pending investigation.",
    ],
  },
  {
    id: "acceptable-use",
    title: "9. Acceptable use",
    bullets: [
      "Do not misuse the platform for illegal activity, spam, or abuse of members’ data.",
      "Do not attempt to break security, scrape without permission, or reverse engineer the service beyond what law allows.",
      "Do not use FITZENIX to process payments for goods/services unrelated to your authorised gym subscription with us.",
      "Respect privacy laws when uploading member or staff personal data.",
    ],
  },
  {
    id: "customer-data",
    title: "10. Your gym data",
    paragraphs: [
      "You retain ownership of data you upload about your gym, members, trainers, and operations. You grant FITZENIX a limited licence to host and process that data solely to provide the service. You are responsible for having a lawful basis to collect and use member/trainer data inside your gym.",
    ],
  },
  {
    id: "availability",
    title: "11. Availability & support",
    paragraphs: [
      "We aim for reliable uptime but do not guarantee uninterrupted service. Maintenance, third-party outages (including payment or email providers), or force majeure events may affect availability. Support is available via the published support email.",
    ],
  },
  {
    id: "disclaimer",
    title: "12. Disclaimers",
    paragraphs: [
      "FITZENIX is provided on an “as is” and “as available” basis to the extent permitted by law. We do not warrant that the service will meet every business outcome or be free of all errors. Gym business decisions remain your responsibility.",
    ],
  },
  {
    id: "liability",
    title: "13. Limitation of liability",
    paragraphs: [
      "To the maximum extent permitted by applicable law, FITZENIX is not liable for indirect, incidental, special, consequential, or lost-profit damages arising from use of the service or payment failures caused by banks, UPI apps, or Razorpay network issues outside our reasonable control. Our aggregate liability for a claim relating to a paid plan is limited to the fees you paid to FITZENIX for the one (1) month period immediately before the claim.",
    ],
  },
  {
    id: "suspension",
    title: "14. Suspension & termination",
    paragraphs: [
      "We may suspend or terminate access for unpaid invoices, payment fraud, violation of these Terms, or risk to the platform or other users. You may stop using FITZENIX at any time. Provisions that should survive (payment obligations, liability limits, IP) continue after termination.",
    ],
  },
  {
    id: "law",
    title: "15. Governing law",
    paragraphs: [
      "These Terms are governed by the laws of India. Courts in India shall have exclusive jurisdiction, subject to any mandatory consumer protections that apply to you.",
    ],
  },
  {
    id: "changes",
    title: "16. Changes to these Terms",
    paragraphs: [
      "We may update these Terms periodically. The “Last updated” date will change when we do. Continued use after changes constitutes acceptance of the updated Terms for future use of the service.",
    ],
  },
  {
    id: "contact",
    title: "17. Contact",
    paragraphs: [
      `Questions about these Terms, billing, or payment safety: ${siteConfig.supportEmail} · ${siteConfig.contactEmail} · ${siteConfig.url}. Address: ${siteConfig.address.line}.`,
    ],
  },
];
