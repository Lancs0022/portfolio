import type { Project } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col rounded-lg border border-border bg-card p-6 card-glow cursor-pointer">
      {/* Category badge */}
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="font-mono text-xs uppercase tracking-wider text-accent">
          {project.category === "featured" ? "Featured" : "Project"}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-foreground">{project.title}</h3>

      {/* Description */}
      {project.description && (
        <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
          {project.description}
        </p>
      )}

      {/* Metrics */}
      {project.metrics && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(project.metrics).map(([key, value]) => (
            <div
              key={key}
              className="rounded border border-border bg-background px-2 py-1"
            >
              <span className="font-mono text-xs text-muted">{key}: </span>
              <span className="font-mono text-xs text-accent-gold">{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tech stack */}
      {project.tech_stack && project.tech_stack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech_stack.map((tech) => (
            <span key={tech} className="mono-tag">
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="mt-auto flex items-center gap-3 pt-4">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent cursor-pointer"
          >
            <GithubIcon size={14} />
            <span>Source</span>
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent cursor-pointer"
          >
            <ExternalLink size={14} />
            <span>Live</span>
          </a>
        )}
      </div>
    </div>
  );
}
