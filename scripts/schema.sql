-- Portfolio Database Schema
-- Run this in the Supabase SQL Editor to create all tables

-- Site-wide settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  category TEXT DEFAULT 'featured',
  tech_stack TEXT[],
  metrics JSONB,
  github_url TEXT,
  live_url TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Skills
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  level TEXT,
  icon TEXT,
  sort_order INT DEFAULT 0
);

-- Contact messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security (RLS) policies
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Public read access for site_settings, projects, skills
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);

-- Public insert for messages (contact form)
CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (true);

-- Authenticated write access for admin
CREATE POLICY "Auth write site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write messages" ON messages FOR ALL USING (auth.role() = 'authenticated');
