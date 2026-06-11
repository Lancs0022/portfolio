# Portfolio Next.js Build

## Architecture Overview

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS 4 + TypeScript |
| Icons | lucide-react |
| Database | Supabase (PostgreSQL, free tier) |
| Auth | Supabase Auth (admin login) |
| CMS | Custom /admin dashboard with API routes |
| Fonts | Inter (body) + JetBrains Mono (accents) |
| Hosting | Vercel |

## Color System (Warm Corporate, dosed for dark mode)

| Role | Hex | Usage |
|------|-----|-------|
| Background | `#09090b` | Page background |
| Card BG | `#18181b` (zinc-900) | Card surfaces |
| Borders | `#27272a` (zinc-800) | Subtle card/section borders |
| Primary Accent | `#f77f00` (orange) | CTAs, links, active states, badges |
| Secondary | `#fcbf49` (gold) | Metric highlights, stars, special tags |
| Tertiary | `#003049` (deep navy) | Decorative borders, subtle section dividers |
| Alert/Hot | `#d62828` (red) | Very sparingly: live status dots, urgent badges only |
| Cream | `#eae2b7` | Monospace tag backgrounds (very low opacity) |
| Text | `#fafafa` (zinc-50) | Headings |
| Muted Text | `#a1a1aa` (zinc-400) | Body text, descriptions |

Dosage rule: Orange is the dominant accent (~60% of accent usage), gold for highlights (~25%), red/navy for micro-details (~15%).

---

## Task 1: Initialize Next.js project

- Run `npx create-next-app@latest` with TypeScript, Tailwind CSS, App Router, ESLint
- Install dependencies: `lucide-react`, `@supabase/supabase-js`, `@supabase/ssr`
- Configure `tailwind.config.ts` with custom colors, Inter + JetBrains Mono fonts
- Set up `globals.css` with dark theme defaults and font imports
- Update `.gitignore` for Next.js

## Task 2: Supabase schema and client setup

- Create Supabase project (user does this manually, free tier)
- Create `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE_KEY`
- Define SQL schema:

```sql
-- Site-wide settings (hero text, about text, etc.)
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  category TEXT DEFAULT 'featured', -- 'featured' | 'secondary'
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
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL, -- 'backend', 'frontend', 'database', 'systems'
  name TEXT NOT NULL,
  level TEXT, -- 'expert', 'advanced', 'intermediate'
  icon TEXT,
  sort_order INT DEFAULT 0
);

-- Contact messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Admin auth via Supabase Auth (email/password)
```

- Create `lib/supabase.ts` (browser client) and `lib/supabase-server.ts` (server client)

## Task 3: Layout, fonts, and global styles

- `app/layout.tsx`: Import Inter + JetBrains Mono from `next/font/google`, apply dark background `#09090b`, set metadata
- `globals.css`: Tailwind imports, custom utility classes for accent borders, monospace tag styling
- Seed initial data into Supabase (site_settings, projects, skills)

## Task 4: Navigation Bar

- Sticky top navbar with backdrop-blur background
- Left: Name/logo in Inter Bold
- Right: Nav links (Projects, Skills, Contact) + "Admin" CTA button with orange accent border
- Mobile: Hamburger menu with slide-out drawer
- Component: `components/Navbar.tsx`

## Task 5: Hero Section

- Bold headline: "I build complex software, optimize database architectures, and secure automation infrastructure."
- Sub-paragraph about autonomy and full-stack + sysadmin background
- Two action buttons: "Let's Talk" (orange filled) + GitHub/LinkedIn icon links (Lucide SVGs)
- Right side: Professional avatar placeholder or tech-styled profile card with monospace status indicators
- Subtle decorative element: faint grid pattern or terminal-style accent line
- Component: `components/Hero.tsx`

## Task 6: Featured Projects (Big 3 Grid)

Three large cards in a responsive grid (1 col mobile, 3 col desktop):

