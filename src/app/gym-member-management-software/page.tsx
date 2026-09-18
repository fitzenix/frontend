import type { Metadata } from "next";
import { SeoLandingView } from "@/components/seo/SeoLandingView";
import { siteConfig } from "@/config/site";

const title = "Gym Member Management Software for Indian Gyms | FITZENIX";
const description = "FITZENIX gym member management software helps owners manage profiles, memberships, renewals, attendance and communication from one secure platform.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${siteConfig.name}` },
  description,
  keywords: ["gym member management software", "gym membership management", "member management for gyms", "gym CRM software"],
  alternates: { canonical: "/gym-member-management-software" },
  openGraph: { title, description, url: "/gym-member-management-software" },
};

export default function GymMemberManagementSoftwarePage() {
  return <SeoLandingView data={{
    path: "/gym-member-management-software",
    eyebrow: "Gym member management software",
    title,
    description,
    audience: "owners who want stronger member retention",
    relatedPath: "/gym-attendance-software",
    relatedLabel: "gym attendance software",
    features: [
      { title: "Member profiles", body: "Keep contact details, plans, membership status and activity in one organized record." },
      { title: "Renewal follow-up", body: "Spot upcoming expiries and follow up before members quietly lapse." },
      { title: "Membership plans", body: "Create and manage plans, durations, pricing and member assignments." },
      { title: "Member engagement", body: "Give members app access to view membership, workouts, progress and attendance." },
    ],
  }} />;
}
