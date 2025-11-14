-- Fix RLS policies to allow webhook insertions
-- Execute este SQL no Supabase SQL Editor

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Service role can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Service role can manage all purchases" ON public.purchases;

-- Create new policies that allow anon inserts (for webhooks)
-- Profiles: Allow anon to insert, users can view their own
CREATE POLICY "Allow webhook to create profiles"
  ON public.profiles
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Service role can do anything with profiles"
  ON public.profiles
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Purchases: Allow anon to insert and update, users can view their own
CREATE POLICY "Allow webhook to create purchases"
  ON public.purchases
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow webhook to update purchases"
  ON public.purchases
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view their own purchases"
  ON public.purchases
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Service role can do anything with purchases"
  ON public.purchases
  TO service_role
  USING (true)
  WITH CHECK (true);
