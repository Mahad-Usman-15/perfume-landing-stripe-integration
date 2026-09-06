import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { CheckoutItem, CheckoutSummary } from '../../types/checkout';

interface ProductSummaryCardProps {
  item: CheckoutItem;
  onUpdateQuantity: (newQty: number) => void;
  summary: CheckoutSummary;
}

export const ProductSummaryCard: React.FC<ProductSummaryCardProps> = ({
  item,
  onUpdateQuantity,
  summary
}) => {
  return (
    <div className="bg-[#0a120e] border border-[#1b3528] rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#1b3528]/80">
        <h3 className="font-serif text-lg font-bold text-[#f1f5f2] tracking-wide">
          Order Summary
        </h3>
        <span className="text-xs text-[#d4af37] font-semibold bg-[#d4af37]/10 border border-[#d4af37]/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
          Limited Batch
        </span>
      </div>

      {/* Item Details Row */}
      <div className="flex gap-4 items-start">
        <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl bg-[#050907] border border-[#1b3528] overflow-hidden p-1.5 shrink-0 group">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <span className="absolute bottom-1 right-1 bg-[#050907]/90 text-[10px] text-[#d4af37] font-bold px-1.5 py-0.5 rounded border border-[#1b3528]">
            {item.volume}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-serif text-base font-bold text-[#f1f5f2] leading-snug">
                {item.name}
              </h4>
              <p className="text-xs text-[#9eaba2] mt-0.5">
                Item ID: <span className="font-mono text-[11px] text-[#9eaba2]/80">{item.productId}</span>
              </p>
            </div>
          </div>

          {/* Pricing breakdown per item */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base font-bold text-[#d4af37]">
              Rs. {item.unitPrice.toLocaleString()}
            </span>
            <span className="text-xs text-[#9eaba2]/60 line-through">
              Rs. {item.regularPrice.toLocaleString()}
            </span>
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              25% OFF
            </span>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between mt-3 pt-2">
            <span className="text-xs text-[#9eaba2] font-medium">Quantity:</span>
            <div className="inline-flex items-center rounded-lg border border-[#1b3528] bg-[#050907] p-0.5">
              <button
                type="button"
                onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
                className="w-7 h-7 flex items-center justify-center text-[#9eaba2] hover:text-[#f1f5f2] disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded hover:bg-[#0c1510] cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-[#f1f5f2] font-mono">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(Math.min(10, item.quantity + 1))}
                disabled={item.quantity >= 10}
                aria-label="Increase quantity"
                className="w-7 h-7 flex items-center justify-center text-[#9eaba2] hover:text-[#d4af37] disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded hover:bg-[#0c1510] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional banner */}
      <div className="bg-[#0c1510] border border-[#1b3528] rounded-xl p-3">
        <div className="text-xs">
          <p className="text-[#f1f5f2] font-medium">Special Launch Discount Applied</p>
          <p className="text-[#9eaba2] text-[11px] mt-0.5">Saving Rs. {(summary.discount).toLocaleString()} on your order</p>
        </div>
      </div>

      {/* Cost Calculations */}
      <div className="border-t border-[#1b3528]/80 pt-4 space-y-2.5 text-xs sm:text-sm">
        <div className="flex justify-between text-[#9eaba2]">
          <span>Subtotal ({item.quantity} {item.quantity === 1 ? 'bottle' : 'bottles'})</span>
          <span className="text-[#f1f5f2] font-medium">Rs. {(item.unitPrice * item.quantity).toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-[#9eaba2]">
          <span>Nationwide Express Shipping</span>
          <div className="text-right">
            <span className="text-emerald-400 font-semibold uppercase text-xs">FREE</span>
            <span className="text-[11px] text-[#9eaba2]/60 line-through ml-1.5">Rs. 250</span>
          </div>
        </div>

        <div className="flex justify-between text-[#9eaba2]">
          <span>Total Savings</span>
          <span className="text-emerald-400 font-medium">
            - Rs. {(summary.discount + summary.savedShipping).toLocaleString()}
          </span>
        </div>

        {/* Grand Total */}
        <div className="border-t border-[#1b3528] pt-3 flex justify-between items-baseline">
          <div>
            <span className="text-sm sm:text-base font-bold text-[#f1f5f2] font-serif">Order Total</span>
            <p className="text-[11px] text-[#9eaba2]">All taxes & duties included</p>
          </div>
          <div className="text-right">
            <span className="text-xl sm:text-2xl font-bold text-[#d4af37] font-serif">
              Rs. {summary.total.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#9eaba2] block uppercase tracking-wider">PKR</span>
          </div>
        </div>
      </div>

      {/* Micro Reassurance */}
      <div className="pt-2 border-t border-[#1b3528]/50 text-center text-[11px] text-[#9eaba2]">
        <span>100% Authentic Original Formula • Sealed Pack Guarantee</span>
      </div>
    </div>
  );
};
