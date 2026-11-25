import type { Metadata } from "next";
import { SeoLandingRoute } from "@/components/seo/SeoLandingRoute";
import { buildLandingMetadata } from "@/config/seo";

const slug = "gym-attendance-software";

export const metadata: Metadata = buildLandingMetadata(slug);

export default function GymAttendanceSoftwarePage() {
  return <SeoLandingRoute slug={slug} />;
}
