import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ilyazub.dev",
      lastModified: new Date("2026-06-15"),
    },
  ];
}
