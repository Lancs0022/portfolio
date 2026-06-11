"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import {
  LayoutDashboard,
  FolderOpen,
  Code,
  Settings,
  Mail,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/skills", label: "Skills", icon: Code },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const supabase = createClient();
      supabase.auth.getSession().then(({ data }: { data: { session: unknown } }) => {
        const session = data.session;
        if (!session && pathname !== "/admin/login") {
          router.push("/admin/login");
        }
        setLoading(false);
      });
    } catch {
      // Supabase not configured, redirect to login
      if (pathname !== "/admin/login") {
        router.push("/admin/login");
      }
      setLoading(false);
    }
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <span className="font-mono text-sm text-muted">Loading...</span>
      </div>
    );
  }

  async function handleLogout() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    router.push("/admin/login");
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-56 flex-col border-r border-border bg-card p-4 md:flex">
        <Link
          href="/admin"
          className="mb-8 font-mono text-sm font-bold text-accent cursor-pointer"
        >
          Admin Panel
        </Link>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors cursor-pointer ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-card hover:text-foreground"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border pt-4">
          <Link
            href="/"
            className="mb-2 flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-foreground cursor-pointer"
          >
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-accent-red cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
    </div>
  );
}
