import { GithubIcon, LinkedinIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        {/* Copyright */}
        <p className="font-mono text-xs text-muted">
          &copy; {new Date().getFullYear()} John Doe. All rights reserved.
        </p>

        {/* Social links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Lancs0022"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent cursor-pointer"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent cursor-pointer"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
        </div>

        {/* Built with */}
        <p className="font-mono text-xs text-muted">
          Built with{" "}
          <span className="text-accent">Next.js</span> +{" "}
          <span className="text-accent-gold">Supabase</span>
        </p>
      </div>
    </footer>
  );
}
