import type { Metadata } from "next";
import { SeoLandingRoute } from "@/components/seo/SeoLandingRoute";
import { buildLandingMetadata } from "@/config/seo";

const slug = "gym-crm-software";

export const metadata: Metadata = buildLandingMetadata(slug);

export default function GymCrmSoftwarePage() {
  return <SeoLandingRoute slug={slug} />;
}
