export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  category: "featured" | "secondary";
  tech_stack: string[];
  metrics: Record<string, string> | null;
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  category: "backend" | "frontend" | "database" | "systems" | "tools";
  name: string;
  level: "expert" | "advanced" | "intermediate" | null;
  icon: string | null;
  sort_order: number;
}

export interface SiteSetting {
  id: string;
  section: string;
  content: Record<string, unknown>;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
}
