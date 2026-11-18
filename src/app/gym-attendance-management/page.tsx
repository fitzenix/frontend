import type { Metadata } from "next";
import { SeoLandingView } from "@/components/seo/SeoLandingView";
import { getSeoLandingPage } from "@/config/seo";

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
  const page = getSeoLandingPage("gym-attendance-software");
  return page ? <SeoLandingView page={page} /> : null;
}