import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const site = "https://obey-veronica.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site}/sitemap.xml`,
  };
}
