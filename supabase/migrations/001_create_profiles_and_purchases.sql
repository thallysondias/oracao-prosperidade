-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  password TEXT DEFAULT 'benedito',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create purchases table to track all purchases
CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT,
  transaction_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'approved', -- approved, cancelled, refunded, chargeback
  purchase_data JSONB, -- Store complete webhook data
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster email lookups
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_purchases_profile_id ON public.purchases(profile_id);
CREATE INDEX idx_purchases_email ON public.purchases(email);
CREATE INDEX idx_purchases_transaction_id ON public.purchases(transaction_id);
CREATE INDEX idx_purchases_status ON public.purchases(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_purchases_updated_at
  BEFORE UPDATE ON public.purchases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Service role can manage all profiles"
  ON public.profiles
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create policies for purchases
CREATE POLICY "Users can view their own purchases"
  ON public.purchases
  FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Service role can manage all purchases"
  ON public.purchases
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create function to get user's active products
CREATE OR REPLACE FUNCTION get_user_products(user_email TEXT)
RETURNS TABLE (
  product_id TEXT,
  product_name TEXT,
  purchased_at TIMESTAMP WITH TIME ZONE,
  status TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.product_id,
    p.product_name,
    p.purchased_at,
    p.status
  FROM public.purchases p
  WHERE p.email = user_email
    AND p.status = 'approved'
  ORDER BY p.purchased_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user has access to product
CREATE OR REPLACE FUNCTION has_product_access(user_email TEXT, check_product_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.purchases
    WHERE email = user_email
      AND product_id = check_product_id
      AND status = 'approved'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create view for active users with products
CREATE OR REPLACE VIEW user_products AS
SELECT 
  pr.id as profile_id,
  pr.email,
  pr.name,
  jsonb_agg(
    jsonb_build_object(
      'product_id', p.product_id,
      'product_name', p.product_name,
      'status', p.status,
      'purchased_at', p.purchased_at
    ) ORDER BY p.purchased_at DESC
  ) FILTER (WHERE p.id IS NOT NULL) as products
FROM public.profiles pr
LEFT JOIN public.purchases p ON pr.id = p.profile_id
GROUP BY pr.id, pr.email, pr.name;

-- Grant permissions
GRANT SELECT ON user_products TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_products(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION has_product_access(TEXT, TEXT) TO authenticated;
