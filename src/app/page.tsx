import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { ValueSection } from "@/components/sections/ValueSection";
import { OwnerFirstSection } from "@/components/sections/OwnerFirstSection";
import { AppsSection } from "@/components/sections/AppsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { WhyFitzenix } from "@/components/sections/WhyFitzenix";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { FAQSection } from "@/components/faq/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { StickyMobileCTA } from "@/components/sections/StickyMobileCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildHomeJsonLd,
  defaultDescription,
  defaultTitle,
  ogImagePath,
} from "@/config/seo";

export const metadata: Metadata = {
  title: { absolute: defaultTitle },
  description: defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    images: [{ url: ogImagePath, width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildHomeJsonLd()} />
      <Hero />
      <ValueSection />
      <OwnerFirstSection />
      <AppsSection />
      <FeaturesSection />
      <PricingSection />
      <WhyFitzenix />
      <SecuritySection />
      <FAQSection />
      <FinalCTA />
      <StickyMobileCTA />
    </>
  );
}
