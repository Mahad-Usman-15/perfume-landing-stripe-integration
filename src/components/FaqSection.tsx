import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/fragranceData';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq1']);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="faq"
      className="py-16 md:py-28 bg-[#070d0a] border-t border-[#1b3528]"
    >
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span
            id="faq-eyebrow"
            className="text-xs font-bold text-[#d4af37] tracking-[0.25em] uppercase block"
          >
            CONCIERGE CLARITY
          </span>
          <h2
            id="faq-title"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f1f5f2] font-bold mt-2 tracking-tight"
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                id={`faq-item-${idx}`}
                className={`bg-[#0d1612] border rounded-2xl p-5 md:p-6 transition-all duration-300 ${
                  isOpen ? 'border-[#d4af37]/60 bg-[#14221c]' : 'border-[#1b3528] hover:border-[#d4af37]/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between text-left cursor-pointer focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-semibold text-[#f1f5f2] pr-4 flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-[#1b3528] bg-[#070d0a] flex items-center justify-center shrink-0 text-[#d4af37] transition-transform duration-300 ${isOpen ? 'rotate-180 border-[#d4af37]' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-[#1b3528] text-sm md:text-base text-[#9eaba2] leading-relaxed animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
