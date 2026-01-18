-- Add payment_gateway column to purchases table to identify payment source
ALTER TABLE public.purchases 
ADD COLUMN IF NOT EXISTS payment_gateway TEXT DEFAULT 'hotmart';

-- Create index for faster payment_gateway lookups
CREATE INDEX IF NOT EXISTS idx_purchases_payment_gateway ON public.purchases(payment_gateway);

-- Update existing records to have 'hotmart' as default (already set by DEFAULT clause)
-- Future Stripe purchases will have 'stripe' value
