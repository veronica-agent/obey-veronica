import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/content";

export const dynamic = "force-static";

const site = "https://obey-veronica.com";

function url(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? `${site}/` : `${site}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/about"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/blog"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/projects"), changeFrequency: "weekly", priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getProjects().map((project) => ({
    url: url(`/projects/${project.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
