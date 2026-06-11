"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

interface Setting {
  id: string;
  section: string;
  content: Record<string, string>;
  updated_at: string;
}

const defaultSections = ["hero", "about", "social"];

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/settings");
      const data: Setting[] = await res.json();

      const mapped: Record<string, Record<string, string>> = {};
      data.forEach((s) => {
        mapped[s.section] = s.content as Record<string, string>;
      });

      // Ensure default sections exist
      defaultSections.forEach((sec) => {
        if (!mapped[sec]) mapped[sec] = {};
      });

      setSettings(mapped);
      setLoading(false);
    }
    load();
  }, []);

  function updateField(section: string, key: string, value: string) {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
    setSaved(false);
  }

  async function handleSave(section: string) {
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, content: settings[section] }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) {
    return <div className="font-mono text-sm text-muted">Loading...</div>;
  }

  const sectionFields: Record<string, Record<string, string>> = {
    hero: {
      headline: "Headline",
      subheadline: "Sub-headline",
      status_text: "Status text",
    },
    about: {
      name: "Full name",
      title: "Professional title",
      location: "Location",
      bio: "Bio",
    },
    social: {
      github: "GitHub URL",
      linkedin: "LinkedIn URL",
      email: "Email",
    },
  };

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-foreground">Settings</h1>
      <p className="mb-8 font-mono text-xs text-muted">
        Edit site-wide content and configuration
      </p>

      <div className="space-y-8">
        {Object.entries(sectionFields).map(([section, fields]) => (
          <div
            key={section}
            className="rounded-lg border border-border bg-card p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-accent">
                {section}
              </h2>
              <button
                onClick={() => handleSave(section)}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-md border border-accent px-3 py-1.5 text-xs text-accent transition-colors hover:bg-accent/10 disabled:opacity-50 cursor-pointer"
              >
                <Save size={12} />
                {saving ? "Saving..." : saved ? "Saved!" : "Save"}
              </button>
            </div>

            <div className="space-y-3">
              {Object.entries(fields).map(([key, label]) => (
                <div key={key}>
                  <label className="mb-1 block font-mono text-xs text-muted">
                    {label}
                  </label>
                  {key === "bio" || key === "headline" || key === "subheadline" ? (
                    <textarea
                      value={settings[section]?.[key] || ""}
                      onChange={(e) =>
                        updateField(section, key, e.target.value)
                      }
                      rows={key === "bio" ? 4 : 2}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                    />
                  ) : (
                    <input
                      value={settings[section]?.[key] || ""}
                      onChange={(e) =>
                        updateField(section, key, e.target.value)
                      }
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
