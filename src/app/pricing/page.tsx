import type { Metadata } from "next";
import { PricingSection } from "@/components/pricing/PricingSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd, ogImagePath } from "@/config/seo";

const title = "Gym Management Software Pricing | Fitzenix";
const description =
  "Compare Fitzenix gym management software plans. Start with a 14-day free trial, then choose Starter, Growth, or Pro for your gym.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/pricing" },
  openGraph: { title, description, url: "/pricing", images: [{ url: ogImagePath, width: 1200, height: 630 }] },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])} />
      <PricingSection />
      <FinalCTA />
    </>
  );
}