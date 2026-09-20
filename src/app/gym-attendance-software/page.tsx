import type { Metadata } from "next";
import { SeoLandingView } from "@/components/seo/SeoLandingView";

const title = "Gym Attendance Software | Fitzenix";
const description =
  "Fitzenix gym attendance management software supports QR check-in, manual attendance, live attendance views, and member visit history for gyms.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["gym attendance software", "gym attendance app", "QR attendance for gym", "gym check-in software"],
  alternates: { canonical: "/gym-attendance-software" },
  openGraph: { title, description, url: "/gym-attendance-software" },
};

export default function GymAttendanceSoftwarePage() {
  return <SeoLandingView data={{
    path: "/gym-attendance-software",
    eyebrow: "Gym attendance software",
    title: "Gym Attendance Management Software",
    description,
    audience: "gyms that want fast, accurate check-in",
    sectionTitle: "A practical attendance and check-in workflow",
    audienceDescription:
      "Members can scan the gym QR code to check in, while staff can record attendance manually when needed. Owners get a view of today’s attendance and a history of member visits for follow-up and renewals.",
    relatedLinks: [
      { href: "/gym-management-app", label: "gym management app" },
      { href: "/gym-member-management-software", label: "member management software" },
    ],
    features: [
      { title: "QR member check-in", body: "Give every gym a simple QR flow so members can record attendance in seconds." },
      { title: "Live attendance view", body: "See who checked in today and understand attendance patterns from one dashboard." },
      { title: "Member visit history", body: "Keep a clear record of visits to support renewals, engagement and follow-up." },
      { title: "Manual backup", body: "Staff can record attendance manually when a member needs help or a device is unavailable." },
    ],
  }} />;
}
