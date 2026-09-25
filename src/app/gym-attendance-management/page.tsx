import type { Metadata } from "next";
import { SeoLandingView } from "@/components/seo/SeoLandingView";

const title = "Gym Attendance Management Software | FITZENIX";
const description =
  "FITZENIX gym attendance management software helps owners track member attendance with QR check-in, manual attendance, visit history, and owner visibility.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["gym attendance software", "gym attendance management", "gym check-in software"],
  alternates: { canonical: "/gym-attendance-management" },
  openGraph: { title, description, url: "/gym-attendance-management" },
};

export default function GymAttendanceManagementPage() {
  return (
    <SeoLandingView
      data={{
        path: "/gym-attendance-management",
        eyebrow: "Gym attendance management",
        title: "Gym Attendance Management Software",
        description,
        audience: "gyms that need reliable member check-in and attendance visibility",
        sectionTitle: "Make every gym visit easier to track",
        audienceDescription:
          "Members can use the gym QR code to check in, while staff can record attendance manually when needed. Owners and trainers can use attendance history to understand visits and support follow-up.",
        relatedLinks: [
          { href: "/gym-attendance-software", label: "gym attendance software" },
          { href: "/gym-member-management-software", label: "member management software" },
          { href: "/pricing", label: "FITZENIX pricing" },
        ],
        features: [
          { title: "QR attendance", body: "Let members record a visit by scanning the gym QR code from the supported member experience." },
          { title: "Attendance history", body: "Keep member visit records available for owners and staff to review." },
          { title: "Manual attendance", body: "Record a member visit manually when a QR check-in is not practical." },
          { title: "Connected workflows", body: "Use attendance context alongside member records, memberships, trainers, and progress." },
        ],
      }}
    />
  );
}