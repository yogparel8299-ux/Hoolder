# Hoolder Deployable Code Pack

## What this is
This is the cleaned deployable starter for **Hoolder**.

It includes:
- deployable monorepo structure
- Next.js web app
- Supabase auth + database
- worker service for agent/sync task execution
- companies, goals, agents, swarms, tasks, approvals
- OpenAI provider support
- safe worker claim flow
- Vercel-ready web app
- Render-ready worker service

This is still a starter, but this version is designed to actually deploy after you paste it correctly.

---

## Folder structure

```txt
hoolder/
  package.json
  .gitignore
  .env.example
  README.md
  apps/
    web/
      package.json
      next.config.mjs
      tsconfig.json
      app/
        globals.css
        layout.tsx
        page.tsx
        login/page.tsx
        signup/page.tsx
        dashboard/page.tsx
        companies/page.tsx
        goals/page.tsx
        agents/page.tsx
        swarms/page.tsx
        tasks/page.tsx
        approvals/page.tsx
        budgets/page.tsx
        activity/page.tsx
        settings/page.tsx
      actions/
        companies.ts
        goals.ts
        agents.ts
        swarms.ts
        tasks.ts
        approvals.ts
      lib/
        auth.ts
        supabase/
          browser.ts
          server.ts
      components/
        shell/sidebar.tsx
  services/
    worker/
      package.json
      tsconfig.json
      src/
        index.ts
        db.ts
        claim.ts
        providers/
          openai.ts
        runners/
          single-agent.ts
          swarm.ts
  packages/
    shared/
      package.json
      tsconfig.json
      src/
        types.ts
        utils.ts
  supabase/
    migrations/
      001_init.sql
      002_profile_trigger.sql
      003_rls.sql
```

---

## Root files

### package.json

```json
{
  "name": "hoolder",
  "private": true,
  "workspaces": [
    "apps/*",
    "services/*",
    "packages/*"
  ],
  "scripts": {
    "dev:web": "npm --workspace apps/web run dev",
    "build:web": "npm --workspace apps/web run build",
    "start:web": "npm --workspace apps/web run start",
    "dev:worker": "npm --workspace services/worker run dev",
    "start:worker": "npm --workspace services/worker run start"
  }
}
```

### .gitignore

```gitignore
node_modules
.next
dist
.env
.env.local
.vercel
```

### .env.example

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
```

### README.md

```md
# Hoolder

AI company operating system with companies, goals, agents, swarms, tasks, approvals, budgets, and logs.

## Deploy
- Web: Vercel
- Database/Auth: Supabase
- Worker: Render
```

---

## Shared package

### packages/shared/package.json

```json
{
  "name": "@hoolder/shared",
  "version": "1.0.0",
  "private": true,
  "type": "module"
}
```

### packages/shared/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"]
}
```

### packages/shared/src/types.ts

```ts
export type TaskStatus =
  | "pending"
  | "queued"
  | "running"
  | "awaiting_approval"
  | "approved"
  | "rejected"
  | "failed"
  | "completed";

export type Priority = "low" | "medium" | "high";
export type AssignmentType = "agent" | "swarm";
export type SwarmTopology = "hierarchy" | "mesh";
```

### packages/shared/src/utils.ts

```ts
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
```

---

## Supabase SQL

### supabase/migrations/001_init.sql

```sql
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  slug text not null unique,
  mission text,
  created_at timestamptz not null default now()
);

create table if not exists public.company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'owner',
  created_at timestamptz not null default now(),
  unique(company_id, user_id)
);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'active',
  priority text not null default 'medium',
  created_by uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  role text not null,
  description text,
  provider text not null default 'openai',
  model text not null default 'gpt-4o-mini',
  system_prompt text,
  monthly_budget_usd numeric(12,2) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.agent_skills (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references public.agents(id) on delete cascade,
  skill_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.swarms (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  objective text,
  topology text not null default 'hierarchy',
  leader_agent_id uuid references public.agents(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.swarm_members (
  id uuid primary key default gen_random_uuid(),
  swarm_id uuid not null references public.swarms(id) on delete cascade,
  agent_id uuid not null references public.agents(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(swarm_id, agent_id)
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  goal_id uuid references public.goals(id) on delete set null,
  title text not null,
  description text,
  status text not null default 'pending',
  priority text not null default 'medium',
  created_by uuid not null references public.profiles(id) on delete cascade,
  requires_approval boolean not null default true,
  claimed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.task_assignments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  assignment_type text not null check (assignment_type in ('agent', 'swarm')),
  agent_id uuid references public.agents(id) on delete cascade,
  swarm_id uuid references public.swarms(id) on delete cascade,
  assigned_at timestamptz not null default now()
);

create table if not exists public.task_runs (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete set null,
  swarm_id uuid references public.swarms(id) on delete set null,
  status text not null default 'queued',
  started_at timestamptz,
  finished_at timestamptz,
  tokens_input integer not null default 0,
  tokens_output integer not null default 0,
  estimated_cost_usd numeric(12,4) not null default 0
);

create table if not exists public.task_outputs (
  id uuid primary key default gen_random_uuid(),
  task_run_id uuid not null references public.task_runs(id) on delete cascade,
  output_text text,
  output_json jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.approvals (
  id uuid primary key default gen_random_uuid(),
  task_run_id uuid not null references public.task_runs(id) on delete cascade,
  status text not null default 'pending',
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  notes text
);

create table if not exists public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete set null,
  task_run_id uuid references public.task_runs(id) on delete set null,
  provider text not null,
  model text not null,
  tokens_input integer not null default 0,
  tokens_output integer not null default 0,
  cost_usd numeric(12,4) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  actor_type text not null,
  actor_id text,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
```

