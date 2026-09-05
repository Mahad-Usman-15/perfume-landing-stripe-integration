import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/fragranceData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Compute number of cards visible based on viewport width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - visibleCount);

  // Adjust currentIndex if viewport changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, Math.max(0, TESTIMONIALS.length - visibleCount)));
  }, [visibleCount]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-change carousel timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4200);

    return () => clearInterval(timer);
  }, [maxIndex, isPaused]);

  // Touch gestures for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="testimonials"
      className="py-16 md:py-28 bg-[#070d0a] border-t border-[#1b3528] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header & Desktop/Tablet Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 sm:mb-16 gap-6">
          <div className="text-center sm:text-left">
            <span
              id="testimonials-eyebrow"
              className="text-xs font-bold text-[#d4af37] tracking-[0.25em] uppercase block"
            >
              VERIFIED EXPERIENCES
            </span>
            <h2
              id="testimonials-title"
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f1f5f2] font-bold mt-2 tracking-tight"
            >
              Real Stories From Khushboo Users
            </h2>
          </div>

          {/* Desktop & Tablet Navigation Arrows (hidden on mobile) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              id="testimonials-prev-btn"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-[#1b3528] bg-[#0d1612] text-[#9eaba2] hover:text-[#d4af37] hover:border-[#d4af37] flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="testimonials-next-btn"
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-[#1b3528] bg-[#0d1612] text-[#9eaba2] hover:text-[#d4af37] hover:border-[#d4af37] flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          id="testimonials-carousel-container"
          className="relative overflow-hidden -mx-2 sm:-mx-3"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            id="testimonials-track"
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {TESTIMONIALS.map((review, idx) => (
              <div
                key={review.id}
                id={`review-card-wrapper-${idx}`}
                className="w-full sm:w-1/2 lg:w-1/4 shrink-0 px-2 sm:px-3 flex"
              >
                <div
                  id={`review-card-${idx}`}
                  className="w-full bg-[#0d1612] border border-[#1b3528] p-6 sm:p-7 rounded-2xl flex flex-col justify-between hover:border-[#d4af37] transition-all duration-300 luxury-card-shadow group"
                >
                  <div>
                    {/* 5 Stars rating */}
                    <div className="flex text-[#d4af37] mb-4 gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#d4af37] text-[#d4af37]"
                        />
                      ))}
                    </div>

                    <p className="text-sm md:text-base text-[#f1f5f2] italic leading-relaxed mb-6 font-light">
                      "{review.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1b3528] flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-sm font-semibold text-[#f1f5f2]">
                        {review.author}
                      </p>
                      <p className="text-xs text-[#9eaba2] mt-0.5">
                        {review.role} • {review.city}
                      </p>
                    </div>

                    {review.verified && (
                      <span className="flex items-center gap-1 text-[11px] text-[#d4af37] bg-[#070d0a] px-2 py-0.5 rounded border border-[#1b3528] shrink-0">
                        <CheckCircle className="w-3 h-3 text-[#d4af37]" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
