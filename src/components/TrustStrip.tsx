import React from 'react';
import { Star, Truck, ShieldCheck, Timer } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: (
        <div className="flex text-[#d4af37] gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
          ))}
        </div>
      ),
      title: '★★★★★',
      subtitle: 'Premium Customer Reviews',
      customIcon: null
    },
    {
      customIcon: <Truck className="w-6 h-6 text-[#d4af37]" />,
      title: 'Free Delivery',
      subtitle: 'Available nationwide till Sep 15'
    },
    {
      customIcon: <ShieldCheck className="w-6 h-6 text-[#d4af37]" />,
      title: '100% Authentic',
      subtitle: 'Original batch sealed packaging'
    },
    {
      customIcon: <Timer className="w-6 h-6 text-[#d4af37]" />,
      title: 'Long Lasting',
      subtitle: 'Extrait concentration endurance'
    }
  ];

  return (
    <section
      id="trust-strip"
      className="border-y border-[#1b3528] bg-[#070d0a] py-8 md:py-10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-6">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#f1f5f2] tracking-wide">
            Loved By Men Who Value Their Presence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustItems.map((item, index) => (
            <div
              key={index}
              id={`trust-badge-${index}`}
              className="bg-[#0d1612] border border-[#1b3528] p-5 rounded-xl flex items-center gap-4 transition-all duration-300 hover:border-[#d4af37] hover:bg-[#14221c] shadow-sm group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#070d0a] border border-[#1b3528] flex items-center justify-center text-[#d4af37] shrink-0 group-hover:border-[#d4af37]/50 group-hover:scale-105 transition-all">
                {item.customIcon || (
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Star className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-base font-semibold text-[#f1f5f2] group-hover:text-[#d4af37] transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-[#9eaba2] leading-snug mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
