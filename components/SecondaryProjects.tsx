import { createClient } from "@/lib/supabase-server";
import type { Project } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";

const fallbackProjects: Project[] = [
  {
    id: "s1", title: "OCR Text Extractor", slug: "ocr-text-extractor",
    description: "Python application that extracts text from images using OCR.",
    long_description: null, category: "secondary", tech_stack: ["Python", "Tesseract"],
    metrics: null, github_url: "https://github.com/Lancs0022/Scaneur-de-texte",
    live_url: null, image_url: null, sort_order: 0, created_at: "", updated_at: "",
  },
  {
    id: "s2", title: "Multi-service Desktop App", slug: "multiservice-app",
    description: "Qt/C++ desktop application for managing purchases and photocopy services.",
    long_description: null, category: "secondary", tech_stack: ["Qt", "C++"],
    metrics: null, github_url: "https://github.com/Lancs0022/Application-de-gestion-d-achat",
    live_url: null, image_url: null, sort_order: 1, created_at: "", updated_at: "",
  },
  {
    id: "s3", title: "Design Tool", slug: "design-tool",
    description: "Java drawing application with canvas tools and shape manipulation.",
    long_description: null, category: "secondary", tech_stack: ["Java", "Swing"],
    metrics: null, github_url: "https://github.com/Lancs0022/DesignTool",
    live_url: null, image_url: null, sort_order: 2, created_at: "", updated_at: "",
  },
  {
    id: "s4", title: "File Explorer", slug: "file-explorer",
    description: "Functional file explorer built in Java with directory navigation and operations.",
    long_description: null, category: "secondary", tech_stack: ["Java", "Swing"],
    metrics: null, github_url: "https://github.com/Lancs0022/ExplorateurDeFichier",
    live_url: null, image_url: null, sort_order: 3, created_at: "", updated_at: "",
  },
  {
    id: "s5", title: "Media Player", slug: "media-player",
    description: "Multimedia player built with PHP, HTML, and CSS. First web application project.",
    long_description: null, category: "secondary", tech_stack: ["PHP", "HTML", "CSS"],
    metrics: null, github_url: "https://github.com/Lancs0022/Lecteur_media",
    live_url: null, image_url: null, sort_order: 4, created_at: "", updated_at: "",
  },
  {
    id: "s6", title: "3D Ice Model", slug: "3d-ice-model",
    description: "OpenSCAD 3D model of an ice cream for 3D printing experimentation.",
    long_description: null, category: "secondary", tech_stack: ["OpenSCAD", "3D Printing"],
    metrics: null, github_url: "https://github.com/Lancs0022/Mod-lisation-3D-d-une-glace",
    live_url: null, image_url: null, sort_order: 5, created_at: "", updated_at: "",
  },
  {
    id: "s7", title: "Fanorona Game", slug: "fanorona",
    description: "Traditional Malagasy board game implemented in Python.",
    long_description: null, category: "secondary", tech_stack: ["Python"],
    metrics: null, github_url: "https://github.com/Lancs0022/Fanorona",
    live_url: null, image_url: null, sort_order: 6, created_at: "", updated_at: "",
  },
  {
    id: "s8", title: "LLM Communication", slug: "llm-communication",
    description: "Small project to interface with LLM models for conversational AI.",
    long_description: null, category: "secondary", tech_stack: ["Python", "LLM API"],
    metrics: null, github_url: "https://github.com/Lancs0022/Communiquer-avec-un-modele",
    live_url: null, image_url: null, sort_order: 7, created_at: "", updated_at: "",
  },
  {
    id: "s9", title: "Image Processing (Octave)", slug: "octave-image-processing",
    description: "Image processing project using Octave for filtering, transformations, and analysis.",
    long_description: null, category: "secondary", tech_stack: ["Octave", "MATLAB"],
    metrics: null, github_url: "https://github.com/Lancs0022/Projet-Octave",
    live_url: null, image_url: null, sort_order: 8, created_at: "", updated_at: "",
  },
];

export default async function SecondaryProjects() {
  let projects: Project[] | null = null;
  try {
    const supabase = await createClient();
    const result = await supabase
      .from("projects")
      .select("*")
      .eq("category", "secondary")
      .order("sort_order", { ascending: true });
    projects = result.data;
  } catch {
    // Supabase not configured, use fallback
  }

  const displayProjects =
    projects && projects.length > 0 ? projects : fallbackProjects;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          // tools &amp; utilities
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          Secondary Projects
        </h2>
        <p className="mt-2 max-w-lg text-muted">
          Smaller utilities, learning projects, and experimental tools across
          multiple languages.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayProjects.map((project) => (
          <div
            key={project.id}
            className="group rounded-lg border border-border bg-card p-4 card-glow cursor-pointer"
          >
            <h3 className="text-sm font-semibold text-foreground">
              {project.title}
            </h3>
            {project.description && (
              <p className="mt-1 text-xs leading-relaxed text-muted line-clamp-2">
                {project.description}
              </p>
            )}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {project.tech_stack?.slice(0, 3).map((tech: string) => (
                  <span key={tech} className="mono-tag text-[10px]">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-accent cursor-pointer"
                    aria-label={`${project.title} GitHub`}
                  >
                    <GithubIcon size={14} />
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-accent cursor-pointer"
                    aria-label={`${project.title} Live`}
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
