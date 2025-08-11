-- This function is triggered when a new user signs up.
-- It creates a corresponding row in the public.profiles table.
create or replace function public.create_new_user_profile()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (user_id, full_name, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name', -- Assumes full_name might be passed during sign-up
    (new.raw_user_meta_data->>'role')::user_role -- Cast the role from metadata to the user_role enum
  );
  return new;
end;
$$;

-- This trigger calls the function after a new user is created.
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.create_new_user_profile();
