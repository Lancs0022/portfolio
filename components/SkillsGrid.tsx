import { createClient } from "@/lib/supabase-server";
import type { Skill } from "@/lib/types";
import {
  Server,
  Code,
  Database,
  Wrench,
  Terminal,
} from "lucide-react";

const categoryLabels: Record<string, string> = {
  backend: "Backend & Frontend",
  frontend: "Frontend Frameworks",
  database: "Database Engineering",
  systems: "Systems & Infrastructure",
  tools: "Tools & DevOps",
};

const categoryIcons: Record<string, React.ReactNode> = {
  backend: <Code size={18} />,
  frontend: <Code size={18} />,
  database: <Database size={18} />,
  systems: <Server size={18} />,
  tools: <Wrench size={18} />,
};

const fallbackSkills: Skill[] = [
  // Backend & Frontend
  { id: "1", category: "backend", name: "Laravel", level: "expert", icon: null, sort_order: 0 },
  { id: "2", category: "backend", name: "React", level: "expert", icon: null, sort_order: 1 },
  { id: "3", category: "backend", name: "Next.js", level: "advanced", icon: null, sort_order: 2 },
  { id: "4", category: "backend", name: "Node.js", level: "advanced", icon: null, sort_order: 3 },
  { id: "5", category: "backend", name: "PHP", level: "expert", icon: null, sort_order: 4 },
  { id: "6", category: "backend", name: "TypeScript", level: "advanced", icon: null, sort_order: 5 },
  { id: "7", category: "backend", name: "HTML/CSS", level: "expert", icon: null, sort_order: 6 },
  { id: "8", category: "backend", name: "Tailwind CSS", level: "advanced", icon: null, sort_order: 7 },
  // Database
  { id: "9", category: "database", name: "MySQL", level: "expert", icon: null, sort_order: 0 },
  { id: "10", category: "database", name: "PostgreSQL", level: "advanced", icon: null, sort_order: 1 },
  { id: "11", category: "database", name: "SQL Optimization", level: "expert", icon: null, sort_order: 2 },
  { id: "12", category: "database", name: "Schema Design", level: "expert", icon: null, sort_order: 3 },
  { id: "13", category: "database", name: "Query Tuning", level: "advanced", icon: null, sort_order: 4 },
  // Systems
  { id: "14", category: "systems", name: "Hardware Diagnostics", level: "expert", icon: null, sort_order: 0 },
  { id: "15", category: "systems", name: "Network Administration", level: "advanced", icon: null, sort_order: 1 },
  { id: "16", category: "systems", name: "PowerShell Scripting", level: "expert", icon: null, sort_order: 2 },
  { id: "17", category: "systems", name: "Bash Scripting", level: "advanced", icon: null, sort_order: 3 },
  { id: "18", category: "systems", name: "Cloudflare Tunnels", level: "advanced", icon: null, sort_order: 4 },
  { id: "19", category: "systems", name: "Automated Backups", level: "expert", icon: null, sort_order: 5 },
  { id: "20", category: "systems", name: "Linux Administration", level: "advanced", icon: null, sort_order: 6 },
  // Tools
  { id: "21", category: "tools", name: "Git", level: "expert", icon: null, sort_order: 0 },
  { id: "22", category: "tools", name: "Docker", level: "intermediate", icon: null, sort_order: 1 },
  { id: "23", category: "tools", name: "Electron", level: "advanced", icon: null, sort_order: 2 },
  { id: "24", category: "tools", name: "CI/CD Pipelines", level: "intermediate", icon: null, sort_order: 3 },
  { id: "25", category: "tools", name: "Vercel", level: "advanced", icon: null, sort_order: 4 },
];

const levelColors: Record<string, string> = {
  expert: "bg-accent",
  advanced: "bg-accent-gold",
  intermediate: "bg-muted",
};

export default async function SkillsGrid() {
  let skills: Skill[] | null = null;
  try {
    const supabase = await createClient();
    const result = await supabase
      .from("skills")
      .select("*")
      .order("sort_order", { ascending: true });
    skills = result.data;
  } catch {
    // Supabase not configured, use fallback
  }

  const displaySkills = skills && skills.length > 0 ? skills : fallbackSkills;

  const categories = [
    "backend",
    "database",
    "systems",
    "tools",
  ];

  return (
    <section id="skills" className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            // technical competencies
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Skills &amp; Infrastructure
          </h2>
          <p className="mt-2 max-w-lg text-muted">
            A dashboard view of core competencies across development, database
            engineering, and systems administration.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((cat) => {
            const catSkills = displaySkills.filter((s) => s.category === cat);
            return (
              <div
                key={cat}
                className="rounded-lg border border-border bg-card p-6"
              >
                {/* Category header */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-accent">
                    {categoryIcons[cat] || <Terminal size={18} />}
                  </span>
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
                    {categoryLabels[cat] || cat}
                  </h3>
                </div>

                {/* Skills list */}
                <div className="space-y-2">
                  {catSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between border-t border-border/50 py-2"
                    >
                      <span className="text-sm text-foreground">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        {skill.level && (
                          <>
                            <span
                              className={`inline-block h-1.5 w-1.5 rounded-full ${levelColors[skill.level] || "bg-muted"}`}
                            />
                            <span className="font-mono text-xs text-muted">
                              {skill.level}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
