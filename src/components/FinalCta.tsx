import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ASSETS } from '../data/fragranceData';

interface FinalCtaProps {
  onOpenOrderModal: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenOrderModal }) => {
  return (
    <section
      id="final-cta"
      className="relative py-24 md:py-36 overflow-hidden bg-[#070d0a] border-t border-[#1b3528]"
    >
      {/* Background visual artwork with rich gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.finalAtmosphere}
          alt="Khushboo Luxury Perfumery Atelier"
          className="w-full h-full object-cover object-center filter brightness-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070d0a] via-[#070d0a]/70 to-[#070d0a]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 space-y-6">
        <span
          id="final-cta-eyebrow"
          className="text-xs font-bold text-[#d4af37] tracking-[0.25em] uppercase block inline-flex items-center px-3.5 py-1 rounded-full bg-[#070d0a]/80 border border-[#d4af37]/40 backdrop-blur-sm"
        >
          <span>THE DECISION</span>
        </span>

        <h2
          id="final-cta-title"
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#f1f5f2] font-bold tracking-tight"
        >
          Your Signature Scent Awaits.
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-[#9eaba2] max-w-2xl mx-auto font-light leading-relaxed">
          Step into every room with confidence and leave a memorable impression.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="final-cta-buy-btn"
            onClick={onOpenOrderModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#e5c158] text-[#070d0a] px-5 py-5 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-all duration-300 shadow-[0_4px_30px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>BUY KHUSHBOO NOW — RS. 2000</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Value Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-[#f1f5f2]">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#d4af37] text-[#070d0a] flex items-center justify-center font-bold text-xs shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span>25% Off Launch Price</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#d4af37] text-[#070d0a] flex items-center justify-center font-bold text-xs shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span>Free Courier Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#d4af37] text-[#070d0a] flex items-center justify-center font-bold text-xs shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span>100% Authentic Batch</span>
          </div>
        </div>
      </div>
    </section>
  );
};
