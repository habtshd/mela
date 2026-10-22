import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 text-white pt-16 pb-12 no-print border-t border-teal-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-teal-700/30">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl p-1.5 flex items-center justify-center border shadow-md" style={{background: 'rgba(255,255,255,0.95)', borderColor: '#F9E34D'}}>
                <img
                  src="/logo.png"
                  alt="Mela Special Needs Service Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  Mela <span style={{color: '#F9E34D'}}>Special Needs</span>
                  <span className="w-2.5 h-2.5 rounded-full inline-block shadow" style={{background: '#F9E34D'}}></span>
                </span>
                <p className="text-[11px] font-semibold tracking-wide" style={{color: '#d4edce'}}>
                  መላ የልዩ-ፍላጎት አገልግሎት • Addis Ababa
                </p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed max-w-sm text-emerald-100/90">
              Empowering children with special needs, autism, speech delays, and developmental challenges in Ethiopia through pediatric therapy, in-home support, and inclusive school shadow teaching.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <a
                href="https://web.facebook.com/MelaSpecialNeedsService"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border px-3 py-1.5 rounded-xl transition-all font-semibold hover:opacity-90 shadow-sm"
                style={{background: 'rgba(59,131,58,0.4)', color: '#ffffff', borderColor: 'rgba(249,227,77,0.3)'}}
              >
                <span style={{color: '#F9E34D'}}>f</span>
                <span>Facebook (1,300+ community)</span>
              </a>
              <a
                href="https://t.me/MelaSpecialNeedsService"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border px-3 py-1.5 rounded-xl transition-all font-semibold hover:opacity-90 shadow-sm"
                style={{background: 'rgba(249,227,77,0.15)', color: '#F9E34D', borderColor: 'rgba(249,227,77,0.4)'}}
              >
                <span>✈</span>
                <span>Telegram: @MelaSpecialNeedsService</span>
              </a>
              <a
                href="https://www.tiktok.com/@melaspecialneedsservice"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border px-3 py-1.5 rounded-xl transition-all font-semibold hover:opacity-90 shadow-sm"
                style={{background: 'rgba(59,131,58,0.4)', color: '#ffffff', borderColor: 'rgba(249,227,77,0.3)'}}
              >
                <span style={{color: '#F9E34D'}}>♪</span>
                <span>TikTok @melaspecialneedsservice</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5" style={{color: '#F9E34D'}}>
              <span className="w-1.5 h-3 rounded-full inline-block" style={{background: '#3B833A'}}></span>
              Explore Mela
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/90 font-medium">
              <li>
                <Link to="/" className="hover:text-yellow-300 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow-300 transition-colors">About & Mission</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-yellow-300 transition-colors">Therapy & Services</Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-yellow-300 transition-colors">Our Specialists</Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-yellow-300 transition-colors">Specialist Programs & CPD</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-yellow-300 transition-colors">Sensory Center Tour</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-yellow-300 transition-colors">Parent FAQs</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-300 transition-colors">Contact & Intake</Link>
              </li>
            </ul>
          </div>

          {/* Clinical Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5" style={{color: '#F9E34D'}}>
              <span className="w-1.5 h-3 rounded-full inline-block" style={{background: '#3B833A'}}></span>
              Specializations
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/80">
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
            <h4 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5" style={{color: '#F9E34D'}}>
              <span className="w-1.5 h-3 rounded-full inline-block" style={{background: '#3B833A'}}></span>
              Contact & Location
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-100/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color: '#F9E34D'}} />
                <span>
                  <strong className="text-white">Addis Ababa, Ethiopia</strong><br />
                  Center, Home-Based & School Visits across Bole, Megenagna, CMC & All Sub-cities
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color: '#F9E34D'}} />
                <div>
                  <a href="tel:+251717484604" className="hover:underline block font-bold text-white">
                    +251 717 484 604
                  </a>
                  <a href="tel:+251919484604" className="hover:underline block text-emerald-100">
                    +251 919 484 604
                  </a>
                  <span className="text-[10px] text-emerald-200/70 block">
                    Desk / CPD: +251 952 118 642
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 flex-shrink-0" style={{color: '#F9E34D'}} />
                <span className="text-white font-medium">melaspecialneeds@gmail.com</span>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color: '#F9E34D'}} />
                <span className="text-emerald-100/80">
                  Mon – Fri: 8:00 AM – 6:00 PM (EAT)<br />
                  Sat: 8:30 AM – 4:00 PM<br />
                  Sun: Emergency & Scheduled Parent Forums
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center w-full px-4 py-2.5 text-xs font-black rounded-xl transition-all shadow hover:shadow-lg hover:scale-[1.02]"
                style={{background: '#F9E34D', color: '#153315'}}
              >
                Inquire / Book Consultation →
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-200/80">
          <p>
            © {new Date().getFullYear()} Mela Special Needs Center. All rights reserved.
          </p>

          <div className="border rounded-xl p-2.5 text-center md:text-left text-[11px] max-w-xl" style={{background: 'rgba(0,0,0,0.2)', borderColor: 'rgba(249,227,77,0.2)'}}>
            <strong style={{color: '#F9E34D'}}>Demo Prototype:</strong> Simulated data for evaluation purposes.
          </div>
        </div>
      </div>
    </footer>
  );
};
