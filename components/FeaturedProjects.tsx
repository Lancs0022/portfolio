"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Lock } from "lucide-react";
import { useSite } from "./site-context";
import { TextReveal, FadeIn, Marquee, BorderBeam } from "./animations";
import { GithubIcon } from "./icons";

// ─── Tech Stack Marquee ─────────────────────────────────────────────
function TechMarquee() {
  const techs = [
    "Laravel", "React", "Next.js", "Tailwind CSS", "PostgreSQL", "MySQL",
    "TypeScript", "Python", "C++", "PowerShell", "Bash", "Docker",
    "Electron", "Cloudflare", "Linux", "Git",
  ];

  return (
    <Marquee>
      {techs.map((tech) => (
        <span
          key={tech}
          className="whitespace-nowrap rounded-md border border-border bg-card px-4 py-2 font-mono text-xs text-muted-light"
        >
          {tech}
        </span>
      ))}
    </Marquee>
  );
}

// ─── Project Card ───────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: {
    title: string;
    badge: string;
    badgeColor: "red" | "gold";
    description: string;
    longDesc: string;
    tech: string[];
    metrics: string[];
    github: string | null;
  };
  index: number;
}) {
  const { t } = useSite();
  const [expanded, setExpanded] = useState(false);

  const badgeColors = {
    red: "border-accent-red/40 bg-accent-red/10 text-accent-red",
    gold: "border-accent-gold/40 bg-accent-gold/10 text-accent-gold",
  };

  return (
    <FadeIn delay={index * 0.15}>
      <div className="tilt-card group flex h-full flex-col rounded-lg border border-border bg-card card-glow">
        {/* Header */}
        <div className="p-5 pb-0">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-accent">
                0{index + 1}
              </span>
            </div>
            <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.6rem] ${badgeColors[project.badgeColor]}`}>
              {project.badgeColor === "red" && <Lock size={9} className="mr-1 inline" />}
              {project.badge}
            </span>
          </div>
          <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
        </div>

        {/* Description */}
        <div className="flex-1 p-5 pt-3">
          <p className="text-sm leading-relaxed text-muted-light">
            {expanded ? project.longDesc : project.description}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 font-mono text-xs text-accent transition-colors hover:text-accent-gold"
          >
            {expanded ? "← less" : "read more →"}
          </button>
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap gap-2 px-5 pb-3">
          {project.metrics.map((m) => (
            <span key={m} className="mono-tag">
              <span className="mr-1 inline-block h-1 w-1 rounded-full bg-accent" />
              {m}
            </span>
          ))}
        </div>

        {/* Tech stack + actions */}
        <div className="flex items-center justify-between border-t border-border p-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((tech) => (
              <span key={tech} className="mono-tag">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-light transition-colors hover:border-accent/30 hover:text-foreground"
              >
                <GithubIcon size={13} />
                <span className="hidden sm:inline">{t.projects.viewGithub}</span>
              </a>
            ) : (
              <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
                <Lock size={12} />
                {t.projects.privateRepo}
              </span>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── Featured Projects Section ──────────────────────────────────────
export default function FeaturedProjects() {
  const { t } = useSite();

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        {/* Section header */}
        <TextReveal>
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-block h-px w-8 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              {t.projects.title}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            {t.projects.subtitle}
          </h2>
        </TextReveal>

        {/* Project grid */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.projects.featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Tech Stack Marquee */}
        <div className="mt-16">
          <TextReveal>
            <p className="mb-3 text-center font-mono text-xs uppercase tracking-widest text-muted">
              tech stack
            </p>
          </TextReveal>
          <TechMarquee />
        </div>
      </div>
    </section>
  );
}
