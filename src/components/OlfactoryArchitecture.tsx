import React, { useState } from 'react';
import { Clock, Compass, Layers } from 'lucide-react';
import { ASSETS, OLFACTORY_STAGES } from '../data/fragranceData';

export const OlfactoryArchitecture: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <section
      id="notes"
      className="py-16 md:py-28 bg-[#070d0a] border-y border-[#1b3528] relative"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            id="notes-eyebrow"
            className="text-xs font-bold text-[#d4af37] tracking-[0.25em] uppercase block"
          >
            THE OLFACTORY ARCHITECTURE
          </span>
          <h2
            id="notes-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f1f5f2] font-bold mt-2 tracking-tight"
          >
            A Signature Scent With A Powerful Journey
          </h2>
          <p className="text-base sm:text-lg text-[#9eaba2] mt-4 font-normal leading-relaxed">
            Engineered as a high-density Extrait de Parfum to develop purposefully across your skin throughout 14+ hours.
          </p>
        </div>

        {/* Bento-style 3 Progression Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {OLFACTORY_STAGES.map((stage, idx) => {
            const isHeart = idx === 1;
            const isSelected = activeStage === idx;

            return (
              <div
                key={stage.stage}
                id={`olfactory-stage-card-${idx}`}
                onMouseEnter={() => setActiveStage(idx)}
                onMouseLeave={() => setActiveStage(null)}
                className={`bg-[#0d1612] rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 luxury-card-shadow relative overflow-hidden border ${
                  isHeart
                    ? 'border-[#d4af37]/60 shadow-[0_0_25px_rgba(212,175,55,0.15)]'
                    : 'border-[#1b3528] hover:border-[#d4af37]/60'
                } ${isSelected ? 'scale-[1.02] bg-[#14221c]' : ''}`}
              >
                {/* Radial glow for heart notes */}
                {isHeart && (
                  <div className="absolute top-0 right-0 w-32 h-32 gold-radial-glow pointer-events-none opacity-80" />
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.18em] text-[#d4af37] uppercase flex items-center gap-1.5">
                      <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                      {stage.stage}
                    </span>
                    <span className="text-[10px] sm:text-xs text-[#9eaba2] flex items-center gap-1 bg-[#070d0a] px-2 py-0.5 rounded border border-[#1b3528] shrink-0">
                      <Clock className="w-3 h-3 text-[#d4af37] shrink-0" />
                      {stage.hours}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#f1f5f2] font-semibold mb-2">
                    {stage.title}
                  </h3>

                  <p className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-4 leading-relaxed">
                    {stage.ingredients}
                  </p>

                  <p className="text-sm leading-relaxed text-[#9eaba2]">
                    {stage.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#1b3528] flex items-center justify-between gap-4 sm:gap-6 text-[10px] sm:text-xs text-[#9eaba2]">
                  <span className="flex items-center gap-1 font-medium min-w-0">
                    <Compass className="w-3 h-3 text-[#d4af37] shrink-0" />
                    <span className="truncate">Projection: <strong className="text-[#f1f5f2] font-semibold">{stage.projection}</strong></span>
                  </span>
                  <span className="shrink-0 text-right">
                    {stage.originOrCharacter.label}:{' '}
                    <strong className="text-[#d4af37] font-semibold">{stage.originOrCharacter.value}</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Accord Cards Split (Opening Accord & Drydown Accord) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Fresh Opening Accord */}
          <div
            id="opening-accord-card"
            className="bg-[#0d1612] border border-[#1b3528] rounded-2xl overflow-hidden group transition-all duration-300 hover:border-[#d4af37] luxury-card-shadow"
          >
            <div className="aspect-[16/10] overflow-hidden relative bg-[#070d0a]">
              <img
                src={ASSETS.openingCitrus}
                alt="Fresh Citrus and Fruit Notes of Khushboo"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1612] via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="p-6 md:p-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                THE OPENING ACCORD
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#f1f5f2] font-semibold mt-1 mb-3">
                The First Impression
              </h3>
              <p className="text-sm md:text-base text-[#9eaba2] leading-relaxed">
                Fresh citrus notes create an immediate feeling of confidence and energy. Designed for men who want to stand out from the first moment.
              </p>
            </div>
          </div>

          {/* Card 2: Smoky Drydown Accord */}
          <div
            id="drydown-accord-card"
            className="bg-[#0d1612] border border-[#1b3528] rounded-2xl overflow-hidden group transition-all duration-300 hover:border-[#d4af37] luxury-card-shadow"
          >
            <div className="aspect-[16/10] overflow-hidden relative bg-[#070d0a]">
              <img
                src={ASSETS.drydownWood}
                alt="Smoky Base Tobacco and Sandalwood Accords"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1612] via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="p-6 md:p-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                THE DRYDOWN ACCORD
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#f1f5f2] font-semibold mt-1 mb-3">
                The Memory You Leave Behind
              </h3>
              <p className="text-sm md:text-base text-[#9eaba2] leading-relaxed">
                Rich tobacco, sandalwood, and musk create a deep masculine signature that people remember long after you have departed the room.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
