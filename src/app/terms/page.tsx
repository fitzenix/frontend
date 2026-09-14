import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { siteConfig } from "@/config/site";
import { termsIntro, termsSections } from "@/config/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `${siteConfig.name} subscription terms, Razorpay checkout rules, free trial, refunds, and acceptable use.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      active="terms"
      title="Terms & Conditions"
      description={`Rules for using ${siteConfig.name}, including plans, Razorpay payments, ZeptoMail receipts, cancellations, and account responsibilities.`}
      intro={termsIntro}
      sections={termsSections}
    />
  );
}
