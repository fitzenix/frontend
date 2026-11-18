import type { Metadata } from "next";
import { SeoLandingRoute } from "@/components/seo/SeoLandingRoute";
import { buildLandingMetadata } from "@/config/seo";

const slug = "gym-management-app";

export const metadata: Metadata = buildLandingMetadata(slug);

export default function GymManagementAppPage() {
  return <SeoLandingRoute slug={slug} />;
}
