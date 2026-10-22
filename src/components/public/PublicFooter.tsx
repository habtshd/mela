import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-1.5 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Mela Special Needs Service Logo"
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  Mela <span className="text-brand-400">Special Needs</span>
                  <span className="w-2 h-2 rounded-full bg-gold-400 inline-block shadow-sm"></span>
                </span>
                <p className="text-[11px] text-teal-300 font-semibold tracking-wide">
                  መላ የልዩ-ፍላጎት አገልግሎት • Addis Ababa
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering children with special needs, autism, speech delays, and developmental challenges in Ethiopia through pediatric therapy, in-home support, and inclusive school shadow teaching.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <a
                href="https://web.facebook.com/MelaSpecialNeedsService"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-blue-900/40 text-blue-300 border border-blue-700/50 px-3 py-1.5 rounded-lg hover:bg-blue-900/60 transition-colors"
              >
                <span>f</span>
                <span>Facebook (1,300+ community)</span>
              </a>
              <a
                href="https://t.me/MelaSpecialNeedsService"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-sky-900/40 text-sky-300 border border-sky-700/50 px-3 py-1.5 rounded-lg hover:bg-sky-900/60 transition-colors"
              >
                <span>✈</span>
                <span>Telegram: @MelaSpecialNeedsService</span>
              </a>
              <a
                href="https://www.tiktok.com/@melaspecialneedsservice"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-slate-900 text-pink-300 border border-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <span>♪</span>
                <span>TikTok @melaspecialneedsservice</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Explore Mela</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-teal-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">About & Mission</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal-400 transition-colors">Therapy & Services</Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-teal-400 transition-colors">Our Specialists</Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-teal-400 transition-colors">Specialist Programs & CPD</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-teal-400 transition-colors">Sensory Center Tour</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-teal-400 transition-colors">Parent FAQs</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-400 transition-colors">Contact & Intake</Link>
              </li>
            </ul>
          </div>

          {/* Clinical Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Core Specializations</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Autism & ABA Behavior Therapy</li>
              <li>Speech & Language Therapy</li>
              <li>Occupational & Sensory Therapy</li>
              <li>Shadow Teacher Placement</li>
              <li>Early Intervention (18m – 6y)</li>
              <li>Sign Language (EthSL) Support</li>
              <li>CPD Inclusive Education Training</li>
              <li>Parent Support Panels (ተሞክሯችንን)</li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact & Location</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Addis Ababa, Ethiopia</strong><br />
                  Center, Home-Based & School Visits across Bole, Megenagna, CMC & All Sub-cities
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+251717484604" className="hover:text-teal-300 block font-medium text-slate-200">
                    +251 717 484 604
                  </a>
                  <a href="tel:+251919484604" className="hover:text-teal-300 block">
                    +251 919 484 604
                  </a>
                  <span className="text-[10px] text-slate-500">
                    Desk / CPD: +251 952 118 642
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>melaspecialneeds@gmail.com</span>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>
                  Mon – Fri: 8:00 AM – 6:00 PM (EAT)<br />
                  Sat: 8:30 AM – 4:00 PM<br />
                  Sun: Emergency & Scheduled Parent Forums
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center w-full px-3 py-2 text-xs font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors"
              >
                Inquire / Book Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Mela Special Needs Center. All rights reserved.
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-center md:text-left text-[11px] text-slate-400 max-w-xl">
            <strong className="text-teal-400">Demo Prototype:</strong> Simulated data for evaluation purposes.
          </div>
        </div>
      </div>
    </footer>
  );
};
