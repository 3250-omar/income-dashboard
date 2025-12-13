-- 1️⃣ Create the users table
create table if not exists public.users (
    id uuid primary key references auth.users(id) on delete cascade,
    email text,
    name text,
    image_url text,
    created_at timestamp with time zone default now()
);

-- 2️⃣ Enable Row-Level Security
alter table public.users enable row level security;

-- 3️⃣ Policies
-- Users can read their own profile
create policy "Users can read own profile"
on public.users
for select
using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
on public.users
for update
using (auth.uid() = id);

-- 4️⃣ Trigger function for automatic insertion
create or replace function public.handle_new_user()
returns trigger as $$
begin
    -- Insert minimal info: id, email, created_at
    insert into public.users (id, email, created_at)
    values (new.id, new.email, now())
    on conflict (id) do nothing;  -- prevents duplicate errors
    return new;
end;
$$ language plpgsql security definer;

-- 5️⃣ Create the trigger
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();
