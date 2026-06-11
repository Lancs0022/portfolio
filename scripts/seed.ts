/**
 * Seed script - Run after creating Supabase project and running schema.sql
 * Usage: npx tsx scripts/seed.ts
 *
 * Required: .env.local must have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

async function seed() {
  console.log("Seeding database...\n");

  // -- Site Settings --
  const settings: { section: string; content: Record<string, string> }[] = [
    {
      section: "hero",
      content: {
        headline: "I build complex software, optimize database architectures, and secure automation infrastructure.",
        subheadline: "Full-stack developer and system administrator with a strong background in data optimization and DevOps automation. I design, deploy, and maintain end-to-end solutions — from ERP systems to cloud backup pipelines.",
        status_text: "available for opportunities",
      },
    },
    {
      section: "about",
      content: {
        name: "John Doe",
        title: "Full-Stack Developer & Systems Engineer",
        location: "Madagascar",
        bio: "Experienced in building large-scale ERP systems, financial auditing platforms with AI, and DevOps automation tools. Strong background in database optimization, hardware/software maintenance, and network administration.",
      },
    },
    {
      section: "social",
      content: {
        github: "https://github.com/Lancs0022",
        linkedin: "https://linkedin.com",
        email: "contact@example.com",
      },
    },
  ];

  for (const s of settings) {
    await supabase.from("site_settings").upsert(s, { onConflict: "section" });
  }
  console.log("[OK] Site settings seeded");

  // -- Projects --
  const projects = [
    {
      title: "DeltaTransport ERP",
      slug: "deltatransport-erp",
      description: "Massive logistics & fleet management ERP. Handles inbound/outbound supply with delivery notes, multi-user/multi-role access, tire lifecycle management, technical visit tracking, fuel consumption audits, container tracking, and printable reports.",
      category: "featured",
      tech_stack: ["Laravel", "React", "MySQL", "TypeScript"],
      metrics: { users: "Multi-role", modules: "15+", audit: "Full traceability" },
      github_url: null,
      live_url: null,
      sort_order: 0,
    },
    {
      title: "PEJAA (Master's Thesis)",
      slug: "pejaa",
      description: "Financial auditing platform with real-time stock management and predictive analytical agents powered by LLM/AI. Combines full-stack development with machine learning pipelines for research-grade analysis.",
      category: "featured",
      tech_stack: ["React", "Python", "LLM/AI", "PostgreSQL"],
      metrics: { type: "Research", ai: "Predictive agents", domain: "Finance" },
      github_url: null,
      live_url: null,
      sort_order: 1,
    },
    {
      title: "DevOps Admin Tools",
      slug: "devops-admin-tools",
      description: "Electron desktop application automating server deployment with PowerShell tasks, watchdog recovery, Cloudflare tunnels for secure web exposure, and daily scheduled cloud backups to Google Drive. Password-protected with server status monitoring.",
      category: "featured",
      tech_stack: ["Electron", "PowerShell", "Cloudflare", "Node.js"],
      metrics: { uptime: "Auto-recovery", backups: "Daily 18h", tunnels: "Cloudflare" },
      github_url: "https://github.com/Lancs0022/admin_tools",
      live_url: null,
      sort_order: 2,
    },
    {
      title: "OCR Text Extractor",
      slug: "ocr-text-extractor",
      description: "Python application that extracts text from images using OCR.",
      category: "secondary",
      tech_stack: ["Python", "Tesseract"],
      github_url: "https://github.com/Lancs0022/Scaneur-de-texte",
      sort_order: 0,
    },
    {
      title: "Multi-service Desktop App",
      slug: "multiservice-app",
      description: "Qt/C++ desktop application for managing purchases and photocopy services.",
      category: "secondary",
      tech_stack: ["Qt", "C++"],
      github_url: "https://github.com/Lancs0022/Application-de-gestion-d-achat",
      sort_order: 1,
    },
    {
      title: "Design Tool",
      slug: "design-tool",
      description: "Java drawing application with canvas tools and shape manipulation.",
      category: "secondary",
      tech_stack: ["Java", "Swing"],
      github_url: "https://github.com/Lancs0022/DesignTool",
      sort_order: 2,
    },
    {
      title: "File Explorer",
      slug: "file-explorer",
      description: "Functional file explorer built in Java with directory navigation and operations.",
      category: "secondary",
      tech_stack: ["Java", "Swing"],
      github_url: "https://github.com/Lancs0022/ExplorateurDeFichier",
      sort_order: 3,
    },
    {
      title: "Media Player",
      slug: "media-player",
      description: "Multimedia player built with PHP, HTML, and CSS. First web application project.",
      category: "secondary",
      tech_stack: ["PHP", "HTML", "CSS"],
      github_url: "https://github.com/Lancs0022/Lecteur_media",
      sort_order: 4,
    },
    {
      title: "3D Ice Model",
      slug: "3d-ice-model",
      description: "OpenSCAD 3D model of an ice cream for 3D printing experimentation.",
      category: "secondary",
      tech_stack: ["OpenSCAD", "3D Printing"],
      github_url: "https://github.com/Lancs0022/Mod-lisation-3D-d-une-glace",
      sort_order: 5,
    },
    {
      title: "Fanorona Game",
      slug: "fanorona",
      description: "Traditional Malagasy board game implemented in Python.",
      category: "secondary",
      tech_stack: ["Python"],
      github_url: "https://github.com/Lancs0022/Fanorona",
      sort_order: 6,
    },
    {
      title: "LLM Communication",
      slug: "llm-communication",
      description: "Small project to interface with LLM models for conversational AI.",
      category: "secondary",
      tech_stack: ["Python", "LLM API"],
      github_url: "https://github.com/Lancs0022/Communiquer-avec-un-modele",
      sort_order: 7,
    },
    {
      title: "Image Processing (Octave)",
      slug: "octave-image-processing",
      description: "Image processing project using Octave for filtering, transformations, and analysis.",
      category: "secondary",
      tech_stack: ["Octave", "MATLAB"],
      github_url: "https://github.com/Lancs0022/Projet-Octave",
      sort_order: 8,
    },
  ];

  const { error: projectError } = await supabase.from("projects").upsert(projects, { onConflict: "slug" });
  if (projectError) console.error("Projects error:", projectError);
  else console.log("[OK] Projects seeded");

  // -- Skills --
  const skills = [
    { category: "backend", name: "Laravel", level: "expert", sort_order: 0 },
    { category: "backend", name: "React", level: "expert", sort_order: 1 },
    { category: "backend", name: "Next.js", level: "advanced", sort_order: 2 },
    { category: "backend", name: "Node.js", level: "advanced", sort_order: 3 },
    { category: "backend", name: "PHP", level: "expert", sort_order: 4 },
    { category: "backend", name: "TypeScript", level: "advanced", sort_order: 5 },
    { category: "backend", name: "HTML/CSS", level: "expert", sort_order: 6 },
    { category: "backend", name: "Tailwind CSS", level: "advanced", sort_order: 7 },
    { category: "database", name: "MySQL", level: "expert", sort_order: 0 },
    { category: "database", name: "PostgreSQL", level: "advanced", sort_order: 1 },
    { category: "database", name: "SQL Optimization", level: "expert", sort_order: 2 },
    { category: "database", name: "Schema Design", level: "expert", sort_order: 3 },
    { category: "database", name: "Query Tuning", level: "advanced", sort_order: 4 },
    { category: "systems", name: "Hardware Diagnostics", level: "expert", sort_order: 0 },
    { category: "systems", name: "Network Administration", level: "advanced", sort_order: 1 },
    { category: "systems", name: "PowerShell Scripting", level: "expert", sort_order: 2 },
    { category: "systems", name: "Bash Scripting", level: "advanced", sort_order: 3 },
    { category: "systems", name: "Cloudflare Tunnels", level: "advanced", sort_order: 4 },
    { category: "systems", name: "Automated Backups", level: "expert", sort_order: 5 },
    { category: "systems", name: "Linux Administration", level: "advanced", sort_order: 6 },
    { category: "tools", name: "Git", level: "expert", sort_order: 0 },
    { category: "tools", name: "Docker", level: "intermediate", sort_order: 1 },
    { category: "tools", name: "Electron", level: "advanced", sort_order: 2 },
    { category: "tools", name: "CI/CD Pipelines", level: "intermediate", sort_order: 3 },
    { category: "tools", name: "Vercel", level: "advanced", sort_order: 4 },
  ];

  const { error: skillError } = await supabase.from("skills").insert(skills);
  if (skillError) console.error("Skills error:", skillError);
  else console.log("[OK] Skills seeded");

  console.log("\nSeed complete!");
}

seed().catch(console.error);
