import { z } from 'zod';

// All monetary values are integer minor units; shipping is per order.
export const  PRODUCT = {
  id: 'khushboo-100ml-edp',
  name: 'Khushboo Premium Perfume',
  volume: '100ml / 3.4 FL.OZ',
  currency: 'pkr',
  unitAmount: 200000,
  regularAmount: 266700,
  shippingAmount: 0,
  savedDeliveryAmount: 25000,
} as const;

export const createPaymentIntentRequestSchema = z.object({
  customer: z.object({
    fullName: z.string().trim().min(2).max(100),
    email: z.string().trim().max(254).email(),
    phone: z.string().trim().min(7).max(30).regex(/^\+?[0-9 ()-]+$/),
    address: z.string().trim().min(5).max(200),
    city: z.string().trim().min(2).max(100),
    notes: z.string().trim().max(500).optional(),
  }).strict(),
  productId: z.literal(PRODUCT.id),
  quantity: z.number().int().min(1).max(10),
  attemptId: z.string().uuid(),
}).strict();

// Freeze this request after creation. Retry unchanged with the same attemptId;
// explicit edits require a new attemptId. Never include card data here.
export type CreatePaymentIntentRequest = z.infer<typeof createPaymentIntentRequestSchema>;

export interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: typeof PRODUCT.currency;
  quantity: number;
}

export interface CheckoutApiError {
  error: string;
}
