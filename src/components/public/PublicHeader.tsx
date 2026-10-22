import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export const PublicHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Therapy & Services', href: '/services' },
    { label: 'Specialists', href: '/team' },
    { label: 'Programs', href: '/programs' },
    { label: 'Facility Tour', href: '/gallery' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 transition-all">
        {/* Top Info Bar */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 text-teal-100 text-[11px] py-1.5 px-4 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
                <span>መላ የልዩ-ፍላጎት አገልግሎት • Addis Ababa, Ethiopia</span>
              </span>
              <span className="text-teal-400">•</span>
              <a href="tel:+251717484604" className="hover:text-white transition-colors">
                📞 +251 717 484 604 / +251 919 484 604
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/MelaSpecialNeedsService"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Telegram: @MelaSpecialNeedsService
              </a>
              <span className="text-teal-400">•</span>
              <a
                href="https://web.facebook.com/MelaSpecialNeedsService"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors font-semibold"
              >
                Official Facebook Page ↗
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-white border border-brand-200/80 shadow-soft flex items-center justify-center p-1.5 group-hover:scale-105 group-hover:border-brand-400 transition-all">
                <img
                  src="/logo.png"
                  alt="Mela Special Needs Service Logo"
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                  Mela <span className="text-brand-600 font-extrabold text-base sm:text-lg">Special Needs</span>
                  <span className="w-2 h-2 rounded-full bg-gold-500 inline-block shadow-sm"></span>
                </span>
                <p className="text-[11px] text-brand-800 -mt-0.5 font-semibold tracking-wide flex items-center gap-1.5">
                  <span>መላ የልዩ-ፍላጎት አገልግሎት</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-normal">Addis Ababa</span>
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'text-teal-700 bg-teal-50/80 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Sign In Only */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm shadow-slate-900/10 hover:shadow-md transition-all flex items-center gap-2 group"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex xl:hidden items-center gap-2">
              <Link
                to="/login"
                className="sm:hidden px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-slate-900"
              >
                Sign In
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-semibold ${
                  location.pathname === link.href
                    ? 'text-teal-700 bg-teal-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl text-sm font-bold text-white bg-slate-900 text-center"
              >
                Sign In to Platform
              </Link>
            </div>
          </div>
        )}
      </header>
  );
};