### supabase/migrations/002_profile_trigger.sql

```sql
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
```

### supabase/migrations/003_rls.sql

```sql
alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.goals enable row level security;
alter table public.agents enable row level security;
alter table public.agent_skills enable row level security;
alter table public.swarms enable row level security;
alter table public.swarm_members enable row level security;
alter table public.tasks enable row level security;
alter table public.task_assignments enable row level security;
alter table public.task_runs enable row level security;
alter table public.task_outputs enable row level security;
alter table public.approvals enable row level security;
alter table public.usage_logs enable row level security;
alter table public.activity_logs enable row level security;

create policy "profiles_self_select" on public.profiles
for select to authenticated using (auth.uid() = id);

create policy "profiles_self_update" on public.profiles
for update to authenticated using (auth.uid() = id);

create policy "companies_member_select" on public.companies
for select to authenticated using (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = companies.id and cm.user_id = auth.uid()
  )
);

create policy "companies_owner_insert" on public.companies
for insert to authenticated with check (owner_id = auth.uid());

create policy "company_members_member_select" on public.company_members
for select to authenticated using (
  user_id = auth.uid()
  or exists (
    select 1 from public.company_members cm
    where cm.company_id = company_members.company_id and cm.user_id = auth.uid()
  )
);

create policy "company_members_member_insert" on public.company_members
for insert to authenticated with check (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = company_members.company_id and cm.user_id = auth.uid()
  )
);

create policy "goals_member_all" on public.goals
for all to authenticated using (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = goals.company_id and cm.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = goals.company_id and cm.user_id = auth.uid()
  )
);

create policy "agents_member_all" on public.agents
for all to authenticated using (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = agents.company_id and cm.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = agents.company_id and cm.user_id = auth.uid()
  )
);

create policy "swarms_member_all" on public.swarms
for all to authenticated using (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = swarms.company_id and cm.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = swarms.company_id and cm.user_id = auth.uid()
  )
);

create policy "tasks_member_all" on public.tasks
for all to authenticated using (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = tasks.company_id and cm.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = tasks.company_id and cm.user_id = auth.uid()
  )
);

create policy "task_assignments_member_all" on public.task_assignments
for all to authenticated using (
  exists (
    select 1
    from public.tasks t
    join public.company_members cm on cm.company_id = t.company_id
    where t.id = task_assignments.task_id and cm.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.tasks t
    join public.company_members cm on cm.company_id = t.company_id
    where t.id = task_assignments.task_id and cm.user_id = auth.uid()
  )
);

create policy "task_runs_member_select" on public.task_runs
for select to authenticated using (
  exists (
    select 1
    from public.tasks t
    join public.company_members cm on cm.company_id = t.company_id
    where t.id = task_runs.task_id and cm.user_id = auth.uid()
  )
);

create policy "task_outputs_member_select" on public.task_outputs
for select to authenticated using (
  exists (
    select 1
    from public.task_runs tr
    join public.tasks t on t.id = tr.task_id
    join public.company_members cm on cm.company_id = t.company_id
    where tr.id = task_outputs.task_run_id and cm.user_id = auth.uid()
  )
);

create policy "approvals_member_all" on public.approvals
for all to authenticated using (
  exists (
    select 1
    from public.task_runs tr
    join public.tasks t on t.id = tr.task_id
    join public.company_members cm on cm.company_id = t.company_id
    where tr.id = approvals.task_run_id and cm.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.task_runs tr
    join public.tasks t on t.id = tr.task_id
    join public.company_members cm on cm.company_id = t.company_id
    where tr.id = approvals.task_run_id and cm.user_id = auth.uid()
  )
);

create policy "usage_logs_member_select" on public.usage_logs
for select to authenticated using (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = usage_logs.company_id and cm.user_id = auth.uid()
  )
);

create policy "activity_logs_member_select" on public.activity_logs
for select to authenticated using (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = activity_logs.company_id and cm.user_id = auth.uid()
  )
);
```

