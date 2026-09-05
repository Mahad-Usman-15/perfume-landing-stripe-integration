import React from 'react';
import { Check, ArrowRight, ShieldCheck, Droplets } from 'lucide-react';
import { ASSETS, PRODUCT_DETAILS } from '../data/fragranceData';

interface HeroProps {
  onOpenOrderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal }) => {
  return (
    <section
      id="hero"
      className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-[#070d0a]"
    >
      {/* Ambient radial background glow effects */}
      <div
        className="absolute -top-24 right-0 w-[550px] h-[550px] pointer-events-none opacity-60 gold-radial-glow"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none opacity-30 gold-radial-glow"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-center">
          {/* Left Column: Headline, Value Proposition, Pricing, CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-5">
            {/* Eyebrow Badge */}
            <div
              id="hero-eyebrow-badge"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d1612] border border-[#1b3528] shadow-sm"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                PREMIUM MEN'S FRAGRANCE
              </span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-main-title"
              className="font-serif text-4xl sm:text-5xl lg:text-[62px] leading-[1.1] sm:leading-[1.12] font-bold text-[#f1f5f2] tracking-[-0.015em]"
            >
              Leave a Lasting Impression Before You Say a Word.
            </h1>

            {/* Description */}
            <p
              id="hero-subtitle"
              className="text-base sm:text-lg leading-relaxed text-[#9eaba2] max-w-xl font-normal"
            >
              Khushboo is a premium men's fragrance crafted with fresh citrus notes and a rich smoky masculine finish — designed for professionals who want to be remembered.
            </p>

            {/* Pricing Tag and Savings Badge */}
            <div
              id="hero-pricing-bar"
              className="flex items-center gap-4 py-1"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-base sm:text-lg text-[#9eaba2] line-through font-medium">
                  {PRODUCT_DETAILS.currency} {PRODUCT_DETAILS.regularPrice}
                </span>
                <span className="font-serif text-4xl sm:text-5xl font-bold text-[#f1f5f2] tracking-tight">
                  {PRODUCT_DETAILS.currency} {PRODUCT_DETAILS.discountPrice}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#d4af37] text-[#070d0a] text-xs font-bold tracking-wider uppercase shadow-sm">
                {PRODUCT_DETAILS.discountPercentage}% OFF
              </span>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-buy-now-btn"
                onClick={onOpenOrderModal}
                className="inline-flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#e5c158] text-[#070d0a] px-8 py-4 rounded-lg text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>BUY KHUSHBOO NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                id="hero-discover-notes-btn"
                href="#notes"
                className="inline-flex items-center justify-center gap-2 border border-[#1b3528] hover:border-[#d4af37] text-[#d4af37] hover:text-[#f2d982] px-6 py-4 rounded-lg text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 bg-transparent hover:bg-[#d4af37]/10"
              >
                <Droplets className="w-4 h-4" />
                <span>DISCOVER NOTES</span>
              </a>
            </div>

            {/* Trust Points Checklist */}
            <div
              id="hero-trust-points"
              className="pt-5 border-t border-[#1b3528] w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-[#9eaba2]"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1b3528] text-[#d4af37] flex items-center justify-center text-xs font-bold shrink-0">
                  <Check className="w-3 h-3 text-[#d4af37]" />
                </span>
                <span>100ml Extrait De Parfum</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1b3528] text-[#d4af37] flex items-center justify-center text-xs font-bold shrink-0">
                  <Check className="w-3 h-3 text-[#d4af37]" />
                </span>
                <span>100% Authentic &amp; Sealed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1b3528] text-[#d4af37] flex items-center justify-center text-xs font-bold shrink-0">
                  <Check className="w-3 h-3 text-[#d4af37]" />
                </span>
                <span>Free Delivery Until 15 Sep</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Flacon Showcase with Glow */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div
              id="hero-bottle-card"
              className="relative w-full max-w-lg aspect-square rounded-2xl p-2.5 bg-gradient-to-b from-[#0d1612] to-[#070d0a] border border-[#1b3528] gold-glow-subtle overflow-hidden group shadow-2xl"
            >
              <img
                src={ASSETS.heroBottle}
                alt="Khushboo 100ml Extrait De Parfum Flacon"
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Bottom Glass Overlay Tag */}
              <div className="absolute bottom-5 left-5 right-5 bg-[#070d0a]/85 backdrop-blur-md border border-[#1b3528] px-4 py-3 rounded-xl flex items-center justify-between shadow-lg">
                <div>
                  <p className="font-serif text-sm font-bold text-[#f1f5f2] tracking-wider">
                    KHUSHBOO EXTRAIT DE PARFUM
                  </p>
                  <p className="text-xs text-[#9eaba2] tracking-wide">
                    Pure Concentration • 100ML / 3.4 FL.OZ
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1b3528]/80 border border-[#d4af37]/40 text-[10px] uppercase font-bold text-[#d4af37] tracking-widest">
                  <ShieldCheck className="w-3 h-3" />
                  <span>SEALED BATCH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
