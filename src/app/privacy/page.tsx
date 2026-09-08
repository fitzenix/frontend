import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <Container className="section-pad max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-white">Privacy Policy</h1>
      <p className="mt-4 text-sm text-text-secondary">
        This page outlines how {siteConfig.name} handles information collected through the marketing
        website and checkout. Replace this placeholder with your legal counsel–approved policy before
        production launch.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-text-secondary">
        <li>We collect contact and payment metadata required to process plan purchases.</li>
        <li>Payment card details are processed by Razorpay and are not stored by FITZENIX.</li>
        <li>Server logs may include technical data needed for security and fraud prevention.</li>
      </ul>
      <p className="mt-8 text-sm">
        <Link href="/" className="text-brand-light hover:underline">
          Back to home
        </Link>
      </p>
    </Container>
  );
}
