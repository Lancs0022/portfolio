"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-accent resume-mono">
      {children}
    </h2>
  );
}

function Divider() {
  return <hr className="my-6 border-t border-border" />;
}

function ExperienceBlock({
  period,
  title,
  company,
  bullets,
}: {
  period: string;
  title: string;
  company: string;
  bullets: string[];
}) {
  return (
    <div className="mb-6 last:mb-0">
      <p className="resume-mono text-xs text-muted">{period}</p>
      <h3 className="mt-1 text-base font-bold text-foreground">{title}</h3>
      <p className="text-sm text-muted-light">{company}</p>
      {bullets.length > 0 && (
        <ul className="mt-2 space-y-1 pl-4 text-sm text-muted-light">
          {bullets.map((b, i) => (
            <li key={i} className="list-disc">
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back bar */}
      <div className="no-print border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-light transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-light transition-colors hover:border-accent/30 hover:text-foreground"
            aria-label="Print resume"
          >
            <Printer size={14} />
            Print
          </button>
        </div>
      </div>

      {/* Paper wrapper */}
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12 lg:py-16">
        <div className="rounded-xl border border-border bg-card shadow-2xl shadow-black/40">
          <div className="px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-16">
            {/* ─── Header ──────────────────────────────────────────── */}
            <header className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <div>
                <h1
                  className="text-4xl font-black uppercase leading-none tracking-tight text-foreground sm:text-5xl md:text-6xl"
                  style={{ textWrap: "balance" }}
                >
                  LANCASTER
                </h1>
                <p className="mt-2 text-base font-medium text-muted-light sm:text-lg">
                  Full-Stack Developer &amp; Systems Engineer
                </p>
                <p className="mt-1 resume-mono text-xs text-muted">
                  LAIPELIKA Dufresnes Lancaster &middot; 25 y/o &middot; Toamasina, Madagascar
                </p>
              </div>
              <div className="flex items-center gap-2.5 rounded-md border border-accent/20 bg-accent/5 px-4 py-2.5">
                <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-accent" />
                <span className="resume-mono text-xs font-bold uppercase tracking-widest text-accent">
                  Available for Projects
                </span>
              </div>
            </header>

            <Divider />

            {/* ─── Two-column layout ───────────────────────────────── */}
            <div className="grid gap-10 md:grid-cols-12">
              {/* Left column */}
              <aside className="md:col-span-4">
                {/* Profile */}
                <section>
                  <SectionTitle>Profile</SectionTitle>
                  <p className="text-sm leading-relaxed text-muted-light">
                    Full-stack developer and system administrator with a strong
                    background in data optimization and DevOps automation. I manage
                    projects end-to-end &mdash; from schema design to production
                    deployment. Specialized in complex ERP systems, database
                    architecture, and infrastructure automation.
                  </p>
                </section>

                <Divider />

                {/* Contact */}
                <section>
                  <SectionTitle>Contact</SectionTitle>
                  <div className="space-y-0">
                    {[
                      { label: "GitHub", href: "https://github.com/Lancs0022", value: "github.com/Lancs0022" },
                      { label: "Email", href: "mailto:Lancs0022@gmail.com", value: "Lancs0022@gmail.com" },
                      { label: "Phone", href: "tel:+261347814199", value: "+261 34 78 141 99" },
                      { label: "Location", href: undefined, value: "Toamasina, Madagascar" },
                    ].map((link, i) => (
                      <div
                        key={link.label}
                        className={`flex items-center justify-between py-2.5 ${
                          i > 0 ? "border-t border-border" : ""
                        }`}
                      >
                        <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                          {link.label}
                        </span>
                        {link.href ? (
                          <a
                            href={link.href}
                            target={link.href.startsWith("mailto") || link.href.startsWith("tel") ? undefined : "_blank"}
                            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="resume-mono text-xs text-muted-light transition-colors hover:text-accent"
                          >
                            {link.value}
                          </a>
                        ) : (
                          <span className="resume-mono text-xs text-muted-light">{link.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                <Divider />

                {/* Education */}
                <section>
                  <SectionTitle>Education</SectionTitle>
                  <div className="space-y-4">
                    <div>
                      <p className="resume-mono text-xs text-muted">2024 &ndash; Present</p>
                      <h3 className="mt-1 text-sm font-bold text-foreground">
                        Master 2 (M2) G&eacute;nie Informatique
                      </h3>
                      <p className="text-xs text-muted-light">
                        Universit&eacute; de Toamasina (Facult&eacute; des Sciences)
                      </p>
                    </div>
                    <div>
                      <p className="resume-mono text-xs text-muted">2019 &ndash; 2023</p>
                      <h3 className="mt-1 text-sm font-bold text-foreground">
                        Licence Math&eacute;matiques, Informatique et Applications (MIA)
                      </h3>
                      <p className="text-xs text-muted-light">
                        Universit&eacute; de Toamasina
                      </p>
                    </div>
                    <div>
                      <p className="resume-mono text-xs text-muted">2023</p>
                      <h3 className="mt-1 text-sm font-bold text-foreground">
                        SAYNA &mdash; DCLIC Web Development
                      </h3>
                      <p className="text-xs text-muted-light">
                        Team-based web dev training program
                      </p>
                    </div>
                  </div>
                </section>

                <Divider />

                {/* Languages */}
                <section>
                  <SectionTitle>Languages</SectionTitle>
                  <div className="space-y-2">
                    {[
                      { lang: "Malagasy", level: "Native" },
                      { lang: "French", level: "B2" },
                      { lang: "English", level: "B2" },
                      { lang: "German", level: "A2" },
                    ].map((l) => (
                      <div key={l.lang} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{l.lang}</span>
                        <span className="resume-mono text-xs text-muted-light">{l.level}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </aside>

              {/* Right column */}
              <div className="md:col-span-8">
                {/* Experience */}
                <section>
                  <SectionTitle>Experience</SectionTitle>
                  <div className="space-y-0 divide-y divide-border">
                    <div className="pb-6 first:pt-0">
                      <ExperienceBlock
                        period="Sept 2025 — Jan 2026"
                        title="Freelance — Tech / Developer & IT Support"
                        company="Delta Transport"
                        bullets={[
                          "Full deployment of logistics ERP on local infrastructure with dedicated server configuration",
                          "Database management, preventive/corrective maintenance and optimization",
                          "Deep diagnostic and resolution of complex technical issues (Level 1-3 support)",
                          "Hardware diagnostics, network administration, PowerShell/Bash automation",
                        ]}
                      />
                    </div>
                    <div className="pt-6">
                      <ExperienceBlock
                        period="2024 — Present"
                        title="PEJAA — Master's Thesis Project"
                        company="Academic Research"
                        bullets={[
                          "Developing financial auditing platform with real-time stock management and discrepancy detection",
                          "Designing AI/LLM analytical agent module for proactive financial alerts and predictive analysis",
                          "Implementing advanced reporting with printable financial audit documents",
                        ]}
                      />
                    </div>
                  </div>
                </section>

                <Divider />

                {/* Key Projects */}
                <section>
                  <SectionTitle>Key Projects</SectionTitle>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        name: "DeltaTransport ERP",
                        tech: "Laravel, React, MySQL, PowerShell",
                        desc: "Full logistics & fleet management ERP with multi-role access, tire lifecycle tracking, fuel audits, and printable reports.",
                      },
                      {
                        name: "DevOps Admin Tools",
                        tech: "Electron, PowerShell, Cloudflare",
                        desc: "Desktop app automating ERP deployment with server watchdog, tunnel management, and daily cloud backups.",
                      },
                      {
                        name: "Tari-dalana (GSN 2024)",
                        tech: "PHP, JavaScript, HTML/CSS",
                        desc: "Hackathon laureate (2nd place national). Teacher tracking & training optimization platform.",
                      },
                      {
                        name: "Fanorona IA",
                        tech: "Python, Machine Learning",
                        desc: "Traditional Malagasy board game with AI opponent learning iteratively from game data.",
                      },
                    ].map((p) => (
                      <div key={p.name} className="rounded-lg border border-border bg-background/50 p-4">
                        <h3 className="text-sm font-bold text-foreground">{p.name}</h3>
                        <p className="resume-mono mt-1 text-[0.65rem] uppercase tracking-wider text-muted">
                          {p.tech}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-muted-light">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <Divider />

                {/* Technical Stack */}
                <section>
                  <SectionTitle>Technical Stack</SectionTitle>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        cat: "Development",
                        items: ["Laravel", "React", "Next.js", "Tailwind CSS", "TypeScript", "Python", "C++", "Java", "PHP"],
                      },
                      {
                        cat: "Data & Databases",
                        items: ["PostgreSQL", "MySQL", "Schema Design", "SQL Optimization", "Query Tuning", "Indexing Strategy"],
                      },
                      {
                        cat: "Infrastructure",
                        items: ["Linux Admin", "Network Admin", "PowerShell / Bash", "Cloudflare Tunnels", "Docker", "Vercel"],
                      },
                      {
                        cat: "Tools & Hardware",
                        items: ["Hardware Diagnostics", "Electron", "Git", "CI/CD", "Automated Backups"],
                      },
                    ].map((group) => (
                      <div key={group.cat} className="rounded-lg border border-border bg-background/50 p-4">
                        <h3 className="resume-mono mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
                          {group.cat}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {group.items.map((item) => (
                            <span
                              key={item}
                              className="rounded border border-border bg-card px-2 py-0.5 text-[0.7rem] text-muted-light resume-mono"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* ─── Footer ──────────────────────────────────────────── */}
            <Divider />
            <footer className="flex items-center justify-between">
              <p className="resume-mono text-[0.65rem] uppercase tracking-wider text-muted">
                &copy; {new Date().getFullYear()} Lancaster &mdash; LAIPELIKA Dufresnes
              </p>
              <Link
                href="/"
                className="resume-mono text-[0.65rem] uppercase tracking-wider text-muted-light transition-colors hover:text-accent"
              >
                Portfolio
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
