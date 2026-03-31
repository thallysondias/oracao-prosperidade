export interface UserPurchase {
  product_id: string;
  product_name: string;
  transaction_id: string;
  status: string;
  purchased_at?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  purchases: UserPurchase[];
}
