create or replace function get_expenses_with_total()
returns json
language sql
as $$
  select json_build_object(
    'total', coalesce(sum(amount), 0),
    'data', json_agg(e)
  )
  from expenses e
  where user_id = auth.uid();
$$;
