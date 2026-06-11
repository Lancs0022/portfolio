import { ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="grid-bg absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-5">
          {/* Left: Content */}
          <div className="md:col-span-3">
            {/* Terminal accent line */}
            <div className="mb-6 flex items-center gap-2 font-mono text-xs text-muted">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              <span>available for opportunities</span>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              I build complex software,{" "}
              <span className="text-accent">optimize database architectures</span>,
              and secure automation infrastructure.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Full-stack developer and system administrator with a strong
              background in data optimization and DevOps automation. I design,
              deploy, and maintain end-to-end solutions — from ERP systems to
              cloud backup pipelines.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent/90 cursor-pointer"
              >
                Let&apos;s Talk
                <ArrowRight size={16} />
              </a>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Lancs0022"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-border p-2.5 text-muted transition-colors hover:border-accent hover:text-accent cursor-pointer"
                  aria-label="GitHub"
                >
                  <GithubIcon size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-border p-2.5 text-muted transition-colors hover:border-accent hover:text-accent cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Profile Card */}
          <div className="md:col-span-2">
            <div className="rounded-lg border border-border bg-card p-6 card-glow">
              {/* Avatar placeholder */}
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-background font-mono text-2xl font-bold text-accent">
                JD
              </div>

              <h2 className="text-lg font-bold text-foreground">John Doe</h2>
              <p className="font-mono text-xs text-muted">
                Full-Stack Developer &amp; Systems Engineer
              </p>

              {/* Status indicators */}
              <div className="mt-4 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="text-muted">location</span>
                  <span className="text-foreground">Madagascar</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="text-muted">focus</span>
                  <span className="text-accent-gold">ERP &amp; DevOps</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="text-muted">stack</span>
                  <span className="text-foreground">Laravel / React / Node</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="text-muted">status</span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span className="text-green-400">open to work</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
