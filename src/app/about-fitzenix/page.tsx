import type { Metadata } from "next";
import { SeoLandingRoute } from "@/components/seo/SeoLandingRoute";
import { buildLandingMetadata } from "@/config/seo";

const slug = "about-fitzenix";

export const metadata: Metadata = buildLandingMetadata(slug);

export default function AboutFitzenixPage() {
  return <SeoLandingRoute slug={slug} />;
}
