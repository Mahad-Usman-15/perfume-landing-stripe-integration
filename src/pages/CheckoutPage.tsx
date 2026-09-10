import { useNavigate, useSearchParams } from 'react-router';
import { CheckoutPage as Checkout } from '../components/checkout/CheckoutPage';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const qty = parseInt(searchParams.get('qty') || '1', 10);
  const initialQuantity = isNaN(qty) ? 1 : Math.min(10, Math.max(1, qty));

  const handleBackToShop = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quantity seeds checkout only on mount; query changes must not reset an active payment.
  return <Checkout initialQuantity={initialQuantity} onBackToShop={handleBackToShop} />;
}
