export interface OlfactoryNote {
  stage: string;
  hours: string;
  title: string;
  ingredients: string;
  description: string;
  projection: string;
  originOrCharacter: {
    label: string;
    value: string;
  };
}

export interface Testimonial {
  id: string;
  rating: number;
  quote: string;
  author: string;
  role: string;
  city: string;
  verified: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface OrderFormData {
  fullName: string;
  phoneNumber: string;
  email?: string;
  city: string;
  address: string;
  notes?: string;
  quantity: number;
  paymentMethod: 'online' | 'bank_transfer' | 'card';
}

export interface PlacedOrder extends OrderFormData {
  orderId: string;
  createdAt: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
}

export * from './types/checkout';
