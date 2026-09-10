import { CheckCircle } from 'lucide-react';
import type { PaymentReceipt } from '../../types/checkout';

export function OrderConfirmationView({ receipt, onReturnToShop }: {
  receipt: PaymentReceipt;
  onReturnToShop: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      <div className="bg-[#0a120e] border border-[#1b3528] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 text-center">
        <CheckCircle className="w-16 h-16 text-[#d4af37] mx-auto" />
        <h1 className="font-serif text-3xl font-bold">Payment Successful</h1>
        <p className="text-sm text-[#9eaba2]">Stripe has confirmed your payment. Keep this reference for payment enquiries.</p>
        <dl className="bg-[#050907] border border-[#1b3528] rounded-2xl p-5 space-y-3">
          <dt className="text-xs uppercase tracking-wider text-[#9eaba2]">Payment Reference</dt>
          <dd className="font-mono text-[#d4af37] break-all">{receipt.id}</dd>
          <dt className="text-xs uppercase tracking-wider text-[#9eaba2]">Amount Paid</dt>
          <dd className="text-2xl font-serif text-[#d4af37]">{new Intl.NumberFormat('en-PK', { style: 'currency', currency: receipt.currency }).format(receipt.amount / 100)}</dd>
          <dt className="text-xs text-[#9eaba2]">Status</dt>
          <dd className="capitalize">{receipt.status}</dd>
        </dl>
        <button type="button" onClick={onReturnToShop} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#d4af37] text-[#070d0a] font-bold hover:bg-[#dfba44]">Continue to Store</button>
      </div>
    </div>
  );
}
