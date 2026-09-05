import React, { useEffect, useRef, useState } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  direction?: 'up' | 'none';
  id?: string;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  threshold = 0.08,
  rootMargin = '0px 0px -50px 0px',
  delay = 0,
  direction = 'up',
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user's motion preference
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentEl = domRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div
      id={id}
      ref={domRef}
      style={{
        transitionDuration: '900ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
      className={`transition-all duration-900 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : direction === 'up'
          ? 'opacity-0 translate-y-7'
          : 'opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};
