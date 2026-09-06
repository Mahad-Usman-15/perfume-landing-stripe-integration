import React from 'react';
import { CustomerDetails } from '../../types/checkout';

interface CustomerDetailsFormProps {
  formData: CustomerDetails;
  onChange: (field: keyof CustomerDetails, value: string) => void;
  errors: Partial<Record<keyof CustomerDetails, string>>;
  touched: Partial<Record<keyof CustomerDetails, boolean>>;
  onBlur: (field: keyof CustomerDetails) => void;
}

export const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({
  formData,
  onChange,
  errors,
  touched,
  onBlur
}) => {
  return (
    <section className="bg-[#0a120e] border border-[#1b3528] rounded-2xl p-5 sm:p-7 shadow-xl">
      <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-[#1b3528]/80 mb-5 sm:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-serif font-bold text-sm">
            1
          </div>
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#f1f5f2] tracking-wide">
              Customer & Delivery Details
            </h2>
            <p className="text-xs text-[#9eaba2] mt-0.5">
              Enter your shipping destination across Pakistan
            </p>
          </div>
        </div>
        <div className="hidden sm:block text-xs text-[#9eaba2]">
          <span>Pakistan Express Delivery</span>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9eaba2] mb-1.5">
            Full Name <span className="text-[#d4af37]">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            id="checkout-fullname"
            placeholder="e.g. Usman Malik"
            value={formData.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            onBlur={() => onBlur('fullName')}
            className={`w-full bg-[#050907] border rounded-xl px-4 py-2.5 sm:py-3 text-sm text-[#f1f5f2] placeholder-[#9eaba2]/40 transition-colors focus:outline-none focus:ring-1 ${
              touched.fullName && errors.fullName
                ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/30'
                : 'border-[#1b3528] focus:border-[#d4af37] focus:ring-[#d4af37]/30 hover:border-[#274837]'
            }`}
          />
          {touched.fullName && errors.fullName && (
            <p className="text-xs text-rose-400 mt-1.5 pl-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email & Phone grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9eaba2] mb-1.5">
              Email Address <span className="text-[#d4af37]">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="checkout-email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              onBlur={() => onBlur('email')}
              className={`w-full bg-[#050907] border rounded-xl px-4 py-2.5 sm:py-3 text-sm text-[#f1f5f2] placeholder-[#9eaba2]/40 transition-colors focus:outline-none focus:ring-1 ${
                touched.email && errors.email
                  ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/30'
                  : 'border-[#1b3528] focus:border-[#d4af37] focus:ring-[#d4af37]/30 hover:border-[#274837]'
              }`}
            />
            {touched.email && errors.email ? (
              <p className="text-xs text-rose-400 mt-1.5 pl-1">{errors.email}</p>
            ) : (
              <p className="text-[11px] text-[#9eaba2]/70 mt-1 pl-1">For order confirmation & tracking</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9eaba2] mb-1.5">
              Phone Number <span className="text-[#d4af37]">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="checkout-phone"
              placeholder="0300 1234567"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              onBlur={() => onBlur('phone')}
              className={`w-full bg-[#050907] border rounded-xl px-4 py-2.5 sm:py-3 text-sm text-[#f1f5f2] placeholder-[#9eaba2]/40 transition-colors focus:outline-none focus:ring-1 ${
                touched.phone && errors.phone
                  ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/30'
                  : 'border-[#1b3528] focus:border-[#d4af37] focus:ring-[#d4af37]/30 hover:border-[#274837]'
              }`}
            />
            {touched.phone && errors.phone ? (
              <p className="text-xs text-rose-400 mt-1.5 pl-1">{errors.phone}</p>
            ) : (
              <p className="text-[11px] text-[#9eaba2]/70 mt-1 pl-1">Courier will call before delivery</p>
            )}
          </div>
        </div>

        {/* City & Address */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* City Input */}
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9eaba2] mb-1.5">
              City <span className="text-[#d4af37]">*</span>
            </label>
            <input
              type="text"
              name="city"
              id="checkout-city"
              placeholder="e.g. Lahore"
              value={formData.city}
              onChange={(e) => onChange('city', e.target.value)}
              onBlur={() => onBlur('city')}
              className={`w-full bg-[#050907] border rounded-xl px-4 py-2.5 sm:py-3 text-sm text-[#f1f5f2] placeholder-[#9eaba2]/40 transition-colors focus:outline-none focus:ring-1 ${
                touched.city && errors.city
                  ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/30'
                  : 'border-[#1b3528] focus:border-[#d4af37] focus:ring-[#d4af37]/30 hover:border-[#274837]'
              }`}
            />
            {touched.city && errors.city && (
              <p className="text-xs text-rose-400 mt-1.5 pl-1">{errors.city}</p>
            )}
          </div>

          {/* Delivery Address */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9eaba2] mb-1.5">
              Street / House Address <span className="text-[#d4af37]">*</span>
            </label>
            <input
              type="text"
              name="address"
              id="checkout-address"
              placeholder="House / Flat #, Street name, Sector / Area"
              value={formData.address}
              onChange={(e) => onChange('address', e.target.value)}
              onBlur={() => onBlur('address')}
              className={`w-full bg-[#050907] border rounded-xl px-4 py-2.5 sm:py-3 text-sm text-[#f1f5f2] placeholder-[#9eaba2]/40 transition-colors focus:outline-none focus:ring-1 ${
                touched.address && errors.address
                  ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/30'
                  : 'border-[#1b3528] focus:border-[#d4af37] focus:ring-[#d4af37]/30 hover:border-[#274837]'
              }`}
            />
            {touched.address && errors.address && (
              <p className="text-xs text-rose-400 mt-1.5 pl-1">{errors.address}</p>
            )}
          </div>
        </div>

        {/* Optional Delivery Notes */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#9eaba2] mb-1.5">
            Special Delivery Notes <span className="text-[#9eaba2]/50 font-normal lowercase">(optional)</span>
          </label>
          <textarea
            name="notes"
            id="checkout-notes"
            rows={2}
            placeholder="e.g. Leave package with guard or call before arrival"
            value={formData.notes || ''}
            onChange={(e) => onChange('notes', e.target.value)}
            className="w-full bg-[#050907] border border-[#1b3528] rounded-xl px-4 py-2.5 text-sm text-[#f1f5f2] placeholder-[#9eaba2]/40 transition-colors focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 hover:border-[#274837]"
          />
        </div>
      </div>
    </section>
  );
};
