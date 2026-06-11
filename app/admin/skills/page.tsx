"use client";

import { useEffect, useState } from "react";
import type { Skill } from "@/lib/types";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptySkill: Partial<Skill> = {
    category: "backend",
    name: "",
    level: "intermediate",
    sort_order: 0,
  };
  const [form, setForm] = useState<Partial<Skill>>(emptySkill);

  async function loadSkills() {
    const res = await fetch("/api/skills");
    const data = await res.json();
    setSkills(data);
    setLoading(false);
  }

  useEffect(() => {
    loadSkills();
  }, []);

  function openCreate() {
    setForm(emptySkill);
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(skill: Skill) {
    setForm(skill);
    setEditing(skill);
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    await fetch("/api/skills", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    loadSkills();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this skill?")) return;
    await fetch(`/api/skills?id=${id}`, { method: "DELETE" });
    loadSkills();
  }

  const grouped = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  if (loading) {
    return <div className="font-mono text-sm text-muted">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Skills</h1>
          <p className="font-mono text-xs text-muted">
            Manage technical competencies
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-accent/90 cursor-pointer"
        >
          <Plus size={16} />
          Add Skill
        </button>
      </div>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h2 className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            {category}
          </h2>
          <div className="space-y-1">
            {items.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-foreground">{skill.name}</span>
                  <span className="mono-tag text-[10px]">{skill.level}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(skill)}
                    className="rounded-md border border-border p-1.5 text-muted transition-colors hover:text-accent cursor-pointer"
                  >
                    <Pencil size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="rounded-md border border-border p-1.5 text-muted transition-colors hover:text-accent-red cursor-pointer"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">
                {editing ? "Edit Skill" : "New Skill"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-muted hover:text-foreground cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="mb-1 block font-mono text-xs text-muted">
                  Name
                </label>
                <input
                  value={form.name || ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-mono text-xs text-muted">
                    Category
                  </label>
                  <select
                    value={form.category || "backend"}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value as Skill["category"],
                      })
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                  >
                    <option value="backend">Backend & Frontend</option>
                    <option value="database">Database Engineering</option>
                    <option value="systems">Systems & Infrastructure</option>
                    <option value="tools">Tools & DevOps</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block font-mono text-xs text-muted">
                    Level
                  </label>
                  <select
                    value={form.level || "intermediate"}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        level: e.target.value as Skill["level"],
                      })
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                  >
                    <option value="expert">Expert</option>
                    <option value="advanced">Advanced</option>
                    <option value="intermediate">Intermediate</option>
                  </select>
                </div>
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
