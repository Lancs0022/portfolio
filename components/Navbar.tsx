"use client";

import { FileText, Globe, Menu, Moon, Sun, X, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ShineBorder } from "./animations";
import { useSite } from "./site-context";

export default function Navbar() {
  const { t, lang, toggleLang, ldm, toggleLdm, theme, toggleTheme } = useSite();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "#projects", label: t.nav.projects },
    { href: "#skills", label: t.nav.skills },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        {/* Left: Logo */}
        <Link
          href="/"
          className="text-base font-bold tracking-tight text-foreground transition-colors hover:text-accent"
        >
          LANCASTER
        </Link>

        {/* Right: Controls + Nav */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-muted-light transition-colors hover:border-accent/30 hover:text-foreground"
            aria-label="Toggle language"
          >
            <Globe size={13} />
            <span className="font-mono">{lang === "en" ? "FR" : "EN"}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-muted-light transition-colors hover:border-accent/30 hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
          </button>

          {/* LDM Toggle */}
          <button
            onClick={toggleLdm}
            className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
              ldm
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-border bg-card text-muted-light hover:border-accent/30 hover:text-foreground"
            }`}
            aria-label="Toggle Low Detail Mode"
          >
            <Zap size={13} />
            <span className="font-mono">LDM</span>
          </button>

          {/* Nav Links */}
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-light transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}

          {/* Admin CTA */}
          <a
            href="/admin"
            className="relative ml-1 overflow-hidden rounded-md bg-card px-4 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-card-hover"
          >
            <ShineBorder borderWidth={1} duration={20} shineColor={["#f77f00", "#fcbf49"]} />
            <span className="relative z-10">{t.nav.admin}</span>
          </a>

          {/* Resume link */}
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-muted-light transition-colors hover:border-foreground/30 hover:text-foreground"
            aria-label="View resume"
          >
            <FileText size={13} />
            <span className="font-mono">{t.nav.resume}</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-5 pb-5 pt-3 md:hidden">
          {/* Controls */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-muted-light"
            >
              <Globe size={13} />
              <span className="font-mono">{lang === "en" ? "FR" : "EN"}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-muted-light"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
            </button>
            <button
              onClick={toggleLdm}
              className={`flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium ${
                ldm
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-border bg-card text-muted-light"
              }`}
            >
              <Zap size={13} />
              <span className="font-mono">LDM</span>
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-light transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/admin"
              className="mt-1 inline-block rounded-md border border-accent/30 bg-card px-4 py-2 text-center text-xs font-semibold text-accent"
            >
              {t.nav.admin}
            </a>
            <a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-xs font-medium text-muted-light"
            >
              <FileText size={13} />
              {t.nav.resume}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
