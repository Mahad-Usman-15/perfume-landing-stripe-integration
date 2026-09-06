export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

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

export type PaymentMethodType = 'stripe_card';

export interface CardPlaceholderData {
  cardNumber: string;
  expiry: string;
  cvc: string;
  nameOnCard: string;
}

/**
 * Structured checkout data model designed for Phase 2 backend Stripe PaymentIntent integration.
 * In Phase 2, this payload is sent to /api/create-payment-intent to initiate Stripe payment.
 */
export interface CheckoutPayload {
  customer: CustomerDetails;
  items: CheckoutItem[];
  summary: CheckoutSummary;
  paymentMethod: PaymentMethodType;
  cardPlaceholder?: CardPlaceholderData;
  clientMetadata: {
    source: string;
    userAgent?: string;
    locale: string;
    currency: string;
  };
  stripePaymentIntentId?: string;
  status: 'pending' | 'processing' | 'succeeded';
  createdAt: string;
}

export interface PlacedOrderConfirmation {
  orderId: string;
  createdAt: string;
  estimatedDelivery: string;
  payload: CheckoutPayload;
}
