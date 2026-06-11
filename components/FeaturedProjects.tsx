import { createClient } from "@/lib/supabase-server";
import type { Project } from "@/lib/types";
import ProjectCard from "./ProjectCard";

export default async function FeaturedProjects() {
  let projects: Project[] | null = null;
  try {
    const supabase = await createClient();
    const result = await supabase
      .from("projects")
      .select("*")
      .eq("category", "featured")
      .order("sort_order", { ascending: true });
    projects = result.data;
  } catch {
    // Supabase not configured, use fallback
  }

  // Fallback data if Supabase is not configured
  const fallbackProjects: Project[] = [
    {
      id: "1",
      title: "DeltaTransport ERP",
      slug: "deltatransport-erp",
      description:
        "Massive logistics & fleet management ERP. Handles inbound/outbound supply with delivery notes, multi-user/multi-role access, tire lifecycle management, technical visit tracking, fuel consumption audits, container tracking, and printable reports.",
      long_description: null,
      category: "featured",
      tech_stack: ["Laravel", "React", "MySQL", "TypeScript"],
      metrics: { users: "Multi-role", modules: "15+", audit: "Full traceability" },
      github_url: null,
      live_url: null,
      image_url: null,
      sort_order: 0,
      created_at: "",
      updated_at: "",
    },
    {
      id: "2",
      title: "PEJAA (Master's Thesis)",
      slug: "pejaa",
      description:
        "Financial auditing platform with real-time stock management and predictive analytical agents powered by LLM/AI. Designed as a research-grade application combining full-stack development with machine learning pipelines.",
      long_description: null,
      category: "featured",
      tech_stack: ["React", "Python", "LLM/AI", "PostgreSQL"],
      metrics: { type: "Research", ai: "Predictive agents", domain: "Finance" },
      github_url: null,
      live_url: null,
      image_url: null,
      sort_order: 1,
      created_at: "",
      updated_at: "",
    },
    {
      id: "3",
      title: "DevOps Admin Tools",
      slug: "devops-admin-tools",
      description:
        "Electron desktop application automating server deployment with PowerShell tasks, watchdog recovery, Cloudflare tunnels for secure web exposure, and daily scheduled cloud backups to Google Drive. Password-protected with server status monitoring.",
      long_description: null,
      category: "featured",
      tech_stack: ["Electron", "PowerShell", "Cloudflare", "Node.js"],
      metrics: { uptime: "Auto-recovery", backups: "Daily 18h", tunnels: "Cloudflare" },
      github_url: "https://github.com/Lancs0022/admin_tools",
      live_url: null,
      image_url: null,
      sort_order: 2,
      created_at: "",
      updated_at: "",
    },
  ];

  const displayProjects = projects && projects.length > 0 ? projects : fallbackProjects;

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      {/* Section header */}
      <div className="mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          // featured work
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          Featured Projects
        </h2>
        <p className="mt-2 max-w-lg text-muted">
          Three major case studies showcasing full-stack development, AI research,
          and infrastructure automation.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
