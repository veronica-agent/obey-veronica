import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.join(process.cwd(), "content");

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  owner: string;
  url: string;
  install?: string;
  voice: boolean;
  org: boolean;
  readme: boolean;
  order: number;
  body: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  repo?: string;
  body: string;
};

function readDir(dir: string, ext: string[]): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => ext.some((e) => file.endsWith(e)));
}

export function getProjects(): Project[] {
  const dir = path.join(root, "projects");
  return readDir(dir, [".md"])
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: String(data.slug ?? file.replace(/\.md$/, "")),
        title: String(data.title),
        tagline: String(data.tagline),
        owner: String(data.owner),
        url: String(data.url),
        install: data.install ? String(data.install) : undefined,
        voice: Boolean(data.voice),
        org: Boolean(data.org),
        readme: Boolean(data.readme),
        order: Number(data.order ?? 99),
        body: content.trim(),
      } satisfies Project;
    })
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

function dateStamp(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? "");
}

export function getPosts(): Post[] {
  const dir = path.join(root, "blog");
  return readDir(dir, [".mdx", ".md"])
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: String(data.slug ?? file.replace(/\.mdx?$/, "")),
        title: String(data.title),
        date: dateStamp(data.date),
        excerpt: String(data.excerpt),
        repo: data.repo ? String(data.repo) : undefined,
        body: content.trim(),
      } satisfies Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
