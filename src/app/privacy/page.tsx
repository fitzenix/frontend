import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { siteConfig } from "@/config/site";
import { privacyIntro, privacySections } from "@/config/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles personal data, Razorpay payments, and Zoho ZeptoMail transactional emails.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      active="privacy"
      title="Privacy Policy"
      description={`Learn how ${siteConfig.name} collects and protects your information when you sign up, start a trial, or pay for a gym management plan.`}
      intro={privacyIntro}
      sections={privacySections}
    />
  );
}
