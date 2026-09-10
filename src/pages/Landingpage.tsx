import { useNavigate } from 'react-router';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/TrustStrip';
import { Philosophy } from '../components/Philosophy';
import { OlfactoryArchitecture } from '../components/OlfactoryArchitecture';
import { Lifestyle } from '../components/Lifestyle';
import { Benefits } from '../components/Benefits';
import { OfferSection } from '../components/OfferSection';
import { Testimonials } from '../components/Testimonials';
import { FaqSection } from '../components/FaqSection';
import { FinalCta } from '../components/FinalCta';
import { Footer } from '../components/Footer';
import { StickyBottomBar } from '../components/StickyBottomBar';
import { FadeInSection } from '../components/FadeInSection';

export default function Landingpage() {
  const navigate = useNavigate();

  const handleCheckout = (qty: number = 1) => {
    qty = Number.isFinite(qty) ? Math.min(10, Math.max(1, Math.trunc(qty))) : 1;
    const url = qty > 1 ? `/checkout?qty=${qty}` : '/checkout';
    navigate(url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070d0a] text-[#f1f5f2] selection:bg-[#d4af37] selection:text-[#070d0a] flex flex-col font-sans">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navigation Header */}
      <Navbar
        onOpenOrderModal={() => handleCheckout(1)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Section 01 & 02: Hero Section */}
        <FadeInSection threshold={0.02} rootMargin="0px 0px 0px 0px">
          <Hero onOpenOrderModal={() => handleCheckout(1)} />
        </FadeInSection>

        {/* Section 03: Trust Badges Strip */}
        <FadeInSection threshold={0.1}>
          <TrustStrip />
        </FadeInSection>

        {/* Section 05: Brand Philosophy */}
        <FadeInSection threshold={0.1}>
          <Philosophy />
        </FadeInSection>

        {/* Section 06, 07, 08: Olfactory Architecture & Visual Accords */}
        <FadeInSection threshold={0.06}>
          <OlfactoryArchitecture />
        </FadeInSection>

        {/* Section 09: Lifestyle & Executive Context */}
        <FadeInSection threshold={0.08}>
          <Lifestyle onOpenOrderModal={() => handleCheckout(1)} />
        </FadeInSection>

        {/* Section 10: Benefits & The Distinction */}
        <FadeInSection threshold={0.08}>
          <Benefits />
        </FadeInSection>

        {/* Section 11: Main Offer & High Conversion Card */}
        <FadeInSection threshold={0.06}>
          <OfferSection onOpenOrderModal={(qty) => handleCheckout(qty || 1)} />
        </FadeInSection>

        {/* Section 04: Verified Testimonials */}
        <FadeInSection threshold={0.06}>
          <Testimonials />
        </FadeInSection>

        {/* Section 12: Frequently Asked Questions */}
        <FadeInSection threshold={0.06}>
          <FaqSection />
        </FadeInSection>

        {/* Section 13: Final Decision Call to Action */}
        <FadeInSection threshold={0.08}>
          <FinalCta onOpenOrderModal={() => handleCheckout(1)} />
        </FadeInSection>
      </main>

      {/* Section 15: Footer */}
      <Footer />

      {/* Section 14: Sticky Bottom Conversion Bar */}
      <StickyBottomBar onOpenOrderModal={() => handleCheckout(1)} />
    </div>
  );
}
