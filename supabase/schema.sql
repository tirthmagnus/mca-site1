create table if not exists public.leads (
  id uuid primary key,
  created_at timestamptz not null default now(),
  source text not null,
  ip text,
  site_host text,
  payload jsonb not null
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_source_idx on public.leads (source);
create index if not exists leads_site_host_idx on public.leads (site_host);

-- The website writes with the Supabase service-role key from the server only.
-- Do not expose that key as a NEXT_PUBLIC variable.
alter table public.leads enable row level security;
