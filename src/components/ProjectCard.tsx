import Link from "next/link";
import type { Project } from "@/lib/content";
import { Waveform } from "./Waveform";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className={`card${project.voice ? " voice" : ""}`}
    >
      <div className="card-meta">
        <span>{project.org ? "Obedience Corp" : "veronica-agent"}</span>
        {project.voice ? (
          <Waveform className="mini-wave" hot variant="mini" />
        ) : (
          <span>cli</span>
        )}
      </div>
      <h3>{project.title}</h3>
      <p>{project.tagline}</p>
    </Link>
  );
}
