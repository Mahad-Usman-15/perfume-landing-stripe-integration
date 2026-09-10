import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Elements } from '@stripe/react-stripe-js';
import type { StripeElementsOptions } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import { PRODUCT, createPaymentIntentRequestSchema, type CreatePaymentIntentResponse } from '../../../shared/checkout';
import type { CheckoutItem, CheckoutSummary, CustomerDetails, PaymentReceipt } from '../../types/checkout';
import { PRODUCT_DETAILS, ASSETS } from '../../data/fragranceData';
import { CheckoutHeader } from './CheckoutHeader';
import { CustomerDetailsForm } from './CustomerDetailsForm';
import { ProductSummaryCard } from './ProductSummaryCard';
import { PaymentSection } from './PaymentSection';
import { OrderConfirmationView } from './OrderConfirmationView';

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.trim();
let stripePromise: ReturnType<typeof loadStripe> | null = null;
const recoveryKey = 'khushboo-payment';
const attemptKey = 'khushboo-payment-attempt';
const attemptMaxAge = 20 * 60 * 60 * 1000;
const appearance: StripeElementsOptions['appearance'] = {
  theme: 'night',
  variables: { colorPrimary: '#d4af37', colorBackground: '#070d0a', colorText: '#f1f5f2', colorDanger: '#fb7185', fontFamily: 'Montserrat, sans-serif', borderRadius: '12px' },
  rules: { '.Input': { borderColor: '#1b3528' }, '.Input:focus': { borderColor: '#d4af37' }, '.Label': { color: '#9eaba2' } },
};

interface IntentSession { clientSecret: string; paymentIntentId: string }
interface CreationAttempt { fingerprint: string; attemptId: string; timestamp: number }

function isIntentSession(value: unknown): value is IntentSession {
  if (!value || typeof value !== 'object') return false;
  const { clientSecret, paymentIntentId } = value as IntentSession;
  return typeof paymentIntentId === 'string' && /^pi_[a-zA-Z0-9]+$/.test(paymentIntentId)
    && typeof clientSecret === 'string' && clientSecret.startsWith(`${paymentIntentId}_secret_`)
    && /^pi_[a-zA-Z0-9]+_secret_[a-zA-Z0-9]+$/.test(clientSecret);
}

