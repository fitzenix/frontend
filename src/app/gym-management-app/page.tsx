import type { Metadata } from "next";
import { SeoLandingView } from "@/components/seo/SeoLandingView";

const title = "Gym Management App for Gyms | FITZENIX";
const description =
  "FITZENIX is a gym management app for gym owners, trainers, and members. Manage members, attendance, trainers, memberships, payments, reports, and daily gym operations from a mobile-first platform.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["gym management app", "gym owner app", "fitness studio management app", "gym software India"],
  alternates: { canonical: "/gym-management-app" },
  openGraph: { title, description, url: "/gym-management-app" },
};

export default function GymManagementAppPage() {
  return <SeoLandingView data={{
    path: "/gym-management-app",
    eyebrow: "Gym management app",
    title: "Gym Management App for Modern Gyms",
    description,
    audience: "gym owners, trainers and members",
    sectionTitle: "One app experience for each gym role",
    audienceDescription:
      "Owners use the dashboard and Owner app to see members, plans, payments, attendance, staff activity, and business reports. Trainer and Member apps support assigned members, workouts, progress, check-in, and membership details where included by plan.",
    relatedLinks: [
      { href: "/gym-management-software", label: "gym management software" },
      { href: "/pricing", label: "FITZENIX pricing" },
    ],
    features: [
      { title: "Owner and admin experience", body: "Manage members, plans, payments, staff activity, attendance, and business reports from the web dashboard and Owner app." },
      { title: "Trainer experience", body: "Trainers can work with assigned members, workouts, and daily sessions in the Trainer app on supported plans." },
      { title: "Member experience", body: "Members can check in, view membership details, follow workouts, and track progress in the Member app on supported plans." },
      { title: "Web and mobile access", body: "Keep gym operations available across the owner web dashboard and role-specific mobile apps." },
    ],
  }} />;
}
