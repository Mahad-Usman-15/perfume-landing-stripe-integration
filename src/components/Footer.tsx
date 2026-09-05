import React from 'react';
import { ASSETS } from '../data/fragranceData';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      id="main-footer"
      className="bg-[#050907] border-t border-[#1b3528] pt-16 pb-28 md:pb-20 text-[#9eaba2]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#1b3528]">
          {/* Brand Details */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 overflow-hidden rounded-xl border border-[#1b3528] p-1 bg-[#070d0a] shrink-0">
              <img
                src={ASSETS.footerLogo}
                alt="Khushboo Luxury Crest"
                className="w-full h-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-serif text-2xl tracking-[0.2em] text-[#d4af37] font-bold block">
                KHUSHBOO
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#9eaba2] block -mt-0.5 font-medium">
                THE SIGNATURE OF PRESENCE
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs tracking-wider uppercase">
            <a href="#hero" className="hover:text-[#d4af37] transition-colors">
              The Fragrance
            </a>
            <a href="#notes" className="hover:text-[#d4af37] transition-colors">
              Olfactory Pyramid
            </a>
            <a href="#heritage" className="hover:text-[#d4af37] transition-colors">
              Executive Heritage
            </a>
            <a href="#testimonials" className="hover:text-[#d4af37] transition-colors">
              Client Reviews
            </a>
            <a href="#faq" className="hover:text-[#d4af37] transition-colors">
              FAQ
            </a>
          </div>
        </div>

        {/* Brand statement & authenticity notice */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-[#9eaba2]/80">
          <p className="max-w-xl leading-relaxed">
            Khushboo Extrait De Parfum is masterfully formulated using high-density fragrance oils. Crafted for all-day projection and presence across climate variations.
          </p>

          <div className="flex items-center gap-2 text-xs text-[#d4af37]">
            <ShieldCheck className="w-4 h-4" />
            <span>Guaranteed Authentic Batch • 100% Quality Sealed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
