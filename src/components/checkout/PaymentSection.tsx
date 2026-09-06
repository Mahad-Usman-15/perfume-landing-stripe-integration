import React from 'react';
import { PaymentMethodType, CardPlaceholderData } from '../../types/checkout';

interface PaymentSectionProps {
  paymentMethod: PaymentMethodType;
  onPaymentMethodChange: (method: PaymentMethodType) => void;
  cardData: CardPlaceholderData;
  onCardDataChange: (field: keyof CardPlaceholderData, value: string) => void;
  errors?: { [key: string]: string };
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  paymentMethod,
  onPaymentMethodChange,
  cardData,
  onCardDataChange,
  errors = {}
}) => {
  return (
    <section className="bg-[#0a120e] border border-[#1b3528] rounded-2xl p-5 sm:p-7 shadow-xl">
      <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-[#1b3528]/80 mb-5 sm:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-serif font-bold text-sm">
            2
          </div>
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#f1f5f2] tracking-wide">
              Payment Method
            </h2>
            <p className="text-xs text-[#9eaba2] mt-0.5">
              100% Safe & Secure Online Payment
            </p>
          </div>
        </div>

        <div className="text-xs text-[#d4af37]">
          <span className="font-medium hidden sm:inline">Stripe Verified</span>
        </div>
      </div>

      {/* Payment Method Banner: Credit / Debit Card Only */}
      <div className="rounded-xl border border-[#d4af37]/50 bg-[#0c1912] p-4 flex items-center justify-between mb-5 ring-1 ring-[#d4af37]/30 shadow-md">
        <div>
          <span className="text-sm font-bold text-[#f1f5f2] block">Credit / Debit Card</span>
          <span className="text-xs text-[#9eaba2]">Powered by Stripe • Instant & Secure Payment</span>
        </div>
        <div className="text-xs text-[#d4af37] font-semibold bg-[#d4af37]/10 border border-[#d4af37]/30 px-3 py-1 rounded-full">
          Selected
        </div>
      </div>

      {/* ISOLATED PAYMENT COMPONENT CONTAINER */}
      {/* In Phase 2: Insert <Elements stripe={stripePromise}><PaymentElement /></Elements> inside this container */}
      <div id="stripe-payment-integration-container" className="pt-1">
        <div className="rounded-xl border border-[#1b3528] bg-[#050907] p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1b3528]">
            <span className="text-xs font-semibold text-[#f1f5f2] uppercase tracking-wider">
              Card Information
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-[#9eaba2]">
              <span className="px-1.5 py-0.5 rounded bg-[#0c1510] border border-[#1b3528] font-mono text-[10px]">VISA</span>
              <span className="px-1.5 py-0.5 rounded bg-[#0c1510] border border-[#1b3528] font-mono text-[10px]">MC</span>
              <span className="px-1.5 py-0.5 rounded bg-[#0c1510] border border-[#1b3528] font-mono text-[10px]">AMEX</span>
            </div>
          </div>

          {/* Non-technical security note */}
          <div className="bg-[#0c1510] border border-[#1b3528] rounded-lg p-3 text-xs text-[#9eaba2]">
            <p className="text-[#f1f5f2] font-medium">Bank-Grade Payment Security</p>
            <p className="text-[11px] text-[#9eaba2]/80 leading-relaxed mt-0.5">
              Your payment is handled with strict bank-level protection. In Phase 2, this section will mount the official Stripe Card Element.
            </p>
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9eaba2] mb-1.5">
              Card Number
            </label>
            <input
              type="text"
              placeholder="4242 •••• •••• 4242"
              maxLength={19}
              value={cardData.cardNumber}
              onChange={(e) => onCardDataChange('cardNumber', e.target.value)}
              className="w-full bg-[#070d0a] border border-[#1b3528] rounded-xl px-4 py-2.5 sm:py-3 text-sm text-[#f1f5f2] font-mono placeholder-[#9eaba2]/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 transition-colors"
            />
          </div>

          {/* Expiry & CVC Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9eaba2] mb-1.5">
                Expiration
              </label>
              <input
                type="text"
                placeholder="MM / YY"
                maxLength={5}
                value={cardData.expiry}
                onChange={(e) => onCardDataChange('expiry', e.target.value)}
                className="w-full bg-[#070d0a] border border-[#1b3528] rounded-xl px-4 py-2.5 sm:py-3 text-sm text-[#f1f5f2] font-mono placeholder-[#9eaba2]/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9eaba2] mb-1.5">
                CVC / CVV
              </label>
              <input
                type="password"
                placeholder="•••"
                maxLength={4}
                value={cardData.cvc}
                onChange={(e) => onCardDataChange('cvc', e.target.value)}
                className="w-full bg-[#070d0a] border border-[#1b3528] rounded-xl px-4 py-2.5 sm:py-3 text-sm text-[#f1f5f2] font-mono placeholder-[#9eaba2]/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 transition-colors"
              />
            </div>
          </div>

          {/* Cardholder Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9eaba2] mb-1.5">
              Name on Card
            </label>
            <input
              type="text"
              placeholder="Cardholder Name"
              value={cardData.nameOnCard}
              onChange={(e) => onCardDataChange('nameOnCard', e.target.value)}
              className="w-full bg-[#070d0a] border border-[#1b3528] rounded-xl px-4 py-2.5 sm:py-3 text-sm text-[#f1f5f2] placeholder-[#9eaba2]/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 transition-colors"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