export function CheckoutPage({ initialQuantity = 1, onBackToShop }: { initialQuantity?: number; onBackToShop: () => void }) {
  const navigate = useNavigate();
  const [recovery, setRecovery] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const isReturn = ['payment_intent_client_secret', 'payment_intent'].some(key => params.has(key));
    const clientSecret = params.get('payment_intent_client_secret') || '';
    const returned = { clientSecret, paymentIntentId: params.get('payment_intent') || clientSecret.split('_secret_')[0] };
    if (isReturn && isIntentSession(returned)) return { required: true, ...returned };
    try {
      const stored = JSON.parse(sessionStorage.getItem(recoveryKey) || 'null');
      if (isIntentSession(stored)) return { required: true, clientSecret: stored.clientSecret, paymentIntentId: stored.paymentIntentId };
    } catch { /* Storage may be unavailable; redirect recovery still works. */ }
    return { required: isReturn, ...returned };
  });
  const [intent, setIntent] = useState<IntentSession | null>(null);
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);
  const [canceled, setCanceled] = useState(false);
  const [quantity, setQuantity] = useState(Number.isFinite(initialQuantity) ? Math.min(10, Math.max(1, Math.trunc(initialQuantity))) : 1);
  const [formData, setFormData] = useState<CustomerDetails>({ fullName: '', email: '', phone: '', address: '', city: '', notes: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof CustomerDetails, boolean>>>({});
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [stripeReady, setStripeReady] = useState(false);
  const [invalidRecovery, setInvalidRecovery] = useState(false);
  const [storageLimited, setStorageLimited] = useState(false);
  const creating = useRef(false);
  const attempt = useRef<CreationAttempt | null>(null);
  const recoveryGuard = useRef(false);

  useEffect(() => {
    // Capture in the pure initializer, then scrub after both StrictMode initializations.
    const url = new URL(window.location.href);
    for (const key of ['payment_intent_client_secret', 'payment_intent', 'redirect_status']) url.searchParams.delete(key);
    if (url.search !== window.location.search) {
      navigate(url.pathname + url.search + url.hash, { replace: true });
    }
    try {
      if (recovery.required && isIntentSession(recovery)) {
        sessionStorage.setItem(recoveryKey, JSON.stringify({ clientSecret: recovery.clientSecret, paymentIntentId: recovery.paymentIntentId }));
      } else {
        sessionStorage.removeItem(recoveryKey);
      }
    } catch { setStorageLimited(true); }
    if (recovery.required && !isIntentSession(recovery)) {
      setInvalidRecovery(true);
      setMessage('The payment recovery data is malformed. Clear it to return to checkout.');
    }
  }, [recovery, navigate]);

  useEffect(() => {
    let active = true;
    // The preceding effect has already captured, persisted, and scrubbed return data.
    if (!stripePromise && publishableKey) stripePromise = loadStripe(publishableKey).catch(() => null);
    stripePromise?.then(stripe => {
      if (!active) return;
      setStripeReady(Boolean(stripe));
      if (!stripe) setMessage('Stripe could not load. Check the payment configuration and connection, then reload.');
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    // Retain only the payment capability, never customer data, across a refresh.
    if (!intent) return;
    try { sessionStorage.setItem(recoveryKey, JSON.stringify(intent)); } catch { setStorageLimited(true); }
  }, [intent]);

  async function recover() {
    if (recoveryGuard.current || !stripeReady || !isIntentSession(recovery)) return;
    recoveryGuard.current = true;
    setBusy(true);
    setMessage('');
    try {
      if (!recovery.clientSecret) throw new Error();
      const stripe = await stripePromise;
      if (!stripe) throw new Error();
      const result = await stripe.retrievePaymentIntent(recovery.clientSecret);
      // Other invalid_request_error responses can be configuration failures, not missing payments.
      if (result.error?.type === 'invalid_request_error' && result.error.code === 'resource_missing') {
        setInvalidRecovery(true);
        setMessage('Stripe could not find a payment for this recovery data. You can clear the invalid data and return to checkout.');
        return;
      }
      if (result.error || !result.paymentIntent || (recovery.paymentIntentId && result.paymentIntent.id !== recovery.paymentIntentId)) throw new Error();
      setInvalidRecovery(false);
      setIntent({ clientSecret: recovery.clientSecret, paymentIntentId: result.paymentIntent.id });
      if (result.paymentIntent.status === 'succeeded') {
        const { id, amount, currency } = result.paymentIntent;
        setReceipt({ id, amount, currency, status: 'succeeded' });
      }
    } catch {
      setMessage('Unable to verify this payment. Retry verification; do not start another payment while its status is unknown.');
    } finally {
      recoveryGuard.current = false;
      setBusy(false);
    }
  }

  useEffect(() => {
    if (recovery.required && stripeReady) void recover();
  }, [recovery, stripeReady]);

  async function createIntent() {
    if (creating.current || intent || recovery.required || !stripeReady) return;
    const customer = createPaymentIntentRequestSchema.shape.customer.safeParse(formData);
    const nextErrors: typeof errors = {};
    if (!customer.success) {
      for (const issue of customer.error.issues) nextErrors[issue.path[0] as keyof CustomerDetails] = issue.message;
    }
    setErrors(nextErrors);
    setTouched({ fullName: true, email: true, phone: true, address: true, city: true, notes: true });
    if (!customer.success) {
      const field = Object.keys(nextErrors)[0];
      document.getElementById(`checkout-${field === 'fullName' ? 'fullname' : field}`)?.focus();
      return;
    }
    creating.current = true;
    setBusy(true);
    setMessage('');
    try {
      const payload = { customer: customer.data, productId: PRODUCT.id, quantity };
      const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(payload)));
      const fingerprint = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
      const now = Date.now();
      try {
        let stored;
        try { stored = JSON.parse(sessionStorage.getItem(attemptKey) || 'null'); }
        catch { sessionStorage.removeItem(attemptKey); }
        if (stored && typeof stored.fingerprint === 'string' && /^[a-f0-9]{64}$/.test(stored.fingerprint) && createPaymentIntentRequestSchema.shape.attemptId.safeParse(stored.attemptId).success
          && typeof stored.timestamp === 'number' && stored.timestamp <= now && now - stored.timestamp < attemptMaxAge) {
          if (!attempt.current) attempt.current = { fingerprint: stored.fingerprint, attemptId: stored.attemptId, timestamp: stored.timestamp };
        } else sessionStorage.removeItem(attemptKey);
      } catch { setStorageLimited(true); }
      if (attempt.current?.fingerprint !== fingerprint || now - attempt.current.timestamp >= attemptMaxAge || attempt.current.timestamp > now) {
        attempt.current = { fingerprint, attemptId: crypto.randomUUID(), timestamp: now };
      }
      // Persist before the request: a lost response must not create a fresh attempt on reload.
      try { sessionStorage.setItem(attemptKey, JSON.stringify(attempt.current)); } catch { setStorageLimited(true); }
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, attemptId: attempt.current.attemptId }),
      });
      if (!response.ok) {
        setMessage(response.status === 429 ? 'Too many attempts. Wait a minute, then retry with the same details.' : 'Payment initialization failed. Your details are preserved. Retry with the same details.');
        return;
      }
      const data: CreatePaymentIntentResponse = await response.json();
      if (!isIntentSession(data) || data.currency !== PRODUCT.currency || data.quantity !== quantity || data.amount !== PRODUCT.unitAmount * quantity + PRODUCT.shippingAmount) throw new Error();
      setIntent({ clientSecret: data.clientSecret, paymentIntentId: data.paymentIntentId });
    } catch {
      setMessage('Unable to initialize payment. Your details are preserved. Retry unchanged to safely reuse this attempt.');
    } finally {
      creating.current = false;
      setBusy(false);
    }
  }

  const item: CheckoutItem = {
    productId: PRODUCT.id,
    name: PRODUCT_DETAILS.name,
    volume: PRODUCT_DETAILS.volume,
    unitPrice: PRODUCT_DETAILS.discountPrice,
    regularPrice: PRODUCT_DETAILS.regularPrice,
    quantity,
    image: ASSETS.stickyThumbnail,
  };
  const summary: CheckoutSummary = {
    subtotal: item.unitPrice * quantity,
    discount: PRODUCT_DETAILS.savings * quantity,
    shipping: PRODUCT_DETAILS.deliveryCost,
    savedShipping: PRODUCT_DETAILS.savedDelivery,
    total: item.unitPrice * quantity + PRODUCT_DETAILS.deliveryCost,
    currency: PRODUCT.currency,
  };
  const details = (
    <fieldset disabled={busy || Boolean(intent)} className="min-w-0">
      <CustomerDetailsForm
        formData={formData}
        errors={errors}
        touched={touched}
        onBlur={field => {
          setTouched(prev => ({ ...prev, [field]: true }));
          const result = createPaymentIntentRequestSchema.shape.customer.shape[field].safeParse(formData[field]);
          setErrors(prev => ({ ...prev, [field]: result.success ? undefined : result.error.issues[0]?.message }));
        }}
        onChange={(field, value) => {
          if (creating.current || intent) return;
          setFormData(prev => ({ ...prev, [field]: value }));
          setErrors(prev => ({ ...prev, [field]: undefined }));
        }}
      />
    </fieldset>
  );
  const orderSummary = (
    <fieldset disabled={busy || Boolean(intent)} className="min-w-0">
      <ProductSummaryCard item={item} summary={summary} onUpdateQuantity={value => {
        if (!creating.current && !intent) setQuantity(Math.min(10, Math.max(1, value)));
      }} />
    </fieldset>
  );
  const continueButton = (
    <button type="submit" disabled={busy || !stripeReady} className="w-full py-4 px-6 rounded-xl bg-[#d4af37] text-[#070d0a] font-bold hover:bg-[#dfba44] disabled:opacity-50 disabled:cursor-not-allowed">
      {busy ? 'Initializing Payment...' : 'Continue to Secure Payment'}
    </button>
  );
  const returnToShop = () => {
    if (canceled && !receipt) {
      try { sessionStorage.removeItem(recoveryKey); sessionStorage.removeItem(attemptKey); } catch { setStorageLimited(true); }
    }
    onBackToShop();
  };

  return (
    <div className="min-h-screen bg-[#070d0a] text-[#f1f5f2] font-sans">
      <CheckoutHeader onBackToShop={returnToShop} />
      {storageLimited && <p role="alert" className="max-w-7xl mx-auto px-4 py-4 text-rose-400">Session storage is unavailable. Payment recovery after a reload or leaving this page is not guaranteed. Keep this page open; if interrupted, verify payment status before starting again.</p>}
      {receipt ? <OrderConfirmationView receipt={receipt} onReturnToShop={returnToShop} /> : <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold">Complete Your Order</h1>
        {!publishableKey && <p role="alert" className="text-rose-400">Payment setup error: VITE_STRIPE_PUBLISHABLE_KEY is missing. Checkout is disabled until configured.</p>}
        {message && <p role="alert" className="text-rose-400">{message}</p>}
        {intent ? <Elements stripe={stripePromise} options={{ clientSecret: intent.clientSecret, appearance }}>
          <PaymentSection clientSecret={intent.clientSecret} paymentIntentId={intent.paymentIntentId} onSuccess={setReceipt} onCanceled={() => setCanceled(true)} details={recovery.required ? undefined : details} summary={recovery.required ? undefined : orderSummary} />
        </Elements> : recovery.required ? <section className="bg-[#0a120e] border border-[#1b3528] rounded-2xl p-6 space-y-4">
          <p role="status">{busy ? 'Verifying your payment with Stripe...' : 'Recover your existing payment. No new payment will be created.'}</p>
          {invalidRecovery ? <button type="button" disabled={busy} onClick={() => {
            try { sessionStorage.removeItem(recoveryKey); } catch { setStorageLimited(true); }
            setInvalidRecovery(false);
            setMessage('');
            setRecovery({ required: false, clientSecret: '', paymentIntentId: '' });
          }} className="text-[#d4af37] disabled:opacity-50">Clear Invalid Recovery Data</button> : <button type="button" disabled={busy || !stripeReady} onClick={() => void recover()} className="text-[#d4af37] disabled:opacity-50">Retry Verification</button>}
        </section> : <form noValidate onSubmit={event => { event.preventDefault(); void createIntent(); }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">{details}<p className="text-sm text-[#9eaba2]">Review your details and quantity before continuing. They cannot be edited after payment is initialized.</p><div className="lg:hidden">{continueButton}</div></div>
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">{orderSummary}<div className="hidden lg:block">{continueButton}</div></div>
        </form>}
      </main>}
    </div>
  );
}
