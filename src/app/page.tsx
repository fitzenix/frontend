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
import { siteConfig } from "@/config/site";
import { getStartingPrice } from "@/config/pricing";

const startingPrice = getStartingPrice();

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Android, iOS, Web",
  description: siteConfig.description,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "INR",
    lowPrice: String(startingPrice),
    highPrice: "3499",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
