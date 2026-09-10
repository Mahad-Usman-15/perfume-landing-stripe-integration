import { useEffect, useRef, useState, type ReactNode } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import type { PaymentIntent } from '@stripe/stripe-js';
import type { PaymentReceipt } from '../../types/checkout';

export function PaymentSection({ clientSecret, paymentIntentId, onSuccess, onCanceled, details, summary }: {
  clientSecret: string;
  paymentIntentId: string;
  onSuccess: (receipt: PaymentReceipt) => void;
  onCanceled: () => void;
  details?: ReactNode;
  summary?: ReactNode;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<PaymentIntent.Status | null>(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('Checking payment status...');
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const guard = useRef(false);

  function receive(intent: PaymentIntent) {
    if (intent.id !== paymentIntentId) throw new Error();
    setStatus(intent.status);
    if (intent.status === 'canceled') onCanceled();
    if (!['requires_payment_method', 'requires_action', 'requires_confirmation'].includes(intent.status)) setReady(false);
    setAmount(new Intl.NumberFormat('en-PK', { style: 'currency', currency: intent.currency }).format(intent.amount / 100));
    if (intent.status === 'succeeded') {
      onSuccess({ id: intent.id, amount: intent.amount, currency: intent.currency, status: 'succeeded' });
      return;
    }
    const messages: Record<Exclude<PaymentIntent.Status, 'succeeded'>, string> = {
      processing: 'Your payment is processing. Do not pay again. Check its status below.',
      requires_payment_method: 'Enter your card details to pay securely. If a previous attempt failed, you can retry this same payment.',
      requires_action: 'Your bank requires authentication. Continue payment to complete verification.',
      requires_confirmation: 'Your payment is ready for confirmation. Continue below.',
      requires_capture: 'Your payment is authorized but not yet captured. Do not pay again. Check its status below.',
      canceled: 'This payment was canceled. It cannot be retried. Return to the shop if you want to start again.',
    };
    setMessage(messages[intent.status]);
  }

  async function checkStatus() {
    if (!stripe || guard.current) return;
    guard.current = true;
    setBusy(true);
    try {
      const result = await stripe.retrievePaymentIntent(clientSecret);
      if (result.error || !result.paymentIntent) throw new Error();
      receive(result.paymentIntent);
    } catch {
      setStatus(null);
      setReady(false);
      setMessage('Unable to verify payment status. Check again before attempting any payment.');
    } finally { guard.current = false; setBusy(false); }
  }

  useEffect(() => { void checkStatus(); }, [stripe, clientSecret]);

  const canPay = status === 'requires_payment_method' || status === 'requires_action' || status === 'requires_confirmation';
  async function confirm() {
    if (!stripe || !elements || !ready || !canPay || guard.current) return;
    guard.current = true;
    setBusy(true);
    setMessage('Confirming payment securely...');
    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: `${window.location.origin}/checkout` },
        redirect: 'if_required',
      });
      if (result.error) {
        // Retrieve authoritative status before enabling retries after an ambiguous failure.
        const current = await stripe.retrievePaymentIntent(clientSecret);
        if (current.error || !current.paymentIntent) throw new Error();
        receive(current.paymentIntent);
        if (['requires_payment_method', 'requires_action', 'requires_confirmation'].includes(current.paymentIntent.status)) setMessage(result.error.message || 'Payment failed. Check your card details and retry.');
      } else if (result.paymentIntent) receive(result.paymentIntent);
      else throw new Error();
    } catch {
      setStatus(null);
      setReady(false);
      setMessage('Payment status is uncertain. Check status below before retrying; do not start another payment.');
    } finally { guard.current = false; setBusy(false); }
  }

  const button = (
    <button type="submit" disabled={!stripe || !elements || !ready || busy || !canPay} className="w-full py-4 px-6 rounded-xl bg-[#d4af37] text-[#070d0a] font-bold hover:bg-[#dfba44] disabled:opacity-50 disabled:cursor-not-allowed">
      {busy ? 'Checking Payment...' : `Pay Securely${amount ? ` - ${amount}` : ''}`}
    </button>
  );
  return <form onSubmit={event => { event.preventDefault(); void confirm(); }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    <div className="lg:col-span-7 space-y-6">
      <p className="text-sm text-[#9eaba2]">Details and quantity are locked for this payment. You can retry payment without re-entering your details. To leave checkout, use Return to Shop; this does not cancel the payment.</p>
      {details}
      <section className="bg-[#0a120e] border border-[#1b3528] rounded-2xl p-5 sm:p-7 space-y-5">
        <h2 className="font-serif text-xl font-bold">Credit / Debit Card</h2>
        <p className="text-xs text-[#9eaba2]">Card details are collected securely by Stripe.</p>
        <p role="status" aria-live="polite" className="text-sm text-[#d4af37]">{message}</p>
        {canPay && (
          <div id="stripe-payment-integration-container">
            <PaymentElement
              options={{ layout: 'tabs', paymentMethodOrder: ['card'], wallets: { applePay: 'never', googlePay: 'never' } }}
              onReady={() => setReady(true)}
              onLoadError={() => {
                setReady(false);
                setMessage('Secure card fields could not load. Reload this page to recover the same payment.');
              }}
            />
          </div>
        )}
        <button type="button" disabled={!stripe || busy} onClick={() => void checkStatus()} className="text-xs text-[#d4af37] underline disabled:opacity-50">Check Payment Status</button>
      </section>
      <div className="lg:hidden">{button}</div>
    </div>
    <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">{summary}<div className="hidden lg:block">{button}</div></div>
  </form>;
}
