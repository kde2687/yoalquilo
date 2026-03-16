-- =============================================
-- yoalquilo.ar - Schema SQL
-- Correr en el SQL Editor de Supabase
-- =============================================

-- Tabla de propiedades
create table if not exists properties (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references auth.users on delete set null,
  title text not null,
  description text,
  location text not null,
  province text,
  price_per_night numeric not null default 0,
  max_guests integer not null default 4,
  bedrooms integer not null default 1,
  bathrooms integer not null default 1,
  amenities text[] default '{}',
  images text[] default '{}',
  contact_phone text,
  contact_email text,
  contact_whatsapp text,
  contact_instagram text,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

-- Tabla de disponibilidad (fechas bloqueadas)
create table if not exists availability (
  id uuid default gen_random_uuid() primary key,
  property_id uuid references properties(id) on delete cascade not null,
  date date not null,
  is_available boolean not null default false,
  unique(property_id, date)
);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

alter table properties enable row level security;
alter table availability enable row level security;

-- Policies: properties
-- Cualquiera puede leer propiedades activas
create policy "public read active properties"
  on properties for select
  using (is_active = true);

-- Propietarios ven todas sus propiedades
create policy "owners read own properties"
  on properties for select
  using (auth.uid() = owner_id);

-- Propietarios crean sus propiedades
create policy "owners insert properties"
  on properties for insert
  with check (auth.uid() = owner_id or owner_id is null);

-- Propietarios editan sus propiedades
create policy "owners update properties"
  on properties for update
  using (auth.uid() = owner_id);

-- Propietarios eliminan sus propiedades
create policy "owners delete properties"
  on properties for delete
  using (auth.uid() = owner_id);

-- Policies: availability
-- Cualquiera puede leer disponibilidad
create policy "public read availability"
  on availability for select
  using (true);

-- Solo el propietario puede modificar disponibilidad
create policy "owners manage availability"
  on availability for all
  using (
    auth.uid() = (
      select owner_id from properties where id = property_id
    )
  );

-- =============================================
-- Storage bucket para imágenes
-- =============================================

insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict do nothing;

-- Cualquiera puede leer imágenes
create policy "public read images"
  on storage.objects for select
  using (bucket_id = 'property-images');

-- Usuarios autenticados pueden subir imágenes
create policy "authenticated upload images"
  on storage.objects for insert
  with check (bucket_id = 'property-images' and auth.role() = 'authenticated');

-- Usuarios autenticados pueden eliminar sus imágenes
create policy "authenticated delete images"
  on storage.objects for delete
  using (bucket_id = 'property-images' and auth.role() = 'authenticated');

-- =============================================
-- Tabla de reseñas
-- =============================================

create table if not exists reviews (
  id             uuid default gen_random_uuid() primary key,
  property_id    uuid references properties(id) on delete cascade not null,
  owner_id       uuid references auth.users on delete set null,
  review_type    text not null check (review_type in ('guest_to_property', 'host_to_guest')),
  token          text not null unique,
  status         text not null default 'pending' check (status in ('pending', 'completed')),
  reviewer_name  text not null,
  reviewer_email text not null,
  host_name      text not null,
  rating         integer check (rating >= 1 and rating <= 5),
  comment        text,
  expires_at     timestamptz not null default (now() + interval '30 days'),
  created_at     timestamptz default now(),
  completed_at   timestamptz
);

alter table reviews enable row level security;

-- Cualquiera puede leer reseñas completadas
create policy "public read completed reviews"
  on reviews for select
  using (status = 'completed');

-- Propietarios autenticados pueden ver sus reseñas pendientes
create policy "owners read own reviews"
  on reviews for select
  using (auth.uid() = owner_id);

-- Solo propietarios autenticados pueden crear solicitudes de reseña
create policy "owners insert reviews"
  on reviews for insert
  with check (auth.uid() = owner_id);

-- Updates solo via service_role (API route de submit)
create policy "no direct client update"
  on reviews for update
  using (false);
