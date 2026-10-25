import type { MetadataRoute } from "next";
import { resourceArticles, resourceCategories } from "@/config/resources";
import { siteConfig } from "@/config/site";
import { seoContentUpdated, seoLandingPages } from "@/config/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");

  const landings = seoLandingPages.map((page) => ({
    url: `${base}/${page.slug}`,
    lastModified: seoContentUpdated,
    changeFrequency: "monthly" as const,
    priority: page.priority,
  }));

  return [
    {
      url: base,
      lastModified: seoContentUpdated,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...landings,
    {
      url: `${base}/privacy`,
      lastModified: seoContentUpdated,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/terms`,
      lastModified: seoContentUpdated,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
