import React, { useState } from 'react';
import { CheckCircle, Copy, Check } from 'lucide-react';
import { PlacedOrderConfirmation } from '../../types/checkout';

interface OrderConfirmationViewProps {
  order: PlacedOrderConfirmation;
  onReturnToShop: () => void;
}

export const OrderConfirmationView: React.FC<OrderConfirmationViewProps> = ({
  order,
  onReturnToShop
}) => {
  const [showJson, setShowJson] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(order.payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      <div className="bg-[#0a120e] border border-[#1b3528] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Success Icon */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-[#d4af37]" />
          </div>
          <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/30">
            Order Successfully Placed
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#f1f5f2] tracking-wide">
            Thank You, {order.payload.customer.fullName}
          </h1>
          <p className="text-sm text-[#9eaba2] max-w-md mx-auto">
            Your order has been recorded. An order confirmation has been logged for delivery to{' '}
            <span className="text-[#f1f5f2] font-semibold">{order.payload.customer.city}</span>.
          </p>
        </div>

        {/* Reference and Estimated Delivery Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#050907] border border-[#1b3528] rounded-2xl p-4 sm:p-5">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#9eaba2] block">Order Reference</span>
            <span className="text-base sm:text-lg font-mono font-bold text-[#d4af37]">
              {order.orderId}
            </span>
            <span className="text-[11px] text-[#9eaba2]/70 block mt-0.5">{order.createdAt}</span>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#9eaba2] block">Estimated Delivery</span>
            <span className="text-sm sm:text-base font-semibold text-[#f1f5f2] block mt-0.5">
              {order.estimatedDelivery}
            </span>
            <span className="text-[11px] text-emerald-400 block mt-0.5">Free Courier Tracking</span>
          </div>
        </div>

        {/* Order Details Breakdown */}
        <div className="space-y-4">
          <h3 className="font-serif text-base font-bold text-[#f1f5f2] border-b border-[#1b3528] pb-2">
            Purchased Items
          </h3>

          <div className="space-y-3">
            {order.payload.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 p-3 bg-[#050907] border border-[#1b3528]/80 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 rounded-lg bg-[#070d0a] border border-[#1b3528] overflow-hidden p-1 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#f1f5f2]">{item.name}</h4>
                    <p className="text-xs text-[#9eaba2]">
                      Qty: {item.quantity} • {item.volume} • Rs. {item.unitPrice.toLocaleString()} each
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-[#d4af37]">
                    Rs. {(item.unitPrice * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping & Payment Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#050907] border border-[#1b3528] rounded-xl p-4 space-y-2">
            <span className="font-bold text-[#f1f5f2] uppercase tracking-wider block text-[11px]">
              Delivery Destination
            </span>
            <p className="text-[#f1f5f2] font-semibold">{order.payload.customer.fullName}</p>
            <p className="text-[#9eaba2] leading-relaxed">{order.payload.customer.address}</p>
            <p className="text-[#9eaba2]">{order.payload.customer.city}, Pakistan</p>
            <p className="text-[#9eaba2] pt-1">Phone: {order.payload.customer.phone}</p>
            <p className="text-[#9eaba2]">Email: {order.payload.customer.email}</p>
          </div>

          <div className="bg-[#050907] border border-[#1b3528] rounded-xl p-4 space-y-2.5 flex flex-col justify-between">
            <div>
              <span className="font-bold text-[#f1f5f2] uppercase tracking-wider block text-[11px]">
                Payment Summary
              </span>
              <p className="text-sm font-semibold text-[#d4af37] mt-1">
                Credit / Debit Card (Stripe)
              </p>
              <p className="text-[11px] text-[#9eaba2]">
                Subtotal: Rs. {order.payload.summary.subtotal.toLocaleString()}
              </p>
              <p className="text-[11px] text-emerald-400">
                Nationwide Shipping: FREE
              </p>
            </div>

            <div className="border-t border-[#1b3528] pt-2 flex justify-between items-baseline">
              <span className="font-serif font-bold text-[#f1f5f2]">Total Amount:</span>
              <span className="text-base font-bold text-[#d4af37] font-serif">
                Rs. {order.payload.summary.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Phase 2 Backend Payload Verification Drawer */}
        <div className="border border-[#1b3528] rounded-xl bg-[#050907] overflow-hidden">
          <button
            type="button"
            onClick={() => setShowJson(!showJson)}
            className="w-full flex items-center justify-between px-4 py-3 text-xs text-[#9eaba2] hover:text-[#f1f5f2] transition-colors cursor-pointer"
          >
            <span>Phase 2 Backend Integration Payload (Inspection)</span>
            <span className="text-[10px] text-[#d4af37] underline">
              {showJson ? 'Hide Structured JSON' : 'View Structured JSON'}
            </span>
          </button>

          {showJson && (
            <div className="p-4 border-t border-[#1b3528] bg-[#030604] relative">
              <div className="flex justify-between items-center pb-2 mb-2 border-b border-[#1b3528]/60 text-[11px] text-[#9eaba2]">
                <span>Data structure ready for Stripe PaymentIntent creation</span>
                <button
                  onClick={handleCopyJson}
                  className="flex items-center gap-1 text-[#d4af37] hover:underline cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-60 p-2 bg-[#050907] rounded-lg">
                {JSON.stringify(order.payload, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Return Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1b3528]">
          <button
            type="button"
            onClick={onReturnToShop}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#d4af37] text-[#070d0a] font-bold text-sm hover:bg-[#dfba44] transition-all cursor-pointer shadow-lg shadow-[#d4af37]/20"
          >
            <span>Continue to Store</span>
          </button>

          <div className="text-xs text-[#9eaba2]">
            <span>24/7 Dedicated Fragrance Concierge Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};
