create table public.incomes (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.users(id) on delete cascade,
    description text,
    amount numeric not null,
    category text,
    created_at timestamp with time zone default now()
);


alter table public.incomes enable row level security;

create policy "Users can insert own incomes"
on public.incomes
for insert
with check (auth.uid() = user_id);

create policy "Users can read own incomes"
on public.incomes
for select
using (auth.uid() = user_id);

create policy "Users can update own incomes"
on public.incomes
for update
using (auth.uid() = user_id);

create policy "Users can delete own incomes"
on public.incomes
for delete
using (auth.uid() = user_id);

