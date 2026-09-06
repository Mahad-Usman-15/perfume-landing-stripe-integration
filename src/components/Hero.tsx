import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { ASSETS, PRODUCT_DETAILS } from '../data/fragranceData';

interface HeroProps {
  onOpenOrderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[600px] lg:min-h-[720px] flex items-center bg-cover bg-right lg:bg-center bg-no-repeat py-12 md:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundImage: `url(${ASSETS.heroBottle})` }}
    >
      {/* Subtle directional vignette to maintain pristine typography contrast on the left while keeping full opacity */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#070d0a]/90 via-[#070d0a]/65 to-transparent lg:from-[#070d0a]/85 lg:via-[#070d0a]/40 lg:to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Immediate Conversion Content */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start space-y-5 sm:space-y-6 bg-[#070d0a]/60 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-5 sm:p-8 lg:p-0 rounded-2xl lg:rounded-none border border-[#1b3528]/40 lg:border-none">
            {/* Eyebrow Badge */}
            <div
              id="hero-eyebrow-badge"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070d0a]/90 border border-[#d4af37]/40 shadow-sm"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                PREMIUM MEN'S FRAGRANCE
              </span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-main-title"
              className="font-serif text-3xl sm:text-5xl lg:text-[58px] xl:text-[62px] leading-[1.12] font-bold text-[#f1f5f2] tracking-[-0.015em]"
            >
              Leave a Lasting Impression Before You Say a Word.
            </h1>

            {/* Description */}
            <p
              id="hero-subtitle"
              className="text-base sm:text-lg leading-relaxed text-[#c6d4cc] max-w-xl font-normal"
            >
              A premium men's fragrance blending fresh citrus notes with rich tobacco, sandalwood, and musk.
            </p>

            {/* Pricing Bar & Launch Discount */}
            <div
              id="hero-pricing-bar"
              className="flex items-center gap-4 py-1"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-base sm:text-lg text-[#9eaba2] line-through font-medium">
                  {PRODUCT_DETAILS.currency} {PRODUCT_DETAILS.regularPrice}
                </span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#d4af37] tracking-tight">
                  {PRODUCT_DETAILS.currency} {PRODUCT_DETAILS.discountPrice}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#d4af37] text-[#070d0a] text-xs font-bold tracking-wider uppercase shadow-sm">
                {PRODUCT_DETAILS.discountPercentage}% OFF LAUNCH
              </span>
            </div>

            {/* Primary Call to Action */}
            <div className="w-full sm:w-auto pt-1">
              <button
                id="hero-buy-now-btn"
                onClick={onOpenOrderModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#d4af37] hover:bg-[#e5c158] text-[#070d0a] px-8 py-4 rounded-xl text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>BUY KHUSHBOO NOW</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Trust Points */}
            <div
              id="hero-trust-points"
              className="pt-4 border-t border-[#1b3528]/80 w-full flex flex-wrap items-center gap-y-2.5 gap-x-5 text-xs sm:text-sm text-[#d4e0d9]"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] flex items-center justify-center text-xs font-bold shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#d4af37] stroke-[3]" />
                </span>
                <span className="font-medium">100ml Full Size Bottle</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] flex items-center justify-center text-xs font-bold shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#d4af37] stroke-[3]" />
                </span>
                <span className="font-medium">Cash On Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] flex items-center justify-center text-xs font-bold shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#d4af37] stroke-[3]" />
                </span>
                <span className="font-medium">Free Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Open space showcasing the perfume image in the background asset */}
          <div
            className="lg:col-span-5 xl:col-span-6 min-h-[160px] sm:min-h-[260px] lg:min-h-[520px] pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

