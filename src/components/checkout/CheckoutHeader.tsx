import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ASSETS } from '../../data/fragranceData';

interface CheckoutHeaderProps {
  onBackToShop: () => void;
}

export const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({ onBackToShop }) => {
  return (
    <header className="border-b border-[#1b3528] bg-[#050907]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between">
        {/* Start (Left): Khushboo Logo & Title */}
        <div
          onClick={onBackToShop}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[#1b3528] p-1 bg-[#070d0a] flex items-center justify-center transition-colors group-hover:border-[#d4af37]/60">
            <img
              src={ASSETS.logo}
              alt="Khushboo Fragrance Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.25em] text-base sm:text-lg font-bold text-[#f1f5f2] leading-none group-hover:text-[#d4af37] transition-colors">
              KHUSHBOO
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#9eaba2] font-medium mt-0.5">
              Secure Checkout
            </span>
          </div>
        </div>

        {/* End (Right): Back to Store navigation button */}
        <button
          onClick={onBackToShop}
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#9eaba2] hover:text-[#d4af37] transition-all py-1.5 px-3 rounded-lg border border-[#1b3528] bg-[#0c1510] hover:bg-[#101c15] hover:border-[#d4af37]/40 cursor-pointer shadow-sm"
          title="Return to store"
        >
          <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
          <span className="hidden sm:inline font-medium">Back to Store</span>
          <span className="sm:hidden font-medium">Back</span>
        </button>
      </div>
    </header>
  );
};

