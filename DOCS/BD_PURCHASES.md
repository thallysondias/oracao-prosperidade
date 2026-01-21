create table public.purchases (
  id uuid not null default gen_random_uuid (),
  profile_id uuid null,
  email text not null,
  product_id text not null,
  product_name text null,
  transaction_id text null,
  status text not null default 'approved'::text,
  purchase_data jsonb null,
  purchased_at timestamp with time zone null default now(),
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  payment_gateway text null default 'hotmart'::text,
  constraint purchases_pkey primary key (id),
  constraint purchases_transaction_id_key unique (transaction_id),
  constraint purchases_profile_id_fkey foreign KEY (profile_id) references profiles (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_purchases_profile_id on public.purchases using btree (profile_id) TABLESPACE pg_default;

create index IF not exists idx_purchases_email on public.purchases using btree (email) TABLESPACE pg_default;

create index IF not exists idx_purchases_transaction_id on public.purchases using btree (transaction_id) TABLESPACE pg_default;

create index IF not exists idx_purchases_status on public.purchases using btree (status) TABLESPACE pg_default;

create index IF not exists idx_purchases_payment_gateway on public.purchases using btree (payment_gateway) TABLESPACE pg_default;

create trigger update_purchases_updated_at BEFORE
update on purchases for EACH row
execute FUNCTION update_updated_at_column ();