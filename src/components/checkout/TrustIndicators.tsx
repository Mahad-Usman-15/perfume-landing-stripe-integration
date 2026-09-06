import React from 'react';
import { ShieldCheck, Lock, Truck, RefreshCw } from 'lucide-react';

export const TrustIndicators: React.FC = () => {
  const guarantees = [
    {
      icon: <Lock className="w-4 h-4 text-[#d4af37]" />,
      title: '100% Safe & Secure Checkout',
      desc: 'Your payment details are strictly protected with bank-grade safety'
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#d4af37]" />,
      title: '100% Authentic Formula',
      desc: 'Direct from the perfumery with holographic tamper-proof seal'
    },
    {
      icon: <Truck className="w-4 h-4 text-[#d4af37]" />,
      title: 'Nationwide Express Shipping',
      desc: 'Delivered in 2-4 business days anywhere in Pakistan'
    },
    {
      icon: <RefreshCw className="w-4 h-4 text-[#d4af37]" />,
      title: 'Hassle-Free Support',
      desc: 'Direct WhatsApp and courier tracking support on every parcel'
    }
  ];

  return (
    <div className="bg-[#0a120e] border border-[#1b3528] rounded-2xl p-5 sm:p-6 shadow-xl">
      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9eaba2] mb-4">
        The Khushboo Assurance
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {guarantees.map((g, idx) => (
          <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-[#050907] border border-[#1b3528]/60">
            <div className="w-8 h-8 rounded-lg bg-[#0c1510] border border-[#1b3528] flex items-center justify-center shrink-0">
              {g.icon}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#f1f5f2]">{g.title}</p>
              <p className="text-[11px] text-[#9eaba2]/80 mt-0.5 leading-snug">{g.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
