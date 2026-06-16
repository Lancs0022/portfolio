"use client";

import { ExternalLink } from "lucide-react";
import { useSite } from "./site-context";
import { TextReveal, FadeIn } from "./animations";
import { GithubIcon } from "./icons";

export default function SecondaryProjects() {
  const { t } = useSite();

  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        {/* Section header */}
        <TextReveal>
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-block h-px w-8 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              {t.secondary.title}
            </span>
          </div>
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            {t.secondary.subtitle}
          </h2>
        </TextReveal>

        {/* Compact grid */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.secondary.items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-accent/20 hover:bg-card-hover"
              >
                {/* Icon */}
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/8 text-accent">
                  <span className="font-mono text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <ExternalLink size={12} className="shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {item.desc}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.tech.map((tech) => (
                      <span key={tech} className="mono-tag text-[0.6rem]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
