create table if not exists research_experiments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  status text not null default 'planned' check (status in ('planned', 'in-progress', 'complete')),
  created_at timestamptz not null default now()
);

create table if not exists research_measurements (
  id uuid primary key default gen_random_uuid(),
  experiment_id uuid references research_experiments(id) on delete cascade,
  frequency numeric,
  input_level numeric,
  output_level numeric,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists prototype_versions (
  id uuid primary key default gen_random_uuid(),
  version text not null,
  summary text,
  released_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  category text default 'general',
  message text not null,
  created_at timestamptz not null default now()
);

alter table research_experiments enable row level security;
alter table research_measurements enable row level security;
alter table prototype_versions enable row level security;
alter table contact_messages enable row level security;

create policy "Public read access" on research_experiments for select using (true);
create policy "Public read access" on research_measurements for select using (true);
create policy "Public read access" on prototype_versions for select using (true);
create policy "Anyone can submit a contact message" on contact_messages for insert with check (true);
