CREATE INDEX IF NOT EXISTS idx_purchases_audit_vendor_purchased_at
ON public.purchases (
  (purchase_data->>'vendedorId'),
  purchased_at DESC
);
