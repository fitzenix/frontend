import type { Metadata } from "next";
import { SeoLandingView } from "@/components/seo/SeoLandingView";
import { getSeoLandingPage } from "@/config/seo";

const title = "Gym Membership Management Software | FITZENIX";
const description =
  "FITZENIX gym membership management software helps owners organize member plans, memberships, payments, records, renewals, and progress in one platform.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["gym membership management", "gym membership software", "gym member management"],
  alternates: { canonical: "/gym-membership-management" },
  openGraph: { title, description, url: "/gym-membership-management" },
};

export default function GymMembershipManagementPage() {
  const page = getSeoLandingPage("gym-member-management-software");
  return page ? <SeoLandingView page={page} /> : null;
}