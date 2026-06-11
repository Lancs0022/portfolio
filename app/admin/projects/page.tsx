"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/types";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyProject: Partial<Project> = {
    title: "",
    slug: "",
    description: "",
    long_description: "",
    category: "featured",
    tech_stack: [],
    metrics: {},
    github_url: "",
    live_url: "",
    image_url: "",
    sort_order: 0,
  };

  const [form, setForm] = useState<Partial<Project>>(emptyProject);

  async function loadProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function openCreate() {
    setForm(emptyProject);
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(project: Project) {
    setForm(project);
    setEditing(project);
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    await fetch("/api/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    loadProjects();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    loadProjects();
  }

  if (loading) {
    return <div className="font-mono text-sm text-muted">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="font-mono text-xs text-muted">
            Manage portfolio projects
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-accent/90 cursor-pointer"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* Project list */}
      <div className="space-y-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
          >
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {project.title}
              </h3>
              <span className="mono-tag text-[10px]">{project.category}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEdit(project)}
                className="rounded-md border border-border p-2 text-muted transition-colors hover:text-accent cursor-pointer"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="rounded-md border border-border p-2 text-muted transition-colors hover:text-accent-red cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">
                {editing ? "Edit Project" : "New Project"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-muted hover:text-foreground cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-mono text-xs text-muted">
                    Title
                  </label>
                  <input
                    value={form.title || ""}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-xs text-muted">
                    Slug
                  </label>
                  <input
                    value={form.slug || ""}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    required
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-mono text-xs text-muted">
                  Description
                </label>
                <textarea
                  value={form.description || ""}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-mono text-xs text-muted">
                    Category
                  </label>
                  <select
                    value={form.category || "featured"}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value as "featured" | "secondary",
                      })
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                  >
                    <option value="featured">Featured</option>
                    <option value="secondary">Secondary</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block font-mono text-xs text-muted">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={form.sort_order || 0}
                    onChange={(e) =>
                      setForm({ ...form, sort_order: parseInt(e.target.value) })
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-mono text-xs text-muted">
                  Tech Stack (comma-separated)
                </label>
                <input
                  value={(form.tech_stack || []).join(", ")}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      tech_stack: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                  placeholder="React, Laravel, MySQL"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-mono text-xs text-muted">
                    GitHub URL
                  </label>
                  <input
                    value={form.github_url || ""}
                    onChange={(e) =>
                      setForm({ ...form, github_url: e.target.value })
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-xs text-muted">
                    Live URL
                  </label>
                  <input
                    value={form.live_url || ""}
                    onChange={(e) =>
                      setForm({ ...form, live_url: e.target.value })
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-md border border-border px-4 py-2 text-sm text-muted transition-colors hover:text-foreground cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-accent/90 cursor-pointer"
                >
                  {editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
