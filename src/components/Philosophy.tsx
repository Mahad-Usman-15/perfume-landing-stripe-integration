import React from 'react';

export const Philosophy: React.FC = () => {
  return (
    <section
      id="heritage"
      className="py-20 md:py-28 bg-[#070d0a] relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] pointer-events-none opacity-20 gold-radial-glow"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto px-4 md:px-8 text-center space-y-6 relative z-10">
        <div className="w-12 h-0.5 bg-[#d4af37] mx-auto mb-3 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />

        <span
          id="philosophy-eyebrow"
          className="text-xs font-bold text-[#d4af37] tracking-[0.25em] uppercase block"
        >
          THE PHILOSOPHY OF MEMORY
        </span>

        <h2
          id="philosophy-quote"
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f1f5f2] leading-[1.2] font-semibold italic tracking-tight"
        >
          "Your Presence Should Last Longer Than Your Conversation."
        </h2>

        <div className="max-w-2xl mx-auto space-y-4 text-[#9eaba2] text-base md:text-lg leading-relaxed font-light">
          <p>
            A fragrance is more than a scent. It is an unspoken declaration of your identity.
          </p>
          <p>
            Khushboo is designed for men who want a memorable presence throughout their day — from pivotal boardroom decisions to intimate evening engagements.
          </p>
        </div>

        <div className="pt-4 inline-block">
          <span className="font-serif text-sm tracking-[0.2em] text-[#d4af37] italic font-semibold">
            — THE EXECUTIVE DISPATCH
          </span>
        </div>
      </div>
    </section>
  );
};
