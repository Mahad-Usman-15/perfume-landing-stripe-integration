import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { ASSETS, PRODUCT_DETAILS } from '../data/fragranceData';

interface StickyBottomBarProps {
  onOpenOrderModal: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({ onOpenOrderModal }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past 350px
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside
      id="sticky-conversion-bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#070d0a]/95 backdrop-blur-md border-t border-[#1b3528] py-2 sm:py-2.5 px-3 sm:px-4 md:px-8 shadow-2xl transition-all duration-300 animate-slideUp"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        {/* Left item details */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg overflow-hidden border border-[#1b3528] shrink-0 bg-[#0d1612]">
            <img
              src={ASSETS.stickyThumbnail}
              alt="Khushboo 100ml Flacon Thumbnail"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-serif font-bold text-xs lg:text-sm text-[#f1f5f2] tracking-wider">
                KHUSHBOO 100ml
              </span>
              <span className="bg-[#d4af37] text-[#070d0a] text-[9px] lg:text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">
                25% OFF
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] lg:text-xs text-[#9eaba2] mt-0.5">
              <span className="line-through">{PRODUCT_DETAILS.currency} {PRODUCT_DETAILS.regularPrice}</span>
              <span className="font-bold text-[#d4af37] text-xs lg:text-sm">
                {PRODUCT_DETAILS.currency} {PRODUCT_DETAILS.discountPrice}
              </span>
              <span className="hidden sm:inline text-[10px] lg:text-[11px] text-[#9eaba2]">
                • Free Delivery Till {PRODUCT_DETAILS.offerExpiry}
              </span>
            </div>
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#9eaba2] bg-[#0d1612] px-3 py-1.5 rounded-lg border border-[#1b3528]">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>100% Authentic &amp; Sealed</span>
          </div>

          <button
            id="sticky-bar-order-btn"
            onClick={onOpenOrderModal}
            className="bg-[#d4af37] hover:bg-[#e5c158] text-[#070d0a] px-3.5 sm:px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg text-[10px] sm:text-[11px] lg:text-xs font-bold tracking-wider sm:tracking-widest uppercase transition-all duration-200 shadow-md hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] active:scale-95 cursor-pointer flex items-center gap-1 sm:gap-1.5 shrink-0"
          >
            <span>ORDER NOW</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
