"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo / Name */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground transition-colors hover:text-accent cursor-pointer"
        >
          john.doe
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/admin"
            className="rounded-md border border-accent px-4 py-1.5 font-mono text-xs text-accent transition-colors hover:bg-accent/10 cursor-pointer"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-muted transition-colors hover:text-foreground md:hidden cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted transition-colors hover:text-foreground cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="inline-block w-fit rounded-md border border-accent px-4 py-1.5 font-mono text-xs text-accent transition-colors hover:bg-accent/10 cursor-pointer"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
