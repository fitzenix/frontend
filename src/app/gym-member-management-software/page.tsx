import type { Metadata } from "next";
import { SeoLandingView } from "@/components/seo/SeoLandingView";

const title = "Gym Member Management Software | Fitzenix";
const description =
  "Fitzenix gym member management software helps owners organize member profiles, memberships, renewals, attendance, workouts, and progress in one platform.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["gym member management software", "gym membership management", "member management for gyms", "gym CRM software"],
  alternates: { canonical: "/gym-member-management-software" },
  openGraph: { title, description, url: "/gym-member-management-software" },
};

export default function GymMemberManagementSoftwarePage() {
  return <SeoLandingView data={{
    path: "/gym-member-management-software",
    eyebrow: "Gym member management software",
    title: "Gym Member Management Software",
    description,
    audience: "owners who want stronger member retention",
    sectionTitle: "Keep member records and activity together",
    audienceDescription:
      "Owners can keep contact details, membership plans, status, attendance, workouts, and progress connected in one member record. Renewal and attendance context stays close to the member relationship.",
    relatedLinks: [
      { href: "/gym-attendance-software", label: "gym attendance software" },
      { href: "/gym-management-app", label: "gym management app" },
    ],
    features: [
      { title: "Member profiles", body: "Keep contact details, plans, membership status and activity in one organized record." },
      { title: "Renewal follow-up", body: "Spot upcoming expiries and follow up before members quietly lapse." },
      { title: "Membership plans", body: "Create and manage plans, durations, pricing and member assignments." },
      { title: "Member engagement", body: "Give members app access to view membership, workouts, progress and attendance." },
    ],
  }} />;
}
