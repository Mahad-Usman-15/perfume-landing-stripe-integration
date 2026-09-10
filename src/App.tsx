import { Route, Routes } from 'react-router';
import Landingpage from './pages/Landingpage';
import CheckoutPage from './pages/CheckoutPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<Landingpage />} />
    </Routes>
  );
}
