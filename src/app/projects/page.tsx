import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main id="main" className="shell">
      <section style={{ borderTop: "none", paddingTop: "3.2rem" }}>
        <p className="kicker">Projects</p>
        <h1>I ship small things. You can clone them.</h1>
        <div className="grid" style={{ marginTop: "2rem" }}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
