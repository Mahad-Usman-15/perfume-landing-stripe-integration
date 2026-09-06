import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ASSETS } from '../data/fragranceData';

interface NavbarProps {
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOrderModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'The Fragrance', href: '#hero' },
    { name: 'Olfactory Notes', href: '#notes' },
    { name: 'Executive Heritage', href: '#heritage' },
    { name: 'Client Reviews', href: '#testimonials' },
    { name: 'FAQS', href: '#faq' }
  ];

  return (
    <header
      id="top-navbar"
      className="bg-[#070d0a]/90 backdrop-blur-md border-b border-[#1b3528] sticky top-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between w-full">
        {/* Brand Logo Anchor */}
        <a
          id="nav-brand-logo"
          href="#hero"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 overflow-hidden rounded-lg border border-[#1b3528] p-0.5 bg-[#070d0a] group-hover:border-[#d4af37] transition-colors shadow-sm">
            <img
              src={ASSETS.logo}
              alt="KHUSHBOO Logo"
              className="w-full h-full object-cover rounded"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-[0.2em] text-[#d4af37] font-bold group-hover:text-[#f2d982] transition-colors">
              KHUSHBOO
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#9eaba2] hidden sm:block -mt-1 font-medium">
              Extrait De Parfum
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-links" className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              id={`nav-link-${idx}`}
              href={link.href}
              className={`text-sm font-medium tracking-wider uppercase transition-colors duration-200 py-1 ${
                idx === 0
                  ? 'text-[#d4af37] border-b border-[#d4af37]'
                  : 'text-[#9eaba2] hover:text-[#d4af37] hover:border-b hover:border-[#d4af37]'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Trailing Actions: Shopping Bag + Order Now Button */}
        <div className="flex items-center space-x-4">

          <button
            id="nav-order-now-btn"
            onClick={onOpenOrderModal}
            className="hidden sm:inline-flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#e5c158] text-[#070d0a] px-5 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-[0_4px_20px_rgba(212,175,55,0.35)] active:scale-95 cursor-pointer"
          >
            <span>ORDER NOW</span>
          </button>

          {/* Mobile & Tablet Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden text-[#9eaba2] hover:text-[#f1f5f2] p-2 rounded-lg border border-[#1b3528] bg-[#0d1612]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#070d0a]/98 border-b border-[#1b3528] px-6 py-6 transition-all duration-300 animate-fadeIn"
        >
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-[#f1f5f2] hover:text-[#d4af37] py-2 border-b border-[#1b3528]/50 font-medium tracking-wide flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-[#d4af37] text-xs">→</span>
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderModal();
                }}
                className="w-full text-center bg-[#d4af37] text-[#070d0a] py-3.5 rounded-lg text-xs font-bold tracking-widest uppercase shadow-[0_4px_16px_rgba(212,175,55,0.3)]"
              >
                ORDER KHUSHBOO NOW — RS. 2000
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
