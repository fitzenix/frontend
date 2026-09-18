import type { Metadata } from "next";
import { SeoLandingView } from "@/components/seo/SeoLandingView";
import { siteConfig } from "@/config/site";

const title = "Gym Attendance Software with QR Check-In | FITZENIX";
const description = "FITZENIX gym attendance software helps Indian gyms replace paper registers with QR check-in, live member attendance and reliable visit history.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${siteConfig.name}` },
  description,
  keywords: ["gym attendance software", "gym attendance app", "QR attendance for gym", "gym check-in software"],
  alternates: { canonical: "/gym-attendance-software" },
  openGraph: { title, description, url: "/gym-attendance-software" },
};

export default function GymAttendanceSoftwarePage() {
  return <SeoLandingView data={{
    path: "/gym-attendance-software",
    eyebrow: "Gym attendance software",
    title,
    description,
    audience: "gyms that want fast, accurate check-in",
    relatedPath: "/gym-management-app",
    relatedLabel: "gym management app",
    features: [
      { title: "QR member check-in", body: "Give every gym a simple QR flow so members can record attendance in seconds." },
      { title: "Live attendance view", body: "See who checked in today and understand attendance patterns from one dashboard." },
      { title: "Member visit history", body: "Keep a clear record of visits to support renewals, engagement and follow-up." },
      { title: "Manual backup", body: "Staff can record attendance manually when a member needs help or a device is unavailable." },
    ],
  }} />;
}
