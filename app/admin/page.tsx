"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { FolderOpen, Code, Mail, Settings } from "lucide-react";

interface Stats {
  projects: number;
  skills: number;
  messages: number;
  unread: number;
}

export default function AdminDashboard() {
  const supabase = createClient();
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    skills: 0,
    messages: 0,
    unread: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const [projects, skills, messages] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("skills").select("id", { count: "exact", head: true }),
        supabase.from("messages").select("id, read", { count: "exact" }),
      ]);

      setStats({
        projects: projects.count || 0,
        skills: skills.count || 0,
        messages: messages.count || 0,
        unread:
          messages.data?.filter((m: { read: boolean }) => !m.read).length || 0,
      });
      setLoading(false);
    }
    loadStats();
  }, [supabase]);

  const cards = [
    {
      label: "Projects",
      value: stats.projects,
      icon: FolderOpen,
      href: "/admin/projects",
      color: "text-accent",
    },
    {
      label: "Skills",
      value: stats.skills,
      icon: Code,
      href: "/admin/skills",
      color: "text-accent-gold",
    },
    {
      label: "Messages",
      value: stats.messages,
      icon: Mail,
      href: "/admin/messages",
      color: "text-green-400",
      badge: stats.unread > 0 ? stats.unread : undefined,
    },
    {
      label: "Settings",
      value: null,
      icon: Settings,
      href: "/admin/settings",
      color: "text-muted",
    },
  ];

  if (loading) {
    return (
      <div className="font-mono text-sm text-muted">Loading dashboard...</div>
    );
  }

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="mb-8 font-mono text-xs text-muted">
        Portfolio admin overview
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <a
              key={card.label}
              href={card.href}
              className="group rounded-lg border border-border bg-card p-6 card-glow cursor-pointer"
            >
              <div className="mb-3 flex items-center justify-between">
                <Icon size={20} className={card.color} />
                {card.badge && (
                  <span className="rounded-full bg-accent-red px-2 py-0.5 text-xs font-bold text-white">
                    {card.badge}
                  </span>
                )}
              </div>
              {card.value !== null && (
                <p className="text-2xl font-bold text-foreground">
                  {card.value}
                </p>
              )}
              <p className="font-mono text-xs text-muted">{card.label}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