---

## Web app

### apps/web/package.json

```json
{
  "name": "web",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@hoolder/shared": "1.0.0",
    "@supabase/ssr": "0.5.2",
    "@supabase/supabase-js": "2.49.8",
    "next": "15.2.0",
    "react": "19.0.0",
    "react-dom": "19.0.0"
  }
}
```

### apps/web/next.config.mjs

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb"
    }
  }
};

export default nextConfig;
```

### apps/web/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@hoolder/shared/*": ["../../packages/shared/src/*"]
    },
    "plugins": [{ "name": "next" }]
  },
  "include": ["**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### apps/web/app/globals.css

```css
html, body {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #0a0f1a;
  color: #f8fafc;
}

a { color: inherit; text-decoration: none; }
* { box-sizing: border-box; }

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.layout-shell { display: flex; min-height: 100vh; }
.sidebar {
  width: 240px;
  background: #0f172a;
  border-right: 1px solid #1e293b;
  padding: 20px;
}
.main-shell { flex: 1; }
.nav-link {
  display: block;
  padding: 10px 12px;
  border-radius: 10px;
  margin-bottom: 8px;
}
.nav-link:hover { background: #172033; }
.card {
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 16px;
  padding: 18px;
}
.grid { display: grid; gap: 16px; }
.grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.input, .textarea, .select {
  width: 100%;
  background: #0f172a;
  color: white;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 10px 12px;
}
.textarea { min-height: 120px; }
.button {
  background: #22c55e;
  color: #052e16;
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  font-weight: 700;
  cursor: pointer;
}
```

### apps/web/lib/supabase/server.ts

```ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {}
        }
      }
    }
  );
}
```

### apps/web/lib/supabase/browser.ts

```ts
import { createBrowserClient } from "@supabase/ssr";

export const supabaseBrowser = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### apps/web/lib/auth.ts

```ts
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return user;
}
```

### apps/web/components/shell/sidebar.tsx

```tsx
import Link from "next/link";

const links = [
  ["Dashboard", "/dashboard"],
  ["Companies", "/companies"],
  ["Goals", "/goals"],
  ["Agents", "/agents"],
  ["Swarms", "/swarms"],
  ["Tasks", "/tasks"],
  ["Approvals", "/approvals"],
  ["Budgets", "/budgets"],
  ["Activity", "/activity"],
  ["Settings", "/settings"]
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 style={{ marginTop: 0 }}>Hoolder</h2>
      <p style={{ color: "#94a3b8" }}>AI company operating system</p>
      <nav style={{ marginTop: 24 }}>
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="nav-link">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
```

### apps/web/app/layout.tsx

```tsx
import "./globals.css";
import { Sidebar } from "@/components/shell/sidebar";

export const metadata = {
  title: "Hoolder",
  description: "AI company operating system"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="layout-shell">
          <Sidebar />
          <main className="main-shell">{children}</main>
        </div>
      </body>
    </html>
  );
}
```

### apps/web/app/page.tsx

```tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      <div className="card" style={{ marginTop: 40 }}>
        <h1>Hoolder</h1>
        <p>
          Build and run AI companies with goals, agents, swarms, tasks,
          approvals, budgets, and logs.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <Link className="button" href="/signup">Get started</Link>
          <Link className="button" href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
```

### apps/web/app/login/page.tsx

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 480, marginTop: 60 }}>
        <h1>Login</h1>
        <form onSubmit={onSubmit} className="grid">
          <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error ? <p>{error}</p> : null}
          <button className="button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
```

### apps/web/app/signup/page.tsx

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const { error } = await supabaseBrowser.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 480, marginTop: 60 }}>
        <h1>Sign up</h1>
        <form onSubmit={onSubmit} className="grid">
          <input className="input" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error ? <p>{error}</p> : null}
          <button className="button" type="submit">Create account</button>
        </form>
      </div>
    </div>
  );
}
```

### apps/web/actions/companies.ts

```ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { slugify } from "@hoolder/shared/utils";

export async function createCompany(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const name = String(formData.get("name") || "").trim();
  const mission = String(formData.get("mission") || "").trim();
  if (!name) throw new Error("Company name is required");

  const slug = slugify(name);

  const { data: company, error } = await supabase
    .from("companies")
    .insert({ owner_id: user.id, name, slug, mission: mission || null })
    .select()
    .single();

  if (error) throw error;

  const { error: memberError } = await supabase.from("company_members").insert({
    company_id: company.id,
    user_id: user.id,
    role: "owner"
  });

  if (memberError) throw memberError;

  return company;
}
```

### apps/web/actions/goals.ts

```ts
"use server";

import { createClient } from "@/lib/supabase/server";

export async function createGoal(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const company_id = String(formData.get("company_id") || "");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const priority = String(formData.get("priority") || "medium");

  if (!company_id || !title) throw new Error("Missing fields");

  const { data, error } = await supabase
    .from("goals")
    .insert({
      company_id,
      title,
      description: description || null,
      priority,
      created_by: user.id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### apps/web/actions/agents.ts

```ts
"use server";

import { createClient } from "@/lib/supabase/server";

export async function createAgent(formData: FormData) {
  const supabase = await createClient();

  const company_id = String(formData.get("company_id") || "");
  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const provider = String(formData.get("provider") || "openai");
  const model = String(formData.get("model") || "gpt-4o-mini");
  const system_prompt = String(formData.get("system_prompt") || "").trim();
  const monthly_budget_usd = Number(formData.get("monthly_budget_usd") || 0);

  if (!company_id || !name || !role) throw new Error("Missing required fields");

  const { data, error } = await supabase
    .from("agents")
    .insert({
      company_id,
      name,
      role,
      description: description || null,
      provider,
      model,
      system_prompt: system_prompt || null,
      monthly_budget_usd
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### apps/web/actions/swarms.ts

```ts
"use server";

import { createClient } from "@/lib/supabase/server";

export async function createSwarm(formData: FormData) {
  const supabase = await createClient();

  const company_id = String(formData.get("company_id") || "");
  const name = String(formData.get("name") || "").trim();
  const objective = String(formData.get("objective") || "").trim();
  const topology = String(formData.get("topology") || "hierarchy");
  const leader_agent_id = String(formData.get("leader_agent_id") || "");

  if (!company_id || !name) throw new Error("Missing fields");

  const { data, error } = await supabase
    .from("swarms")
    .insert({
      company_id,
      name,
      objective: objective || null,
      topology,
      leader_agent_id: leader_agent_id || null
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### apps/web/actions/tasks.ts

```ts
"use server";

import { createClient } from "@/lib/supabase/server";

export async function createTask(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const company_id = String(formData.get("company_id") || "");
  const goal_id = String(formData.get("goal_id") || "");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const priority = String(formData.get("priority") || "medium");
  const requires_approval = String(formData.get("requires_approval") || "true") === "true";

  if (!company_id || !title) throw new Error("Missing fields");

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      company_id,
      goal_id: goal_id || null,
      title,
      description: description || null,
      priority,
      created_by: user.id,
      requires_approval
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function assignTask(formData: FormData) {
  const supabase = await createClient();

  const task_id = String(formData.get("task_id") || "");
  const assignment_type = String(formData.get("assignment_type") || "");
  const agent_id = String(formData.get("agent_id") || "");
  const swarm_id = String(formData.get("swarm_id") || "");

  if (!task_id || !assignment_type) throw new Error("Missing fields");

  const payload = assignment_type === "agent"
    ? { task_id, assignment_type, agent_id: agent_id || null, swarm_id: null }
    : { task_id, assignment_type, agent_id: null, swarm_id: swarm_id || null };

  const { data, error } = await supabase
    .from("task_assignments")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  await supabase.from("tasks").update({ status: "queued", claimed_at: null }).eq("id", task_id);
  return data;
}
```

### apps/web/actions/approvals.ts

```ts
"use server";

import { createClient } from "@/lib/supabase/server";

export async function reviewApproval(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const approval_id = String(formData.get("approval_id") || "");
  const status = String(formData.get("status") || "pending");
  const notes = String(formData.get("notes") || "").trim();

  const { data: approval, error: readError } = await supabase
    .from("approvals")
    .select("id, task_run_id")
    .eq("id", approval_id)
    .single();

  if (readError || !approval) throw readError || new Error("Approval not found");

  const { data: run, error: runError } = await supabase
    .from("task_runs")
    .select("task_id")
    .eq("id", approval.task_run_id)
    .single();

  if (runError || !run) throw runError || new Error("Task run not found");

  await supabase.from("approvals").update({
    status,
    reviewed_by: user.id,
    reviewed_at: new Date().toISOString(),
    notes: notes || null
  }).eq("id", approval_id);

  const taskStatus = status === "approved" ? "completed" : "rejected";
  await supabase.from("tasks").update({ status: taskStatus }).eq("id", run.task_id);
}
```

### apps/web/app/dashboard/page.tsx

```tsx
import { requireUser } from "@/lib/auth";

export default async function DashboardPage() {
  await requireUser();

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="grid grid-3">
        <div className="card"><h3>Companies</h3><p>Manage AI businesses</p></div>
        <div className="card"><h3>Agents</h3><p>Create and supervise agents</p></div>
        <div className="card"><h3>Swarms</h3><p>Run coordinated teams</p></div>
        <div className="card"><h3>Tasks</h3><p>Create and assign work</p></div>
        <div className="card"><h3>Approvals</h3><p>Review outputs before release</p></div>
        <div className="card"><h3>Budgets</h3><p>Track cost and limits</p></div>
      </div>
    </div>
  );
}
```

### apps/web/app/companies/page.tsx

```tsx
import { createCompany } from "@/actions/companies";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";

export default async function CompaniesPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: companies } = await supabase.from("companies").select("*").order("created_at", { ascending: false });

  return (
    <div className="container">
      <h1>Companies</h1>
      <div className="grid grid-2">
        <form action={createCompany} className="card grid">
          <h3>Create company</h3>
          <input className="input" name="name" placeholder="Company name" />
          <textarea className="textarea" name="mission" placeholder="Mission" />
          <button className="button" type="submit">Create</button>
        </form>
        <div className="grid">
          {(companies || []).map((company) => (
            <div key={company.id} className="card">
              <h3>{company.name}</h3>
              <p>{company.mission || "No mission set"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### apps/web/app/goals/page.tsx

```tsx
import { createGoal } from "@/actions/goals";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";

export default async function GoalsPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: companies } = await supabase.from("companies").select("id,name");
  const { data: goals } = await supabase.from("goals").select("*").order("created_at", { ascending: false });

  return (
    <div className="container">
      <h1>Goals</h1>
      <div className="grid grid-2">
        <form action={createGoal} className="card grid">
          <h3>Create goal</h3>
          <select className="select" name="company_id">
            {(companies || []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input className="input" name="title" placeholder="Goal title" />
          <textarea className="textarea" name="description" placeholder="Goal description" />
          <select className="select" name="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button className="button" type="submit">Create goal</button>
        </form>
        <div className="grid">
          {(goals || []).map((goal) => (
            <div key={goal.id} className="card">
              <h3>{goal.title}</h3>
              <p>{goal.description || "No description"}</p>
              <p>{goal.priority}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### apps/web/app/agents/page.tsx

```tsx
import { createAgent } from "@/actions/agents";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";

export default async function AgentsPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: companies } = await supabase.from("companies").select("id,name");
  const { data: agents } = await supabase.from("agents").select("*").order("created_at", { ascending: false });

  return (
    <div className="container">
      <h1>Agents</h1>
      <div className="grid grid-2">
        <form action={createAgent} className="card grid">
          <h3>Create agent</h3>
          <select className="select" name="company_id">
            {(companies || []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input className="input" name="name" placeholder="Agent name" />
          <input className="input" name="role" placeholder="Role" />
          <input className="input" name="provider" defaultValue="openai" placeholder="Provider" />
          <input className="input" name="model" defaultValue="gpt-4o-mini" placeholder="Model" />
          <input className="input" name="monthly_budget_usd" defaultValue="50" placeholder="Monthly budget USD" />
          <textarea className="textarea" name="description" placeholder="Description" />
          <textarea className="textarea" name="system_prompt" placeholder="System prompt" />
          <button className="button" type="submit">Create agent</button>
        </form>
        <div className="grid">
          {(agents || []).map((agent) => (
            <div key={agent.id} className="card">
              <h3>{agent.name}</h3>
              <p>{agent.role}</p>
              <p>{agent.provider} / {agent.model}</p>
              <p>Budget: ${Number(agent.monthly_budget_usd).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### apps/web/app/swarms/page.tsx

```tsx
import { createSwarm } from "@/actions/swarms";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";

export default async function SwarmsPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: companies } = await supabase.from("companies").select("id,name");
  const { data: agents } = await supabase.from("agents").select("id,name");
  const { data: swarms } = await supabase.from("swarms").select("*").order("created_at", { ascending: false });

  return (
    <div className="container">
      <h1>Swarms</h1>
      <div className="grid grid-2">
        <form action={createSwarm} className="card grid">
          <h3>Create swarm</h3>
          <select className="select" name="company_id">
            {(companies || []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input className="input" name="name" placeholder="Swarm name" />
          <textarea className="textarea" name="objective" placeholder="Objective" />
          <select className="select" name="topology">
            <option value="hierarchy">Hierarchy</option>
            <option value="mesh">Mesh</option>
          </select>
          <select className="select" name="leader_agent_id">
            <option value="">No leader yet</option>
            {(agents || []).map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          <button className="button" type="submit">Create swarm</button>
        </form>
        <div className="grid">
          {(swarms || []).map((swarm) => (
            <div key={swarm.id} className="card">
              <h3>{swarm.name}</h3>
              <p>{swarm.objective || "No objective"}</p>
              <p>{swarm.topology}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### apps/web/app/tasks/page.tsx

```tsx
import { assignTask, createTask } from "@/actions/tasks";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";

export default async function TasksPage() {
  await requireUser();
  const supabase = await createClient();

  const { data: companies } = await supabase.from("companies").select("id,name");
  const { data: goals } = await supabase.from("goals").select("id,title");
  const { data: agents } = await supabase.from("agents").select("id,name");
  const { data: swarms } = await supabase.from("swarms").select("id,name");
  const { data: tasks } = await supabase.from("tasks").select("*").order("created_at", { ascending: false });

  return (
    <div className="container">
      <h1>Tasks</h1>
      <div className="grid grid-2">
        <div className="grid">
          <form action={createTask} className="card grid">
            <h3>Create task</h3>
            <select className="select" name="company_id">
              {(companies || []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select className="select" name="goal_id">
              <option value="">No goal</option>
              {(goals || []).map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
            </select>
            <input className="input" name="title" placeholder="Task title" />
            <textarea className="textarea" name="description" placeholder="Task description" />
            <select className="select" name="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select className="select" name="requires_approval">
              <option value="true">Approval required</option>
              <option value="false">No approval</option>
            </select>
            <button className="button" type="submit">Create task</button>
          </form>

          <form action={assignTask} className="card grid">
            <h3>Assign task</h3>
            <select className="select" name="task_id">
              {(tasks || []).map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
            </select>
            <select className="select" name="assignment_type">
              <option value="agent">Single agent</option>
              <option value="swarm">Swarm</option>
            </select>
            <select className="select" name="agent_id">
              <option value="">Choose agent</option>
              {(agents || []).map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
            <select className="select" name="swarm_id">
              <option value="">Choose swarm</option>
              {(swarms || []).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <button className="button" type="submit">Assign task</button>
          </form>
        </div>

        <div className="grid">
          {(tasks || []).map((task) => (
            <div key={task.id} className="card">
              <h3>{task.title}</h3>
              <p>{task.description || "No description"}</p>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### apps/web/app/approvals/page.tsx

```tsx
import { reviewApproval } from "@/actions/approvals";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";

export default async function ApprovalsPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: approvals } = await supabase.from("approvals").select("*").order("reviewed_at", { ascending: false, nullsFirst: true });

  return (
    <div className="container">
      <h1>Approvals</h1>
      <div className="grid">
        {(approvals || []).map((approval) => (
          <form key={approval.id} action={reviewApproval} className="card grid">
            <h3>Approval #{approval.id}</h3>
            <p>Status: {approval.status}</p>
            <input type="hidden" name="approval_id" value={approval.id} />
            <select className="select" name="status" defaultValue="approved">
              <option value="approved">Approve</option>
              <option value="rejected">Reject</option>
            </select>
            <textarea className="textarea" name="notes" placeholder="Review notes" />
            <button className="button" type="submit">Submit review</button>
          </form>
        ))}
      </div>
    </div>
  );
}
```

### apps/web/app/budgets/page.tsx

```tsx
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";

export default async function BudgetsPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: agents } = await supabase.from("agents").select("name, monthly_budget_usd");
  const { data: usage } = await supabase.from("usage_logs").select("cost_usd");
  const totalUsage = (usage || []).reduce((sum, item) => sum + Number(item.cost_usd), 0);

  return (
    <div className="container">
      <h1>Budgets</h1>
      <div className="card">
        <h3>Total usage</h3>
        <p>${totalUsage.toFixed(2)}</p>
      </div>
      <div className="grid" style={{ marginTop: 16 }}>
        {(agents || []).map((agent) => (
          <div key={agent.name} className="card">
            <h3>{agent.name}</h3>
            <p>Monthly budget: ${Number(agent.monthly_budget_usd).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### apps/web/app/activity/page.tsx

```tsx
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";

export default async function ActivityPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: logs } = await supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(100);

  return (
    <div className="container">
      <h1>Activity</h1>
      <div className="grid">
        {(logs || []).map((log) => (
          <div key={log.id} className="card">
            <h3>{log.action}</h3>
            <p>{log.entity_type}</p>
            <p>{new Date(log.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### apps/web/app/settings/page.tsx

```tsx
import { requireUser } from "@/lib/auth";

export default async function SettingsPage() {
  await requireUser();

  return (
    <div className="container">
      <h1>Settings</h1>
      <div className="card">
        <p>Add provider keys and company settings later.</p>
      </div>
    </div>
  );
}
```

---

## Worker service

### services/worker/package.json

```json
{
  "name": "worker",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "start": "node --loader tsx src/index.ts"
  },
  "dependencies": {
    "@supabase/supabase-js": "2.49.8",
    "openai": "4.86.1"
  },
  "devDependencies": {
    "tsx": "4.19.3",
    "typescript": "5.8.2"
  }
}
```

### services/worker/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"]
}
```

### services/worker/src/db.ts

```ts
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

### services/worker/src/claim.ts

```ts
import { supabaseAdmin } from "./db";

export async function getClaimableAssignments() {
  const { data, error } = await supabaseAdmin
    .from("task_assignments")
    .select("*, tasks(*)")
    .order("assigned_at", { ascending: true });

  if (error) throw error;
  return (data || []).filter((row: any) => row.tasks?.status === "queued");
}

export async function claimTask(taskId: string) {
  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("tasks")
    .update({ status: "running", claimed_at: now })
    .eq("id", taskId)
    .eq("status", "queued")
    .select("id")
    .maybeSingle();

  if (error) throw error;
  return !!data;
}
```

### services/worker/src/providers/openai.ts

```ts
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function runOpenAI(input: {
  systemPrompt?: string | null;
  role: string;
  title: string;
  description?: string | null;
  model: string;
}) {
  const response = await client.responses.create({
    model: input.model || "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: input.systemPrompt || `You are a ${input.role} AI worker.`
      },
      {
        role: "user",
        content: `Task title: ${input.title}

Task description: ${input.description || "No description"}

Return a complete useful result.`
      }
    ]
  });

  const output = response.output_text || "";

  const usage = response.usage || {
    input_tokens: 0,
    output_tokens: 0,
    total_tokens: 0
  };

  return {
    output,
    tokens_input: usage.input_tokens || 0,
    tokens_output: usage.output_tokens || 0,
    cost_usd: 0
  };
}
```

### services/worker/src/runners/single-agent.ts

```ts
import { supabaseAdmin } from "../db";
import { runOpenAI } from "../providers/openai";

export async function runSingleAgentTask(assignment: any) {
  const task = assignment.tasks;

  const { data: agent, error: agentError } = await supabaseAdmin
    .from("agents")
    .select("*")
    .eq("id", assignment.agent_id)
    .single();

  if (agentError || !agent) throw new Error("Agent not found");

  const { data: run, error: runError } = await supabaseAdmin
    .from("task_runs")
    .insert({
      task_id: task.id,
      agent_id: agent.id,
      status: "running",
      started_at: new Date().toISOString()
    })
    .select()
    .single();

  if (runError || !run) throw runError;

  try {
    const result = await runOpenAI({
      systemPrompt: agent.system_prompt,
      role: agent.role,
      title: task.title,
      description: task.description,
      model: agent.model
    });

    await supabaseAdmin.from("task_outputs").insert({
      task_run_id: run.id,
      output_text: result.output
    });

    await supabaseAdmin.from("task_runs").update({
      status: task.requires_approval ? "awaiting_approval" : "completed",
      finished_at: new Date().toISOString(),
      tokens_input: result.tokens_input,
      tokens_output: result.tokens_output,
      estimated_cost_usd: result.cost_usd
    }).eq("id", run.id);

    await supabaseAdmin.from("usage_logs").insert({
      company_id: task.company_id,
      agent_id: agent.id,
      task_run_id: run.id,
      provider: agent.provider,
      model: agent.model,
      tokens_input: result.tokens_input,
      tokens_output: result.tokens_output,
      cost_usd: result.cost_usd
    });

    await supabaseAdmin.from("activity_logs").insert({
      company_id: task.company_id,
      actor_type: "agent",
      actor_id: agent.id,
      action: "task_run_finished",
      entity_type: "task",
      entity_id: task.id,
      metadata: { run_id: run.id }
    });

    if (task.requires_approval) {
      await supabaseAdmin.from("approvals").insert({
        task_run_id: run.id,
        status: "pending"
      });

      await supabaseAdmin.from("tasks").update({ status: "awaiting_approval" }).eq("id", task.id);
    } else {
      await supabaseAdmin.from("tasks").update({ status: "completed" }).eq("id", task.id);
    }
  } catch (error) {
    await supabaseAdmin.from("task_runs").update({
      status: "failed",
      finished_at: new Date().toISOString()
    }).eq("id", run.id);

    await supabaseAdmin.from("tasks").update({ status: "failed" }).eq("id", task.id);
    throw error;
  }
}
```

### services/worker/src/runners/swarm.ts

```ts
import { supabaseAdmin } from "../db";
import { runOpenAI } from "../providers/openai";

export async function runSwarmTask(assignment: any) {
  const task = assignment.tasks;

  const { data: members, error } = await supabaseAdmin
    .from("swarm_members")
    .select("agent_id, agents(*)")
    .eq("swarm_id", assignment.swarm_id);

  if (error) throw error;

  const { data: run, error: runError } = await supabaseAdmin
    .from("task_runs")
    .insert({
      task_id: task.id,
      swarm_id: assignment.swarm_id,
      status: "running",
      started_at: new Date().toISOString()
    })
    .select()
    .single();

  if (runError || !run) throw runError;

  try {
    const pieces: string[] = [];
    let totalInput = 0;
    let totalOutput = 0;

    for (const member of members || []) {
      const agent = member.agents;
      if (!agent) continue;

      const result = await runOpenAI({
        systemPrompt: agent.system_prompt,
        role: agent.role,
        title: task.title,
        description: task.description,
        model: agent.model
      });

      totalInput += result.tokens_input;
      totalOutput += result.tokens_output;

      pieces.push(`Agent: ${agent.name}
Role: ${agent.role}

${result.output}`);
    }

    const merged = pieces.join("

---

") || `Swarm completed task: ${task.title}`;

    await supabaseAdmin.from("task_outputs").insert({
      task_run_id: run.id,
      output_text: merged
    });

    await supabaseAdmin.from("task_runs").update({
      status: task.requires_approval ? "awaiting_approval" : "completed",
      finished_at: new Date().toISOString(),
      tokens_input: totalInput,
      tokens_output: totalOutput,
      estimated_cost_usd: 0
    }).eq("id", run.id);

    if (task.requires_approval) {
      await supabaseAdmin.from("approvals").insert({
        task_run_id: run.id,
        status: "pending"
      });

      await supabaseAdmin.from("tasks").update({ status: "awaiting_approval" }).eq("id", task.id);
    } else {
      await supabaseAdmin.from("tasks").update({ status: "completed" }).eq("id", task.id);
    }
  } catch (error) {
    await supabaseAdmin.from("task_runs").update({
      status: "failed",
      finished_at: new Date().toISOString()
    }).eq("id", run.id);

    await supabaseAdmin.from("tasks").update({ status: "failed" }).eq("id", task.id);
    throw error;
  }
}
```

### services/worker/src/index.ts

```ts
import { getClaimableAssignments, claimTask } from "./claim";
import { runSingleAgentTask } from "./runners/single-agent";
import { runSwarmTask } from "./runners/swarm";

async function tick() {
  const assignments = await getClaimableAssignments();

  for (const assignment of assignments) {
    const task = assignment.tasks;
    if (!task?.id) continue;

    const claimed = await claimTask(task.id);
    if (!claimed) continue;

    if (assignment.assignment_type === "agent") {
      await runSingleAgentTask(assignment);
    } else {
      await runSwarmTask(assignment);
    }
  }
}

async function main() {
  console.log("Hoolder worker started");

  while (true) {
    try {
      await tick();
    } catch (error) {
      console.error("Worker tick failed", error);
    }

    await new Promise((resolve) => setTimeout(resolve, 8000));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

---

## Deploy instructions

### Vercel web service
- Root Directory: `apps/web`
- Framework: Next.js
- Install Command: `npm install`
- Build Command: `npm run build`
- Output: default

### Render worker service
- Root Directory: `services/worker`
- Environment: Node
- Install Command: `npm install`
- Start Command: `npm run start`

### Supabase
Run SQL files in this order:
1. `001_init.sql`
2. `002_profile_trigger.sql`
3. `003_rls.sql`

---

## What is still missing
This pack is deployable, but still not the final massive platform.
Still missing:
- swarm member management page
- company switching UX
- org chart UI
- real cost calculation
- memory system
- model fallback routing
- billing
- schedules/heartbeats
- Anthropic provider
- plugins

But this is now a real cleaned deployable starter.

