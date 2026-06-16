"use client";

import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useSite } from "./site-context";
import { TextReveal, FadeIn } from "./animations";
import { GithubIcon, LinkedinIcon } from "./icons";
import { NumberTicker } from "./animations";

export default function Hero() {
  const { t } = useSite();

  return (
    <section className="relative overflow-hidden">
      {/* Grid background */}
      <div className="grid-bg absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28 lg:py-32">
        <div className="grid items-center gap-10 md:grid-cols-5">
          {/* Left content */}
          <div className="md:col-span-3">
            {/* Terminal status */}
            <TextReveal delay={0.1}>
              <div className="mb-5 flex items-center gap-2 font-mono text-xs text-muted-light">
                <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-accent" />
                <span>{t.hero.status}</span>
              </div>
            </TextReveal>

            {/* Headline with Aurora text */}
            <TextReveal delay={0.2}>
              <h1 className="text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-[2.75rem] lg:text-5xl">
                <span className="text-foreground">{t.hero.headline1}</span>
                <span className="aurora-text">{t.hero.headline2}</span>
                <span className="text-foreground">{t.hero.headline3}</span>
                <span className="aurora-text">{t.hero.headline4}</span>
                <span className="text-foreground">{t.hero.headline5}</span>
                <span className="aurora-text">{t.hero.headline6}</span>
                <span className="text-foreground">{t.hero.headline7}</span>
              </h1>
            </TextReveal>

            {/* Sub paragraph */}
            <TextReveal delay={0.4}>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-light md:text-base">
                {t.hero.sub}
              </p>
            </TextReveal>

            {/* Actions */}
            <FadeIn delay={0.6}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
                >
                  {t.hero.cta}
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm text-muted-light transition-colors hover:border-accent/30 hover:text-foreground"
                >
                  {t.hero.ctaSecondary}
                  <ChevronDown size={16} />
                </a>
                {/* Social icons */}
                <div className="ml-2 flex items-center gap-3">
                  <a
                    href="https://github.com/Lancs0022"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-accent"
                    aria-label="GitHub"
                  >
                    <GithubIcon size={18} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-accent"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon size={18} />
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Profile card */}
          <FadeIn delay={0.5} direction="right" className="md:col-span-2">
            <div className="mx-auto max-w-xs rounded-lg border border-border bg-card p-5 card-glow">
              {/* Avatar with portrait */}
              <div className="mb-4 flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-accent/30">
                  <Image
                    src="/images/Portrait_Lancs_15-06-2026.png"
                    alt="Lancaster"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Lancaster</p>
                  <p className="font-mono text-[0.65rem] text-muted">Full-Stack / SysAdmin</p>
                </div>
              </div>

              {/* Status lines */}
              <div className="space-y-2 border-t border-border pt-3">
                {[
                  { label: "status", value: "online", color: "bg-green-500" },
                  { label: "role", value: "full-stack dev" },
                  { label: "focus", value: "ERP / DevOps" },
                  { label: "exp", value: "3+ years" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                      {item.label}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-xs text-muted-light">
                      {item.color && (
                        <span className={`inline-block h-1.5 w-1.5 rounded-full ${item.color}`} />
                      )}
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mini stats */}
              <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3">
                {[
                  { val: 11, suf: "+" },
                  { val: 3, suf: "" },
                  { val: 5, suf: "+" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-base font-bold text-accent">
                      <NumberTicker value={s.val} suffix={s.suf} />
                    </div>
                    <div className="font-mono text-[0.6rem] text-muted">
                      {["projects", "years", "stacks"][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
