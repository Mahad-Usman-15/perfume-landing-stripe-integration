import React, { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { CustomerDetailsForm } from './CustomerDetailsForm';
import { ProductSummaryCard } from './ProductSummaryCard';
import { PaymentSection } from './PaymentSection';
import { TrustIndicators } from './TrustIndicators';
import { OrderConfirmationView } from './OrderConfirmationView';
import {
  CustomerDetails,
  CheckoutItem,
  CheckoutSummary,
  PaymentMethodType,
  CardPlaceholderData,
  CheckoutPayload,
  PlacedOrderConfirmation
} from '../../types/checkout';
import { PRODUCT_DETAILS, ASSETS } from '../../data/fragranceData';
import { Loader2 } from 'lucide-react';

interface CheckoutPageProps {
  initialQuantity?: number;
  onBackToShop: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  initialQuantity = 1,
  onBackToShop
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  // Customer details form state
  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof CustomerDetails, boolean>>>({});

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('stripe_card');
  const [cardData, setCardData] = useState<CardPlaceholderData>({
    cardNumber: '',
    expiry: '',
    cvc: '',
    nameOnCard: ''
  });

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrderConfirmation | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [confirmedOrder]);

  // Handle Form change
  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for that field if present
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof CustomerDetails) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field] || '');
  };

  const handleCardDataChange = (field: keyof CardPlaceholderData, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  // Validation logic
  const validateField = (field: keyof CustomerDetails, value: string): string | undefined => {
    let errorMsg: string | undefined;

    switch (field) {
      case 'fullName':
        if (!value.trim()) {
          errorMsg = 'Full name is required';
        } else if (value.trim().length < 3) {
          errorMsg = 'Please enter at least 3 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          errorMsg = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          errorMsg = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          errorMsg = 'Phone number is required';
        } else if (value.replace(/\D/g, '').length < 10) {
          errorMsg = 'Please enter a valid 11-digit mobile number';
        }
        break;
      case 'city':
        if (!value.trim()) {
          errorMsg = 'City is required';
        } else if (value.trim().length < 2) {
          errorMsg = 'Please enter a valid city name';
        }
        break;
      case 'address':
        if (!value.trim()) {
          errorMsg = 'Delivery street address is required';
        } else if (value.trim().length < 6) {
          errorMsg = 'Please enter a complete address';
        }
        break;
      default:
        break;
    }

    if (errorMsg) {
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    return errorMsg;
  };

  const validateAll = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerDetails, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (formData.fullName.trim().length < 3) newErrors.fullName = 'Please enter your full name';

    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 11-digit mobile number';
    }

    if (!formData.city.trim()) newErrors.city = 'City is required';
    else if (formData.city.trim().length < 2) newErrors.city = 'Please enter a valid city name';
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
    else if (formData.address.trim().length < 6) newErrors.address = 'Please enter your complete address';

    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      city: true,
      address: true
    });

    return Object.keys(newErrors).length === 0;
  };

  // Build items and summary models
  const checkoutItem: CheckoutItem = {
    productId: 'khushboo-100ml-edp',
    name: PRODUCT_DETAILS.name,
    volume: PRODUCT_DETAILS.volume,
    unitPrice: PRODUCT_DETAILS.discountPrice,
    regularPrice: PRODUCT_DETAILS.regularPrice,
    quantity,
    image: ASSETS.stickyThumbnail
  };

  const unitSavings = PRODUCT_DETAILS.regularPrice - PRODUCT_DETAILS.discountPrice;
  const summary: CheckoutSummary = {
    subtotal: PRODUCT_DETAILS.discountPrice * quantity,
    discount: unitSavings * quantity,
    shipping: 0,
    savedShipping: 250,
    total: PRODUCT_DETAILS.discountPrice * quantity,
    currency: 'PKR'
  };

  // Mock Submission Handler (Phase 1)
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateAll();
    if (!isValid) {
      // Smooth scroll to top of customer form
      const el = document.getElementById('checkout-fullname');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
      return;
    }

    setIsSubmitting(true);

    // Prepare structured checkout data ready for Phase 2 Stripe backend API
    const structuredPayload: CheckoutPayload = {
      customer: {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        notes: formData.notes?.trim() || undefined
      },
      items: [checkoutItem],
      summary,
      paymentMethod,
      cardPlaceholder: paymentMethod === 'stripe_card' ? cardData : undefined,
      clientMetadata: {
        source: 'khushboo_web_checkout_phase_1',
        locale: 'en-PK',
        currency: 'PKR',
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined
      },
      status: 'succeeded',
      createdAt: new Date().toISOString()
    };

    console.log('[Khushboo Phase 1] Structured Checkout Data Generated (Stripe Ready):', structuredPayload);

    // Simulate network processing
    setTimeout(() => {
      const generatedOrderId = `KB-PK-${Math.floor(10000 + Math.random() * 90000)}`;
      const confirmation: PlacedOrderConfirmation = {
        orderId: generatedOrderId,
        createdAt: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        estimatedDelivery: '2 - 4 Business Days',
        payload: structuredPayload
      };

      setConfirmedOrder(confirmation);
      setIsSubmitting(false);
    }, 1200);
  };

  // If order is placed, show confirmation
  if (confirmedOrder) {
    return (
      <div className="min-h-screen bg-[#070d0a] text-[#f1f5f2] flex flex-col font-sans">
        <CheckoutHeader onBackToShop={onBackToShop} />
        <main className="flex-1">
          <OrderConfirmationView
            order={confirmedOrder}
            onReturnToShop={onBackToShop}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070d0a] text-[#f1f5f2] selection:bg-[#d4af37] selection:text-[#070d0a] flex flex-col font-sans">
      {/* Secure Header */}
      <CheckoutHeader onBackToShop={onBackToShop} />

      {/* Main Checkout Viewport */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="mb-6 sm:mb-8">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#d4af37] font-semibold block">
            Express Luxury Dispatch
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f1f5f2] tracking-wide mt-1">
            Complete Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[#9eaba2] mt-1.5">
            Complimentary doorstep delivery across Pakistan • Inspect before accepting
          </p>
        </div>

        {/* Responsive Grid: Form on Left, Summary on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column (7 cols): Customer Info + Payment Method */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <CustomerDetailsForm
              formData={formData}
              onChange={handleInputChange}
              errors={errors}
              touched={touched}
              onBlur={handleBlur}
            />

            <PaymentSection
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              cardData={cardData}
              onCardDataChange={handleCardDataChange}
            />

            {/* Mobile Placement for Order CTA */}
            <div className="lg:hidden pt-2 space-y-3">
              <button
                type="button"
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-[#d4af37] text-[#070d0a] font-bold text-base hover:bg-[#dfba44] transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/20 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Secure Order...</span>
                  </>
                ) : (
                  <span>Complete Order • Rs. {summary.total.toLocaleString()}</span>
                )}
              </button>
              <div className="text-center text-[11px] text-[#9eaba2]">
                <span>Zero Risk • Free Delivery • Sealed Batch Guarantee</span>
              </div>
            </div>

            {/* Trust Assurance Section */}
            <TrustIndicators />
          </div>

          {/* Right Column (5 cols): Order Summary & CTA */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            <ProductSummaryCard
              item={checkoutItem}
              onUpdateQuantity={(newQty) => setQuantity(newQty)}
              summary={summary}
            />

            {/* Desktop Placement for Order CTA */}
            <div className="hidden lg:block space-y-3">
              <button
                type="button"
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-[#d4af37] text-[#070d0a] font-bold text-base hover:bg-[#dfba44] hover:shadow-2xl hover:shadow-[#d4af37]/30 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/20 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Securing Order Details...</span>
                  </>
                ) : (
                  <span>Complete Order • Rs. {summary.total.toLocaleString()}</span>
                )}
              </button>
              <div className="text-center text-xs text-[#9eaba2]">
                <span>Instant dispatch confirmation via SMS & Email</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Minimalist */}
      <footer className="border-t border-[#1b3528]/80 py-6 text-center text-xs text-[#9eaba2] bg-[#050907]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} KHUSHBOO Fragrance Pakistan. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Safe & Secure Checkout</span>
            <span>•</span>
            <span>Authentic Batch Guarantee</span>
            <span>•</span>
            <span>Nationwide Express Delivery</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
