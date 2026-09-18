import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { defaultDescription } from "@/config/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Gym Management Software`,
    short_name: siteConfig.name,
    description: defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#d90429",
    lang: siteConfig.language,
    icons: [
      {
        src: "/images/logo/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/logo/fitzenix-mark.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
