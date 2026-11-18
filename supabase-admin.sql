-- Painel admin (v2): mensagens do site, agenda/notas e textos/links editáveis.
-- Rode uma vez no SQL Editor do Supabase. É seguro rodar de novo.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  archived boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists contact_messages_created_idx on public.contact_messages (created_at desc);
alter table public.contact_messages enable row level security;
-- Sem policies: só a chave de serviço (APIs do servidor) lê e grava.

create table if not exists public.team_items (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('event', 'note')),
  title text not null,
  body text not null default '',
  due_date date,
  done boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists team_items_kind_idx on public.team_items (kind, due_date);
alter table public.team_items enable row level security;

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read" on public.site_settings for select using (true);

insert into public.site_settings (key, value) values
  ('links', '{}'::jsonb),
  ('status', '{"available": true, "message": ""}'::jsonb)
on conflict (key) do nothing;
