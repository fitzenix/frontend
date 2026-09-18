import type { Metadata } from "next";
import { SeoLandingView } from "@/components/seo/SeoLandingView";
import { siteConfig } from "@/config/site";

const title = "Gym Billing Software for Membership Payments | FITZENIX";
const description = "FITZENIX gym billing software helps Indian gym owners track memberships, subscriptions, pending dues, invoices and revenue in one dashboard.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${siteConfig.name}` },
  description,
  keywords: ["gym billing software", "gym payment software", "gym subscription management", "gym invoice software India"],
  alternates: { canonical: "/gym-billing-software" },
  openGraph: { title, description, url: "/gym-billing-software" },
};

export default function GymBillingSoftwarePage() {
  return <SeoLandingView data={{
    path: "/gym-billing-software",
    eyebrow: "Gym billing software",
    title,
    description,
    audience: "gyms that need clear payments and dues",
    relatedPath: "/gym-member-management-software",
    relatedLabel: "gym member management software",
    features: [
      { title: "Membership payments", body: "Track plan payments and member subscriptions without scattered notebooks or spreadsheets." },
      { title: "Pending dues", body: "See outstanding balances quickly and follow up with the right members." },
      { title: "Revenue visibility", body: "Understand collections and plan performance from the owner dashboard." },
      { title: "Secure checkout", body: "Accept payments through secure Razorpay checkout while FITZENIX verifies the payment server-side." },
    ],
  }} />;
}
