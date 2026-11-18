import type { Metadata } from "next";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd, ogImagePath } from "@/config/seo";

const title = "Gym Management Features | Fitzenix";
const description =
  "Explore Fitzenix features for gym owners, trainers, and members, including memberships, QR attendance, payments, billing, reports, and mobile apps.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/features" },
  openGraph: { title, description, url: "/features", images: [{ url: ogImagePath, width: 1200, height: 630 }] },
};

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Features", path: "/features" }])} />
      <FeaturesSection />
      <FinalCTA />
    </>
  );
}