-- Create prayer_requests table
CREATE TABLE IF NOT EXISTS public.prayer_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  goal TEXT NOT NULL,
  prayer_text TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'processing', 'completed')),
  transaction_id TEXT,
  payment_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_prayer_requests_profile_id ON public.prayer_requests(profile_id);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_email ON public.prayer_requests(email);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_transaction_id ON public.prayer_requests(transaction_id);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON public.prayer_requests(status);

-- Enable Row Level Security
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can view their own prayer requests
CREATE POLICY "Users can view own prayer requests"
  ON public.prayer_requests
  FOR SELECT
  USING (auth.uid() = profile_id OR email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create policy: Users can insert their own prayer requests
CREATE POLICY "Users can insert own prayer requests"
  ON public.prayer_requests
  FOR INSERT
  WITH CHECK (auth.uid() = profile_id OR email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create policy: Service role can do everything (for webhooks)
CREATE POLICY "Service role can manage prayer requests"
  ON public.prayer_requests
  FOR ALL
  USING (true);

-- Add comment to table
COMMENT ON TABLE public.prayer_requests IS 'Stores personalized prayer requests from users';
