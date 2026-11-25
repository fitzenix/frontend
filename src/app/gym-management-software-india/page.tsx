import type { Metadata } from "next";
import { SeoLandingView } from "@/components/seo/SeoLandingView";
import { getSeoLandingPage } from "@/config/seo";

const title = "Gym Management Software in India | FITZENIX";
const description =
  "FITZENIX is mobile-first gym management software for Indian gym owners, with INR pricing from ₹499/month and a 14-day free trial for managing members, attendance, payments, and daily operations.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["gym management software India", "gym management system India", "gym software India"],
  alternates: { canonical: "/gym-management-software-india" },
  openGraph: { title, description, url: "/gym-management-software-india" },
};

export default function GymManagementSoftwareIndiaPage() {
  const page = getSeoLandingPage("gym-management-software");
  return page ? <SeoLandingView page={page} /> : null;
}