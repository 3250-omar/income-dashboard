create table profiles (
  id text primary key,      -- Clerk user ID
  email text unique,
  name text,
  image_url text,
  created_at timestamp default now()
);
