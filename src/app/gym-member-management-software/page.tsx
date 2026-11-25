import type { Metadata } from "next";
import { SeoLandingRoute } from "@/components/seo/SeoLandingRoute";
import { buildLandingMetadata } from "@/config/seo";

const slug = "gym-member-management-software";

export const metadata: Metadata = buildLandingMetadata(slug);

export default function GymMemberManagementSoftwarePage() {
  return <SeoLandingRoute slug={slug} />;
}
