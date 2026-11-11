-- Tabla de productos del inventario sostenible
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sku text not null unique,
  stock integer not null default 0 check (stock >= 0),
  carbon_footprint_kg numeric(10, 2),
  created_at timestamptz not null default now()
);

-- Seguridad a nivel de fila: solo usuarios autenticados
alter table public.products enable row level security;

create policy "products_select_authenticated" on public.products
  for select to authenticated using (true);

create policy "products_insert_authenticated" on public.products
  for insert to authenticated with check (true);
