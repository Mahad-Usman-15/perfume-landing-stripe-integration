import type { CreatePaymentIntentRequest } from '../../shared/checkout';

export type CustomerDetails = CreatePaymentIntentRequest['customer'];

export interface CheckoutItem {
  productId: string;
  name: string;
  volume: string;
  unitPrice: number;
  regularPrice: number;
  quantity: number;
  image: string;
}

export interface CheckoutSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  savedShipping: number;
  total: number;
  currency: string;
}

export interface PaymentReceipt {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded';
}
