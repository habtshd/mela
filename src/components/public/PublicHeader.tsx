import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, ArrowRight, Calendar } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useDemo } from '../../context/DemoContext';

export const PublicHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [consultForm, setConsultForm] = useState({
    parentName: '',
    childAge: '',
    phone: '',
    email: '',
    areaOfInterest: 'Occupational Therapy',
    notes: ''
  });
  const { showToast } = useDemo();
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

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultModalOpen(false);
    showToast(`Thank you, ${consultForm.parentName}! Your consultation inquiry has been recorded. Our clinical intake coordinator will call you.`, 'success');
    setConsultForm({
      parentName: '',
      childAge: '',
      phone: '',
      email: '',
      areaOfInterest: 'Occupational Therapy',
      notes: ''
    });
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-[31px] z-40 transition-all">
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-teal-400 flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 text-white fill-white/20" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                  Mela <span className="text-teal-600 font-bold text-base">Special Needs</span>
                </span>
                <p className="text-[10px] text-slate-500 -mt-1 font-medium tracking-wide">
                  Pediatric Therapy & Family Center
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'text-teal-700 bg-teal-50 shadow-sm font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2.5">
              <button
                onClick={() => setConsultModalOpen(true)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span>Book Evaluation</span>
              </button>

              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all flex items-center gap-1.5 group"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile / Tablet Actions (only ONE Sign In button and hamburger toggle) */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900"
              >
                Sign In
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1.5 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2 rounded-xl text-sm font-semibold ${
                  location.pathname === link.href
                    ? 'text-teal-700 bg-teal-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setConsultModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 text-center"
              >
                Book Intake Evaluation
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Consultation Modal */}
      <Modal
        isOpen={consultModalOpen}
        onClose={() => setConsultModalOpen(false)}
        title="Schedule a Pediatric Intake Consultation"
        subtitle="Meet our clinical team to discuss your child’s unique developmental needs."
        maxWidth="lg"
      >
        <form onSubmit={handleConsultSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Parent / Guardian Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rachel Adams"
                value={consultForm.parentName}
                onChange={(e) => setConsultForm({ ...consultForm, parentName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Child's Age *</label>
              <input
                type="text"
                required
                placeholder="e.g. 5 years old"
                value={consultForm.childAge}
                onChange={(e) => setConsultForm({ ...consultForm, childAge: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="(555) 000-0000"
                value={consultForm.phone}
                onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={consultForm.email}
                onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Area of Interest</label>
            <select
              value={consultForm.areaOfInterest}
              onChange={(e) => setConsultForm({ ...consultForm, areaOfInterest: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="Occupational Therapy">Occupational Therapy & Fine Motor</option>
              <option value="Speech Therapy">Speech, Language & AAC</option>
              <option value="Behavioral Therapy">Applied Behavior Analysis (ABA)</option>
              <option value="Sensory Gym">Sensory Integration Gym</option>
              <option value="Physical Therapy">Pediatric Physical Therapy</option>
              <option value="Comprehensive Evaluation">Full Multidisciplinary Evaluation</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tell us briefly about your child's goals</label>
            <textarea
              rows={3}
              placeholder="Any current diagnoses, speech or sensory concerns, or specific developmental milestones you want to target..."
              value={consultForm.notes}
              onChange={(e) => setConsultForm({ ...consultForm, notes: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setConsultModalOpen(false)}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-md shadow-teal-600/20 transition-colors"
            >
              Request Free Consultation
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
