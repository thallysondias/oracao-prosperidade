export interface DigistoreWebhook {
  email?: string;
  first_name?: string;
  last_name?: string;
  order_id?: string;
  transaction_id?: string;
  product_name?: string;
  product_name_intern?: string;
  product_id?: string;
  event?: string;
  amount_brutto?: string;
  amount_netto?: string;
  amount_vendor?: string;
  amount_affiliate?: string;
  currency?: string;
  order_date_time?: string;
  transaction_date_time?: string;
}
