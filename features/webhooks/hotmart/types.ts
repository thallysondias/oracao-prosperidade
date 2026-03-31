export type HotmartStatus =
  | 'approved'
  | 'cancelled'
  | 'refunded'
  | 'chargeback'
  | 'pending';

export interface HotmartWebhook {
  id: string;
  event: string;
  creation_date: number;
  data: {
    buyer: {
      email: string;
      name: string;
    };
    product: {
      id: string;
      name: string;
    };
    purchase: {
      transaction: string;
      status: HotmartStatus;
      approved_date?: number;
    };
  };
}
