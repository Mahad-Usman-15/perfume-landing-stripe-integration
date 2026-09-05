import React from 'react';
import { Building2, Moon, ArrowRight, Shield } from 'lucide-react';
import { ASSETS } from '../data/fragranceData';

interface LifestyleProps {
  onOpenOrderModal: () => void;
}

export const Lifestyle: React.FC<LifestyleProps> = ({ onOpenOrderModal }) => {
  return (
    <section
      id="lifestyle"
      className="py-16 md:py-28 bg-[#070d0a] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Cinematic Lifestyle Imagery */}
          <div className="lg:col-span-7 relative">
            <div
              id="lifestyle-image-card"
              className="relative rounded-2xl overflow-hidden border border-[#1b3528] gold-glow-subtle aspect-[4/3] bg-[#0d1612] group shadow-2xl"
            >
              <img
                src={ASSETS.lifestyleExecutive}
                alt="Executive wearing Khushboo overlooking the city skyline"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070d0a]/50 via-transparent to-transparent pointer-events-none" />

              {/* Discreet badge */}
              <div className="absolute bottom-4 left-4 bg-[#070d0a]/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#1b3528] text-xs text-[#d4af37] font-medium flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Executive Series</span>
              </div>
            </div>
          </div>

          {/* Right Column: Executive Narrative & Contexts */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            <span
              id="lifestyle-eyebrow"
              className="text-xs font-bold text-[#d4af37] tracking-[0.25em] uppercase block"
            >
              EXECUTIVE CONFIDENCE
            </span>

            <h2
              id="lifestyle-title"
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f1f5f2] font-bold leading-tight"
            >
              Designed For Men Who Lead
            </h2>

            <p className="text-base sm:text-lg text-[#9eaba2] leading-relaxed">
              Whether it is a business meeting, a presentation, or an important evening — Khushboo completes your presence.
            </p>

            <div className="space-y-4 pt-1 w-full">
              {/* Context 1 */}
              <div
                id="lifestyle-boardroom-card"
                className="flex items-start gap-4 p-4 rounded-xl bg-[#0d1612] border border-[#1b3528] hover:border-[#d4af37]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#070d0a] border border-[#1b3528] flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f1f5f2] mb-1">
                    Boardrooms &amp; Closings
                  </h4>
                  <p className="text-xs sm:text-sm text-[#9eaba2] leading-relaxed">
                    Inconspicuous authority that demands respect without overpowering the room.
                  </p>
                </div>
              </div>

              {/* Context 2 */}
              <div
                id="lifestyle-evenings-card"
                className="flex items-start gap-4 p-4 rounded-xl bg-[#0d1612] border border-[#1b3528] hover:border-[#d4af37]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#070d0a] border border-[#1b3528] flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f1f5f2] mb-1">
                    Upscale Evenings
                  </h4>
                  <p className="text-xs sm:text-sm text-[#9eaba2] leading-relaxed">
                    Rich warm amber and tobacco trails that invite closer conversation.
                  </p>
                </div>
              </div>
            </div>

            <button
              id="claim-signature-btn"
              onClick={onOpenOrderModal}
              className="inline-flex items-center gap-2 text-[#d4af37] hover:text-[#f2d982] text-xs font-bold tracking-[0.15em] uppercase pt-2 transition-colors cursor-pointer group"
            >
              <span>CLAIM YOUR SIGNATURE FLACON</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