1. **DeltaTransport ERP** -- Logistics/fleet management. Metrics: multi-user, multi-role, audit trails. Tech: Laravel, React, MySQL. Tags: ERP, Fleet Management, Audit.
2. **PEJAA (Master's Thesis)** -- Financial auditing, stock management, LLM/AI agents. Tech: Full-stack + AI. Tags: Finance, AI/LLM, Research.
3. **DevOps Admin Tools** -- Electron desktop app, PowerShell automation, watchdog, Cloudflare tunnels, scheduled backups. Tech: Electron, PowerShell, Cloudflare. Tags: DevOps, Automation, Infrastructure.

Each card: title (Inter Bold), description, tech badges (mono font, zinc-800 bg with orange dot), GitHub link, subtle border `border-zinc-800` with hover glow.
- Components: `components/FeaturedProjects.tsx`, `components/ProjectCard.tsx`
- Data fetched from Supabase `projects` table where `category = 'featured'`

## Task 7: Secondary Tools & Utilities Grid

Compact 2-3 column grid for smaller projects:
- OCR Text Extractor (Python) -- GitHub link
- Multi-service Desktop App (Qt/C++) -- GitHub link
- Design Tool (Java) -- GitHub link
- File Explorer (Java) -- GitHub link
- Media Player (PHP/HTML/CSS) -- GitHub link
- 3D Ice Model (OpenSCAD) -- GitHub link
- Fanorona Game (Python) -- GitHub link
- LLM Communication (Python) -- GitHub link

Each card is smaller: title, one-line description, tech tag, GitHub link.
- Component: `components/SecondaryProjects.tsx`
- Data fetched from Supabase `projects` table where `category = 'secondary'`

## Task 8: Technical Skills & Infrastructure Grid

Dashboard-style grid (4 categories):
- **Backend & Frontend**: Laravel, React, Next.js, Node.js, PHP, TypeScript, HTML/CSS
- **Database Engineering**: MySQL, PostgreSQL, SQL optimization, schema design, query tuning
- **Systems & Infrastructure**: Hardware diagnostics, network admin, PowerShell/Bash scripting, Cloudflare tunnels, automated backups
- **Tools & DevOps**: Git, Docker, Electron, CI/CD, Linux admin

Each skill: monospace tag style with level indicator (dot or bar).
- Component: `components/SkillsGrid.tsx`
- Data fetched from Supabase `skills` table

## Task 9: Contact Section & Footer

- Centered contact form: Name, Email, Subject, Message inputs (dark styled, `bg-zinc-900 border-zinc-800`)
- Orange submit button "Send Message"
- Form submits to `/api/contact` which inserts into Supabase `messages` table
- Footer: Copyright, social links, "Built with Next.js" in monospace
- Components: `components/ContactForm.tsx`, `components/Footer.tsx`

## Task 10: API Routes (Content + Contact)

- `app/api/contact/route.ts` -- POST: insert message into Supabase
- `app/api/projects/route.ts` -- GET: list projects (public); PUT/POST/DELETE: admin-only
- `app/api/skills/route.ts` -- GET: list skills (public); PUT/POST/DELETE: admin-only
- `app/api/settings/route.ts` -- GET: site settings (public); PUT: admin-only
- `app/api/messages/route.ts` -- GET: list messages (admin-only); PATCH: mark as read
- Admin routes protected with Supabase Auth session check

## Task 11: Admin Dashboard (/admin)

- `app/admin/page.tsx` -- Protected route, redirects to login if no session
- `app/admin/login/page.tsx` -- Email/password login form
- Dashboard sections:
  - **Projects**: CRUD table with add/edit/delete, drag-to-reorder
  - **Skills**: CRUD table grouped by category
  - **Site Settings**: Editable form for hero text, about text, social links
  - **Messages**: Inbox view of contact form submissions, mark as read
- Simple but functional UI using the same dark theme
- Middleware in `middleware.ts` to protect `/admin/*` routes

## Task 12: Seed data script

- Create `scripts/seed.ts` that inserts all project data, skills, and default site settings into Supabase
- Run once after Supabase setup: `npx tsx scripts/seed.ts`
- Includes all projects mentioned by user with proper descriptions and GitHub links

## Task 13: Responsive polish and performance

- Test responsive breakpoints: 375px, 768px, 1024px, 1440px
- Add `prefers-reduced-motion` media query for animations
- Optimize images with `next/image`
- Add proper meta tags and Open Graph data in layout
- Smooth scroll behavior between sections

## Task 14: Vercel deployment config

- Add `vercel.json` if needed (usually auto-detected)
- Ensure environment variables are documented for Vercel dashboard
- Test build with `npm run build` to catch SSR issues

---

## File Structure (final)

```
d:\Code\portfolio\
  app/
    layout.tsx
    page.tsx
    globals.css
    admin/
      page.tsx
      login/page.tsx
      projects/page.tsx
      skills/page.tsx
      settings/page.tsx
      messages/page.tsx
    api/
      contact/route.ts
      projects/route.ts
      skills/route.ts
      settings/route.ts
      messages/route.ts
  components/
    Navbar.tsx
    Hero.tsx
    FeaturedProjects.tsx
    ProjectCard.tsx
    SecondaryProjects.tsx
    SkillsGrid.tsx
    ContactForm.tsx
    Footer.tsx
    AdminLayout.tsx
  lib/
    supabase.ts
    supabase-server.ts
    types.ts
  scripts/
    seed.ts
  middleware.ts
  tailwind.config.ts
  .env.local
  .gitignore
  next.config.ts
  package.json
```
