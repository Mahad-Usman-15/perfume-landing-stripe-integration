import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  // Optional simulated countdown to add subtle urgency
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNum = (n: number) => n.toString().padStart(2, '0');

  return (
    <aside
      id="announcement-bar"
      className="bg-[#070d0a] border-b border-[#1b3528] py-2.5 px-4 md:px-8 relative z-50 text-xs md:text-sm tracking-wide"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-center">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[11px] font-bold text-[#d4af37] uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping"></span>
          EXCLUSIVE PREVIEW
        </span>

        <p className="text-[#f1f5f2] font-medium tracking-wide">
          Launch Offer: Get Khushboo 100ml at <span className="text-[#d4af37] font-semibold">25% OFF</span> + Free Delivery Until 15 September
        </p>

        <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#9eaba2] bg-[#0d1612] px-2 py-0.5 rounded border border-[#1b3528]">
          <Clock className="w-3 h-3 text-[#d4af37]" />
          <span>Offer Ends In:</span>
          <span className="font-mono text-[#f1f5f2] font-semibold">
            {formatNum(timeLeft.hours)}:{formatNum(timeLeft.minutes)}:{formatNum(timeLeft.seconds)}
          </span>
        </div>
      </div>
    </aside>
  );
};
