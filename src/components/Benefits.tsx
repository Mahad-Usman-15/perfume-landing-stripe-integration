import React from 'react';
import { Clock, Gem, CloudSun, BadgePercent } from 'lucide-react';
import { BENEFITS } from '../data/fragranceData';

export const Benefits: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'b1':
        return <Clock className="w-6 h-6" />;
      case 'b2':
        return <Gem className="w-6 h-6" />;
      case 'b3':
        return <CloudSun className="w-6 h-6" />;
      case 'b4':
        return <BadgePercent className="w-6 h-6" />;
      default:
        return <Gem className="w-6 h-6" />;
    }
  };

  return (
    <section
      id="distinction"
      className="py-16 md:py-28 bg-[#070d0a] border-y border-[#1b3528]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            id="benefits-eyebrow"
            className="text-xs font-bold text-[#d4af37] tracking-[0.25em] uppercase block"
          >
            THE DISTINCTION
          </span>
          <h2
            id="benefits-title"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f1f5f2] font-bold mt-2 tracking-tight"
          >
            Why Choose Khushboo?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, idx) => (
            <div
              key={benefit.id}
              id={`benefit-card-${idx}`}
              className="bg-[#0d1612] border border-[#1b3528] hover:border-[#d4af37] p-6 md:p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between group luxury-card-shadow hover:bg-[#14221c]"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#070d0a] border border-[#1b3528] flex items-center justify-center text-[#d4af37] mb-6 group-hover:bg-[#d4af37] group-hover:text-[#070d0a] group-hover:scale-105 transition-all shadow-sm">
                  {getIcon(benefit.id)}
                </div>

                <h3 className="text-lg font-bold text-[#f1f5f2] mb-3 group-hover:text-[#d4af37] transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-sm text-[#9eaba2] leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#1b3528]/50 flex items-center justify-between text-[11px] text-[#9eaba2] uppercase tracking-wider">
                <span>Khushboo Reserve</span>
                <span className="text-[#d4af37]">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
