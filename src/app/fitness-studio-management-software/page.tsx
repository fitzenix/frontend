import type { Metadata } from "next";
import { SeoLandingRoute } from "@/components/seo/SeoLandingRoute";
import { buildLandingMetadata } from "@/config/seo";

const slug = "fitness-studio-management-software";

export const metadata: Metadata = buildLandingMetadata(slug);

export default function FitnessStudioManagementSoftwarePage() {
  return <SeoLandingRoute slug={slug} />;
}
