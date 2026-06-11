CREATE INDEX IF NOT EXISTS idx_purchases_audit_vendor_created_at
ON public.purchases (
  (purchase_data->>'vendedorId'),
  (purchase_data->>'createdAt') DESC
);

CREATE OR REPLACE FUNCTION public.get_purchase_audit_dashboard(
  p_vendedor_id text DEFAULT '75728a7d-ff85-4112-b33d-3bf074acc275',
  p_page integer DEFAULT 1,
  p_page_size integer DEFAULT 25
)
RETURNS jsonb
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
WITH latest_purchases AS (
  SELECT
    p.id,
    p.email,
    p.product_id,
    p.product_name,
    p.transaction_id,
    p.status,
    p.payment_gateway,
    p.purchase_data,
    p.purchased_at,
    p.created_at
  FROM public.purchases p
  WHERE p.purchase_data->>'vendedorId' = p_vendedor_id
  ORDER BY p.purchase_data->>'createdAt' DESC NULLS LAST
  LIMIT 3000
),
filtered AS (
  SELECT *
  FROM latest_purchases p
  WHERE p.purchase_data->>'cupomDescontoId' IS NULL
    AND NULLIF(trim(COALESCE(p.purchase_data->>'emailComprador', p.email)), '') IS NOT NULL
    AND COALESCE(p.purchase_data->>'emailComprador', p.email) NOT ILIKE '%teste%'
    AND COALESCE(p.purchase_data->>'emailComprador', p.email) NOT ILIKE '%test%'
    AND COALESCE(p.purchase_data->>'nomeComprador', '') NOT ILIKE '%teste%'
    AND COALESCE(p.purchase_data->>'nomeComprador', '') NOT ILIKE '%test%'
),
normalized AS (
  SELECT
    p.id,
    p.email,
    p.product_id,
    p.product_name,
    p.transaction_id,
    p.status,
    p.payment_gateway,
    p.purchase_data,
    p.purchased_at,
    p.created_at,
    lower(NULLIF(trim(COALESCE(p.purchase_data->>'emailComprador', p.email)), '')) AS buyer_email,
    NULLIF(
      trim(
        concat_ws(
          ' ',
          NULLIF(p.purchase_data->>'nomeComprador', ''),
          NULLIF(p.purchase_data->>'sobrenomeComprador', '')
        )
      ),
      ''
    ) AS buyer_name,
    COALESCE(
      NULLIF(p.purchase_data->>'transaction', ''),
      NULLIF(p.purchase_data->>'id', ''),
      NULLIF(p.purchase_data->>'checkoutId', ''),
      NULLIF(p.purchase_data->>'idepotentialCheckoutId', ''),
      p.transaction_id,
      p.id::text
    ) AS audit_transaction_id,
    CASE
      WHEN COALESCE(p.purchase_data->>'createdAt', '') ~ '^\d{4}-\d{2}-\d{2}'
        THEN (p.purchase_data->>'createdAt')::timestamptz
      ELSE COALESCE(p.purchased_at, p.created_at)
    END AS purchase_created_at,
    CASE
      WHEN COALESCE(p.purchase_data->>'valorPago', '') ~ '^[0-9]+([.,][0-9]+)?$'
        THEN replace(p.purchase_data->>'valorPago', ',', '.')::numeric
      ELSE NULL
    END AS paid_amount
  FROM filtered p
),
deduped_products AS (
  SELECT DISTINCT ON (audit_transaction_id, product_id)
    audit_transaction_id,
    product_id,
    product_name,
    paid_amount,
    status,
    payment_gateway
  FROM normalized
  ORDER BY audit_transaction_id, product_id, purchase_created_at DESC
),
transactions AS (
  SELECT
    latest.audit_transaction_id,
    max(latest.buyer_email) AS buyer_email,
    max(latest.buyer_name) AS buyer_name,
    max(latest.purchase_created_at) AS purchased_at,
    max(latest.paid_amount) AS total_paid
  FROM normalized latest
  GROUP BY latest.audit_transaction_id
),
transaction_products AS (
  SELECT
    deduped_products.audit_transaction_id,
    jsonb_agg(
      jsonb_build_object(
        'product_id', deduped_products.product_id,
        'product_name', COALESCE(deduped_products.product_name, deduped_products.product_id, 'Produto'),
        'paid_amount', deduped_products.paid_amount,
        'status', deduped_products.status,
        'payment_gateway', deduped_products.payment_gateway
      )
      ORDER BY COALESCE(deduped_products.product_name, deduped_products.product_id, 'Produto')
    ) AS products
  FROM deduped_products
  GROUP BY deduped_products.audit_transaction_id
),
buyer_stats AS (
  SELECT
    buyer_email,
    count(*)::integer AS purchase_count,
    COALESCE(sum(total_paid), 0)::numeric AS buyer_total_paid
  FROM transactions
  GROUP BY buyer_email
),
summary AS (
  SELECT
    count(*)::integer AS total_transactions,
    count(DISTINCT buyer_email)::integer AS total_buyers,
    COALESCE(sum(total_paid), 0)::numeric AS total_revenue
  FROM transactions
),
paginated AS (
  SELECT
    transactions.*,
    COALESCE(transaction_products.products, '[]'::jsonb) AS products,
    buyer_stats.purchase_count,
    buyer_stats.buyer_total_paid
  FROM transactions
  LEFT JOIN transaction_products ON transaction_products.audit_transaction_id = transactions.audit_transaction_id
  JOIN buyer_stats ON buyer_stats.buyer_email = transactions.buyer_email
  ORDER BY transactions.purchased_at DESC
  LIMIT greatest(1, least(p_page_size, 100))
  OFFSET greatest(0, p_page - 1) * greatest(1, least(p_page_size, 100))
)
SELECT jsonb_build_object(
  'summary',
  jsonb_build_object(
    'total_transactions', COALESCE(summary.total_transactions, 0),
    'total_buyers', COALESCE(summary.total_buyers, 0),
    'total_revenue', COALESCE(summary.total_revenue, 0),
    'page', greatest(1, p_page),
    'page_size', greatest(1, least(p_page_size, 100))
  ),
  'rows',
  COALESCE(
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'transaction_id', paginated.audit_transaction_id,
          'buyer_email', paginated.buyer_email,
          'buyer_name', paginated.buyer_name,
          'purchase_count', paginated.purchase_count,
          'buyer_total_paid', paginated.buyer_total_paid,
          'purchased_at', paginated.purchased_at,
          'total_paid', paginated.total_paid,
          'products', paginated.products
        )
        ORDER BY paginated.purchased_at DESC
      )
      FROM paginated
    ),
    '[]'::jsonb
  )
)
FROM summary;
$$;

GRANT EXECUTE ON FUNCTION public.get_purchase_audit_dashboard(text, integer, integer) TO service_role;
