import React, { useState } from 'react';
import { Check, ShieldCheck, Truck } from 'lucide-react';
import { ASSETS, PRODUCT_DETAILS } from '../data/fragranceData';

interface OfferSectionProps {
  onOpenOrderModal: (qty?: number) => void;
}

export const OfferSection: React.FC<OfferSectionProps> = ({ onOpenOrderModal }) => {
  const [selectedQty, setSelectedQty] = useState<number>(1);

  const pricePerUnit = PRODUCT_DETAILS.discountPrice;
  const totalPrice = pricePerUnit * selectedQty;
  const totalSavings = PRODUCT_DETAILS.savings * selectedQty + PRODUCT_DETAILS.savedDelivery;

  return (
    <section
      id="offer"
      className="py-16 md:py-28 bg-[#070d0a] relative scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Conversion Banner Box */}
        <div
          id="main-offer-box"
          className="border border-[#d4af37]/40 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0d1612] via-[#0d1612]/95 to-[#070d0a] p-5 sm:p-8 md:p-12 luxury-card-shadow overflow-hidden relative shadow-[0_12px_45px_rgba(0,0,0,0.8)]"
        >
          {/* Subtle gold radial ambient */}
          <div
            className="absolute -top-32 -right-32 w-96 h-96 pointer-events-none opacity-40 gold-radial-glow"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column: Product Promotional Artwork Asset */}
            <div className="lg:col-span-6 relative">
              <div
                id="offer-image-wrapper"
                className="rounded-2xl overflow-hidden border border-[#1b3528] aspect-[4/3] bg-[#070d0a] group relative"
              >
                <img
                  src={ASSETS.offerPromo}
                  alt="Khushboo 100ml Special Offer Extrait De Parfum Presentation"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#070d0a]/80 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-[#d4af37]/40 text-[10px] sm:text-[11px] font-bold text-[#d4af37] uppercase tracking-wider">
                  <span>Limited Launch Allocation</span>
                </div>
              </div>
            </div>

            {/* Right Column: High Conversion Pricing & Order Trigger */}
            <div className="lg:col-span-6 flex flex-col space-y-4 sm:space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 mb-2.5 sm:mb-3">
                  <span className="text-[10px] sm:text-xs font-bold text-[#d4af37] uppercase tracking-[0.14em] sm:tracking-[0.18em]">
                    LIMITED TIME LAUNCH PRICING
                  </span>
                </div>

                <h2
                  id="offer-title"
                  className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#f1f5f2] font-bold tracking-tight"
                >
                  Experience True Presence
                </h2>

                <p className="text-sm sm:text-base text-[#9eaba2] mt-1 sm:mt-1.5 font-medium">
                  Product:{' '}
                  <span className="text-[#f1f5f2] font-semibold">
                    Khushboo 100ml Extrait De Parfum
                  </span>
                </p>
              </div>

              {/* Quantity Selection Selector with Bundle Savings */}
              <div className="bg-[#070d0a] border border-[#1b3528] p-3.5 sm:p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                  <span className="text-[11px] sm:text-xs text-[#9eaba2] uppercase tracking-wider font-semibold">
                    Select Quantity
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#d4af37] font-medium">
                    Free Courier Included
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {[1, 2, 3].map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setSelectedQty(qty)}
                      className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg text-[11px] sm:text-xs font-bold uppercase transition-all duration-200 border text-center flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                        selectedQty === qty
                          ? 'bg-[#d4af37] text-[#070d0a] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                          : 'bg-[#0d1612] text-[#f1f5f2] border-[#1b3528] hover:border-[#d4af37]/50'
                      }`}
                    >
                      <span>{qty} {qty === 1 ? 'Bottle' : 'Bottles'}</span>
                      <span className={`text-[9px] sm:text-[10px] ${selectedQty === qty ? 'text-[#070d0a]' : 'text-[#9eaba2]'}`}>
                        Rs. {pricePerUnit * qty}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Breakdown Card */}
              <div
                id="offer-price-card"
                className="bg-[#070d0a] border border-[#1b3528] p-3.5 sm:p-5 rounded-xl flex items-center justify-between gap-2"
              >
                <div>
                  <span className="text-[10px] sm:text-xs text-[#9eaba2] block uppercase tracking-wider font-medium">
                    Launch Investment
                  </span>
                  <div className="flex items-baseline gap-2 sm:gap-3 mt-0.5 sm:mt-1">
                    <span className="text-xs sm:text-base text-[#9eaba2] line-through font-medium">
                      {PRODUCT_DETAILS.currency} {PRODUCT_DETAILS.regularPrice * selectedQty}
                    </span>
                    <span className="font-serif text-2xl sm:text-4xl font-bold text-[#d4af37]">
                      {PRODUCT_DETAILS.currency} {totalPrice}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <span className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-[#d4af37] text-[#070d0a] text-[10px] sm:text-xs tracking-wider uppercase font-bold inline-block shadow-sm">
                    {PRODUCT_DETAILS.discountPercentage}% Launch Discount
                  </span>
                  <span className="block text-[10px] sm:text-[11px] text-[#9eaba2] mt-1 sm:mt-1.5">
                    Net Savings: {PRODUCT_DETAILS.currency} {totalSavings}
                  </span>
                </div>
              </div>

              {/* Value Checklist */}
              <div className="space-y-2 sm:space-y-2.5 py-0.5 sm:py-1">
                <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-[#f1f5f2]">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#d4af37] text-[#070d0a] flex items-center justify-center font-bold text-xs shrink-0">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#070d0a] stroke-[3]" />
                  </span>
                  <span>Free Delivery Until 15 September (Saved Rs. 250)</span>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-[#f1f5f2]">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#d4af37] text-[#070d0a] flex items-center justify-center font-bold text-xs shrink-0">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#070d0a] stroke-[3]" />
                  </span>
                  <span>100% Authentic Sealed Packaging Guaranteed</span>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-[#f1f5f2]">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#d4af37] text-[#070d0a] flex items-center justify-center font-bold text-xs shrink-0">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#070d0a] stroke-[3]" />
                  </span>
                  <span>Includes High-Precision Gold Atomizer Cap</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row gap-4">
                <button
                  id="offer-order-btn"
                  onClick={() => onOpenOrderModal(selectedQty)}
                  className="flex-1 text-center bg-[#d4af37] hover:bg-[#e5c158] text-[#070d0a] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold tracking-[0.12em] sm:tracking-[0.15em] uppercase transition-all duration-300 shadow-[0_4px_24px_rgba(212,175,55,0.45)] hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  <span>ORDER KHUSHBOO NOW</span>
                </button>
              </div>

              {/* Authenticity guarantee footer */}
              <p className="text-[11px] sm:text-xs text-[#9eaba2] text-center sm:text-left flex items-center gap-1.5 justify-center sm:justify-start">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37] shrink-0" />
                <span>100% Authentic Extrait Formula • Dispatched within 24 Hours</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
