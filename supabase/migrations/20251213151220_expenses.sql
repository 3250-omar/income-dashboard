create table public.expenses (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.users(id) on delete cascade,
    description text,
    amount numeric not null,
    category text,
    created_at timestamp with time zone default now()
);

alter table public.expenses enable row level security;

create policy "Users can insert own expenses"
on public.expenses
for insert
with check (auth.uid() = user_id);

create policy "Users can read own expenses"
on public.expenses
for select
using (auth.uid() = user_id);

create policy "Users can update own expenses"
on public.expenses
for update
using (auth.uid() = user_id);

create policy "Users can delete own expenses"
on public.expenses
for delete
using (auth.uid() = user_id);
