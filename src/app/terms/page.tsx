import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms & Conditions for ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <Container className="section-pad max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-white">Terms & Conditions</h1>
      <p className="mt-4 text-sm text-text-secondary">
        By purchasing a {siteConfig.name} plan, you agree to the subscription terms associated with
        your selected plan. Replace this placeholder with your production terms before launch.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-text-secondary">
        <li>Plans are billed monthly unless otherwise stated at checkout.</li>
        <li>Feature availability depends on the selected plan configuration.</li>
        <li>Misuse of the platform or payment fraud may result in account suspension.</li>
      </ul>
      <p className="mt-8 text-sm">
        <Link href="/" className="text-brand-light hover:underline">
          Back to home
        </Link>
      </p>
    </Container>
  );
}
