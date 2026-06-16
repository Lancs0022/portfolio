"use client";

import { Code, Database, Server } from "lucide-react";
import { useSite } from "./site-context";
import { TextReveal, FadeIn, BorderBeam } from "./animations";

const categoryIcons = [
  <Code key="code" size={18} />,
  <Database key="db" size={18} />,
  <Server key="srv" size={18} />,
];

export default function SkillsGrid() {
  const { t } = useSite();

  return (
    <section id="skills" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        {/* Section header */}
        <TextReveal>
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-block h-px w-8 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              {t.skills.title}
            </span>
          </div>
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            {t.skills.subtitle}
          </h2>
        </TextReveal>

        {/* Dashboard grid */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.skills.categories.map((cat, i) => (
            <FadeIn key={cat.name} delay={i * 0.12}>
              <BorderBeam className="h-full rounded-lg">
                <div className="flex h-full flex-col border border-border bg-card p-5">
                  {/* Category header */}
                  <div className="mb-4 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/10 text-accent">
                      {categoryIcons[i]}
                    </div>
                    <h3 className="text-sm font-bold text-foreground">{cat.name}</h3>
                  </div>

                  {/* Skills list */}
                  <div className="flex flex-1 flex-wrap gap-2">
                    {cat.items.map((skill) => (
                      <span
                        key={skill}
                        className="mono-tag transition-colors hover:border-accent/30 hover:text-accent"
                      >
                        <span className="mr-1.5 inline-block h-1 w-1 rounded-full bg-accent/60" />
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Count */}
                  <div className="mt-4 border-t border-border pt-3">
                    <span className="font-mono text-[0.65rem] text-muted">
                      {cat.items.length} technologies
                    </span>
                  </div>
                </div>
              </BorderBeam>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
