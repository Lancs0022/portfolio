"use client";

import { useSite } from "./site-context";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Footer() {
  const { t } = useSite();

  return (
    <footer className="border-t border-border bg-card/20">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row">
        <p className="font-mono text-[0.65rem] text-muted">
          &copy; {new Date().getFullYear()} Lancaster. {t.footer.rights}
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Lancs0022"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
        </div>

        <p className="font-mono text-[0.6rem] text-muted/60">
          {t.footer.builtWith}
        </p>
      </div>
    </footer>
  );
}
