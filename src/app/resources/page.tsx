import type { Metadata } from "next";
import { ResourceHubView } from "@/components/resources/ResourceViews";
import { resourceCategories } from "@/config/resources";
import { absoluteUrl, ogImagePath } from "@/config/seo";

const title = "Gym Management & Fitness Business Resources | FITZENIX";
const description =
  "Practical resources for gym owners and fitness teams covering gym management, operations, members, attendance, memberships, trainers, payments, and business growth.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: absoluteUrl("/resources") },
  openGraph: { title, description, url: absoluteUrl("/resources"), images: [{ url: ogImagePath, width: 1200, height: 630 }] },
};

export default function ResourcesPage() {
  return <ResourceHubView categories={resourceCategories} />;
}