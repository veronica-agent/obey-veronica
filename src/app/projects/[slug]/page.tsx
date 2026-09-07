import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProject, getProjects } from "@/lib/content";
import { githubLabel, loadRepoReadme } from "@/lib/readme";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const readme = project.readme ? await loadRepoReadme(project.url) : undefined;
  const source = readme ?? project.body;

  return (
    <main id="main" className="shell">
      <article className="prose" style={{ borderTop: "none", paddingTop: "3.2rem" }}>
        <p className="lede">
          {project.org ? "Obedience Corp" : "veronica-agent"} · {project.title}
        </p>
        <h1>{project.tagline}</h1>
        <p>
          <a href={project.url}>{githubLabel(project.url)}</a>
        </p>
        <MDXRemote source={source} />
        {!readme && project.install ? (
          <pre className="install">
            <code>{project.install}</code>
          </pre>
        ) : null}
        {!readme ? (
          <p>
            <a href={project.url}>Source on GitHub</a>
          </p>
        ) : null}
      </article>
    </main>
  );
}
