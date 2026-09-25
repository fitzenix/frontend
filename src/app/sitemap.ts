import type { MetadataRoute } from "next";
import { resourceArticles, resourceCategories } from "@/config/resources";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/gym-management-software`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    ...["features", "pricing", "solutions", "contact", "blog"].map((path) => ({
      url: `${base}/${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${base}/resources`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...resourceCategories.map((category) => ({
      url: `${base}/resources/${category.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...resourceArticles.map((article) => ({
      url: `${base}/resources/${article.category}/${article.slug}`,
      lastModified: new Date(article.modifiedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...[
      "gym-management-app",
      "gym-attendance-software",
      "gym-attendance-management",
      "gym-member-management-software",
      "gym-membership-management",
      "gym-billing-software",
      "gym-management-software-india",
    ].map((path) => ({
      url: `${base}/${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
