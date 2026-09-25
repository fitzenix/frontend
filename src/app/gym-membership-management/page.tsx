import type { Metadata } from "next";
import { SeoLandingView } from "@/components/seo/SeoLandingView";

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
  return (
    <SeoLandingView
      data={{
        path: "/gym-membership-management",
        eyebrow: "Gym membership management",
        title: "Gym Membership Management Software",
        description,
        audience: "gym owners managing plans, memberships, and member relationships",
        sectionTitle: "Keep memberships clear from signup to renewal",
        audienceDescription:
          "FITZENIX keeps member records, plans, membership status, payments, attendance, workouts, and progress connected so owners can manage the member relationship in one place.",
        relatedLinks: [
          { href: "/gym-member-management-software", label: "member management software" },
          { href: "/gym-billing-software", label: "gym billing software" },
          { href: "/pricing", label: "FITZENIX pricing" },
        ],
        features: [
          { title: "Member plans", body: "Create and manage membership plans, durations, pricing, and member assignments." },
          { title: "Member records", body: "Keep contact details, membership status, attendance, workouts, and progress together." },
          { title: "Renewal context", body: "Use membership status and attendance history to support timely follow-up with members." },
          { title: "Payments connected", body: "See plan payments and pending dues alongside the membership records they relate to." },
        ],
      }}
    />
  );
}