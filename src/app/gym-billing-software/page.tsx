import type { Metadata } from "next";
import { SeoLandingView } from "@/components/seo/SeoLandingView";

const title = "Gym Billing Software | Fitzenix";
const description =
  "Fitzenix gym billing software helps owners track membership subscriptions, payments, pending dues, invoices, and revenue from one dashboard.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["gym billing software", "gym payment software", "gym subscription management", "gym invoice software India"],
  alternates: { canonical: "/gym-billing-software" },
  openGraph: { title, description, url: "/gym-billing-software" },
};

export default function GymBillingSoftwarePage() {
  return <SeoLandingView data={{
    path: "/gym-billing-software",
    eyebrow: "Gym billing software",
    title: "Gym Billing & Payment Management Software",
    description,
    audience: "gyms that need clear payments and dues",
    sectionTitle: "Connect plans, payments, and dues",
    audienceDescription:
      "The Owner app and web dashboard bring membership subscriptions, payments, pending dues, invoices, and revenue visibility into the same operating view used to manage members.",
    relatedLinks: [
      { href: "/gym-member-management-software", label: "gym member management software" },
      { href: "/gym-management-software", label: "gym management software" },
    ],
    features: [
      { title: "Membership payments", body: "Track plan payments and member subscriptions without scattered notebooks or spreadsheets." },
      { title: "Pending dues", body: "See outstanding balances quickly and follow up with the right members." },
      { title: "Revenue visibility", body: "Understand collections and plan performance from the owner dashboard." },
      { title: "Secure checkout", body: "Accept payments through secure Razorpay checkout while FITZENIX verifies the payment server-side." },
    ],
  }} />;
}
