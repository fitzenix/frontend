import type { Metadata } from "next";
import { SeoLandingView } from "@/components/seo/SeoLandingView";
import { siteConfig } from "@/config/site";

const title = "Gym Management App for Owners, Trainers & Members";
const description = "FITZENIX is a gym management app for Indian gyms with owner, trainer and member workflows, attendance, memberships, payments and reports in one platform.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${siteConfig.name}` },
  description,
  keywords: ["gym management app", "gym owner app", "fitness studio management app", "gym software India"],
  alternates: { canonical: "/gym-management-app" },
  openGraph: { title, description, url: "/gym-management-app" },
};

export default function GymManagementAppPage() {
  return <SeoLandingView data={{
    path: "/gym-management-app",
    eyebrow: "Gym management app",
    title,
    description,
    audience: "gym owners, trainers and members",
    relatedPath: "/gym-management-software",
    relatedLabel: "gym management software",
    features: [
      { title: "Owner dashboard", body: "Manage members, plans, payments, staff and gym performance from web and mobile." },
      { title: "Trainer and member apps", body: "Keep trainers and members connected with assigned workouts, sessions and membership details." },
      { title: "QR attendance", body: "Let members check in quickly and give owners a reliable attendance history." },
      { title: "Reports and renewals", body: "Track dues, renewals, revenue and member activity without spreadsheets." },
    ],
  }} />;
}
