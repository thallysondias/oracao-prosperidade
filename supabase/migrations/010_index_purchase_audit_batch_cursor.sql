CREATE INDEX IF NOT EXISTS idx_purchases_audit_vendor_created_at_cursor
ON public.purchases (
  (purchase_data->>'vendedorId'),
  created_at DESC
);
