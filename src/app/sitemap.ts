import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { seoLandingPages } from "@/config/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const landings = seoLandingPages.map((page) => ({
    url: `${base}/${page.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: page.priority,
  }));

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...landings,
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
