import type { Metadata } from "next";
import { SeoLandingView } from "@/components/seo/SeoLandingView";

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
  return (
    <SeoLandingView
      data={{
        path: "/gym-management-software-india",
        eyebrow: "Gym management software in India",
        title: "Gym Management Software for Indian Gyms",
        description,
        audience: "Indian gym owners and fitness businesses",
        sectionTitle: "Manage your gym from one mobile-first system",
        audienceDescription:
          "FITZENIX helps Indian gym owners keep member records, memberships, attendance, trainers, payments, and reports together. Plans are priced in INR, start at ₹499/month, and begin with a 14-day free trial.",
        relatedLinks: [
          { href: "/gym-management-software", label: "gym management software" },
          { href: "/gym-management-app", label: "gym management app" },
          { href: "/pricing", label: "plans and pricing" },
        ],
        features: [
          { title: "Member management", body: "Keep member profiles, memberships, plans, attendance, and progress organized in one platform." },
          { title: "Attendance and check-in", body: "Use QR check-in and manual attendance workflows to keep a clear view of member visits." },
          { title: "Payments and dues", body: "Track subscriptions, payments, pending dues, invoices, and revenue from the owner dashboard." },
          { title: "Owner and mobile access", body: "Manage everyday gym operations through the owner dashboard and supported mobile apps." },
        ],
      }}
    />
  );
}